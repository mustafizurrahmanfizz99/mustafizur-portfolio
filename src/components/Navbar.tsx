import React, { useState } from 'react';
import { MessageCircle, Menu, X, Shield, Lock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  activeTab: 'all' | 'ads' | 'video';
  setActiveTab: (tab: 'all' | 'ads' | 'video') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { personalInfo, setIsAdminModalOpen, isAdminAuthenticated, sections } = usePortfolio();

  const sectionLinksMap: Record<string, { label: string; href: string }> = {
    hero: { label: 'Home', href: '#hero' },
    about: { label: 'About', href: '#about' },
    services: { label: 'Services', href: '#services' },
    videoShowcase: { label: 'AI Video Portfolio', href: '#video-showcase' },
    caseStudies: { label: 'Meta Ads Proof', href: '#case-studies' },
    testimonials: { label: 'Testimonials', href: '#testimonials' },
    contact: { label: 'Hire Me', href: '#commission' },
  };

  const navLinks = (sections || [])
    .filter((sec) => sec.enabled && sec.id !== 'hero')
    .map((sec) => {
      if (sectionLinksMap[sec.id]) {
        return sectionLinksMap[sec.id];
      }
      return {
        label: sec.title.length > 18 ? sec.title.slice(0, 16) + '...' : sec.title,
        href: `#${sec.id}`,
      };
    });

  return (
    <header className="sticky top-0 z-50 bg-[#07090e]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Zone 1: Brand Wordmark (Single line, text-first) */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-cyan-400 p-[2px] shadow-lg shadow-amber-500/10">
              <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                MR
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight group-hover:text-amber-400 transition-colors whitespace-nowrap">
                {personalInfo.name}
              </span>
              <span className="text-xs text-slate-400 tracking-wide whitespace-nowrap">
                Meta Ads <span className="text-cyan-400 font-semibold">&bull;</span> AI Video Creator
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Single-line controls) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Discipline Quick Filter & Primary CTA & Admin Trigger */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-slate-400">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('ads')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap flex items-center gap-1 ${
                  activeTab === 'ads'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                    : 'hover:text-cyan-300'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Meta Ads
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap flex items-center gap-1 ${
                  activeTab === 'video'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                    : 'hover:text-amber-300'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                AI Video
              </button>
            </div>

            {/* Admin Panel Button */}
            <button
              onClick={() => window.location.assign('/admin/')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                isAdminAuthenticated
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 shadow-sm shadow-emerald-500/10'
                  : 'bg-slate-900 text-amber-300 border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-500/50'
              }`}
              title={isAdminAuthenticated ? "অ্যাডমিন প্যানেল (লগইন সক্রিয়)" : "অ্যাডমিন লগইন (পাসওয়ার্ড সুরক্ষিত)"}
            >
              {isAdminAuthenticated ? (
                <>
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Admin Panel</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Login</span>
                </>
              )}
            </button>

            <a
              href={personalInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-all shadow-md shadow-amber-500/20 hover:scale-[1.02] whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Let's Talk</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => window.location.assign('/admin/')}
              className="p-2 text-slate-300 hover:text-amber-400 rounded-lg bg-slate-900 border border-slate-800"
              title="Admin Panel"
            >
              <Lock className="w-4 h-4" />
            </button>
            <a
              href={personalInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-amber-400 hover:text-white"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0e17] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex gap-2 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs mb-3">
            <button
              onClick={() => { setActiveTab('all'); setMobileMenuOpen(false); }}
              className={`flex-1 py-1.5 text-center rounded ${activeTab === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'}`}
            >
              All Works
            </button>
            <button
              onClick={() => { setActiveTab('ads'); setMobileMenuOpen(false); }}
              className={`flex-1 py-1.5 text-center rounded ${activeTab === 'ads' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'}`}
            >
              Meta Ads
            </button>
            <button
              onClick={() => { setActiveTab('video'); setMobileMenuOpen(false); }}
              className={`flex-1 py-1.5 text-center rounded ${activeTab === 'video' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400'}`}
            >
              AI Video
            </button>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { window.location.assign('/admin/'); setMobileMenuOpen(false); }}
            className={`flex items-center justify-center gap-2 w-full font-bold py-2.5 rounded-lg text-xs mt-2 transition-all ${
              isAdminAuthenticated
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                : 'bg-slate-900 text-amber-300 border border-amber-500/30'
            }`}
          >
            {isAdminAuthenticated ? <Shield className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-amber-400" />}
            <span>{isAdminAuthenticated ? 'Open Admin Panel (Unlocked)' : 'Admin Login (পাসওয়ার্ড সুরক্ষিত)'}</span>
          </button>
          <a
            href={personalInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-amber-400 text-slate-950 font-bold py-3 rounded-lg text-sm mt-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp ({personalInfo.phone})</span>
          </a>
        </div>
      )}
    </header>
  );
};
