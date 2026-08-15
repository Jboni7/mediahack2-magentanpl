import React from 'react';
import { UserProfile, CrawlerStats } from '../types';
import { 
  ShieldCheck, 
  Mail, 
  Sparkles, 
  SlidersHorizontal, 
  Activity, 
  RefreshCw,
  PauseCircle,
  Radio,
  FileCheck2,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentUser: UserProfile;
  availableUsers?: UserProfile[];
  onSelectUser?: (user: UserProfile) => void;
  onOpenProfile: () => void;
  onOpenFilters: () => void;
  onOpenInbox?: () => void;
  onOpenEmailInbox?: () => void;
  onOpenDigest?: () => void;
  onOpenDailyDigest?: () => void;
  onOpenTransparency?: () => void;
  onOpenHealth?: () => void;
  onOpenSystemHealth?: () => void;
  onManualScan?: () => void;
  crawlerStats: CrawlerStats;
  unreadCount?: number;
  unreadEmailsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenProfile,
  onOpenFilters,
  onOpenInbox,
  onOpenEmailInbox,
  onOpenDigest,
  onOpenDailyDigest,
  onOpenTransparency,
  onOpenHealth,
  onOpenSystemHealth,
  onManualScan,
  crawlerStats,
  unreadCount,
  unreadEmailsCount
}) => {
  const handleOpenInbox = onOpenEmailInbox || onOpenInbox || (() => {});
  const handleOpenDigest = onOpenDailyDigest || onOpenDigest || (() => {});
  const handleOpenHealth = onOpenSystemHealth || onOpenHealth || (() => {});
  const totalUnread = unreadEmailsCount ?? unreadCount ?? 0;

  // Extract user initials
  const initials = currentUser.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'CA';

  return (
    <header className="sticky top-0 z-30 bg-[#05070A]/85 backdrop-blur-xl border-b border-white/10 text-white shadow-2xl">
      {/* Top institutional strip */}
      <div className="bg-white/[0.02] px-4 sm:px-6 py-1.5 text-xs text-slate-400 border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="font-semibold text-white tracking-wide text-xs">CNE AI Sentinel</span>
          </div>
          <span className="text-white/20">•</span>
          <span className="text-slate-400 hidden sm:inline">Monitoreo Oficial en Tiempo Real</span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="text-slate-400 text-[11px] hidden md:inline font-mono">cne.gob.ec & tce.gob.ec</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>Último Escaneo:</span>
            <span className="text-slate-200 font-mono">Hace 3 min</span>
          </div>

          <span className="text-white/20 hidden sm:inline">•</span>

          {currentUser.preferences.notificationsPaused ? (
            <span className="inline-flex items-center gap-1 text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-lg text-[11px] font-medium">
              <PauseCircle className="w-3 h-3 text-amber-400" />
              Notificaciones Pausadas
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-lg text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Vigilancia Activa
            </span>
          )}

          <button 
            onClick={handleOpenHealth}
            id="btn-system-health"
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-[11px] flex items-center gap-1.5 transition-all"
            title="Monitoreo de crawler y estado del sistema"
          >
            <Activity className="w-3 h-3 text-emerald-400" />
            <span className="hidden sm:inline">Salud del Agente</span>
          </button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 border border-white/20 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-500/20">
            CNE
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                Alerta Electoral IA
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Prensa & Medios
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Consejo Nacional Electoral del Ecuador • Monitoreo con NLP
            </p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Manual scan button */}
          {onManualScan && (
            <button
              onClick={onManualScan}
              id="btn-manual-scan-cne"
              disabled={crawlerStats.isScanning}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${
                crawlerStats.isScanning
                  ? 'bg-white/5 text-slate-400 border border-white/10 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 border border-blue-400/30'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${crawlerStats.isScanning ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{crawlerStats.isScanning ? 'Escaneando CNE...' : 'Forzar Sincronización'}</span>
            </button>
          )}

          {/* Daily summary button */}
          <button
            onClick={handleOpenDigest}
            id="btn-open-daily-digest"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Resumen Diario IA</span>
            <span className="sm:hidden">Resumen</span>
          </button>

          {/* Email inbox / log button */}
          <button
            onClick={handleOpenInbox}
            id="btn-open-email-inbox"
            className="relative px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 flex items-center gap-2 transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Bandeja de Alertas</span>
            <span className="sm:hidden">Alertas</span>
            {totalUnread > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold bg-cyan-500 text-slate-950 rounded-full font-mono">
                {totalUnread}
              </span>
            )}
          </button>

          {/* Filters configuration button */}
          <button
            onClick={onOpenFilters}
            id="btn-open-filters"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 flex items-center gap-2 transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
            <span>Filtros</span>
            <span className="bg-blue-500/20 text-blue-300 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
              {(currentUser?.preferences?.selectedProvinces || []).length} prov
            </span>
          </button>

          {/* Profile selector button with Immersive Avatar styling */}
          <div className="flex items-center pl-2 border-l border-white/10">
            <button
              onClick={onOpenProfile}
              id="btn-open-user-profile"
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group"
              title="Ver y editar perfil de la sala de redacción"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border border-white/20 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                {initials}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors leading-tight truncate max-w-[130px]">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-[130px]">
                  {currentUser.mediaOutlet}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
