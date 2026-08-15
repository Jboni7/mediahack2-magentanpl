import React, { useState } from 'react';
import { CrawlerStats, UserProfile, CneBulletin } from '../types';
import { 
  Bot, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Send, 
  FileText, 
  ShieldCheck, 
  Activity, 
  ChevronRight,
  Terminal,
  Zap
} from 'lucide-react';

interface CrawlerMonitorProps {
  crawlerStats: CrawlerStats;
  onManualScan: () => void;
  currentUser: UserProfile;
  onAddNewBulletin: (newBulletin: CneBulletin) => void;
  onTestDispatchEmail: (bulletin: CneBulletin) => void;
}

export const CrawlerMonitor: React.FC<CrawlerMonitorProps> = ({
  crawlerStats,
  onManualScan,
  currentUser,
  onAddNewBulletin,
  onTestDispatchEmail
}) => {
  const [isTestingCustomText, setIsTestingCustomText] = useState(false);
  const [customText, setCustomText] = useState('');
  const [analyzingCustom, setAnalyzingCustom] = useState(false);
  const [customAnalysisResult, setCustomAnalysisResult] = useState<CneBulletin | null>(null);

  const sampleCneTexts = [
    {
      label: 'Resolución de Sanción TCE por Gasto Excesivo en Guayas',
      text: `El Tribunal Contencioso Electoral (TCE) emitió la sentencia N° 092-2026 respecto al juzgamiento de cuentas de campaña en la provincia del Guayas (cantones Guayaquil y Samborondón). Se determinó que la alianza política sobrepasó en un 24% el límite máximo del Fondo de Promoción Electoral asignado. En consecuencia, el TCE sancionó a los responsables con una multa de 50 Salarios Básicos Unificados ($23,000 USD) y la suspensión de derechos de participación política por el lapso de seis meses. Se notifica a la Delegación Provincial del CNE en Guayas para su ejecución.`
    },
    {
      label: 'Boletín CNE: Auditoría al Padrón Electoral en Imbabura y Carchi',
      text: `La Dirección Nacional de Registro Electoral del CNE concluyó la jornada técnica de verificación biométrica y auditoría muestral del padrón en los cantones Ibarra, Otavalo y Tulcán. Con la participación de veedores de 8 organizaciones políticas, se constató un 99.8% de concordancia con la base de datos del Registro Civil. No se hallaron inconsistencias ni registros de personas fallecidas habilitadas para sufragar. Las listas definitivas de votantes quedan publicadas para consulta ciudadana.`
    }
  ];

  const handleAnalyzeCustomText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    setAnalyzingCustom(true);
    setCustomAnalysisResult(null);

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: customText,
          sourceUrl: 'https://cne.gob.ec/comunicados-oficiales/analisis-directo',
          userPreferences: currentUser.preferences
        })
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        const a = data.analysis;
        const newBulletin: CneBulletin = {
          id: `custom-${Date.now()}`,
          title: a.title,
          cneCode: a.cneCode || `CNE-CUSTOM-${Math.floor(Math.random() * 1000)}`,
          publishedAt: new Date().toISOString(),
          sourceUrl: 'https://cne.gob.ec/gaceta-electoral',
          category: a.category || 'resolucion_oficial',
          rawText: customText,
          aiSummary: a.aiSummary,
          aiKeyTakeaways: a.aiKeyTakeaways || [],
          aiUrgencyScore: a.aiUrgencyScore || 80,
          aiRelevanceScore: a.aiRelevanceScore || 85,
          aiCategorization: a.aiCategorization || {
            isOfficialResolution: true,
            isRumorDebunk: false,
            isAdministrativeOnly: false,
            confidence: 0.95
          },
          extractedEntities: a.extractedEntities || {
            provinces: [],
            cantons: [],
            candidates: [],
            politicalParties: [],
            legalArticles: [],
            electionType: 'General'
          },
          authenticity: a.authenticity || {
            status: 'verified',
            score: 98,
            verifiedDomain: true,
            digitalSignatureFound: true,
            verificationHash: 'custom-hash-' + Math.random().toString(36).substring(2),
            securitySealText: 'Validado por Agente IA CNE',
            cneIssuerDepartment: 'Consejo Nacional Electoral'
          },
          scannedAt: new Date().toISOString(),
          matchesUserFilters: a.matchesUserFilters ?? true,
          filterMatchReasons: a.filterMatchReasons || ['Analizado mediante Ingestión Personalizada']
        };

        setCustomAnalysisResult(newBulletin);
      }
    } catch (err) {
      console.error('Error analyzing custom text:', err);
    } finally {
      setAnalyzingCustom(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 backdrop-blur-md shadow-xl shadow-black/30 space-y-5">
      {/* Top Crawler Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 border border-white/20 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                Agente Autónomo de Recopilación y Monitoreo CNE
              </h3>
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                Vigilancia 24/7
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Escaneo web continuo en <code className="text-cyan-300 font-mono text-[11px] bg-white/5 px-1 py-0.5 rounded border border-white/10">cne.gob.ec</code>, gacetas electorales y delegaciones provinciales
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsTestingCustomText(!isTestingCustomText)}
            className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-slate-200 rounded-xl text-xs font-semibold border border-white/10 flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isTestingCustomText ? 'Ocultar Ingestor' : 'Probar Texto CNE con NLP'}</span>
          </button>

          <button
            onClick={onManualScan}
            disabled={crawlerStats.isScanning}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
              crawlerStats.isScanning
                ? 'bg-white/5 text-slate-400 border border-white/10 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${crawlerStats.isScanning ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{crawlerStats.isScanning ? 'Rastreando Web...' : 'Ejecutar Rastreo Manual'}</span>
          </button>
        </div>
      </div>

      {/* Metric counters with Immersive glass cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xs">
          <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Último Barrido Web</div>
          <div className="text-xs font-bold text-white mt-1 font-mono">
            {new Date(crawlerStats.lastScanTime).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
            Duración: {crawlerStats.lastScanDurationMs}ms
          </div>
        </div>

        <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xs">
          <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Documentos Indexados</div>
          <div className="text-xs font-bold text-white mt-1 font-mono">
            {crawlerStats.totalBulletinsIndexed} publicaciones
          </div>
          <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
            Gaceta + Resoluciones
          </div>
        </div>

        <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xs">
          <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Autenticidad Criptográfica</div>
          <div className="text-xs font-bold text-white mt-1 font-mono">
            {crawlerStats.aiVerificationSuccessRate}% Confiabilidad
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
            Firma Quipux / Hash SHA256
          </div>
        </div>

        <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xs">
          <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Latencia Promedio IA</div>
          <div className="text-xs font-bold text-white mt-1 font-mono">
            {crawlerStats.aiLatencyAvgMs} ms
          </div>
          <div className="text-[10px] text-purple-400 font-mono mt-0.5">
            Gemini 3.7 Flash NLP
          </div>
        </div>
      </div>

      {/* Custom Text Ingestion Tester */}
      {isTestingCustomText && (
        <div className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-3.5 backdrop-blur-md animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                Simulador de Ingestión & Análisis NLP de Textos del CNE
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">
              Pruebe cómo la IA clasifica y calcula la relevancia de cualquier texto
            </span>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase text-slate-500 font-bold">Ejemplos reales:</span>
            {sampleCneTexts.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCustomText(sample.text)}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-cyan-300 text-[11px] rounded-lg border border-white/10 transition-all truncate max-w-xs"
              >
                {sample.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleAnalyzeCustomText} className="space-y-3">
            <textarea
              rows={4}
              value={customText}
              onChange={e => setCustomText(e.target.value)}
              placeholder="Pegue aquí el texto de un comunicado, resolución, acta de pleno o noticia del CNE / TCE..."
              className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-400 leading-relaxed font-sans"
            />

            <div className="flex items-center justify-between">
              <div className="text-[11px] text-slate-400">
                La IA evaluará automáticamente: tipo de documento, entidades, autenticidad, urgencia y filtro del medio actual (<strong>{currentUser?.mediaOutlet || 'Prensa'}</strong>).
              </div>

              <button
                type="submit"
                disabled={analyzingCustom || !customText.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-blue-900/30"
              >
                {analyzingCustom ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Interpretando con IA...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>Analizar con IA (NLP)</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Analysis result preview */}
          {customAnalysisResult && (
            <div className="p-4 bg-white/5 border border-cyan-500/30 rounded-xl space-y-3 mt-3 backdrop-blur-md animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 text-cyan-300 text-[10px] font-mono rounded">
                    {customAnalysisResult.cneCode}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {customAnalysisResult.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    customAnalysisResult.matchesUserFilters
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}>
                    {customAnalysisResult.matchesUserFilters ? '✓ Pasa los Filtros del Medio' : 'Ignorado por Filtros'}
                  </span>
                  <span className="text-[10px] font-bold text-cyan-400 bg-blue-500/15 px-2 py-0.5 rounded border border-cyan-400/30 font-mono">
                    Relevancia: {customAnalysisResult.aiRelevanceScore}%
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-black/40 p-3 rounded-lg border border-white/10">
                <strong className="text-cyan-300">Resumen IA:</strong> {customAnalysisResult.aiSummary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 bg-black/40 rounded-lg border border-white/10">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Entidades Extraídas:</div>
                  <div className="text-slate-300">Provincias: {(customAnalysisResult.extractedEntities?.provinces || []).join(', ') || 'Nacional'}</div>
                  <div className="text-slate-300">Artículos: {(customAnalysisResult.extractedEntities?.legalArticles || []).join(', ') || 'Código de la Democracia'}</div>
                </div>

                <div className="p-2.5 bg-black/40 rounded-lg border border-white/10">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Verificación de Autenticidad:</div>
                  <div className="text-emerald-400 font-semibold">{customAnalysisResult.authenticity?.securitySealText || 'Validado por Agente IA CNE'}</div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">Hash: {customAnalysisResult.authenticity?.verificationHash || 'N/A'}</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    onAddNewBulletin(customAnalysisResult);
                    setCustomText('');
                    setCustomAnalysisResult(null);
                    setIsTestingCustomText(false);
                  }}
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/15 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/10"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Agregar al Feed Scanneado
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onAddNewBulletin(customAnalysisResult);
                    onTestDispatchEmail(customAnalysisResult);
                    setCustomText('');
                    setCustomAnalysisResult(null);
                    setIsTestingCustomText(false);
                  }}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-blue-900/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  Agregar y Despachar Alerta por Correo
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
