import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, CheckCircle, Edit3 } from 'lucide-react';

export const About: React.FC = () => {
  const { about, skills, personalInfo, hero, setIsAdminModalOpen, isAdminAuthenticated } = usePortfolio();

  return (
    <section id="about" className="py-20 border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            {about.badge || `About ${personalInfo.name}`}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
            {about.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            {about.subtitle}
          </p>

          {isAdminAuthenticated && (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit About Section in Admin</span>
            </button>
          )}
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Narrative & Key Strengths */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/50 shadow-lg shadow-amber-500/10 bg-slate-950">
                  <img
                    src={hero.profileImage || personalInfo.name}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white text-center sm:text-left">
                    {about.storyTitle}
                  </h3>
                  <p className="text-xs text-amber-300 font-medium mt-1 text-center sm:text-left">
                    {about.storySubtitle}
                  </p>
                </div>
              </div>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                {about.paragraph1}
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                {about.paragraph2}
              </p>

              {/* Core Strengths checklist */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm">{about.strength1Title}</strong>
                    <span className="text-xs sm:text-sm text-slate-400 ml-1.5">{about.strength1Desc}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm">{about.strength2Title}</strong>
                    <span className="text-xs sm:text-sm text-slate-400 ml-1.5">{about.strength2Desc}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm">{about.strength3Title}</strong>
                    <span className="text-xs sm:text-sm text-slate-400 ml-1.5">{about.strength3Desc}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-slate-900/40 border border-slate-800 rounded-xl text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Full Name</span>
                <span className="font-semibold text-white">{personalInfo.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Location</span>
                <span className="font-semibold text-white">{personalInfo.location}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Phone / WhatsApp</span>
                <span className="font-semibold text-emerald-400">{personalInfo.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Primary Focus</span>
                <span className="font-semibold text-amber-300">Video Ads &amp; Meta ROAS</span>
              </div>
            </div>
          </div>

          {/* Right Column: Core Skills Proficiency */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center justify-between">
              <span>Skills &amp; Platform Mastery</span>
              <Award className="w-5 h-5 text-amber-400" />
            </h3>

            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.id || skill.name}>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                    <span className="text-slate-200">{skill.name}</span>
                    <span className={`font-mono tabular-nums ${skill.category === 'ads' ? 'text-cyan-400' : 'text-amber-400'}`}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        skill.category === 'ads'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                          : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Tooling: Midjourney, Runway Gen-3, Kling, Luma Dream Machine, Premiere Pro, Meta Ads Manager, CAPI, Canva.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
