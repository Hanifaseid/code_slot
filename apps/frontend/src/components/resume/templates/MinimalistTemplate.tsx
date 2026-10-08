import React from 'react';
import { ResumeData, ResumeSettings } from '../../../types/resume';
import { colorThemes, getDensitySpacing } from './templateUtils';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
}

export const MinimalistTemplate: React.FC<Props> = ({ data, settings }) => {
  const theme = colorThemes[settings.accentColor];
  const density = getDensitySpacing(settings.density);
  const { personalInfo, experience, skills, projects, education, certifications } = data;

  return (
    <div className={`bg-white text-neutral-900 font-sans ${density.padding} shadow-lg print:shadow-none w-full print:w-full min-h-[1100px] border border-neutral-200/80 print:border-none rounded-xl print:rounded-none`}>
      {/* Header */}
      <header className="border-b-2 border-neutral-900 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-neutral-950 uppercase font-mono">
              {personalInfo.fullName}
            </h1>
            <p className="text-sm font-bold tracking-wider uppercase text-neutral-600 mt-0.5">
              {personalInfo.jobTitle}
            </p>
          </div>
          <div className="text-[12px] font-mono text-neutral-600 sm:text-right flex flex-col gap-0.5">
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            <span>{personalInfo.location}</span>
          </div>
        </div>

        {/* Links bar */}
        {(personalInfo.website || personalInfo.github || personalInfo.linkedin) && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] font-mono text-neutral-500">
            {personalInfo.website && (
              <span>web: {personalInfo.website.replace(/^https?:\/\//, '')}</span>
            )}
            {personalInfo.github && (
              <span>gh: {personalInfo.github.replace(/^https?:\/\//, '')}</span>
            )}
            {personalInfo.linkedin && (
              <span>li: {personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
            )}
          </div>
        )}
      </header>

      {/* Body */}
      <div className={`mt-5 ${density.sectionGap}`}>
        {/* Profile Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
              // 01. SUMMARY
            </h2>
            <p className={`${density.textBase} text-neutral-800 leading-relaxed font-sans`}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Skills */}
        {(skills.technical.length > 0 || skills.tools.length > 0) && (
          <section>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
              // 02. TECHNICAL SKILLS
            </h2>
            <div className="space-y-1.5 text-[12.5px]">
              {skills.technical.length > 0 && (
                <div className="flex flex-wrap items-baseline gap-1">
                  <span className="font-mono font-bold text-neutral-900 text-[11.5px] mr-1">LANGUAGES & ARCHITECTURE:</span>
                  {skills.technical.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded text-[11px] font-mono border border-neutral-300 bg-neutral-50 text-neutral-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {skills.tools.length > 0 && (
                <div className="flex flex-wrap items-baseline gap-1">
                  <span className="font-mono font-bold text-neutral-900 text-[11.5px] mr-1">SYSTEMS & TOOLS:</span>
                  {skills.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-neutral-100 text-neutral-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {skills.soft.length > 0 && (
                <div className="text-[12px] text-neutral-600 font-sans">
                  <span className="font-mono font-bold text-neutral-900 text-[11.5px] mr-1">METHODOLOGIES:</span>
                  {skills.soft.join(', ')}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
              // 03. EXPERIENCE
            </h2>
            <div className={density.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-neutral-200 pl-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                    <div>
                      <span className="font-bold text-[13.5px] text-neutral-950">{exp.title}</span>
                      <span className="text-neutral-600 text-[13px] ml-1">@ {exp.company}</span>
                    </div>
                    <span className="text-[11.5px] font-mono text-neutral-500 whitespace-nowrap">
                      [{exp.startDate} - {exp.current ? 'PRESENT' : exp.endDate}]
                    </span>
                  </div>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className={`list-disc list-outside pl-4 ${density.bulletGap} text-neutral-700 text-[12px] mt-1`}>
                      {exp.highlights.map((hl, i) => (
                        <li key={i} className="leading-snug">
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
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
              // 04. PROJECTS
            </h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id} className="text-[12.5px]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">{proj.title}</span>
                    {proj.link && (
                      <span className="font-mono text-[11px] text-neutral-500">{proj.link.replace(/^https?:\/\//, '')}</span>
                    )}
                  </div>
                  <p className="text-neutral-700 text-[12px] leading-snug">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="font-mono text-[10px] text-neutral-500">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certs */}
        {(education.length > 0 || (certifications && certifications.length > 0)) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {education.length > 0 && (
              <section>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                  // 05. EDUCATION
                </h2>
                {education.map((edu) => (
                  <div key={edu.id} className="text-[12px]">
                    <div className="font-bold text-neutral-900">{edu.institution}</div>
                    <div className="text-neutral-700">{edu.degree} in {edu.fieldOfStudy}</div>
                    <div className="font-mono text-[11px] text-neutral-500">{edu.startYear} - {edu.endYear}</div>
                  </div>
                ))}
              </section>
            )}

            {certifications && certifications.length > 0 && (
              <section>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                  // 06. CERTIFICATIONS
                </h2>
                {certifications.map((c) => (
                  <div key={c.id} className="text-[12px] flex justify-between">
                    <span>{c.name} <span className="text-neutral-500 text-[11px]">({c.issuer})</span></span>
                    <span className="font-mono text-[11px] text-neutral-500">{c.year}</span>
                  </div>
                ))}
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
