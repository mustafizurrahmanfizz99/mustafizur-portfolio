import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Play, 
  Sparkles, 
  HelpCircle, 
  CheckCircle, 
  Star, 
  Layers, 
  Edit3 
} from 'lucide-react';
import { CustomSection, CustomSectionItem } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface CustomSectionRendererProps {
  section: CustomSection;
}

export const CustomSectionRenderer: React.FC<CustomSectionRendererProps> = ({ section }) => {
  const { isAdminAuthenticated, setIsAdminModalOpen } = usePortfolio();
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    section.items.length > 0 ? section.items[0].id : null
  );

  if (!section.enabled) {
    return null;
  }

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  // Convert raw youtube url to embed format if needed
  const getEmbedVideoUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/').split('&')[0];
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  const getSectionIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'star':
        return <Star className="w-5 h-5 text-amber-400" />;
      case 'check':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'play':
      case 'video':
        return <Play className="w-5 h-5 text-cyan-400" />;
      case 'layers':
        return <Layers className="w-5 h-5 text-purple-400" />;
      case 'help':
      case 'question':
        return <HelpCircle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section 
      id={section.id} 
      className={`py-20 border-b border-slate-800/80 relative ${
        section.theme === 'gradient'
          ? 'bg-gradient-to-b from-slate-950 via-[#070b14] to-[#07090e]'
          : 'bg-[#07090e]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          {section.badge && (
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full inline-block mb-2">
              {section.badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              {section.subtitle}
            </p>
          )}

          {isAdminAuthenticated && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold bg-slate-900 border border-slate-800 hover:border-amber-400/40 px-3 py-1.5 rounded-lg transition-colors"
                title="Admin Panel এ এই সেকশন ম্যানেজ করুন"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>ম্যানেজ সেকশন (Admin)</span>
              </button>
            </div>
          )}
        </div>

        {/* LAYOUT 1: FAQ / ACCORDION */}
        {section.layout === 'faq' && (
          <div className="max-w-3xl mx-auto space-y-4">
            {section.items.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className={`border transition-all duration-200 rounded-2xl overflow-hidden ${
                    isOpen
                      ? 'bg-slate-900/90 border-amber-400/40 shadow-lg shadow-amber-500/5'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-bold text-white flex items-center gap-3">
                      <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-amber-400' : 'text-slate-500'}`} />
                      <span>{item.title}</span>
                    </span>
                    <span className="p-1 rounded-full bg-slate-800/80 text-slate-400 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-amber-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/60 whitespace-pre-line animate-fadeIn">
                      {item.description}
                      {item.buttonUrl && item.buttonText && (
                        <div className="mt-4">
                          <a
                            href={item.buttonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 underline"
                          >
                            <span>{item.buttonText}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* LAYOUT 2: CARDS GRID */}
        {section.layout === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/50 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-amber-500/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getSectionIcon(item.icon)}
                    </div>
                    {item.badge && (
                      <span className="text-[11px] font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-800/50 px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  
                  {item.imageUrl && (
                    <div className="mb-4 rounded-xl overflow-hidden h-40 border border-slate-800 bg-slate-950">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="text-xs font-semibold text-amber-400 mt-1">
                      {item.subtitle}
                    </p>
                  )}

                  {item.description && (
                    <p className="text-sm text-slate-300 mt-3 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  )}
                </div>

                {item.buttonUrl && item.buttonText && (
                  <div className="mt-6 pt-4 border-t border-slate-800/60">
                    <a
                      href={item.buttonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-white font-semibold text-xs transition-all"
                    >
                      <span>{item.buttonText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* LAYOUT 3: BANNER / CALL TO ACTION */}
        {section.layout === 'banner' && (
          <div className="max-w-4xl mx-auto">
            {section.items.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-cyan-500/10 border-2 border-amber-400/30 p-8 sm:p-12 text-center shadow-2xl shadow-amber-500/10"
              >
                {item.badge && (
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/20 border border-amber-400/30 px-3.5 py-1 rounded-full mb-4">
                    {item.badge}
                  </span>
                )}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-amber-300 font-semibold text-sm sm:text-base mt-2">
                    {item.subtitle}
                  </p>
                )}
                {item.description && (
                  <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                )}

                {item.buttonUrl && item.buttonText && (
                  <div className="mt-8 flex justify-center">
                    <a
                      href={item.buttonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
                    >
                      <span>{item.buttonText}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* LAYOUT 4: VIDEO EMBED */}
        {section.layout === 'video_embed' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {section.items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden p-4 space-y-4"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-800">
                  {item.videoUrl ? (
                    <iframe
                      src={getEmbedVideoUrl(item.videoUrl)}
                      title={item.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                      <Play className="w-12 h-12 mb-2 text-slate-600" />
                      <span className="text-xs">No video link provided</span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-xs text-amber-400 font-medium">{item.subtitle}</p>
                  )}
                  {item.description && (
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  )}
                </div>

                {item.buttonUrl && item.buttonText && (
                  <a
                    href={item.buttonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold underline pt-2"
                  >
                    <span>{item.buttonText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* LAYOUT 5: IMAGE GALLERY */}
        {section.layout === 'gallery' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.buttonUrl && item.buttonText && (
                    <a
                      href={item.buttonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold"
                    >
                      <span>{item.buttonText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
