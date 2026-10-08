import React from 'react';
import { Send, Linkedin, Building2, Compass, Globe, Zap, Target, Laptop, Rocket } from 'lucide-react';

interface SourceBadgeProps {
  source: string;
  source_platform?: 'linkedin' | 'telegram' | 'careerhound' | 'career_portal' | 'remote_board' | 'ycombinator';
  source_channel?: string;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({
  source,
  source_platform,
  source_channel,
  size = 'sm',
  className = ''
}) => {
  const srcLower = source.toLowerCase();
  const isLinkedIn = source_platform === 'linkedin' || srcLower.includes('linkedin');
  const isTelegram =
    source_platform === 'telegram' ||
    srcLower.includes('telegram') ||
    source.startsWith('@');
  const isCareerHound =
    source_platform === 'careerhound' ||
    srcLower.includes('careerhound') ||
    srcLower.includes('hiringcafe');
  const isYC =
    source_platform === 'ycombinator' ||
    srcLower.includes('y combinator') ||
    srcLower.includes('work at a startup');
  const isWWR = srcLower.includes('weworkremotely');
  const isWorkingNomads = srcLower.includes('workingnomads');
  const isRemotive = srcLower.includes('remotive');
  const isJobicy = srcLower.includes('jobicy');
  const isRemoteOK = srcLower.includes('remoteok');
  const isArbeitnow = srcLower.includes('arbeitnow');
  const isUSAStartup = srcLower.includes('usa tech') || srcLower.includes('usa startup');

  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5 gap-1',
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5'
  }[size];

  if (isLinkedIn) {
    return (
      <span
        title="Verified LinkedIn Job Post"
        className={`inline-flex items-center font-semibold rounded-md bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/25 shrink-0 ${sizeClasses} ${className}`}
      >
        <Linkedin className="w-3 h-3 shrink-0 fill-current" />
        <span>LinkedIn Job</span>
      </span>
    );
  }

  if (isTelegram) {
    const channelName = source_channel || (source.includes('@') ? source.substring(source.indexOf('@')) : '@remotejobss');
    return (
      <span
        title="Verified Telegram Tech Channel Post"
        className={`inline-flex items-center font-semibold rounded-md bg-[#229ed9]/10 text-[#0088cc] border border-[#229ed9]/25 shrink-0 ${sizeClasses} ${className}`}
      >
        <Send className="w-3 h-3 shrink-0" />
        <span>{channelName}</span>
      </span>
    );
  }

  if (isCareerHound) {
    return (
      <span
        title="Verified CareerHound Tech Posting"
        className={`inline-flex items-center font-semibold rounded-md bg-purple-50 text-purple-700 border border-purple-200/80 shrink-0 ${sizeClasses} ${className}`}
      >
        <Compass className="w-3 h-3 shrink-0 text-purple-600" />
        <span>CareerHound</span>
      </span>
    );
  }

  if (isYC) {
    return (
      <span
        title="Y Combinator Work at a Startup"
        className={`inline-flex items-center font-semibold rounded-md bg-amber-50 text-amber-900 border border-amber-300/70 shrink-0 ${sizeClasses} ${className}`}
      >
        <span className="w-3 h-3 rounded bg-[#fb651e] text-white flex items-center justify-center font-black text-[8px] leading-none shrink-0">
          Y
        </span>
        <span>YC Startup</span>
      </span>
    );
  }

  if (isWWR) {
    return (
      <span
        title="WeWorkRemotely Verified Global Listing"
        className={`inline-flex items-center font-semibold rounded-md bg-red-50 text-red-700 border border-red-200/80 shrink-0 ${sizeClasses} ${className}`}
      >
        <Globe className="w-3 h-3 shrink-0 text-red-600" />
        <span>WeWorkRemotely</span>
      </span>
    );
  }

  if (isWorkingNomads) {
    return (
      <span
        title="WorkingNomads Global Tech Role"
        className={`inline-flex items-center font-semibold rounded-md bg-teal-50 text-teal-700 border border-teal-200/80 shrink-0 ${sizeClasses} ${className}`}
      >
        <Globe className="w-3 h-3 shrink-0 text-teal-600" />
        <span>WorkingNomads</span>
      </span>
    );
  }

  if (isRemotive) {
    return (
      <span
        title="Remotive Tech Network Listing"
        className={`inline-flex items-center font-semibold rounded-md bg-sky-50 text-sky-700 border border-sky-200/80 shrink-0 ${sizeClasses} ${className}`}
      >
        <Zap className="w-3 h-3 shrink-0 text-sky-600" />
        <span>Remotive</span>
      </span>
    );
  }

  if (isJobicy) {
    return (
      <span
        title="Jobicy Verified Tech Listing"
        className={`inline-flex items-center font-semibold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/80 shrink-0 ${sizeClasses} ${className}`}
      >
        <Target className="w-3 h-3 shrink-0 text-indigo-600" />
        <span>Jobicy</span>
      </span>
    );
  }

  if (isRemoteOK) {
    return (
      <span
        title="RemoteOK Network Posting"
        className={`inline-flex items-center font-semibold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/80 shrink-0 ${sizeClasses} ${className}`}
      >
        <Laptop className="w-3 h-3 shrink-0 text-emerald-600" />
        <span>RemoteOK</span>
      </span>
    );
  }

  if (isArbeitnow) {
    return (
      <span
        title="Arbeitnow EU & Global Tech Listing"
        className={`inline-flex items-center font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200/80 shrink-0 ${sizeClasses} ${className}`}
      >
        <Globe className="w-3 h-3 shrink-0 text-blue-600" />
        <span>Arbeitnow</span>
      </span>
    );
  }

  if (isUSAStartup) {
    return (
      <span
        title="USA Tech Startup Job"
        className={`inline-flex items-center font-semibold rounded-md bg-purple-50 text-purple-800 border border-purple-200/80 shrink-0 ${sizeClasses} ${className}`}
      >
        <Rocket className="w-3 h-3 shrink-0 text-purple-600" />
        <span>US Startup</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200/70 shrink-0 ${sizeClasses} ${className}`}
    >
      <Building2 className="w-3 h-3 shrink-0 text-neutral-500" />
      <span className="truncate max-w-[130px]">{source}</span>
    </span>
  );
};

