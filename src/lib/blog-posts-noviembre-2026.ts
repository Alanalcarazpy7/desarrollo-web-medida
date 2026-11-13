import type { BlogPost } from './blog-data';

/**
 * Nueva colección editorial. La dependencia con blog-data es solo de tipos:
 * los artículos anteriores conservan contenido, fecha, slug y metadatos.
 * Las dos versiones tienen contenido propio para los hreflang existentes.
 */
export const november2026Posts: BlogPost[] = [
    {
        slug: 'link-de-pago-o-pasarela-paraguay',
        title: 'Link de pago o pasarela en Paraguay: qué integrar en tu web',
        titleEn: 'Payment link or gateway in Paraguay: what your website needs',
        excerpt: 'Compará link de pago, checkout y transferencia. Qué automatiza cada opción, qué confirmar con un proveedor operativo y cómo probar una integración.',
        excerptEn: 'Compare payment links, checkout and transfers. What each automates, what to confirm with an operational provider, and how to test the integration.',
        date: '2026-11-12',
        author: 'Alan Alcaraz',
        category: 'E-commerce',
        categoryEn: 'E-commerce',
        image: '/blog/link-pago-pasarela.svg',
        readTime: '6 min',
        keywords: ['link de pago paraguay', 'pasarela de pago paraguay', 'integrar bancard web', 'pagopar tienda online', 'checkout paraguay'],
        keywordsEn: ['payment link paraguay', 'payment gateway paraguay', 'bancard website integration', 'pagopar checkout'],
        content: `
            <p><strong>Un link de pago puede alcanzar si acordás cada venta por WhatsApp. Una pasarela integrada tiene sentido cuando tu web necesita crear pedidos y confirmar cobros sin que intervengas en cada operación.</strong> La diferencia importante es qué ocurre con el pedido después del pago, no solamente dónde aparece el botón.</p>
            <p>Elegir proveedor y elegir cómo integrarlo son dos decisiones diferentes: primero definí tu circuito de venta; después comprobá que el proveedor pueda habilitar y liquidar tus cobros antes de comparar condiciones.</p>
            <aside class="article-note article-note-warning"><strong>Actualización al 12 de noviembre de 2026.</strong><p>El <a href="https://www.bcp.gov.py/web/institucional/w/banco-central-inicia-el-procedimiento-de-resolucion-de-ueno-bank" target="_blank" rel="noopener noreferrer">BCP informó el proceso de resolución de ueno bank</a>. Retiramos la recomendación de empezar con upay/Pagopar sin confirmación operativa específica del producto. Una página accesible no acredita funcionamiento, soporte ni liquidación normal de fondos.</p></aside>
            <h2>Qué hace un link de pago</h2>
            <p>Es una dirección que lleva al cliente a una pantalla de cobro. Puede compartirse por WhatsApp, por correo o desde un botón en tu página. No requiere necesariamente un carrito ni una tienda completa.</p>
            <p>Bancard presenta <a href="https://www.bancard.com.py/tpago" target="_blank" rel="noopener noreferrer">TPago como una solución para compartir enlaces de pago</a>. Las funciones disponibles dependen del producto y de la habilitación de tu comercio. Confirmá las condiciones directamente antes de encargar desarrollo.</p>
            <p>Un link no significa que todo el proceso quede automatizado. Si vendés un servicio personalizado, todavía puede tocarte confirmar el alcance, asociar el pago al cliente y coordinar la entrega. Algunos productos permiten integraciones por API: compartible y automatizable no son categorías excluyentes.</p>
            <h2>Qué cambia con una pasarela integrada</h2>
            <p>La web crea una orden identificable, solicita el cobro al proveedor y recibe una confirmación que el servidor verifica. Con ese estado confirmado puede actualizar un pedido, reservar stock o habilitar acceso, según el proyecto.</p>
            <p><a href="https://www.bancard.com.py/vpos" target="_blank" rel="noopener noreferrer">Bancard vPOS</a> está orientado a cobros desde una web o aplicación. Eso no implica que cualquier desarrollo traiga stock, facturación o logística: esas funciones deben figurar expresamente en el alcance.</p>
            <table><caption>Elegí según el trabajo que querés automatizar</caption><thead><tr><th scope="col">Situación</th><th scope="col">Punto de partida</th><th scope="col">Qué queda por resolver</th></tr></thead><tbody>
                <tr><th scope="row">Servicio cotizado caso por caso</th><td>Link después de aprobar la propuesta</td><td>Relacionar cobro, cliente y entrega</td></tr>
                <tr><th scope="row">Productos con variantes y stock</th><td>Catálogo con pedido o checkout integrado</td><td>Disponibilidad, envíos y estados</td></tr>
                <tr><th scope="row">Curso con acceso automático</th><td>Cobro conectado al sistema de acceso</td><td>Altas, reintentos y soporte al alumno</td></tr>
                <tr><th scope="row">Pocos pedidos coordinados manualmente</th><td>Pedido por WhatsApp y cobro acordado</td><td>Verificación y registro manual</td></tr>
            </tbody></table>
            <h2>Qué preguntar antes de contratar</h2>
            <ul>
                <li><strong>Medios habilitados:</strong> tarjetas locales o internacionales, QR y otras opciones de ese producto concreto.</li>
                <li><strong>Costo completo:</strong> alta, mensualidad, comisión por operación, impuestos aplicables y posibles cargos adicionales.</li>
                <li><strong>Acreditación:</strong> en qué cuenta se deposita y cuánto demora según el medio de pago.</li>
                <li><strong>Operación:</strong> cómo se consultan pagos pendientes, cancelaciones, devoluciones y reclamos.</li>
                <li><strong>Integración:</strong> entorno de pruebas, documentación, notificaciones y soporte técnico disponible.</li>
                <li><strong>Alta comercial:</strong> documentación, actividad admitida y requisitos para tu tipo de negocio.</li>
            </ul>
            <p>No presupuestes usando una comisión vista en un artículo viejo: solicitá condiciones vigentes por escrito. Esta guía compara arquitectura y operación; no fija tarifas ni confirma la aprobación comercial de un proveedor.</p>
            <h2>La confirmación del navegador no demuestra un pago</h2>
            <p>La pantalla que dice “gracias” sirve para orientar al comprador. Tu sistema no debería entregar un producto ni marcar una factura como pagada solamente porque alguien visitó esa URL.</p>
            <p>El servidor debe comprobar la respuesta del proveedor, el identificador de la orden, el monto y la moneda. También debe manejar notificaciones repetidas sin entregar dos veces. Si el cliente cierra la pestaña antes de volver a tu web, el pedido debe poder recuperarse desde el estado verificado.</p>
            <h2>Pruebas que conviene pedir en la entrega</h2>
            <ol>
                <li>Una compra aprobada queda asociada a un solo pedido.</li>
                <li>Un pago rechazado permite reintentar sin duplicar la compra.</li>
                <li>Una operación pendiente se distingue de una cobrada.</li>
                <li>Cerrar el navegador no hace perder una confirmación válida.</li>
                <li>Dos confirmaciones del mismo cobro no duplican stock ni accesos.</li>
                <li>El administrador puede consultar el estado y resolver una incidencia.</li>
            </ol>
            <p>Pedí estas pruebas primero en el entorno de prueba que habilite el proveedor. Cualquier operación real de validación debe acordarse con el comercio, incluido su importe y eventual devolución.</p>
            <h2>Un ejemplo de alcance que podés pedir</h2>
            <p>“Vendo cursos de precio fijo. Necesito cobrar desde la web, guardar el pedido y habilitar acceso solo con pago confirmado. También necesito ver pendientes y reenviar el acceso”. Esa descripción permite cotizar un trabajo concreto; “poner Pagopar” deja demasiadas decisiones abiertas.</p>
            <p>En nuestro portfolio podés ver la <a href="/es/proyectos/academia-gps">landing de Academia GPS</a>. La referencia a Pagopar describe una integración histórica del proyecto, no una recomendación actual del proveedor. Un botón hacia el medio de cobro no demuestra por sí solo una plataforma automática de alumnos.</p>
            <h2>Cuál es el siguiente paso para tu negocio</h2>
            <p>Si todavía estás eligiendo cómo vender, revisá la <a href="/es/blog/medios-de-pago-online-paraguay">guía general de medios de pago en Paraguay</a> y la comparación entre <a href="/es/blog/catalogo-whatsapp-o-tienda-online-paraguay">catálogo por WhatsApp y tienda online</a>. Esta guía se concentra en cómo conectar el cobro, sin reemplazar la elección del modelo de venta.</p>
            <p>Para cotizar, anotá qué vendés, cómo se entrega, qué ocurre al aprobar un pago y qué proveedor tenés habilitado. Si necesitás automatizar pedidos o accesos, <a href="/es/servicios/sistemas-informaticos-paraguay">consultá por un sistema a medida</a>. Si querés empezar con pedidos organizados, mirá el <a href="/es/servicios/desarrollo-web-catalogo">servicio de catálogo digital</a>.</p>
            <p><small>Revisión: 12 de noviembre de 2026. Fuentes: BCP y páginas oficiales de Bancard enlazadas. No se verificó una operación real ni se garantiza el alta de ningún comercio.</small></p>
        `,
        contentEn: `
            <p><strong>A payment link may be enough when you agree each sale over WhatsApp. An integrated gateway makes sense when your website needs to create orders and confirm payments without manual intervention every time.</strong> The key question is what happens to the order after payment, rather than where the button appears.</p>
            <p>In Paraguay, choosing a provider and choosing an integration are separate decisions. Describe the sales process, then confirm merchant onboarding and settlement before comparing commercial terms.</p>
            <aside class="article-note article-note-warning"><strong>Updated November 12, 2026.</strong><p>The <a href="https://www.bcp.gov.py/web/institucional/w/banco-central-inicia-el-procedimiento-de-resolucion-de-ueno-bank" target="_blank" rel="noopener noreferrer">BCP announced ueno bank's resolution process</a>. We have withdrawn the recommendation to start with upay/Pagopar without product-specific operational confirmation. An accessible website is not proof of processing or settlement availability.</p></aside>
            <h2>What a payment link does</h2>
            <p>A payment link takes a customer to a payment screen. You can share it through WhatsApp, email or a button on your site. It does not necessarily require a shopping cart or a full online store.</p>
            <p><a href="https://www.bancard.com.py/tpago" target="_blank" rel="noopener noreferrer">Bancard TPago</a> describes shareable payment links. Available features depend on the product and merchant approval; confirm current terms before commissioning development.</p>
            <p>A link does not automatically manage delivery. With a custom service, you may still need to confirm scope, match the payment to a customer and arrange fulfilment. Some link products also offer an API, so shareable and automated are not mutually exclusive categories.</p>
            <h2>What an integrated gateway adds</h2>
            <p>Your website creates an identifiable order, requests a payment and checks the provider's confirmation on the server. A verified payment can then update an order, reserve stock or enable access, depending on the agreed project scope.</p>
            <p><a href="https://www.bancard.com.py/vpos" target="_blank" rel="noopener noreferrer">Bancard vPOS</a> is designed for payments inside websites or apps. It does not automatically include inventory, invoicing or shipping in your development quote.</p>
            <table><caption>Choose according to your sales process</caption><thead><tr><th scope="col">Situation</th><th scope="col">Starting point</th><th scope="col">Remaining work</th></tr></thead><tbody>
                <tr><th scope="row">Individually quoted services</th><td>Link after proposal approval</td><td>Match payment and delivery</td></tr>
                <tr><th scope="row">Products with variants and stock</th><td>Order catalogue or integrated checkout</td><td>Availability, shipping and status</td></tr>
                <tr><th scope="row">Course with automatic access</th><td>Payment connected to enrolment</td><td>Access, retries and learner support</td></tr>
                <tr><th scope="row">A few manually arranged sales</th><td>WhatsApp order and agreed payment</td><td>Manual verification and records</td></tr>
            </tbody></table>
            <h2>Questions to ask the provider</h2>
            <ul><li>Which local and international payment methods are enabled for this specific product?</li><li>What are the setup costs, monthly fees, transaction charges and applicable taxes?</li><li>Where and when are funds settled for each payment method?</li><li>How do you handle pending payments, cancellations, refunds and disputes?</li><li>Are test credentials, documentation and server notifications available?</li><li>What documents and business activities are accepted for merchant approval?</li></ul>
            <p>Request current written terms. An old article cannot establish today's commission or guarantee merchant approval. This guide compares implementation and operations rather than quoting payment fees.</p>
            <h2>A browser redirect is not proof of payment</h2>
            <p>A thank-you page helps the buyer understand the next step. The application must not release a product or mark an invoice as paid merely because someone visits that page.</p>
            <p>The server should verify the provider response, order identifier, amount and currency. Duplicate notifications must not create duplicate deliveries. If the buyer closes the tab before returning to your site, the order should still be recoverable from its verified status.</p>
            <h2>Ask for these delivery tests</h2>
            <ol><li>An approved payment belongs to one order.</li><li>A declined payment can be retried without duplicating the purchase.</li><li>Pending and paid states remain distinct.</li><li>Closing the browser does not lose a valid confirmation.</li><li>Repeated notifications do not duplicate stock changes or access.</li><li>An administrator can inspect the payment and resolve an issue.</li></ol>
            <p>Run these in the provider's test environment first. Any live validation transaction needs the merchant's agreement, including its amount and any refund.</p>
            <h2>Describe the outcome you need</h2>
            <p>For example: “We sell fixed-price courses. We need website payments, order records and access only after verified payment, plus an administrator view for pending orders.” That is much clearer than asking to “add Pagopar”.</p>
            <p>The Pagopar reference in our <a href="/en/projects/academia-gps">Academia GPS project</a> describes historical work, not a current provider recommendation. A payment link does not, by itself, establish a fully automated learning platform.</p>
            <p>For the wider choice of methods, read <a href="/en/blog/medios-de-pago-online-paraguay">online payment methods in Paraguay</a>. For sales workflow, compare a <a href="/en/blog/catalogo-whatsapp-o-tienda-online-paraguay">WhatsApp catalogue with an online store</a>. To automate orders or access, see our <a href="/en/servicios/sistemas-informaticos-paraguay">custom systems service</a>.</p>
            <p><small>Reviewed November 12, 2026 against the linked BCP and Bancard sources. No live transaction was performed and merchant approval is not guaranteed.</small></p>
        `,
    },
    {
        slug: 'presupuesto-diseno-web-paraguay-que-incluir',
        title: 'Presupuesto de diseño web en Paraguay: qué pedir y comparar',
        titleEn: 'Web design quotes in Paraguay: what to request and compare',
        excerpt: 'Una checklist para contratar desarrollo web: alcance, contenido, dominio, mantenimiento y criterios de entrega. Incluye un brief descargable.',
        excerptEn: 'A checklist for hiring a web developer: scope, content, domain ownership, maintenance and acceptance criteria. Includes a downloadable brief.',
        date: '2026-11-12',
        author: 'Alan Alcaraz',
        category: 'Desarrollo Web',
        categoryEn: 'Web Development',
        image: '/blog/presupuesto-web.svg',
        readTime: '6 min',
        keywords: ['presupuesto diseño web paraguay', 'contratar desarrollo web paraguay', 'empresa desarrollo sitios web paraguay', 'comparar presupuesto pagina web'],
        keywordsEn: ['web design quote paraguay', 'hire web developer paraguay', 'website proposal checklist'],
        content: `
            <p><strong>Un presupuesto de diseño web sirve cuando te permite saber qué recibirás, cuánto pagarás al inicio y después, y cómo se comprobará que el trabajo está terminado.</strong> Comparar solamente el precio deja afuera las diferencias que más problemas generan: contenido, accesos, mantenimiento e integraciones.</p>
            <p>Si estás buscando una empresa de desarrollo de sitios web en Paraguay, usá esta guía para pedir propuestas comparables. Los rangos de inversión están en nuestro artículo sobre <a href="/es/blog/cuanto-cuesta-pagina-web-paraguay">cuánto cuesta una página web</a>; acá nos concentramos en el alcance que debería acompañar ese número.</p>
            <h2>Empezá por una acción del cliente</h2>
            <p>“Quiero una web moderna” no permite decidir qué construir. “Quiero que una empresa entienda nuestros servicios y mande una consulta con el rubro y la cantidad de sucursales” sí describe una necesidad.</p>
            <p>Anotá quién compra, qué necesita saber y qué debería hacer al terminar de leer. Podés tener varias páginas, pero conviene elegir una acción principal: pedir presupuesto, reservar, consultar productos o comprar. El diseño y el contenido se evalúan contra esa acción.</p>
            <h2>Pedí páginas y funciones por separado</h2>
            <p>Una sección dentro del inicio y una página independiente no son lo mismo. Pedí que la propuesta enumere las URLs y aclare cuáles llevan contenido propio. “Hasta diez secciones” no explica si servicios, preguntas y contacto viven juntos o por separado.</p>
            <table><caption>Qué conviene dejar escrito</caption><thead><tr><th scope="col">Parte</th><th scope="col">Descripción comprobable</th><th scope="col">Pregunta clave</th></tr></thead><tbody>
                <tr><th scope="row">Contenido</th><td>Textos, fotografías y carga inicial</td><td>¿Quién prepara cada material?</td></tr>
                <tr><th scope="row">Páginas</th><td>Inicio, servicios, proyecto y contacto</td><td>¿Qué URLs se entregan?</td></tr>
                <tr><th scope="row">Formulario</th><td>Campos, validación y destino</td><td>¿Guarda una consulta o abre WhatsApp?</td></tr>
                <tr><th scope="row">Edición</th><td>Textos o productos que podés actualizar</td><td>¿Incluye un panel y capacitación?</td></tr>
                <tr><th scope="row">Entrega</th><td>Pruebas, accesos y publicación</td><td>¿Qué se considera aprobado?</td></tr>
            </tbody></table>
            <h2>Separá inversión inicial y costos recurrentes</h2>
            <p>Pedí que el diseño y desarrollo estén separados de dominio, hosting, correo, mantenimiento y servicios de terceros. Si un período está incluido, necesitás conocer su duración y la renovación posterior, no solamente la palabra “gratis”.</p>
            <p>El soporte también necesita límites: cantidad de cambios, tipo de tareas, canal y plazo de respuesta acordado. Agregar una función nueva puede ser desarrollo adicional, aunque el proveedor incluya pequeños cambios de contenido.</p>
            <p>Para ordenar estas diferencias antes de contratar, revisá <a href="/es/blog/dominio-hosting-correo-empresa-paraguay">dominio, hosting y correo empresarial</a>. No deberían quedar mezclados en un único precio que nadie pueda explicar al renovar.</p>
            <h2>Qué significa incluir SEO</h2>
            <p>Una base técnica puede incluir títulos descriptivos, canonical, sitemap, enlaces rastreables y contenido accesible en el HTML. Una estrategia de contenidos, una auditoría mensual y la consecución de enlaces son trabajos distintos. Preguntá qué tareas incluye exactamente la propuesta.</p>
            <p>Google recomienda <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=es" target="_blank" rel="noopener noreferrer">contenido útil y original para las personas</a>. Eso no se reemplaza con una lista de palabras clave, y ningún presupuesto serio debería garantizar el primer puesto para una búsqueda competitiva.</p>
            <h2>Cómo evaluar trabajos anteriores</h2>
            <p>Abrí los sitios desde tu celular. Buscá un servicio, intentá contactar y fijate si entendés la oferta sin una explicación del autor. Una captura muestra apariencia; un sitio navegable permite revisar comportamiento.</p>
            <p>Pedí que te expliquen cuál fue su participación y qué partes corresponden a una demo, una plantilla o un sistema privado. En nuestro caso, <a href="/es/proyectos/morinigo-y-asociados">Morinigo y Asociados</a> muestra una web institucional y <a href="/es/proyectos/academia-gps">Academia GPS</a> una landing de formación. Son alcances diferentes: no deberían usarse como si demostraran exactamente lo mismo.</p>
            <h2>Definí una entrega que se pueda probar</h2>
            <ol>
                <li>El menú lleva a páginas existentes y no hay enlaces sin destino.</li>
                <li>Los formularios validan los campos y explican qué ocurre al continuar.</li>
                <li>La información principal funciona en celular y con teclado.</li>
                <li>Dominio, publicación y accesos quedan documentados.</li>
                <li>Las funciones de pago, reservas o catálogo se prueban según el alcance.</li>
                <li>Se acuerdan revisiones, correcciones y condiciones de soporte posterior.</li>
            </ol>
            <p>Un formulario que prepara un mensaje no equivale a una consulta guardada en un sistema. Ambos pueden servir, pero el presupuesto y los textos de confirmación deben describir lo que realmente sucede.</p>
            <h2>Brief descargable para pedir propuestas</h2>
            <p><a href="/es/brief">Prepará tu brief de proyecto con SolvaTech</a>: completá el formulario con tu objetivo, funciones y plazo para que podamos revisar tu proyecto y preparar una propuesta con contexto.</p>
            <p>Completá primero objetivo, público, páginas, funciones, contenido disponible, presupuesto y fecha deseada. Si dos proveedores reciben el mismo brief, vas a poder comparar diferencias reales y detectar qué quedó afuera.</p>
            <h2>Preguntas antes de dar el anticipo</h2>
            <ul><li>¿Qué está incluido y qué se cotiza aparte?</li><li>¿De quién depende el contenido y cuándo debe entregarse?</li><li>¿A nombre de quién queda el dominio y quién tiene acceso?</li><li>¿Qué ocurre si pido cambios fuera del alcance?</li><li>¿Qué se paga después de publicar y cuándo renueva?</li><li>¿Quién atiende una falla y qué condiciones tiene el soporte?</li></ul>
            <p>Si querés que revisemos tu brief, <a href="/es/servicios/desarrollo-web-paraguay">conocé nuestro servicio de desarrollo web en Paraguay</a> y <a href="/es#contacto">contanos el alcance de tu proyecto</a>. Esa información permite empezar la conversación con una propuesta concreta.</p>
        `,
        contentEn: `
            <p><strong>A useful web design quote explains what you will receive, what you pay initially and later, and how completion will be checked.</strong> Price alone leaves out the differences that often cause problems: content, access, maintenance and integrations.</p>
            <p>If you are hiring a developer in Paraguay, use this checklist to obtain comparable proposals. Our <a href="/en/blog/cuanto-cuesta-pagina-web-paraguay">website pricing guide</a> covers investment ranges. This article focuses on the scope that should accompany a price.</p>
            <h2>Start with the customer's next action</h2>
            <p>“We want a modern website” leaves most decisions open. “We want companies to understand our services and request a quote with their industry and number of branches” describes an actual need.</p>
            <p>Write down who buys, what they need to know and what they should do next. Choose a primary action such as requesting a quote, booking, enquiring about products or purchasing. Evaluate design and content against that goal.</p>
            <h2>List pages and functions separately</h2>
            <p>A section on the homepage is different from an independent page. Ask for a list of URLs and identify which have their own content. “Up to ten sections” does not tell you whether services and contact share one page.</p>
            <table><caption>What a proposal should specify</caption><thead><tr><th scope="col">Area</th><th scope="col">Deliverable</th><th scope="col">Question</th></tr></thead><tbody>
                <tr><th scope="row">Content</th><td>Copy, photos and initial population</td><td>Who provides each item?</td></tr>
                <tr><th scope="row">Pages</th><td>Home, services, work and contact</td><td>Which URLs are included?</td></tr>
                <tr><th scope="row">Forms</th><td>Fields, validation and destination</td><td>Saved enquiry or WhatsApp draft?</td></tr>
                <tr><th scope="row">Editing</th><td>Editable products or copy</td><td>Does it include a panel and training?</td></tr>
                <tr><th scope="row">Handover</th><td>Tests, access and publishing</td><td>What counts as approval?</td></tr>
            </tbody></table>
            <h2>Separate setup and ongoing costs</h2>
            <p>Ask for design and development to be separated from domain, hosting, email, maintenance and third-party services. An included period needs a duration and renewal conditions. The word “free” is not enough.</p>
            <p>Support also needs boundaries: the changes included, channels and an agreed response time. A new feature may be additional development even when minor content edits are covered. Read the <a href="/en/blog/dominio-hosting-correo-empresa-paraguay">domain, hosting and business email guide</a> before comparing bundled offers.</p>
            <h2>Ask what SEO includes</h2>
            <p>Technical setup can cover descriptive titles, canonical URLs, sitemaps, crawlable links and HTML content. Ongoing editorial work, audits and link acquisition are separate services. Request specific tasks rather than a general “SEO included” label.</p>
            <p>Google recommends <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer">helpful, original content</a>. Keyword lists do not replace that work, and a development quote should not guarantee first place for a competitive search.</p>
            <h2>Evaluate work you can actually use</h2>
            <p>Open portfolio sites on your phone. Find a service and try the contact path. A screenshot demonstrates appearance; a live site lets you inspect behaviour. Ask what the developer built and which examples are demos or private systems.</p>
            <p>Our <a href="/en/projects/morinigo-y-asociados">Morinigo y Asociados case</a> is an institutional site, while <a href="/en/projects/academia-gps">Academia GPS</a> is a course sales landing. They demonstrate different scopes and should be compared accordingly.</p>
            <h2>Agree on acceptance checks</h2>
            <ol><li>Navigation reaches existing destinations.</li><li>Forms validate input and explain what happens next.</li><li>Core information works on mobile and with a keyboard.</li><li>Domain, publishing and access are documented.</li><li>Payments, bookings and catalogue functions are tested as scoped.</li><li>Revisions, corrections and later support are agreed.</li></ol>
            <p>A form that prepares a message is not a saved enquiry. Either can work, but the proposal and confirmation screen must describe the actual behaviour.</p>
            <h2>A downloadable project brief</h2>
            <p><a href="/en/brief">Prepare your project brief with SolvaTech</a>: complete the form with your goals, features and timing so we can review your project and prepare a relevant proposal.</p>
            <p>Complete the goal, audience, pages, features, available content, budget and preferred date. Giving two suppliers the same brief makes meaningful comparisons easier.</p>
            <h2>Before paying a deposit</h2>
            <ul><li>What is included and what costs extra?</li><li>Who supplies content, and by when?</li><li>Who owns and can access the domain?</li><li>How are out-of-scope changes handled?</li><li>What renews after launch?</li><li>Who handles faults, and under which support terms?</li></ul>
            <p>To discuss your brief, see our <a href="/en/servicios/desarrollo-web-paraguay">web development service in Paraguay</a> and <a href="/en#contacto">tell us about the project</a>. A clear brief makes the first conversation more useful.</p>
        `,
    },
    {
        slug: 'catalogo-whatsapp-o-tienda-online-paraguay',
        title: 'Catálogo por WhatsApp o tienda online en Paraguay: cuál elegir',
        titleEn: 'WhatsApp catalogue or online store in Paraguay: which to choose',
        excerpt: 'Decidí según stock, pedidos, pagos y entregas. Una comparación práctica para vender en Paraguay sin encargar funciones que todavía no necesitás.',
        excerptEn: 'Choose based on inventory, orders, payments and delivery. A practical comparison for selling in Paraguay without buying features you do not yet need.',
        date: '2026-11-12',
        author: 'Alan Alcaraz',
        category: 'E-commerce',
        categoryEn: 'E-commerce',
        image: '/blog/catalogo-tienda.svg',
        readTime: '6 min',
        keywords: ['catalogo digital whatsapp paraguay', 'tienda online paraguay', 'catalogo o ecommerce', 'pedidos por whatsapp negocio'],
        keywordsEn: ['whatsapp catalogue paraguay', 'online store paraguay', 'catalogue vs ecommerce', 'whatsapp ordering business'],
        content: `
            <p><strong>Elegí un catálogo con pedido por WhatsApp si cada venta necesita conversación. Elegí una tienda con checkout si el cliente puede elegir, pagar y recibir una confirmación sin esperar que lo atiendas.</strong> El número de productos ayuda a estimar trabajo, pero no alcanza para decidir.</p>
            <p>Un comercio con veinte productos personalizados puede necesitar más coordinación que otro con doscientos productos estándar. Antes de pedir una tienda online en Paraguay, dibujá cómo se completa una venta hoy y qué parte te está haciendo perder tiempo.</p>
            <h2>Un catálogo ordena la consulta</h2>
            <p>La web muestra categorías, fotos, variantes y precios. El comprador selecciona productos y abre WhatsApp con un resumen. Ahí acordás disponibilidad, pago y entrega. Puede tener carrito sin que exista un checkout automático: agregar productos y cobrar son funciones diferentes.</p>
            <p>Este modelo suele encajar cuando vendés productos a pedido, necesitás confirmar medidas o coordinás zonas de entrega. Su principal aporte es evitar conversaciones que arrancan desde cero: el cliente ya sabe qué quiere y vos recibís una solicitud más completa.</p>
            <p>El <a href="/es/servicios/desarrollo-web-catalogo">catálogo digital de SolvaTech</a> describe ese tipo de alcance. Que no haya una comisión de venta cobrada por el catálogo no elimina otros costos: hosting, mantenimiento, delivery y el medio de cobro que elijas se evalúan aparte.</p>
            <h2>Una tienda administra la compra</h2>
            <p>Además de mostrar productos, crea un pedido con su identificación y estados. Si integra cobro, recibe confirmaciones verificadas. Según el proyecto, también puede calcular envío, gestionar stock y avisar al cliente.</p>
            <p>Necesita reglas que quizá todavía resolvés hablando: qué se considera disponible, cuánto tiempo se reserva, qué pasa con un pago pendiente y quién atiende una cancelación. Esas decisiones forman parte del desarrollo, no son detalles para resolver después de publicar.</p>
            <table><caption>Diferencias que afectan tu operación</caption><thead><tr><th scope="col">Necesidad</th><th scope="col">Catálogo por WhatsApp</th><th scope="col">Tienda con checkout</th></tr></thead><tbody>
                <tr><th scope="row">Preguntas antes de comprar</th><td>Conversación como parte del proceso</td><td>Ficha, variantes y condiciones deben resolverlas</td></tr>
                <tr><th scope="row">Confirmar stock</th><td>Puede hacerlo una persona</td><td>Necesita una fuente de disponibilidad confiable</td></tr>
                <tr><th scope="row">Confirmar pago</th><td>Manual o con una herramienta aparte</td><td>Conectado al pedido si está integrado</td></tr>
                <tr><th scope="row">Seguimiento</th><td>Mensajes y registro del negocio</td><td>Estados y notificaciones según alcance</td></tr>
                <tr><th scope="row">Cambiar productos</th><td>Panel o soporte, según contratación</td><td>Panel y procedimiento de actualización</td></tr>
            </tbody></table>
            <h2>Ejemplo: productos personalizados</h2>
            <p>Una tienda de vasos grabados necesita confirmar diseño, cantidad y fecha de entrega. Cobrar automáticamente antes de revisar esos datos puede generar trabajo extra y devoluciones. Un catálogo que arme el pedido y lo derive a una conversación puede ser un mejor comienzo.</p>
            <p>En el portfolio podés revisar la <a href="/es/proyectos/vasospy">muestra de VasosPy</a>. Es una referencia de catálogo y pedidos por WhatsApp; no la presentamos como evidencia de facturación, cantidad de clientes o resultados comerciales medidos.</p>
            <h2>Ejemplo: productos estándar con entrega definida</h2>
            <p>Un comercio que vende accesorios con variantes conocidas puede dejar que el cliente termine la compra, siempre que stock, precio y envío estén actualizados. En ese caso, automatizar pedidos y cobros puede reducir pasos manuales.</p>
            <p>Antes de implementarlo, verificá de dónde sale el stock. Si también vendés en el local y nadie actualiza la web, aceptar pagos de productos agotados se vuelve un riesgo operativo. Puede hacer falta sincronización con otro sistema o una etapa de confirmación previa.</p>
            <h2>Cinco preguntas para decidir</h2>
            <ol><li>¿Podés confirmar precio y entrega sin hablar con el comprador?</li><li>¿Las variantes y cantidades disponibles están actualizadas?</li><li>¿Cuánto tiempo dedica tu equipo a reconstruir pedidos incompletos?</li><li>¿Tenés condiciones claras de envío, cambios y cancelación?</li><li>¿Quién va a mantener productos, fotos y estados después del lanzamiento?</li></ol>
            <p>Si faltan reglas o materiales, empezar con un catálogo no es quedarse atrás. Puede ser una primera etapa útil mientras ordenás el proceso. Si el equipo ya repite el mismo trabajo manual con reglas estables, vale la pena cotizar automatización.</p>
            <h2>Cómo pasar de catálogo a tienda sin rehacer todo</h2>
            <p>Pedí identificadores estables para productos y variantes, categorías ordenadas y una forma de exportar los datos. Conservá las URLs que reciben visitas cuando sea posible. Si cambian, planificá redirecciones hacia sus equivalentes en lugar de mandar todo al inicio.</p>
            <p>También necesitás definir fotos, precios, unidades y descripciones de forma consistente. Esa preparación sirve tanto para vender por WhatsApp como para sumar un checkout. No todo catálogo puede ampliarse automáticamente: la arquitectura y los accesos deben revisarse antes.</p>
            <h2>Qué enviar para cotizar tu caso</h2>
            <ul><li>Una muestra de productos y sus variantes.</li><li>Cómo confirmás stock y qué otros canales usás.</li><li>Cómo calculás entregas y a qué zonas vendés.</li><li>Qué medios de pago tenés habilitados.</li><li>Qué querés automatizar y quién administrará la web.</li></ul>
            <p>Para elegir la parte de cobro, leé <a href="/es/blog/link-de-pago-o-pasarela-paraguay">link de pago o pasarela integrada en Paraguay</a>. Para comparar propuestas de desarrollo, usá la <a href="/es/blog/presupuesto-diseno-web-paraguay-que-incluir">checklist de presupuesto web</a>.</p>
            <p>Si tu prioridad es ordenar consultas, <a href="/es/servicios/desarrollo-web-catalogo">mirá el alcance del catálogo digital</a>. Si necesitás pedidos, stock o integraciones específicas, <a href="/es/servicios/sistemas-informaticos-paraguay">contanos el proceso para cotizar un sistema</a>. El objetivo es resolver la venta que ya tenés, con margen para crecer.</p>
        `,
        contentEn: `
            <p><strong>Choose a WhatsApp order catalogue when each sale needs a conversation. Choose an online store with checkout when buyers can select, pay and receive confirmation without waiting for an operator.</strong> Product count helps estimate work but does not decide the right approach.</p>
            <p>A shop with twenty personalised items may need more coordination than one with two hundred standard products. Before commissioning an online store in Paraguay, map today's sales process and identify the time-consuming step.</p>
            <h2>A catalogue organises the enquiry</h2>
            <p>The website shows categories, photos, variants and prices. Buyers select products and open WhatsApp with a summary. You then agree availability, payment and delivery. It can have a cart without an automatic checkout: selecting products and collecting money are separate functions.</p>
            <p>This suits made-to-order goods, measurements that need confirmation or delivery zones arranged individually. The main benefit is a more complete request rather than another conversation starting from scratch.</p>
            <p>Our <a href="/en/servicios/desarrollo-web-catalogo">digital catalogue service</a> describes that scope. No sales commission charged by the catalogue does not mean no operating costs. Hosting, maintenance, delivery and payment-provider charges remain separate considerations.</p>
            <h2>A store manages the purchase</h2>
            <p>A store creates an identifiable order and its status. With payment integration, it checks payment confirmations. Inventory, delivery calculations and notifications depend on the agreed scope.</p>
            <p>It needs explicit rules that you may currently decide in conversation: availability, reservation time, pending payments and cancellation handling. These rules belong in the specification before launch.</p>
            <table><caption>Operational differences</caption><thead><tr><th scope="col">Need</th><th scope="col">WhatsApp catalogue</th><th scope="col">Store with checkout</th></tr></thead><tbody>
                <tr><th scope="row">Pre-purchase questions</th><td>Conversation is expected</td><td>Product information and rules must answer them</td></tr>
                <tr><th scope="row">Stock confirmation</th><td>Can be manual</td><td>Needs reliable availability</td></tr>
                <tr><th scope="row">Payment confirmation</th><td>Manual or separate tool</td><td>Linked to the order if integrated</td></tr>
                <tr><th scope="row">Tracking</th><td>Messages and business records</td><td>Statuses and scoped notifications</td></tr>
                <tr><th scope="row">Product updates</th><td>Panel or support, as contracted</td><td>Panel and an update process</td></tr>
            </tbody></table>
            <h2>Example: personalised products</h2>
            <p>An engraved cup business must confirm artwork, quantity and delivery date. Taking payment before reviewing those details can create extra work. A catalogue that assembles the request and starts a conversation may be the better first step.</p>
            <p>The portfolio includes the <a href="/en/projects/vasospy">VasosPy sample</a>, illustrating a catalogue and WhatsApp ordering. It is a visual reference, not evidence of measured revenue or customer growth.</p>
            <h2>Example: standard products and defined delivery</h2>
            <p>A shop selling accessories with known variants can support self-service purchases if inventory, price and shipping remain current. Otherwise online payments may accept orders for unavailable items.</p>
            <p>Establish the stock source first, especially if products also sell in a physical shop. You may need synchronisation with another system or a confirmation step before payment.</p>
            <h2>Five questions before choosing</h2>
            <ol><li>Can you confirm price and delivery without a conversation?</li><li>Are variants and available quantities current?</li><li>How much time goes into reconstructing incomplete orders?</li><li>Are delivery, return and cancellation rules clear?</li><li>Who will maintain products and order status after launch?</li></ol>
            <p>If the process is still being defined, a catalogue can be a useful first stage. If the team repeatedly performs stable manual steps, automation is worth pricing.</p>
            <h2>Plan a later move to checkout</h2>
            <p>Request stable product and variant identifiers, organised categories and data export. Preserve URLs that receive visitors where possible. When they change, plan equivalent redirects rather than sending every old product URL to the homepage.</p>
            <p>Consistent photos, prices, units and descriptions help either approach. Not every catalogue can be upgraded automatically: check its architecture and access before assuming the move will be simple.</p>
            <h2>Prepare a useful quote request</h2>
            <p>Provide sample products, variants, the stock source, other sales channels, delivery zones, enabled payment methods and the tasks you want automated. Identify who will maintain the website.</p>
            <p>For payments, read <a href="/en/blog/link-de-pago-o-pasarela-paraguay">payment links versus integrated gateways in Paraguay</a>. For proposals, use the <a href="/en/blog/presupuesto-diseno-web-paraguay-que-incluir">website quote checklist</a>. Start with a <a href="/en/servicios/desarrollo-web-catalogo">digital catalogue</a> for organised enquiries, or discuss a <a href="/en/servicios/sistemas-informaticos-paraguay">custom system</a> for stock, orders and integrations.</p>
        `,
    },
    {
        slug: 'dominio-hosting-correo-empresa-paraguay',
        title: 'Dominio, hosting y correo empresarial en Paraguay: qué contratar',
        titleEn: 'Domain, hosting and business email in Paraguay: what to buy',
        excerpt: 'Qué diferencia la dirección de tu web, su alojamiento y el correo empresarial. Una checklist de titularidad, accesos, renovaciones y entrega.',
        excerptEn: 'Understand your website address, hosting and business email. A practical checklist for ownership, access, renewals and handover.',
        date: '2026-11-12',
        author: 'Alan Alcaraz',
        category: 'Guías Técnicas',
        categoryEn: 'Technical Guides',
        image: '/blog/dominio-hosting-correo.svg',
        readTime: '6 min',
        keywords: ['dominio hosting correo paraguay', 'correo empresarial paraguay', 'hosting y dominio com py', 'mantenimiento web paraguay'],
        keywordsEn: ['business email paraguay', 'domain hosting paraguay', 'com py hosting email', 'website maintenance paraguay'],
        content: `
            <p><strong>El dominio es la dirección; el hosting publica la web; el servicio de correo recibe y envía mensajes con tu marca.</strong> Pueden contratarse juntos, pero no son el mismo servicio ni necesariamente se renuevan en la misma fecha.</p>
            <p>Si estás armando una página para tu empresa en Paraguay, separar estas tres piezas te permite comparar propuestas y conservar el control cuando cambies de proveedor. Para el trámite de alta del dominio, ya tenemos una <a href="/es/blog/registrar-dominio-com-py-paraguay">guía para registrar un .com.py</a>. Esta se ocupa de lo que contratás y administrás después.</p>
            <h2>Qué resuelve cada servicio</h2>
            <table><caption>Tres servicios y tres responsabilidades</caption><thead><tr><th scope="col">Servicio</th><th scope="col">Para qué sirve</th><th scope="col">Qué confirmar</th></tr></thead><tbody>
                <tr><th scope="row">Dominio</th><td>Identifica tu dirección en internet</td><td>Titular, contactos y vencimiento</td></tr>
                <tr><th scope="row">Hosting</th><td>Ejecuta o publica tu página</td><td>Recursos, copias y soporte</td></tr>
                <tr><th scope="row">Correo empresarial</th><td>Recibe y envía mensajes con tu dominio</td><td>Cuentas, espacio y recuperación</td></tr>
            </tbody></table>
            <p>Comprar un dominio no crea automáticamente una web ni un buzón. Contratar hosting tampoco garantiza correo incluido. Un formulario puede abrir WhatsApp, enviar un correo o guardar una solicitud: su destino es otra decisión que conviene documentar.</p>
            <h2>Dominio: titularidad y renovación</h2>
            <p><a href="https://www.nic.py/" target="_blank" rel="noopener noreferrer">NIC-PY</a> administra el dominio territorial .py y ofrece consultas de disponibilidad, datos, vencimiento y solicitudes de modificación. Confirmá los procedimientos vigentes directamente allí antes de registrar o cambiar contactos.</p>
            <p>En tu entrega debería figurar quién es el titular, qué correo recibe avisos y quién puede gestionar cambios. El responsable técnico puede ser tu desarrollador sin que eso reemplace los datos de tu negocio. Pedí un documento de accesos y evitá depender de una sola persona o un correo que nadie revisa.</p>
            <p>El calendario importa: el vencimiento del dominio y el del hosting pueden ser distintos. Una factura de desarrollo pagada no prueba que las renovaciones futuras estén cubiertas.</p>
            <h2>Hosting: elegí según la web que vas a usar</h2>
            <p>Una web informativa, una tienda y un sistema con usuarios tienen necesidades diferentes. Preguntá qué plataforma se utiliza, cómo se publica un cambio y qué partes requieren servicios adicionales.</p>
            <ul><li><strong>Copias:</strong> qué se respalda, con qué frecuencia, cuánto se conserva y cómo se restaura.</li><li><strong>Recursos:</strong> almacenamiento, transferencia, base de datos y límites aplicables.</li><li><strong>Operación:</strong> quién revisa fallas y qué cubre el soporte.</li><li><strong>Salida:</strong> cómo obtenés archivos, datos y configuración al cambiar de proveedor.</li></ul>
            <p>Una copia del código no siempre incluye productos, mensajes, archivos subidos o usuarios. Si existe una base de datos, también necesita un procedimiento de respaldo. Pedí que se explique qué recuperarías ante una falla real.</p>
            <h2>Correo empresarial: más que una dirección bonita</h2>
            <p>Una cuenta como contacto@tunegocio.com.py permite mantener la identidad del negocio al cambiar de persona responsable. Para usarla necesitás un proveedor de correo, espacio, contraseñas recuperables y una configuración del dominio.</p>
            <p>El proveedor indicará los registros DNS correspondientes, como MX para la recepción y los mecanismos de autenticación que utilice para el envío. Esa configuración no garantiza que todo mensaje llegue a la bandeja principal: reputación, contenido y políticas del destinatario también influyen.</p>
            <p>Decidí cuántos buzones necesitás y qué direcciones pueden ser alias. Preguntá por recuperación de cuenta, autenticación adicional si está disponible, migración del correo anterior y quién administra altas y bajas.</p>
            <h2>Un cambio de DNS también puede afectar el correo</h2>
            <p>Imaginá que tu web sigue funcionando, pero cambiás los servidores de nombres para publicar una versión nueva. Si se trasladan los registros de la web y se olvidan los del correo, el sitio puede verse bien mientras los mensajes dejan de llegar.</p>
            <p>Antes de un cambio, pedí un inventario de registros y una comprobación posterior de recepción y envío. Anotá qué proveedor atiende cada servicio. El objetivo no es que memorices DNS, sino que la migración tenga responsables y pruebas.</p>
            <h2>Cómo comparar el costo anual</h2>
            <p>Pedí el importe inicial y la renovación de cada pieza, la periodicidad y los límites. Una propuesta puede incluir temporalmente hosting o dominio; otra puede cobrar gestión, correo y soporte por separado. Compará el mismo período y el mismo alcance.</p>
            <p>No existe una cifra universal para mantener cualquier sitio. El costo cambia con usuarios, tráfico, almacenamiento y servicios. Usá los <a href="/es/servicios/hosting-web-administrado">detalles de hosting administrado</a> y de <a href="/es/servicios/dominio-configuracion-web">dominio y configuración</a> como referencias de nuestros servicios, y confirmá qué incluye tu propuesta particular.</p>
            <h2>Checklist para recibir tu web</h2>
            <ol><li>Nombre del titular y contactos del dominio documentados.</li><li>Vencimientos y responsable de pago identificados.</li><li>Acceso al hosting o procedimiento acordado para solicitarlo.</li><li>Copias, recuperación y exportación de datos explicadas.</li><li>Cuentas de correo y responsables de recuperación definidos.</li><li>Pruebas de web, formulario, recepción y envío completadas.</li></ol>
            <p>Si estás por contratar, sumá esta lista a la <a href="/es/blog/presupuesto-diseno-web-paraguay-que-incluir">checklist para comparar presupuestos web</a>. Si ya tenés dominio y correo, <a href="/es#contacto">contanos qué necesitás publicar o trasladar</a> sin enviar contraseñas por el formulario.</p>
            <p><small>Referencia de administración de dominios consultada en NIC-PY el 12 de noviembre de 2026. Tarifas y requisitos deben confirmarse al contratar.</small></p>
        `,
        contentEn: `
            <p><strong>Your domain is the address, hosting publishes the website, and an email service sends and receives messages under your brand.</strong> They can be bundled, but they are separate services and may renew on different dates.</p>
            <p>For a business website in Paraguay, understanding these pieces makes proposals easier to compare and supplier changes easier to manage. Our <a href="/en/blog/registrar-dominio-com-py-paraguay">.com.py registration guide</a> covers registration. This article covers responsibilities, access and ongoing operation.</p>
            <h2>Three services and three responsibilities</h2>
            <table><caption>What each service provides</caption><thead><tr><th scope="col">Service</th><th scope="col">Purpose</th><th scope="col">Confirm</th></tr></thead><tbody>
                <tr><th scope="row">Domain</th><td>Your internet address</td><td>Registrant, contacts and expiry</td></tr>
                <tr><th scope="row">Hosting</th><td>Runs or publishes the website</td><td>Resources, backups and support</td></tr>
                <tr><th scope="row">Business email</th><td>Messages using your domain</td><td>Mailboxes, storage and recovery</td></tr>
            </tbody></table>
            <p>Buying a domain does not automatically create a website or mailbox. Hosting does not necessarily include email. A contact form might open WhatsApp, send email or save an enquiry: its destination is another decision to document.</p>
            <h2>Domain: registrant and renewal</h2>
            <p><a href="https://www.nic.py/" target="_blank" rel="noopener noreferrer">NIC-PY</a> administers Paraguay's .py domain and provides availability, domain data, expiry and modification services. Confirm current procedures there before registering or changing contacts.</p>
            <p>Your handover should identify the registrant, the address that receives renewal notices and who manages changes. The developer can be the technical contact without replacing the business's details. Keep an access document rather than depending on one person or an unmonitored email address.</p>
            <p>Domain and hosting expiry may differ. Paying for development does not prove future renewals are covered.</p>
            <h2>Hosting: match it to the application</h2>
            <p>An informational site, a shop and a system with user accounts have different needs. Ask which platform is used, how changes are published and which functions depend on additional services.</p>
            <ul><li><strong>Backups:</strong> what is saved, how often, retention and restoration.</li><li><strong>Resources:</strong> storage, bandwidth, database and service limits.</li><li><strong>Operation:</strong> who responds to failures and what support covers.</li><li><strong>Exit:</strong> how files, data and configuration can be exported.</li></ul>
            <p>A source-code copy does not necessarily contain products, uploaded files, users or messages. Databases need their own backup procedure. Ask what could actually be recovered after a failure.</p>
            <h2>Business email needs its own setup</h2>
            <p>An address such as contact@yourbusiness.com.py can remain with the business when staff change. It needs an email provider, storage, recoverable credentials and domain configuration.</p>
            <p>The provider specifies DNS settings such as MX records for receipt and the authentication mechanisms it uses for sending. Correct configuration does not guarantee inbox placement: reputation, message content and recipient policies also matter.</p>
            <p>Decide how many mailboxes you need and which addresses can be aliases. Ask about account recovery, additional authentication if available, old-mail migration and who administers staff changes.</p>
            <h2>DNS changes can affect working email</h2>
            <p>For example, you change nameservers to publish a new site. If the website records are transferred but mail records are omitted, the site can look fine while email stops arriving.</p>
            <p>Request a record inventory before migration and test sending and receiving afterwards. Document which provider runs each service. You do not need to memorise DNS: you need an accountable migration and clear checks.</p>
            <h2>Compare costs over the same period</h2>
            <p>Ask for initial and renewal amounts, billing frequency and limits for each item. One proposal may temporarily include hosting or a domain; another may charge separately for administration, email and support.</p>
            <p>There is no universal annual cost for every website. Usage, storage, accounts and external services change the price. Our <a href="/en/servicios/hosting-web-administrado">managed hosting</a> and <a href="/en/servicios/dominio-configuracion-web">domain setup services</a> describe our offering; confirm the exact scope in your own proposal.</p>
            <h2>A practical handover checklist</h2>
            <ol><li>Domain registrant and contacts documented.</li><li>Renewal dates and payer identified.</li><li>Hosting access or an agreed access procedure.</li><li>Backup, recovery and export explained.</li><li>Email accounts and recovery owners defined.</li><li>Website, form and email sending and receipt tested.</li></ol>
            <p>Use this with the <a href="/en/blog/presupuesto-diseno-web-paraguay-que-incluir">website proposal checklist</a>. If you already have a domain and email, <a href="/en#contacto">describe what needs publishing or migrating</a> without including passwords in the form.</p>
            <p><small>Domain administration reference checked against NIC-PY on November 12, 2026. Confirm current fees and requirements when ordering.</small></p>
        `,
    },
];
