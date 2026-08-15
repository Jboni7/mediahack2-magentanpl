import { CneBulletin, DailyExecutiveDigest, EmailNotificationLog, UserProfile } from '../types';

export const INITIAL_USER_PROFILES: UserProfile[] = [
  {
    id: 'user-pucesi-01',
    name: 'Lcdo. Juan Diego Bonilla',
    email: 'jdbonilla@pucesi.edu.ec',
    mediaOutlet: 'PUCESI Medios Digitales & Prensa Universitaria',
    mediaType: 'Medio Universitario',
    role: 'Editor General de Política y Procesos Electorales',
    createdAt: '2026-08-01T08:00:00Z',
    preferences: {
      selectedProvinces: ['Imbabura', 'Pichincha', 'Carchi'],
      selectedCantons: {
        'Imbabura': ['Ibarra', 'Otavalo', 'Cotacachi', 'Antonio Ante (Atuntaqui)'],
        'Pichincha': ['Quito', 'Cayambe', 'Rumiñahui'],
        'Carchi': ['Tulcán', 'Montúfar (San Gabriel)']
      },
      selectedParties: ['RC5', 'ADN7', 'MC25', 'PSC6', 'MUPP18'],
      selectedElectionTypes: ['presidenciales', 'legislativas_provinciales', 'seccionales', 'consultas_referendum'],
      selectedEntityTypes: ['candidatos', 'partidos', 'resoluciones_cne', 'resultados', 'tribunal_tce'],
      relevanceThreshold: 65,
      keywords: ['impugnación', 'calificación', 'debate', 'escrutinio', 'fraude', 'Junta Provincial Electoral'],
      alertFrequency: 'immediate',
      notificationsPaused: false,
      pausedUntil: null,
      notifyOnZeroUpdates: true,
      emailDestination: 'jdbonilla@pucesi.edu.ec'
    }
  },
  {
    id: 'user-universo-02',
    name: 'Mesa de Redacción Política',
    email: 'politica@eluniverso.com',
    mediaOutlet: 'Diario El Universo',
    mediaType: 'Prensa Escrita',
    role: 'Jefatura de Redacción Nacional',
    createdAt: '2026-08-05T09:30:00Z',
    preferences: {
      selectedProvinces: ['Guayas', 'Pichincha', 'Manabí', 'Azuay'],
      selectedCantons: {
        'Guayas': ['Guayaquil', 'Samborondón', 'Daule', 'Durán'],
        'Pichincha': ['Quito']
      },
      selectedParties: ['RC5', 'ADN7', 'PSC6', 'MC25', 'MUPP18', 'ID12'],
      selectedElectionTypes: ['presidenciales', 'legislativas_nacionales', 'legislativas_provinciales', 'consultas_referendum'],
      selectedEntityTypes: ['candidatos', 'partidos', 'resoluciones_cne', 'resultados', 'gasto_electoral', 'tribunal_tce'],
      relevanceThreshold: 75,
      keywords: ['impugnación', 'gasto electoral', 'fraude', 'escrutinio', 'segunda vuelta', 'TCE'],
      alertFrequency: 'immediate',
      notificationsPaused: false,
      pausedUntil: null,
      notifyOnZeroUpdates: false,
      emailDestination: 'politica@eluniverso.com'
    }
  },
  {
    id: 'user-teleamazonas-03',
    name: 'Galo Delgado',
    email: 'noticias@teleamazonas.com',
    mediaOutlet: 'Teleamazonas Ecuador',
    mediaType: 'Television',
    role: 'Productor Ejecutivo de Noticieros 24 Horas',
    createdAt: '2026-08-08T11:15:00Z',
    preferences: {
      selectedProvinces: ['Pichincha', 'Guayas', 'Azuay', 'Tungurahua', 'Imbabura'],
      selectedCantons: {
        'Pichincha': ['Quito', 'Rumiñahui'],
        'Guayas': ['Guayaquil']
      },
      selectedParties: ['RC5', 'ADN7', 'MC25', 'PSC6', 'MUPP18', 'RETO33'],
      selectedElectionTypes: ['presidenciales', 'legislativas_nacionales', 'cpccs'],
      selectedEntityTypes: ['candidatos', 'resoluciones_cne', 'calendario', 'resultados'],
      relevanceThreshold: 60,
      keywords: ['debate presidencial', 'silencio electoral', 'cadena nacional', 'calificación', 'reconteo'],
      alertFrequency: 'daily_summary',
      notificationsPaused: false,
      pausedUntil: null,
      notifyOnZeroUpdates: true,
      emailDestination: 'noticias@teleamazonas.com'
    }
  },
  {
    id: 'user-radio-ibarra-04',
    name: 'Lorena Imbaquingo',
    email: 'prensa@radioibarra.ec',
    mediaOutlet: 'Radio Ibarra 98.7 FM',
    mediaType: 'Radio',
    role: 'Directora de Noticias Regionales',
    createdAt: '2026-08-10T14:20:00Z',
    preferences: {
      selectedProvinces: ['Imbabura', 'Carchi'],
      selectedCantons: {
        'Imbabura': ['Ibarra', 'Otavalo', 'Cotacachi', 'Antonio Ante (Atuntaqui)', 'Pimampiro', 'San Miguel de Urcuquí'],
        'Carchi': ['Tulcán', 'Montúfar (San Gabriel)', 'Mira']
      },
      selectedParties: ['RC5', 'ADN7', 'MUPP18', 'MC25', 'AVANZA8'],
      selectedElectionTypes: ['legislativas_provinciales', 'seccionales', 'consultas_referendum'],
      selectedEntityTypes: ['candidatos', 'partidos', 'resoluciones_cne', 'resultados'],
      relevanceThreshold: 50,
      keywords: ['Junta Provincial Electoral', 'recinto electoral', 'Otavalo', 'Ibarra', 'padrón', 'comunidades'],
      alertFrequency: 'immediate',
      notificationsPaused: false,
      pausedUntil: null,
      notifyOnZeroUpdates: true,
      emailDestination: 'prensa@radioibarra.ec'
    }
  }
];

export const INITIAL_CNE_BULLETINS: CneBulletin[] = [
  {
    id: 'cne-2026-089',
    title: 'Pleno del CNE resuelve en firme calificación de listas de Asambleístas por Imbabura y Pichincha tras superar etapa de impugnaciones',
    cneCode: 'PLE-CNE-2026-089-R',
    publishedAt: '2026-08-15T09:40:00Z',
    sourceUrl: 'https://cne.gob.ec/resoluciones-pleno/2026/PLE-CNE-2026-089-R.pdf',
    category: 'resolucion_oficial',
    rawText: `El Pleno del Consejo Nacional Electoral (CNE), en sesión ordinaria del 15 de agosto de 2026, con el voto favorable unánime de los cinco consejeros, conoció los informes jurídicos de la Dirección Nacional de Asesoría Jurídica y resolvió calificar en firme las candidaturas para Asambleístas Provinciales correspondientes a las delegaciones provinciales de Imbabura (cantones Ibarra, Otavalo, Cotacachi, Antonio Ante) y Pichincha (circunscripciones urbanas y rurales de Quito y cantones del nororiente). Se desecharon dos recursos de impugnación presentados por alianzas políticas en contra de candidaturas en el cantón Ibarra al no haberse acreditado inhabilidades contempladas en el artículo 96 de la Ley Orgánica Electoral, Código de la Democracia. La presente resolución es de carácter definitivo en sede administrativa.`,
    aiSummary: 'El Pleno del CNE calificó en firme las listas a la Asamblea Nacional por Imbabura y Pichincha, desestimando impugnaciones en el cantón Ibarra al no hallar inhabilidades legales.',
    aiKeyTakeaways: [
      'Listas a la Asamblea por Imbabura (Ibarra, Otavalo, Cotacachi) y Pichincha quedan oficiales en firme.',
      'Se rechazaron 2 impugnaciones por falta de pruebas bajo el Art. 96 del Código de la Democracia.',
      'Votación unánime de los 5 consejeros del CNE.',
      'Candidaturas autorizadas para inicio de impresión de papeletas.'
    ],
    aiUrgencyScore: 92,
    aiRelevanceScore: 95,
    aiCategorization: {
      isOfficialResolution: true,
      isRumorDebunk: false,
      isAdministrativeOnly: false,
      confidence: 0.98
    },
    extractedEntities: {
      provinces: ['Imbabura', 'Pichincha'],
      cantons: ['Ibarra', 'Otavalo', 'Cotacachi', 'Antonio Ante (Atuntaqui)', 'Quito'],
      candidates: ['Candidatos Asambleístas Provinciales Lista 5', 'Candidatos Asambleístas Lista 7', 'Candidatos Lista 25'],
      politicalParties: ['Revolución Ciudadana (RC5)', 'Acción Democrática Nacional (ADN7)', 'Construye (MC25)'],
      legalArticles: ['Art. 96 Ley Orgánica Electoral y de Organizaciones Políticas', 'Art. 101 Código de la Democracia'],
      electionType: 'Asamblea Nacional (Provinciales)'
    },
    authenticity: {
      status: 'official_signed',
      score: 99,
      verifiedDomain: true,
      digitalSignatureFound: true,
      verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      securitySealText: 'Firma Electrónica Autorizada - Secretaría General CNE Quipux #CNE-SG-2026-11894',
      cneIssuerDepartment: 'Secretaría General del Pleno del Consejo Nacional Electoral'
    },
    scannedAt: '2026-08-15T09:42:15Z',
    matchesUserFilters: true,
    filterMatchReasons: [
      'Provincia Imbabura e cantón Ibarra coinciden con perfil',
      'Contiene palabra clave: "impugnación" y "calificación"',
      'Umbral de urgencia (92) supera el mínimo configurado (65)'
    ]
  },
  {
    id: 'cne-2026-088',
    title: 'CNE aclara que cadena de WhatsApp sobre supuesto cambio masivo de recintos electorales en Guayas y Pichincha es FALSA',
    cneCode: 'BOL-CNE-COM-2026-312',
    publishedAt: '2026-08-15T08:15:00Z',
    sourceUrl: 'https://cne.gob.ec/sala-de-prensa/comunicados/2026/BOL-CNE-COM-2026-312.html',
    category: 'desmentido_rumores',
    rawText: `El Consejo Nacional Electoral informa a la ciudadanía, organizaciones políticas y medios de comunicación que circula en redes sociales y mensajería instantánea un mensaje apócrifo que afirma un supuesto cambio de 40 recintos electorales en Guayaquil, Quito y Cuenca por presuntos fallos en el sistema de cómputo. El CNE desmiente categóricamente esta desinformación. El padrón electoral y el catastro de recintos electorales aprobados el 10 de julio se mantienen 100% inalterables y pueden ser consultados únicamente en la app móvil CNE App y el portal oficial cne.gob.ec. Se exhorta a los medios a contrastar con los canales oficiales para evitar alarmas injustificadas.`,
    aiSummary: 'El CNE desmintió una cadena falsa que aseguraba cambios masivos de recintos electorales en Guayas, Pichincha y Azuay, ratificando la vigencia del catastro oficial sin alteraciones.',
    aiKeyTakeaways: [
      'Desmentido oficial de rumor viral sobre recintos electorales en Guayaquil, Quito y Cuenca.',
      'Catastro de recintos y padrón electoral permanecen intactos y auditados.',
      'CNE exhorta a medios y periodistas a verificar con la app oficial y cne.gob.ec.'
    ],
    aiUrgencyScore: 88,
    aiRelevanceScore: 84,
    aiCategorization: {
      isOfficialResolution: false,
      isRumorDebunk: true,
      isAdministrativeOnly: false,
      confidence: 0.99
    },
    extractedEntities: {
      provinces: ['Guayas', 'Pichincha', 'Azuay'],
      cantons: ['Guayaquil', 'Quito', 'Cuenca'],
      candidates: [],
      politicalParties: [],
      legalArticles: ['Art. 218 Constitución del Ecuador', 'Reglamento de Recintos Electorales'],
      electionType: 'Elecciones Presidenciales y Legislativas'
    },
    authenticity: {
      status: 'verified',
      score: 97,
      verifiedDomain: true,
      digitalSignatureFound: true,
      verificationHash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      securitySealText: 'Comunicado Verificado - Dirección Nacional de Comunicación y Relaciones Públicas CNE',
      cneIssuerDepartment: 'Dirección Nacional de Comunicación y Monitoreo de Medios'
    },
    scannedAt: '2026-08-15T08:18:30Z',
    matchesUserFilters: true,
    filterMatchReasons: [
      'Provincia Pichincha coincide con preferencias',
      'Desmentido de rumor electoral crítico / desinformación',
      'Puntaje de relevancia (84) superior al umbral'
    ]
  },
  {
    id: 'cne-2026-087',
    title: 'Aprobación del Reglamento Técnico para el Debate Presidencial Obligatorio 2026: Ejes temáticos, tiempos y sorteo de ubicación',
    cneCode: 'PLE-CNE-2026-085-R',
    publishedAt: '2026-08-14T17:30:00Z',
    sourceUrl: 'https://cne.gob.ec/resoluciones-pleno/2026/PLE-CNE-2026-085-R.pdf',
    category: 'resolucion_oficial',
    rawText: `Mediante Resolución PLE-CNE-2026-085-R, el Pleno aprobó las directrices y manual técnico para el Debate Presidencial Oficial de cara a los próximos comicios. El debate constará de cuatro ejes temáticos: 1) Seguridad, crisis carcelaria y control fronterizo; 2) Economía, empleo y sostenibilidad fiscal; 3) Salud pública, educación y desnutrición infantil; 4) Gobernabilidad, combate a la corrupción y reformas institucionales. Se contará con un comité nacional de debates independiente. El sorteo público del orden de intervención y ubicación en el set de televisión se realizará el 28 de agosto con presencia de un Notario Público y delegados de todas las candidaturas presidenciales calificadas.`,
    aiSummary: 'El CNE aprobó el reglamento técnico del Debate Presidencial 2026 con 4 ejes temáticos (Seguridad, Economía, Salud/Educación, Gobernabilidad) y fijó el sorteo de intervenciones para el 28 de agosto.',
    aiKeyTakeaways: [
      'Reglamento de debate presidencial obligatorio aprobado por el Pleno.',
      '4 ejes temáticos definidos: Seguridad, Economía, Social y Gobernabilidad/Anticorrupción.',
      'Sorteo de orden de intervención: 28 de agosto con transmisión en vivo y veeduría notarial.',
      'Obligatoriedad para todos los binomios presidenciales legalmente inscritos.'
    ],
    aiUrgencyScore: 90,
    aiRelevanceScore: 89,
    aiCategorization: {
      isOfficialResolution: true,
      isRumorDebunk: false,
      isAdministrativeOnly: false,
      confidence: 0.97
    },
    extractedEntities: {
      provinces: ['Pichincha', 'Guayas', 'Azuay', 'Manabí', 'Imbabura', 'El Oro'],
      cantons: ['Quito', 'Guayaquil', 'Cuenca', 'Ibarra'],
      candidates: ['Binomios Presidenciales Calificados'],
      politicalParties: ['ADN 7', 'RC5', 'PSC 6', 'Construye 25', 'Pachakutik 18', 'RETO 33'],
      legalArticles: ['Art. 202.2 Código de la Democracia', 'Reglamento General de Debates Electorales Obligatorios'],
      electionType: 'Elecciones Presidenciales y Vicepresidenciales'
    },
    authenticity: {
      status: 'official_signed',
      score: 99,
      verifiedDomain: true,
      digitalSignatureFound: true,
      verificationHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      securitySealText: 'Certificación Notarial CNE Electrónica - Secretaría General Folio #2026-883',
      cneIssuerDepartment: 'Comité Nacional de Debates & Pleno CNE'
    },
    scannedAt: '2026-08-14T17:35:10Z',
    matchesUserFilters: true,
    filterMatchReasons: [
      'Contiene palabra clave prioritaria: "debate" y "debate presidencial"',
      'Afecta a todo el país y provincias seleccionadas',
      'Relevancia 89 supera umbral'
    ]
  },
  {
    id: 'cne-2026-086',
    title: 'Junta Provincial Electoral de Imbabura notifica cronograma de capacitación para Miembros de las Juntas Receptoras del Voto (MJRV)',
    cneCode: 'DPI-CNE-NOT-2026-104',
    publishedAt: '2026-08-14T14:10:00Z',
    sourceUrl: 'https://imbabura.cne.gob.ec/capacitaciones/2026/cronograma-mjrv.pdf',
    category: 'tramite_administrativo',
    rawText: `La Delegación Provincial Electoral de Imbabura informa que a partir del 20 de agosto se habilitarán 14 puntos fijos de capacitación en los cantones Ibarra, Otavalo, Cotacachi, Antonio Ante, Pimampiro y San Miguel de Urcuquí para los 6.840 ciudadanos designados como Miembros de las Juntas Receptoras del Voto (MJRV). La asistencia es obligatoria de conformidad con el artículo 292 del Código de la Democracia; la inasistencia injustificada acarreará una sanción económica equivalente al 10% de un Salario Básico Unificado ($46,00 USD).`,
    aiSummary: 'La Delegación del CNE en Imbabura abrió 14 centros de capacitación obligatoria para 6.840 miembros de mesas de votación en sus 6 cantones con multas por inasistencia.',
    aiKeyTakeaways: [
      '14 centros de capacitación en Imbabura (Ibarra, Otavalo, Cotacachi, etc.).',
      '6.840 integrantes de Juntas Receptoras del Voto convocados.',
      'Multa del 10% del SBU ($46 USD) para quienes no asistan a capacitarse.'
    ],
    aiUrgencyScore: 58,
    aiRelevanceScore: 78,
    aiCategorization: {
      isOfficialResolution: false,
      isRumorDebunk: false,
      isAdministrativeOnly: true,
      confidence: 0.94
    },
    extractedEntities: {
      provinces: ['Imbabura'],
      cantons: ['Ibarra', 'Otavalo', 'Cotacachi', 'Antonio Ante (Atuntaqui)', 'Pimampiro', 'San Miguel de Urcuquí'],
      candidates: [],
      politicalParties: [],
      legalArticles: ['Art. 292 Código de la Democracia', 'Reglamento para la conformación de MJRV'],
      electionType: 'Elecciones Presidenciales y Legislativas'
    },
    authenticity: {
      status: 'official_signed',
      score: 96,
      verifiedDomain: true,
      digitalSignatureFound: true,
      verificationHash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
      securitySealText: 'Sello Digital Delegación Provincial Electoral de Imbabura',
      cneIssuerDepartment: 'Delegación Provincial Electoral de Imbabura - Dirección de Procesos Electorales'
    },
    scannedAt: '2026-08-14T14:15:02Z',
    matchesUserFilters: true,
    filterMatchReasons: [
      'Provincia Imbabura y cantones Ibarra/Otavalo coinciden exactamente',
      'Información local de servicio público electoral'
    ]
  },
  {
    id: 'cne-2026-085',
    title: 'Tribunal Contencioso Electoral (TCE) ratifica sanción por propaganda anticipada y ordena retiro inmediato de vallas en Guayas y Los Ríos',
    cneCode: 'TCE-ST-2026-042',
    publishedAt: '2026-08-13T16:00:00Z',
    sourceUrl: 'https://tce.gob.ec/sentencias/2026/TCE-ST-2026-042.pdf',
    category: 'impugnacion_reclamacion',
    rawText: `El Pleno del Tribunal Contencioso Electoral (TCE), en ejercicio de sus atribuciones jurisdiccionales, resolvió la causa 042-2026 ratificando la infracción electoral muy grave por campaña anticipada cometida por dirigentes y una organización política en los cantones Guayaquil, Durán y Babahoyo. Se dispone la imposición de una multa de 20 SBU y la orden a los municipios respectivos y a las delegaciones provinciales del CNE para coordinar el desmonte inmediato de 18 vallas publicitarias en un plazo no mayor a 48 horas.`,
    aiSummary: 'El TCE ratificó sanción por campaña electoral anticipada e impuso multa de 20 SBU, ordenando retirar 18 vallas ilegales en Guayas y Los Ríos en 48 horas.',
    aiKeyTakeaways: [
      'Sentencia firme del TCE por infracción electoral muy grave.',
      'Multa económica de 20 Salarios Básicos Unificados impuesta a organización política.',
      'Plazo de 48 horas para desmonte de 18 vallas en Guayaquil, Durán y Babahoyo.'
    ],
    aiUrgencyScore: 85,
    aiRelevanceScore: 62,
    aiCategorization: {
      isOfficialResolution: true,
      isRumorDebunk: false,
      isAdministrativeOnly: false,
      confidence: 0.96
    },
    extractedEntities: {
      provinces: ['Guayas', 'Los Ríos'],
      cantons: ['Guayaquil', 'Durán', 'Babahoyo'],
      candidates: ['Candidatos a la Prefectura y Asamblea'],
      politicalParties: ['Movimiento Político Provincial'],
      legalArticles: ['Art. 278 numeral 4 Código de la Democracia', 'Reglamento de Trámite del TCE'],
      electionType: 'Elecciones Seccionales y Legislativas'
    },
    authenticity: {
      status: 'official_signed',
      score: 98,
      verifiedDomain: true,
      digitalSignatureFound: true,
      verificationHash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
      securitySealText: 'Sentencia Ejecutoriada TCE - Secretaría General Jurisdiccional',
      cneIssuerDepartment: 'Tribunal Contencioso Electoral del Ecuador'
    },
    scannedAt: '2026-08-13T16:04:12Z',
    matchesUserFilters: false,
    filterMatchReasons: [
      'Provincias Guayas/Los Ríos no están en el filtro principal prioritario del usuario Bonilla (Imbabura/Pichincha)',
      'Relevancia 62 es menor al umbral del perfil (65)'
    ]
  },
  {
    id: 'cne-2026-084',
    title: 'Informe Técnico de Ciberseguridad y Auditoría del Sistema de Transmisión de Resultados Electorales Preliminares (SIER / CNE)',
    cneCode: 'INF-DNTIC-CNE-2026-018',
    publishedAt: '2026-08-12T11:00:00Z',
    sourceUrl: 'https://cne.gob.ec/auditorias-tecnicas/2026/INF-DNTIC-CNE-2026-018.pdf',
    category: 'resolucion_oficial',
    rawText: `La Dirección Nacional de Tecnologías de la Información y Comunicación (DNTIC) del CNE presentó el informe favorable de la auditoría técnica internacional de código fuente y pruebas de penetración (pentesting) al sistema SIER. Se contó con la presencia de delegados técnicos de 11 organizaciones políticas nacionales y observadores internacionales de la OEA y Unión Interamericana de Organismos Electorales (UNIORE). El informe certifica la inviolabilidad de los paquetes criptográficos de actas con firma electrónica en las 24 provincias del país.`,
    aiSummary: 'Auditoría técnica internacional de código fuente del sistema de escrutinio SIER del CNE certificó la seguridad criptográfica de actas electorales ante delegados de 11 partidos y la OEA.',
    aiKeyTakeaways: [
      'Auditoría al código fuente del sistema de escrutinio con informe 100% favorable.',
      'Presencia y validación de observadores de la OEA, UNIORE y 11 partidos nacionales.',
      'Criptografía y trazabilidad de actas con firma digital asegurada en las 24 provincias.'
    ],
    aiUrgencyScore: 82,
    aiRelevanceScore: 86,
    aiCategorization: {
      isOfficialResolution: true,
      isRumorDebunk: false,
      isAdministrativeOnly: false,
      confidence: 0.95
    },
    extractedEntities: {
      provinces: ['Pichincha', 'Guayas', 'Azuay', 'Imbabura', 'Manabí', 'El Oro', 'Loja'],
      cantons: ['Quito', 'Guayaquil', 'Cuenca', 'Ibarra', 'Portoviejo'],
      candidates: [],
      politicalParties: ['RC5', 'ADN7', 'PSC6', 'Construye 25', 'Pachakutik 18', 'PSP3', 'ID12'],
      legalArticles: ['Art. 18 Ley Orgánica Electoral', 'Norma ISO/IEC 27001 Seguridad de la Información'],
      electionType: 'Elecciones Presidenciales y Legislativas'
    },
    authenticity: {
      status: 'official_signed',
      score: 100,
      verifiedDomain: true,
      digitalSignatureFound: true,
      verificationHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
      securitySealText: 'Auditoría Certificada CNE / DNTIC - Cripto Hash SHA-256 Validado',
      cneIssuerDepartment: 'Dirección Nacional de Tecnologías de la Información y Comunicación'
    },
    scannedAt: '2026-08-12T11:05:40Z',
    matchesUserFilters: true,
    filterMatchReasons: [
      'Contiene palabra clave: "escrutinio"',
      'Cubre Pichincha e Imbabura',
      'Relevancia 86 supera umbral 65'
    ]
  }
];

export const INITIAL_EMAIL_LOGS: EmailNotificationLog[] = [
  {
    id: 'email-2026-001',
    recipientEmail: 'jdbonilla@pucesi.edu.ec',
    recipientMediaOutlet: 'PUCESI Medios Digitales & Prensa Universitaria',
    bulletinId: 'cne-2026-089',
    bulletinTitle: 'Pleno del CNE resuelve en firme calificación de listas de Asambleístas por Imbabura y Pichincha tras superar etapa de impugnaciones',
    bulletinCode: 'PLE-CNE-2026-089-R',
    sentAt: '2026-08-15T09:42:30Z',
    frequencyType: 'immediate',
    subject: '🔴 ALERTA CNE [Imbabura / Pichincha]: Calificación en firme de Asambleístas e impugnaciones desestimadas en Ibarra',
    previewText: 'El Pleno del CNE calificó en firme las candidaturas a la Asamblea Nacional por Imbabura y desestimó 2 impugnaciones.',
    plainTextContent: `CONSEJO NACIONAL ELECTORAL DEL ECUADOR
ALERTA INMEDIATA PARA MEDIOS DE COMUNICACIÓN

Estimado/a Juan Diego Bonilla (PUCESI Medios Digitales):
La IA del sistema de monitoreo CNE ha detectado una resolución urgente que coincide con sus filtros configurados para Imbabura y Pichincha.

DOCUMENTO: PLE-CNE-2026-089-R
FECHA: 15 de agosto de 2026
RELEVANCIA CALCULADA: 95/100 (Alta prioridad)
PALABRAS CLAVE COINCIDENTES: impugnación, calificación, Ibarra

RESUMEN EJECUTIVO IA:
El Pleno del CNE resolvió por unanimidad calificar en firme las candidaturas para Asambleístas Provinciales en Imbabura (Ibarra, Otavalo, Cotacachi) y Pichincha, desestimando 2 recursos de impugnación al no encontrarse inhabilidades contempladas en el Art. 96 del Código de la Democracia.

PUNTOS CLAVE:
1. Candidaturas oficiales listas para impresión de papeletas.
2. Desestimación formal de impugnaciones en el cantón Ibarra.
3. Decisión definitiva en sede administrativa.

ESTADO DE AUTENTICIDAD:
✓ Fuente verificada: cne.gob.ec
✓ Firma electrónica válida: Quipux #CNE-SG-2026-11894
✓ Hash de integridad: e3b0c442...55

Consulte el documento oficial en: https://cne.gob.ec/resoluciones-pleno/2026/PLE-CNE-2026-089-R.pdf`,
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #0f2d59; color: #ffffff; padding: 18px 24px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #93c5fd; font-weight: bold;">Monitor CNE Ecuador • Alerta Inmediata para Medios</div>
          <h1 style="font-size: 18px; margin: 8px 0 0 0; line-height: 1.3;">Resolución del Pleno: Calificación en Firme de Asambleístas en Imbabura y Pichincha</h1>
        </div>
        <div style="padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
          <div style="background-color: #f1f5f9; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
            <div style="font-size: 12px; color: #64748b;">DESTINATARIO: <strong>PUCESI Medios Digitales</strong> (jdbonilla@pucesi.edu.ec)</div>
            <div style="font-size: 12px; color: #64748b;">CÓDIGO OFICIAL: <strong>PLE-CNE-2026-089-R</strong> | URGENCIA: <span style="color: #dc2626; font-weight: bold;">95/100 (Alta)</span></div>
          </div>
          
          <h3 style="color: #0f172a; font-size: 15px; margin-top: 0;">Resumen Contextual Generado por IA (NLP):</h3>
          <p style="color: #334155; margin-bottom: 16px;">
            El Pleno del Consejo Nacional Electoral calificó en firme las listas a la Asamblea Nacional por Imbabura (cantones Ibarra, Otavalo, Cotacachi, Antonio Ante) y Pichincha, desechando dos recursos de impugnación al no comprobarse inhabilidades legales del Art. 96 del Código de la Democracia.
          </p>

          <h4 style="color: #0f172a; font-size: 13px; text-transform: uppercase; margin-bottom: 8px;">Puntos Clave para Redacción Periodística:</h4>
          <ul style="padding-left: 20px; color: #334155; margin-bottom: 20px;">
            <li><strong>Listas provinciales oficiales:</strong> Quedan listas para la impresión definitiva de papeletas electorales.</li>
            <li><strong>Impugnaciones en Ibarra:</strong> Quedan desestimadas en sede administrativa tras informes de Asesoría Jurídica.</li>
            <li><strong>Jurisdicciones afectadas:</strong> Imbabura y Pichincha.</li>
          </ul>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 6px; margin-bottom: 20px;">
            <div style="font-size: 12px; font-weight: bold; color: #166534; display: flex; align-items: center;">
              🔒 Verificación de Autenticidad Oficial: 99% Confiabilidad
            </div>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">
              Sello Quipux: CNE-SG-2026-11894 | SHA-256: <code>e3b0c44298fc1c14...</code> | Dominio verificado: cne.gob.ec
            </div>
          </div>

          <div style="text-align: center; margin-top: 24px;">
            <a href="https://cne.gob.ec/resoluciones-pleno/2026/PLE-CNE-2026-089-R.pdf" target="_blank" style="background-color: #0284c7; color: #ffffff; padding: 10px 22px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 13px; display: inline-block;">
              Ver Documento Original en cne.gob.ec ↗
            </a>
          </div>
        </div>
        <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px 24px; font-size: 11px; color: #94a3b8; text-align: center;">
          Este correo fue enviado automáticamente por su suscripción de monitoreo electoral. Para pausar o editar filtros, acceda al panel de gestión.
        </div>
      </div>
    `,
    relevanceScore: 95,
    matchedKeywords: ['impugnación', 'calificación', 'Ibarra'],
    matchedProvinces: ['Imbabura', 'Pichincha'],
    status: 'opened',
    sourceUrl: 'https://cne.gob.ec/resoluciones-pleno/2026/PLE-CNE-2026-089-R.pdf',
    authenticityHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'email-2026-002',
    recipientEmail: 'jdbonilla@pucesi.edu.ec',
    recipientMediaOutlet: 'PUCESI Medios Digitales & Prensa Universitaria',
    bulletinId: 'cne-2026-088',
    bulletinTitle: 'CNE aclara que cadena de WhatsApp sobre supuesto cambio masivo de recintos electorales es FALSA',
    bulletinCode: 'BOL-CNE-COM-2026-312',
    sentAt: '2026-08-15T08:19:00Z',
    frequencyType: 'immediate',
    subject: '⚠️ DESMENTIDO OFICIAL CNE: Falsa cadena sobre cambio de recintos electorales',
    previewText: 'El CNE desmiente rumores sobre alteración del catastro de recintos electorales en Quito, Guayaquil y Cuenca.',
    plainTextContent: `CONSEJO NACIONAL ELECTORAL DEL ECUADOR
DESMENTIDO DE RUMOR / FACT-CHECKING OFICIAL

El CNE desmintió formalmente información falsa viralizada en redes sobre presuntos cambios en recintos de votación. El catastro permanece inalterable.
Consulte canales oficiales en: cne.gob.ec`,
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #991b1b; color: #ffffff; padding: 18px 24px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #fecaca; font-weight: bold;">CNE Ecuador • Combate a la Desinformación</div>
          <h1 style="font-size: 18px; margin: 8px 0 0 0; line-height: 1.3;">Desmentido Oficial: Catastro de Recintos Electorales se Mantiene Inalterable</h1>
        </div>
        <div style="padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
          <p>El CNE confirmó que la cadena viral sobre cambio de recintos en Quito y Guayaquil es un rumor sin sustento técnico ni legal.</p>
          <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 12px; margin: 16px 0; font-size: 13px; color: #991b1b;">
            Recomendación editorial: Desmentir en notas de verificación periodística citando el comunicado oficial BOL-CNE-COM-2026-312.
          </div>
        </div>
      </div>
    `,
    relevanceScore: 84,
    matchedKeywords: ['recintos', 'desmentido'],
    matchedProvinces: ['Pichincha', 'Guayas'],
    status: 'delivered',
    sourceUrl: 'https://cne.gob.ec/sala-de-prensa/comunicados/2026/BOL-CNE-COM-2026-312.html',
    authenticityHash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  },
  {
    id: 'email-2026-heartbeat',
    recipientEmail: 'jdbonilla@pucesi.edu.ec',
    recipientMediaOutlet: 'PUCESI Medios Digitales & Prensa Universitaria',
    bulletinId: 'heartbeat-cycle-71',
    bulletinTitle: 'Vigilancia Activa CNE: Ciclo de Rastreo Completado Sin Nuevas Alertas en Imbabura / Carchi',
    bulletinCode: 'MONITOR-HEARTBEAT-71',
    sentAt: '2026-08-15T06:00:00Z',
    frequencyType: 'heartbeat_zero_updates',
    subject: '🟢 CNE Monitor: Vigilancia activa - 0 novedades en su zona en las últimas 4 horas',
    previewText: 'El agente de IA escaneó los portales oficiales del CNE y no encontró resoluciones o cambios en sus filtros.',
    plainTextContent: `CONSEJO NACIONAL ELECTORAL - MONITOR IA
NOTIFICACIÓN DE VIGILANCIA ACTIVA (SIN NOVEDADES)

Estimado Juan Diego Bonilla:
Le confirmamos que el agente de IA realizó el escaneo programado de las publicaciones, resoluciones y boletines del CNE a las 06:00.

ESTADO:
- Fuentes consultadas: cne.gob.ec, gaceta oficial, delegaciones provinciales de Imbabura y Pichincha.
- Novedades en su zona de interés: 0 nuevas publicaciones que superen el umbral de relevancia (65%).
- Próximo escaneo programado: En ejecución continua.

El sistema se mantiene vigilante y le notificará en cuanto surja cualquier actualización relevante.`,
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #065f46; color: #ffffff; padding: 18px 24px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #a7f3d0; font-weight: bold;">Monitor CNE • Vigilancia Activa</div>
          <h1 style="font-size: 18px; margin: 8px 0 0 0; line-height: 1.3;">Sin Novedades Electorales en su Zona de Cobertura</h1>
        </div>
        <div style="padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
          <p>Le confirmamos que el crawler de IA auditó el portal del CNE y no se registraron nuevas resoluciones o boletines que afecten sus filtros en <strong>Imbabura, Carchi o Pichincha</strong>.</p>
          <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 12px; margin: 16px 0; font-size: 13px; color: #065f46;">
            ✓ Sistema operativo • Latencia 180ms • Próximo barrido en progreso
          </div>
        </div>
      </div>
    `,
    relevanceScore: 0,
    matchedKeywords: [],
    matchedProvinces: ['Imbabura', 'Pichincha'],
    status: 'delivered',
    sourceUrl: 'https://cne.gob.ec',
    authenticityHash: 'heartbeat-valid'
  }
];

export const INITIAL_DAILY_DIGEST: DailyExecutiveDigest = {
  id: 'digest-2026-08-15',
  date: '15 de Agosto de 2026',
  generatedAt: '2026-08-15T09:45:00Z',
  headline: 'Resumen Diario CNE: Calificaciones en Firme de Asambleístas, Reglamento Técnico del Debate Presidencial y Desmentido de Rumores sobre Recintos',
  executiveSummary: 'El Consejo Nacional Electoral (CNE) concluyó la fase de impugnaciones ratificando las listas a la Asamblea Nacional para Imbabura y Pichincha. A su vez, aprobó formalmente el manual y los 4 ejes temáticos del Debate Presidencial 2026 e intensificó su campaña contra noticias falsas respecto al catastro de recintos de votación.',
  topKeyDevelopments: [
    {
      title: 'Listas a la Asamblea por Imbabura y Pichincha quedan en firme tras desechar impugnaciones',
      bulletinCode: 'PLE-CNE-2026-089-R',
      province: 'Imbabura / Pichincha',
      category: 'Resolución Oficial',
      takeaway: 'El Pleno rechazó recursos contra candidatos en Ibarra y autorizó la impresión definitiva de papeletas electorales.',
      sourceUrl: 'https://cne.gob.ec/resoluciones-pleno/2026/PLE-CNE-2026-089-R.pdf'
    },
    {
      title: 'Reglamento Técnico del Debate Presidencial define 4 ejes: Seguridad, Economía, Social y Gobernabilidad',
      bulletinCode: 'PLE-CNE-2026-085-R',
      province: 'Nacional',
      category: 'Resolución Oficial',
      takeaway: 'Sorteo notariado de ubicación y orden de intervención fijado para el 28 de agosto con transmisión nacional obligatoria.',
      sourceUrl: 'https://cne.gob.ec/resoluciones-pleno/2026/PLE-CNE-2026-085-R.pdf'
    },
    {
      title: 'Desmentido categórico sobre modificación de recintos en Guayas y Pichincha',
      bulletinCode: 'BOL-CNE-COM-2026-312',
      province: 'Guayas / Pichincha / Azuay',
      category: 'Desmentido de Rumores',
      takeaway: 'El CNE aclaró que el padrón y los recintos aprobados el 10 de julio permanecen 100% inalterables.',
      sourceUrl: 'https://cne.gob.ec/sala-de-prensa/comunicados/2026/BOL-CNE-COM-2026-312.html'
    }
  ],
  provincialBreakdown: [
    {
      province: 'Imbabura',
      count: 2,
      highlights: 'Listas a la Asamblea en firme (Ibarra/Otavalo/Cotacachi). Habilitados 14 centros para capacitar a 6.840 miembros de mesas receptoras del voto.'
    },
    {
      province: 'Pichincha',
      count: 3,
      highlights: 'Calificación de listas urbanas y rurales de Quito. Auditoría técnica de código fuente y ciberseguridad al sistema SIER aprobada.'
    },
    {
      province: 'Guayas',
      count: 2,
      highlights: 'Sentencia del TCE ordena retiro en 48 horas de 18 vallas de campaña anticipada en Guayaquil y Durán. Desmentido de rumores de recintos.'
    }
  ],
  regulatoryChanges: [
    'Art. 96 y 101 del Código de la Democracia aplicados para descartar inhabilidades extemporáneas.',
    'Reglamento de Debates Oficiales establece penalizaciones severas por inasistencia de binomios presidenciales.'
  ],
  rumorsDebunked: [
    'Falso cambio masivo de recintos en Guayaquil y Quito desmentido mediante comunicado oficial BOL-CNE-COM-2026-312.'
  ],
  upcomingDeadlines: [
    '20 de Agosto: Inicio oficial de capacitaciones presenciales a Miembros de Juntas Receptoras del Voto.',
    '28 de Agosto: Sorteo público notariado del orden de intervención en el Debate Presidencial Oficial.'
  ]
};

export const DEFAULT_USER_PROFILE: UserProfile = INITIAL_USER_PROFILES[0];
export const SAMPLE_NEWSROOM_PROFILES: UserProfile[] = INITIAL_USER_PROFILES;

export const INITIAL_CRAWLER_STATS = {
  isScanning: false,
  lastScanTime: '2026-08-15T09:42:15Z',
  nextScheduledScan: '2026-08-15T09:47:15Z',
  totalBulletinsIndexed: 6,
  lastScanDurationMs: 340,
  officialSourceStatus: 'operational' as const,
  aiLatencyAvgMs: 410,
  aiVerificationSuccessRate: 100,
  cneEndpointChecked: 'https://cne.gob.ec/comunicados-oficiales/gaceta',
  itemsProcessedInLastScan: 12,
  itemsMatchedInLastScan: 4
};

