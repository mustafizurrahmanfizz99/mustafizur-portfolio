import React from 'react';
import { ArrowDown, MessageCircle, Play, TrendingUp, Sparkles, CheckCircle2, Mail, ExternalLink, Edit3 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroProps {
  onSelectTab: (tab: 'all' | 'ads' | 'video') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectTab }) => {
  const { hero, personalInfo, videoProjects, setIsAdminModalOpen, isAdminAuthenticated } = usePortfolio();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Unboxed Metadata Kicker */}
            <div className="flex items-center flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span className="text-cyan-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                {hero.kickerAds || 'Meta Ads Specialist'}
              </span>
              <span aria-hidden="true" className="text-slate-600">&bull;</span>
              <span className="text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {hero.kickerVideo || 'AI Video Director'}
              </span>
              <span aria-hidden="true" className="text-slate-600">&bull;</span>
              <span className="text-slate-400">{hero.location || personalInfo.location}</span>

              {isAdminAuthenticated && (
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="ml-auto text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 border border-slate-800 bg-slate-900 px-2 py-0.5 rounded"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Hero</span>
                </button>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
              {hero.headlinePart1}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                {hero.headlineGradient1}
              </span>
              {hero.headlinePart2}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {hero.headlineGradient2}
              </span>
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl whitespace-pre-line">
              {hero.leadText || (
                <>
                  I am <strong className="text-white font-semibold">{personalInfo.name}</strong>, Meta Ads Specialist, digital marketer, and AI visual creator. I engineer scroll-stopping commercial video ads and execute disciplined Facebook &amp; Instagram Messenger sales funnels—consistently driving real buyer conversations for as low as <strong className="text-cyan-300 font-semibold">${personalInfo.stats.avgCpr.toFixed(2)} CPR</strong> even on tight daily budgets.
                </>
              )}
            </p>

            {/* Dual Quick Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
              <div className="bg-slate-900/80 border border-cyan-500/20 rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Data-Driven Meta Ads</h4>
                  <p className="text-xs text-slate-400 mt-0.5">CAPI integration, Messenger lead funnels, weekly A/B testing &amp; scalable ROAS.</p>
                </div>
              </div>
              <div className="bg-slate-900/80 border border-amber-500/20 rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Generative AI Video</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Commercial-grade product ads, 3D architectural tours, and viral 9:16 mobile reels.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#commission"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
              >
                <span>Start a Project</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#video-showcase"
                onClick={() => onSelectTab('video')}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-amber-400/50 font-semibold px-5 py-3.5 rounded-xl text-sm transition-all"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Watch AI Videos ({videoProjects.length})</span>
              </a>

              <a
                href="#case-studies"
                onClick={() => onSelectTab('ads')}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-400/50 font-semibold px-5 py-3.5 rounded-xl text-sm transition-all"
              >
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Meta Ads Proofs</span>
              </a>
            </div>

            {/* Verified Social Channels */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                Verified Direct:
              </span>
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {personalInfo.phone}</span>
              </a>
              <span className="text-slate-700">&bull;</span>
              <a
                href={personalInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                <span>Facebook Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-slate-700">&bull;</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{personalInfo.email}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Container with Photo & Floating Badges */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square flex items-center justify-center">
              
              {/* Outer Glowing Ring */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-500 via-amber-400 to-teal-400 opacity-70 blur-xl animate-pulse"></div>
              
              {/* Profile Image Frame */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-tr from-cyan-500 via-amber-400 to-emerald-400 shadow-2xl shadow-cyan-500/20">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 border-4 border-[#07090e]">
                  <img
                    src={hero.profileImage || personalInfo.name}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Top Floating Metric Badge (Meta Ads proof) */}
              <div className="absolute -top-2 -left-2 sm:top-6 sm:-left-4 bg-[#0d131f]/95 border border-cyan-500/40 rounded-2xl p-3.5 shadow-xl backdrop-blur-md flex items-center gap-3 animate-bounce [animation-duration:5s]">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {hero.topBadgeLabel || 'Conversations'}
                  </div>
                  <div className="text-base font-extrabold text-white">
                    {hero.topBadgeValue || `${personalInfo.stats.conversations.toLocaleString()}+ Generated`}
                  </div>
                </div>
              </div>

              {/* Bottom Floating Metric Badge (Cost per result) */}
              <div className="absolute -bottom-4 -right-2 sm:bottom-6 sm:-right-4 bg-[#14120a]/95 border border-amber-500/40 rounded-2xl p-3.5 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {hero.bottomBadgeLabel || 'Cost Efficiency'}
                  </div>
                  <div className="text-base font-extrabold text-amber-300">
                    {hero.bottomBadgeValue || `$${personalInfo.stats.avgCpr.toFixed(2)} Avg. CPR`}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Full-Width Quantitative KPI Strip Below Split */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 text-center sm:text-left">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
              Messenger Inquiries
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              {hero.kpiConversations || `${personalInfo.stats.conversations.toLocaleString()}+`}
            </div>
            <p className="text-xs text-slate-400 mt-1">Real buyer conversations generated</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 text-center sm:text-left">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
              Average Ad Cost
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              {hero.kpiAvgCpr || `$${personalInfo.stats.avgCpr.toFixed(2)}`}
            </div>
            <p className="text-xs text-slate-400 mt-1">Average Cost Per Result (CPR)</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 text-center sm:text-left">
            <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider block mb-1">
              AI Video Production
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              {hero.kpiVideoCount || `${videoProjects.length}+`}
            </div>
            <p className="text-xs text-slate-400 mt-1">Commercials, 3D promos &amp; reels</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 text-center sm:text-left">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
              Client Campaigns
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              {hero.kpiCampaignsCount || `${personalInfo.stats.campaigns}+`}
            </div>
            <p className="text-xs text-slate-400 mt-1">Campaigns managed &amp; scaled</p>
          </div>
        </div>

      </div>
    </section>
  );
};
