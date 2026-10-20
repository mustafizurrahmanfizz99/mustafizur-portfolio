import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { VideoProject } from '../data/portfolioData';
import { Play, X, Sparkles, Plus, Edit2 } from 'lucide-react';

export const VideoShowcase: React.FC = () => {
  const { videoProjects, setIsAdminModalOpen, isAdminAuthenticated } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);

  const categories = [
    { id: 'all', label: `All Videos (${videoProjects.length})` },
    { id: 'product', label: `Product Ads (${videoProjects.filter((v) => v.category === 'product').length})` },
    { id: 'agency', label: `Agency & Promo (${videoProjects.filter((v) => v.category === 'agency').length})` },
    { id: 'architecture', label: `3D Architecture (${videoProjects.filter((v) => v.category === 'architecture').length})` },
    { id: 'education', label: `Course Promos (${videoProjects.filter((v) => v.category === 'education').length})` },
    { id: 'cinematic', label: `Cinematic (${videoProjects.filter((v) => v.category === 'cinematic').length})` },
  ];

  const filteredVideos = videoProjects.filter((v) => {
    if (activeCategory === 'all') return true;
    return v.category === activeCategory;
  });

  return (
    <section id="video-showcase" className="py-20 border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generative Video &amp; Commercials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Video Portfolio &amp; Showreel
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              High-converting product ads, 9:16 vertical reels, SaaS explainers, and architectural tours created with state-of-the-art AI video pipelines.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Admin Quick Add Button */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3.5 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAdminAuthenticated ? 'Manage / Add Videos' : 'Admin: Edit Videos'}</span>
            </button>

            {/* Category Filter Tabs */}
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between group"
            >
              {/* Video Player Container */}
              <div className="relative w-full bg-black overflow-hidden">
                <div className={`w-full ${video.aspectRatio === '9:16' ? 'aspect-9-16 max-h-[480px] mx-auto' : 'aspect-16-9'}`}>
                  <iframe
                    src={`https://player.vimeo.com/video/${video.vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    title={video.title}
                    loading="lazy"
                  />
                </div>

                {/* Aspect ratio badge */}
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm border border-slate-700/80 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-slate-300">
                  {video.aspectRatio === '9:16' ? '9:16 Vertical Reel' : '16:9 Landscape'}
                </div>
              </div>

              {/* Video Info Box */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-amber-400 font-semibold">{video.categoryLabel}</span>
                    {video.client && (
                      <span className="text-slate-400">Client: <strong className="text-slate-300">{video.client}</strong></span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 mb-2">
                    {video.title}
                  </h3>

                  {video.description && (
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedVideo(video)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-amber-400" />
                    <span>Expand Video</span>
                  </button>
                  <span className="text-[11px] font-mono text-slate-500">ID: {video.vimeoId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Player */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-[#0a0e17] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-bold text-white">{selectedVideo.title}</h4>
                  <p className="text-xs text-slate-400">
                    Category: {selectedVideo.categoryLabel} {selectedVideo.client ? `· Client: ${selectedVideo.client}` : ''}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-black flex items-center justify-center p-2 sm:p-4">
                <div className={`w-full ${selectedVideo.aspectRatio === '9:16' ? 'max-w-xs aspect-9-16' : 'aspect-16-9'}`}>
                  <iframe
                    src={`https://player.vimeo.com/video/${selectedVideo.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                    className="w-full h-full rounded-lg"
                    allow="autoplay; fullscreen; picture-in-picture"
                    title={selectedVideo.title}
                  />
                </div>
              </div>

              {selectedVideo.description && (
                <div className="p-4 bg-slate-900/50 border-t border-slate-800 text-xs text-slate-300">
                  <strong>Overview: </strong> {selectedVideo.description}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
