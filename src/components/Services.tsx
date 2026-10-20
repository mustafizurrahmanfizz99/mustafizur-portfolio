import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Target, Clapperboard, MessageSquare, Scissors, Cpu, Sparkles,
  SlidersHorizontal, Mic, Zap, ArrowRight, Plus, Edit2
} from 'lucide-react';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = () => {
  const { services, setIsAdminModalOpen, isAdminAuthenticated } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'ads' | 'video' | 'both'>('all');

  const filteredServices = services.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'both') return s.pillar === 'both';
    return s.pillar === filter;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-5 h-5 text-cyan-400" />;
      case 'Clapperboard': return <Clapperboard className="w-5 h-5 text-amber-400" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-cyan-400" />;
      case 'Scissors': return <Scissors className="w-5 h-5 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'SlidersHorizontal': return <SlidersHorizontal className="w-5 h-5 text-cyan-400" />;
      case 'Mic': return <Mic className="w-5 h-5 text-amber-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-300" />;
      default: return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-20 border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              End-To-End Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
              Services &amp; Growth Solutions
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Practical support designed for e-commerce, small businesses, and agencies looking for high ROI and scroll-stopping visuals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Admin Quick Button */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 px-3.5 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAdminAuthenticated ? 'Manage Services' : 'Admin: Edit Services'}</span>
            </button>

            {/* Interactive Filter Buttons */}
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filter === 'all'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({services.length})
              </button>
              <button
                onClick={() => setFilter('ads')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filter === 'ads'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Meta Ads
              </button>
              <button
                onClick={() => setFilter('video')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filter === 'video'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                AI Video
              </button>
              <button
                onClick={() => setFilter('both')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filter === 'both'
                    ? 'bg-gradient-to-r from-amber-500/20 to-cyan-500/20 text-yellow-300 border border-yellow-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All-in-One
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`relative bg-slate-900/60 border rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group ${
                service.pillar === 'both'
                  ? 'border-yellow-500/40 bg-gradient-to-b from-yellow-500/5 to-transparent'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Pillar Tag & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(service.icon)}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      service.pillar === 'ads'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                        : service.pillar === 'video'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20'
                    }`}
                  >
                    {service.pillar === 'ads'
                      ? 'Meta Ads'
                      : service.pillar === 'video'
                      ? 'AI Video'
                      : 'Hybrid Package'}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2.5">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Action Link to Commission Form */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                <a
                  href="#commission"
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <span>Request Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>

                {isAdminAuthenticated && (
                  <button
                    onClick={() => setIsAdminModalOpen(true)}
                    className="text-slate-500 hover:text-cyan-400 p-1"
                    title="Edit Service"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
