import React from 'react';
import { ResumeData, ResumeSettings } from '../../../types/resume';
import { colorThemes, getDensitySpacing } from './templateUtils';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
}

export const IvyClassicTemplate: React.FC<Props> = ({ data, settings }) => {
  const theme = colorThemes[settings.accentColor];
  const density = getDensitySpacing(settings.density);
  const { personalInfo, experience, skills, projects, education, certifications } = data;

  return (
    <div className={`bg-white text-neutral-900 font-serif ${density.padding} shadow-lg print:shadow-none w-full print:w-full min-h-[1100px] border border-neutral-200/80 print:border-none rounded-xl print:rounded-none`}>
      {/* Centered Traditional Header */}
      <header className="text-center border-b-2 border-neutral-800 pb-4">
        <h1 className="text-3xl font-normal tracking-normal text-neutral-950 uppercase font-serif">
          {personalInfo.fullName}
        </h1>
        <p
          className="text-sm font-semibold tracking-widest uppercase mt-1"
          style={{ color: theme.accentText }}
        >
          {personalInfo.jobTitle}
        </p>

        {/* Contact info in centered pipe-separated row */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 text-[12px] text-neutral-600 mt-2 font-sans">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.location && personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.email && <span>•</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.website && (
            <>
              <span>•</span>
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="hover:underline">
                {personalInfo.website.replace(/^https?:\/\//, '')}
              </a>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </>
          )}
        </div>
      </header>

      {/* Body */}
      <div className={`mt-5 ${density.sectionGap}`}>
        {/* Executive Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2 font-serif">
              Professional Summary
            </h2>
            <p className={`${density.textBase} text-neutral-800 leading-relaxed font-serif text-justify`}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Education (Frequently placed on top in academic/ivy styles) */}
        {education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2 font-serif">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-[13px]">
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-neutral-950 font-serif">{edu.institution}</span>
                    <span className="text-[12px] italic text-neutral-600 font-sans">
                      {edu.location ? `${edu.location} | ` : ''}{edu.startYear} – {edu.endYear}
                    </span>
                  </div>
                  <div className="text-neutral-800 italic">
                    {edu.degree} in {edu.fieldOfStudy}
                  </div>
                  {edu.details && (
                    <div className="text-[12px] text-neutral-600 mt-0.5 font-sans">{edu.details}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2.5 font-serif">
              Professional Experience
            </h2>
            <div className={density.itemGap}>
              {experience.map((item) => (
                <div key={item.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-0.5">
                    <div>
                      <span className="font-bold text-[14px] text-neutral-950 font-serif">{item.company}</span>
                      <span className="text-neutral-700 italic ml-2 text-[13.5px]">
                        — {item.title}
                      </span>
                    </div>
                    <span className="text-[12px] italic text-neutral-600 font-sans">
                      {item.startDate} – {item.current ? 'Present' : item.endDate}
                    </span>
                  </div>

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className={`list-disc list-outside pl-4 ${density.bulletGap} text-neutral-800 text-[12.5px] mt-1 font-sans`}>
                      {item.highlights.map((hl, idx) => (
                        <li key={idx} className="leading-relaxed">
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

        {/* Skills */}
        {(skills.technical.length > 0 || skills.tools.length > 0) && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2 font-serif">
              Skills & Qualifications
            </h2>
            <div className="space-y-1 text-[12.5px] font-sans">
              {skills.technical.length > 0 && (
                <div>
                  <span className="font-bold text-neutral-900">Technical Competencies: </span>
                  <span className="text-neutral-700">{skills.technical.join(', ')}</span>
                </div>
              )}
              {skills.tools.length > 0 && (
                <div>
                  <span className="font-bold text-neutral-900">Platforms & Tools: </span>
                  <span className="text-neutral-700">{skills.tools.join(', ')}</span>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div>
                  <span className="font-bold text-neutral-900">Core Practices: </span>
                  <span className="text-neutral-700">{skills.soft.join(', ')}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Projects / Certifications */}
        {((projects && projects.length > 0) || (certifications && certifications.length > 0)) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {projects && projects.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2 font-serif">
                  Selected Works
                </h2>
                <div className="space-y-1.5 font-sans text-[12px]">
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <span className="font-bold text-neutral-900">{proj.title}</span>
                      <p className="text-neutral-600 leading-snug">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications && certifications.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2 font-serif">
                  Certifications
                </h2>
                <div className="space-y-1 font-sans text-[12px]">
                  {certifications.map((c) => (
                    <div key={c.id} className="flex justify-between">
                      <span className="font-medium text-neutral-800">{c.name} ({c.issuer})</span>
                      <span className="text-neutral-500">{c.year}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
