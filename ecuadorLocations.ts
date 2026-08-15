import React, { useState } from 'react';
import { UserProfile, AlertFrequency } from '../types';
import { ECUADOR_PROVINCES, POLITICAL_ORGANIZATIONS, ELECTION_TYPES } from '../data/ecuadorLocations';
import { 
  X, 
  User, 
  Mail, 
  Building2, 
  Save, 
  Bell, 
  PauseCircle, 
  CheckCircle, 
  MapPin, 
  Vote, 
  FileCheck, 
  Plus, 
  Trash2,
  Lock,
  Sparkles
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  availableUsers: UserProfile[];
  onUpdateUser: (updated: UserProfile) => void;
  onCreateUser: (newUser: UserProfile) => void;
  onSelectUser: (user: UserProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  availableUsers,
  onUpdateUser,
  onCreateUser,
  onSelectUser
}) => {
  const [formData, setFormData] = useState<UserProfile>(() => ({
    ...currentUser,
    preferences: {
      selectedProvinces: currentUser?.preferences?.selectedProvinces || ['Imbabura', 'Pichincha'],
      selectedCantons: currentUser?.preferences?.selectedCantons || {},
      selectedParties: currentUser?.preferences?.selectedParties || [],
      selectedEntityTypes: currentUser?.preferences?.selectedEntityTypes || [],
      selectedElectionTypes: currentUser?.preferences?.selectedElectionTypes || ['general', 'seccional'],
      relevanceThreshold: currentUser?.preferences?.relevanceThreshold ?? 65,
      keywords: currentUser?.preferences?.keywords || [],
      notificationFrequency: currentUser?.preferences?.notificationFrequency || 'immediate',
      alertFrequency: currentUser?.preferences?.alertFrequency || 'immediate',
      emailFormat: currentUser?.preferences?.emailFormat || 'html',
      autoFactCheckFilter: currentUser?.preferences?.autoFactCheckFilter ?? true,
      filterByJurisdiction: currentUser?.preferences?.filterByJurisdiction ?? true
    }
  }));
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [password, setPassword] = useState('••••••••••••');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'perfil' | 'intereses' | 'notificaciones' | 'cuentas'>('perfil');

  if (!isOpen) return null;

  const userProvs = formData.preferences?.selectedProvinces || [];
  const userParties = formData.preferences?.selectedParties || [];
  const userElectionTypes = formData.preferences?.selectedElectionTypes || [];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreatingNew) {
      const newUser: UserProfile = {
        ...formData,
        id: `user-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      onCreateUser(newUser);
      setIsCreatingNew(false);
    } else {
      onUpdateUser(formData);
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  const toggleProvince = (provinceName: string) => {
    const currentList = formData.preferences?.selectedProvinces || [];
    const isSelected = currentList.includes(provinceName);
    let newList: string[];
    const newCantons = { ...(formData.preferences?.selectedCantons || {}) };

    if (isSelected) {
      newList = currentList.filter(p => p !== provinceName);
      delete newCantons[provinceName];
    } else {
      newList = [...currentList, provinceName];
      const provObj = ECUADOR_PROVINCES.find(p => p.province === provinceName);
      if (provObj && (provObj.cantons || []).length > 0) {
        newCantons[provinceName] = provObj.cantons.slice(0, 3); // Pre-select first 3 cantons
      }
    }

    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        selectedProvinces: newList,
        selectedCantons: newCantons
      }
    });
  };

  const toggleParty = (partyId: string) => {
    const current = formData.preferences?.selectedParties || [];
    const updated = current.includes(partyId)
      ? current.filter(id => id !== partyId)
      : [...current, partyId];

    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        selectedParties: updated
      }
    });
  };

  const toggleElectionType = (typeId: string) => {
    const current = formData.preferences?.selectedElectionTypes || [];
    const updated = current.includes(typeId)
      ? current.filter(id => id !== typeId)
      : [...current, typeId];

    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        selectedElectionTypes: updated
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                {isCreatingNew ? 'Registrar Nuevo Medio / Periodista' : 'Gestión de Perfil e Intereses Electorales'}
              </h2>
              <p className="text-xs text-slate-400">
                {formData.mediaOutlet} • {formData.email}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-slate-950/50 px-5 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'perfil'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Datos del Medio y Usuario
          </button>
          <button
            onClick={() => setActiveTab('intereses')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'intereses'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Vote className="w-3.5 h-3.5" />
            Intereses Electorales (Provincias/Partidos)
          </button>
          <button
            onClick={() => setActiveTab('notificaciones')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'notificaciones'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            Frecuencia & Pausa de Alertas
          </button>
          <button
            onClick={() => setActiveTab('cuentas')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'cuentas'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Cambiar Medio / Cuentas ({availableUsers.length})
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {savedSuccess && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-200 rounded-lg text-xs flex items-center gap-2 animate-in fade-in duration-150">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Perfil y preferencias electorales actualizadas con éxito. Los filtros del agente IA ya están activos.</span>
            </div>
          )}

          {activeTab === 'perfil' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nombre del Periodista / Responsable
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-sky-500"
                    placeholder="Ej. Lcdo. Juan Diego Bonilla"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Correo Electrónico (Para recibir alertas oficiales)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => {
                      setFormData({ 
                        ...formData, 
                        email: e.target.value,
                        preferences: { ...formData.preferences, emailDestination: e.target.value }
                      });
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-sky-500"
                    placeholder="prensa@medio.ec"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Medio de Comunicación / Agencia
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.mediaOutlet}
                    onChange={e => setFormData({ ...formData, mediaOutlet: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-sky-500"
                    placeholder="Ej. PUCESI Medios Digitales"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tipo de Medio
                  </label>
                  <select
                    value={formData.mediaType}
                    onChange={e => setFormData({ ...formData, mediaType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-sky-500"
                  >
                    <option value="Medio Universitario">Medio Universitario / Académico</option>
                    <option value="Medio Digital">Medio Digital / Nativo Web</option>
                    <option value="Prensa Escrita">Prensa Escrita / Diario</option>
                    <option value="Television">Televisión / Noticiero</option>
                    <option value="Radio">Radio / Radiodifusión</option>
                    <option value="Agencia de Noticias">Agencia de Noticias</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Cargo o Rol Periodístico
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-sky-500"
                    placeholder="Ej. Editor de Política y Elecciones"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contraseña Segura de Acceso
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-hidden focus:border-sky-500 pr-8"
                    />
                    <Lock className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-400 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Autenticación y Cifrado:</strong> Su cuenta utiliza credenciales protegidas y cifrado SSL para garantizar que solo personal autorizado de <span className="text-sky-300">{formData.mediaOutlet}</span> reciba despachos de alertas exclusivas y resúmenes confidenciales del CNE.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'intereses' && (
            <div className="space-y-5">
              {/* Provinces selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    Provincias Ecuatorianas de Cobertura Principal
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {userProvs.length} seleccionadas
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {ECUADOR_PROVINCES.map(prov => {
                    const isChecked = userProvs.includes(prov.province);
                    return (
                      <button
                        type="button"
                        key={prov.province}
                        onClick={() => toggleProvince(prov.province)}
                        className={`p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                          isChecked
                            ? 'bg-sky-950/70 border-sky-600 text-sky-200 font-semibold shadow-xs'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="truncate">{prov.province}</span>
                        {isChecked && <CheckCircle className="w-3.5 h-3.5 text-sky-400 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Political parties */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Vote className="w-3.5 h-3.5 text-amber-400" />
                    Organizaciones y Partidos Políticos de Interés
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {userParties.length} seleccionados
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {POLITICAL_ORGANIZATIONS.map(party => {
                    const isChecked = userParties.includes(party.id);
                    return (
                      <button
                        type="button"
                        key={party.id}
                        onClick={() => toggleParty(party.id)}
                        className={`p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                          isChecked
                            ? 'bg-amber-950/40 border-amber-600/70 text-amber-200 font-semibold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="truncate">{party.name}</span>
                        {isChecked && <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Election types */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Tipo de Proceso Electoral a Monitorear
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ELECTION_TYPES.map(etype => {
                    const isChecked = userElectionTypes.includes(etype.id);
                    return (
                      <button
                        type="button"
                        key={etype.id}
                        onClick={() => toggleElectionType(etype.id)}
                        className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                          isChecked
                            ? 'bg-emerald-950/40 border-emerald-600/70 text-emerald-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold text-white">
                          <span>{etype.label}</span>
                          {isChecked && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{etype.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notificaciones' && (
            <div className="space-y-5">
              {/* Alert Frequency */}
              <div>
                <label className="block text-xs font-semibold text-white mb-2">
                  Frecuencia de Notificación por Correo Electrónico
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'immediate', title: 'Inmediata (Tiempo Real)', desc: 'Envío instantáneo al detectar resoluciones o cambios críticos que superen su umbral.' },
                    { id: 'daily_summary', title: 'Resumen Diario Matutino', desc: 'Un solo correo a primera hora con la síntesis ejecutiva y boletines del día anterior.' },
                    { id: 'weekly_digest', title: 'Resumen Semanal', desc: 'Informe analítico consolidado cada lunes con estadísticas y cronograma.' }
                  ].map(item => (
                    <label
                      key={item.id}
                      className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                        formData.preferences.alertFrequency === item.id
                          ? 'bg-sky-950/60 border-sky-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="frequency"
                          checked={formData.preferences.alertFrequency === item.id}
                          onChange={() => setFormData({
                            ...formData,
                            preferences: {
                              ...formData.preferences,
                              alertFrequency: item.id as AlertFrequency
                            }
                          })}
                          className="text-sky-500"
                        />
                        <span className="text-xs font-bold text-slate-200">{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{item.desc}</p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pause notifications */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <PauseCircle className="w-4 h-4 text-amber-400" />
                      Pausar o Suspender Notificaciones Temporalmente
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Si el medio no está en periodo de cobertura electoral activa, puede pausar los correos sin perder su configuración de filtros.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferences.notificationsPaused}
                      onChange={e => setFormData({
                        ...formData,
                        preferences: {
                          ...formData.preferences,
                          notificationsPaused: e.target.checked
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
              </div>

              {/* Heartbeat notification on zero updates */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Notificación de Vigilancia Activa ("Sin Novedades")
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Recibir un correo de tranquilidad informándole que el agente de IA completó el rastreo y no existen nuevas alertas para sus provincias seleccionadas.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferences.notifyOnZeroUpdates}
                      onChange={e => setFormData({
                        ...formData,
                        preferences: {
                          ...formData.preferences,
                          notifyOnZeroUpdates: e.target.checked
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cuentas' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">
                  Medios y Periodistas Registrados en el Sistema
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingNew(true);
                    setFormData({
                      id: '',
                      name: '',
                      email: '',
                      mediaOutlet: '',
                      mediaType: 'Medio Digital',
                      role: 'Periodista Político',
                      createdAt: new Date().toISOString(),
                      preferences: { ...currentUser.preferences }
                    });
                    setActiveTab('perfil');
                  }}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Registrar Nuevo Medio
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableUsers.map(user => {
                  const isCurrent = user.id === currentUser.id;
                  return (
                    <div
                      key={user.id}
                      className={`p-3.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-sky-950/50 border-sky-500 shadow-md'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white truncate">{user.mediaOutlet}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                            {user.mediaType}
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 mt-1">{user.name} ({user.role})</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{user.email}</div>
                        <div className="text-[10px] text-slate-500 mt-2">
                          Provincias: {(user.preferences?.selectedProvinces || []).join(', ')}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                        {isCurrent ? (
                          <span className="text-[11px] text-sky-400 font-bold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Cuenta Activa Actual
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectUser(user);
                              setFormData({ ...user });
                              onClose();
                            }}
                            className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
                          >
                            Seleccionar este Medio →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer Save Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
            >
              Cerrar
            </button>
            <button
              type="submit"
              id="btn-save-profile"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
            >
              <Save className="w-4 h-4" />
              Guardar Preferencias del Medio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
