import type { Dict } from './en';

export const es: Dict = {
  meta: {
    title: "Neil's Express Automotive — Taller mecánico en Alhambra, CA",
    description:
      'Taller familiar de reparación de autos y camiones en Alhambra por más de 50 años. Aprobado por AAA, en Garfield Ave. Reserve en línea en minutos.',
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
    badge: 'Aprobado por AAA · Negocio familiar por 50+ años',
    titleA: 'MANEJE TRANQUILO,',
    titleB: 'ALHAMBRA.',
    tagline:
      'Servicio automotriz honesto y experto en Garfield Ave — la misma familia manteniendo al Valle de San Gabriel en marcha por más de cincuenta años.',
    ctaPrimary: 'Reserve su servicio',
    ctaSecondary: 'Ver servicios',
    statYears: 'Años en Alhambra',
    statRating: 'Calificación verificada',
    statDays: 'Días a la semana',
    scroll: 'Deslice',
  },

  marquee: [
    'Taller aprobado por AAA',
    'Certificado por RepairPal',
    'Reseñas verificadas 4.9★',
    'Técnico maestro en el taller',
    'Diagnóstico y reparación de híbridos',
    'Transporte de cortesía',
    'Se habla español',
    '我们说中文',
  ],

  servicesSection: {
    kicker: 'Lo que hacemos',
    title: 'Cada sistema. Un solo taller.',
    intro:
      'Desde un cambio de aceite rápido hasta un diagnóstico completo del motor — autos, SUVs, híbridos y camiones, bien reparados a la primera.',
    estimated: 'aprox. {duration}',
  },

  services: {
    oil: {
      title: 'Aceite y fluidos',
      desc: 'Cambios de aceite rápidos y limpios, con inspección multipunto en cada visita.',
      options: {
        conventional: {
          label: 'Servicio con aceite convencional',
          desc: 'Aceite convencional de calidad y filtro, relleno de fluidos y revisión multipunto.',
        },
        fullSynthetic: {
          label: 'Servicio full sintético',
          desc: 'Aceite sintético premium y filtro para motores modernos e intervalos más largos.',
        },
        valuePackage: {
          label: 'Paquete de mantenimiento (mejor valor)',
          desc: 'Servicio sintético más rotación de llantas, prueba de batería y prueba de manejo.',
        },
      },
    },
    brakes: {
      title: 'Frenos: servicio y reparación',
      desc: 'Balatas, discos, calipers y líquido — frenadas seguras, sin adivinanzas.',
      options: {
        inspection: {
          label: 'Inspección de frenos',
          desc: 'Medición completa de balatas, discos y líneas con reporte por escrito.',
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
    tires: {
      title: 'Llantas y alineación',
      desc: 'Rotación, balanceo, llantas nuevas y alineación de precisión.',
      options: {
        rotationBalance: {
          label: 'Rotación y balanceo',
          desc: 'Empareja el desgaste y suaviza el andar en carretera.',
        },
        newTires: {
          label: 'Llantas nuevas',
          desc: 'Marcas de calidad según su manejo — montadas y balanceadas.',
        },
        alignment: {
          label: 'Alineación',
          desc: 'Alineación computarizada para eliminar jalones y desgaste disparejo.',
        },
      },
    },
    diagnostics: {
      title: 'Diagnóstico de motor',
      desc: 'Luz de “check engine” descifrada con escáneres de nivel de agencia.',
      options: {
        checkEngine: {
          label: 'Luz de check engine',
          desc: 'Escaneo completo de computadora, pruebas puntuales y una respuesta clara.',
        },
        prePurchase: {
          label: 'Inspección pre-compra',
          desc: 'Sepa qué está comprando antes de firmar cualquier cosa.',
        },
        electrical: {
          label: 'Problema de manejo',
          desc: 'Se apaga, titubea, marcha irregular — lo encontramos.',
        },
      },
    },
    ac: {
      title: 'Aire acondicionado y calefacción',
      desc: 'Veranos fríos, inviernos cálidos — climatización bien hecha.',
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
      title: 'Batería y sistema eléctrico',
      desc: 'Pruebas, baterías, marchas, alternadores y fallas eléctricas misteriosas.',
      options: {
        testReplace: {
          label: 'Prueba / reemplazo de batería',
          desc: 'Prueba de carga con impresión; instalamos batería de calidad si hace falta.',
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
    scheduled: {
      title: 'Mantenimiento programado de fábrica',
      desc: 'Servicios de 30/60/90 mil millas que protegen su garantía — sin precios de agencia.',
      options: {
        minor30k: {
          label: 'Servicio menor (tipo 30K)',
          desc: 'Cambio de aceite, rotación, filtros e inspección completa.',
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
    hybrid: {
      title: 'Híbridos y eléctricos',
      desc: 'Diagnóstico de híbridos, baterías de alto voltaje y mantenimiento de rutina.',
      options: {
        healthCheck: {
          label: 'Chequeo de salud del híbrido',
          desc: 'Estado de la batería HV, enfriamiento e inspección del inversor.',
        },
        hvBattery: {
          label: 'Problema de batería HV',
          desc: 'Luces de advertencia o pérdida de autonomía — probada a nivel de módulo.',
        },
        hybridService: {
          label: 'Servicio programado de híbrido',
          desc: 'Mantenimiento adaptado a trenes motrices y frenos híbridos.',
        },
      },
    },
    suspension: {
      title: 'Suspensión y dirección',
      desc: 'Amortiguadores, struts, bujes — recupere ese andar de auto nuevo.',
      options: {
        rideCheck: {
          label: 'Revisión de andar y manejo',
          desc: 'Ruidos, jalones o golpeteos inspeccionados en prueba de manejo y rampa.',
        },
        shocksStruts: {
          label: 'Amortiguadores y struts',
          desc: 'Reemplazos de calidad instalados con revisión de alineación.',
        },
        steering: {
          label: 'Reparación de dirección',
          desc: 'Cremalleras, terminales y fugas de dirección hidráulica, resueltas de verdad.',
        },
      },
    },
    smog: {
      title: 'Preparación y reparación para el smog',
      desc: '¿Reprobó el smog? Encontramos la causa, la reparamos y lo dejamos listo para pasar.',
      options: {
        prep: {
          label: 'Chequeo pre-smog',
          desc: 'Monitores de preparación y puntos problemáticos conocidos, revisados primero.',
        },
        failedRepair: {
          label: 'Reparación por smog reprobado',
          desc: 'Diagnóstico y reparación de la causa exacta del rechazo.',
        },
        readiness: {
          label: 'Ayuda con ciclo de manejo / monitores',
          desc: '¿Monitores “not ready” tras una reparación o cambio de batería? Completamos el ciclo.',
        },
      },
    },
    transmission: {
      title: 'Servicio de transmisión',
      desc: 'Servicios de fluido, diagnóstico, clutch y problemas de cambios.',
      options: {
        fluidService: {
          label: 'Servicio de fluido de transmisión',
          desc: 'Fluido y filtro para mantener los cambios suaves y la transmisión fresca.',
        },
        diagnosis: {
          label: 'Problema de cambios',
          desc: 'Patina, cambios bruscos o códigos — diagnóstico antes de hablar de cifras grandes.',
        },
        clutch: {
          label: 'Servicio de clutch',
          desc: 'Inspección y reemplazo para transmisiones manuales.',
        },
      },
    },
    fleet: {
      title: 'Camiones y flotillas',
      desc: 'Camiones de trabajo y flotillas pequeñas, al día y en la carretera.',
      options: {
        truckRepair: {
          label: 'Reparación de camiones',
          desc: 'Camiones de gasolina y diésel ligero, de frenos a tren motriz.',
        },
        fleetMaintenance: {
          label: 'Mantenimiento de flotilla',
          desc: 'Programas de servicio que minimizan el tiempo fuera de servicio.',
        },
        dot: {
          label: 'Inspección de seguridad (estilo DOT)',
          desc: 'Reporte completo de condición para vehículos de trabajo.',
        },
      },
    },
  },

  process: {
    kicker: 'El método Neil’s',
    title: 'Sin sorpresas. Nunca.',
    intro: 'Cuatro pasos, iguales para cada vehículo que entra — así ha sido por cincuenta años.',
    steps: [
      {
        title: 'Escuchar e inspeccionar',
        desc: 'Primero lo escuchamos a usted; luego ponemos ojos e instrumentos reales sobre el problema.',
      },
      {
        title: 'Presupuesto claro y directo',
        desc: 'Presupuesto detallado por escrito antes de empezar. Usted aprueba cada dólar.',
      },
      {
        title: 'Repararlo bien',
        desc: 'Mano de obra de técnico maestro y piezas de calidad — sin atajos ni ventas forzadas.',
      },
      {
        title: 'Prueba de manejo y respaldo',
        desc: 'Cada reparación se verifica en la calle y está respaldada por nuestra garantía.',
      },
    ],
  },

  why: {
    kicker: 'Por qué Neil’s',
    title: 'El taller en el que sus vecinos ya confían',
    body:
      'Desde principios de los setenta, una misma familia atiende esta esquina de Garfield Avenue — entre crisis de gasolina, carburadores, computadoras e híbridos. Las agencias rotan personal; nosotros recordamos su nombre y el historial de su auto.',
    points: [
      'Taller aprobado por AAA — miembros ahorran 10% en mano de obra y piezas (hasta $75)',
      'Técnico maestro en sitio, diagnóstico de nivel de agencia',
      'Presupuesto detallado por escrito antes de cualquier trabajo',
      'Transporte de cortesía mientras su auto está con nosotros',
      'La mayoría de las reparaciones se terminan el mismo día',
      'Atención en English, español y 中文',
    ],
    statYears: 'Años como negocio familiar',
    statRating: 'Calificación promedio verificada',
    statReviews: 'Reseñas en todas las plataformas',
    statDays: 'Días abiertos por semana',
  },

  testimonials: {
    kicker: 'Lo que se dice',
    title: 'Alhambra siempre regresa',
    note: 'Representativo de reseñas verificadas de clientes en Yelp, CARFAX y SureCritic.',
    items: [
      {
        quote:
          'Encontraron el problema real en lugar de cambiar piezas al azar, me llamaron con un precio claro y esa misma tarde ya estaba manejando.',
        name: 'M. Trujillo',
        detail: 'Honda Accord · Alhambra',
      },
      {
        quote:
          'Como miembro de AAA vine por el descuento, pero me quedo por la honestidad. Me mostraron el disco desgastado antes de tocar nada.',
        name: 'K. Wong',
        detail: 'Lexus RX · Monterey Park',
      },
      {
        quote:
          'Cincuenta años de negocio cobran sentido en cuanto hablas con ellos. Mi familia ya confió tres autos a este taller.',
        name: 'D. Nguyen',
        detail: 'Toyota Camry Hybrid · San Gabriel',
      },
    ],
  },

  visitBand: {
    kicker: 'Venga a vernos',
    title: 'En Garfield, al sur de Valley',
    addressLabel: 'Dirección',
    phoneLabel: 'Teléfono',
    hoursLabel: 'Horario',
    weekdays: 'Lun – Sáb',
    sunday: 'Domingo',
    hoursValue: '8:00 AM – 6:00 PM',
    aaa: 'Miembros de AAA: 10% de descuento en mano de obra y piezas, hasta $75.',
  },

  servicesPage: {
    kicker: 'Servicios',
    title: 'Servicio completo. De verdad.',
    intro:
      'Un solo techo para todo lo que su auto, híbrido o camión de trabajo necesita — mantenimiento, reparación y esos problemas tercos que otros talleres rechazan.',
    groups: {
      maintenance: 'Mantenimiento',
      repair: 'Reparación y diagnóstico',
      tiresBrakes: 'Llantas y frenos',
      climate: 'Clima y eléctrico',
      hybrid: 'Híbridos y EV',
      fleet: 'Camiones y flotillas',
    },
    includes: 'Solicitudes comunes',
    ctaTitle: '¿No sabe qué necesita?',
    ctaBody: 'Descríbanos el síntoma y nosotros nos encargamos — el diagnóstico es lo nuestro.',
  },

  aboutPage: {
    kicker: 'Nuestra historia',
    title: 'Cincuenta años en la misma esquina',
    lead:
      'Neil’s Express Automotive es un taller familiar de servicio completo para autos y camiones que ha servido a Alhambra y al Valle de San Gabriel por más de cinco décadas.',
    story: [
      'El taller abrió sus puertas en South Garfield Avenue a principios de los setenta, cuando los platinos y carburadores dominaban el camino. Las herramientas cambiaron — el apretón de manos no.',
      'Hoy la misma familia atiende el mostrador, respaldada por un técnico maestro y un equipo que diagnostica motores modernos, híbridos y todo lo eléctrico con equipo de nivel de agencia.',
      'Hemos ganado el distintivo Approved Auto Repair de AAA y la certificación RepairPal, pero la credencial que más cuidamos es un récord de 4.9 estrellas con la gente de este vecindario.',
    ],
    valuesTitle: 'Nuestros principios',
    values: [
      {
        title: 'Honestidad primero',
        desc: 'Presupuesto por escrito antes de empezar y una llamada antes de cualquier cambio. Su aprobación, siempre.',
      },
      {
        title: 'Bien a la primera',
        desc: 'Diagnóstico de técnico maestro y piezas de calidad, con prueba de manejo antes de devolver las llaves.',
      },
      {
        title: 'Vecinos, no números',
        desc: 'Tres generaciones de familias de Alhambra han estacionado en estas bahías. Planeamos tres más.',
      },
    ],
    credsTitle: 'Certificados y responsables',
    creds: [
      { title: 'AAA Approved Auto Repair', desc: 'Instalaciones inspeccionadas, estándares verificados, descuentos para miembros.' },
      { title: 'Certificado RepairPal', desc: 'Garantía de precio justo medida contra datos nacionales de reparación.' },
      { title: 'Técnico maestro en sitio', desc: 'Certificación de alto nivel en motor, eléctrico y manejo.' },
      { title: 'Calificación verificada 4.9★', desc: 'Cientos de reseñas en Yelp, CARFAX y SureCritic.' },
    ],
    teamTitle: 'A quién va a conocer',
    team: [
      { role: 'Asesores de servicio', desc: 'Respuestas claras en el mostrador — en English, español o 中文.' },
      { role: 'Técnico maestro', desc: 'Los diagnósticos difíciles terminan aquí: motores, electrónica, híbridos.' },
      { role: 'Técnicos de servicio', desc: 'Frenos, llantas, mantenimiento — con cuidado y a tiempo.' },
      { role: 'Chofer de cortesía', desc: 'Lo lleva a casa o al trabajo mientras nos encargamos del auto.' },
    ],
  },

  visitPage: {
    kicker: 'Visítenos',
    title: 'Fácil de encontrar. Más fácil de tratar.',
    intro:
      'Estamos en South Garfield Avenue, en el centro de Alhambra, a minutos de Valley Boulevard y la autopista 10.',
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
        q: '¿Aceptan descuentos de AAA?',
        a: 'Sí — somos un taller AAA Approved Auto Repair. Los miembros reciben 10% de descuento en mano de obra y piezas, hasta $75 por visita.',
      },
      {
        q: '¿Pueden dar servicio a mi híbrido?',
        a: 'Claro que sí. Atendemos diagnóstico de híbridos, baterías de alto voltaje y mantenimiento de rutina.',
      },
      {
        q: '¿Cómo me muevo mientras tienen mi auto?',
        a: 'Pregunte por el transporte de cortesía al reservar, espere en nuestra sala, o use el buzón de llaves y le llamamos al terminar.',
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
      'Taller familiar de autos y camiones aprobado por AAA en Garfield Avenue — sirviendo a Alhambra y al Valle de San Gabriel por 50+ años.',
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
      'Transporte',
      'Fecha y hora',
      'Revisar y confirmar',
    ],
    selectHint: 'Seleccione una opción para continuar',

    s1Title: '¿Qué necesita su vehículo?',
    s1Sub: 'Elija lo más parecido — podrá agregar detalles en un momento.',

    s2Title: '¿Cómo le ayudamos con su {service}?',
    s2Sub: 'Elija la opción que mejor le quede.',

    s3Title: 'Información adicional',
    s3Sub: '¿Hay algo más que su técnico deba saber?',
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
    s6ModelPh: 'ej. Civic, RAV4, F-150',

    s7Title: 'Mientras trabajamos…',
    s7Sub: '¿Cómo prefiere manejar la entrega?',
    s7Options: {
      wait: {
        label: 'Espero en el taller',
        desc: 'Sala cómoda con Wi-Fi — ideal para servicios de menos de dos horas.',
      },
      dropoff: {
        label: 'Lo dejo y paso después',
        desc: 'Deje el auto con nosotros; le llamamos en cuanto esté listo. Buzón de llaves disponible.',
      },
      shuttle: {
        label: 'Transporte de cortesía, por favor',
        desc: 'Lo llevamos a casa o al trabajo cerca mientras atendemos su auto.',
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
    s8ClosedSunday: 'Cerramos los domingos — elija cualquier otro día.',
    s8SlotNote: 'Máximo {max} vehículos por horario, para que cada auto reciba atención real.',

    s9Title: 'Revisar y confirmar',
    s9Appointment: 'Cita',
    s9Start: 'Hora de inicio',
    s9Duration: 'Duración estimada',
    s9Done: 'Término estimado',
    s9Vehicle: 'Vehículo',
    s9PlateLabel: 'Placas',
    s9Transport: 'Transporte',
    s9Services: 'Servicio',
    s9Contact: 'Contacto',
    s9Notes: 'Notas',
    s9ConfirmTitle: 'Confirmaciones requeridas',
    s9Confirm1: 'Mi vehículo estará en Neil’s Express Automotive antes de las {time} el {date}.',
    s9Confirm2: 'Entiendo que puedo dejar mi vehículo hasta 24 horas antes usando el buzón de llaves.',
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
