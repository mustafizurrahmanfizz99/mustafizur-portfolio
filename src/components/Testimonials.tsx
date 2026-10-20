import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Quote, Star, Plus, Edit2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { testimonials, setIsAdminModalOpen, isAdminAuthenticated } = usePortfolio();

  return (
    <section id="testimonials" className="py-20 border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Client Feedback &amp; Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
              Client Testimonials
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Real feedback from business owners, agency partners, and course founders.
            </p>
          </div>

          {/* Admin Edit Trigger */}
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3.5 py-1.5 rounded-lg transition-colors self-start md:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAdminAuthenticated ? 'Manage Testimonials' : 'Admin: Edit Reviews'}</span>
          </button>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  {isAdminAuthenticated && (
                    <button
                      onClick={() => setIsAdminModalOpen(true)}
                      className="text-slate-500 hover:text-amber-400 p-1"
                      title="Edit review in Admin"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-cyan-500 p-[1px] shrink-0">
                  <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center font-bold text-xs text-white">
                    {t.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">{t.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t.role} &bull; <strong className="text-amber-400 font-medium">{t.company}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
