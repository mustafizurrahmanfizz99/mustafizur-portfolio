import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExternalLink, MessageCircle, Mail, MapPin, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { personalInfo, footer, setIsAdminModalOpen, isAdminAuthenticated } = usePortfolio();

  return (
    <footer className="bg-[#05060a] border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-10 border-b border-slate-900">
          
          {/* Left Brand Summary */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white tracking-tight">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md whitespace-pre-line">
              {footer.brandSummary || "Full-funnel digital growth partner combining generative AI video production (product commercials, 9:16 vertical reels) with data-backed Meta Ads management (Messenger lead funnels, CAPI, ROAS scaling)."}
            </p>
            <div className="flex items-center gap-4 text-xs pt-1">
              <span className="flex items-center gap-1.5 text-slate-500">
                <MapPin className="w-3.5 h-3.5" />
                {personalInfo.location}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Explore Works
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#video-showcase" className="hover:text-amber-400 transition-colors">
                  AI Video Portfolio &amp; Ads
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-cyan-400 transition-colors">
                  Meta Ads Proofs &amp; Case Studies
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Core Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Client Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Channels & Admin Access */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Direct Contact
            </div>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={personalInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: {personalInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{personalInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Facebook Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
                >
                  <span>YouTube Channel</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => window.location.assign('/admin/')}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-amber-400 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>{isAdminAuthenticated ? 'Admin Panel (Full Site Editor)' : 'Admin Login'}</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            {footer.copyright || `© 2026 ${personalInfo.name}. All rights reserved.`}
          </div>
          <div className="flex items-center gap-4">
            <span>Meta Ads Specialist</span>
            <span>&bull;</span>
            <span>AI Video Creator</span>
            <span>&bull;</span>
            <span>{personalInfo.location}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
