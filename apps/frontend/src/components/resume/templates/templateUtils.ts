import { AccentColor, ContentDensity } from '../../../types/resume';

export interface ThemeStyles {
  primary: string;
  primaryBg: string;
  primaryBorder: string;
  badgeBg: string;
  badgeText: string;
  accentText: string;
  ringColor: string;
}

export const colorThemes: Record<AccentColor, ThemeStyles> = {
  slate: {
    primary: '#0f172a',
    primaryBg: '#f8fafc',
    primaryBorder: '#cbd5e1',
    badgeBg: '#f1f5f9',
    badgeText: '#334155',
    accentText: '#0f172a',
    ringColor: '#64748b'
  },
  navy: {
    primary: '#1e3a8a',
    primaryBg: '#eff6ff',
    primaryBorder: '#bfdbfe',
    badgeBg: '#dbeafe',
    badgeText: '#1e40af',
    accentText: '#1d4ed8',
    ringColor: '#3b82f6'
  },
  emerald: {
    primary: '#065f46',
    primaryBg: '#ecfdf5',
    primaryBorder: '#a7f3d0',
    badgeBg: '#d1fae5',
    badgeText: '#065f46',
    accentText: '#047857',
    ringColor: '#10b981'
  },
  indigo: {
    primary: '#4338ca',
    primaryBg: '#eef2ff',
    primaryBorder: '#c7d2fe',
    badgeBg: '#e0e7ff',
    badgeText: '#3730a3',
    accentText: '#4f46e5',
    ringColor: '#6366f1'
  },
  amber: {
    primary: '#78350f',
    primaryBg: '#fffbeb',
    primaryBorder: '#fde68a',
    badgeBg: '#fef3c7',
    badgeText: '#92400e',
    accentText: '#b45309',
    ringColor: '#f59e0b'
  },
  rose: {
    primary: '#881337',
    primaryBg: '#fff1f2',
    primaryBorder: '#fecdd3',
    badgeBg: '#ffe4e6',
    badgeText: '#9f1239',
    accentText: '#be123c',
    ringColor: '#f43f5e'
  },
  violet: {
    primary: '#581c87',
    primaryBg: '#faf5ff',
    primaryBorder: '#e9d5ff',
    badgeBg: '#f3e8ff',
    badgeText: '#6b21a8',
    accentText: '#7e22ce',
    ringColor: '#a855f7'
  }
};

export const getDensitySpacing = (density: ContentDensity) => {
  switch (density) {
    case 'compact':
      return {
        sectionGap: 'space-y-3.5',
        itemGap: 'space-y-2',
        bulletGap: 'space-y-0.5',
        padding: 'p-6 sm:p-8',
        textBase: 'text-[12.5px] leading-relaxed',
        headingClass: 'text-sm font-bold tracking-tight',
        titleClass: 'text-xl font-bold'
      };
    case 'relaxed':
      return {
        sectionGap: 'space-y-6',
        itemGap: 'space-y-4',
        bulletGap: 'space-y-1.5',
        padding: 'p-8 sm:p-12',
        textBase: 'text-[14px] leading-relaxed',
        headingClass: 'text-base font-bold tracking-tight',
        titleClass: 'text-2xl font-bold'
      };
    case 'standard':
    default:
      return {
        sectionGap: 'space-y-4.5',
        itemGap: 'space-y-3',
        bulletGap: 'space-y-1',
        padding: 'p-7 sm:p-10',
        textBase: 'text-[13px] leading-relaxed',
        headingClass: 'text-[14.5px] font-bold tracking-tight',
        titleClass: 'text-2xl font-bold'
      };
  }
};
