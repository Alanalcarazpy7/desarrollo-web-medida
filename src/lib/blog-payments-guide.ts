import type { BlogPost } from './blog-data';

export const paymentsGuide: BlogPost = {
  slug: 'medios-de-pago-online-paraguay',
  title: 'Cómo cobrar por internet en Paraguay: medios de pago para tu web',
  titleEn: 'How to get paid online in Paraguay: payment methods for your website',
  excerpt: 'Transferencias, links de pago y checkout con Bancard. Qué verificar ante la situación de ueno y por qué ya no recomendamos dar por operativo upay/Pagopar.',
  excerptEn: 'Transfers, payment links and Bancard checkout. What to verify following developments at ueno and why upay/Pagopar should not be assumed operational.',
  date: '2026-09-01',
  updatedAt: '2026-11-12',
  author: 'Alan Alcaraz',
  category: 'E-commerce', categoryEn: 'E-commerce',
  image: '/blog/link-pago-pasarela.svg', readTime: '6 min',
  keywords: ['medios de pago online paraguay', 'como cobrar por internet', 'bancard tpago', 'pasarela de pago paraguay', 'tienda online paraguay'],
  keywordsEn: ['online payments paraguay', 'payment gateway paraguay', 'bancard tpago', 'get paid online paraguay'],
  content: `
    <p><strong>Para cobrar por internet en Paraguay podés coordinar una transferencia, enviar un link de pago o integrar un checkout en tu web.</strong> Elegí según cómo vendés, cómo confirmás el pedido y qué medios tiene habilitados tu comercio. Una página con un botón de pago no resuelve por sí sola stock, entrega ni facturación.</p>
    <aside class="article-note article-note-warning"><strong>Actualización: 12 de noviembre de 2026.</strong><p>El BCP comunicó el 3 de noviembre el inicio del proceso de resolución de ueno bank, dispuesto el 2 de noviembre. Por ese contexto, retiramos la recomendación de iniciar una integración con upay/Pagopar sin confirmar antes su disponibilidad, acreditaciones y soporte. Que una página comercial siga accesible no confirma que los cobros estén funcionando. Consultá el <a href="https://www.bcp.gov.py/web/institucional/w/banco-central-inicia-el-procedimiento-de-resolucion-de-ueno-bank" target="_blank" rel="noopener noreferrer">comunicado oficial del BCP</a>. No afirmamos que todos los servicios relacionados tengan exactamente la misma situación.</p></aside>
    <h2>Elegí primero cómo termina tu venta</h2>
    <p>Si vendés un servicio personalizado, normalmente primero confirmás alcance y precio. Un pedido por WhatsApp y una forma de cobro acordada pueden alcanzar. Si el producto tiene precio fijo y se entrega sin coordinación, un checkout conectado al pedido puede reducir trabajo manual.</p>
    <table><caption>Tres formas de cobrar y qué falta resolver</caption><thead><tr><th scope="col">Modalidad</th><th scope="col">Cuándo sirve</th><th scope="col">Confirmación</th><th scope="col">Trabajo pendiente</th></tr></thead><tbody>
    <tr><th scope="row">Transferencia coordinada</th><td>Servicios, ventas a pedido y montos acordados</td><td>Verificar el ingreso en la cuenta receptora</td><td>Relacionar pago, cliente y entrega</td></tr>
    <tr><th scope="row">Link de pago</th><td>Cobrar después de acordar una venta</td><td>Consultar la operación en el proveedor</td><td>Registrar el pedido y hacer seguimiento</td></tr>
    <tr><th scope="row">Checkout integrado</th><td>Compras con reglas y precios definidos</td><td>Verificación del servidor con el proveedor</td><td>Estados, stock, entrega y atención</td></tr>
    </tbody></table>
    <h2>Transferencias: simples, pero con verificación</h2>
    <p>Podés mostrar o compartir los datos de una cuenta habilitada para tu operación. Antes de entregar, comprobá que el dinero se haya acreditado: una captura de comprobante enviada por un cliente no sustituye esa revisión.</p>
    <p>No describimos las transferencias como universalmente gratuitas. Costos, límites, horarios y disponibilidad dependen de las entidades, del canal y del tipo de operación. Confirmá esas condiciones con tu banco; si hay una incidencia, ofrecé otra opción realmente habilitada.</p>
    <h2>Links de pago: cobrar sin construir una tienda completa</h2>
    <p>Un link abre una pantalla de cobro que podés compartir por WhatsApp, correo o desde una web. <a href="https://www.bancard.com.py/tpago" target="_blank" rel="noopener noreferrer">Bancard describe TPago</a> como una herramienta para compartir esos enlaces y aceptar medios de pago según la habilitación del comercio.</p>
    <p>Es útil cuando el pedido ya está acordado. La disponibilidad de una API o de confirmaciones automáticas es parte del producto concreto; no asumas que todos los links son completamente manuales ni que todos administran el pedido.</p>
    <h2>Checkout integrado: unir el cobro al pedido</h2>
    <p><a href="https://www.bancard.com.py/vpos" target="_blank" rel="noopener noreferrer">vPOS de Bancard</a> ofrece integración de cobros en sitios y aplicaciones. Antes de contratar desarrollo, pedí requisitos comerciales, documentación vigente, entorno de pruebas, medios habilitados y condiciones por escrito.</p>
    <p>Tu sistema debe distinguir aprobado, rechazado y pendiente. La confirmación debe comprobarse con el proveedor desde el servidor; visitar una página de agradecimiento no demuestra que un cliente pagó. Las notificaciones repetidas tampoco deben crear dos pedidos.</p>
    <h2>Qué cambió con upay y Pagopar</h2>
    <p>La versión anterior de esta guía presentaba Pagopar como una alternativa para empezar a cobrar. Esa recomendación se retira ante el contexto de ueno y la falta de una confirmación operativa específica suficiente para cada producto.</p>
    <p>Si ya usás uno de esos servicios, solicitá al proveedor el estado de tus operaciones, canales de soporte y condiciones aplicables. Para un proyecto nuevo, evaluá una alternativa que pueda confirmar el alta y el circuito de cobro de tu comercio. Conservamos las referencias a Pagopar en casos históricos del portfolio cuando describen lo que se construyó; no son recomendaciones actuales de contratación.</p>
    <h2>Pagos internacionales: no alcanza con que exista la marca</h2>
    <p>Poder pagar con una cuenta no significa poder recibir o retirar fondos como comercio. Para servicios internacionales, verificá el país de registro de tu entidad, medios admitidos, monedas, liquidación y condiciones de uso. No prometemos compatibilidad local universal con PayPal, Stripe ni otras plataformas por aparecer en una lista.</p>
    <h2>Qué pedir antes de integrar</h2>
    <ul><li>Confirmación del alta del comercio y de los productos habilitados.</li><li>Comisiones, cargos fijos, impuestos aplicables y acreditación vigentes.</li><li>Reglas de devoluciones y atención de operaciones pendientes.</li><li>Forma de relacionar una orden de tu web con el pago del proveedor.</li><li>Pruebas de aprobación, rechazo, interrupción y confirmación repetida.</li></ul>
    <p>No publicamos una tabla fija de comisiones porque puede variar por contrato y producto. El costo de integrar el cobro también es distinto de la comisión de procesarlo.</p>
    <h2>Cómo empezar con el alcance correcto</h2>
    <p>Si todavía necesitás conversar cada pedido, mirá la comparación entre <a href="/es/blog/catalogo-whatsapp-o-tienda-online-paraguay">catálogo por WhatsApp y tienda online</a>. Si ya definiste la venta, profundizá en <a href="/es/blog/link-de-pago-o-pasarela-paraguay">link de pago frente a pasarela integrada</a>.</p>
    <p>Para una propuesta, contanos qué vendés, a quién, cómo entregás y qué proveedor tenés habilitado. Podemos revisar un <a href="/es/servicios/desarrollo-web-catalogo">catálogo digital</a> o un <a href="/es/servicios/sistemas-informaticos-paraguay">sistema de pedidos a medida</a>. También podés <a href="/es/brief">preparar tu brief de proyecto</a> para ordenar esa información.</p>
  `,
  contentEn: `
    <p><strong>To collect online payments in Paraguay, you can arrange a bank transfer, share a payment link or connect checkout to your website.</strong> Choose according to your sales process and the services actually enabled for your business. A payment button alone does not manage inventory, delivery or invoicing.</p>
    <aside class="article-note article-note-warning"><strong>Updated November 12, 2026.</strong><p>The BCP announced on November 3 that ueno bank had entered a resolution process, decided on November 2. We have therefore withdrawn the recommendation to start an upay/Pagopar integration without specific confirmation of availability, settlement and support. An accessible marketing page is not proof of operational payment processing. Read the <a href="https://www.bcp.gov.py/web/institucional/w/banco-central-inicia-el-procedimiento-de-resolucion-de-ueno-bank" target="_blank" rel="noopener noreferrer">BCP announcement</a>. This does not establish identical operational status for every related service.</p></aside>
    <h2>Start with the way a sale ends</h2>
    <p>For a custom service, you usually agree scope and price first. WhatsApp ordering and an agreed payment method can be enough. For fixed-price products delivered without negotiation, checkout connected to an order can reduce manual work.</p>
    <table><caption>Payment methods and remaining responsibilities</caption><thead><tr><th scope="col">Method</th><th scope="col">Useful for</th><th scope="col">Verification</th><th scope="col">Remaining work</th></tr></thead><tbody>
    <tr><th scope="row">Arranged transfer</th><td>Services and made-to-order sales</td><td>Check receipt in the receiving account</td><td>Match payment and fulfilment</td></tr>
    <tr><th scope="row">Payment link</th><td>A sale already agreed</td><td>Inspect provider transaction status</td><td>Register and follow up the order</td></tr>
    <tr><th scope="row">Integrated checkout</th><td>Defined prices and fulfilment rules</td><td>Server verification with the provider</td><td>Status, stock, delivery and support</td></tr>
    </tbody></table>
    <h2>Transfers need verification</h2>
    <p>Share the details of an account enabled for your operation. Check actual receipt before delivery: a customer's screenshot is not a substitute. Transfers are not universally free; fees, limits and availability depend on the bank, channel and operation. Confirm terms and offer another enabled method when needed.</p>
    <h2>Payment links without a full store</h2>
    <p>A link takes the buyer to a payment screen and can be shared through WhatsApp, email or your website. <a href="https://www.bancard.com.py/tpago" target="_blank" rel="noopener noreferrer">Bancard TPago</a> describes this approach. Accepted methods depend on merchant approval. API access and automated confirmations are product-specific, not a feature of every link.</p>
    <h2>Integrated checkout connects the order</h2>
    <p><a href="https://www.bancard.com.py/vpos" target="_blank" rel="noopener noreferrer">Bancard vPOS</a> supports website and app integrations. Request merchant requirements, current documentation, testing facilities, enabled methods and written terms before commissioning development.</p>
    <p>The application must distinguish approved, declined and pending payments. Verify confirmation on the server; a thank-you page is not proof of payment. Repeated notifications must not duplicate orders.</p>
    <h2>Why the upay/Pagopar recommendation changed</h2>
    <p>The previous version recommended Pagopar as a way to start collecting payments. We have withdrawn that recommendation because of the ueno situation and insufficient confirmation of each product's current operation.</p>
    <p>Existing customers should request their transaction status and applicable support information directly. For a new project, evaluate a provider that can confirm onboarding and settlement for your business. Historical Pagopar references in our portfolio describe earlier work, not a current recommendation.</p>
    <h2>International services require country-specific checks</h2>
    <p>Being able to pay does not establish the ability to receive or withdraw funds as a business. Check the entity's registration country, accepted methods, currencies, settlement and account terms. We do not promise universal local compatibility with PayPal, Stripe or other platforms.</p>
    <h2>Before commissioning integration</h2>
    <ul><li>Confirm merchant approval and enabled products.</li><li>Obtain fees, charges, applicable taxes and settlement terms.</li><li>Define refunds and pending-payment support.</li><li>Match website orders to provider transactions.</li><li>Test approval, decline, interruption and repeated confirmation.</li></ul>
    <p>We do not publish a fixed fee table because product and contract terms vary. Development costs are separate from transaction charges.</p>
    <h2>Choose the right project scope</h2>
    <p>Compare a <a href="/en/blog/catalogo-whatsapp-o-tienda-online-paraguay">WhatsApp catalogue with an online store</a>, then read <a href="/en/blog/link-de-pago-o-pasarela-paraguay">payment links versus integrated gateways</a>. Tell us what you sell, who buys it, how it is delivered and which provider is enabled.</p>
    <p>See our <a href="/en/servicios/desarrollo-web-catalogo">catalogue service</a> or <a href="/en/servicios/sistemas-informaticos-paraguay">custom systems</a>, and <a href="/en/brief">prepare a project brief</a> before requesting a quote.</p>
  `,
};
