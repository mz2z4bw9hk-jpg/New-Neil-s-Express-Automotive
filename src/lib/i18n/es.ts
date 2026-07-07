import type { Dict } from './en';

export const es: Dict = {
  meta: {
    title: 'Castro Auto Repair Service — Taller mecánico en El Monte, CA',
    description:
      'Taller atendido por su dueño en Garvey Ave, El Monte. Cambio de aceite, frenos, escape y catalizadores, A/C, reconstrucción de motores, especialistas en Porsche y Mercedes. Reserve en línea en minutos.',
  },

  nav: {
    home: 'Inicio',
    services: 'Servicios',
    about: 'Nosotros',
    visit: 'Visítenos',
    bookNow: 'Reservar',
    menu: 'Menú',
    close: 'Cerrar',
    language: 'Idioma',
  },

  common: {
    next: 'Siguiente',
    back: 'Atrás',
    cancel: 'Cancelar',
    close: 'Cerrar',
    done: 'Listo',
    optional: 'Opcional',
    required: 'Obligatorio',
    bookService: 'Reservar servicio',
    bookYourService: 'Reserve su servicio',
    callUs: 'Llámenos',
    getDirections: 'Cómo llegar',
    learnMore: 'Ver más',
    seeAllServices: 'Ver todos los servicios',
    openNow: 'Abierto ahora',
    closedNow: 'Cerrado ahora',
    openTodayUntil: 'Abierto hoy hasta las {time}',
    opensAt: 'Abre el {day} a las {time}',
    closed: 'Cerrado',
    walkInsWelcome: 'Reciba servicio sin cita — con cita tiene prioridad',
  },

  hero: {
    badge: 'Atendido por su dueño · 4.9★ · El Monte',
    titleA: 'MANEJE TRANQUILO,',
    titleB: 'EL MONTE.',
    tagline:
      'Servicio automotriz honesto y experto en Garvey Avenue — Juan Castro y su equipo lo arreglan rápido, lo arreglan bien y le dicen el precio de frente.',
    ctaPrimary: 'Reserve su servicio',
    ctaSecondary: 'Ver servicios',
    statRating: 'Calificación verificada',
    statReviews: 'Reseñas de clientes',
    statDays: 'Días a la semana',
    scroll: 'Deslice',
  },

  marquee: [
    '4.9★ · Más de 460 reseñas verificadas',
    'Atendido por su dueño',
    'Especialistas en Porsche y Mercedes',
    'Reconstrucción de motores',
    'Escape y catalizadores',
    'Precios justos, entrega rápida',
    'Se habla español',
    '我们说中文',
  ],

  servicesSection: {
    kicker: 'Lo que hacemos',
    title: 'Cada sistema. Un solo taller.',
    intro:
      'Desde un cambio de aceite rápido hasta una reconstrucción completa de motor — autos de diario, trocas de trabajo y europeos, bien reparados a la primera.',
    estimated: 'aprox. {duration}',
  },

  services: {
    oil: {
      title: 'Cambio de aceite',
      desc: 'Cambios de aceite rápidos y limpios, con revisión general en cada visita.',
      options: {
        conventional: {
          label: 'Servicio con aceite convencional',
          desc: 'Aceite convencional de calidad y filtro, relleno de fluidos, revisión rápida.',
        },
        fullSynthetic: {
          label: 'Servicio full sintético',
          desc: 'Aceite sintético premium y filtro para motores modernos e intervalos más largos.',
        },
        valuePackage: {
          label: 'Aceite + chequeo (mejor valor)',
          desc: 'Servicio sintético más prueba de batería, revisión de frenos y prueba de manejo.',
        },
      },
    },
    brakes: {
      title: 'Servicio de frenos',
      desc: 'Balatas, discos, calipers y líquido — frenadas seguras, sin adivinanzas.',
      options: {
        inspection: {
          label: 'Inspección de frenos',
          desc: 'Medición completa de balatas, discos y líneas, con una respuesta directa.',
        },
        padsRotors: {
          label: 'Balatas y discos',
          desc: 'Reemplazo con piezas de calidad, herrajes y asentado correcto.',
        },
        fluidFlush: {
          label: 'Cambio de líquido de frenos',
          desc: 'Purga hidráulica completa para recuperar un pedal firme y seguro.',
        },
      },
    },
    diagnostics: {
      title: 'Diagnóstico y reparación de motor',
      desc: 'La luz de “check engine” rastreada hasta la causa real — y reparada.',
      options: {
        checkEngine: {
          label: 'Luz de check engine',
          desc: 'Escaneo completo de computadora, pruebas puntuales y una respuesta clara.',
        },
        prePurchase: {
          label: 'Inspección pre-compra',
          desc: 'Sepa qué está comprando antes de firmar cualquier cosa.',
        },
        drivability: {
          label: 'Problema de manejo',
          desc: 'Se apaga, titubea, marcha irregular — lo encontramos.',
        },
      },
    },
    exhaust: {
      title: 'Escape y catalizadores',
      desc: 'Mofles, tubos y catalizadores — silencioso, legal y sin fugas.',
      options: {
        inspection: {
          label: 'Inspección de escape',
          desc: 'Fugas, ruidos y óxido revisados de punta a punta en la rampa.',
        },
        catConverter: {
          label: 'Catalizador',
          desc: 'Diagnóstico y reemplazo con convertidores de calidad y en regla.',
        },
        mufflerPipes: {
          label: 'Mofle y tubería',
          desc: 'Reparación o reemplazo de mofle y tubos, con soldadura limpia.',
        },
      },
    },
    ac: {
      title: 'Aire acondicionado',
      desc: 'Aire frío para los veranos de El Monte — A/C diagnosticado y bien hecho.',
      options: {
        performanceCheck: {
          label: 'Prueba de rendimiento de A/C',
          desc: 'Inspección de temperatura, presión y fugas de todo el sistema.',
        },
        recharge: {
          label: 'Vacío y recarga',
          desc: 'Servicio de refrigerante a especificación de fábrica, incluye sistemas 1234yf.',
        },
        heaterRepair: {
          label: 'Reparación de calefacción',
          desc: 'Radiadores de calefacción, compuertas, motores de ventilador y flujo de anticongelante.',
        },
      },
    },
    battery: {
      title: 'Baterías y sistema eléctrico',
      desc: 'Pruebas, baterías, marchas, alternadores y fallas eléctricas misteriosas.',
      options: {
        testReplace: {
          label: 'Prueba / reemplazo de batería',
          desc: 'Prueba de carga al momento; instalamos batería de calidad si hace falta.',
        },
        starterAlternator: {
          label: 'Marcha / alternador',
          desc: 'Diagnóstico y reemplazo de componentes de arranque y carga.',
        },
        wiring: {
          label: 'Diagnóstico eléctrico',
          desc: 'Cortos, fugas de corriente y luces de advertencia, rastreados como debe ser.',
        },
      },
    },
    euro: {
      title: 'Especialistas europeos',
      desc: 'Servicio para Porsche y Mercedes-Benz sin la factura de la agencia.',
      options: {
        euroService: {
          label: 'Servicio Porsche / Mercedes',
          desc: 'Mantenimiento programado al pie de la letra para marcas alemanas.',
        },
        euroDiagnostics: {
          label: 'Diagnóstico europeo',
          desc: 'Escaneos de nivel de fábrica y planes de reparación honestos.',
        },
        euroBrakes: {
          label: 'Frenos y suspensión europeos',
          desc: 'Piezas de calidad original y trabajo a especificación.',
        },
      },
    },
    rebuild: {
      title: 'Reconstrucción de motores',
      desc: 'De desgastado a como nuevo — reconstrucciones en casa, a precio justo.',
      options: {
        evaluation: {
          label: 'Evaluación del motor',
          desc: 'Compresión, fugas e inspección antes de hablar de cifras grandes.',
        },
        topEnd: {
          label: 'Trabajo de culata',
          desc: 'Juntas de cabeza, válvulas y componentes de distribución.',
        },
        fullRebuild: {
          label: 'Reconstrucción completa',
          desc: 'Desarmado y reconstrucción total con presupuesto claro por escrito.',
        },
      },
    },
    scheduled: {
      title: 'Mantenimiento programado',
      desc: 'Servicios de 30/60/90 mil millas que cuidan su garantía y su auto.',
      options: {
        minor30k: {
          label: 'Servicio menor (tipo 30K)',
          desc: 'Cambio de aceite, filtros e inspección completa.',
        },
        major60k: {
          label: 'Servicio mayor (tipo 60K/90K)',
          desc: 'Fluidos, filtros y bujías según especificación — la lista completa de fábrica.',
        },
        factory: {
          label: 'Según el manual (díganos su intervalo)',
          desc: 'Seguimos el calendario exacto del fabricante para su millaje.',
        },
      },
    },
  },

  process: {
    kicker: 'El método Castro',
    title: 'Sin sorpresas. Nunca.',
    intro: 'Cuatro pasos, iguales para cada auto que entra — así se ganan 460 reseñas de cinco estrellas.',
    steps: [
      {
        title: 'Escuchar e inspeccionar',
        desc: 'Primero lo escuchamos a usted; luego ponemos ojos e instrumentos reales sobre el problema.',
      },
      {
        title: 'Precio claro y directo',
        desc: 'Un precio claro antes de empezar. Usted aprueba cada dólar.',
      },
      {
        title: 'Repararlo bien',
        desc: 'Manos con experiencia y piezas de calidad — sin atajos ni ventas forzadas.',
      },
      {
        title: 'Prueba de manejo y respaldo',
        desc: 'Cada reparación se verifica en la calle antes de devolver las llaves.',
      },
    ],
  },

  why: {
    kicker: 'Por qué Castro',
    title: 'Usted habla con el mecánico, no con un call center',
    body:
      'Este taller lo atiende su dueño: Juan Castro está en el piso, bajo el cofre y en el mostrador. Las reseñas repiten las mismas tres cosas — rápido, justo y bien hecho. Ese es todo el plan de negocio.',
    points: [
      'Atendido por su dueño — quien le cotiza el auto es quien lo repara',
      'Precio claro antes de empezar cualquier trabajo',
      'Entrega rápida — la mayoría de los trabajos salen el mismo día',
      'Servicio especializado en Porsche y Mercedes-Benz',
      'Aceptamos tarjetas · Wi-Fi gratis mientras espera · entrada accesible',
      'Atención en English, español y 中文',
    ],
    statRating: 'Calificación promedio verificada',
    statReviews: 'Reseñas en todas las plataformas',
    statDays: 'Días abiertos por semana',
    statOwner: 'Atendido por su dueño',
  },

  testimonials: {
    kicker: 'Lo que se dice',
    title: 'El Monte siempre regresa',
    note: 'Representativo de reseñas verificadas de clientes en Yelp y Birdeye.',
    items: [
      {
        quote:
          'Rápido y eficiente — encontró el problema, me cotizó un precio muy razonable y lo terminó el mismo día. Exactamente lo que debe ser un mecánico de barrio.',
        name: 'R. Mendoza',
        detail: 'Honda Civic · El Monte',
      },
      {
        quote:
          'Traigo mi Mercedes aquí en lugar de la agencia. El mismo trabajo de calidad, una fracción de la factura, y Juan explica todo antes de tocar el auto.',
        name: 'K. Lam',
        detail: 'Mercedes-Benz C300 · Rosemead',
      },
      {
        quote:
          'Confiable es la palabra. Tres autos en la familia y todos van con Castro. El precio que dice es el precio que paga.',
        name: 'D. Alvarez',
        detail: 'Ford F-150 · South El Monte',
      },
    ],
  },

  visitBand: {
    kicker: 'Venga a vernos',
    title: 'En Garvey Ave, El Monte',
    addressLabel: 'Dirección',
    phoneLabel: 'Teléfono',
    hoursLabel: 'Horario',
    hoursLines: ['Lun y Mié: 8:00 AM – 7:00 PM', 'Mar · Jue · Vie: 8:00 AM – 4:00 PM', 'Sáb – Dom: Cerrado'],
    amenities: 'Aceptamos tarjetas · Wi-Fi gratis · Entrada accesible',
    note:
      'Un taller así no vive de anuncios — vive de vecinos que recomiendan a vecinos. Cuando recoja sus llaves, el nombre del trabajo es el mismo que está en la puerta.',
    noteSign: '— Juan Castro y la familia de Castro Auto',
    humanLine: 'Llame en horario del taller y contesta un mecánico — nunca un menú grabado.',
    copyHint: 'Clic para copiar',
    copied: '¡Copiado!',
    closesIn: 'Abierto ahora · cierra en {t}',
    opensIn: 'Abre en {t}',
    opensOn: 'Abre el {day} a las {time}',
    mapTag: 'Aquí estamos',
    mapHint: 'Toque el mapa para indicaciones paso a paso',
  },

  servicesPage: {
    kicker: 'Servicios',
    title: 'Servicio completo. De verdad.',
    intro:
      'Un solo techo para todo lo que su auto o troca necesita — mantenimiento, reparación, escape, reconstrucción de motores, y los autos alemanes que otros talleres mandan a la agencia.',
    groups: {
      maintenance: 'Mantenimiento',
      repair: 'Reparación y diagnóstico',
      tiresBrakes: 'Frenos y seguridad',
      climate: 'Clima y eléctrico',
      hybrid: 'Especialistas europeos',
      fleet: 'Trocas y flotillas',
    },
    includes: 'Solicitudes comunes',
    ctaTitle: '¿No sabe qué necesita?',
    ctaBody: 'Descríbanos el síntoma y nosotros nos encargamos — el diagnóstico es lo nuestro.',
  },

  aboutPage: {
    kicker: 'Nuestra historia',
    title: 'El dueño es el mecánico',
    lead:
      'Castro Auto Repair Service es un taller atendido por su dueño en Garvey Avenue, El Monte — el tipo de lugar donde quien le cotiza el auto es quien lo repara.',
    story: [
      'En muchos talleres hay un asesor de servicio entre usted y la persona que de verdad trabaja en su auto. Aquí esa distancia no existe: Juan Castro dirige el piso, y su nombre va en cada trabajo que sale del lote.',
      'El trabajo va desde cambios de aceite y frenos hasta sistemas de escape, catalizadores y reconstrucciones completas de motor — además de servicio especializado para Porsche y Mercedes-Benz que le ahorra a los vecinos la factura de la agencia.',
      'El resultado se ve en las reseñas: un récord de 4.9 estrellas construido sobre tres palabras que se repiten una y otra vez — rápido, justo, bien hecho. Esa reputación es la única publicidad que este taller ha necesitado.',
    ],
    valuesTitle: 'Nuestros principios',
    values: [
      {
        title: 'Respuestas directas',
        desc: 'Una cotización clara antes de empezar y una llamada antes de cualquier cambio. Su aprobación, siempre.',
      },
      {
        title: 'Bien a la primera',
        desc: 'Diagnóstico con experiencia y piezas de calidad, con prueba de manejo antes de devolver las llaves.',
      },
      {
        title: 'Vecinos, no números',
        desc: 'El Monte, South El Monte, Rosemead — este taller vive de la recomendación de la gente de aquí.',
      },
    ],
    credsTitle: 'Por qué la gente confía',
    creds: [
      { title: 'Calificación verificada 4.9★', desc: 'Cientos de reseñas en Yelp y Birdeye.' },
      { title: 'El dueño en el piso', desc: 'Juan Castro lo cotiza, lo repara y lo respalda.' },
      { title: 'Especialistas europeos', desc: 'Porsche y Mercedes-Benz sin el sobreprecio de la agencia.' },
      { title: 'Fácil de tratar', desc: 'Tarjetas aceptadas, Wi-Fi gratis mientras espera, entrada accesible.' },
    ],
    teamTitle: 'A quién va a conocer',
    team: [
      { role: 'Juan — Dueño y mecánico principal', desc: 'Los diagnósticos difíciles terminan aquí: motores, eléctrico, autos europeos.' },
      { role: 'Técnicos de servicio', desc: 'Frenos, escape, mantenimiento — con cuidado y a tiempo.' },
      { role: 'Mostrador', desc: 'Respuestas claras en English, español o 中文.' },
      { role: 'Usted', desc: 'En serio — entre, pregunte, y asómese al cofre con nosotros.' },
    ],
  },

  visitPage: {
    kicker: 'Visítenos',
    title: 'Fácil de encontrar. Más fácil de tratar.',
    intro:
      'Estamos en Garvey Avenue, El Monte, justo al este del Río Hondo — a minutos de la 10, la 60 y la 605.',
    mapCta: 'Abrir en Google Maps',
    formTitle: 'Envíenos un mensaje',
    formIntro: 'Preguntas, cotizaciones o algo que prefiera escribir — leemos cada mensaje.',
    fName: 'Su nombre',
    fContact: 'Teléfono o email',
    fMessage: '¿Cómo podemos ayudarle?',
    fSubmit: 'Enviar mensaje',
    formSent: '¡Recibido, gracias! Le responderemos dentro de un día hábil.',
    formNote: '¿Prefiere hablar? Llame al {phone} en horario del taller.',
    faqTitle: 'Respuestas rápidas',
    faqs: [
      {
        q: '¿Necesito cita?',
        a: 'Puede llegar sin cita, pero con reservación su auto sube a la rampa más rápido. Reservar en línea toma unos dos minutos.',
      },
      {
        q: '¿Trabajan autos europeos?',
        a: 'Sí — Porsche y Mercedes-Benz son especialidad de la casa, desde mantenimiento hasta diagnóstico, a una fracción del precio de agencia.',
      },
      {
        q: '¿Cómo cotizan las reparaciones?',
        a: 'Recibe un precio claro antes de empezar cualquier trabajo, y le llamamos antes de cualquier cambio. El precio que decimos es el que paga.',
      },
      {
        q: '¿Puedo esperar mientras trabajan?',
        a: 'Claro — hay Wi-Fi gratis y entrada accesible. Para trabajos grandes, deje el auto y le llamamos en cuanto esté listo.',
      },
    ],
  },

  notFound: {
    title: 'Vuelta equivocada',
    body: 'Esa página no está en nuestro mapa. Regresemos al camino.',
    cta: 'Volver al inicio',
  },

  footer: {
    blurb:
      'Taller atendido por su dueño en Garvey Avenue — sirviendo a El Monte, South El Monte y el Valle de San Gabriel con trabajo rápido, justo y bien hecho.',
    quickLinks: 'Explorar',
    servicesTitle: 'Servicios populares',
    contactTitle: 'Contacto y horario',
    langTitle: 'Idioma',
    rights: 'Todos los derechos reservados.',
    adminLink: 'Acceso del personal',
  },

  wizard: {
    title: 'Reserve su servicio',
    stepLabel: 'Paso {current} de {total}: {name}',
    stepNames: [
      'Servicio',
      'Detalles',
      'Notas adicionales',
      'Teléfono',
      'Sus datos',
      'Vehículo',
      'Entrega',
      'Fecha y hora',
      'Revisar y confirmar',
    ],
    selectHint: 'Seleccione una opción para continuar',

    s1Title: '¿Qué necesita su vehículo?',
    s1Sub: 'Elija lo más parecido — podrá agregar detalles en un momento.',

    s2Title: '¿Cómo le ayudamos con su {service}?',
    s2Sub: 'Elija la opción que mejor le quede.',

    s3Title: 'Información adicional',
    s3Sub: '¿Hay algo más que su mecánico deba saber?',
    s3Selected: 'Su servicio seleccionado:',
    s3Label: 'Comentarios o instrucciones especiales',
    s3Placeholder:
      'Ejemplo: “Rechina al dar vuelta a la izquierda” o “Necesito el auto para el viernes”.',
    s3Chars: '{count} caracteres',
    s3TipsTitle: 'Consejos útiles',
    s3Tips: [
      'Describa ruidos, olores o comportamientos extraños',
      'Mencione cuándo sucede (velocidad, clima, arranque en frío)',
      'Indique reparaciones o mantenimientos recientes',
      'Díganos si tiene fechas límite o urgencias',
    ],

    s4Title: '¿Dónde lo localizamos?',
    s4Sub: 'Solo lo usaremos para confirmar y avisarle sobre su cita.',
    s4Label: 'Número de teléfono',
    s4Help: 'Escriba su número de 10 dígitos',
    s4Privacy:
      'Aviso de privacidad: su número se usa solo para confirmaciones y avisos de servicio. Nunca para spam.',
    s4Error: 'Escriba un número de teléfono válido de 10 dígitos.',

    s5Title: 'Cuéntenos de usted',
    s5Sub: 'Para la confirmación de su cita.',
    s5First: 'Nombre',
    s5Last: 'Apellido',
    s5Email: 'Correo electrónico',
    s5EmailHelp: 'Aquí le enviaremos su confirmación y recordatorios.',
    s5EmailError: 'Ese correo no se ve bien — ¿lo puede revisar?',

    s6Title: '¡Bienvenido, {name}!',
    s6TitleReturning: '¡Qué gusto verlo de nuevo, {name}!',
    s6Sub: '¿En qué vamos a trabajar?',
    s6Year: 'Año',
    s6Make: 'Marca',
    s6Model: 'Modelo',
    s6Plate: 'Placas',
    s6PlateHelp: 'Opcional — nos ayuda a encontrar su historial de servicio.',
    s6YearPh: 'Seleccione un año',
    s6MakePh: 'Seleccione una marca',
    s6ModelPh: 'ej. Civic, C300, F-150',

    s7Title: 'Mientras trabajamos…',
    s7Sub: '¿Cómo prefiere manejar la entrega?',
    s7Options: {
      wait: {
        label: 'Espero en el taller',
        desc: 'Wi-Fi gratis mientras espera — ideal para servicios de menos de dos horas.',
      },
      dropoff: {
        label: 'Lo dejo y paso después',
        desc: 'Deje el auto con nosotros; le llamamos en cuanto esté listo.',
      },
    },

    s8Title: 'Elija su horario',
    s8Sub: 'Escoja el horario que prefiera para su cita.',
    s8DurationTitle: 'Duración estimada del servicio',
    s8DurationBody: 'Su servicio seleccionado normalmente toma {duration}.',
    s8Date: 'Seleccione fecha',
    s8Slots: 'Seleccione horario',
    s8SpotsLeft: '{count} lugares',
    s8Full: 'Lleno',
    s8Closed: 'Ese día estamos cerrados — elija un día entre semana y con gusto lo atendemos.',
    s8SlotNote: 'Máximo {max} vehículos por horario, para que cada auto reciba atención real.',

    s9Title: 'Revisar y confirmar',
    s9Appointment: 'Cita',
    s9Start: 'Hora de inicio',
    s9Duration: 'Duración estimada',
    s9Done: 'Término estimado',
    s9Vehicle: 'Vehículo',
    s9PlateLabel: 'Placas',
    s9Transport: 'Entrega',
    s9Services: 'Servicio',
    s9Contact: 'Contacto',
    s9Notes: 'Notas',
    s9ConfirmTitle: 'Confirmaciones requeridas',
    s9Confirm1: 'Mi vehículo estará en Castro Auto Repair antes de las {time} el {date}.',
    s9Confirm2: 'Entiendo que el taller me llamará para confirmar esta cita antes de que sea definitiva.',
    s9Submit: 'Reservar cita',

    successTitle: '¡Listo, {name}, su cita está reservada!',
    successRef: 'Número de referencia',
    successBody:
      'Llamaremos al {phone} para confirmar su cita. ¿Necesita cambiar algo? Márquenos y mencione su número de referencia.',
    successWhen: 'Su cita',
    successCalendar: 'Agregar al calendario',
    successDone: 'Listo',
  },
};
