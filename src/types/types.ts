// types.ts
export interface Referer {
  referer_medium: string;
  referer_url: string;
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
  countryCode3: string;
  isCustomer: boolean;
  category: Category;
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
  referer: Referer;
  campaign: boolean;
  campaignHits: boolean;
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
