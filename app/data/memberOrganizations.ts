export type MemberOrganization = {
  slug: string
  name: string
  category: string
  badge: string
  shortDescription: string
  longDescription: string
  logoType: 'image' | 'monogram'
  logoSrc?: string
  monogram?: string
  logoClass: string
  cardGlowClass: string
  role: string
  joinedAt: string
  status: string
  location: string
  members: number
  activeProjects: number
  upcomingEvents: number
  documents: number
  reach: string
  weeklyProgress: number
  strengths: string[]
  metrics: Array<{
    label: string
    value: string
    accentClass: string
    surfaceClass: string
  }>
  initiatives: Array<{
    title: string
    description: string
    status: string
    accentClass: string
  }>
  recentActivity: Array<{
    title: string
    time: string
    accentClass: string
  }>
}

export const memberOrganizations: MemberOrganization[] = [
  {
    slug: 'psicovibes',
    name: 'Psicovibes',
    category: 'Salud mental',
    badge: 'Social',
    shortDescription: 'Procesos de bienestar emocional, escucha activa y liderazgo juvenil comunitario.',
    longDescription:
      'Psicovibes articula talleres, jornadas de autocuidado y espacios de escucha para fortalecer el bienestar emocional de las juventudes en Mosquera.',
    logoType: 'image',
    logoSrc: '/images/organizaciones/psicovibes/Logo_Psicovibes.png',
    logoClass: 'bg-white',
    cardGlowClass: 'from-[#ede3fb] to-[#dff3e6]',
    role: 'Organización principal',
    joinedAt: 'Febrero 2024',
    status: 'Activa y verificada',
    location: 'Mosquera, Cundinamarca',
    members: 84,
    activeProjects: 5,
    upcomingEvents: 3,
    documents: 12,
    reach: '1.2K jóvenes impactados',
    weeklyProgress: 86,
    strengths: [
      'Acompañamiento emocional con enfoque juvenil',
      'Red de voluntariado con presencia territorial',
      'Documentación y reportes al día',
    ],
    metrics: [
      { label: 'Miembros activos', value: '84', accentClass: 'text-[#522178]', surfaceClass: 'bg-[#522178]/10' },
      { label: 'Proyectos activos', value: '5', accentClass: 'text-[#F2780C]', surfaceClass: 'bg-[#F2780C]/10' },
      { label: 'Eventos próximos', value: '3', accentClass: 'text-[#00B140]', surfaceClass: 'bg-[#00B140]/10' },
      { label: 'Documentos', value: '12', accentClass: 'text-indigo-500', surfaceClass: 'bg-indigo-50' },
    ],
    initiatives: [
      {
        title: 'Escucha Joven',
        description: 'Ruta de acompañamiento y primeros auxilios emocionales para estudiantes y colectivos.',
        status: 'En ejecución',
        accentClass: 'bg-[#522178]',
      },
      {
        title: 'Respira Mosquera',
        description: 'Ciclo de talleres de autocuidado, manejo del estrés y prevención del burnout juvenil.',
        status: 'Abierta',
        accentClass: 'bg-[#00B140]',
      },
      {
        title: 'Red de orientadores pares',
        description: 'Formación de líderes juveniles para apoyo entre pares y remisión segura.',
        status: 'Planeación',
        accentClass: 'bg-[#F2780C]',
      },
    ],
    recentActivity: [
      { title: 'Actualizaste el portafolio institucional', time: 'Hace 2 horas', accentClass: 'bg-[#522178]' },
      { title: 'Se confirmó taller con IE Compartir', time: 'Hoy, 10:20 AM', accentClass: 'bg-[#F2780C]' },
      { title: 'Documento de validación aprobado', time: 'Ayer', accentClass: 'bg-[#00B140]' },
    ],
  },
  {
    slug: 'fundacion-ecos-colombia',
    name: 'Fundación Ecos Colombia',
    category: 'Educación ambiental y reciclaje',
    badge: 'Ambiental',
    shortDescription: 'Procesos juveniles de educación ambiental, reciclaje y acciones comunitarias sostenibles.',
    longDescription:
      'Fundación Ecos Colombia impulsa jornadas de reciclaje, campañas pedagógicas y activaciones ambientales para fortalecer el liderazgo juvenil en torno al cuidado del territorio.',
    logoType: 'monogram',
    monogram: 'ECO',
    logoClass: 'bg-gradient-to-br from-[#038C33] to-[#00B140] text-white',
    cardGlowClass: 'from-[#e8f8ee] to-[#f2fbf5]',
    role: 'Aliada activa',
    joinedAt: 'Marzo 2024',
    status: 'Activa',
    location: 'Mosquera, Cundinamarca',
    members: 68,
    activeProjects: 4,
    upcomingEvents: 3,
    documents: 9,
    reach: '14 jornadas verdes activadas',
    weeklyProgress: 82,
    strengths: [
      'Procesos de reciclaje con enfoque juvenil',
      'Articulación con colegios y comunidad',
      'Campañas ambientales con alto alcance local',
    ],
    metrics: [
      { label: 'Miembros activos', value: '68', accentClass: 'text-[#00B140]', surfaceClass: 'bg-[#00B140]/10' },
      { label: 'Proyectos activos', value: '4', accentClass: 'text-[#F2780C]', surfaceClass: 'bg-[#F2780C]/10' },
      { label: 'Eventos próximos', value: '3', accentClass: 'text-[#522178]', surfaceClass: 'bg-[#522178]/10' },
      { label: 'Documentos', value: '9', accentClass: 'text-indigo-500', surfaceClass: 'bg-indigo-50' },
    ],
    initiatives: [
      {
        title: 'Mosquera Recicla',
        description: 'Rutas de separación, jornadas de reciclaje y pedagogía territorial con jóvenes.',
        status: 'En ejecución',
        accentClass: 'bg-[#00B140]',
      },
      {
        title: 'Aulas verdes',
        description: 'Activaciones educativas en colegios para fortalecer hábitos ambientales.',
        status: 'Activa',
        accentClass: 'bg-[#522178]',
      },
      {
        title: 'Huertas urbanas juveniles',
        description: 'Acompañamiento a semilleros y espacios de agricultura urbana en barrios.',
        status: 'Planeación',
        accentClass: 'bg-[#F2780C]',
      },
    ],
    recentActivity: [
      { title: 'Se registró jornada de reciclaje comunitario', time: 'Hace 1 hora', accentClass: 'bg-[#00B140]' },
      { title: 'Nuevo colegio aliado confirmado', time: 'Hoy, 8:45 AM', accentClass: 'bg-[#522178]' },
      { title: 'Inventario de materiales actualizado', time: 'Ayer', accentClass: 'bg-[#F2780C]' },
    ],
  },
  {
    slug: 'chikara',
    name: 'Chikara',
    category: 'Cultura e idioma japonés',
    badge: 'Cultural',
    shortDescription: 'Espacios juveniles de intercambio cultural, formación creativa y circulación artística.',
    longDescription:
      'Chikara reúne juventudes interesadas en cultura japonesa, arte, creación colectiva y experiencias culturales que fortalecen identidad, aprendizaje y comunidad.',
    logoType: 'monogram',
    monogram: 'CH',
    logoClass: 'bg-gradient-to-br from-[#F2780C] to-[#ff8a2a] text-white',
    cardGlowClass: 'from-[#fff1e5] to-[#fff8f2]',
    role: 'Miembro cultural',
    joinedAt: 'Mayo 2024',
    status: 'Activa',
    location: 'Mosquera, Cundinamarca',
    members: 47,
    activeProjects: 4,
    upcomingEvents: 2,
    documents: 7,
    reach: '6 muestras culturales activas',
    weeklyProgress: 79,
    strengths: [
      'Comunidad cultural con identidad clara',
      'Programación de encuentros temáticos',
      'Participación juvenil en experiencias artísticas',
    ],
    metrics: [
      { label: 'Miembros activos', value: '47', accentClass: 'text-[#F2780C]', surfaceClass: 'bg-[#F2780C]/10' },
      { label: 'Proyectos activos', value: '4', accentClass: 'text-[#F2780C]', surfaceClass: 'bg-[#F2780C]/10' },
      { label: 'Eventos próximos', value: '2', accentClass: 'text-[#522178]', surfaceClass: 'bg-[#522178]/10' },
      { label: 'Documentos', value: '7', accentClass: 'text-indigo-500', surfaceClass: 'bg-indigo-50' },
    ],
    initiatives: [
      {
        title: 'Ciclos de cultura japonesa',
        description: 'Encuentros formativos sobre idioma, referentes culturales y expresión juvenil.',
        status: 'Activa',
        accentClass: 'bg-[#F2780C]',
      },
      {
        title: 'Laboratorio creativo',
        description: 'Talleres de dibujo, narrativa visual y producción colaborativa.',
        status: 'En ejecución',
        accentClass: 'bg-[#522178]',
      },
      {
        title: 'Festival asian pop',
        description: 'Evento local para circulación artística, cultura pop y participación joven.',
        status: 'Abierta',
        accentClass: 'bg-[#00B140]',
      },
    ],
    recentActivity: [
      { title: 'Se publicó agenda del laboratorio creativo', time: 'Hace 3 horas', accentClass: 'bg-[#F2780C]' },
      { title: 'Nueva sesión cultural confirmada', time: 'Hoy, 9:10 AM', accentClass: 'bg-[#522178]' },
      { title: 'Galería visual actualizada', time: 'Ayer', accentClass: 'bg-[#00B140]' },
    ],
  },
  {
    slug: 'de-vuelta-a-la-vida',
    name: 'De Vuelta a la Vida',
    category: 'Salud mental y prevención del suicidio',
    badge: 'Fundación',
    shortDescription: 'Acompañamiento, prevención y procesos de cuidado emocional con enfoque comunitario.',
    longDescription:
      'De Vuelta a la Vida impulsa procesos de prevención, escucha, acompañamiento y pedagogía alrededor de la salud mental y el bienestar emocional en jóvenes y familias.',
    logoType: 'monogram',
    monogram: 'DV',
    logoClass: 'bg-gradient-to-br from-[#64278C] to-[#8d40bf] text-white',
    cardGlowClass: 'from-[#efe9ff] to-[#f7f0ff]',
    role: 'Fundación aliada',
    joinedAt: 'Julio 2024',
    status: 'Activa',
    location: 'Mosquera, Cundinamarca',
    members: 73,
    activeProjects: 5,
    upcomingEvents: 4,
    documents: 11,
    reach: '320 familias acompañadas',
    weeklyProgress: 88,
    strengths: [
      'Enfoque sólido en prevención y cuidado',
      'Acompañamiento con sensibilidad comunitaria',
      'Capacidad de articulación con redes de apoyo',
    ],
    metrics: [
      { label: 'Miembros activos', value: '73', accentClass: 'text-[#522178]', surfaceClass: 'bg-[#522178]/10' },
      { label: 'Proyectos activos', value: '5', accentClass: 'text-[#F2780C]', surfaceClass: 'bg-[#F2780C]/10' },
      { label: 'Eventos próximos', value: '4', accentClass: 'text-[#00B140]', surfaceClass: 'bg-[#00B140]/10' },
      { label: 'Documentos', value: '11', accentClass: 'text-indigo-500', surfaceClass: 'bg-indigo-50' },
    ],
    initiatives: [
      {
        title: 'Ruta de escucha protegida',
        description: 'Espacios de acompañamiento y escucha para jóvenes y cuidadores.',
        status: 'En ejecución',
        accentClass: 'bg-[#522178]',
      },
      {
        title: 'Prevención en colegios',
        description: 'Jornadas pedagógicas de salud mental y prevención del suicidio.',
        status: 'Activa',
        accentClass: 'bg-[#00B140]',
      },
      {
        title: 'Red de apoyo familiar',
        description: 'Acompañamiento a familias y articulación con oferta institucional.',
        status: 'Planeación',
        accentClass: 'bg-[#F2780C]',
      },
    ],
    recentActivity: [
      { title: 'Se actualizó la red de apoyo institucional', time: 'Hace 40 min', accentClass: 'bg-[#522178]' },
      { title: 'Nueva jornada preventiva confirmada', time: 'Hoy, 11:00 AM', accentClass: 'bg-[#00B140]' },
      { title: 'Reporte de acompañamiento entregado', time: 'Ayer', accentClass: 'bg-[#F2780C]' },
    ],
  },
]

export const getMemberOrganizationBySlug = (slug: string) =>
  memberOrganizations.find((organization) => organization.slug === slug)
