import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { ECUADOR_PROVINCES, ENTITY_TYPES, DEFAULT_KEYWORDS } from '../data/ecuadorLocations';
import { 
  SlidersHorizontal, 
  MapPin, 
  Tag, 
  Layers, 
  Gauge, 
  Plus, 
  X, 
  Check, 
  ChevronDown, 
  ChevronRight, 
  Sparkles,
  Info,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface FiltersPanelProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSavePreferences: (newPrefs: UserPreferences) => void;
  matchingCount: number;
  totalCount: number;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences,
  matchingCount,
  totalCount
}) => {
  const [prefs, setPrefs] = useState<UserPreferences>(() => ({
    selectedProvinces: preferences?.selectedProvinces || ['Imbabura', 'Pichincha'],
    selectedCantons: preferences?.selectedCantons || { 'Imbabura': ['Ibarra'], 'Pichincha': ['Quito'] },
    selectedParties: preferences?.selectedParties || [],
    selectedEntityTypes: preferences?.selectedEntityTypes || ['candidatos', 'partidos', 'resoluciones_cne', 'resultados'],
    selectedElectionTypes: preferences?.selectedElectionTypes || ['general', 'seccional', 'consulta_popular'],
    relevanceThreshold: preferences?.relevanceThreshold ?? 65,
    keywords: preferences?.keywords || ['impugnación', 'calificación', 'debate', 'fraude'],
    notificationFrequency: preferences?.notificationFrequency || 'immediate',
    alertFrequency: preferences?.alertFrequency || 'immediate',
    emailFormat: preferences?.emailFormat || 'html',
    autoFactCheckFilter: preferences?.autoFactCheckFilter ?? true,
    filterByJurisdiction: preferences?.filterByJurisdiction ?? true
  }));
  const [newKeyword, setNewKeyword] = useState('');
  const [expandedProvinces, setExpandedProvinces] = useState<{ [prov: string]: boolean }>({
    'Imbabura': true,
    'Pichincha': true,
    'Guayas': false
  });
  const [saveToast, setSaveToast] = useState(false);

  if (!isOpen) return null;

  const currentProvs = prefs.selectedProvinces || [];
  const currentCantonsMap = prefs.selectedCantons || {};
  const currentEntityTypes = prefs.selectedEntityTypes || [];
  const currentKeywords = prefs.keywords || [];

  const handleApply = () => {
    onSavePreferences(prefs);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      onClose();
    }, 800);
  };

  const handleResetDefaults = () => {
    setPrefs({
      ...prefs,
      selectedProvinces: ['Imbabura', 'Pichincha'],
      selectedCantons: {
        'Imbabura': ['Ibarra', 'Otavalo', 'Cotacachi'],
        'Pichincha': ['Quito']
      },
      selectedEntityTypes: ['candidatos', 'partidos', 'resoluciones_cne', 'resultados'],
      relevanceThreshold: 65,
      keywords: ['impugnación', 'calificación', 'debate', 'fraude']
    });
  };

  const toggleProvince = (provName: string) => {
    const isSelected = currentProvs.includes(provName);
    let updatedProvinces: string[];
    const updatedCantons = { ...currentCantonsMap };

    if (isSelected) {
      updatedProvinces = currentProvs.filter(p => p !== provName);
      delete updatedCantons[provName];
    } else {
      updatedProvinces = [...currentProvs, provName];
      const provData = ECUADOR_PROVINCES.find(p => p.province === provName);
      if (provData && (provData.cantons || []).length > 0) {
        updatedCantons[provName] = [provData.cantons[0]];
      }
    }

    setPrefs({
      ...prefs,
      selectedProvinces: updatedProvinces,
      selectedCantons: updatedCantons
    });
  };

  const toggleCanton = (provName: string, cantonName: string) => {
    const currentCantons = currentCantonsMap[provName] || [];
    const isSelected = currentCantons.includes(cantonName);
    let updated: string[];

    if (isSelected) {
      updated = currentCantons.filter(c => c !== cantonName);
    } else {
      updated = [...currentCantons, cantonName];
    }

    setPrefs({
      ...prefs,
      selectedCantons: {
        ...currentCantonsMap,
        [provName]: updated
      }
    });
  };

  const toggleEntityType = (typeId: string) => {
    const current = currentEntityTypes;
    const updated = current.includes(typeId)
      ? current.filter(id => id !== typeId)
      : [...current, typeId];

    setPrefs({
      ...prefs,
      selectedEntityTypes: updated
    });
  };

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newKeyword.trim().toLowerCase();
    if (trimmed && !currentKeywords.includes(trimmed)) {
      setPrefs({
        ...prefs,
        keywords: [...currentKeywords, trimmed]
      });
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setPrefs({
      ...prefs,
      keywords: currentKeywords.filter(k => k !== kw)
    });
  };

  const handleQuickAddKeyword = (kw: string) => {
    if (!currentKeywords.includes(kw)) {
      setPrefs({
        ...prefs,
        keywords: [...currentKeywords, kw]
      });
    }
  };

  const toggleExpand = (prov: string) => {
    setExpandedProvinces(prev => ({ ...prev, [prov]: !prev[prov] }));
  };

  const getThresholdLabel = (val: number) => {
    if (val >= 80) return { text: 'Estricto / Solo Crítico & Urgente', color: 'text-red-400', badge: 'bg-red-500/20 border-red-500/40' };
    if (val >= 60) return { text: 'Equilibrado / Relevante & Resoluciones', color: 'text-cyan-300', badge: 'bg-blue-500/20 border-blue-500/40' };
    return { text: 'Amplio / Incluye Trámites y Noticias Menores', color: 'text-amber-400', badge: 'bg-amber-500/20 border-amber-500/40' };
  };

  const thresholdInfo = getThresholdLabel(prefs.relevanceThreshold);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#080C14]/95 border border-white/15 w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden text-slate-200 backdrop-blur-xl">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-black/40 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 border border-white/20 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                Configuración del Motor de Filtros y Umbrales IA
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Ajuste la precisión hiperlocal y temática para evitar saturación en la redacción
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDefaults}
              className="px-3 py-1.5 text-slate-400 hover:text-slate-200 text-xs rounded-xl border border-white/10 hover:border-white/20 flex items-center gap-1.5 transition-all bg-white/5"
              title="Restaurar filtros sugeridos"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Restaurar</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* Top Live Impact Indicator */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-wrap items-center justify-between gap-3 backdrop-blur-xs">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-300">
                Publicaciones CNE que coinciden con estos parámetros:
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 text-cyan-300 font-bold rounded-lg">
                {matchingCount} de {totalCount} publicaciones
              </span>
              <span className="text-slate-400">
                ({Math.round((matchingCount / (totalCount || 1)) * 100)}% del feed)
              </span>
            </div>
          </div>

          {/* Section 1: Provinces & Cantons Filter */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide">
                  1. Filtro Geográfico por Provincia y Cantón
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">
                {currentProvs.length} provincias activas
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Seleccione las provincias de cobertura. Despliegue cualquier provincia para afinar por cantones específicos.
            </p>

            <div className="space-y-2 max-h-56 overflow-y-auto p-1.5 bg-black/30 rounded-xl border border-white/10">
              {ECUADOR_PROVINCES.map(prov => {
                const isProvSelected = currentProvs.includes(prov.province);
                const isExpanded = !!expandedProvinces[prov.province];
                const selectedCantonsInProv = currentCantonsMap[prov.province] || [];

                return (
                  <div
                    key={prov.province}
                    className={`rounded-xl border transition-all ${
                      isProvSelected
                        ? 'bg-white/[0.06] border-cyan-500/40 shadow-xs'
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => toggleProvince(prov.province)}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isProvSelected
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'border-white/20 bg-black/40'
                          }`}
                        >
                          {isProvSelected && <Check className="w-3 h-3" />}
                        </button>
                        <span className={`text-xs font-semibold ${isProvSelected ? 'text-white' : 'text-slate-400'}`}>
                          {prov.province}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          ({prov.region})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isProvSelected && (
                          <span className="text-[10px] bg-blue-500/20 text-cyan-300 px-2 py-0.5 rounded-md border border-blue-500/30 font-mono">
                            {selectedCantonsInProv.length} cantones
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleExpand(prov.province)}
                          className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-white/10"
                        >
                          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Cantons accordion */}
                    {isExpanded && (
                      <div className="px-4 pb-3 pt-2 border-t border-white/10 bg-black/40 rounded-b-xl">
                        <div className="text-[11px] text-slate-400 mb-2 font-medium">
                          Cantones de {prov.province}:
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
                          {prov.cantons.map(canton => {
                            const isCantonChecked = selectedCantonsInProv.includes(canton);
                            return (
                              <button
                                type="button"
                                key={canton}
                                onClick={() => {
                                  if (!isProvSelected) {
                                    toggleProvince(prov.province);
                                  }
                                  toggleCanton(prov.province, canton);
                                }}
                                className={`px-2.5 py-1.5 rounded-lg text-left text-[11px] border transition-all flex items-center justify-between ${
                                  isCantonChecked
                                    ? 'bg-blue-500/25 border-blue-400/40 text-cyan-200 font-semibold'
                                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                <span className="truncate">{canton}</span>
                                {isCantonChecked && <Check className="w-2.5 h-2.5 text-cyan-400 shrink-0 ml-1" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Entity Types Filter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide">
                  2. Filtro por Tipo de Entidad y Documento Electoral
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">
                {currentEntityTypes.length} de {ENTITY_TYPES.length} activos
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Evite spam desmarcando categorías administrativas o temas fuera de su pauta informativa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {ENTITY_TYPES.map(entity => {
                const isSelected = currentEntityTypes.includes(entity.id);
                return (
                  <button
                    type="button"
                    key={entity.id}
                    onClick={() => toggleEntityType(entity.id)}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-blue-500/15 border-blue-500/40 text-blue-200 shadow-sm'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-white mb-1.5">
                      <span>{entity.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {entity.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Relevance Threshold Slider */}
          <div className="p-5 bg-black/35 border border-white/10 rounded-xl space-y-3.5 backdrop-blur-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide">
                  3. Umbral de Relevancia de la IA ({prefs.relevanceThreshold}%)
                </h3>
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${thresholdInfo.badge} ${thresholdInfo.color}`}>
                {thresholdInfo.text}
              </span>
            </div>

            <p className="text-xs text-slate-400">
              La IA evalúa la trascendencia legal, impacto en el calendario, binomios afectados y autenticidad del CNE. Solo las publicaciones con puntaje igual o superior al umbral generarán alertas por correo.
            </p>

            <div className="pt-2">
              <input
                type="range"
                min="30"
                max="95"
                step="5"
                value={prefs.relevanceThreshold}
                onChange={e => setPrefs({ ...prefs, relevanceThreshold: parseInt(e.target.value) })}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5">
                <span>30% (Todo el flujo CNE)</span>
                <span>60% (Recomendado Medios)</span>
                <span>95% (Solo Crisis / Proclamación)</span>
              </div>
            </div>
          </div>

          {/* Section 4: Custom Trigger Keywords */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide">
                  4. Palabras Clave de Prioridad Inmediata
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">
                {currentKeywords.length} términos activos
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Cualquier documento oficial del CNE que contenga estos términos elevará su prioridad y disparará la notificación.
            </p>

            {/* Keyword form */}
            <form onSubmit={handleAddKeyword} className="flex gap-2.5 mb-3">
              <input
                type="text"
                value={newKeyword}
                onChange={e => setNewKeyword(e.target.value)}
                placeholder="Escriba palabra clave (ej. 'revisión de firmas', 'impugnación', 'Ibarra', 'fraude')..."
                className="flex-1 px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-cyan-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-900/30"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar
              </button>
            </form>

            {/* Active keywords chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              {currentKeywords.map(kw => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 border border-blue-500/30 text-cyan-300"
                >
                  <span>#{kw}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(kw)}
                    className="hover:text-red-400 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Suggested quick adds */}
            <div className="p-3.5 bg-black/30 border border-white/10 rounded-xl">
              <div className="text-[11px] text-slate-400 mb-2 font-medium">Sugerencias habituales para salas de redacción en Ecuador:</div>
              <div className="flex flex-wrap gap-1.5">
                {DEFAULT_KEYWORDS.filter(k => !prefs.keywords.includes(k)).map(suggested => (
                  <button
                    type="button"
                    key={suggested}
                    onClick={() => handleQuickAddKeyword(suggested)}
                    className="px-2.5 py-1 rounded-lg text-[11px] bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-2.5 h-2.5 text-cyan-400" />
                    {suggested}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-black/40 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            {saveToast ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Filtros aplicados al agente IA
              </span>
            ) : (
              <span>Los cambios afectarán el próximo barrido y las alertas automáticas.</span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-semibold transition-all border border-white/10"
            >
              Cancelar
            </button>
            <button
              type="button"
              id="btn-apply-filters"
              onClick={handleApply}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-900/30 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Aplicar y Activar Filtros
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
