import React from 'react';
import { ResumeData, ResumeSettings } from '../../types/resume';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { CreativeSidebarTemplate } from './templates/CreativeSidebarTemplate';
import { IvyClassicTemplate } from './templates/IvyClassicTemplate';
import { NordicCleanTemplate } from './templates/NordicCleanTemplate';
import { AtsCompactTemplate } from './templates/AtsCompactTemplate';
import { VibrantStartupTemplate } from './templates/VibrantStartupTemplate';

interface ResumeRendererProps {
  data: ResumeData;
  settings: ResumeSettings;
}

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({ data, settings }) => {
  switch (settings.templateId) {
    case 'executive':
      return <ExecutiveTemplate data={data} settings={settings} />;
    case 'minimalist':
      return <MinimalistTemplate data={data} settings={settings} />;
    case 'creative-sidebar':
      return <CreativeSidebarTemplate data={data} settings={settings} />;
    case 'ivy-classic':
      return <IvyClassicTemplate data={data} settings={settings} />;
    case 'nordic-clean':
      return <NordicCleanTemplate data={data} settings={settings} />;
    case 'ats-compact':
      return <AtsCompactTemplate data={data} settings={settings} />;
    case 'vibrant-startup':
      return <VibrantStartupTemplate data={data} settings={settings} />;
    default:
      return <ExecutiveTemplate data={data} settings={settings} />;
  }
};
