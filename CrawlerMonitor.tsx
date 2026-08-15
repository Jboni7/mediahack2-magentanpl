export type AlertFrequency = 'immediate' | 'daily_summary' | 'weekly_digest';

export type ContentCategory = 
  | 'resolucion_oficial' 
  | 'boletin_prensa' 
  | 'noticia_electoral' 
  | 'tramite_administrativo' 
  | 'impugnacion_reclamacion' 
  | 'desmentido_rumores';

export type AuthenticityStatus = 'verified' | 'unverified' | 'suspicious' | 'official_signed';

export interface UserPreferences {
  selectedProvinces: string[];
  selectedCantons: { [province: string]: string[] };
  selectedParties: string[];
  selectedElectionTypes: string[];
  selectedEntityTypes: string[];
  relevanceThreshold: number; // 0 to 100
  keywords: string[];
  alertFrequency: AlertFrequency;
  notificationsPaused: boolean;
  pausedUntil?: string | null;
  notifyOnZeroUpdates: boolean; // "Heartbeat" notification when crawler finishes scan with 0 matching updates
  emailDestination: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mediaOutlet: string;
  mediaType: 'Television' | 'Radio' | 'Prensa Escrita' | 'Medio Digital' | 'Agencia de Noticias' | 'Medio Universitario';
  role: string;
  createdAt: string;
  avatarUrl?: string;
  preferences: UserPreferences;
}

export interface CneBulletin {
  id: string;
  title: string;
  cneCode: string; // e.g. "PLE-CNE-2026-089-R" or "BOL-CNE-UIO-2026-442"
  publishedAt: string;
  sourceUrl: string;
  category: ContentCategory;
  rawText: string;
  
  // AI NLP analysis fields
  aiSummary: string;
  aiKeyTakeaways: string[];
  aiUrgencyScore: number; // 0 to 100
  aiRelevanceScore: number; // 0 to 100 calculated against user preferences
  aiCategorization: {
    isOfficialResolution: boolean;
    isRumorDebunk: boolean;
    isAdministrativeOnly: boolean;
    confidence: number;
  };
  extractedEntities: {
    provinces: string[];
    cantons: string[];
    candidates: string[];
    politicalParties: string[];
    legalArticles: string[];
    electionType: string;
  };
  authenticity: {
    status: AuthenticityStatus;
    score: number; // 0-100%
    verifiedDomain: boolean; // cne.gob.ec check
    digitalSignatureFound: boolean;
    verificationHash: string; // SHA-256
    securitySealText: string;
    cneIssuerDepartment: string;
  };
  
  // Tracking
  scannedAt: string;
  matchesUserFilters: boolean;
  filterMatchReasons: string[];
}

export interface EmailNotificationLog {
  id: string;
  recipientEmail: string;
  recipientMediaOutlet: string;
  bulletinId: string;
  bulletinTitle: string;
  bulletinCode: string;
  sentAt: string;
  frequencyType: AlertFrequency | 'heartbeat_zero_updates';
  subject: string;
  previewText: string;
  htmlContent: string;
  plainTextContent: string;
  relevanceScore: number;
  matchedKeywords: string[];
  matchedProvinces: string[];
  status: 'delivered' | 'opened' | 'archived';
  sourceUrl: string;
  authenticityHash: string;
}

export interface DailyExecutiveDigest {
  id: string;
  date: string;
  generatedAt: string;
  headline: string;
  executiveSummary: string;
  topKeyDevelopments: {
    title: string;
    bulletinCode: string;
    province: string;
    category: string;
    takeaway: string;
    sourceUrl: string;
  }[];
  provincialBreakdown: {
    province: string;
    count: number;
    highlights: string;
  }[];
  regulatoryChanges: string[];
  rumorsDebunked: string[];
  upcomingDeadlines: string[];
}

export interface CrawlerStats {
  isScanning: boolean;
  lastScanTime: string;
  nextScheduledScan: string;
  totalBulletinsIndexed: number;
  lastScanDurationMs: number;
  officialSourceStatus: 'operational' | 'degraded' | 'maintenance';
  aiLatencyAvgMs: number;
  aiVerificationSuccessRate: number; // %
  cneEndpointChecked: string;
  itemsProcessedInLastScan: number;
  itemsMatchedInLastScan: number;
}
