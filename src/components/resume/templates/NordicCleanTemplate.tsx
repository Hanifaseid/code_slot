import React from 'react';
import { ResumeData, ResumeSettings } from '../../../types/resume';
import { colorThemes, getDensitySpacing } from './templateUtils';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
}

export const NordicCleanTemplate: React.FC<Props> = ({ data, settings }) => {
  const theme = colorThemes[settings.accentColor];
  const density = getDensitySpacing(settings.density);
  const { personalInfo, experience, skills, projects, education, certifications } = data;

  return (
    <div className={`bg-[#fdfcf9] text-neutral-900 font-sans ${density.padding} shadow-lg print:shadow-none w-full print:w-full min-h-[1100px] border border-neutral-200/60 print:border-none rounded-2xl print:rounded-none`}>
      {/* Header */}
      <header className="pb-5 border-b border-neutral-200/70">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span
              className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 inline-block"
              style={{ backgroundColor: theme.primaryBg, color: theme.accentText }}
            >
              {personalInfo.jobTitle}
            </span>
            <h1 className="text-3xl font-extrabold text-neutral-950 tracking-tight">
              {personalInfo.fullName}
            </h1>
          </div>

          <div className="text-[12px] text-neutral-600 flex flex-wrap sm:flex-col sm:items-end gap-x-3 gap-y-0.5">
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            <span>{personalInfo.location}</span>
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-900">
                {personalInfo.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <div className={`mt-5 ${density.sectionGap}`}>
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">About</h2>
            </div>
            <p className={`${density.textBase} text-neutral-700 leading-relaxed font-normal`}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Experience</h2>
            </div>
            <div className={density.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l border-neutral-200">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                    <span className="font-bold text-[13.5px] text-neutral-900">
                      {exp.title} <span className="text-neutral-500 font-normal">at</span> {exp.company}
                    </span>
                    <span className="text-[11.5px] text-neutral-500 font-medium">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className={`list-disc list-outside pl-4 ${density.bulletGap} text-neutral-700 text-[12.5px] mt-1`}>
                      {exp.highlights.map((h, idx) => (
                        <li key={idx} className="leading-snug">{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {(skills.technical.length > 0 || skills.tools.length > 0) && (
          <section>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Capabilities</h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.technical.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-[11.5px] font-medium border border-neutral-200 bg-white text-neutral-800"
                >
                  {s}
                </span>
              ))}
              {skills.tools.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-[11.5px] font-medium bg-neutral-100 text-neutral-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Selected Projects</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded-xl bg-white border border-neutral-200/70 shadow-2xs">
                  <div className="font-bold text-[12.5px] text-neutral-900">{proj.title}</div>
                  <p className="text-[12px] text-neutral-600 mt-1 leading-snug">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-600">
                          {t}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {education.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Education</h2>
              </div>
              {education.map((edu) => (
                <div key={edu.id} className="text-[12px]">
                  <div className="font-bold text-neutral-900">{edu.institution}</div>
                  <div className="text-neutral-700">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-[11px] text-neutral-500">{edu.startYear} – {edu.endYear}</div>
                </div>
              ))}
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Credentials</h2>
              </div>
              <div className="space-y-1 text-[12px]">
                {certifications.map((c) => (
                  <div key={c.id} className="flex justify-between">
                    <span className="font-medium text-neutral-800">{c.name}</span>
                    <span className="text-neutral-500 text-[11px]">{c.year}</span>
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
