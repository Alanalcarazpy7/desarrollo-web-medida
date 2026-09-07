/**
 * Contenido ampliado de las fichas de proyecto.
 *
 * Va aparte de projects-data.ts para que sumar un caso sea escribir texto y
 * nada más, sin tocar la estructura de datos del portfolio.
 *
 * ================== REGLAS DE CONTENIDO ==================
 *
 * 1. `kind` dice qué es cada proyecto y se muestra en la ficha:
 *      "client" -> se construyó para un cliente y está en uso
 *      "pitch"  -> se construyó para un negocio real concreto, como propuesta.
 *                  El negocio no avanzó (dejó de responder o nunca respondió),
 *                  así que el trabajo quedó disponible como demo navegable
 *      "demo"   -> proyecto propio, hecho para mostrar cómo se resuelve ese
 *                  caso en ese rubro
 *    NO se presenta como cliente algo que no lo es. Un prospecto que pregunta
 *    "¿y a quién se lo hiciste?" y descubre que no hay nadie detrás, se va y no
 *    vuelve. La etiqueta cuesta nada y el trabajo vende igual: lo que convence
 *    es que el problema esté bien resuelto.
 *
 * 2. `situation` describe el PROBLEMA DEL NEGOCIO que el proyecto resuelve.
 *    Eso es cierto tanto en un trabajo para cliente como en un demo, y es lo
 *    que hace que alguien del rubro se sienta identificado.
 *
 * 3. `approach` cuenta qué se construyó, en lenguaje de cliente: nada de
 *    nombres de lenguajes, frameworks ni jerga técnica.
 *
 * 4. `result` es OPCIONAL y va ÚNICAMENTE con datos que un cliente real
 *    confirmó ("ahora recibo el doble de consultas"). Si no hay dato
 *    confirmado se deja sin definir y la sección no aparece. NO se inventan
 *    métricas: una cifra falsa en un caso de éxito es lo más caro que se
 *    puede publicar.
 */

export interface ProjectCase {
    /** En uso por un cliente, propuesta a un negocio real, o proyecto propio. */
    kind: "client" | "pitch" | "demo";
    /** Qué problema del negocio resuelve. */
    situation: { es: string; en: string };
    /** Qué se construyó, en lenguaje llano. */
    approach: { es: string[]; en: string[] };
    /** Solo con datos confirmados por el cliente. Sin esto, no se renderiza. */
    result?: { es: string; en: string };
}

export const projectCases: Record<string, ProjectCase> = {
    /* ===================== TRABAJOS PARA CLIENTES ===================== */

    "academia-gps": {
        kind: "client",
        situation: {
            es: "Academia GPS vende formación online para profesionales de la salud que quieren dirigir su propia clínica. El programa se explicaba por mensajes y llamadas, así que cada interesado llegaba con las mismas dudas: qué incluye, cuánto dura, cuánto cuesta y cómo se paga. Hacía falta un solo lugar que respondiera todo eso y dejara a la persona lista para inscribirse.",
            en: "Academia GPS sells online training for healthcare professionals who want to run their own clinic. The programme was explained through messages and calls, so every prospect arrived with the same doubts: what it includes, how long it lasts, what it costs and how to pay. They needed one place that answered all of it and left the person ready to enrol.",
        },
        approach: {
            es: [
                "Una sola página larga, ordenada como una conversación de venta: primero a quién le sirve, después qué aprende, después el precio y recién al final el botón de pago.",
                "Las objeciones más frecuentes contestadas de antemano, para que la persona no tenga que preguntar por privado.",
                "Video de presentación de la fundadora, que es lo que más confianza genera en una formación.",
                "Botón de pago directo por Pagopar y botón de WhatsApp para quien todavía prefiere hablar antes de decidir.",
                "Pensada primero para el celular, que es desde donde llega casi todo el tráfico de redes.",
            ],
            en: [
                "A single long page, structured like a sales conversation: who it is for, then what you learn, then the price, and only at the end the payment button.",
                "The most common objections answered up front, so people do not have to ask in private messages.",
                "An introduction video from the founder, which is what builds the most trust in a training programme.",
                "A direct Pagopar payment button and a WhatsApp button for those who still prefer to talk first.",
                "Built mobile first, since almost all the traffic arrives from social media.",
            ],
        },
    },

    "morinigo-y-asociados": {
        kind: "client",
        situation: {
            es: "Morinigo & Asociados es un estudio de auditores y consultores que trabaja con empresas y contribuyentes. En ese rubro la decisión se toma por confianza: el cliente potencial busca el nombre del estudio antes de llamar, y lo que encuentra tiene que transmitir trayectoria y seriedad. No tener sitio propio jugaba en contra frente a estudios más chicos pero mejor presentados.",
            en: "Morinigo & Asociados is a firm of auditors and consultants working with companies and taxpayers. In this field the decision is made on trust: a prospective client searches for the firm's name before calling, and what they find has to convey track record and seriousness. Not having their own site worked against them versus smaller but better presented firms.",
        },
        approach: {
            es: [
                "Sitio institucional con una página por área: contabilidad, tributación, auditoría, consultoría y asesoramiento legal.",
                "Cada servicio explicado en sus propias palabras, sin copiar textos genéricos que se ven en cualquier estudio.",
                "Sección de trayectoria, que en este rubro es el argumento de venta más fuerte.",
                "Formulario de contacto y solicitud de asesoramiento, para que la consulta llegue ordenada y no como un mensaje suelto.",
                "Diseño sobrio y adaptado al celular, con la información de contacto siempre a mano.",
            ],
            en: [
                "An institutional site with a page per area: accounting, tax, audit, consulting and legal advice.",
                "Each service explained in their own words, not generic copy you see on any firm's site.",
                "A track record section, which in this field is the strongest selling point.",
                "A contact and advisory request form, so enquiries arrive organised instead of as loose messages.",
                "A restrained, mobile-friendly design with contact details always within reach.",
            ],
        },
    },

    "gestion-de-residencias": {
        kind: "client",
        situation: {
            es: "Gestión de Residencias acompaña a extranjeros que quieren tramitar su residencia y su cédula en Paraguay. Es un trámite que la gente investiga con dudas y desde afuera del país, muchas veces en otro idioma y sin saber en quién confiar. La web tenía que explicar el proceso completo y despejar el miedo de mandar documentos a alguien que no se conoce.",
            en: "Gestión de Residencias helps foreigners apply for residency and an ID card in Paraguay. It is a process people research full of doubts and from outside the country, often in another language and without knowing who to trust. The site had to explain the whole process and remove the fear of sending documents to someone you have never met.",
        },
        approach: {
            es: [
                "El trámite explicado paso a paso, con qué hace el cliente y qué hace la gestoría en cada etapa.",
                "Mensaje del fundador en video, para poner una cara detrás del servicio.",
                "Evaluación gratuita del caso como primer paso, que baja mucho la barrera para escribir.",
                "Secciones separadas para residencia y para cédula, porque son consultas distintas.",
                "Botón de contacto siempre visible y sitio preparado para visitas desde el exterior.",
            ],
            en: [
                "The process explained step by step, showing what the client does and what the agency does at each stage.",
                "A video message from the founder, to put a face behind the service.",
                "A free case assessment as the first step, which greatly lowers the barrier to reaching out.",
                "Separate sections for residency and for the ID card, because they are different enquiries.",
                "An always-visible contact button and a site prepared for visitors from abroad.",
            ],
        },
    },

    /* ===================== PROYECTOS PROPIOS (DEMOS) ===================== */

    modashoppy: {
        kind: "pitch",
        situation: {
            es: "Una tienda de ropa que vende por Instagram llega a un techo: las publicaciones se pierden, hay que contestar talles y precios uno por uno, y no queda registro de qué se vendió ni de cuánto stock queda. Este proyecto muestra cómo se ve una tienda online de indumentaria que resuelve las tres cosas a la vez.",
            en: "A clothing shop selling through Instagram hits a ceiling: posts get buried, sizes and prices are answered one by one, and there is no record of what sold or how much stock is left. This project shows how an online clothing store solves all three at once.",
        },
        approach: {
            es: [
                "Catálogo por categorías con fotos grandes, talles y precios visibles sin tener que preguntar.",
                "Carrito de compras real: la persona arma su pedido completo antes de contactarte.",
                "Control de stock, para que no se venda algo que ya no está.",
                "Buscador y filtros, porque una tienda de ropa crece rápido en cantidad de productos.",
                "Pensada para el celular, que es donde se compra ropa por impulso.",
            ],
            en: [
                "A category catalog with large photos, sizes and prices visible without having to ask.",
                "A real shopping cart: the person builds the full order before contacting you.",
                "Stock control, so nothing sells that is no longer available.",
                "Search and filters, because a clothing store grows fast in product count.",
                "Built for mobile, where clothes get bought on impulse.",
            ],
        },
    },

    stockpro: {
        kind: "demo",
        situation: {
            es: "Muchos negocios llevan el stock en un cuaderno o en una planilla que solo entiende una persona. El problema aparece cuando esa persona no está, cuando dos sucursales manejan números distintos, o cuando hay que saber rápido qué falta reponer. Este sistema muestra cómo se ordena todo eso en una sola pantalla.",
            en: "Many businesses track stock in a notebook or a spreadsheet only one person understands. Trouble starts when that person is away, when two branches hold different numbers, or when you need to know quickly what to restock. This system shows how to bring all of that into one screen.",
        },
        approach: {
            es: [
                "Panel de control con lo importante arriba: qué se está por acabar y qué se movió hoy.",
                "Alta y baja de productos con su categoría, precio y cantidad mínima de alerta.",
                "Movimientos de entrada y salida, con quién los hizo y cuándo.",
                "Reportes para saber qué rota rápido y qué está parado ocupando plata.",
                "Acceso por usuario, para que cada persona vea solo lo que le corresponde.",
            ],
            en: [
                "A dashboard with what matters on top: what is running out and what moved today.",
                "Adding and removing products with category, price and minimum alert quantity.",
                "Stock in and out movements, with who made them and when.",
                "Reports to see what turns over fast and what is sitting still tying up money.",
                "Per-user access, so each person sees only what concerns them.",
            ],
        },
    },

    "global-exchange": {
        kind: "demo",
        situation: {
            es: "Una casa de cambios maneja varias monedas, cotizaciones que se mueven en el día y una ganancia que hay que calcular operación por operación. Llevar eso a mano es lento y se presta a errores caros. Este sistema muestra cómo funciona una operativa de cambio ordenada, con control de quién hizo cada movimiento.",
            en: "A currency exchange handles several currencies, rates that move during the day and a margin that must be calculated operation by operation. Doing that by hand is slow and prone to expensive mistakes. This system shows how an organised exchange operation works, with control over who made each movement.",
        },
        approach: {
            es: [
                "Carga de compra y venta por moneda, con la cotización del momento.",
                "Cálculo automático de la ganancia de cada operación y del total del día.",
                "Historial completo: qué se operó, a qué precio y quién lo cargó.",
                "Reportes por período, para cerrar caja sin rehacer cuentas.",
                "Usuarios con distintos permisos, separando a quien opera de quien supervisa.",
            ],
            en: [
                "Buy and sell entries per currency, with the rate at that moment.",
                "Automatic margin calculation per operation and for the day as a whole.",
                "A full history: what was traded, at what price and who entered it.",
                "Reports by period, to close the till without redoing the maths.",
                "Users with different permissions, separating who operates from who supervises.",
            ],
        },
    },

    "gestion-inmobiliaria": {
        kind: "demo",
        situation: {
            es: "Quien busca casa o departamento compara mucho antes de llamar. Si las propiedades están sueltas en publicaciones de redes, sin filtrar por zona, precio o cantidad de dormitorios, la persona se cansa y se va a otro lado. Este proyecto muestra cómo presentar un catálogo de propiedades para que encontrar sea fácil.",
            en: "Someone looking for a house or apartment compares a lot before calling. If properties are scattered across social posts, with no way to filter by area, price or number of bedrooms, people get tired and go elsewhere. This project shows how to present a property catalog that is easy to search.",
        },
        approach: {
            es: [
                "Filtros por lo que la gente realmente busca: zona, precio, dormitorios y tipo de operación.",
                "Ficha por propiedad con galería de fotos, características y ubicación.",
                "Separación clara entre alquiler y venta, que son búsquedas distintas.",
                "Contacto directo desde cada propiedad, para que la consulta llegue sabiendo cuál es.",
                "Navegación cómoda en el celular, que es donde se buscan propiedades a cualquier hora.",
            ],
            en: [
                "Filters for what people actually search: area, price, bedrooms and operation type.",
                "A page per property with photo gallery, features and location.",
                "A clear split between rentals and sales, which are different searches.",
                "Direct contact from each property, so the enquiry arrives knowing which one it is.",
                "Comfortable mobile browsing, since properties get searched at any hour.",
            ],
        },
    },

    "amsterdam-bar": {
        kind: "demo",
        situation: {
            es: "Un resto-bar cambia la carta seguido y cada cambio de precio significa reimprimir. Además, quien busca dónde ir a comer quiere ver el menú antes de decidir, y si no lo encuentra elige otro lugar. Este proyecto muestra un menú digital que se actualiza solo y una presencia que da ganas de ir.",
            en: "A resto-bar changes its menu often and every price change means reprinting. On top of that, people deciding where to eat want to see the menu first, and if they cannot find it they pick somewhere else. This project shows a digital menu that updates itself and a presence that makes people want to go.",
        },
        approach: {
            es: [
                "Menú digital por categorías, que se lee de corrido en el celular sin hacer zoom.",
                "Precios actualizables sin reimprimir nada y sin depender de nadie.",
                "Fotos solo en los platos que conviene vender más, porque una foto floja vende menos que ninguna.",
                "Ambientación e información práctica: horarios, ubicación y cómo llegar.",
                "Pensado para abrir rápido con datos móviles, no con el wifi del local.",
            ],
            en: [
                "A digital menu by category, readable top to bottom on a phone with no zooming.",
                "Prices you can update without reprinting anything and without depending on anyone.",
                "Photos only on the dishes worth pushing, because a weak photo sells less than none.",
                "Atmosphere and practical info: hours, location and how to get there.",
                "Built to open fast on mobile data, not on the venue wifi.",
            ],
        },
    },

    "electro-master": {
        kind: "demo",
        situation: {
            es: "Vender electrónica online es competir contra precios visibles en todos lados. El que gana no es siempre el más barato, sino el que da confianza: fichas claras, stock real y una forma simple de preguntar antes de comprar. Este proyecto muestra una tienda de tecnología armada con esa lógica.",
            en: "Selling electronics online means competing against prices visible everywhere. The winner is not always the cheapest, but the one that inspires trust: clear product pages, real stock and a simple way to ask before buying. This project shows a tech store built with that logic.",
        },
        approach: {
            es: [
                "Fichas de producto con lo que realmente decide la compra: qué incluye, garantía y disponibilidad.",
                "Categorías y buscador, porque en electrónica la gente llega buscando algo puntual.",
                "Destacados y ofertas en un lugar fijo, para empujar lo que más margen deja.",
                "Consulta rápida por producto, para las dudas técnicas que frenan la compra.",
                "Carga rápida incluso con muchas imágenes, que es donde se cae la mayoría de las tiendas.",
            ],
            en: [
                "Product pages with what actually decides the purchase: what is included, warranty and availability.",
                "Categories and search, because in electronics people arrive looking for something specific.",
                "Featured items and deals in a fixed spot, to push what leaves the best margin.",
                "Quick per-product enquiry, for the technical doubts that stall a purchase.",
                "Fast loading even with many images, which is where most stores fall apart.",
            ],
        },
    },

    "foodluck-resto": {
        kind: "demo",
        situation: {
            es: "Un restaurante que quiere llenar mesas necesita dos cosas de su web: que dé hambre y que reservar sea fácil. La mayoría falla en lo segundo, y termina coordinando reservas por mensajes sueltos que se pierden. Este proyecto muestra una landing gastronómica pensada para que la reserva se concrete.",
            en: "A restaurant that wants to fill tables needs two things from its site: it has to make you hungry, and booking has to be easy. Most fail at the second and end up handling bookings through scattered messages that get lost. This project shows a restaurant landing built so the booking actually happens.",
        },
        approach: {
            es: [
                "Apertura con fotos grandes de los platos, que es lo que decide en gastronomía.",
                "Reserva directa desde la página, sin obligar a llamar por teléfono.",
                "Menú visible sin descargar nada ni salir del sitio.",
                "Horarios, ubicación y si hay dónde estacionar, que define más visitas de lo que se cree.",
                "Todo en una sola página, para que no haya que buscar nada.",
            ],
            en: [
                "Opening with large dish photos, which is what decides it in food.",
                "Direct booking from the page, without forcing a phone call.",
                "The menu visible without downloading anything or leaving the site.",
                "Hours, location and whether there is parking, which decides more visits than people think.",
                "All on a single page, so nothing has to be hunted for.",
            ],
        },
    },

    vasospy: {
        kind: "pitch",
        situation: {
            es: "Vender productos personalizados por WhatsApp significa mandar la misma foto veinte veces por día y explicar precios por cantidad una y otra vez. Este proyecto muestra un catálogo que hace ese trabajo solo: la persona mira todo, elige, y recién ahí escribe con el pedido ya armado.",
            en: "Selling personalised products over WhatsApp means sending the same photo twenty times a day and explaining bulk pricing over and over. This project shows a catalog that does that work for you: people browse, choose, and only then message with the order already put together.",
        },
        approach: {
            es: [
                "Catálogo con fotos reales por categoría y precios a la vista.",
                "Botón de pedido que arma el mensaje de WhatsApp con lo que la persona eligió.",
                "Sin comisión por venta: todo el margen queda en el negocio, a diferencia de las apps.",
                "Productos que se pueden sumar o sacar sin llamar a nadie.",
                "Enlace único para poner en la bio de Instagram y en los estados.",
            ],
            en: [
                "A catalog with real photos by category and prices in plain sight.",
                "An order button that builds the WhatsApp message from what the person picked.",
                "No per-sale commission: the whole margin stays in the business, unlike the apps.",
                "Products you can add or remove without calling anyone.",
                "One link to put in the Instagram bio and in stories.",
            ],
        },
    },

    "bar-san-roque": {
        kind: "pitch",
        situation: {
            es: "Un bar con historia tiene un activo que la competencia nueva no puede copiar: los años. Pero si esa historia no está contada en ningún lado, es como si no existiera. Este proyecto muestra cómo combinar la parte emocional con lo práctico: menú actualizado y reserva.",
            en: "A bar with history has an asset newer competitors cannot copy: the years. But if that story is not told anywhere, it may as well not exist. This project shows how to combine the emotional side with the practical: an up-to-date menu and booking.",
        },
        approach: {
            es: [
                "Sección de historia del lugar, que es lo que lo hace distinto de un bar nuevo.",
                "Menú digital interactivo, actualizable sin reimprimir.",
                "Reserva de mesa desde la misma página.",
                "Galería del ambiente, para que se entienda qué tipo de noche se va a pasar.",
                "Diseño elegante pero liviano, que abre rápido desde el celular.",
            ],
            en: [
                "A history section, which is what sets it apart from a new bar.",
                "An interactive digital menu, updatable without reprinting.",
                "Table booking from the same page.",
                "A gallery of the space, so people understand what kind of night to expect.",
                "An elegant but light design that opens fast on a phone.",
            ],
        },
    },

    "barberia-master-barber": {
        kind: "pitch",
        situation: {
            es: "En una barbería el cuello de botella no es que falte gente interesada: es la coordinación. Mensajes a la medianoche que se contestan al otro día, turnos anotados en un cuaderno y clientes que no vienen y no avisan. Este proyecto muestra una web que toma los turnos sola.",
            en: "In a barbershop the bottleneck is not a lack of interested people: it is coordination. Midnight messages answered the next day, appointments in a notebook, and no-shows. This project shows a site that takes bookings on its own.",
        },
        approach: {
            es: [
                "Lista de servicios con precio y duración, que es lo primero que busca alguien nuevo.",
                "Agendamiento de turnos, para que se pueda reservar a cualquier hora sin escribir.",
                "Perfil del equipo, porque en barbería mucha gente elige barbero, no local.",
                "Galería de cortes propios, la prueba más fuerte que existe en este rubro.",
                "Ubicación con referencia y todo pensado para el celular.",
            ],
            en: [
                "A service list with price and duration, the first thing a new client looks for.",
                "Appointment booking, so people can reserve at any hour without messaging.",
                "Team profiles, because in barbering many people choose a barber, not a shop.",
                "A gallery of your own cuts, the strongest proof there is in this field.",
                "Location with a landmark reference, all built for mobile.",
            ],
        },
    },

    "reservas-casa-quinta": {
        kind: "demo",
        situation: {
            es: "Alquilar una casa quinta por fin de semana se maneja casi siempre por WhatsApp, y ahí aparecen los problemas: dos personas que preguntan por la misma fecha, señas que no se sabe si entraron, y un calendario que vive en la cabeza del dueño. Este sistema muestra cómo ordenar eso.",
            en: "Renting out a weekend country house is almost always handled over WhatsApp, and that is where problems appear: two people asking about the same date, deposits you are not sure arrived, and a calendar that lives in the owner's head. This system shows how to organise it.",
        },
        approach: {
            es: [
                "Calendario con las fechas ocupadas y libres a la vista, sin tener que revisar conversaciones.",
                "Carga de reservas con los datos de quien alquila y el período exacto.",
                "Registro de señas: cuánto entró, cuándo y cuánto falta.",
                "Bloqueo de fechas ya tomadas, para que no se prometa dos veces el mismo finde.",
                "Vista rápida del mes, que es como realmente se piensa este negocio.",
            ],
            en: [
                "A calendar showing booked and free dates at a glance, without digging through chats.",
                "Booking entries with the renter's details and the exact period.",
                "Deposit tracking: how much came in, when, and how much is left.",
                "Blocking of taken dates, so the same weekend is never promised twice.",
                "A quick month view, which is how this business is actually thought about.",
            ],
        },
    },

    "sistema-imprenta-express": {
        kind: "demo",
        situation: {
            es: "En una imprenta cada pedido pasa por varias etapas y por varias manos. Cuando el seguimiento está en papeles sueltos, nadie sabe con certeza qué está en diseño, qué está en máquina y qué se entrega mañana, y el cliente llama para preguntar. Este sistema muestra cómo tener ese panorama en una pantalla.",
            en: "In a print shop every order goes through several stages and several hands. When tracking lives on loose papers, nobody knows for sure what is in design, what is on the press and what ships tomorrow, and the client calls to ask. This system shows how to have that picture on one screen.",
        },
        approach: {
            es: [
                "Pedidos con su estado de producción: recibido, en diseño, en máquina, listo, entregado.",
                "Ficha de cliente con su historial, para no volver a pedir los mismos datos.",
                "Facturación interna asociada a cada pedido.",
                "Vista del día: qué entra, qué sale y qué está trabado.",
                "Acceso por usuario, separando producción de administración.",
            ],
            en: [
                "Orders with their production status: received, in design, on press, ready, delivered.",
                "A client record with history, so you never ask for the same details twice.",
                "Internal invoicing tied to each order.",
                "A day view: what comes in, what goes out and what is stuck.",
                "Per-user access, separating production from administration.",
            ],
        },
    },
};

export function getProjectCase(slug: string): ProjectCase | undefined {
    return projectCases[slug];
}
