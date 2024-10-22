// types.ts
export interface Referer {
  referer_medium: string;
  referer_url: string;
  referer_source?: string; // Optional
  referer_term?: string; // Optional
  referer_device?: string; // Optional
  referer_network?: string; // Optional
  referer_content?: string; // Optional
  referer_campaign?: string; // Optional
}

export interface CampaignHit {
  id: string;
  project_id: string;
  name: string;
  type_id: string;
  date_from: string;
  date_to: string;
  country_code: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Sector {
  name: string;
  name_en: string;
}

export interface Company {
  name: string;
  city: string;
  countryCode: string;
  countryCode3?: string; // Optional
  isCustomer: boolean;
  category: Category | null; // Allow for null
  note: string | null;
  sector: Sector;
  employees: any[]; // Define a better type if possible
  tags: any[]; // Define a better type if possible
}

export interface Visit {
  startedAt: string;
  lastActivityAt: string;
  url: string;
  referer: string;
  refererMedium: string;
  refererSource?: string; // Optional
}

export interface Interest {
  name: string;
  count: number;
  time: number;
}

export interface ScoreOverview {
  id: string;
  url: string;
  value: string;
  count: string;
  summe: string;
}

export interface SessionData {
  guid: string;
  startedAt: string;
  lastActivityAt: string;
  language: string;
  referer: Referer | boolean; // Allow for the referer to be a boolean or an object
  campaign: boolean;
  campaignHits: CampaignHit[]; // Updated to be an array of CampaignHit
  hasVideo: string;
  requiredVideoEvent: string;
  score: string;
  siteSearch: any[]; // Define a better type if possible
  mainInterest: string;
  campaignsAll: any[]; // Define a better type if possible
  isVideoPresentable: string;
  user_agent: string;
  company: Company;
  visits: Visit[];
  interests: Interest[];
  score_overview: ScoreOverview[];
}