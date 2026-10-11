import { ResumeData, AITailorResult } from '../types/resume';
import { apiClient } from './apiClient';

/**
 * Safely retrieve the Gemini API key from environment variables.
 * Checks Vite's import.meta.env (VITE_GEMINI_API_KEY, GEMINI_API_KEY) and process.env.
 */
export const getEnvGeminiApiKey = (): string => {
  try {
    const viteKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
    if (
      viteKey &&
      typeof viteKey === 'string' &&
      viteKey.trim().length > 5 &&
      viteKey !== 'your_gemini_api_key_here' &&
      viteKey !== 'MY_GEMINI_API_KEY'
    ) {
      return viteKey.trim();
    }
  } catch {
    // ignore
  }

  try {
    if (typeof process !== 'undefined' && process.env) {
      const procKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      if (
        procKey &&
        typeof procKey === 'string' &&
        procKey.trim().length > 5 &&
        procKey !== 'your_gemini_api_key_here' &&
        procKey !== 'MY_GEMINI_API_KEY'
      ) {
        return procKey.trim();
      }
    }
  } catch {
    // ignore
  }

  return '';
};

/**
 * Get active Gemini API key: checks localStorage user override first, then environment variables.
 */
export const getGeminiApiKey = (): string => {
  try {
    const saved = localStorage.getItem('codeslot_gemini_key');
    if (saved && saved.trim().length > 5) return saved.trim();
  } catch {
    // ignore
  }
  return getEnvGeminiApiKey();
};

export const setGeminiApiKey = (key: string): void => {
  try {
    const trimmed = key.trim();
    if (!trimmed) {
      localStorage.removeItem('codeslot_gemini_key');
    } else {
      localStorage.setItem('codeslot_gemini_key', trimmed);
    }
  } catch {
    // ignore
  }
};

export const clearCustomGeminiApiKey = (): void => {
  try {
    localStorage.removeItem('codeslot_gemini_key');
  } catch {
    // ignore
  }
};

export const hasGeminiApiKey = (): boolean => {
  const key = getGeminiApiKey();
  return Boolean(
    key &&
    key.length > 5 &&
    key !== 'your_gemini_api_key_here' &&
    key !== 'MY_GEMINI_API_KEY'
  );
};

export const isUsingEnvGeminiApiKey = (): boolean => {
  try {
    const saved = localStorage.getItem('codeslot_gemini_key');
    if (saved && saved.trim().length > 5) return false;
  } catch {
    // ignore
  }
  const envKey = getEnvGeminiApiKey();
  return Boolean(envKey && envKey.length > 5);
};

interface GeminiApiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message: string;
    code: number;
    status: string;
  };
}

/**
 * Tailor an entire resume using Google Gemini 2.5 Flash
 */
export async function tailorResumeWithAI(
  currentResume: ResumeData,
  jobTitle: string,
  companyName: string,
  jobDescription: string,
  customApiKey?: string
): Promise<AITailorResult> {
  // 1. Attempt server-side Gemini AI tailoring via backend API
  try {
    const backendRes = await apiClient.post<AITailorResult>('/resume/tailor', {
      currentResume,
      jobTitle,
      companyName,
      jobDescription,
      customApiKey,
    });
    if (backendRes.success && backendRes.data && backendRes.data.tailoredResume) {
      return backendRes.data;
    }
  } catch (err) {
    console.debug('Backend resume tailoring endpoint offline, falling back to client execution:', err);
  }

  const apiKey = (customApiKey && customApiKey.trim().length > 5)
    ? customApiKey.trim()
    : getGeminiApiKey();

  // If no valid Gemini key is configured, fall back to smart local heuristic tailoring immediately
  if (!apiKey || apiKey.length < 5 || apiKey === 'your_gemini_api_key_here' || apiKey === 'MY_GEMINI_API_KEY') {
    console.info('No Gemini API key configured in .env or settings, using smart client-side tailoring fallback.');
    return fallbackSmartTailor(currentResume, jobTitle, companyName, jobDescription);
  }

  const prompt = `
You are an elite Silicon Valley Executive Career Coach, Senior Tech Recruiter, and ATS (Applicant Tracking System) Optimization Specialist.
Your mission is to tailor the candidate's authentic resume data to match the provided job description with the highest possible ATS match rate and hiring manager resonance.

IMPORTANT RULES:
1. TRUTHFULNESS & ACCURACY: Do NOT invent fake degrees, fictitious previous employers, or false timeline dates. All factual foundations must remain authentic.
2. TAILORING EMPHASIS:
   - Optimize the 'jobTitle' to align closely with the target role (e.g. if candidate is Full Stack and job is Senior Frontend Engineer, focus title on Senior Frontend / Full-Stack Engineer).
   - Rewrite the 'summary' to be a high-impact, 3-4 sentence professional narrative highlighting the exact technologies, domain experience, and leadership required for ${jobTitle} at ${companyName}.
   - In 'experience', refine the bullet points ('highlights') using the Google X-Y-Z formula ("Accomplished [X] as measured by [Y], by doing [Z]") and action verbs. Emphasize achievements and tech stacks that directly map to the job requirements.
   - In 'skills', categorize into 'technical', 'tools', and 'soft', prioritizing the exact keywords and frameworks mentioned in the job description.
   - Ensure the JSON matches the original schema exactly.

TARGET JOB INFORMATION:
- Role: ${jobTitle || 'Software Engineer'}
- Target Company: ${companyName || 'Target Employer'}
- Detailed Job Description:
${jobDescription || 'Standard requirements for modern high-performance software engineering.'}

CANDIDATE CURRENT RESUME:
${JSON.stringify(currentResume, null, 2)}

RESPONSE FORMAT:
You MUST respond with a single valid JSON object with the following structure:
{
  "tailoredResume": {
    "personalInfo": { ... },
    "experience": [ ... ],
    "skills": { "technical": [...], "tools": [...], "soft": [...] },
    "projects": [ ... ],
    "education": [ ... ],
    "certifications": [ ... ]
  },
  "atsScore": 92,
  "summaryOfChanges": "Detailed 2-3 sentence overview of specific adjustments made to align with ${companyName}'s requirements.",
  "matchedKeywords": ["TypeScript", "React", "PostgreSQL", ...],
  "missingKeywords": ["GraphQL", "Docker", ...],
  "improvementTips": [
    "Tip 1...",
    "Tip 2..."
  ]
}
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.25,
          topP: 0.95
        }
      })
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `Gemini API returned status ${res.status}`);
    }

    const data: GeminiApiResponse = await res.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error('No response text received from Gemini');
    }

    // Clean potential markdown wrap
    const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return {
      tailoredResume: parsed.tailoredResume || currentResume,
      atsScore: typeof parsed.atsScore === 'number' ? parsed.atsScore : 88,
      summaryOfChanges: parsed.summaryOfChanges || 'Optimized keywords, summary, and experience highlights for target role.',
      matchedKeywords: Array.isArray(parsed.matchedKeywords) ? parsed.matchedKeywords : [],
      missingKeywords: Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords : [],
      improvementTips: Array.isArray(parsed.improvementTips) ? parsed.improvementTips : [
        'Review the customized bullet points to ensure metrics match your exact achievements.',
        'Use the tailored summary when applying on the company portal.'
      ],
      targetJobTitle: jobTitle,
      targetCompany: companyName
    };
  } catch (err: unknown) {
    console.warn('Gemini API call failed, falling back to smart local heuristic tailoring:', err);

    // Fallback heuristic tailoring so user workflow never breaks
    const fallbackResult = fallbackSmartTailor(currentResume, jobTitle, companyName, jobDescription);
    return fallbackResult;
  }
}

/**
 * Enhance a single bullet point with AI
 */
export async function enhanceBulletWithAI(
  bullet: string,
  targetRole: string,
  customApiKey?: string
): Promise<string> {
  try {
    const res = await apiClient.post<{ enhancedBullet: string }>('/resume/enhance-bullet', {
      originalBullet: bullet,
      jobTitle: targetRole,
      customApiKey,
    });
    if (res.success && res.data?.enhancedBullet) {
      return res.data.enhancedBullet;
    }
  } catch {
    // fallback to client execution
  }

  const apiKey = (customApiKey && customApiKey.trim().length > 5)
    ? customApiKey.trim()
    : getGeminiApiKey();

  if (!apiKey || apiKey.length < 5 || apiKey === 'your_gemini_api_key_here' || apiKey === 'MY_GEMINI_API_KEY') {
    return `Engineered high-impact solutions for ${targetRole}: ${bullet}`;
  }

  const prompt = `
Rewrite this resume bullet point for a ${targetRole} position to be significantly more impactful, action-oriented, and quantified using the Google X-Y-Z formula ("Accomplished [X] as measured by [Y], by doing [Z]").
Keep the truth of the original achievement intact. Return ONLY the rewritten bullet point text, nothing else.

Original bullet point: "${bullet}"
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3 }
      })
    });

    if (res.ok) {
      const data: GeminiApiResponse = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (text) return text.replace(/^[-•*]\s*/, '').replace(/^"|"$/g, '');
    }
  } catch (e) {
    console.error('Enhance bullet error:', e);
  }

  // Fallback enhancement
  return `Engineered high-impact solutions for ${targetRole}: ${bullet}`;
}

/**
 * Intelligent client-side fallback if offline or API limit reached
 */
function fallbackSmartTailor(
  current: ResumeData,
  jobTitle: string,
  companyName: string,
  jobDescription: string
): AITailorResult {
  const desc = jobDescription.toLowerCase();
  
  // Extract keywords commonly present
  const commonTech = [
    'TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Python',
    'Go', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GCP',
    'GraphQL', 'Tailwind CSS', 'REST API', 'Microservices', 'CI/CD',
    'System Design', 'Git', 'Agile', 'Performance Optimization'
  ];

  const matched = commonTech.filter(tech => desc.includes(tech.toLowerCase()));
  const missing = commonTech.filter(tech => !desc.includes(tech.toLowerCase()) && !current.skills.technical.includes(tech)).slice(0, 4);

  const tailored: ResumeData = {
    ...current,
    personalInfo: {
      ...current.personalInfo,
      jobTitle: jobTitle || current.personalInfo.jobTitle,
      summary: `${current.personalInfo.summary.split('.')[0]}. Highly aligned with ${companyName || 'the team'}'s engineering standards for ${jobTitle || 'this role'}, bringing proven domain excellence in high-scalability systems, modern software delivery, and robust technical execution.`
    },
    skills: {
      ...current.skills,
      technical: Array.from(new Set([...matched, ...current.skills.technical]))
    }
  };

  return {
    tailoredResume: tailored,
    atsScore: Math.min(94, 75 + matched.length * 3),
    summaryOfChanges: `Tailored title to "${jobTitle || 'Target Role'}", emphasized ${matched.slice(0, 4).join(', ')} across skills and updated the professional summary to spotlight strategic value for ${companyName || 'the employer'}.`,
    matchedKeywords: matched.length > 0 ? matched : ['React', 'TypeScript', 'Node.js', 'System Architecture'],
    missingKeywords: missing.length > 0 ? missing : ['GraphQL', 'Kubernetes'],
    improvementTips: [
      `Emphasize experience directly touching ${matched[0] || 'core technologies'} in interviews.`,
      `Quantify technical deliverables with specific percentage increases or latency reductions.`,
      `Tailor your portfolio links to feature systems relevant to ${companyName}.`
    ],
    targetJobTitle: jobTitle,
    targetCompany: companyName
  };
}


/**
 * Save tailored resume to backend database
 */
export async function saveResumeToBackend(
  resumeData: ResumeData,
  title = 'My Tech Resume',
  atsScore = 90
): Promise<boolean> {
  try {
    const res = await apiClient.post('/resume/save', {
      title,
      content: resumeData,
      atsScore,
    });
    return Boolean(res.success);
  } catch {
    return false;
  }
}

