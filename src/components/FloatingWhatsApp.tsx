import React from 'react';
import { MessageCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const FloatingWhatsApp: React.FC = () => {
  const { personalInfo } = usePortfolio();

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40 group">
      <a
        href={personalInfo.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-all duration-300 font-bold text-xs"
        aria-label="Direct Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline-block">WhatsApp Chat</span>
      </a>
      <span className="sr-only">Contact via WhatsApp</span>
    </aside>
  );
};
