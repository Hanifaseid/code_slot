import React from 'react';
import { ResumeData, ResumeSettings } from '../../../types/resume';
import { colorThemes, getDensitySpacing } from './templateUtils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from 'lucide-react';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
}

export const ExecutiveTemplate: React.FC<Props> = ({ data, settings }) => {
  const theme = colorThemes[settings.accentColor];
  const density = getDensitySpacing(settings.density);
  const { personalInfo, experience, skills, projects, education, certifications } = data;

  return (
    <div className={`bg-white text-neutral-900 font-sans ${density.padding} shadow-lg print:shadow-none w-full print:w-full min-h-[1100px] border border-neutral-200/80 print:border-none rounded-xl print:rounded-none relative`}>
      {/* Top Refined Accent Bar */}
      <div
        className="h-2 w-full rounded-t-lg print:rounded-none absolute top-0 left-0"
        style={{ backgroundColor: theme.primary }}
      />

      {/* Header */}
      <header className="border-b border-neutral-200 pb-5 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950 font-serif">
              {personalInfo.fullName}
            </h1>
            <p
              className="text-base font-semibold tracking-wide uppercase mt-1"
              style={{ color: theme.accentText }}
            >
              {personalInfo.jobTitle}
            </p>
          </div>

          {/* Quick Contact Grid */}
          <div className="text-[12px] text-neutral-600 flex flex-col gap-1 sm:text-right">
            {personalInfo.email && (
              <span className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personalInfo.email}</span>
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personalInfo.location}</span>
              </span>
            )}
          </div>
        </div>

        {/* Links row */}
        {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 pt-2 border-t border-neutral-100 text-[11.5px] text-neutral-600">
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline text-neutral-700">
                <Globe className="w-3 h-3 text-neutral-400" />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {personalInfo.linkedin && (
              <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline text-neutral-700">
                <Linkedin className="w-3 h-3 text-neutral-400" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {personalInfo.github && (
              <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline text-neutral-700">
                <Github className="w-3 h-3 text-neutral-400" />
                <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className={`mt-5 ${density.sectionGap}`}>
        {/* Executive Summary */}
        {personalInfo.summary && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1 flex items-center justify-between"
              style={{ color: theme.primary, borderColor: theme.primaryBorder }}
            >
              <span>Executive Profile & Value Proposition</span>
            </h2>
            <p className={`${density.textBase} text-neutral-700 text-justify leading-relaxed`}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Core Competencies & Skills */}
        {(skills.technical.length > 0 || skills.tools.length > 0) && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2.5 border-b pb-1"
              style={{ color: theme.primary, borderColor: theme.primaryBorder }}
            >
              Core Competencies & Technical Mastery
            </h2>
            <div className="space-y-1.5 text-[12.5px]">
              {skills.technical.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-neutral-800 shrink-0 w-36">Technical Architecture:</span>
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {skills.technical.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[11.5px] font-medium"
                        style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.tools.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-neutral-800 shrink-0 w-36">Cloud, DevOps & Tools:</span>
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {skills.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[11.5px] font-medium bg-neutral-100 text-neutral-700"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-neutral-800 shrink-0 w-36">Leadership & Practices:</span>
                  <span className="text-neutral-700">{skills.soft.join(' • ')}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Professional Experience */}
        {experience.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 border-b pb-1"
              style={{ color: theme.primary, borderColor: theme.primaryBorder }}
            >
              Professional Experience
            </h2>
            <div className={density.itemGap}>
              {experience.map((item) => (
                <div key={item.id} className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                    <div>
                      <span className="font-bold text-[14px] text-neutral-900">{item.title}</span>
                      <span className="text-neutral-600 font-medium text-[13px] ml-1.5">
                        | {item.company}
                      </span>
                    </div>
                    <span className="text-[12px] font-semibold text-neutral-500 whitespace-nowrap">
                      {item.startDate} – {item.current ? 'Present' : item.endDate}
                      {item.location && ` • ${item.location}`}
                    </span>
                  </div>

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className={`list-disc list-outside pl-4 ${density.bulletGap} text-neutral-700 text-[12.5px] mt-1`}>
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

        {/* Key Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2.5 border-b pb-1"
              style={{ color: theme.primary, borderColor: theme.primaryBorder }}
            >
              Strategic Projects & Architectures
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded-lg border border-neutral-200/80 bg-neutral-50/50">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[13px] text-neutral-900">{proj.title}</span>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-800">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-[12px] text-neutral-600 mt-1 leading-snug">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-neutral-200/70 text-neutral-700">
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

        {/* Education & Certifications Row */}
        {(education.length > 0 || (certifications && certifications.length > 0)) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {education.length > 0 && (
              <section>
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1"
                  style={{ color: theme.primary, borderColor: theme.primaryBorder }}
                >
                  Education
                </h2>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-[12.5px]">
                      <div className="font-bold text-neutral-900">{edu.institution}</div>
                      <div className="text-neutral-700 font-medium">
                        {edu.degree} in {edu.fieldOfStudy}
                      </div>
                      <div className="text-[11.5px] text-neutral-500">
                        {edu.startYear} – {edu.endYear} {edu.location && `• ${edu.location}`}
                      </div>
                      {edu.details && (
                        <div className="text-[11.5px] text-neutral-600 mt-0.5">{edu.details}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications && certifications.length > 0 && (
              <section>
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1"
                  style={{ color: theme.primary, borderColor: theme.primaryBorder }}
                >
                  Certifications & Credentials
                </h2>
                <div className="space-y-1.5">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-[12px] flex items-baseline justify-between">
                      <div>
                        <span className="font-bold text-neutral-800">{cert.name}</span>
                        <span className="text-neutral-500 text-[11px] block sm:inline sm:ml-1.5">
                          ({cert.issuer})
                        </span>
                      </div>
                      <span className="text-[11.5px] font-semibold text-neutral-500 ml-2">
                        {cert.year}
                      </span>
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
