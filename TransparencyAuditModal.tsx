export interface LocationData {
  province: string;
  region: 'Sierra' | 'Costa' | 'Amazonía' | 'Insular' | 'Exterior';
  cantons: string[];
}

export const ECUADOR_PROVINCES: LocationData[] = [
  {
    province: 'Pichincha',
    region: 'Sierra',
    cantons: ['Quito', 'Rumiñahui', 'Mejía', 'Cayambe', 'Pedro Moncayo', 'Puerto Quito', 'Pedro Vicente Maldonado', 'San Miguel de los Bancos']
  },
  {
    province: 'Guayas',
    region: 'Costa',
    cantons: ['Guayaquil', 'Samborondón', 'Daule', 'Durán', 'Milagro', 'Playas (General Villamil)', 'Salitre', 'Empalme', 'Balao', 'Naranjal', 'Balzar', 'Colimes', 'El Triunfo', 'Marcelino Maridueña', 'Nobol', 'Palestina', 'Pedro Carbo', 'Santa Lucía', 'Simón Bolívar', 'Yaguachi']
  },
  {
    province: 'Azuay',
    region: 'Sierra',
    cantons: ['Cuenca', 'Gualaceo', 'Paute', 'Santa Isabel', 'Chordeleg', 'Girón', 'Nabón', 'Oña', 'Pucará', 'San Fernando', 'Sevilla de Oro', 'Sigsig', 'El Pan', 'Guachapala', 'Camilo Ponce Enríquez']
  },
  {
    province: 'Imbabura',
    region: 'Sierra',
    cantons: ['Ibarra', 'Otavalo', 'Cotacachi', 'Antonio Ante (Atuntaqui)', 'Pimampiro', 'San Miguel de Urcuquí']
  },
  {
    province: 'Manabí',
    region: 'Costa',
    cantons: ['Portoviejo', 'Manta', 'Chone', 'Montecristi', 'Jipijapa', 'Bahía de Caráquez (Sucre)', 'El Carmen', 'Calceta (Bolívar)', 'Flavio Alfaro', 'Jaramijó', 'Pedernales', 'Pichincha', 'Rocafuerte', 'San Vicente', 'Santa Ana', 'Tosagua', '24 de Mayo', 'Olmedo', 'Puerto López', 'Jama', 'Paján', 'Junín']
  },
  {
    province: 'El Oro',
    region: 'Costa',
    cantons: ['Machala', 'Pasaje', 'Santa Rosa', 'Huaquillas', 'Arenillas', 'Zaruma', 'Piñas', 'El Guabo', 'Portovelo', 'Atahualpa', 'Balsas', 'Chilla', 'Marcabelí', 'Las Lajas']
  },
  {
    province: 'Loja',
    region: 'Sierra',
    cantons: ['Loja', 'Catamayo', 'Calvas (Cariamanga)', 'Célica', 'Chaguarpamba', 'Espíndola', 'Gonzanamá', 'Macará', 'Paltas (Catacocha)', 'Puyango', 'Saraguro', 'Sozoranga', 'Zapotillo', 'Pindal', 'Quilanga', 'Olmedo']
  },
  {
    province: 'Tungurahua',
    region: 'Sierra',
    cantons: ['Ambato', 'Baños de Agua Santa', 'Pelileo', 'Píllaro', 'Cevallos', 'Mocha', 'Patate', 'Quero', 'Tisaleo']
  },
  {
    province: 'Chimborazo',
    region: 'Sierra',
    cantons: ['Riobamba', 'Guano', 'Alausi', 'Chambo', 'Colta', 'Cumandá', 'Guamote', 'Pallatanga', 'Penipe']
  },
  {
    province: 'Cotopaxi',
    region: 'Sierra',
    cantons: ['Latacunga', 'La Maná', 'Pujilí', 'Salcedo', 'Saquisilí', 'Sigchos', 'Pangua']
  },
  {
    province: 'Los Ríos',
    region: 'Costa',
    cantons: ['Babahoyo', 'Quevedo', 'Vinces', 'Ventanas', 'Buena Fe', 'Montalvo', 'Mocache', 'Palenque', 'Puebloviejo', 'Urdaneta', 'Valencia', 'Baba', 'Quinsaloma']
  },
  {
    province: 'Santo Domingo de los Tsáchilas',
    region: 'Sierra',
    cantons: ['Santo Domingo', 'La Concordia']
  },
  {
    province: 'Esmeraldas',
    region: 'Costa',
    cantons: ['Esmeraldas', 'Atacames', 'Quinindé', 'San Lorenzo', 'Eloy Alfaro', 'Muisne', 'Rioverde']
  },
  {
    province: 'Santa Elena',
    region: 'Costa',
    cantons: ['Santa Elena', 'La Libertad', 'Salinas']
  },
  {
    province: 'Carchi',
    region: 'Sierra',
    cantons: ['Tulcán', 'Bolívar', 'Espejo', 'Mira', 'Montúfar (San Gabriel)', 'San Pedro de Huaca']
  },
  {
    province: 'Cañar',
    region: 'Sierra',
    cantons: ['Azogues', 'Cañar', 'Biblián', 'La Troncal', 'Deleg', 'El Tambo', 'Suscal']
  },
  {
    province: 'Bolívar',
    region: 'Sierra',
    cantons: ['Guaranda', 'Caluma', 'Chillanes', 'Chimbo', 'Echeandía', 'San Miguel', 'Las Naves']
  },
  {
    province: 'Pastaza',
    region: 'Amazonía',
    cantons: ['Puyo (Pastaza)', 'Mera', 'Santa Clara', 'Arajuno']
  },
  {
    province: 'Morona Santiago',
    region: 'Amazonía',
    cantons: ['Macas (Morona)', 'Gualaquiza', 'Limón Indanza', 'Palora', 'Santiago', 'Sucúa', 'Huamboya', 'San Juan Bosco', 'Taisha', 'Logroño', 'Pablo Sexto', 'Tiwintza']
  },
  {
    province: 'Napo',
    region: 'Amazonía',
    cantons: ['Tena', 'Archidona', 'El Chaco', 'Quijos (Baeza)', 'Carlos Julio Arosemena Tola']
  },
  {
    province: 'Orellana',
    region: 'Amazonía',
    cantons: ['Francisco de Orellana (El Coca)', 'Aguarico', 'La Joya de los Sachas', 'Loreto']
  },
  {
    province: 'Sucumbíos',
    region: 'Amazonía',
    cantons: ['Nueva Loja (Lago Agrio)', 'Cascales', 'Cuyabeno', 'Gonzalo Pizarro', 'Putumayo', 'Shushufindi', 'Sucumbíos']
  },
  {
    province: 'Zamora Chinchipe',
    region: 'Amazonía',
    cantons: ['Zamora', 'Centinela del Cóndor', 'Chinchipe', 'El Pangui', 'Nangaritza', 'Palanda', 'Paquisha', 'Yacuambi', 'Yantzaza']
  },
  {
    province: 'Galápagos',
    region: 'Insular',
    cantons: ['San Cristóbal', 'Santa Cruz', 'Isabela']
  },
  {
    province: 'Circunscripciones del Exterior',
    region: 'Exterior',
    cantons: ['Europa, Asia y Oceanía', 'Estados Unidos y Canadá', 'América Latina, El Caribe y África']
  }
];

export const POLITICAL_ORGANIZATIONS = [
  { id: 'RC5', name: 'Movimiento Revolución Ciudadana (Lista 5)', shortName: 'RC5', color: '#00A3E0' },
  { id: 'ADN7', name: 'Acción Democrática Nacional (Lista 7)', shortName: 'ADN 7', color: '#542E71' },
  { id: 'MC25', name: 'Movimiento Construye (Lista 25)', shortName: 'Construye 25', color: '#FFB81C' },
  { id: 'PSC6', name: 'Partido Social Cristiano (Lista 6)', shortName: 'PSC 6', color: '#FFE500' },
  { id: 'MUPP18', name: 'Movimiento de Unidad Plurinacional Pachakutik (Lista 18)', shortName: 'Pachakutik 18', color: '#00843D' },
  { id: 'PSP3', name: 'Partido Sociedad Patriótica (Lista 3)', shortName: 'PSP 3', color: '#1B365D' },
  { id: 'ID12', name: 'Izquierda Democrática (Lista 12)', shortName: 'ID 12', color: '#E4002B' },
  { id: 'CD1', name: 'Movimiento Centro Democrático (Lista 1)', shortName: 'Centro Democrático 1', color: '#FF8200' },
  { id: 'RETO33', name: 'Movimiento RETO (Lista 33)', shortName: 'RETO 33', color: '#E84A5F' },
  { id: 'AVANZA8', name: 'Partido Avanza (Lista 8)', shortName: 'Avanza 8', color: '#00B0FF' },
  { id: 'SUMA23', name: 'Movimiento SUMA (Lista 23)', shortName: 'SUMA 23', color: '#FA6400' },
  { id: 'PID4', name: 'Pueblo Igualdad Democracia (Lista 4)', shortName: 'PID 4', color: '#3A86FF' }
];

export const ELECTION_TYPES = [
  { id: 'presidenciales', label: 'Elecciones Presidenciales y Vicepresidenciales', description: 'Binomios presidenciales, planes de gobierno y segunda vuelta' },
  { id: 'legislativas_nacionales', label: 'Asamblea Nacional (Nacional y Exterior)', description: 'Asambleístas nacionales y circunscripciones del exterior' },
  { id: 'legislativas_provinciales', label: 'Asamblea Nacional (Provinciales)', description: 'Representación por provincias y distritos electorales' },
  { id: 'seccionales', label: 'Elecciones Seccionales', description: 'Alcaldías, Prefecturas, Concejalías y Juntas Parroquiales' },
  { id: 'consultas_referendum', label: 'Consultas Populares y Referéndum', description: 'Preguntas de consulta ciudadana y reformas constitucionales' },
  { id: 'cpccs', label: 'Consejo de Participación Ciudadana (CPCCS)', description: 'Consejeras y consejeros del CPCCS' }
];

export const ENTITY_TYPES = [
  { id: 'candidatos', label: 'Candidatos y Binomios', icon: 'UserCheck', description: 'Calificaciones, impugnaciones, renuncias y reemplazos' },
  { id: 'partidos', label: 'Partidos Políticos y Alianzas', icon: 'Users', description: 'Inscripción de directivas, personerías jurídicas y alianzas' },
  { id: 'resoluciones_cne', label: 'Resoluciones del Pleno CNE', icon: 'FileText', description: 'Actas del Pleno, reglamentos oficiales y normativas' },
  { id: 'resultados', label: 'Resultados y Escrutinio', icon: 'BarChart2', description: 'Avance de actas con novedad, reconteos y proclamación' },
  { id: 'calendario', label: 'Calendario y Convocatorias', icon: 'Calendar', description: 'Hitos del cronograma electoral, veda y silencio electoral' },
  { id: 'tribunal_tce', label: 'Sentencias y Sanciones TCE', icon: 'Scale', description: 'Apelaciones contenciosas, infracciones y multas' },
  { id: 'gasto_electoral', label: 'Fondo de Promoción y Gasto', icon: 'DollarSign', description: 'Límites de gasto, pauta publicitaria y fiscalización' }
];

export const DEFAULT_KEYWORDS = [
  'fraude',
  'impugnación',
  'calificación',
  'escrutinio',
  'actas con novedad',
  'debate presidencial',
  'silencio electoral',
  'gasto electoral',
  'sanción',
  'segunda vuelta',
  'proclamación de resultados',
  'voto en el exterior'
];
