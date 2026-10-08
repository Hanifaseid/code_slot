import React from 'react';
import { ResumeData, ResumeSettings } from '../../../types/resume';
import { colorThemes, getDensitySpacing } from './templateUtils';
import { Sparkles, ExternalLink, Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
}

export const VibrantStartupTemplate: React.FC<Props> = ({ data, settings }) => {
  const theme = colorThemes[settings.accentColor];
  const density = getDensitySpacing(settings.density);
  const { personalInfo, experience, skills, projects, education, certifications } = data;

  return (
    <div className={`bg-white text-neutral-900 font-sans ${density.padding} shadow-lg print:shadow-none w-full print:w-full min-h-[1100px] border border-neutral-200/80 print:border-none rounded-2xl print:rounded-none relative overflow-hidden`}>
      {/* Top Gradient Stripe */}
      <div
        className="h-2.5 w-full absolute top-0 left-0"
        style={{
          background: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.ringColor} 50%, #f59e0b 100%)`
        }}
      />

      {/* Header */}
      <header className="pb-5 pt-1 border-b border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 shadow-2xs"
            style={{ backgroundColor: theme.primaryBg, color: theme.accentText }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{personalInfo.jobTitle}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight">
            {personalInfo.fullName}
          </h1>
        </div>

        {/* Contact Badges */}
        <div className="flex flex-wrap md:flex-col md:items-end gap-1.5 text-xs text-neutral-600">
          {personalInfo.email && (
            <span className="inline-flex items-center gap-1.5 bg-neutral-50 px-2.5 py-1 rounded-lg border border-neutral-200/60">
              <Mail className="w-3.5 h-3.5 text-neutral-400" />
              <span>{personalInfo.email}</span>
            </span>
          )}
          {personalInfo.phone && (
            <span className="inline-flex items-center gap-1.5 bg-neutral-50 px-2.5 py-1 rounded-lg border border-neutral-200/60">
              <Phone className="w-3.5 h-3.5 text-neutral-400" />
              <span>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.location && (
            <span className="inline-flex items-center gap-1.5 bg-neutral-50 px-2.5 py-1 rounded-lg border border-neutral-200/60">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>{personalInfo.location}</span>
            </span>
          )}
        </div>
      </header>

      {/* Links row */}
      {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
        <div className="flex flex-wrap gap-3 py-2 text-[12px] text-neutral-600 border-b border-neutral-100">
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-neutral-800 font-medium hover:underline">
              <Globe className="w-3 h-3 text-neutral-400" />
              {personalInfo.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          {personalInfo.github && (
            <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-neutral-800 font-medium hover:underline">
              <Github className="w-3 h-3 text-neutral-400" />
              {personalInfo.github.replace(/^https?:\/\//, '')}
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-neutral-800 font-medium hover:underline">
              <Linkedin className="w-3 h-3 text-neutral-400" />
              {personalInfo.linkedin.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>
      )}

      {/* Body */}
      <div className={`mt-5 ${density.sectionGap}`}>
        {/* Summary */}
        {personalInfo.summary && (
          <section className="bg-neutral-50/70 p-4 rounded-xl border border-neutral-200/50">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
              Impact Statement
            </h2>
            <p className={`${density.textBase} text-neutral-800 leading-relaxed`}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Tech Stack Pills */}
        {(skills.technical.length > 0 || skills.tools.length > 0) && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Superpowers & Tech Stack
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.technical.map((sk, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs font-bold shadow-2xs border border-transparent"
                  style={{ backgroundColor: theme.primaryBg, color: theme.accentText }}
                >
                  {sk}
                </span>
              ))}
              {skills.tools.map((tl, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-neutral-100 text-neutral-700"
                >
                  {tl}
                </span>
              ))}
            </div>
            {skills.soft.length > 0 && (
              <div className="mt-2 text-xs text-neutral-600">
                <span className="font-bold text-neutral-700">Practices: </span>
                {skills.soft.join(' • ')}
              </div>
            )}
          </section>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
              Work History
            </h2>
            <div className={density.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-3.5 border-l-2" style={{ borderColor: theme.primary }}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                    <div>
                      <span className="font-bold text-sm text-neutral-950">{exp.title}</span>
                      <span className="text-neutral-600 text-xs font-semibold ml-2 bg-neutral-100 px-2 py-0.5 rounded-md">
                        {exp.company}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-neutral-500 whitespace-nowrap">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className={`list-disc list-outside pl-4 ${density.bulletGap} text-neutral-700 text-xs mt-1`}>
                      {exp.highlights.map((hl, i) => (
                        <li key={i} className="leading-snug">{hl}</li>
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Featured Builds
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-xl border border-neutral-200/80 bg-white shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-neutral-900">{proj.title}</span>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-900">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 mt-1 leading-snug">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-neutral-900">{edu.institution}</div>
                  <div className="text-neutral-700">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-[11px] text-neutral-500">{edu.startYear} – {edu.endYear}</div>
                </div>
              ))}
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                Credentials
              </h2>
              <div className="space-y-1 text-xs">
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
