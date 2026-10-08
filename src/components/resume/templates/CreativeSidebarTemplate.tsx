import React from 'react';
import { ResumeData, ResumeSettings } from '../../../types/resume';
import { colorThemes, getDensitySpacing } from './templateUtils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, GraduationCap } from 'lucide-react';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
}

export const CreativeSidebarTemplate: React.FC<Props> = ({ data, settings }) => {
  const theme = colorThemes[settings.accentColor];
  const density = getDensitySpacing(settings.density);
  const { personalInfo, experience, skills, projects, education, certifications } = data;

  const initials = personalInfo.fullName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="bg-white text-neutral-900 font-sans shadow-lg print:shadow-none w-full print:w-full min-h-[1100px] border border-neutral-200/80 print:border-none rounded-xl print:rounded-none flex flex-col md:flex-row print:flex-row overflow-hidden">
      {/* Left Sidebar (32% width) */}
      <aside
        className="w-full md:w-[32%] print:w-[32%] p-6 sm:p-7 shrink-0 text-neutral-800 flex flex-col justify-between border-r border-neutral-200"
        style={{ backgroundColor: theme.primaryBg }}
      >
        <div className="space-y-6">
          {/* Avatar / Monogram Header */}
          <div className="text-center sm:text-left">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-sm mb-3"
              style={{ backgroundColor: theme.primary }}
            >
              {initials}
            </div>
            <h1 className="text-xl font-extrabold text-neutral-950 tracking-tight leading-tight">
              {personalInfo.fullName}
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider mt-1" style={{ color: theme.accentText }}>
              {personalInfo.jobTitle}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-[12px] pt-4 border-t border-neutral-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">
              Contact & Social
            </span>
            {personalInfo.email && (
              <div className="flex items-center gap-2 text-neutral-700">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accentText }} />
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2 text-neutral-700">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accentText }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2 text-neutral-700">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accentText }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2 text-neutral-700">
                <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accentText }} />
                <a href={personalInfo.website} target="_blank" rel="noreferrer" className="truncate hover:underline">
                  {personalInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2 text-neutral-700">
                <Linkedin className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accentText }} />
                <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="truncate hover:underline">
                  {personalInfo.linkedin.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2 text-neutral-700">
                <Github className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accentText }} />
                <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="truncate hover:underline">
                  {personalInfo.github.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>

          {/* Skills Badges */}
          <div className="space-y-3 pt-4 border-t border-neutral-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
              Technical Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {skills.technical.map((sk, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white text-neutral-800 shadow-2xs border border-neutral-200/60"
                >
                  {sk}
                </span>
              ))}
            </div>

            {skills.tools.length > 0 && (
              <>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block pt-2">
                  Cloud & Tooling
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.tools.map((tl, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/70 text-neutral-700 border border-neutral-200/50"
                    >
                      {tl}
                    </span>
                  ))}
                </div>
              </>
            )}

            {skills.soft.length > 0 && (
              <>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block pt-2">
                  Leadership & Core
                </span>
                <p className="text-[11.5px] text-neutral-600 leading-snug">
                  {skills.soft.join(', ')}
                </p>
              </>
            )}
          </div>

          {/* Education in Sidebar */}
          {education.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-neutral-200/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                Education
              </span>
              {education.map((edu) => (
                <div key={edu.id} className="text-[11.5px]">
                  <div className="font-bold text-neutral-900">{edu.institution}</div>
                  <div className="text-neutral-700">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-neutral-500 text-[11px]">{edu.startYear} - {edu.endYear}</div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications in Sidebar */}
          {certifications && certifications.length > 0 && (
            <div className="space-y-1.5 pt-4 border-t border-neutral-200/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Credentials
              </span>
              {certifications.map((c) => (
                <div key={c.id} className="text-[11.5px]">
                  <span className="font-bold text-neutral-800">{c.name}</span>
                  <div className="text-neutral-500 text-[10.5px]">{c.issuer} ({c.year})</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Right Column (68% width) */}
      <main className={`flex-1 p-6 sm:p-9 ${density.sectionGap}`}>
        {/* Executive Summary */}
        {personalInfo.summary && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 border-b pb-1"
              style={{ color: theme.primary, borderColor: theme.primaryBorder }}
            >
              Professional Profile
            </h2>
            <p className={`${density.textBase} text-neutral-700 leading-relaxed text-justify`}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 border-b pb-1"
              style={{ color: theme.primary, borderColor: theme.primaryBorder }}
            >
              Work History
            </h2>
            <div className={density.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                    <div>
                      <span className="font-bold text-[14px] text-neutral-900">{exp.title}</span>
                      <span className="text-[13px] font-medium text-neutral-600 ml-1">
                        • {exp.company}
                      </span>
                    </div>
                    <span className="text-[11.5px] font-semibold text-neutral-500 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className={`list-disc list-outside pl-4 ${density.bulletGap} text-neutral-700 text-[12.5px] mt-1`}>
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

        {/* Featured Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 border-b pb-1"
              style={{ color: theme.primary, borderColor: theme.primaryBorder }}
            >
              Key Engineering Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/60">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[13px] text-neutral-900">{proj.title}</span>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11.5px] text-neutral-500 hover:underline">
                        View Demo ↗
                      </a>
                    )}
                  </div>
                  <p className="text-[12px] text-neutral-600 mt-0.5 leading-snug">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="text-[10.5px] font-medium px-1.5 py-0.2 rounded bg-neutral-200/60 text-neutral-700">
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
      </main>
    </div>
  );
};
