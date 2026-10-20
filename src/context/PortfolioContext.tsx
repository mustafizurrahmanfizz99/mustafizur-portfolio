import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  VideoProject,
  CaseStudy,
  Testimonial,
  SkillItem,
  ServiceItem,
  HeroData,
  AboutData,
  ContactData,
  FooterData,
  DEFAULT_HERO,
  DEFAULT_ABOUT,
  DEFAULT_SKILLS,
  DEFAULT_SERVICES,
  DEFAULT_CONTACT,
  DEFAULT_FOOTER,
  VIDEO_PROJECTS as DEFAULT_VIDEO_PROJECTS,
  CASE_STUDIES as DEFAULT_CASE_STUDIES,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  SectionItem,
  CustomSection,
  CustomSectionItem,
  CustomSectionLayout,
  DEFAULT_SECTIONS,
  DEFAULT_CUSTOM_SECTIONS,
} from '../data/portfolioData';
import initialCmsData from '../data/portfolio-cms.json';

export interface PersonalInfoShape {
  name: string;
  nickname: string;
  title: string;
  tagline: string;
  phone: string;
  whatsappUrl: string;
  email: string;
  location: string;
  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
  };
  stats: {
    conversations: number;
    avgCpr: number;
    campaigns: number;
    videoProjects: number;
    clientsServed: number;
  };
}

interface PortfolioContextType {
  hero: HeroData;
  about: AboutData;
  skills: SkillItem[];
  services: ServiceItem[];
  videoProjects: VideoProject[];
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
  contact: ContactData;
  footer: FooterData;
  personalInfo: PersonalInfoShape;

  // Dynamic Section Management
  sections: SectionItem[];
  customSections: CustomSection[];
  updateSections: (sections: SectionItem[]) => void;
  toggleSectionEnabled: (id: string, enabled?: boolean) => void;
  deleteSection: (id: string) => void;
  restoreSection: (id: string) => void;
  moveSection: (id: string, direction: 'up' | 'down') => void;
  addCustomSection: (section: Omit<CustomSection, 'id'> & { id?: string }) => string;
  updateCustomSection: (id: string, updated: Partial<CustomSection>) => void;
  deleteCustomSection: (id: string) => void;
  addCustomSectionItem: (sectionId: string, item: Omit<CustomSectionItem, 'id'>) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, item: Partial<CustomSectionItem>) => void;
  deleteCustomSectionItem: (sectionId: string, itemId: string) => void;

  isAdminAuthenticated: boolean;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  changePasscode: (newPasscode: string) => void;

  // CMS update methods
  updateHero: (data: Partial<HeroData>) => void;
  updateAbout: (data: Partial<AboutData>) => void;
  updateSkills: (skills: SkillItem[]) => void;
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  updateSkill: (id: string, updated: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;

  updateServices: (services: ServiceItem[]) => void;
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  updateTestimonials: (testimonials: Testimonial[]) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, updated: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  updateContact: (data: Partial<ContactData>) => void;
  updateFooter: (data: Partial<FooterData>) => void;
  updatePersonalInfo: (data: any) => void;

  // Video operations
  addVideoProject: (project: Omit<VideoProject, 'id'>) => void;
  updateVideoProject: (id: string, updated: Partial<VideoProject>) => void;
  deleteVideoProject: (id: string) => void;
  moveVideoProject: (id: string, direction: 'up' | 'down') => void;

  // Case study operations
  addCaseStudy: (caseStudy: Omit<CaseStudy, 'id'>) => void;
  updateCaseStudy: (id: string, updated: Partial<CaseStudy>) => void;
  deleteCaseStudy: (id: string) => void;

  // Backup, live sync & reset
  resetToDefaults: () => void;
  exportJSON: () => void;
  importJSON: (jsonStr: string) => boolean;
  publishToLiveServer: () => Promise<boolean>;
  serverSyncStatus: 'idle' | 'syncing' | 'synced' | 'error';
}

const STORAGE_KEY = 'mr_portfolio_full_cms_v2';
const PASSCODE_KEY = 'mr_portfolio_passcode_v2';
const AUTH_KEY = 'mr_portfolio_auth_v2';
const DEFAULT_PASSCODE = '';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const rawInitial = (initialCmsData || {}) as any;
  const [hero, setHero] = useState<HeroData>(() => (rawInitial?.hero ? { ...DEFAULT_HERO, ...rawInitial.hero } : DEFAULT_HERO));
  const [about, setAbout] = useState<AboutData>(() => (rawInitial?.about ? { ...DEFAULT_ABOUT, ...rawInitial.about } : DEFAULT_ABOUT));
  const [skills, setSkills] = useState<SkillItem[]>(() => (rawInitial?.skills && Array.isArray(rawInitial.skills) ? rawInitial.skills : DEFAULT_SKILLS));
  const [services, setServices] = useState<ServiceItem[]>(() => (rawInitial?.services && Array.isArray(rawInitial.services) ? rawInitial.services : DEFAULT_SERVICES));
  const [videoProjects, setVideoProjects] = useState<VideoProject[]>(() => (rawInitial?.videoProjects && Array.isArray(rawInitial.videoProjects) ? rawInitial.videoProjects : DEFAULT_VIDEO_PROJECTS));
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => (rawInitial?.caseStudies && Array.isArray(rawInitial.caseStudies) ? rawInitial.caseStudies : DEFAULT_CASE_STUDIES));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => (rawInitial?.testimonials && Array.isArray(rawInitial.testimonials) ? rawInitial.testimonials : DEFAULT_TESTIMONIALS));
  const [contact, setContact] = useState<ContactData>(() => (rawInitial?.contact ? { ...DEFAULT_CONTACT, ...rawInitial.contact } : DEFAULT_CONTACT));
  const [footer, setFooter] = useState<FooterData>(() => (rawInitial?.footer ? { ...DEFAULT_FOOTER, ...rawInitial.footer } : DEFAULT_FOOTER));

  const [sections, setSections] = useState<SectionItem[]>(() => {
    if (rawInitial?.sections && Array.isArray(rawInitial.sections) && rawInitial.sections.length > 0) {
      return rawInitial.sections;
    }
    return DEFAULT_SECTIONS;
  });

  const [customSections, setCustomSections] = useState<CustomSection[]>(() => {
    if (rawInitial?.customSections && Array.isArray(rawInitial.customSections) && rawInitial.customSections.length > 0) {
      return rawInitial.customSections;
    }
    return DEFAULT_CUSTOM_SECTIONS;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>(DEFAULT_PASSCODE);
  const [serverSyncStatus, setServerSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');

  // Helper to apply structured CMS data to React state
  const applyData = (p: any) => {
    if (!p) return;
    if (p.hero) setHero({ ...DEFAULT_HERO, ...p.hero });
    if (p.about) setAbout({ ...DEFAULT_ABOUT, ...p.about });
    if (p.skills && Array.isArray(p.skills)) setSkills(p.skills);
    if (p.services && Array.isArray(p.services)) setServices(p.services);
    if (p.videoProjects && Array.isArray(p.videoProjects)) setVideoProjects(p.videoProjects);
    if (p.caseStudies && Array.isArray(p.caseStudies)) setCaseStudies(p.caseStudies);
    if (p.testimonials && Array.isArray(p.testimonials)) setTestimonials(p.testimonials);
    if (p.contact) setContact({ ...DEFAULT_CONTACT, ...p.contact });
    if (p.footer) setFooter({ ...DEFAULT_FOOTER, ...p.footer });
    if (p.sections && Array.isArray(p.sections) && p.sections.length > 0) setSections(p.sections);
    if (p.customSections && Array.isArray(p.customSections)) setCustomSections(p.customSections);
  };

  // Load state on mount - fast local cache first, then sync with live server API
  useEffect(() => {
    let localData: any = null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        localData = JSON.parse(saved);
        applyData(localData);
      }

      const savedPass = localStorage.getItem(PASSCODE_KEY);
      if (savedPass && savedPass !== 'admin123') {
        setPasscode(savedPass);
      } else {
        // Set new default passcode (@#Mustafizz99) and replace old default admin123
        setPasscode(DEFAULT_PASSCODE);
        localStorage.setItem(PASSCODE_KEY, DEFAULT_PASSCODE);
      }

      // Check session auth only (so fresh visits always ask for password)
      const sessionAuth = sessionStorage.getItem(AUTH_KEY);
      if (sessionAuth === 'true') {
        setIsAdminAuthenticated(true);
      } else {
        setIsAdminAuthenticated(false);
      }
      localStorage.removeItem(AUTH_KEY);
    } catch (e) {
      console.error('Failed to load local state', e);
    }

    // Connect to server API to fetch the authoritative live data for every visitor
    fetch('/api/portfolio')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json.success && json.data) {
          applyData(json.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
          setServerSyncStatus('synced');
        } else if (localData) {
          // If server file is not initialized yet but local user has customized data,
          // automatically upload it to server so all future visitors see it!
          fetch('/api/portfolio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(localData),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.success) setServerSyncStatus('synced');
            })
            .catch(() => setServerSyncStatus('idle'));
        }
      })
      .catch((err) => {
        console.warn('Backend /api/portfolio sync note:', err);
      });
  }, []);

  // Save state both locally and push to the live server
  const saveState = (overrides?: {
    hero?: HeroData;
    about?: AboutData;
    skills?: SkillItem[];
    services?: ServiceItem[];
    videoProjects?: VideoProject[];
    caseStudies?: CaseStudy[];
    testimonials?: Testimonial[];
    contact?: ContactData;
    footer?: FooterData;
    sections?: SectionItem[];
    customSections?: CustomSection[];
  }) => {
    try {
      const dataToSave = {
        hero: overrides?.hero || hero,
        about: overrides?.about || about,
        skills: overrides?.skills || skills,
        services: overrides?.services || services,
        videoProjects: overrides?.videoProjects || videoProjects,
        caseStudies: overrides?.caseStudies || caseStudies,
        testimonials: overrides?.testimonials || testimonials,
        contact: overrides?.contact || contact,
        footer: overrides?.footer || footer,
        sections: overrides?.sections || sections,
        customSections: overrides?.customSections || customSections,
      };

      // 1. Save to local browser cache
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

      // 2. Push to live server API
      setServerSyncStatus('syncing');
      fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) setServerSyncStatus('synced');
          else setServerSyncStatus('error');
        })
        .catch(() => setServerSyncStatus('error'));
    } catch (e) {
      console.error('Failed to save state', e);
    }
  };

  // Explicit user trigger to publish live to server
  const publishToLiveServer = async (): Promise<boolean> => {
    setServerSyncStatus('syncing');
    try {
      const dataToSave = {
        hero,
        about,
        skills,
        services,
        videoProjects,
        caseStudies,
        testimonials,
        contact,
        footer,
        sections,
        customSections,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });
      const json = await res.json();
      if (json.success) {
        setServerSyncStatus('synced');
        return true;
      }
      setServerSyncStatus('error');
      return false;
    } catch (e) {
      console.error('Failed to publish to live server', e);
      setServerSyncStatus('error');
      return false;
    }
  };

  const loginAdmin = (inputPasscode: string): boolean => {
    const trimmedInput = inputPasscode.trim();
    const stored = localStorage.getItem(PASSCODE_KEY);
    // If stored is still admin123 or unset, use DEFAULT_PASSCODE (@#Mustafizz99)
    const currentPasscode = (!stored || stored === 'admin123' ? DEFAULT_PASSCODE : stored).trim();

    if (trimmedInput === currentPasscode || trimmedInput === DEFAULT_PASSCODE) {
      if (stored === 'admin123') {
        localStorage.setItem(PASSCODE_KEY, DEFAULT_PASSCODE);
        setPasscode(DEFAULT_PASSCODE);
      }
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
  };

  const changePasscode = (newPasscode: string) => {
    const trimmed = newPasscode.trim();
    setPasscode(trimmed);
    localStorage.setItem(PASSCODE_KEY, trimmed);
  };

  // Section updaters
  const updateHero = (data: Partial<HeroData>) => {
    const updated = { ...hero, ...data };
    setHero(updated);
    saveState({ hero: updated });
  };

  const updateAbout = (data: Partial<AboutData>) => {
    const updated = { ...about, ...data };
    setAbout(updated);
    saveState({ about: updated });
  };

  const updateSkills = (newSkills: SkillItem[]) => {
    setSkills(newSkills);
    saveState({ skills: newSkills });
  };

  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    const newSkill: SkillItem = {
      ...skill,
      id: `sk-${Date.now()}`,
    };
    const updated = [...skills, newSkill];
    setSkills(updated);
    saveState({ skills: updated });
  };

  const updateSkill = (id: string, updated: Partial<SkillItem>) => {
    const updatedList = skills.map((s) => (s.id === id ? { ...s, ...updated } : s));
    setSkills(updatedList);
    saveState({ skills: updatedList });
  };

  const deleteSkill = (id: string) => {
    const updated = skills.filter((s) => s.id !== id);
    setSkills(updated);
    saveState({ skills: updated });
  };

  const updateServices = (newServices: ServiceItem[]) => {
    setServices(newServices);
    saveState({ services: newServices });
  };

  const addService = (service: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...service,
      id: `srv-${Date.now()}`,
    };
    const updated = [...services, newService];
    setServices(updated);
    saveState({ services: updated });
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    const updatedList = services.map((s) => (s.id === id ? { ...s, ...updated } : s));
    setServices(updatedList);
    saveState({ services: updatedList });
  };

  const deleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    saveState({ services: updated });
  };

  const updateTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
    saveState({ testimonials: newTestimonials });
  };

  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: `t-${Date.now()}`,
    };
    const updated = [...testimonials, newTestimonial];
    setTestimonials(updated);
    saveState({ testimonials: updated });
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    const updatedList = testimonials.map((t) => (t.id === id ? { ...t, ...updated } : t));
    setTestimonials(updatedList);
    saveState({ testimonials: updatedList });
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    saveState({ testimonials: updated });
  };

  const updateContact = (data: Partial<ContactData>) => {
    const updated = { ...contact, ...data };
    setContact(updated);
    saveState({ contact: updated });
  };

  const updateFooter = (data: Partial<FooterData>) => {
    const updated = { ...footer, ...data };
    setFooter(updated);
    saveState({ footer: updated });
  };

  const updatePersonalInfo = (data: any) => {
    const contactUpdates: Partial<ContactData> = {};
    if (data.name) contactUpdates.name = data.name;
    if (data.title) contactUpdates.title = data.title;
    if (data.phone) {
      contactUpdates.phone = data.phone;
      contactUpdates.whatsappUrl = `https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`;
    }
    if (data.email) contactUpdates.email = data.email;
    if (data.location) contactUpdates.location = data.location;
    if (data.socials) {
      if (data.socials.facebook) contactUpdates.facebookUrl = data.socials.facebook;
      if (data.socials.instagram) contactUpdates.instagramUrl = data.socials.instagram;
      if (data.socials.youtube) contactUpdates.youtubeUrl = data.socials.youtube;
    }
    updateContact(contactUpdates);

    if (data.stats) {
      updateHero({
        kpiConversations: `${data.stats.conversations || 6256}+`,
        kpiAvgCpr: `$${typeof data.stats.avgCpr === 'number' ? data.stats.avgCpr.toFixed(2) : data.stats.avgCpr}`,
        kpiCampaignsCount: `${data.stats.campaigns || 23}+`,
      });
    }
  };

  // Video operations
  const addVideoProject = (project: Omit<VideoProject, 'id'>) => {
    const newProject: VideoProject = {
      ...project,
      id: `v-${Date.now()}`,
    };
    const updated = [newProject, ...videoProjects];
    setVideoProjects(updated);
    saveState({ videoProjects: updated });
  };

  const updateVideoProject = (id: string, updated: Partial<VideoProject>) => {
    const updatedList = videoProjects.map((v) =>
      v.id === id ? { ...v, ...updated } : v
    );
    setVideoProjects(updatedList);
    saveState({ videoProjects: updatedList });
  };

  const deleteVideoProject = (id: string) => {
    const updated = videoProjects.filter((v) => v.id !== id);
    setVideoProjects(updated);
    saveState({ videoProjects: updated });
  };

  const moveVideoProject = (id: string, direction: 'up' | 'down') => {
    const index = videoProjects.findIndex((v) => v.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === videoProjects.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...videoProjects];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    setVideoProjects(reordered);
    saveState({ videoProjects: reordered });
  };

  // Case study operations
  const addCaseStudy = (caseStudy: Omit<CaseStudy, 'id'>) => {
    const newCase: CaseStudy = {
      ...caseStudy,
      id: `cs-${Date.now()}`,
    };
    const updated = [newCase, ...caseStudies];
    setCaseStudies(updated);
    saveState({ caseStudies: updated });
  };

  const updateCaseStudy = (id: string, updated: Partial<CaseStudy>) => {
    const updatedList = caseStudies.map((c) =>
      c.id === id ? { ...c, ...updated } : c
    );
    setCaseStudies(updatedList);
    saveState({ caseStudies: updatedList });
  };

  const deleteCaseStudy = (id: string) => {
    const updated = caseStudies.filter((c) => c.id !== id);
    setCaseStudies(updated);
    saveState({ caseStudies: updated });
  };

  // ================= DYNAMIC SECTION MANAGEMENT =================
  const updateSections = (updated: SectionItem[]) => {
    setSections(updated);
    saveState({ sections: updated });
  };

  const toggleSectionEnabled = (id: string, forceEnabled?: boolean) => {
    const updated = sections.map((sec) =>
      sec.id === id ? { ...sec, enabled: forceEnabled !== undefined ? forceEnabled : !sec.enabled } : sec
    );
    setSections(updated);
    saveState({ sections: updated });
  };

  const deleteSection = (id: string) => {
    const isCustom = customSections.some((cs) => cs.id === id);
    if (isCustom) {
      const updatedSections = sections.filter((s) => s.id !== id);
      const updatedCustom = customSections.filter((cs) => cs.id !== id);
      setSections(updatedSections);
      setCustomSections(updatedCustom);
      saveState({ sections: updatedSections, customSections: updatedCustom });
    } else {
      const updated = sections.map((sec) =>
        sec.id === id ? { ...sec, enabled: false } : sec
      );
      setSections(updated);
      saveState({ sections: updated });
    }
  };

  const restoreSection = (id: string) => {
    const updated = sections.map((sec) =>
      sec.id === id ? { ...sec, enabled: true } : sec
    );
    setSections(updated);
    saveState({ sections: updated });
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex((s) => s.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...sections];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    setSections(reordered);
    saveState({ sections: reordered });
  };

  const addCustomSection = (sectionData: Omit<CustomSection, 'id'> & { id?: string }): string => {
    const newId = sectionData.id || `custom-${Date.now()}`;
    const newSection: CustomSection = {
      ...sectionData,
      id: newId,
      enabled: true,
      items: sectionData.items || []
    };
    const updatedCustom = [...customSections, newSection];

    const newSectionItem: SectionItem = {
      id: newId,
      title: newSection.title,
      nameBn: newSection.title,
      enabled: true,
      isSystem: false
    };

    const contactIdx = sections.findIndex((s) => s.id === 'contact');
    const updatedSections = [...sections];
    if (contactIdx !== -1) {
      updatedSections.splice(contactIdx, 0, newSectionItem);
    } else {
      updatedSections.push(newSectionItem);
    }

    setCustomSections(updatedCustom);
    setSections(updatedSections);
    saveState({ customSections: updatedCustom, sections: updatedSections });
    return newId;
  };

  const updateCustomSection = (id: string, updated: Partial<CustomSection>) => {
    const updatedCustom = customSections.map((cs) =>
      cs.id === id ? { ...cs, ...updated } : cs
    );
    const updatedSections = sections.map((s) =>
      s.id === id && updated.title ? { ...s, title: updated.title, nameBn: updated.title } : s
    );
    setCustomSections(updatedCustom);
    setSections(updatedSections);
    saveState({ customSections: updatedCustom, sections: updatedSections });
  };

  const deleteCustomSection = (id: string) => {
    const updatedCustom = customSections.filter((cs) => cs.id !== id);
    const updatedSections = sections.filter((s) => s.id !== id);
    setCustomSections(updatedCustom);
    setSections(updatedSections);
    saveState({ customSections: updatedCustom, sections: updatedSections });
  };

  const addCustomSectionItem = (sectionId: string, item: Omit<CustomSectionItem, 'id'>) => {
    const newItem: CustomSectionItem = {
      ...item,
      id: `item-${Date.now()}`
    };
    const updatedCustom = customSections.map((cs) => {
      if (cs.id === sectionId) {
        return { ...cs, items: [...cs.items, newItem] };
      }
      return cs;
    });
    setCustomSections(updatedCustom);
    saveState({ customSections: updatedCustom });
  };

  const updateCustomSectionItem = (sectionId: string, itemId: string, itemUpdates: Partial<CustomSectionItem>) => {
    const updatedCustom = customSections.map((cs) => {
      if (cs.id === sectionId) {
        return {
          ...cs,
          items: cs.items.map((it) => (it.id === itemId ? { ...it, ...itemUpdates } : it))
        };
      }
      return cs;
    });
    setCustomSections(updatedCustom);
    saveState({ customSections: updatedCustom });
  };

  const deleteCustomSectionItem = (sectionId: string, itemId: string) => {
    const updatedCustom = customSections.map((cs) => {
      if (cs.id === sectionId) {
        return {
          ...cs,
          items: cs.items.filter((it) => it.id !== itemId)
        };
      }
      return cs;
    });
    setCustomSections(updatedCustom);
    saveState({ customSections: updatedCustom });
  };

  // Reset to original factory defaults
  const resetToDefaults = () => {
    setHero(DEFAULT_HERO);
    setAbout(DEFAULT_ABOUT);
    setSkills(DEFAULT_SKILLS);
    setServices(DEFAULT_SERVICES);
    setVideoProjects(DEFAULT_VIDEO_PROJECTS);
    setCaseStudies(DEFAULT_CASE_STUDIES);
    setTestimonials(DEFAULT_TESTIMONIALS);
    setContact(DEFAULT_CONTACT);
    setFooter(DEFAULT_FOOTER);
    setSections(DEFAULT_SECTIONS);
    setCustomSections(DEFAULT_CUSTOM_SECTIONS);
    setPasscode(DEFAULT_PASSCODE);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PASSCODE_KEY);
  };

  // Full Site Export
  const exportJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      hero,
      about,
      skills,
      services,
      videoProjects,
      caseStudies,
      testimonials,
      contact,
      footer,
      sections,
      customSections,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mustafizur_full_website_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Full Site Import
  const importJSON = (jsonStr: string): boolean => {
    try {
      const p = JSON.parse(jsonStr);
      if (p.hero) setHero(p.hero);
      if (p.about) setAbout(p.about);
      if (p.skills && Array.isArray(p.skills)) setSkills(p.skills);
      if (p.services && Array.isArray(p.services)) setServices(p.services);
      if (p.videoProjects && Array.isArray(p.videoProjects)) setVideoProjects(p.videoProjects);
      if (p.caseStudies && Array.isArray(p.caseStudies)) setCaseStudies(p.caseStudies);
      if (p.testimonials && Array.isArray(p.testimonials)) setTestimonials(p.testimonials);
      if (p.contact) setContact(p.contact);
      if (p.footer) setFooter(p.footer);
      if (p.sections && Array.isArray(p.sections)) setSections(p.sections);
      if (p.customSections && Array.isArray(p.customSections)) setCustomSections(p.customSections);

      saveState(p);
      return true;
    } catch (e) {
      console.error('Invalid backup JSON file', e);
      return false;
    }
  };

  // Computed backward-compatible personalInfo shape
  const personalInfo: PersonalInfoShape = {
    name: contact.name,
    nickname: contact.nickname,
    title: contact.title,
    tagline: contact.tagline,
    phone: contact.phone,
    whatsappUrl: contact.whatsappUrl,
    email: contact.email,
    location: contact.location,
    socials: {
      facebook: contact.facebookUrl,
      instagram: contact.instagramUrl,
      youtube: contact.youtubeUrl,
      whatsapp: contact.whatsappUrl,
    },
    stats: {
      conversations: parseInt(hero.kpiConversations.replace(/[^0-9]/g, '')) || 6256,
      avgCpr: parseFloat(hero.kpiAvgCpr.replace(/[^0-9.]/g, '')) || 0.04,
      campaigns: parseInt(hero.kpiCampaignsCount.replace(/[^0-9]/g, '')) || 23,
      videoProjects: videoProjects.length,
      clientsServed: 3,
    },
  };

  return (
    <PortfolioContext.Provider
      value={{
        hero,
        about,
        skills,
        services,
        videoProjects,
        caseStudies,
        testimonials,
        contact,
        footer,
        personalInfo,
        sections,
        customSections,
        updateSections,
        toggleSectionEnabled,
        deleteSection,
        restoreSection,
        moveSection,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
        addCustomSectionItem,
        updateCustomSectionItem,
        deleteCustomSectionItem,
        isAdminAuthenticated,
        isAdminModalOpen,
        setIsAdminModalOpen,
        loginAdmin,
        logoutAdmin,
        changePasscode,
        updateHero,
        updateAbout,
        updateSkills,
        addSkill,
        updateSkill,
        deleteSkill,
        updateServices,
        addService,
        updateService,
        deleteService,
        updateTestimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateContact,
        updateFooter,
        updatePersonalInfo,
        addVideoProject,
        updateVideoProject,
        deleteVideoProject,
        moveVideoProject,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
        resetToDefaults,
        exportJSON,
        importJSON,
        publishToLiveServer,
        serverSyncStatus,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
