import { useState, useEffect } from "react";

// ════════════════════════════════════════════════════════════════════════════
//  REPUESTOSNOW — src/App.js
//  Versión: 1.1.0 — Legal + Comentada
//  Última actualización: Junio 2026
// ════════════════════════════════════════════════════════════════════════════

// ────────────────────────────────────────────────────────────────────────────
//  ⚙️  SECCIÓN 1 — CONFIGURACIÓN PRINCIPAL
//  Cambia SOLO estos valores para personalizar la página.
//  No necesitas tocar nada más del código.
// ────────────────────────────────────────────────────────────────────────────

const CONFIG = {
  // FORMULARIO — Obtén tu ID en formspree.io → New Form → copia el ID
  formspree_id: "meebkjrn",

  // WHATSAPP — Tu número de Ecuador sin + ni espacios (ej: 593987654321)
  whatsapp: "593XXXXXXXXX",

  // CONTACTO
  email: "info@repuestosnow.com",
  telefono: "+593 XX XXX XXXX",
  ciudad: "Cuenca, Ecuador",

  // EMPRESA — Actualiza cuando tengas RUC
  nombre_legal: "Andrés Abad",         // ← tu nombre completo como persona natural
  ruc: "EN TRÁMITE",                   // ← reemplazar con tu RUC cuando lo obtengas
  actividad: "Importación y comercialización de repuestos industriales y automotrices",

  // SEO — Título y descripción que aparecen en Google
  titulo_pagina: "RepuestosNow | Repuestos Alemanes Ecuador — Cotización en 24h",
  descripcion_seo: "Importación directa de repuestos alemanes a Ecuador. Knipex, Bosch, SKF, Wera. Entrega en 7–12 días. Cotización gratuita en 24h.",

  // REDES SOCIALES — Agrega tus links cuando los tengas
  instagram: "",   // ← ej: "https://instagram.com/repuestosnow"
  facebook: "",    // ← ej: "https://facebook.com/repuestosnow"
  linkedin: "",    // ← ej: "https://linkedin.com/company/repuestosnow"
};

// ────────────────────────────────────────────────────────────────────────────
//  🎨  SECCIÓN 2 — COLORES Y DISEÑO
//  Cambia aquí para modificar la paleta de colores de toda la página.
//  Formato: código hexadecimal (#RRGGBB)
// ────────────────────────────────────────────────────────────────────────────

const COLORES = {
  negro:        "#080808",   // fondo principal
  superficie:   "#101010",   // fondo de secciones alternadas
  superficie2:  "#161616",   // fondo de tarjetas
  superficie3:  "#1E1E1E",   // fondo de inputs del formulario
  borde:        "#242424",   // color de bordes y líneas
  naranja:      "#FF5C00",   // color principal de marca ← cambia aquí tu color
  naranjaHover: "#FF7530",   // naranja al hacer hover (un poco más claro)
  naranjaDim:   "#FF5C001A", // naranja transparente para fondos sutiles
  naranjaB:     "#FF5C0033", // naranja semi-transparente para bordes
  blanco:       "#FFFFFF",   // texto principal
  gris:         "#7A7A7A",   // texto secundario
  grisClaro:    "#B0B0B0",   // texto terciario
  grisOscuro:   "#383838",   // elementos muy discretos
  verde:        "#22C55E",   // confirmaciones y éxito
  verdeBg:      "#052E16",   // fondo verde oscuro
};

// ────────────────────────────────────────────────────────────────────────────
//  📦  SECCIÓN 3 — CATÁLOGO DE MARCAS
//  Agrega, elimina o modifica marcas aquí.
//  Campos: n (nombre), i (emoji/ícono), c (categoría), d (descripción)
//  Categorías disponibles: "Automotriz" | "Herramientas" | "Industrial"
// ────────────────────────────────────────────────────────────────────────────

const MARCAS = [
  { n:"Knipex",            i:"🔧", c:"Herramientas", d:"Alicates de precisión — estándar mundial" },
  { n:"Wera",              i:"🪛", c:"Herramientas", d:"Destornilladores ergonómicos Kraftform" },
  { n:"Wiha",              i:"⚡", c:"Herramientas", d:"Herramientas VDE certificadas 1000V" },
  { n:"Hazet",             i:"🔑", c:"Herramientas", d:"Llaves dinamométricas OEM Mercedes/BMW" },
  { n:"Bosch OEM",         i:"🚗", c:"Automotriz",   d:"Sensores, filtros y bujías originales" },
  { n:"ATE / Continental", i:"🛞", c:"Automotriz",   d:"Sistemas de frenado OEM" },
  { n:"Lemförder / ZF",    i:"🔗", c:"Automotriz",   d:"Dirección y suspensión BMW/Mercedes" },
  { n:"INA / Schaeffler",  i:"🏎️", c:"Automotriz",   d:"Kits de distribución y rodamientos" },
  { n:"SKF / FAG",         i:"⚙️", c:"Industrial",   d:"Rodamientos de precisión certificados" },
  { n:"Sandvik Coromant",  i:"🔩", c:"Industrial",   d:"Insertos CNC y herramientas de corte" },
  { n:"Klüber",            i:"🛢️", c:"Industrial",   d:"Lubricantes técnicos de alta precisión" },
  { n:"Mitutoyo",          i:"📏", c:"Industrial",   d:"Instrumentos de medición de precisión" },
  // ← AGREGAR NUEVA MARCA: { n:"Nombre", i:"emoji", c:"Categoría", d:"Descripción" },
];

// ────────────────────────────────────────────────────────────────────────────
//  🔄  SECCIÓN 4 — PROCESO DE COMPRA
//  Modifica los pasos del proceso aquí.
//  Campos: n (número), t (título), d (descripción), i (emoji)
// ────────────────────────────────────────────────────────────────────────────

const PROCESO = [
  { n:"01", t:"Pedís tu repuesto",     d:"Formulario o WhatsApp con nombre, marca y modelo.",          i:"📋" },
  { n:"02", t:"Cotización en 24h",     d:"Buscamos en Alemania y enviamos precio final con flete.",    i:"💬" },
  { n:"03", t:"Confirmás y pagás 50%", d:"Transferencia o efectivo. Sin costos ocultos.",              i:"💳" },
  { n:"04", t:"Importamos para vos",   d:"Compramos, gestionamos DHL y el proceso aduanero completo.",i:"✈️" },
  { n:"05", t:"Entrega en Ecuador",    d:"Cuenca, Quito o Guayaquil. Domicilio o retiro en bodega.",  i:"📦" },
];

// ────────────────────────────────────────────────────────────────────────────
//  ✅  SECCIÓN 5 — DIFERENCIADORES
//  Los 6 puntos de "Por qué elegirnos". Modifica textos aquí.
// ────────────────────────────────────────────────────────────────────────────

const DIFERENCIADORES = [
  { i:"🇩🇪", t:"100% piezas originales",   d:"Directo de distribuidores alemanes certificados. Sin copias, sin intermediarios asiáticos." },
  { i:"⚡",  t:"Entrega en 7–12 días",      d:"Flete aéreo DHL Express. Del taller en Alemania al tuyo en Ecuador." },
  { i:"✅",  t:"Garantía de autenticidad",  d:"Factura del proveedor europeo incluida en cada envío. Trazabilidad total." },
  { i:"💰",  t:"Hasta 40% más barato",      d:"Sin stock propio = sin sobreprecio de almacenaje. Precio directo de importación." },
  { i:"🔩",  t:"Cualquier referencia",      d:"Si existe en Alemania, lo conseguimos. Piezas descontinuadas, especiales, fuera de catálogo." },
  { i:"📞",  t:"Asesoría técnica incluida", d:"Ingeniero mecánico con experiencia en Mercedes-Benz resuelve tus dudas." },
];

// ────────────────────────────────────────────────────────────────────────────
//  ❓  SECCIÓN 6 — PREGUNTAS FRECUENTES (FAQ)
//  Agrega o modifica preguntas/respuestas aquí.
//  Campos: q (pregunta), a (respuesta)
// ────────────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "¿Cuánto tarda en llegar?",
    a: "7–12 días hábiles desde la confirmación. Flete aéreo DHL: 3–5 días + trámite aduanero: 2–5 días."
  },
  {
    q: "¿Cómo sé que la pieza es original?",
    a: "Cada envío incluye la factura del proveedor europeo con número de lote. Verificable directamente con el fabricante."
  },
  {
    q: "¿Qué pasa si la pieza no es la correcta?",
    a: "Si el error fue nuestro, hacemos el cambio sin costo. Si fue un error en la especificación del cliente, coordinamos la devolución al proveedor."
  },
  {
    q: "¿Aceptan pedidos por volumen?",
    a: "Sí. Para pedidos mayores a $500 aplicamos descuento especial. Escríbenos al WhatsApp para cotización de volumen."
  },
  {
    q: "¿Consiguen piezas que no están en el catálogo?",
    a: "Absolutamente. Si existe en Alemania, lo conseguimos. Solo necesitamos el número de parte OEM o descripción técnica."
  },
  {
    q: "¿Cuáles son las formas de pago?",
    a: "Transferencia bancaria, efectivo en entrega (pedidos hasta $300). 50% al confirmar, 50% a la entrega. Sin pago, no procesamos el pedido."
  },
  // ← AGREGAR PREGUNTA: { q: "Tu pregunta", a: "Tu respuesta" },
];

// ────────────────────────────────────────────────────────────────────────────
//  📜  SECCIÓN 7 — TEXTOS LEGALES
//  IMPORTANTE: Actualiza estos textos cuando obtengas tu RUC y empresa.
//  Como persona natural, estos textos son suficientes para operar legalmente.
// ────────────────────────────────────────────────────────────────────────────

const LEGAL = {
  // Texto del footer — actualizar con RUC real cuando lo tengas
  pie_pagina: `© ${new Date().getFullYear()} RepuestosNow · Andrés Abad · Cuenca, Ecuador · Todos los derechos reservados.`,

  // Aviso legal general — aparece en footer
  aviso: "Importador independiente registrado en Ecuador. Los precios incluyen flete y aranceles estimados. El precio final se confirma en la cotización.",

  // Política de privacidad — resumen mínimo legal
  privacidad: `RepuestosNow recopila únicamente los datos personales necesarios para procesar tu cotización (nombre, email, teléfono). 
Estos datos no se comparten con terceros ni se usan para publicidad. 
Puedes solicitar la eliminación de tus datos en cualquier momento escribiendo a ${CONFIG.email}. 
Al enviar el formulario, aceptas el uso de tus datos para gestionar tu solicitud de cotización.`,

  // Términos de servicio — resumen mínimo legal
  terminos: `RepuestosNow actúa como intermediario de importación entre proveedores europeos y clientes en Ecuador.
Los precios cotizados incluyen el costo del producto, flete aéreo estimado y aranceles estimados. El precio final puede variar ±5% según el tipo de cambio y tasas aduaneras vigentes al momento de la importación.
El 50% de anticipo no es reembolsable una vez que la orden fue confirmada y enviada al proveedor europeo.
El plazo de entrega de 7–12 días es estimado y puede variar por causas ajenas a RepuestosNow (retenciones aduaneras, fuerza mayor).
Todas las disputas se resolverán bajo la legislación ecuatoriana vigente.`,
};

// ════════════════════════════════════════════════════════════════════════════
//  COMPONENTES — No necesitas modificar nada debajo de esta línea
//  a menos que quieras cambiar la estructura visual de la página.
// ════════════════════════════════════════════════════════════════════════════

// ── NAVBAR — Barra de navegación fija superior ────────────────────────────
function NavBar() {
  const [solid, setSolid] = useState(false);

  // Se vuelve sólida al hacer scroll
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const ir = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: solid ? "rgba(8,8,8,0.97)" : "transparent",
      borderBottom: solid ? `1px solid ${COLORES.borde}` : "none",
      backdropFilter: solid ? "blur(18px)" : "none",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 66,
        display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo — modifica el nombre en CONFIG.nombre_legal */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div style={{ width: 36, height: 36, background: COLORES.naranja, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚙️</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 900, color: COLORES.blanco, letterSpacing: "-0.5px", lineHeight: 1 }}>
              Repuestos<span style={{ color: COLORES.naranja }}>Now</span>
            </div>
            <div style={{ fontSize: 9, color: COLORES.grisOscuro, letterSpacing: 2, textTransform: "uppercase" }}>
              Ecuador · Piezas Alemanas
            </div>
          </div>
        </div>

        {/* Links de navegación */}
        <div style={{ display: "flex", gap: 26, alignItems: "center" }}>
          {[["Marcas", "marcas"], ["Cómo funciona", "proceso"], ["FAQ", "faq"]].map(([label, id]) => (
            <button key={id} onClick={() => ir(id)}
              style={{ background: "none", border: "none", color: COLORES.gris, fontSize: 13,
                cursor: "pointer", fontWeight: 500, padding: 0, transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = COLORES.blanco}
              onMouseLeave={e => e.target.style.color = COLORES.gris}>
              {label}
            </button>
          ))}

          {/* Botón CTA principal */}
          <button onClick={() => ir("cotizar")}
            style={{ background: COLORES.naranja, border: "none", color: COLORES.blanco,
              fontSize: 13, fontWeight: 800, padding: "10px 22px", borderRadius: 8,
              cursor: "pointer", transition: "background 0.15s", letterSpacing: 0.3 }}
            onMouseEnter={e => e.target.style.background = COLORES.naranjaHover}
            onMouseLeave={e => e.target.style.background = COLORES.naranja}>
            Cotizar ahora →
          </button>
        </div>
      </div>
    </nav>
  );
}

// ── HERO — Sección principal de impacto ───────────────────────────────────
function Hero() {
  const ir = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section style={{ minHeight: "100vh", background: COLORES.negro, display: "flex",
      alignItems: "center", position: "relative", overflow: "hidden", padding: "130px 24px 90px" }}>

      {/* Fondos decorativos — grilla sutil */}
      <div style={{ position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${COLORES.borde} 1px, transparent 1px), linear-gradient(90deg, ${COLORES.borde} 1px, transparent 1px)`,
        backgroundSize: "60px 60px", opacity: 0.15, pointerEvents: "none" }} />

      {/* Resplandor naranja diagonal */}
      <div style={{ position: "absolute", top: "5%", right: "0", width: "50%", height: "90%",
        background: "radial-gradient(ellipse at 80% 20%, #FF5C0014 0%, transparent 65%)",
        pointerEvents: "none" }} />

      {/* Línea vertical decorativa */}
      <div style={{ position: "absolute", top: "20%", right: "18%", width: 1.5, height: "55%",
        background: `linear-gradient(to bottom, transparent, ${COLORES.naranja}60, transparent)`,
        pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1, width: "100%" }}>

        {/* Badge superior — modifica el texto aquí */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8,
          background: COLORES.naranjaDim, border: `1px solid ${COLORES.naranjaB}`,
          borderRadius: 100, padding: "7px 16px", marginBottom: 40 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: COLORES.naranja,
            animation: "blink 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: COLORES.naranja,
            letterSpacing: 2.5, textTransform: "uppercase" }}>
            🇩🇪 Repuestos Alemanes Originales · Entrega Ecuador 7–12 días
          </span>
        </div>

        {/* Titular principal — modifica el texto aquí */}
        <h1 style={{ fontSize: "clamp(44px,7.5vw,82px)", fontWeight: 900, color: COLORES.blanco,
          lineHeight: 0.92, margin: "0 0 30px", letterSpacing: "-2.5px",
          textTransform: "uppercase", maxWidth: 740 }}>
          PIEZAS<br />
          <span style={{ color: COLORES.naranja }}>ALEMANAS</span><br />
          EN TU TALLER<br />
          <span style={{ WebkitTextStroke: `1px ${COLORES.grisOscuro}`, color: "transparent" }}>EN 7 DÍAS.</span>
        </h1>

        {/* Subtítulo — modifica aquí */}
        <p style={{ fontSize: 17, color: COLORES.gris, maxWidth: 520, lineHeight: 1.8, marginBottom: 48 }}>
          Importamos desde Alemania las marcas premium que talleres y plantas industriales
          en Ecuador no consiguen — o pagan de más por ellas.
        </p>

        {/* Botones CTA */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 80 }}>
          <button onClick={() => ir("cotizar")}
            style={{ background: COLORES.naranja, border: "none", color: COLORES.blanco,
              fontSize: 16, fontWeight: 800, padding: "17px 36px", borderRadius: 10,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
              transition: "all 0.2s", boxShadow: `0 0 32px ${COLORES.naranja}40` }}
            onMouseEnter={e => { e.currentTarget.style.background = COLORES.naranjaHover; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = COLORES.naranja; e.currentTarget.style.transform = "none"; }}>
            📋 Pedir cotización gratis
          </button>

          <a href={`https://wa.me/${CONFIG.whatsapp}?text=Hola+RepuestosNow!+Necesito+cotizar+un+repuesto`}
            target="_blank" rel="noreferrer"
            style={{ border: `1.5px solid ${COLORES.borde}`, background: "transparent",
              color: COLORES.grisClaro, fontSize: 16, fontWeight: 600, padding: "17px 30px",
              borderRadius: 10, cursor: "pointer", textDecoration: "none",
              display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = COLORES.naranja; e.currentTarget.style.color = COLORES.blanco; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = COLORES.borde; e.currentTarget.style.color = COLORES.grisClaro; }}>
            💬 WhatsApp directo
          </a>
        </div>

        {/* Estadísticas — modifica los números aquí */}
        <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
          {[
            ["12+",   "Marcas alemanas"],
            ["7–12",  "Días de entrega"],
            ["40%",   "Más barato que local"],
            ["100%",  "Piezas originales"],
          ].map(([num, label], i, arr) => (
            <div key={label} style={{
              paddingRight: 48, marginRight: 48, marginBottom: 16,
              borderRight: i < arr.length - 1 ? `1px solid ${COLORES.borde}` : "none"
            }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: COLORES.naranja, lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 11, color: COLORES.grisOscuro, marginTop: 5,
                letterSpacing: 1, textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── MARCAS — Grid de marcas con filtro por categoría ──────────────────────
function Marcas() {
  const [filtro, setFiltro] = useState("Todas");
  const categorias = ["Todas", "Automotriz", "Herramientas", "Industrial"];
  const lista = filtro === "Todas" ? MARCAS : MARCAS.filter(m => m.c === filtro);

  return (
    <section id="marcas" style={{ background: COLORES.superficie, padding: "96px 24px",
      borderTop: `1px solid ${COLORES.borde}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORES.naranja,
            letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Catálogo de marcas</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: COLORES.blanco,
            margin: 0, letterSpacing: "-1.5px" }}>
            Las marcas que los<br /><span style={{ color: COLORES.naranja }}>mejores talleres</span> usan
          </h2>
        </div>

        {/* Botones de filtro por categoría */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
          {categorias.map(cat => (
            <button key={cat} onClick={() => setFiltro(cat)}
              style={{ padding: "7px 18px", fontSize: 12, fontWeight: 600,
                borderRadius: 100, cursor: "pointer", transition: "all 0.15s", letterSpacing: 0.3,
                background: filtro === cat ? COLORES.naranja : "transparent",
                color: filtro === cat ? COLORES.blanco : COLORES.gris,
                border: `1.5px solid ${filtro === cat ? COLORES.naranja : COLORES.borde}` }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de tarjetas de marcas */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(248px, 1fr))", gap: 12 }}>
          {lista.map(marca => (
            <div key={marca.n}
              style={{ background: COLORES.superficie2, border: `1px solid ${COLORES.borde}`,
                borderRadius: 12, padding: 22, transition: "all 0.2s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = COLORES.naranja; e.currentTarget.style.background = "#1D1D1D"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = COLORES.borde; e.currentTarget.style.background = COLORES.superficie2; e.currentTarget.style.transform = "none"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 30 }}>{marca.i}</span>
                <span style={{ fontSize: 10, background: COLORES.naranjaDim, color: COLORES.naranja,
                  padding: "2px 9px", borderRadius: 100, fontWeight: 700, letterSpacing: 1 }}>{marca.c}</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: COLORES.blanco, marginBottom: 5 }}>{marca.n}</div>
              <div style={{ fontSize: 12, color: COLORES.gris, lineHeight: 1.5 }}>{marca.d}</div>
            </div>
          ))}
        </div>

        {/* Aviso de marcas adicionales */}
        <div style={{ marginTop: 28, padding: "14px 20px", background: COLORES.naranjaDim,
          border: `1px solid ${COLORES.naranjaB}`, borderRadius: 10 }}>
          <span style={{ fontSize: 13, color: COLORES.grisClaro }}>
            <span style={{ color: COLORES.naranja, fontWeight: 700 }}>¿No ves lo que buscás?</span>{" "}
            Si existe en Alemania, lo conseguimos. Mandanos el número de parte OEM o la descripción técnica.
          </span>
        </div>
      </div>
    </section>
  );
}

// ── PROCESO — Pasos del proceso de compra ─────────────────────────────────
function Proceso() {
  return (
    <section id="proceso" style={{ background: COLORES.negro, padding: "96px 24px",
      borderTop: `1px solid ${COLORES.borde}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORES.naranja,
            letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Cómo funciona</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: COLORES.blanco,
            margin: 0, letterSpacing: "-1.5px" }}>
            De Alemania a tu taller<br /><span style={{ color: COLORES.naranja }}>sin complicaciones</span>
          </h2>
        </div>

        {/* Timeline de pasos */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, position: "relative" }}>
          {/* Línea conectora */}
          <div style={{ position: "absolute", top: 28, left: "10%", right: "10%", height: 2,
            background: `linear-gradient(to right, ${COLORES.naranja}, ${COLORES.grisOscuro})`, zIndex: 0 }} />

          {PROCESO.map((paso, i) => (
            <div key={i} style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "0 8px" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%",
                background: i === 0 ? COLORES.naranja : COLORES.superficie2,
                border: `2px solid ${i === 0 ? COLORES.naranja : COLORES.borde}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px", fontSize: 22,
                boxShadow: i === 0 ? `0 0 20px ${COLORES.naranja}50` : "none" }}>
                {paso.i}
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, color: COLORES.naranja, letterSpacing: 2, marginBottom: 6 }}>{paso.n}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORES.blanco, marginBottom: 7, lineHeight: 1.3 }}>{paso.t}</div>
              <div style={{ fontSize: 11, color: COLORES.gris, lineHeight: 1.6 }}>{paso.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── DIFERENCIADORES — Por qué elegirnos ──────────────────────────────────
function Diferenciadores() {
  return (
    <section style={{ background: COLORES.superficie, padding: "80px 24px",
      borderTop: `1px solid ${COLORES.borde}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORES.naranja,
            letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Por qué elegirnos</div>
          <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 900, color: COLORES.blanco,
            margin: 0, letterSpacing: "-1px" }}>
            No somos otro<br /><span style={{ color: COLORES.naranja }}>intermediario genérico</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
          {DIFERENCIADORES.map((d, i) => (
            <div key={i} style={{ background: COLORES.superficie2, border: `1px solid ${COLORES.borde}`,
              borderRadius: 12, padding: 24, display: "flex", gap: 16 }}>
              <div style={{ fontSize: 30, flexShrink: 0 }}>{d.i}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: COLORES.blanco, marginBottom: 6 }}>{d.t}</div>
                <div style={{ fontSize: 13, color: COLORES.gris, lineHeight: 1.6 }}>{d.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FORMULARIO DE COTIZACIÓN — Con integración Formspree ──────────────────
function Cotizar() {
  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "", empresa: "", email: "", telefono: "",
    pieza: "", marca: "", modelo: "", cantidad: "1",
    urgente: false, notas: ""
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Envío del formulario a Formspree
  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${CONFIG.formspree_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          urgente: form.urgente ? "⚡ SÍ — URGENTE" : "No",
          _subject: `🔧 RepuestosNow${form.urgente ? " ⚡URGENTE" : ""} — ${form.pieza}`,
          _replyto: form.email,
          // Timestamp para registro
          _fecha: new Date().toLocaleString("es-EC", { timeZone: "America/Guayaquil" }),
        }),
      });

      if (res.ok) {
        setStatus("success");
        // Abrir WhatsApp con mensaje precargado automáticamente
        const msg = encodeURIComponent(
          `Hola RepuestosNow! 🔧 Acabo de enviar una cotización por la web.\n\n` +
          `📋 *Pieza:* ${form.pieza}\n` +
          `🏷️ *Marca:* ${form.marca || "Sin preferencia"}\n` +
          `🚗 *Vehículo/Máquina:* ${form.modelo || "N/A"}\n` +
          `🔢 *Cantidad:* ${form.cantidad}\n` +
          `${form.urgente ? "⚡ *URGENTE*\n" : ""}` +
          `${form.notas ? `\n📝 ${form.notas}` : ""}`
        );
        setTimeout(() => window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`, "_blank"), 1000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // Estilos reutilizables para inputs
  const estiloInput = {
    width: "100%", padding: "12px 14px", background: COLORES.superficie3,
    border: `1.5px solid ${COLORES.borde}`, borderRadius: 8, color: COLORES.blanco,
    fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit",
    transition: "border-color 0.2s",
  };
  const estiloLabel = {
    fontSize: 12, fontWeight: 600, color: COLORES.grisClaro,
    marginBottom: 6, display: "block", letterSpacing: 0.2,
  };

  // Pantalla de éxito tras envío
  if (status === "success") return (
    <section id="cotizar" style={{ background: COLORES.negro, padding: "96px 24px",
      borderTop: `1px solid ${COLORES.borde}` }}>
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 76, marginBottom: 24 }}>✅</div>
        <h2 style={{ fontSize: 34, fontWeight: 900, color: COLORES.blanco, margin: "0 0 16px" }}>
          ¡Solicitud recibida!
        </h2>
        <p style={{ fontSize: 15, color: COLORES.gris, lineHeight: 1.8, marginBottom: 36 }}>
          Te contactamos en menos de <strong style={{ color: COLORES.naranja }}>24 horas hábiles</strong>{" "}
          con precio final incluyendo flete y aduana.
        </p>
        <a href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366",
            color: COLORES.blanco, padding: "14px 28px", borderRadius: 10, textDecoration: "none",
            fontWeight: 800, fontSize: 15 }}>
          💬 Continuar por WhatsApp
        </a>
        <br />
        <button onClick={() => { setStatus("idle"); setForm({ nombre:"",empresa:"",email:"",telefono:"",pieza:"",marca:"",modelo:"",cantidad:"1",urgente:false,notas:"" }); }}
          style={{ background: "none", border: "none", color: COLORES.naranja,
            cursor: "pointer", fontSize: 13, marginTop: 20, textDecoration: "underline" }}>
          Hacer otra cotización
        </button>
      </div>
    </section>
  );

  return (
    <section id="cotizar" style={{ background: COLORES.negro, padding: "96px 24px",
      borderTop: `1px solid ${COLORES.borde}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: 64, alignItems: "start" }}>

          {/* Panel izquierdo — información */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORES.naranja,
              letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Cotización gratuita</div>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 900, color: COLORES.blanco,
              margin: "0 0 22px", letterSpacing: "-1px", lineHeight: 1.08 }}>
              Pedí tu pieza.<br />
              <span style={{ color: COLORES.naranja }}>La buscamos.</span><br />
              Te cotizamos.
            </h2>
            <p style={{ fontSize: 14, color: COLORES.gris, lineHeight: 1.8, marginBottom: 28 }}>
              Sin compromiso. Sin registro. Completá el formulario y respondemos en menos de 24 horas
              con precio final incluyendo flete y aduana.
            </p>
            {["✅ Cotización gratuita en menos de 24h",
              "✅ Precio final con flete y aduana incluidos",
              "✅ Factura del proveedor alemán en cada envío",
              "✅ Garantía de autenticidad de marca",
              `✅ Entrega Cuenca · Quito · Guayaquil`].map(t => (
              <div key={t} style={{ fontSize: 13, color: COLORES.grisClaro, marginBottom: 9 }}>{t}</div>
            ))}

            {/* Aviso legal breve junto al formulario */}
            <div style={{ marginTop: 24, padding: "12px 16px", background: COLORES.superficie2,
              border: `1px solid ${COLORES.borde}`, borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: COLORES.grisOscuro, lineHeight: 1.6 }}>
                📋 Al enviar este formulario aceptás que RepuestosNow use tus datos
                únicamente para procesar tu cotización. Sin spam. Sin terceros.
              </div>
            </div>

            {/* Contacto directo */}
            <div style={{ marginTop: 12, padding: "16px 20px", background: COLORES.naranjaDim,
              border: `1px solid ${COLORES.naranjaB}`, borderRadius: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORES.naranja, marginBottom: 7 }}>
                ¿Preferís hablar directo?
              </div>
              <a href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noreferrer"
                style={{ fontSize: 14, color: COLORES.blanco, textDecoration: "none",
                  display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
                💬 WhatsApp: {CONFIG.telefono}
              </a>
            </div>
            <div style={{ padding: "14px 20px", background: COLORES.superficie2,
              border: `1px solid ${COLORES.borde}`, borderRadius: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORES.grisClaro, marginBottom: 5 }}>✉️ Email</div>
              <a href={`mailto:${CONFIG.email}`}
                style={{ fontSize: 13, color: COLORES.naranja, textDecoration: "none" }}>{CONFIG.email}</a>
            </div>
          </div>

          {/* Panel derecho — formulario */}
          <form onSubmit={handleSubmit} style={{ background: COLORES.superficie,
            border: `1px solid ${COLORES.borde}`, borderRadius: 16, padding: 36 }}>

            {/* Datos personales */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={estiloLabel}>Nombre completo *</label>
                <input required value={form.nombre} onChange={e => set("nombre", e.target.value)}
                  placeholder="Juan Pérez" style={estiloInput}
                  onFocus={e => e.target.style.borderColor = COLORES.naranja}
                  onBlur={e => e.target.style.borderColor = COLORES.borde} />
              </div>
              <div>
                <label style={estiloLabel}>Empresa / Taller</label>
                <input value={form.empresa} onChange={e => set("empresa", e.target.value)}
                  placeholder="Taller Pérez Hnos." style={estiloInput}
                  onFocus={e => e.target.style.borderColor = COLORES.naranja}
                  onBlur={e => e.target.style.borderColor = COLORES.borde} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
              <div>
                <label style={estiloLabel}>Email *</label>
                <input required type="email" value={form.email} onChange={e => set("email", e.target.value)}
                  placeholder="juan@correo.com" style={estiloInput}
                  onFocus={e => e.target.style.borderColor = COLORES.naranja}
                  onBlur={e => e.target.style.borderColor = COLORES.borde} />
              </div>
              <div>
                <label style={estiloLabel}>WhatsApp *</label>
                <input required value={form.telefono} onChange={e => set("telefono", e.target.value)}
                  placeholder="+593 99 XXX XXXX" style={estiloInput}
                  onFocus={e => e.target.style.borderColor = COLORES.naranja}
                  onBlur={e => e.target.style.borderColor = COLORES.borde} />
              </div>
            </div>

            <div style={{ height: 1, background: COLORES.borde, marginBottom: 20 }} />
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORES.naranja,
              letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Datos del repuesto</div>

            <div style={{ marginBottom: 14 }}>
              <label style={estiloLabel}>¿Qué pieza necesitás? *</label>
              <input required value={form.pieza} onChange={e => set("pieza", e.target.value)}
                placeholder="Ej: Sensor MAF, Alicates Knipex Cobra 250mm, Kit distribución OM651..."
                style={estiloInput}
                onFocus={e => e.target.style.borderColor = COLORES.naranja}
                onBlur={e => e.target.style.borderColor = COLORES.borde} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 72px", gap: 12, marginBottom: 14 }}>
              <div>
                <label style={estiloLabel}>Marca preferida</label>
                <input value={form.marca} onChange={e => set("marca", e.target.value)}
                  placeholder="Bosch, Knipex, SKF..." style={estiloInput}
                  onFocus={e => e.target.style.borderColor = COLORES.naranja}
                  onBlur={e => e.target.style.borderColor = COLORES.borde} />
              </div>
              <div>
                <label style={estiloLabel}>Vehículo / Máquina</label>
                <input value={form.modelo} onChange={e => set("modelo", e.target.value)}
                  placeholder="Mercedes C200 2019..." style={estiloInput}
                  onFocus={e => e.target.style.borderColor = COLORES.naranja}
                  onBlur={e => e.target.style.borderColor = COLORES.borde} />
              </div>
              <div>
                <label style={estiloLabel}>Cantidad</label>
                <input type="number" min="1" value={form.cantidad}
                  onChange={e => set("cantidad", e.target.value)} style={estiloInput}
                  onFocus={e => e.target.style.borderColor = COLORES.naranja}
                  onBlur={e => e.target.style.borderColor = COLORES.borde} />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={estiloLabel}>
                Notas adicionales (número de parte OEM, marca alternativa aceptada, especificaciones...)
              </label>
              <textarea value={form.notas} onChange={e => set("notas", e.target.value)} rows={3}
                placeholder="Nro de parte: A6510901400 / Acepto INA o Gates como alternativa..."
                style={{ ...estiloInput, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = COLORES.naranja}
                onBlur={e => e.target.style.borderColor = COLORES.borde} />
            </div>

            {/* Toggle pedido urgente */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, cursor: "pointer" }}
              onClick={() => set("urgente", !form.urgente)}>
              <div style={{ width: 40, height: 22, borderRadius: 100,
                background: form.urgente ? COLORES.naranja : COLORES.borde,
                position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                <div style={{ position: "absolute", top: 4, left: form.urgente ? 20 : 4,
                  width: 14, height: 14, borderRadius: "50%", background: COLORES.blanco,
                  transition: "left 0.2s" }} />
              </div>
              <span style={{ fontSize: 13, color: form.urgente ? COLORES.naranja : COLORES.gris,
                fontWeight: form.urgente ? 700 : 400 }}>
                ⚡ Pedido urgente — necesito respuesta hoy
              </span>
            </div>

            {/* Error */}
            {status === "error" && (
              <div style={{ background: "#1A0505", border: "1px solid #EF444430",
                borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 13, color: "#EF4444" }}>
                ⚠️ Error al enviar. Escribinos directamente al WhatsApp para no perder tiempo.
              </div>
            )}

            {/* Botón submit */}
            <button type="submit" disabled={status === "loading"}
              style={{ width: "100%", padding: "16px", background: status === "loading" ? COLORES.grisOscuro : COLORES.naranja,
                border: "none", color: COLORES.blanco, fontSize: 15, fontWeight: 900,
                borderRadius: 10, cursor: status === "loading" ? "not-allowed" : "pointer",
                letterSpacing: 0.3, transition: "all 0.2s",
                boxShadow: status !== "loading" ? `0 0 24px ${COLORES.naranja}35` : "none" }}
              onMouseEnter={e => status !== "loading" && (e.target.style.background = COLORES.naranjaHover)}
              onMouseLeave={e => status !== "loading" && (e.target.style.background = COLORES.naranja)}>
              {status === "loading" ? "⏳ Enviando..." : "📋 Solicitar cotización gratuita →"}
            </button>

            {/* Aviso de privacidad bajo el botón */}
            <p style={{ fontSize: 11, color: COLORES.grisOscuro, textAlign: "center", marginTop: 10 }}>
              Al enviar aceptás nuestra{" "}
              <button onClick={() => document.getElementById("privacidad")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "none", border: "none", color: COLORES.naranja,
                  cursor: "pointer", fontSize: 11, textDecoration: "underline", padding: 0 }}>
                política de privacidad
              </button>
              . Sin spam.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

// ── FAQ — Preguntas frecuentes ─────────────────────────────────────────────
function FAQ() {
  const [abierto, setAbierto] = useState(null);

  return (
    <section id="faq" style={{ background: COLORES.superficie, padding: "96px 24px",
      borderTop: `1px solid ${COLORES.borde}` }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORES.naranja,
            letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>FAQ</div>
          <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, color: COLORES.blanco,
            margin: 0, letterSpacing: "-1px" }}>Preguntas frecuentes</h2>
        </div>
        {FAQS.map((faq, i) => (
          <div key={i} style={{ background: COLORES.superficie2,
            border: `1px solid ${abierto === i ? COLORES.naranja : COLORES.borde}`,
            borderRadius: 10, marginBottom: 8, overflow: "hidden", transition: "border-color 0.2s" }}>
            <button onClick={() => setAbierto(abierto === i ? null : i)}
              style={{ width: "100%", padding: "17px 20px", background: "none", border: "none",
                color: COLORES.blanco, fontSize: 14, fontWeight: 600, cursor: "pointer",
                textAlign: "left", display: "flex", justifyContent: "space-between",
                alignItems: "center", gap: 12 }}>
              <span>{faq.q}</span>
              <span style={{ color: COLORES.naranja, fontSize: 24, flexShrink: 0,
                transition: "transform 0.25s", transform: abierto === i ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            {abierto === i && (
              <div style={{ padding: "0 20px 17px", fontSize: 13, color: COLORES.gris,
                lineHeight: 1.8, borderTop: `1px solid ${COLORES.borde}`, paddingTop: 14 }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── BANNER WHATSAPP — CTA secundario ──────────────────────────────────────
function WABanner() {
  return (
    <section style={{ background: COLORES.naranja, padding: "54px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex",
        justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 900, color: COLORES.blanco,
            letterSpacing: "-0.5px", marginBottom: 7 }}>¿Ya sabés exactamente lo que necesitás?</div>
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.8)" }}>
            Mandanos el número de parte por WhatsApp y cotizamos en minutos.
          </div>
        </div>
        <a href={`https://wa.me/${CONFIG.whatsapp}?text=Hola+RepuestosNow!+Necesito+cotizar`}
          target="_blank" rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 10, background: COLORES.negro,
            color: COLORES.blanco, padding: "15px 30px", borderRadius: 10, textDecoration: "none",
            fontWeight: 800, fontSize: 15, whiteSpace: "nowrap", transition: "opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
          💬 Escribir al WhatsApp
        </a>
      </div>
    </section>
  );
}

// ── SECCIÓN LEGAL — Términos y Privacidad ─────────────────────────────────
// IMPORTANTE: Esta sección es obligatoria para operar legalmente.
// Actualiza los textos en LEGAL (Sección 7) cuando obtengas tu RUC.
function Legal() {
  const [tab, setTab] = useState("privacidad");

  return (
    <section id="privacidad" style={{ background: COLORES.negro, padding: "72px 24px",
      borderTop: `1px solid ${COLORES.borde}` }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          {[["privacidad","🔒 Política de Privacidad"],["terminos","📄 Términos de Servicio"]].map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)}
              style={{ padding: "8px 18px", fontSize: 12, fontWeight: 600, borderRadius: 8,
                cursor: "pointer", transition: "all 0.15s",
                background: tab === k ? COLORES.naranja : "transparent",
                color: tab === k ? COLORES.blanco : COLORES.gris,
                border: `1px solid ${tab === k ? COLORES.naranja : COLORES.borde}` }}>
              {l}
            </button>
          ))}
        </div>

        <div style={{ background: COLORES.superficie2, border: `1px solid ${COLORES.borde}`,
          borderRadius: 12, padding: 28 }}>
          <div style={{ fontSize: 13, color: COLORES.gris, lineHeight: 2, whiteSpace: "pre-line" }}>
            {tab === "privacidad" ? LEGAL.privacidad : LEGAL.terminos}
          </div>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${COLORES.borde}`,
            fontSize: 11, color: COLORES.grisOscuro }}>
            Última actualización: Junio 2026 · Operado por {LEGAL.pie_pagina.split("·")[1]?.trim()}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER — Pie de página con información legal ──────────────────────────
function Footer() {
  const ir = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ background: COLORES.negro, borderTop: `1px solid ${COLORES.borde}`,
      padding: "52px 24px 28px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 36, marginBottom: 44 }}>

          {/* Columna marca */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, background: COLORES.naranja, borderRadius: 7,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>⚙️</div>
              <span style={{ fontSize: 17, fontWeight: 900, color: COLORES.blanco }}>
                Repuestos<span style={{ color: COLORES.naranja }}>Now</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: COLORES.grisOscuro, lineHeight: 1.7, margin: "0 0 14px", maxWidth: 240 }}>
              Repuestos industriales y automotrices alemanes, importados directamente a Ecuador.
            </p>
            <div style={{ fontSize: 12, color: COLORES.grisOscuro }}>🇩🇪 Alemania → 🇪🇨 Ecuador</div>

            {/* Redes sociales — aparecen cuando agregues los links en CONFIG */}
            {(CONFIG.instagram || CONFIG.facebook || CONFIG.linkedin) && (
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                {CONFIG.instagram && <a href={CONFIG.instagram} target="_blank" rel="noreferrer"
                  style={{ fontSize: 18, textDecoration: "none" }}>📸</a>}
                {CONFIG.facebook && <a href={CONFIG.facebook} target="_blank" rel="noreferrer"
                  style={{ fontSize: 18, textDecoration: "none" }}>👍</a>}
                {CONFIG.linkedin && <a href={CONFIG.linkedin} target="_blank" rel="noreferrer"
                  style={{ fontSize: 18, textDecoration: "none" }}>💼</a>}
              </div>
            )}
          </div>

          {/* Columna productos */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: COLORES.naranja,
              letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Productos</div>
            {["Herramientas Knipex","Repuestos Bosch","Rodamientos SKF","Herramientas Wera","Insertos CNC Sandvik"].map(l => (
              <div key={l} style={{ fontSize: 13, color: COLORES.grisOscuro, marginBottom: 8 }}>{l}</div>
            ))}
          </div>

          {/* Columna empresa */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: COLORES.naranja,
              letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Empresa</div>
            {[["Cómo funciona","proceso"],["Marcas","marcas"],["FAQ","faq"],["Política de Privacidad","privacidad"]].map(([l,id]) => (
              <div key={l} style={{ fontSize: 13, color: COLORES.grisOscuro, marginBottom: 8,
                cursor: "pointer" }} onClick={() => ir(id)}
                onMouseEnter={e => e.target.style.color = COLORES.blanco}
                onMouseLeave={e => e.target.style.color = COLORES.grisOscuro}>{l}</div>
            ))}
          </div>

          {/* Columna contacto */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: COLORES.naranja,
              letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Contacto</div>
            <div style={{ fontSize: 13, color: COLORES.grisOscuro, marginBottom: 12 }}>
              💬 WhatsApp<br />
              <a href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noreferrer"
                style={{ color: "#555", textDecoration: "none" }}>{CONFIG.telefono}</a>
            </div>
            <div style={{ fontSize: 13, color: COLORES.grisOscuro, marginBottom: 12 }}>
              ✉️ Email<br />
              <a href={`mailto:${CONFIG.email}`}
                style={{ color: "#555", textDecoration: "none" }}>{CONFIG.email}</a>
            </div>
            <div style={{ fontSize: 13, color: COLORES.grisOscuro }}>
              📍 Ubicación<br />
              <span style={{ color: "#555" }}>{CONFIG.ciudad}</span>
            </div>
          </div>
        </div>

        {/* Barra inferior legal */}
        <div style={{ borderTop: `1px solid ${COLORES.borde}`, paddingTop: 22 }}>
          {/* Aviso legal */}
          <div style={{ fontSize: 11, color: COLORES.grisOscuro, marginBottom: 8, lineHeight: 1.6 }}>
            {LEGAL.aviso}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div style={{ fontSize: 12, color: COLORES.grisOscuro }}>{LEGAL.pie_pagina}</div>
            <div style={{ fontSize: 12, color: COLORES.grisOscuro }}>
              {CONFIG.ruc !== "EN TRÁMITE"
                ? `RUC: ${CONFIG.ruc}`
                : "RUC: En proceso de registro · Persona Natural"}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── APP — Componente raíz que ensambla toda la página ─────────────────────
export default function App() {
  return (
    <div style={{ background: COLORES.negro, minHeight: "100vh" }}>

      {/* Estilos globales */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080808; -webkit-font-smoothing: antialiased; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        input::placeholder, textarea::placeholder { color: #333; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #3A3A3A; }
      `}</style>

      {/* Secciones en orden */}
      <NavBar />
      <Hero />
      <Marcas />
      <Proceso />
      <Diferenciadores />
      <Cotizar />
      <WABanner />
      <FAQ />
      <Legal />     {/* ← Sección legal obligatoria */}
      <Footer />

      {/* Botón WhatsApp flotante — siempre visible */}
      <a href={`https://wa.me/${CONFIG.whatsapp}?text=Hola+RepuestosNow!+Necesito+cotizar+un+repuesto`}
        target="_blank" rel="noreferrer"
        style={{ position: "fixed", bottom: 26, right: 26, zIndex: 300, width: 60, height: 60,
          background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 28, textDecoration: "none",
          boxShadow: "0 4px 28px rgba(37,211,102,0.5)", transition: "all 0.22s" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.12)"; e.currentTarget.style.boxShadow = "0 6px 36px rgba(37,211,102,0.7)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 28px rgba(37,211,102,0.5)"; }}>
        💬
      </a>
    </div>
  );
}
