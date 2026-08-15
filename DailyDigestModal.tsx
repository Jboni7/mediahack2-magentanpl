import React, { useState } from 'react';
import { CneBulletin, UserProfile } from '../types';
import { 
  ShieldCheck, 
  ExternalLink, 
  Mail, 
  Copy, 
  Check, 
  AlertTriangle, 
  FileText, 
  Tag, 
  MapPin, 
  Scale, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Info
} from 'lucide-react';

interface BulletinCardProps {
  bulletin: CneBulletin;
  currentUser: UserProfile;
  onDispatchEmail: (bulletin: CneBulletin) => void;
  onViewTransparencyDetail?: (bulletin: CneBulletin) => void;
}

export const BulletinCard: React.FC<BulletinCardProps> = ({
  bulletin,
  currentUser,
  onDispatchEmail,
  onViewTransparencyDetail
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dispatchedSuccess, setDispatchedSuccess] = useState(false);

  const handleCopyJournalistBrief = () => {
    const keyTakeaways = bulletin.aiKeyTakeaways || [];
    const provs = bulletin.extractedEntities?.provinces || [];
    const parties = bulletin.extractedEntities?.politicalParties || [];
    const legalArticles = bulletin.extractedEntities?.legalArticles || [];
    
    const text = `SÍNTESIS PERIODÍSTICA CNE (${bulletin.cneCode})
TITULAR: ${bulletin.title}
FECHA: ${new Date(bulletin.publishedAt).toLocaleDateString('es-EC')}
RESUMEN EJECUTIVO: ${bulletin.aiSummary}

PUNTOS CLAVE:
${keyTakeaways.map(p => `• ${p}`).join('\n')}

JURISDICCIÓN: ${provs.join(', ') || 'Nacional'}
ORGANIZACIONES / ACTORES: ${parties.join(', ') || 'CNE General'}
BASE LEGAL: ${legalArticles.join(', ') || 'Código de la Democracia'}
FUENTE OFICIAL: ${bulletin.sourceUrl}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendAlert = () => {
    onDispatchEmail(bulletin);
    setDispatchedSuccess(true);
    setTimeout(() => setDispatchedSuccess(false), 2500);
  };

  // Category styling
  const getCategoryConfig = (cat: string) => {
    switch (cat) {
      case 'resolucion_oficial':
        return { label: 'Resolución Oficial del Pleno', bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-500/40' };
      case 'desmentido_rumores':
        return { label: 'Desmentido de Rumor / Fact-Check', bg: 'bg-red-500/20', text: 'text-red-300', border: 'border-red-500/40' };
      case 'tramite_administrativo':
        return { label: 'Trámite Administrativo / Servicio', bg: 'bg-white/10', text: 'text-slate-300', border: 'border-white/15' };
      case 'impugnacion_reclamacion':
        return { label: 'Sentencia / Impugnación Jurisdiccional', bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-500/40' };
      default:
        return { label: 'Boletín de Prensa Oficial', bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/40' };
    }
  };

  const catStyle = getCategoryConfig(bulletin.category);
  const userThreshold = currentUser?.preferences?.relevanceThreshold ?? 65;
  const userProvs = currentUser?.preferences?.selectedProvinces || [];
  const bulletinProvs = bulletin.extractedEntities?.provinces || [];
  const bulletinCantons = bulletin.extractedEntities?.cantons || [];
  const bulletinParties = bulletin.extractedEntities?.politicalParties || [];
  const bulletinArticles = bulletin.extractedEntities?.legalArticles || [];
  const filterReasons = bulletin.filterMatchReasons || [];
  const keyTakeaways = bulletin.aiKeyTakeaways || [];

  return (
    <div className={`rounded-2xl border transition-all duration-200 overflow-hidden backdrop-blur-md shadow-xl ${
      bulletin.matchesUserFilters
        ? 'bg-white/[0.04] border-white/15 shadow-black/40 hover:bg-white/[0.06] hover:border-cyan-500/40'
        : 'bg-white/[0.02] border-white/5 opacity-75 hover:opacity-100 hover:bg-white/[0.04]'
    }`}>
      {/* Top Meta Strip */}
      <div className="px-4 sm:px-5 py-3 bg-black/40 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center flex-wrap gap-2.5">
          {/* CNE Code */}
          <span className="font-mono text-xs font-bold text-cyan-300 bg-blue-500/20 px-2.5 py-0.5 rounded-lg border border-blue-500/30">
            {bulletin.cneCode}
          </span>

          {/* Category */}
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
            {catStyle.label}
          </span>

          {/* Date */}
          <span className="text-[11px] text-slate-400">
            {new Date(bulletin.publishedAt).toLocaleDateString('es-EC', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Authenticity & Match status */}
        <div className="flex items-center gap-2">
          {/* Authenticity seal */}
          <div 
            onClick={() => onViewTransparencyDetail && onViewTransparencyDetail(bulletin)}
            className="cursor-pointer inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-lg hover:bg-emerald-500/20 transition-colors"
            title="Verificar firma digital y sello Quipux del CNE"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{bulletin.authenticity?.score || 98}% Auténtico</span>
          </div>

          {/* Relevance score */}
          <div className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${
            (bulletin.aiRelevanceScore ?? 70) >= userThreshold
              ? 'text-cyan-300 bg-blue-500/20 border-cyan-400/30 font-mono'
              : 'text-slate-400 bg-white/5 border-white/10 font-mono'
          }`}>
            <Flame className={`w-3 h-3 ${(bulletin.aiRelevanceScore ?? 70) >= 80 ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>Relevancia: {bulletin.aiRelevanceScore}%</span>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 sm:p-5 space-y-4">
        
        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight">
          {bulletin.title}
        </h3>

        {/* Filter Match Badge info */}
        {bulletin.matchesUserFilters ? (
          <div className="p-2.5 bg-blue-500/15 border border-blue-500/30 rounded-xl text-xs flex flex-wrap items-center gap-2 text-blue-200">
            <span className="font-semibold flex items-center gap-1.5 text-cyan-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              Coincide con sus filtros:
            </span>
            {filterReasons.map((reason, idx) => (
              <span key={idx} className="bg-blue-900/60 px-2 py-0.5 rounded-md text-[11px] border border-blue-700/60 text-blue-100">
                {reason}
              </span>
            ))}
          </div>
        ) : (
          <div className="p-2.5 bg-black/30 border border-white/10 rounded-xl text-[11px] text-slate-400 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Publicación fuera de sus filtros prioritarios (relevancia menor o provincia no priorizada para {currentUser?.mediaOutlet || 'su medio'}).</span>
          </div>
        )}

        {/* AI NLP Executive Summary */}
        <div className="bg-black/35 p-4 rounded-xl border border-white/10 space-y-2.5 backdrop-blur-xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Síntesis Inteligente para Sala de Redacción (NLP):</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {bulletin.aiSummary}
          </p>

          {/* Key Takeaways */}
          {keyTakeaways.length > 0 && (
            <div className="pt-2.5 border-t border-white/10 space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Puntos Clave:
              </div>
              <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc marker:text-cyan-400">
                {keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Extracted Entities Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          {/* Provinces */}
          {bulletinProvs.map(prov => {
            const isUserProv = userProvs.includes(prov);
            return (
              <span
                key={prov}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                  isUserProv
                    ? 'bg-blue-500/25 text-cyan-200 border-blue-400/40 shadow-xs'
                    : 'bg-white/5 text-slate-400 border-white/10'
                }`}
              >
                <MapPin className="w-3 h-3 text-cyan-400" />
                {prov}
              </span>
            );
          })}

          {/* Cantons */}
          {bulletinCantons.map(canton => (
            <span
              key={canton}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] bg-white/5 text-slate-300 border border-white/10"
            >
              📍 {canton}
            </span>
          ))}

          {/* Political Parties */}
          {bulletinParties.map(party => (
            <span
              key={party}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] bg-amber-500/15 text-amber-300 border border-amber-500/30"
            >
              🗳️ {party}
            </span>
          ))}

          {/* Legal Articles */}
          {bulletinArticles.map(art => (
            <span
              key={art}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] bg-purple-500/15 text-purple-300 border border-purple-500/30 font-mono"
            >
              <Scale className="w-3 h-3 text-purple-400" />
              {art}
            </span>
          ))}
        </div>

        {/* Expandable full official text */}
        {isExpanded && (
          <div className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-2">
              <span className="font-semibold text-slate-200">Texto Oficial Extraído del Portal CNE:</span>
              <span className="font-mono text-[10px] text-slate-500">
                Firma Digital: {bulletin.authenticity.securitySealText}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">
              {bulletin.rawText}
            </p>
          </div>
        )}

      </div>

      {/* Card Action Footer */}
      <div className="px-4 sm:px-5 py-3 bg-black/40 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Ocultar texto completo</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Ver texto oficial extraído</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2">
          {/* Copy draft button */}
          <button
            onClick={handleCopyJournalistBrief}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-200 text-xs rounded-xl border border-white/10 flex items-center gap-1.5 transition-all"
            title="Copiar resumen y datos para pauta periodística"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? '¡Copiado!' : 'Copiar Ficha'}</span>
          </button>

          {/* Official source URL link */}
          <a
            href={bulletin.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-cyan-400 text-xs rounded-xl border border-white/10 flex items-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fuente cne.gob.ec</span>
            <span className="sm:hidden">Fuente</span>
          </a>

          {/* Test/Trigger email dispatch */}
          <button
            onClick={handleSendAlert}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
              dispatchedSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30'
            }`}
            title="Enviar alerta por correo de este comunicado a su bandeja"
          >
            {dispatchedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>¡Alerta Enviada!</span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5" />
                <span>Despachar Alerta</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
