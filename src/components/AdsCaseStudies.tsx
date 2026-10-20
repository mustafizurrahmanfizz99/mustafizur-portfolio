import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CaseStudy } from '../data/portfolioData';
import { TrendingUp, ZoomIn, X, CheckCircle, Plus } from 'lucide-react';

export const AdsCaseStudies: React.FC = () => {
  const { caseStudies, setIsAdminModalOpen, isAdminAuthenticated } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<'all' | 'sales' | 'leadgen' | 'engagement'>('all');
  const [activeModalProof, setActiveModalProof] = useState<CaseStudy | null>(null);

  const filteredCases = caseStudies.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.category === activeFilter;
  });

  return (
    <section id="case-studies" className="py-20 border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Verified Campaign Results</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Meta Ads Proofs &amp; Case Studies
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Authentic Ads Manager dashboard screenshots and verified performance data from live client campaigns in Bangladesh.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Admin Quick Edit Button */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 px-3.5 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAdminAuthenticated ? 'Manage / Edit Case Studies' : 'Admin: Edit Cases'}</span>
            </button>

            {/* Filter Pills */}
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  activeFilter === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Proofs ({caseStudies.length})
              </button>
              <button
                onClick={() => setActiveFilter('sales')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  activeFilter === 'sales'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sales
              </button>
              <button
                onClick={() => setActiveFilter('leadgen')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  activeFilter === 'leadgen'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Lead Gen
              </button>
              <button
                onClick={() => setActiveFilter('engagement')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  activeFilter === 'engagement'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Engagement
              </button>
            </div>
          </div>
        </div>

        {/* Case Studies Cards */}
        <div className="space-y-12">
          {filteredCases.map((cs, idx) => (
            <div
              key={cs.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden p-6 sm:p-8 transition-all hover:border-cyan-500/40"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Proof Image Column with Zoom affordance */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 group">
                    <img
                      src={cs.proofImage}
                      alt={`${cs.title} Ads Manager Proof`}
                      className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                      onClick={() => setActiveModalProof(cs)}
                    />
                    <div
                      onClick={() => setActiveModalProof(cs)}
                      className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-[2px]"
                    >
                      <span className="bg-cyan-500 text-slate-950 px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-lg">
                        <ZoomIn className="w-4 h-4" />
                        Inspect Proof Screenshot
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Verified snapshot from Meta Ads Manager dashboard
                  </p>
                </div>

                {/* Case Study Details Column */}
                <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Case Study 0{idx + 1} &bull; {cs.categoryLabel}
                    </span>
                    <span className="text-xs text-slate-400">Client: <strong className="text-white">{cs.client}</strong></span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    {cs.title}
                  </h3>

                  {/* 3 Metric Mini Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#0b101b] border border-cyan-500/20 rounded-xl p-3 text-center">
                      <div className="text-lg sm:text-2xl font-extrabold text-cyan-300 font-mono tabular-nums">
                        {cs.conversations}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Conversations</div>
                    </div>

                    <div className="bg-[#0b101b] border border-cyan-500/20 rounded-xl p-3 text-center">
                      <div className="text-lg sm:text-2xl font-extrabold text-emerald-300 font-mono tabular-nums">
                        {cs.costPerResult}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Cost per Result</div>
                    </div>

                    <div className="bg-[#0b101b] border border-cyan-500/20 rounded-xl p-3 text-center">
                      <div className="text-lg sm:text-2xl font-extrabold text-slate-100 font-mono tabular-nums">
                        {cs.reach}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Total Reach</div>
                    </div>
                  </div>

                  {/* Challenges vs Strategy */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                      <h5 className="font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                        Key Challenges
                      </h5>
                      <ul className="space-y-1.5 text-slate-400">
                        {cs.challenges.map((ch, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-slate-500">&rsaquo;</span>
                            <span>{ch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                      <h5 className="font-bold uppercase tracking-wider text-cyan-300 mb-2 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                        Campaign Strategy
                      </h5>
                      <ul className="space-y-1.5 text-slate-400">
                        {cs.strategy.map((st, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-cyan-400">&rsaquo;</span>
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeModalProof && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full bg-[#0a0e17] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-bold text-white">{activeModalProof.title}</h4>
                  <span className="text-xs text-cyan-400 font-mono">
                    {activeModalProof.conversations} Conversations &bull; {activeModalProof.costPerResult} CPR &bull; {activeModalProof.reach} Reach
                  </span>
                </div>
                <button
                  onClick={() => setActiveModalProof(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-slate-950 flex items-center justify-center max-h-[80vh] overflow-auto">
                <img
                  src={activeModalProof.proofImage}
                  alt={activeModalProof.title}
                  className="max-w-full max-h-[72vh] object-contain rounded-lg border border-slate-800"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
