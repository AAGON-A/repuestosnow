# repuestosnow
Repository for new project AAG
⚙️ RepuestosNow — Repuestos Alemanes para Ecuador


Importación directa de repuestos industriales y automotrices alemanes a Ecuador.

Marcas originales · Entrega en 7–12 días · Cotización en 24h



🌐 Live: repuestosnow.com


🚀 Sobre el proyecto

RepuestosNow es una plataforma de importación directa de repuestos industriales y automotrices desde Alemania a Ecuador. Los talleres mecánicos y plantas industriales en Ecuador no tienen acceso fácil a marcas alemanas originales como Knipex, Bosch OEM, SKF, Wera o Sandvik — o las consiguen a precios inflados por intermediarios. RepuestosNow elimina ese problema.

El modelo: El cliente pide → cotizamos en 24h con precio final → compramos en Alemania → DHL Express en 3–5 días → aduana → entrega en Ecuador en 7–12 días totales.


🛠️ Stack tecnológico

TecnologíaUsoReact 18Frontend — UI y lógica del formularioVercelDeploy y hosting — CI/CD automáticoFormspreeBackend del formulario — envío de cotizaciones al emailWhatsApp Business APICanal de atención directa al clienteGoDaddy DNSGestión del dominio repuestosnow.com


📁 Estructura del proyecto

repuestosnow/
├── public/
│   └── index.html          # HTML base con meta tags SEO
├── src/
│   ├── App.js              # Componente principal — toda la landing
│   └── index.js            # Entry point de React
├── package.json            # Dependencias y scripts
└── README.md               # Este archivo


⚙️ Instalación y desarrollo local

Prerequisitos


Node.js 18+
npm o yarn


Clonar y correr localmente

bash# Clonar el repositorio
git clone https://github.com/TU_USUARIO/repuestosnow.git
cd repuestosnow

# Instalar dependencias
npm install

# Correr en desarrollo
npm start
# → Abre http://localhost:3000

Build para producción

bashnpm run build
# → Genera carpeta /build optimizada


🔧 Configuración

Antes de desplegar, edita las líneas 8–10 de src/App.js:

javascriptconst FORMSPREE_ID   = "TU_FORM_ID";           // → formspree.io → New Form → copia el ID
const WHATSAPP_NUM   = "593XXXXXXXXX";          // → tu número EC sin + ni espacios
const EMAIL_CONTACTO = "info@repuestosnow.com"; // → tu email real

Obtener el Formspree ID


Crear cuenta en formspree.io
Dashboard → New Form → nombre: RepuestosNow Cotizaciones
Copiar el Form ID (ej: xpwzbnkq)
Reemplazar en App.js



🌐 Despliegue en Vercel

El proyecto está conectado a Vercel con CI/CD automático. Cada push a main despliega automáticamente.

DNS configurado en GoDaddy

A      @     216.198.79.1                          ← apunta a Vercel
CNAME  www   4ca2dde1ea8baaaa.vercel-dns-017.com.  ← www redirige a Vercel

Despliegue manual

bash# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod


📦 Catálogo de marcas

CategoríaMarcas🔧 HerramientasKnipex · Wera · Wiha · Hazet🚗 AutomotrizBosch OEM · ATE/Continental · Lemförder/ZF · INA/Schaeffler⚙️ IndustrialSKF/FAG · Sandvik Coromant · Klüber · Mitutoyo


💰 Modelo de negocio

Cliente solicita cotización (web o WhatsApp)
        ↓
RepuestosNow cotiza en < 24h (precio final con flete + aduana)
        ↓
Cliente confirma y paga 50% de anticipo
        ↓
Compra en proveedor alemán (Autodoc, Kugellager-Express, distribuidores)
        ↓
DHL Express Alemania → Ecuador (3–5 días)
        ↓
Proceso aduanero Ecuador (2–5 días)
        ↓
Entrega al cliente + cobro 50% restante

Margen objetivo: 50–80% sobre costo importado

Ticket promedio: $80–350 USD

Tiempo de entrega: 7–12 días hábiles


🗺️ Roadmap


 Landing page con formulario de cotización
 Integración Formspree (email automático)
 Integración WhatsApp Business
 Dominio repuestosnow.com activo
 Catálogo online con precios de referencia
 Sistema de seguimiento de pedidos
 Panel de administración de cotizaciones
 Integración pago online (PayPhone Ecuador)
 Expansión a Colombia



📞 Contacto

CanalDetalle🌐 Webrepuestosnow.com💬 WhatsApp+593 XX XXX XXXX✉️ Emailinfo@repuestosnow.com📍 UbicaciónQuito, Ecuador


📄 Licencia

© 2026 RepuestosNow Ecuador. Todos los derechos reservados.

Proyecto privado — no disponible para uso comercial por terceros.


<div align="center">
  <strong>🇩🇪 Alemania → 🇪🇨 Ecuador</strong><br/>
  Hecho con ☕ desde Stuttgart · Operando desde Quito
</div>
