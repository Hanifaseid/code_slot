import React from 'react';
import { ResumeData, ResumeSettings } from '../../../types/resume';
import { colorThemes, getDensitySpacing } from './templateUtils';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
}

export const AtsCompactTemplate: React.FC<Props> = ({ data, settings }) => {
  const theme = colorThemes[settings.accentColor];
  const density = getDensitySpacing('compact');
  const { personalInfo, experience, skills, projects, education, certifications } = data;

  return (
    <div className={`bg-white text-neutral-900 font-sans ${density.padding} shadow-lg print:shadow-none w-full print:w-full min-h-[1100px] border border-neutral-200/80 print:border-none rounded-xl print:rounded-none`}>
      {/* ATS Standard Header */}
      <header className="border-b border-neutral-300 pb-3 text-center sm:text-left flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
            {personalInfo.fullName}
          </h1>
          <p className="text-sm font-semibold" style={{ color: theme.accentText }}>
            {personalInfo.jobTitle}
          </p>
        </div>

        <div className="text-[11.5px] text-neutral-600 flex flex-wrap sm:flex-col sm:text-right gap-x-2 gap-y-0.5 justify-center sm:justify-start">
          <span>{personalInfo.location}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.email}</span>
          {personalInfo.linkedin && (
            <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="mt-4 space-y-3.5">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5 mb-1">
              Professional Summary
            </h2>
            <p className="text-[12px] text-neutral-800 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Technical Skills */}
        {(skills.technical.length > 0 || skills.tools.length > 0) && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5 mb-1.5">
              Technical Skills & Proficiencies
            </h2>
            <div className="text-[11.5px] space-y-1">
              {skills.technical.length > 0 && (
                <div>
                  <span className="font-bold text-neutral-900">Core Technologies: </span>
                  <span className="text-neutral-700">{skills.technical.join(', ')}</span>
                </div>
              )}
              {skills.tools.length > 0 && (
                <div>
                  <span className="font-bold text-neutral-900">Developer Tools & Platforms: </span>
                  <span className="text-neutral-700">{skills.tools.join(', ')}</span>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div>
                  <span className="font-bold text-neutral-900">Methodologies: </span>
                  <span className="text-neutral-700">{skills.soft.join(', ')}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5 mb-2">
              Work Experience
            </h2>
            <div className="space-y-2.5">
              {experience.map((item) => (
                <div key={item.id}>
                  <div className="flex items-baseline justify-between text-[12.5px]">
                    <div>
                      <span className="font-bold text-neutral-900">{item.title}</span>
                      <span className="text-neutral-700 ml-1.5 font-medium">— {item.company}</span>
                    </div>
                    <span className="text-[11px] text-neutral-500 whitespace-nowrap">
                      {item.startDate} – {item.current ? 'Present' : item.endDate}
                    </span>
                  </div>

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="list-disc list-outside pl-4 space-y-0.5 text-neutral-700 text-[11.5px] mt-1">
                      {item.highlights.map((hl, idx) => (
                        <li key={idx} className="leading-snug">
                          {hl}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5 mb-1.5">
              Key Projects
            </h2>
            <div className="space-y-1.5 text-[11.5px]">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-neutral-900">{proj.title}</span>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <span className="text-[10.5px] text-neutral-500">[{proj.technologies.join(', ')}]</span>
                    )}
                  </div>
                  <p className="text-neutral-700 leading-snug">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5 mb-1">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="text-[11.5px]">
                  <div className="font-bold text-neutral-900">{edu.institution}</div>
                  <div className="text-neutral-700">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-[10.5px] text-neutral-500">{edu.startYear} – {edu.endYear}</div>
                </div>
              ))}
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5 mb-1">
                Certifications
              </h2>
              <div className="space-y-0.5 text-[11.5px]">
                {certifications.map((c) => (
                  <div key={c.id} className="flex justify-between">
                    <span>{c.name} ({c.issuer})</span>
                    <span className="text-neutral-500">{c.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
