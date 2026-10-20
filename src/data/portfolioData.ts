import { PROOF_THAI_RESTAURANT, PROOF_CHINESE_COURSE, PROOF_WEAVERBIRD, PROFILE_IMAGE } from './portfolioImages';

export interface VideoProject {
  id: string;
  title: string;
  category: 'product' | 'agency' | 'architecture' | 'education' | 'cinematic' | 'branding';
  categoryLabel: string;
  vimeoId: string;
  aspectRatio: '16:9' | '9:16';
  client?: string;
  description?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: 'sales' | 'leadgen' | 'engagement';
  categoryLabel: string;
  client: string;
  proofImage: string;
  conversations: string;
  costPerResult: string;
  reach: string;
  challenges: string[];
  strategy: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number;
  category: 'ads' | 'video';
}

export interface ServiceItem {
  id: string;
  pillar: 'ads' | 'video' | 'both';
  icon: string;
  title: string;
  description: string;
}

export interface HeroData {
  kickerAds: string;
  kickerVideo: string;
  location: string;
  headlinePart1: string;
  headlineGradient1: string;
  headlinePart2: string;
  headlineGradient2: string;
  leadText: string;
  profileImage: string;
  topBadgeLabel: string;
  topBadgeValue: string;
  bottomBadgeLabel: string;
  bottomBadgeValue: string;
  kpiConversations: string;
  kpiAvgCpr: string;
  kpiVideoCount: string;
  kpiCampaignsCount: string;
}

export interface AboutData {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  storyTitle: string;
  storySubtitle: string;
  paragraph1: string;
  paragraph2: string;
  strength1Title: string;
  strength1Desc: string;
  strength2Title: string;
  strength2Desc: string;
  strength3Title: string;
  strength3Desc: string;
}

export interface ContactData {
  name: string;
  nickname: string;
  title: string;
  tagline: string;
  phone: string;
  whatsappUrl: string;
  email: string;
  location: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}

export interface FooterData {
  brandSummary: string;
  copyright: string;
}

export interface FullSiteContent {
  hero: HeroData;
  about: AboutData;
  skills: SkillItem[];
  services: ServiceItem[];
  videoProjects: VideoProject[];
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
  contact: ContactData;
  footer: FooterData;
}

export const DEFAULT_HERO: HeroData = {
  kickerAds: "Meta Ads Specialist",
  kickerVideo: "AI Video Director",
  location: "Mohammadpur, Dhaka",
  headlinePart1: "Scaling Brands with ",
  headlineGradient1: "Cinematic AI Video",
  headlinePart2: " & ",
  headlineGradient2: "High-ROAS Meta Ads",
  leadText: "I am Md Mustafizur Rahman, Meta Ads Specialist, digital marketer, and AI visual creator. I engineer scroll-stopping commercial video ads and execute disciplined Facebook & Instagram Messenger sales funnels—consistently driving real buyer conversations for as low as $0.038 CPR even on tight daily budgets.",
  profileImage: PROFILE_IMAGE,
  topBadgeLabel: "Conversations",
  topBadgeValue: "6,800+ Generated",
  bottomBadgeLabel: "Cost Efficiency",
  bottomBadgeValue: "$0.04 Avg. CPR",
  kpiConversations: "6,800+",
  kpiAvgCpr: "$0.04",
  kpiVideoCount: "18+",
  kpiCampaignsCount: "24+",
};

export const DEFAULT_ABOUT: AboutData = {
  badge: "About Md Mustafizur Rahman",
  title: "The Intersection of Creative Motion & Algorithmic Performance",
  titleHighlight: "Creative Motion & Algorithmic Performance",
  subtitle: "Hands-on experience managing and scaling campaigns for small businesses and brands in Dhaka, turning concepts into high-converting visual stories and small daily ad budgets into predictable client revenue.",
  storyTitle: "Turning Tight Budgets Into Scalable Conversations",
  storySubtitle: "Meta Ads Specialist • AI Video Creator • Dhaka, Bangladesh",
  paragraph1: "Most agencies either only make videos or only buy ads. As a digital marketer and AI Video Creator, I connect the entire funnel. Through advanced prompt engineering, cinematic AI tools (Midjourney, Runway, Kling, Luma), and Adobe Premiere / CapCut pacing, I craft visuals engineered to stop thumbs within the first 1.5 seconds.",
  paragraph2: "Simultaneously, in Meta Ads Manager, I structure click-to-Messenger and lead-generation campaigns that transform modest daily spends—often as little as $2 to $5/day—into steady, trackable inquiries. I review cost per result every few days, shift budget to what’s converting, and constantly test fresh creative variations before ad fatigue sets in.",
  strength1Title: "Full-Funnel Ownership:",
  strength1Desc: "No finger-pointing between creative teams and media buyers—one seamless strategy.",
  strength2Title: "Cost Precision:",
  strength2Desc: "Proven track record maintaining $0.033 – $0.053 CPR over thousands of qualified leads.",
  strength3Title: "Rapid Turnaround:",
  strength3Desc: "Fast AI production workflows delivering agency-quality 9:16 and 16:9 spots within 48–72 hours.",
};

export const DEFAULT_SKILLS: SkillItem[] = [
  { id: "sk-1", name: "Meta Ads Manager", level: 92, category: "ads" },
  { id: "sk-2", name: "Facebook & Instagram Campaigns", level: 90, category: "ads" },
  { id: "sk-3", name: "Pixel & Conversions API (CAPI)", level: 85, category: "ads" },
  { id: "sk-4", name: "Audience Research & A/B Testing", level: 88, category: "ads" },
  { id: "sk-5", name: "Generative AI Video & Prompting", level: 94, category: "video" },
  { id: "sk-6", name: "AI Video Editing & Color Grading", level: 90, category: "video" },
  { id: "sk-7", name: "Smart Subtitling & Retention Hooks", level: 92, category: "video" },
  { id: "sk-8", name: "Performance Reporting & Audits", level: 86, category: "ads" },
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "ads-mgmt",
    pillar: "ads",
    icon: "Target",
    title: "Meta Ads Campaign Management",
    description: "End-to-end setup and daily management of Messenger sales, lead-generation, and engagement campaigns optimized for lowest cost per result.",
  },
  {
    id: "video-gen",
    pillar: "video",
    icon: "Clapperboard",
    title: "Cinematic AI Video Generation",
    description: "Commercials, hyper-realistic product videos, and teasers crafted with precision prompt engineering, lighting control, and AI motion engines.",
  },
  {
    id: "messenger-leads",
    pillar: "ads",
    icon: "MessageSquare",
    title: "Click-to-Messenger Lead Funnels",
    description: "Interactive conversation funnels designed to turn cold traffic into ready-to-buy inquiries on tight daily budgets (often $2–$5/day).",
  },
  {
    id: "video-edit",
    pillar: "video",
    icon: "Scissors",
    title: "AI Video Editing & Enhancement",
    description: "Intelligent upscaling, frame stabilization, high-end pacing, dynamic transitions, and resolution enhancement for raw AI visual outputs.",
  },
  {
    id: "capi-tracking",
    pillar: "ads",
    icon: "Cpu",
    title: "Pixel & Conversions API Setup",
    description: "Accurate server-side event tracking (CAPI) and Meta Pixel diagnostics to protect data and train Meta's bidding algorithms effectively.",
  },
  {
    id: "smart-captions",
    pillar: "video",
    icon: "Sparkles",
    title: "Smart Subtitles & Retention Hooks",
    description: "Kinetic animated captions and high-retention visual hooks designed specifically for 9:16 mobile feeds (Instagram Reels & TikTok).",
  },
  {
    id: "testing-audiences",
    pillar: "ads",
    icon: "SlidersHorizontal",
    title: "Audience Research & A/B Testing",
    description: "Rigorous cohort testing of placements, lookalikes, custom audiences, and ad copies to identify winners before scaling budget.",
  },
  {
    id: "vfx-audio",
    pillar: "video",
    icon: "Mic",
    title: "AI VFX, Backgrounds & Voiceovers",
    description: "AI-driven green-screen removal, dynamic environment swaps, hyper-realistic voice generation, and synchronized sound design.",
  },
  {
    id: "full-package",
    pillar: "both",
    icon: "Zap",
    title: "All-in-One: Video Creative + Meta Ads",
    description: "The complete growth loop: We script & produce high-CTR AI video creatives, then launch, test, and scale the Meta Ads campaigns for maximum ROAS.",
  },
];

export const DEFAULT_CONTACT: ContactData = {
  name: "Md Mustafizur Rahman",
  nickname: "Fizz",
  title: "Meta Ads Specialist & AI Video Creator",
  tagline: "Bridging High-Converting AI Video Production with Low-CPR Meta Ad Campaigns",
  phone: "01745-100199",
  whatsappUrl: "https://wa.me/8801745100199",
  email: "designer.mustafiz@gmail.com",
  location: "Mohammadpur, Dhaka, Bangladesh",
  facebookUrl: "https://www.facebook.com/MustafizurRahmanFizz99/",
  instagramUrl: "https://www.instagram.com/mustafizurrahmanfizz99",
  youtubeUrl: "https://www.youtube.com/@itzmustafizz",
};

export const DEFAULT_FOOTER: FooterData = {
  brandSummary: "Full-funnel digital growth partner combining generative AI video production (product commercials, 9:16 vertical reels) with data-backed Meta Ads management (Messenger lead funnels, CAPI, ROAS scaling).",
  copyright: "© 2026 Md Mustafizur Rahman. All rights reserved.",
};

export const VIDEO_PROJECTS: VideoProject[] = [
  {
    id: "v-personal",
    title: "Personal Branding & Creative Identity",
    category: "branding",
    categoryLabel: "Personal Branding",
    vimeoId: "1235025877",
    aspectRatio: "16:9",
    client: "Mustafizur Rahman",
    description: "High-concept creative reel presenting creative vision, director aesthetics, and AI production pipeline."
  },
  {
    id: "v-msk-promo",
    title: "MSK Digital IT — Agency Promo Showcase",
    category: "agency",
    categoryLabel: "Agency & Promo",
    vimeoId: "1235033917",
    aspectRatio: "16:9",
    client: "MSK Digital IT",
    description: "Commercial promo highlighting digital growth capabilities with sleek motion typography and cinematic pacing."
  },
  {
    id: "v-watch-1",
    title: "Luxury Timepiece — Precision Chrono Spec Ad",
    category: "product",
    categoryLabel: "Product Ads",
    vimeoId: "1233274298",
    aspectRatio: "16:9",
    description: "Ultra-sharp metallic reflections, micro-engraving details, and studio lighting aesthetic for luxury e-commerce."
  },
  {
    id: "v-watch-2",
    title: "Minimalist Watch — Commercial Launch Spot",
    category: "product",
    categoryLabel: "Product Ads",
    vimeoId: "1233274325",
    aspectRatio: "16:9",
    description: "Clean aesthetic, smooth camera dolly motion, and premium commercial presentation for social advertising."
  },
  {
    id: "v-panjabi-vert",
    title: "Premium Panjabi & Ethnic Fashion — 9:16 Video Ad",
    category: "product",
    categoryLabel: "Product Ads",
    vimeoId: "1233274030",
    aspectRatio: "9:16",
    description: "Full-bleed 9:16 vertical video ad tailored for Instagram Reels and Stories with high-converting visual hooks."
  },
  {
    id: "v-soda",
    title: "Sparkling Soda — Refreshing Summer Spec Ad",
    category: "product",
    categoryLabel: "Product Ads",
    vimeoId: "1233274297",
    aspectRatio: "16:9",
    description: "Effervescent carbonation physics, ice splashes, and high-energy commercial color grading."
  },
  {
    id: "v-jersey",
    title: "Athletic Jersey — Sportswear Product Commercial",
    category: "product",
    categoryLabel: "Product Ads",
    vimeoId: "1233273897",
    aspectRatio: "16:9",
    description: "Dynamic fabric simulation, intense athletic mood, and fast-paced editing designed to elevate brand authority."
  },
  {
    id: "v-mango",
    title: "Mango Beverage — Fresh Fruit Product Ad",
    category: "product",
    categoryLabel: "Product Ads",
    vimeoId: "1233273896",
    aspectRatio: "16:9",
    description: "Vibrant tropical color palette with fluid liquid simulation and mouth-watering commercial imagery."
  },
  {
    id: "v-perfume",
    title: "Luxury Perfume — Fragrance Spec Commercial",
    category: "product",
    categoryLabel: "Product Ads",
    vimeoId: "1233274044",
    aspectRatio: "16:9",
    description: "Moody glass caustics, soft particle atmospherics, and high-fashion luxury aesthetic."
  },
  {
    id: "v-pest",
    title: "Pest Zero Termite Killer — Solution Ad",
    category: "product",
    categoryLabel: "Product Ads",
    vimeoId: "1235026925",
    aspectRatio: "9:16",
    client: "Pest Zero",
    description: "Problem-solution vertical video hook showing direct application and high-urgency buyer call to action."
  },
  {
    id: "v-arch-1",
    title: "Modern Villa Architectural Visualization 01",
    category: "architecture",
    categoryLabel: "3D Architecture",
    vimeoId: "1233274324",
    aspectRatio: "9:16",
    client: "Weaverbird Architects",
    description: "Photorealistic daylight architecture showcase showing exterior volume, landscaping, and structural elevation."
  },
  {
    id: "v-arch-2",
    title: "Contemporary Residence Architecture 02",
    category: "architecture",
    categoryLabel: "3D Architecture",
    vimeoId: "1233274366",
    aspectRatio: "9:16",
    client: "Weaverbird Architects",
    description: "Warm golden-hour exterior architectural walkthrough with modern minimalist concrete and timber textures."
  },
  {
    id: "v-interior",
    title: "Minimalist Interior Design Showcase",
    category: "architecture",
    categoryLabel: "3D Architecture",
    vimeoId: "1233273867",
    aspectRatio: "9:16",
    client: "Weaverbird Architects & Partners",
    description: "Soft interior ambient lighting, contemporary Scandinavian furnishing, and photorealistic 3D space tour."
  },
  {
    id: "v-course-1",
    title: "Chinese Language Course — Enrollment Video 01",
    category: "education",
    categoryLabel: "Education & Course",
    vimeoId: "1233274098",
    aspectRatio: "9:16",
    client: "Short Time Chinese Course",
    description: "High-conversion student acquisition video ad generating instant Messenger inquiries on Facebook."
  },
  {
    id: "v-course-2",
    title: "Chinese Language Course — Enrollment Video 02",
    category: "education",
    categoryLabel: "Education & Course",
    vimeoId: "1233274113",
    aspectRatio: "9:16",
    client: "Short Time Chinese Course",
    description: "Targeted promotional video highlighting rapid speaking skills and affordable course batches."
  },
  {
    id: "v-cinematic-islamic",
    title: "Narrative Short — Spiritual Storytelling",
    category: "cinematic",
    categoryLabel: "Cinematic & Story",
    vimeoId: "1233273885",
    aspectRatio: "16:9",
    description: "Atmospheric lighting, thoughtful narrative pacing, and cinematic color composition."
  },
  {
    id: "v-music",
    title: "Creative Music Video Spec",
    category: "cinematic",
    categoryLabel: "Cinematic & Story",
    vimeoId: "1233273951",
    aspectRatio: "16:9",
    description: "Rhythm-synced cuts, artistic visual experimentation, and generative camera movement."
  },
  {
    id: "v-visual-trans",
    title: "Visual Transformation — Motion Reel",
    category: "cinematic",
    categoryLabel: "Cinematic & Story",
    vimeoId: "1235030425",
    aspectRatio: "16:9",
    description: "Before-and-after prompt generation demonstrating stylistic evolution and visual quality upscaling."
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "thai-restaurant",
    title: "Thai Restaurant — Messenger Sales Campaign",
    category: "sales",
    categoryLabel: "Sales",
    client: "Thai Cuisine Restaurant",
    proofImage: PROOF_THAI_RESTAURANT,
    conversations: "4,969",
    costPerResult: "$0.038",
    reach: "243K",
    challenges: [
      "Ultra-tight daily ad budget ($2–$3/day) where every taka had to produce a direct order.",
      "Needed a predictable, ongoing flow of local dining orders rather than a single spike."
    ],
    strategy: [
      "Built targeted Click-to-Messenger campaigns with automated quick-reply menu triggers.",
      "Tested fresh food creatives and localized micro-audiences weekly to prevent ad fatigue.",
      "Sustained continuous campaign momentum over several months, keeping CPR steady at ~$0.04."
    ]
  },
  {
    id: "chinese-course",
    title: "Short Time Chinese Course — Lead Generation",
    category: "leadgen",
    categoryLabel: "Lead Generation",
    client: "Short Time Chinese Course",
    proofImage: PROOF_CHINESE_COURSE,
    conversations: "1,549",
    costPerResult: "$0.033",
    reach: "69.7K+",
    challenges: [
      "Course pricing required lead acquisition cost to stay below $0.05 to maintain positive ROI.",
      "Needed continuous, qualified prospective students enrolling batch-by-batch across Dhaka."
    ],
    strategy: [
      "Paired dynamic 9:16 video promos with high-urgency Messenger lead generation funnels.",
      "Implemented sequential creative refreshes and custom interest cohorts to keep lead cost at $0.033.",
      "Generated 1,500+ direct student inquiries with high enrollment closing rates."
    ]
  },
  {
    id: "weaverbird",
    title: "Weaverbird — Architectural Engagement & Inquiries",
    category: "engagement",
    categoryLabel: "Engagement",
    client: "Weaverbird Architects",
    proofImage: PROOF_WEAVERBIRD,
    conversations: "282",
    costPerResult: "$0.053",
    reach: "13.4K+",
    challenges: [
      "High-ticket architectural services audience had gone quiet between major project releases.",
      "Short campaign window with minimal ad budget requiring high-intent client interactions."
    ],
    strategy: [
      "Deployed 3D architectural visualization video assets with targeted Messenger consultation hooks.",
      "Hyper-localized geo-fencing targeting affluent residential and commercial developers in Dhaka.",
      "Re-engaged qualified prospects at an efficient $0.053 per direct consultation conversation."
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-weaverbird",
    quote: "Mustafizur's AI-generated promotional videos for our architectural and structural designs gave our brand a modern, high-end edge. Pairing that with his disciplined Meta Ads targeting brought us qualified client inquiries directly to our inbox.",
    name: "Md Shahin Alam",
    role: "Principal Architect",
    company: "Weaverbird Architects"
  },
  {
    id: "t-thai",
    quote: "Mustafizur transformed our restaurant's digital footfall. His Messenger sales ad campaigns generated over 4,400 direct customer orders while maintaining an astonishing $0.038 cost per result. He is our trusted growth partner.",
    name: "Somchai Prasert",
    role: "General Manager",
    company: "Thai Cuisine Restaurant"
  },
  {
    id: "t-chinese",
    quote: "The promotional videos and Messenger ad funnels created for our Chinese language program were remarkably engaging. They directly contributed to 1,500+ student inquiries and filled our batches in record time at just $0.033 per lead.",
    name: "Shakhawat Hossien Togor",
    role: "Founder & Lead Instructor",
    company: "Short Time Chinese Course"
  }
];

// Aliases for component compatibility
export const CORE_SKILLS = DEFAULT_SKILLS;
export const SERVICES = DEFAULT_SERVICES;
export const PERSONAL_INFO = {
  ...DEFAULT_CONTACT,
  socials: {
    facebook: DEFAULT_CONTACT.facebookUrl,
    instagram: DEFAULT_CONTACT.instagramUrl,
    youtube: DEFAULT_CONTACT.youtubeUrl,
    whatsapp: DEFAULT_CONTACT.whatsappUrl,
  },
  stats: {
    conversations: 6256,
    avgCpr: 0.04,
    campaigns: 23,
    videoProjects: 23,
    clientsServed: 3,
  }
};

export interface SectionItem {
  id: string; // 'hero' | 'about' | 'services' | 'videoShowcase' | 'caseStudies' | 'testimonials' | 'contact' or custom ID
  title: string;
  nameBn: string;
  enabled: boolean;
  isSystem: boolean;
}

export type CustomSectionLayout = 'faq' | 'cards' | 'banner' | 'video_embed' | 'gallery';

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  icon?: string;
  imageUrl?: string;
  videoUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  layout: CustomSectionLayout;
  enabled: boolean;
  theme?: 'dark' | 'gradient' | 'bordered';
  items: CustomSectionItem[];
}

export const DEFAULT_SECTIONS: SectionItem[] = [
  { id: 'hero', title: 'Hero Banner', nameBn: 'হিরো ও ব্যানার (Intro)', enabled: true, isSystem: true },
  { id: 'about', title: 'About & Skills', nameBn: 'আমার সম্পর্কে ও স্কিলস', enabled: true, isSystem: true },
  { id: 'services', title: 'Core Services', nameBn: 'সার্ভিসসমূহ (Services)', enabled: true, isSystem: true },
  { id: 'videoShowcase', title: 'AI Video Portfolio', nameBn: 'এআই ভিডিও শোকেস', enabled: true, isSystem: true },
  { id: 'caseStudies', title: 'Meta Ads Case Studies', nameBn: 'মেটা অ্যাডস কেস স্টাডিজ', enabled: true, isSystem: true },
  { id: 'custom-faq', title: 'FAQ & Questions', nameBn: 'সচরাচর জিজ্ঞাসা (FAQ)', enabled: true, isSystem: false },
  { id: 'testimonials', title: 'Client Testimonials', nameBn: 'ক্লায়েন্ট রিভিউ ও টেস্টিমোনিয়াল', enabled: true, isSystem: true },
  { id: 'contact', title: 'Commission & Contact Form', nameBn: 'যোগাযোগ ও কাজ বুকিং ফর্ম', enabled: true, isSystem: true }
];

export const DEFAULT_CUSTOM_SECTIONS: CustomSection[] = [
  {
    id: 'custom-faq',
    title: 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)',
    subtitle: 'আমার সাথে কাজ শুরু করার আগে সাধারণ কিছু প্রশ্নের সহজ উত্তর জেনে নিন',
    badge: 'Common Inquiries',
    layout: 'faq',
    enabled: true,
    theme: 'dark',
    items: [
      {
        id: 'faq-1',
        title: 'আপনার সাথে কীভাবে ভিডিও প্রোডাকশন বা অ্যাড ক্যাম্পেইন শুরু করব?',
        description: 'খুবই সহজ! নিচের যোগাযোগ ফর্ম বা সরাসরি WhatsApp এ মেসেজ দিয়ে আপনার ব্র্যান্ড বা পণ্যের বিস্তারিত জানান। আমরা দ্রুত অডিট করে সেরা প্ল্যান ও কোটেশন পাঠিয়ে দেব।'
      },
      {
        id: 'faq-2',
        title: 'এআই ভিডিও অ্যাড তৈরিতে কত সময় লাগে?',
        description: 'সাধারণত প্রাথমিক স্ক্রিপ্টিং, এআই ভিজ্যুয়াল জেনারেশন ও ফাইনাল এডিটিংসহ ২ থেকে ৪ কার্যদিবসের মধ্যে হাই-কোয়ালিটি আল্ট্রা-রিয়েলিস্টিক ভিডিও রেডি হয়ে যায়।'
      },
      {
        id: 'faq-3',
        title: 'Meta Ads এ কি কম বাজেটে ভালো রেজাল্ট পাওয়া সম্ভব?',
        description: 'অবশ্যই! আমাদের ডেটা-ড্রিভেন টার্গেটিং ও আকর্ষণীয় ভিডিও হুকের মাধ্যমে মাত্র $0.033 থেকে $0.053 খরচে প্রতিটি রিয়েল বায়ার কনভার্সেশন আনা সম্ভব।'
      }
    ]
  }
];
