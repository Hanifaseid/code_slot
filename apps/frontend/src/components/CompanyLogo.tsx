import React, { useState, useEffect } from 'react';
import { Job } from '../types';

interface CompanyLogoProps {
  job: Job;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Checks if a given URL is a generic stock photo/avatar rather than a real company logo.
 */
export function isInvalidLogoUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return true;
  const lower = url.toLowerCase().trim();
  return (
    lower.includes('unsplash.com') ||
    lower.includes('images.unsplash') ||
    lower.includes('via.placeholder.com') ||
    lower.includes('placeholder') ||
    lower.includes('stock-photo') ||
    lower.includes('dummyimage') ||
    lower.includes('gravatar.com/avatar/0000000') ||
    lower.includes('default_avatar') ||
    lower.includes('avatar_default')
  );
}

/**
 * Extracts clean hostname from URL or website string, excluding generic aggregators.
 */
export function extractCompanyDomain(urlOrWebsite?: string): string | null {
  if (!urlOrWebsite) return null;
  const str = urlOrWebsite.trim();

  // If full URL
  if (str.includes('http://') || str.includes('https://')) {
    try {
      const parsed = new URL(str);
      const hostname = parsed.hostname.toLowerCase().replace(/^www\./, '');
      const aggregators = [
        'weworkremotely.com',
        'jobicy.com',
        'remoteok.com',
        'remoteok.io',
        'arbeitnow.com',
        'workingnomads.com',
        'news.ycombinator.com',
        'ycombinator.com',
        'remotive.com',
        'remotive.io',
        'rss2json.com',
        'algolia.com'
      ];
      if (aggregators.includes(hostname)) return null;
      return hostname;
    } catch {
      // ignore parsing error
    }
  }

  // Domain regex check e.g. "stripe.com" or "linear.app"
  const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  if (domainRegex.test(str)) {
    return str.toLowerCase();
  }

  return null;
}

/**
 * Maps common tech company names to known domain names for logo fetching
 */
const KNOWN_COMPANY_DOMAINS: Record<string, string> = {
  linear: 'linear.app',
  stripe: 'stripe.com',
  automattic: 'automattic.com',
  vercel: 'vercel.com',
  supabase: 'supabase.com',
  openai: 'openai.com',
  figma: 'figma.com',
  github: 'github.com',
  gitlab: 'gitlab.com',
  datadog: 'datadoghq.com',
  ramp: 'ramp.com',
  docker: 'docker.com',
  posthog: 'posthog.com',
  resend: 'resend.com',
  modal: 'modal.com',
  'modal labs': 'modal.com',
  cursor: 'cursor.com',
  'cursor (anysphere)': 'cursor.com',
  perplexity: 'perplexity.ai',
  'perplexity ai': 'perplexity.ai',
  retool: 'retool.com',
  brex: 'brex.com',
  railway: 'railway.com',
  langchain: 'langchain.com',
  deel: 'deel.com',
  google: 'google.com',
  apple: 'apple.com',
  microsoft: 'microsoft.com',
  amazon: 'amazon.com',
  meta: 'meta.com',
  netflix: 'netflix.com',
  spotify: 'spotify.com',
  airbnb: 'airbnb.com',
  slack: 'slack.com',
  notion: 'notion.so',
  shopify: 'shopify.com',
  sentry: 'sentry.io',
  cloudflare: 'cloudflare.com',
  hashicorp: 'hashicorp.com',
  databricks: 'databricks.com',
  snowflake: 'snowflake.com',
  canonical: 'canonical.com',
  elastic: 'elastic.co',
  anthropic: 'anthropic.com',
  postman: 'postman.com'
};

export function getCompanyDomainForJob(job: Job): string | null {
  if (job.company_website) {
    const domain = extractCompanyDomain(job.company_website);
    if (domain) return domain;
  }

  if (job.company_name) {
    const cleanName = job.company_name.toLowerCase().trim();
    if (KNOWN_COMPANY_DOMAINS[cleanName]) {
      return KNOWN_COMPANY_DOMAINS[cleanName];
    }
    // Partial check
    for (const [key, domain] of Object.entries(KNOWN_COMPANY_DOMAINS)) {
      if (cleanName.includes(key)) {
        return domain;
      }
    }
  }

  if (job.url) {
    const domain = extractCompanyDomain(job.url);
    if (domain) return domain;
  }

  return null;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  job,
  className,
  size = 'md'
}) => {
  const [logoStage, setLogoStage] = useState<'primary' | 'clearbit' | 'favicon' | 'monogram'>('primary');
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);

  const domain = getCompanyDomainForJob(job);
  const rawLogo = job.company_logo && !isInvalidLogoUrl(job.company_logo) ? job.company_logo : null;

  useEffect(() => {
    // Reset state when job changes
    if (rawLogo) {
      setLogoStage('primary');
      setCurrentSrc(rawLogo);
    } else if (domain) {
      setLogoStage('clearbit');
      setCurrentSrc(`https://logo.clearbit.com/${domain}`);
    } else {
      setLogoStage('monogram');
      setCurrentSrc(null);
    }
  }, [job.id, job.company_logo, job.company_website, job.url, job.company_name, rawLogo, domain]);

  const handleError = () => {
    if (logoStage === 'primary') {
      if (domain) {
        setLogoStage('clearbit');
        setCurrentSrc(`https://logo.clearbit.com/${domain}`);
      } else {
        setLogoStage('monogram');
        setCurrentSrc(null);
      }
    } else if (logoStage === 'clearbit') {
      if (domain) {
        setLogoStage('favicon');
        setCurrentSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
      } else {
        setLogoStage('monogram');
        setCurrentSrc(null);
      }
    } else {
      setLogoStage('monogram');
      setCurrentSrc(null);
    }
  };

  // Dimensions based on size prop
  let sizeClasses = 'w-11 h-11 rounded-xl text-sm';
  if (size === 'sm') sizeClasses = 'w-8 h-8 rounded-lg text-xs';
  if (size === 'lg') sizeClasses = 'w-18 h-18 sm:w-22 sm:h-22 rounded-2xl text-2xl sm:text-3xl';

  const appliedClass = className || sizeClasses;

  // Clean initials (e.g. "Linear" -> "LN", "Stripe" -> "ST", "Y Combinator" -> "YC", "Perplexity AI" -> "PA")
  const getInitials = (name: string) => {
    const cleaned = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2).toUpperCase();
    }
    return cleaned.toUpperCase() || 'CO';
  };

  if (logoStage !== 'monogram' && currentSrc) {
    return (
      <img
        src={currentSrc}
        alt={`${job.company_name} logo`}
        className={`${appliedClass} object-contain p-1.5 bg-white border border-neutral-200/80 shrink-0 shadow-2xs`}
        onError={handleError}
        loading="lazy"
      />
    );
  }

  // Fallback Monogram logo badge
  return (
    <div
      className={`${appliedClass} bg-neutral-900 text-white font-bold flex items-center justify-center shrink-0 shadow-2xs border border-neutral-800`}
      title={job.company_name}
    >
      {getInitials(job.company_name)}
    </div>
  );
};
