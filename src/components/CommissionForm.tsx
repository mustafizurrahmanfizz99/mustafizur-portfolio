import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { MessageCircle, CheckCircle2, Phone, Mail, MapPin, Copy, ExternalLink } from 'lucide-react';

export const CommissionForm: React.FC = () => {
  const { personalInfo } = usePortfolio();
  const [projectType, setProjectType] = useState<string>('All-in-One: AI Video + Meta Ads');
  const [timeline, setTimeline] = useState<string>('5-7 Days');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [brief, setBrief] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const projectTypes = [
    { id: 'hybrid', label: 'All-in-One: AI Video + Meta Ads (Best ROI)' },
    { id: 'meta-ads', label: 'Meta Ads Campaign Management' },
    { id: 'ai-video', label: 'AI Video Commercial / 3D Promo' },
    { id: 'reels-pack', label: '9:16 Viral Reels & Hooks Pack' },
    { id: 'ad-audit', label: 'Meta Ads Account Audit' },
  ];

  const timelines = [
    { id: 'rush', label: 'Rush (48h)' },
    { id: 'standard', label: '5-7 Days' },
    { id: 'flexible', label: '2+ Weeks' },
    { id: 'monthly', label: 'Monthly Retainer' },
  ];

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = personalInfo.phone.replace(/[^0-9]/g, '');
    const message = `Hi ${personalInfo.name.split(' ')[0]}, I would like to collaborate on a project:\n\n*Name/Brand:* ${name || 'N/A'}\n*Phone/WhatsApp:* ${phone || 'N/A'}\n*Email:* ${email || 'N/A'}\n*Service:* ${projectType}\n*Timeline:* ${timeline}\n*Budget/Daily Spend:* ${budget || 'Flexible'}\n*Project Brief:* ${brief || 'Interested in discussing details.'}`;
    const url = `https://wa.me/${cleanPhone || '8801745100199'}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  const handleDirectCopy = () => {
    const text = `Contact: ${personalInfo.name}\nWhatsApp: ${personalInfo.phone}\nEmail: ${personalInfo.email}\nLocation: ${personalInfo.location}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="commission" className="py-20 border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Start a Collaboration
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            Let's Build Something High-Converting
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Need a cinematic commercial, scroll-stopping 9:16 reels, or a low-CPR Meta Ads campaign? Get in touch directly.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Map placeholder */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
              <h3 className="text-lg font-bold text-white mb-2">Direct Contact Channels</h3>

              <div className="flex items-center gap-3.5 p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">Phone &amp; WhatsApp</div>
                  <a href={personalInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-emerald-400 hover:underline">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">Email Address</div>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-bold text-slate-200 hover:text-white hover:underline">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">Location</div>
                  <div className="text-sm font-bold text-slate-200">
                    {personalInfo.location}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleDirectCopy}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied Contact Info!' : 'Copy Contact Details'}</span>
                </button>
              </div>
            </div>

            {/* Direct WhatsApp Action Box */}
            <a
              href={personalInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 hover:border-emerald-500/60 rounded-2xl transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      Prefer Instant Messaging?
                    </h4>
                    <p className="text-xs text-slate-400">Click to open direct chat on WhatsApp</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              
              {/* 1. Service Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  1. What service do you need?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {projectTypes.map((pt) => (
                    <button
                      type="button"
                      key={pt.id}
                      onClick={() => setProjectType(pt.label)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-left transition-all border ${
                        projectType === pt.label
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold'
                          : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {pt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Timeline Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  2. Timeline Expectation
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timelines.map((tl) => (
                    <button
                      type="button"
                      key={tl.id}
                      onClick={() => setTimeline(tl.label)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-center transition-all border ${
                        timeline === tl.label
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold'
                          : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {tl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Your Name or Business *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe, Cafe Bangkok"
                    className="w-full bg-[#07090e] border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 01745-100199"
                    className="w-full bg-[#07090e] border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* 4. Email & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. yourname@domain.com"
                    className="w-full bg-[#07090e] border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Target Budget or Daily Spend
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. $5/day Meta ad or $150 video"
                    className="w-full bg-[#07090e] border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* 5. Project Brief */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Project Concept &amp; Requirements *
                </label>
                <textarea
                  required
                  rows={3}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Tell me about your product, target audience, visual references, or current ad performance..."
                  className="w-full bg-[#07090e] border border-slate-800 focus:border-amber-400 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp (+8801745100199)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!name || !phone) {
                      alert('Please provide at least your Name and Phone/WhatsApp number.');
                      return;
                    }
                    setSubmitted(true);
                  }}
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3.5 px-5 rounded-xl text-xs sm:text-sm transition-colors"
                >
                  Submit Form
                </button>
              </div>

              {submitted && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Inquiry recorded!</strong> If WhatsApp did not open automatically, reach out directly at <strong className="text-white">{personalInfo.phone}</strong> or <strong className="text-white">{personalInfo.email}</strong>.
                  </div>
                </div>
              )}

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
