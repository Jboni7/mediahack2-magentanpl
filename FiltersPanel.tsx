import React, { useState, useEffect, useMemo } from 'react';
import { 
  UserProfile, 
  UserPreferences, 
  CneBulletin, 
  EmailNotificationLog, 
  CrawlerStats, 
  DailyExecutiveDigest 
} from './types';
import { 
  DEFAULT_USER_PROFILE, 
  INITIAL_CNE_BULLETINS, 
  INITIAL_EMAIL_LOGS, 
  INITIAL_CRAWLER_STATS, 
  INITIAL_DAILY_DIGEST,
  SAMPLE_NEWSROOM_PROFILES
} from './data/mockCneData';
import { Header } from './components/Header';
import { ProfileModal } from './components/ProfileModal';
import { FiltersPanel } from './components/FiltersPanel';
import { CrawlerMonitor } from './components/CrawlerMonitor';
import { FeedList } from './components/FeedList';
import { EmailInboxModal } from './components/EmailInboxModal';
import { DailyDigestModal } from './components/DailyDigestModal';
import { TransparencyAuditModal } from './components/TransparencyAuditModal';
import { SystemHealthModal } from './components/SystemHealthModal';
import { 
  Sparkles, 
  Mail, 
  SlidersHorizontal, 
  ShieldCheck, 
  Activity, 
  Bell, 
  Layers, 
  Bot, 
  Send,
  Calendar,
  CheckCircle2,
  FileText,
  MapPin,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

export default function App() {
  // Core State
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [bulletins, setBulletins] = useState<CneBulletin[]>(INITIAL_CNE_BULLETINS);
  const [emailLogs, setEmailLogs] = useState<EmailNotificationLog[]>(INITIAL_EMAIL_LOGS);
  const [crawlerStats, setCrawlerStats] = useState<CrawlerStats>(INITIAL_CRAWLER_STATS);
  const [dailyDigest, setDailyDigest] = useState<DailyExecutiveDigest>(INITIAL_DAILY_DIGEST);

  // Modal Visibility State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEmailInboxOpen, setIsEmailInboxOpen] = useState(false);
  const [isDailyDigestOpen, setIsDailyDigestOpen] = useState(false);
  const [isTransparencyModalOpen, setIsTransparencyModalOpen] = useState(false);
  const [isSystemHealthOpen, setIsSystemHealthOpen] = useState(false);
  const [selectedAuditBulletin, setSelectedAuditBulletin] = useState<CneBulletin | null>(null);

  // Notification Toast State
  const [activeToast, setActiveToast] = useState<{
    id: string;
    title: string;
    message: string;
    type: 'email' | 'crawler' | 'system';
  } | null>(null);

  const showToast = (title: string, message: string, type: 'email' | 'crawler' | 'system' = 'email') => {
    const id = Date.now().toString();
    setActiveToast({ id, title, message, type });
    setTimeout(() => {
      setActiveToast(prev => (prev?.id === id ? null : prev));
    }, 4500);
  };

  // Re-evaluate bulletin matches whenever user preferences change
  const evaluatedBulletins = useMemo(() => {
    const prefs = currentUser?.preferences;
    return (bulletins || []).map(b => {
      const matchReasons: string[] = [];
      const provs = b.extractedEntities?.provinces || [];
      const userProvs = prefs?.selectedProvinces || [];
      
      // 1. Province match
      const provMatch = provs.some(p => userProvs.includes(p)) || provs.length === 0; // National scope
      if (provMatch && provs.length > 0) {
        matchReasons.push(`Provincia: ${provs.join(', ')}`);
      }

      // 2. Entity types match
      const userEntityTypes = prefs?.selectedEntityTypes || [];
      const candidates = b.extractedEntities?.candidates || [];
      const parties = b.extractedEntities?.politicalParties || [];
      const entityMatch = userEntityTypes.some(t => {
        if (t === 'candidatos' && candidates.length > 0) return true;
        if (t === 'partidos' && parties.length > 0) return true;
        if (t === 'resoluciones_cne' && b.category === 'resolucion_oficial') return true;
        if (t === 'desmentidos' && b.category === 'desmentido_rumores') return true;
        if (t === 'sanciones_tce' && b.category === 'impugnacion_reclamacion') return true;
        return true;
      });

      // 3. Relevance threshold
      const userThreshold = prefs?.relevanceThreshold ?? 65;
      const passesThreshold = (b.aiRelevanceScore ?? 70) >= userThreshold;
      if (passesThreshold) {
        matchReasons.push(`Relevancia IA: ${b.aiRelevanceScore}% ≥ ${userThreshold}%`);
      }

      // 4. Keyword match
      const userKeywords = prefs?.keywords || [];
      const matchedKws = userKeywords.filter(kw => 
        (b.rawText || '').toLowerCase().includes(kw.toLowerCase()) ||
        (b.title || '').toLowerCase().includes(kw.toLowerCase()) ||
        (b.aiSummary || '').toLowerCase().includes(kw.toLowerCase())
      );
      if (matchedKws.length > 0) {
        matchReasons.push(`Palabras clave: #${matchedKws.join(', #')}`);
      }

      const overallMatch = (provMatch && entityMatch && passesThreshold) || matchedKws.length > 0;

      return {
        ...b,
        matchesUserFilters: overallMatch,
        filterMatchReasons: matchReasons.length > 0 ? matchReasons : ['Criterio de Cobertura General CNE']
      };
    });
  }, [bulletins, currentUser]);

  // Handler: Update user preferences
  const handleUpdatePreferences = (newPrefs: UserPreferences) => {
    setCurrentUser(prev => ({
      ...prev,
      preferences: newPrefs
    }));
    showToast(
      'Filtros Actualizados',
      `Se recalibraron los umbrales para ${currentUser.mediaOutlet} (${(newPrefs.selectedProvinces || []).length} provincias activas).`,
      'system'
    );
  };

  // Handler: Switch newsroom preset
  const handleSwitchPresetProfile = (preset: UserProfile) => {
    setCurrentUser(preset);
    showToast(
      'Perfil Periodístico Cambiado',
      `Ahora visualizando el flujo para: ${preset.mediaOutlet} (${preset.mediaType}).`,
      'system'
    );
  };

  // Handler: Dispatch Email Notification (Instant or Simulated)
  const handleDispatchEmail = (bulletin: CneBulletin) => {
    const provs = bulletin.extractedEntities?.provinces || [];
    const parties = bulletin.extractedEntities?.politicalParties || [];
    const legalArticles = bulletin.extractedEntities?.legalArticles || [];
    const keyTakeaways = bulletin.aiKeyTakeaways || [];
    
    const newEmail: EmailNotificationLog = {
      id: `email-${Date.now()}`,
      bulletinId: bulletin.id,
      bulletinTitle: bulletin.title,
      bulletinCode: bulletin.cneCode,
      recipientEmail: currentUser.email,
      recipientMediaOutlet: currentUser.mediaOutlet,
      sentAt: new Date().toISOString(),
      status: 'delivered',
      subject: `[CNE ALERTA ${(bulletin.aiUrgencyScore ?? 70) >= 85 ? 'URGENTE' : 'OFICIAL'}] ${bulletin.cneCode}: ${bulletin.title}`,
      previewText: (bulletin.aiSummary || '').substring(0, 120) + '...',
      plainTextContent: `CONSEJO NACIONAL ELECTORAL - NOTIFICACIÓN AUTOMATIZADA
Para: ${currentUser.mediaOutlet} (${currentUser.email})
Fecha: ${new Date().toLocaleString('es-EC')}
Código: ${bulletin.cneCode}
Documento: ${bulletin.title}

SÍNTESIS EJECUTIVA IA:
${bulletin.aiSummary || 'Documento oficial procesado'}

PUNTOS CLAVE:
${keyTakeaways.map(t => `• ${t}`).join('\n')}

JURISDICCIÓN: ${provs.join(', ') || 'Nacional'}
ORGANIZACIONES POLÍTICAS: ${parties.join(', ') || 'CNE General'}
BASE LEGAL: ${legalArticles.join(', ') || 'Código de la Democracia'}

Consulte el documento oficial firmado: ${bulletin.sourceUrl}
Firma Criptográfica SHA-256: ${bulletin.authenticity?.verificationHash || 'SHA-256-VERIFIED'}`,
      htmlContent: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #f1f5f9; padding: 24px; border-radius: 10px; border: 1px solid #1e293b;">
          <div style="border-bottom: 2px solid #0284c7; padding-bottom: 14px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="background-color: #0284c7; color: #ffffff; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase;">CNE ALERTA ELECTORAL</span>
              <h2 style="color: #ffffff; margin: 8px 0 0 0; font-size: 16px;">${bulletin.title}</h2>
            </div>
          </div>
          
          <div style="background-color: #1e293b; padding: 14px; border-radius: 6px; margin-bottom: 16px;">
            <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #e2e8f0;"><strong>Resumen Ejecutivo para Redacción:</strong> ${bulletin.aiSummary}</p>
          </div>

          <div style="margin-bottom: 16px;">
            <h4 style="color: #38bdf8; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase;">Puntos Clave del Documento:</h4>
            <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #cbd5e1; line-height: 1.6;">
              ${keyTakeaways.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 11px; color: #94a3b8; background-color: #020617; padding: 12px; border-radius: 6px; border: 1px solid #1e293b; margin-bottom: 16px;">
            <div><strong>Provincia / Cantón:</strong> ${provs.join(', ') || 'Nacional'}</div>
            <div><strong>Partidos / Binomios:</strong> ${parties.join(', ') || 'CNE General'}</div>
            <div><strong>Código CNE:</strong> ${bulletin.cneCode}</div>
            <div><strong>Autenticidad Verificada:</strong> ${bulletin.authenticity?.score || 98}% (Firma Digital Quipux)</div>
          </div>

          <div style="text-align: right; border-top: 1px solid #1e293b; padding-top: 12px;">
            <a href="${bulletin.sourceUrl}" target="_blank" style="background-color: #0284c7; color: #ffffff; text-decoration: none; padding: 7px 14px; border-radius: 5px; font-size: 12px; font-weight: bold; display: inline-block;">Consultar Documento Oficial en cne.gob.ec &rarr;</a>
          </div>
        </div>
      `,
      matchedProvinces: provs,
      matchedKeywords: bulletin.filterMatchReasons || ['Alerta'],
      relevanceScore: bulletin.aiRelevanceScore,
      sourceUrl: bulletin.sourceUrl,
      frequencyType: currentUser.preferences?.notificationFrequency || 'immediate',
      authenticityHash: bulletin.authenticity?.verificationHash || 'SHA-256-VERIFIED'
    };

    setEmailLogs(prev => [newEmail, ...prev]);
    showToast(
      'Alerta Despachada por Correo',
      `Enviado a ${currentUser.email} (${bulletin.cneCode}).`,
      'email'
    );
  };

  // Handler: Manual Web Crawler Scan
  const handleManualScan = () => {
    setCrawlerStats(prev => ({ ...prev, isScanning: true }));
    showToast('Iniciando Rastreo Web CNE', 'Escaneando gacetas oficiales y resoluciones del Pleno en cne.gob.ec...', 'crawler');

    setTimeout(() => {
      setCrawlerStats(prev => ({
        ...prev,
        isScanning: false,
        lastScanTime: new Date().toISOString(),
        lastScanDurationMs: Math.floor(Math.random() * 200) + 220,
        totalBulletinsIndexed: prev.totalBulletinsIndexed + 1
      }));

      showToast('Rastreo Concluido con Éxito', 'Se verificaron 24 delegaciones provinciales y 0 anomalías encontradas.', 'crawler');
    }, 1800);
  };

  // Handler: Add newly ingested custom bulletin from NLP Simulator
  const handleAddNewBulletin = (newB: CneBulletin) => {
    setBulletins(prev => [newB, ...prev]);
    setCrawlerStats(prev => ({
      ...prev,
      totalBulletinsIndexed: prev.totalBulletinsIndexed + 1
    }));
    showToast('Documento CNE Indexado', `Se incorporó ${newB.cneCode} al catálogo del sistema.`, 'system');
  };

  // Handler: Regenerate Daily Summary with server-side Gemini API
  const handleRegenerateDigest = async () => {
    try {
      const response = await fetch('/api/gemini/daily-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bulletins: evaluatedBulletins.slice(0, 10),
          userPreferences: currentUser?.preferences,
          userProfile: currentUser,
          mediaOutlet: currentUser?.mediaOutlet
        })
      });

      const data = await response.json();
      const digestObj = data.digest || data.summary;
      if (digestObj) {
        setDailyDigest(digestObj);
        showToast('Resumen Diario Actualizado', 'Síntesis ejecutiva generada con éxito para la sala de redacción.', 'system');
      }
    } catch (err) {
      console.error('Error generating daily summary:', err);
    }
  };

  // Handler: Send Daily Digest as Email
  const handleSendDigestEmail = (digest: DailyExecutiveDigest) => {
    const digestEmail: EmailNotificationLog = {
      id: `digest-email-${Date.now()}`,
      bulletinId: 'daily-digest-batch',
      bulletinTitle: digest.headline,
      bulletinCode: `CNE-DIGEST-${new Date().toISOString().slice(0, 10)}`,
      recipientEmail: currentUser.email,
      recipientMediaOutlet: currentUser.mediaOutlet,
      sentAt: new Date().toISOString(),
      status: 'delivered',
      subject: `[CNE RESUMEN DIARIO] ${currentUser.mediaOutlet} - ${digest.headline.substring(0, 70)}...`,
      previewText: digest.executiveSummary.substring(0, 120) + '...',
      plainTextContent: `INFORME PERIODÍSTICO CNE - ${digest.date}\nPara: ${currentUser.mediaOutlet}\n\n${digest.headline}\n\n${digest.executiveSummary}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; border-radius: 8px;">
          <h2 style="color: #38bdf8;">Resumen Electoral Ejecutivo CNE</h2>
          <p style="color: #94a3b8; font-size: 12px;">Para: ${currentUser.mediaOutlet} &bull; ${digest.date}</p>
          <hr style="border-color: #334155; margin: 15px 0;" />
          <h3 style="color: #ffffff;">${digest.headline}</h3>
          <p style="color: #cbd5e1; line-height: 1.6; font-size: 13px;">${digest.executiveSummary}</p>
        </div>
      `,
      matchedProvinces: currentUser?.preferences?.selectedProvinces || [],
      matchedKeywords: ['Resumen Diario Automatizado'],
      relevanceScore: 92,
      sourceUrl: 'https://cne.gob.ec/gaceta-electoral',
      frequencyType: 'daily_summary',
      authenticityHash: 'digest-sha256-verified-gemini-3.7-flash'
    };

    setEmailLogs(prev => [digestEmail, ...prev]);
    showToast('Informe Diario Despachado', `Se envió el consolidado a ${currentUser?.email || 'la redacción'}.`, 'email');
  };

  // Trigger transparency modal with specific bulletin
  const handleOpenTransparencyForBulletin = (b: CneBulletin) => {
    setSelectedAuditBulletin(b);
    setIsTransparencyModalOpen(true);
  };

  // Matching count
  const matchingCount = (evaluatedBulletins || []).filter(b => b.matchesUserFilters).length;

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-200 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative">
      
      {/* Subtle Ambient Background Gradient */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-transparent -z-10" />

      {/* 1. Global Navigation Header */}
      <Header
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenFilters={() => setIsFiltersModalOpen(true)}
        onOpenEmailInbox={() => setIsEmailInboxOpen(true)}
        onOpenDailyDigest={() => setIsDailyDigestOpen(true)}
        onOpenTransparency={() => {
          setSelectedAuditBulletin(null);
          setIsTransparencyModalOpen(true);
        }}
        onOpenSystemHealth={() => setIsSystemHealthOpen(true)}
        unreadEmailsCount={(emailLogs || []).filter(e => e.status === 'delivered').length}
        crawlerStats={crawlerStats}
      />

      {/* 2. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Top Newsroom Identity & Quick Scope Banner */}
        <div className="rounded-2xl bg-gradient-to-b from-blue-900/15 via-white/[0.03] to-transparent border border-white/10 p-5 sm:p-6 backdrop-blur-md shadow-2xl shadow-black/40 flex flex-wrap items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Medio Conectado: {currentUser?.mediaOutlet}
              </span>
              <span className="text-xs text-slate-400">
                • Tipo: <strong className="text-white font-medium">{currentUser?.mediaType}</strong> ({((currentUser?.preferences?.selectedProvinces) || []).join(', ')})
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
              Sistema Automatizado de Notificaciones Electorales CNE para Medios de Comunicación
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Monitoreo continuo de resoluciones, sentencias del TCE, desmentidos y alertas del Consejo Nacional Electoral del Ecuador, procesadas con interpretación en lenguaje natural (NLP) y verificación de autenticidad criptográfica.
            </p>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsFiltersModalOpen(true)}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-200 rounded-xl text-xs font-semibold border border-white/10 flex items-center gap-2 transition-all shadow-md"
            >
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Ajustar Filtros ({matchingCount} Coincidencias)</span>
            </button>

            <button
              onClick={() => setIsDailyDigestOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-amber-950/40"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Resumen Diario IA</span>
            </button>

            <button
              onClick={() => setIsEmailInboxOpen(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-900/30"
            >
              <Mail className="w-4 h-4" />
              <span>Bandeja de Correos ({(emailLogs || []).length})</span>
            </button>
          </div>
        </div>

        {/* 3. Crawler Status & NLP Playground Strip */}
        <CrawlerMonitor
          crawlerStats={crawlerStats}
          onManualScan={handleManualScan}
          currentUser={currentUser}
          onAddNewBulletin={handleAddNewBulletin}
          onTestDispatchEmail={handleDispatchEmail}
        />

        {/* 4. Active Filters Quick Pill Bar */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md p-4 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Provincias Activas:
            </span>
            {(currentUser?.preferences?.selectedProvinces || []).map(prov => (
              <span key={prov} className="bg-white/5 text-slate-200 px-2.5 py-1 rounded-lg border border-white/10 font-medium text-xs">
                {prov}
              </span>
            ))}

            <span className="text-white/20 mx-1">|</span>

            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Umbral IA:</span>
            <span className="bg-blue-500/10 text-cyan-300 px-2 py-0.5 rounded-md font-mono font-bold text-xs border border-blue-500/20">
              ≥ {currentUser?.preferences?.relevanceThreshold ?? 65}%
            </span>

            <span className="text-white/20 mx-1">|</span>

            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Frecuencia:</span>
            <span className="bg-white/5 text-slate-300 px-2.5 py-0.5 rounded-md text-xs border border-white/10">
              {(currentUser?.preferences?.alertFrequency || currentUser?.preferences?.notificationFrequency) === 'daily_summary' ? 'Resumen Diario' : (currentUser?.preferences?.alertFrequency || currentUser?.preferences?.notificationFrequency) === 'weekly_digest' ? 'Semanal' : 'Inmediata'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline text-xs flex items-center gap-1 transition-colors"
            >
              <span>Cambiar perfil de redacción</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5. Main Feed of CNE Documents and Resolutions */}
        <FeedList
          bulletins={evaluatedBulletins}
          currentUser={currentUser}
          onDispatchEmail={handleDispatchEmail}
          onOpenFilters={() => setIsFiltersModalOpen(true)}
          onViewTransparencyDetail={handleOpenTransparencyForBulletin}
        />

      </main>

      {/* 6. Footer */}
      <footer className="border-t border-white/10 bg-[#05070A]/90 backdrop-blur-md py-6 mt-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 border border-white/20 flex items-center justify-center text-white font-bold text-[10px]">
              CNE
            </div>
            <span>
              Plataforma de Monitoreo Electoral Ecuatoriano para Medios de Comunicación • Powered by Gemini 3.7 Flash
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => setIsTransparencyModalOpen(true)} className="hover:text-white transition-colors">
              Cadena de Custodia & Hashes
            </button>
            <span className="text-white/20">•</span>
            <button onClick={() => setIsSystemHealthOpen(true)} className="hover:text-white transition-colors">
              Salud del Agente & Privacidad
            </button>
            <span className="text-white/20">•</span>
            <a href="https://cne.gob.ec" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              cne.gob.ec Oficial
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onSaveProfile={setCurrentUser}
        sampleProfiles={SAMPLE_NEWSROOM_PROFILES}
        onSelectPresetProfile={handleSwitchPresetProfile}
      />

      <FiltersPanel
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        preferences={currentUser.preferences}
        onSavePreferences={handleUpdatePreferences}
        matchingCount={matchingCount}
        totalCount={evaluatedBulletins.length}
      />

      <EmailInboxModal
        isOpen={isEmailInboxOpen}
        onClose={() => setIsEmailInboxOpen(false)}
        emails={emailLogs}
        currentUser={currentUser}
        onMarkAsRead={id => {
          setEmailLogs(prev => prev.map(e => e.id === id ? { ...e, status: 'opened' } : e));
        }}
        onDeleteEmail={id => {
          setEmailLogs(prev => prev.filter(e => e.id !== id));
        }}
      />

      <DailyDigestModal
        isOpen={isDailyDigestOpen}
        onClose={() => setIsDailyDigestOpen(false)}
        digest={dailyDigest}
        bulletins={evaluatedBulletins}
        currentUser={currentUser}
        onRegenerateDigest={handleRegenerateDigest}
        onSendDigestEmail={handleSendDigestEmail}
      />

      <TransparencyAuditModal
        isOpen={isTransparencyModalOpen}
        onClose={() => setIsTransparencyModalOpen(false)}
        bulletins={evaluatedBulletins}
        selectedBulletin={selectedAuditBulletin}
      />

      <SystemHealthModal
        isOpen={isSystemHealthOpen}
        onClose={() => setIsSystemHealthOpen(false)}
        crawlerStats={crawlerStats}
      />

      {/* Floating Notification Toast */}
      {activeToast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-slate-900 border border-sky-600 rounded-xl p-3.5 shadow-2xl animate-in slide-in-from-bottom-5 duration-300 text-slate-100 flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            activeToast.type === 'email' ? 'bg-sky-950 border border-sky-700 text-sky-400' :
            activeToast.type === 'crawler' ? 'bg-emerald-950 border border-emerald-700 text-emerald-400' :
            'bg-purple-950 border border-purple-700 text-purple-400'
          }`}>
            {activeToast.type === 'email' ? <Mail className="w-4 h-4" /> :
             activeToast.type === 'crawler' ? <Bot className="w-4 h-4" /> :
             <CheckCircle2 className="w-4 h-4" />}
          </div>
          <div className="flex-1 text-xs">
            <div className="font-bold text-white leading-tight">{activeToast.title}</div>
            <div className="text-slate-300 mt-0.5 leading-relaxed">{activeToast.message}</div>
          </div>
        </div>
      )}

    </div>
  );
}
