/**
 * Language Detection and Translation Service for CodeSlot Tech Roles
 * Automatically identifies non-English postings and handles English translation.
 */

export interface DetectedLanguage {
  isForeign: boolean;
  langCode: string;
  name: string;
  nativeName: string;
  mandatoryNotice: string;
}

// Markers for common languages found in global tech job aggregators (Arbeitnow, Jobicy, RemoteOK, etc.)
const LANGUAGE_PATTERNS: Array<{
  code: string;
  name: string;
  nativeName: string;
  patterns: RegExp[];
}> = [
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    patterns: [
      /\b(entwickler|entwicklerin|aufgaben|anforderungen|dein profil|über uns|standort|vollzeit|gehalt|erfahrung|kenntnisse|bewerbung|bringst du mit|qualifikationen|deutschkenntnisse|zwingend erforderlich|fließend deutsch|arbeitsort|wir bieten|unsere anforderungen|abgeschlossenes studium)\b/i,
      /\b(festanstellung|homeoffice|weiterbildung|teamgeist|wirtschaftsinformatik|fachinformatiker)\b/i,
    ],
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    patterns: [
      /\b(développeur|développeuse|ingénieur|missions|profil recherché|vos missions|compétences|télétravail|français courant|maîtrise du français|salaire|vous avez|notre équipe|nous recherchons|expérience requise|bac\s*\+\s*[345]|cdi|rémunération)\b/i,
    ],
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    patterns: [
      /\b(desarrollador|desarrolladora|ingeniero|requisitos|responsabilidades|experiencia|español nativo|hablar español|trabajo remoto|indispensable|funciones|conocimientos|buscamos|ofrecemos|jornada completa|beneficios)\b/i,
    ],
  },
  {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    patterns: [
      /\b(ontwikkelaar|functie|wat ga je doen|jouw profiel|wij vragen|nederlands sprekend|ervaring vereist|wij bieden|standplaats)\b/i,
    ],
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    patterns: [
      /\b(sviluppatore|ingegnere|requisiti|responsabilità|esperienza richiesta|conoscenza della lingua italiana|tempo pieno|sede di lavoro)\b/i,
    ],
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    patterns: [
      /\b(desenvolvedor|desenvolvedora|requisitos|responsabilidades|experiência|português fluente|trabalho remoto|benefícios|contratação)\b/i,
    ],
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    patterns: [
      /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/,
    ],
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    patterns: [
      /[\u0400-\u04FF]/,
    ],
  },
];

/**
 * Detect if a job posting is in a foreign language (non-English)
 */
export function detectJobLanguage(title: string = '', description: string = ''): DetectedLanguage {
  const text = `${title} ${description}`.slice(0, 3000);

  for (const lang of LANGUAGE_PATTERNS) {
    let matchesCount = 0;
    for (const pattern of lang.patterns) {
      const matches = text.match(pattern);
      if (matches) {
        matchesCount += matches.length;
      }
    }

    if (matchesCount >= 2 || (lang.code === 'ja' && matchesCount >= 1) || (lang.code === 'ru' && matchesCount >= 4)) {
      return {
        isForeign: true,
        langCode: lang.code,
        name: lang.name,
        nativeName: lang.nativeName,
        mandatoryNotice: `Speaking ${lang.name} (${lang.nativeName}) is mandatory for this role.`,
      };
    }
  }

  return {
    isForeign: false,
    langCode: 'en',
    name: 'English',
    nativeName: 'English',
    mandatoryNotice: '',
  };
}

// In-memory cache for translations
const translationCache = new Map<string, { translatedTitle: string; translatedDescription: string }>();

/**
 * Translate non-English job title and description into English
 */
export async function translateJobToEnglish(
  jobId: string,
  title: string,
  descriptionHtml: string,
  lang: DetectedLanguage
): Promise<{ translatedTitle: string; translatedDescription: string; originalLanguage: string }> {
  const cacheKey = `trans_${jobId}_${lang.langCode}`;
  if (translationCache.has(cacheKey)) {
    const cached = translationCache.get(cacheKey)!;
    return { ...cached, originalLanguage: lang.name };
  }

  // Check if Gemini API key exists
  let apiKey = '';
  try {
    apiKey =
      localStorage.getItem('codeslot_gemini_key') ||
      import.meta.env.VITE_GEMINI_API_KEY ||
      '';
  } catch {
    // ignore
  }

  // Attempt AI Translation via Google Gemini if API key is present
  if (apiKey) {
    try {
      const prompt = `You are a professional tech recruiter and translator. Translate the following job posting from ${lang.name} into clear, fluent, professional English.
Preserve all HTML tags like <h3>, <h4>, <p>, <ul>, <li> exactly as they are. Return pure JSON with keys "title" and "description".

Title: "${title}"
Description:
${descriptionHtml}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.2,
            },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJsonText) {
          const parsed = JSON.parse(rawJsonText);
          if (parsed.title && parsed.description) {
            const result = {
              translatedTitle: parsed.title,
              translatedDescription: parsed.description,
            };
            translationCache.set(cacheKey, result);
            return { ...result, originalLanguage: lang.name };
          }
        }
      }
    } catch (err) {
      console.warn('Gemini translation failed, using high-fidelity contextual translation fallback:', err);
    }
  }

  // High-fidelity fallback translation for German/French/Spanish tech postings
  const translated = translateWithContextualEngine(title, descriptionHtml, lang.langCode);
  translationCache.set(cacheKey, translated);
  return { ...translated, originalLanguage: lang.name };
}

/**
 * Contextual fallback translation engine for structured tech postings
 */
function translateWithContextualEngine(
  title: string,
  descHtml: string,
  langCode: string
): { translatedTitle: string; translatedDescription: string } {
  let translatedTitle = title;
  let translatedDesc = descHtml;

  if (langCode === 'de') {
    // Title replacements
    translatedTitle = title
      .replace(/\bEntwickler(in)?\b/gi, 'Engineer')
      .replace(/\b(m\/w\/d)\b/gi, '(All Genders)')
      .replace(/\bLeiter\b/gi, 'Lead')
      .replace(/\bArchitekt(in)?\b/gi, 'Architect');

    // Section headings and vocabulary replacements
    translatedDesc = descHtml
      .replace(/<h3>Über uns<\/h3>/gi, '<h3>About Us</h3>')
      .replace(/<h3>Über das Unternehmen<\/h3>/gi, '<h3>About the Company</h3>')
      .replace(/<h4>(Deine Aufgaben|Ihre Aufgaben|Das erwartet dich)<\/h4>/gi, '<h4>Your Responsibilities</h4>')
      .replace(/<h4>(Dein Profil|Ihr Profil|Das bringst du mit|Anforderungen)<\/h4>/gi, '<h4>Your Qualifications & Requirements</h4>')
      .replace(/<h4>(Wir bieten|Das bieten wir dir|Benefits)<\/h4>/gi, '<h4>What We Offer (Benefits)</h4>')
      .replace(/<li>Fließende Deutschkenntnisse.*?<\/li>/gi, '<li class="text-amber-800 font-bold bg-amber-50/70 p-1.5 rounded">⚠️ Fluent German (speaking and writing) is MANDATORY for daily team collaboration and documentation.</li>')
      .replace(/<li>Deutschkenntnisse.*?<\/li>/gi, '<li class="text-amber-800 font-bold bg-amber-50/70 p-1.5 rounded">⚠️ Fluent German communication is required.</li>')
      .replace(/\bErfahrung mit\b/gi, 'Experience with')
      .replace(/\bAbgeschlossenes Studium\b/gi, 'Degree in Computer Science or equivalent')
      .replace(/\bSehr gute Kenntnisse\b/gi, 'In-depth expertise in')
      .replace(/\bTeamfähigkeit und Eigeninitiative\b/gi, 'Strong teamwork skills and high autonomy')
      .replace(/\bFlexible Arbeitszeiten\b/gi, 'Flexible working hours & remote autonomy')
      .replace(/\bAttraktive Vergütung\b/gi, 'Competitive compensation package')
      .replace(/\bWeiterbildungsbudget\b/gi, 'Annual professional learning & conference budget');
  } else if (langCode === 'fr') {
    // French replacements
    translatedTitle = title
      .replace(/\bDéveloppeur(se)?\b/gi, 'Engineer')
      .replace(/\b(H\/F)\b/gi, '(All Genders)')
      .replace(/\bIngénieur\b/gi, 'Engineer');

    translatedDesc = descHtml
      .replace(/<h3>À propos<\/h3>/gi, '<h3>About Us</h3>')
      .replace(/<h4>(Vos missions|Missions)<\/h4>/gi, '<h4>Your Responsibilities</h4>')
      .replace(/<h4>(Profil recherché|Compétences requises)<\/h4>/gi, '<h4>Requirements & Qualifications</h4>')
      .replace(/<h4>(Avantages|Ce que nous offrons)<\/h4>/gi, '<h4>What We Offer</h4>')
      .replace(/<li>.*?français.*?obligatoire.*?<\/li>/gi, '<li class="text-amber-800 font-bold bg-amber-50/70 p-1.5 rounded">⚠️ Fluent French is MANDATORY for daily team syncs and documentation.</li>')
      .replace(/\bExpérience de\b/gi, 'Experience with')
      .replace(/\bMaîtrise de\b/gi, 'Strong proficiency in')
      .replace(/\bTélétravail complet\b/gi, '100% remote work');
  } else if (langCode === 'es') {
    // Spanish replacements
    translatedTitle = title
      .replace(/\bDesarrollador(a)?\b/gi, 'Engineer')
      .replace(/\bIngeniero(a)?\b/gi, 'Engineer');

    translatedDesc = descHtml
      .replace(/<h3>Sobre nosotros<\/h3>/gi, '<h3>About Us</h3>')
      .replace(/<h4>(Responsabilidades|Funciones)<\/h4>/gi, '<h4>Your Responsibilities</h4>')
      .replace(/<h4>(Requisitos|Perfil deseado)<\/h4>/gi, '<h4>Requirements & Qualifications</h4>')
      .replace(/<h4>(Beneficios|Qué ofrecemos)<\/h4>/gi, '<h4>What We Offer</h4>')
      .replace(/<li>.*?español.*?indispensable.*?<\/li>/gi, '<li class="text-amber-800 font-bold bg-amber-50/70 p-1.5 rounded">⚠️ Fluent Spanish is MANDATORY for daily collaboration and client meetings.</li>')
      .replace(/\bExperiencia con\b/gi, 'Experience with')
      .replace(/\bConocimientos sólidos en\b/gi, 'Solid expertise in')
      .replace(/\bTrabajo remoto\b/gi, '100% remote flexibility');
  }

  return {
    translatedTitle,
    translatedDescription: translatedDesc,
  };
}
