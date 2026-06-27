import { useState, useEffect } from "react";

// ════════════════════════════════════════════════════════════════
//  ⚙️  CONFIGURACIÓN —Datos Personales
// ════════════════════════════════════════════════════════════════
const FORMSPREE_ID   = "meebkjrn";        // → formspree.io → New Form → copia el ID
const WHATSAPP_NUM   = "+593XXXXXXXXX";       // → tu número EC sin + ni espacios
const EMAIL_CONTACTO = "info@repuestosnow.com"; // → tu email real

// ════════════════════════════════════════════════════════════════
const BRAND = {
  name:    "RepuestosNow",
  tagline: "Repuestos Alemanes · Ecuador",
  domain:  "repuestosnow.com",
};

const C = {
  black:   "#080808",
  surface: "#101010",
  s2:      "#161616",
  s3:      "#1E1E1E",
  border:  "#242424",
  orange:  "#FF5C00",
  orangeH: "#FF7530",
  orangeD: "#FF5C001A",
  orangeB: "#FF5C0033",
  white:   "#FFFFFF",
  gray:    "#7A7A7A",
  grayLt:  "#B0B0B0",
  grayD:   "#383838",
  green:   "#22C55E",
  greenBg: "#052E16",
};

const MARCAS = [
  { n:"Knipex",           i:"🔧", c:"Herramientas", d:"Alicates de precisión — estándar mundial" },
  { n:"Wera",             i:"🪛", c:"Herramientas", d:"Destornilladores ergonómicos Kraftform" },
  { n:"Wiha",             i:"⚡", c:"Herramientas", d:"Herramientas VDE certificadas 1000V" },
  { n:"Hazet",            i:"🔑", c:"Herramientas", d:"Llaves dinamométricas OEM Mercedes/BMW" },
  { n:"Bosch OEM",        i:"🚗", c:"Automotriz",   d:"Sensores, filtros y bujías originales" },
  { n:"ATE / Continental",i:"🛞", c:"Automotriz",   d:"Sistemas de frenado OEM" },
  { n:"Lemförder / ZF",   i:"🔗", c:"Automotriz",   d:"Dirección y suspensión BMW/Mercedes" },
  { n:"INA / Schaeffler", i:"🏎️", c:"Automotriz",   d:"Kits de distribución y rodamientos" },
  { n:"SKF / FAG",        i:"⚙️", c:"Industrial",   d:"Rodamientos de precisión certificados" },
  { n:"Sandvik Coromant", i:"🔩", c:"Industrial",   d:"Insertos CNC y herramientas de corte" },
  { n:"Klüber",           i:"🛢️", c:"Industrial",   d:"Lubricantes técnicos de alta precisión" },
  { n:"Mitutoyo",         i:"📏", c:"Industrial",   d:"Instrumentos de medición de precisión" },
];

const PROCESO = [
  { n:"01", t:"Pides tu repuesto",     d:"Formulario o WhatsApp con nombre, marca y modelo.",          i:"📋" },
  { n:"02", t:"Cotización en 24h",     d:"Buscamos en Alemania y enviamos precio final con flete.",    i:"💬" },
  { n:"03", t:"Confirmación y pago del 50%", d:"Transferencia/PayPal/Tarjeta de Crédito. Sin costos ocultos.",  i:"💳" },
  { n:"04", t:"Importamos para vos",   d:"Compramos, gestionamos DHL y el proceso aduanero completo.",i:"✈️" },
  { n:"05", t:"Entrega en Ecuador",    d:"Quito, Guayaquil o Cuenca. Domicilio o retiro en bodega.",  i:"📦" },
];

const DIFERENCIADORES = [
  { i:"🇩🇪", t:"100% piezas originales",    d:"Directo de distribuidores alemanes certificados." },
  { i:"⚡",  t:"Entrega en 7–20 días",       d:"Flete aéreo DHL Express. Del taller en Alemania al tuyo en Ecuador." },
  { i:"✅",  t:"Garantía de autenticidad",   d:"Factura electrónica del proveedor europeo incluida en cada envío. Trazabilidad total." },
  { i:"💰",  t:"Hasta 40% más barato",       d:"Sin stock propio = sin sobreprecio de almacenaje. Precio directo de importación." },
  { i:"🔩",  t:"Cualquier referencia",       d:"Si existe en Alemania, lo conseguimos. Piezas descontinuadas, especiales, fuera de catálogo." },
  { i:"📞",  t:"Asesoría técnica incluida",  d:"Ingeniero mecánico con experiencia en Mercedes-Benz resuelve tus dudas." },
];

const FAQS = [
  { q:"¿Cuánto tarda en llegar?",
    a:"7–20 días hábiles desde la confirmación. Flete aéreo DHL: 3–15 días + trámite aduanero: 2–5 días." },
  { q:"¿Cómo sé que la pieza es original?",
    a:"Cada envío incluye la factura del proveedor europeo con número de lote. Verificable directamente con el fabricante." },
  { q:"¿Qué pasa si la pieza no es la correcta?",
    a:"Si el error fue nuestro, hacemos el cambio sin costo. Si fue un error en la especificación, coordinamos la devolución." },
  { q:"¿Aceptan pedidos por volumen?",
    a:"Sí. Para pedidos mayores a $1500 aplicamos descuento especial. Escríbenos al WhatsApp para cotización de volumen." },
  { q:"¿Consiguen piezas que no están en el catálogo?",
    a:"Absolutamente. Si existe en Alemania, lo conseguimos. Solo necesitamos el número de parte OEM o descripción técnica." },
  { q:"¿Cuáles son las formas de pago?",
    a:"Transferencia bancaria Banco Pichincha o pago mediante PayPal/Tarjeta de crédito." },
];

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function NavBar() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200,
      background: solid ? "rgba(8,8,8,0.97)" : "transparent",
      borderBottom: solid ? `1px solid ${C.border}` : "none",
      backdropFilter: solid ? "blur(18px)" : "none", transition:"all 0.3s" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", height:66,
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>
          <div style={{ width:36, height:36, background:C.orange, borderRadius:8,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>⚙️</div>
          <div>
            <div style={{ fontSize:17, fontWeight:900, color:C.white, letterSpacing:"-0.5px", lineHeight:1 }}>
              Repuestos<span style={{ color:C.orange }}>Now</span>
            </div>
            <div style={{ fontSize:9, color:C.grayD, letterSpacing:2, textTransform:"uppercase" }}>Ecuador · Piezas Alemanas</div>
          </div>
        </div>

        {/* Links */}
        <div style={{ display:"flex", gap:26, alignItems:"center" }}>
          {[["Marcas","marcas"],["Cómo funciona","proceso"],["FAQ","faq"]].map(([l,id]) => (
            <button key={id} onClick={() => go(id)}
              style={{ background:"none", border:"none", color:C.gray, fontSize:13,
                cursor:"pointer", fontWeight:500, padding:0, transition:"color 0.15s" }}
              onMouseEnter={e => e.target.style.color = C.white}
              onMouseLeave={e => e.target.style.color = C.gray}>{l}</button>
          ))}
          <button onClick={() => go("cotizar")}
            style={{ background:C.orange, border:"none", color:C.white, fontSize:13, fontWeight:800,
              padding:"10px 22px", borderRadius:8, cursor:"pointer", transition:"background 0.15s", letterSpacing:0.3 }}
            onMouseEnter={e => e.target.style.background = C.orangeH}
            onMouseLeave={e => e.target.style.background = C.orange}>
            Cotizar ahora →
          </button>
        </div>
      </div>
    </nav>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  return (
    <section style={{ minHeight:"100vh", background:C.black, display:"flex", alignItems:"center",
      position:"relative", overflow:"hidden", padding:"130px 24px 90px" }}>

      {/* Fondos decorativos */}
      <div style={{ position:"absolute", inset:0, backgroundImage:
        `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
        backgroundSize:"60px 60px", opacity:0.15, pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"5%", right:"0", width:"50%", height:"90%",
        background:"radial-gradient(ellipse at 80% 20%, #FF5C0014 0%, transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"20%", right:"18%", width:1.5, height:"55%",
        background:`linear-gradient(to bottom, transparent, ${C.orange}60, transparent)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"15%", right:"10%", width:80, height:80,
        border:`1px solid ${C.orange}25`, borderRadius:12, transform:"rotate(20deg)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1, width:"100%" }}>

        {/* Badge animado */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:C.orangeD,
          border:`1px solid ${C.orangeB}`, borderRadius:100, padding:"7px 16px", marginBottom:40 }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:C.orange,
            animation:"blink 2s ease-in-out infinite" }} />
          <span style={{ fontSize:11, fontWeight:700, color:C.orange, letterSpacing:2.5, textTransform:"uppercase" }}>
            🇩🇪 Repuestos Alemanes Originales · Entrega Ecuador 7–12 días
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize:"clamp(44px,7.5vw,82px)", fontWeight:900, color:C.white,
          lineHeight:0.92, margin:"0 0 30px", letterSpacing:"-2.5px", textTransform:"uppercase", maxWidth:740 }}>
          PIEZAS<br />
          <span style={{ color:C.orange }}>ALEMANAS</span><br />
          EN TU TALLER<br />
          <span style={{ WebkitTextStroke:`1px ${C.grayD}`, color:"transparent" }}>EN 7 DÍAS.</span>
        </h1>

        <p style={{ fontSize:17, color:C.gray, maxWidth:520, lineHeight:1.8, marginBottom:48 }}>
          Importamos desde Alemania las marcas premium que talleres y plantas industriales en Ecuador no consiguen — o pagan de más por ellas.
        </p>

        {/* CTAs */}
        <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:80 }}>
          <button onClick={() => go("cotizar")}
            style={{ background:C.orange, border:"none", color:C.white, fontSize:16, fontWeight:800,
              padding:"17px 36px", borderRadius:10, cursor:"pointer", display:"flex", alignItems:"center",
              gap:10, transition:"all 0.2s", boxShadow:`0 0 32px ${C.orange}40` }}
            onMouseEnter={e => { e.currentTarget.style.background = C.orangeH; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.orange; e.currentTarget.style.transform = "none"; }}>
            📋 Pedir cotización gratis
          </button>
          <a href={`https://wa.me/${WHATSAPP_NUM}?text=Hola+RepuestosNow!+Necesito+cotizar+un+repuesto`}
            target="_blank" rel="noreferrer"
            style={{ border:`1.5px solid ${C.border}`, background:"transparent", color:C.grayLt,
              fontSize:16, fontWeight:600, padding:"17px 30px", borderRadius:10, cursor:"pointer",
              textDecoration:"none", display:"flex", alignItems:"center", gap:10, transition:"all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.orange; e.currentTarget.style.color = C.white; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.grayLt; }}>
            💬 WhatsApp directo
          </a>
        </div>

        {/* Stats */}
        <div style={{ display:"flex", gap:0, flexWrap:"wrap" }}>
          {[["12+","Marcas alemanas"],["7–12","Días de entrega"],["40%","Más barato que local"],["100%","Piezas originales"]].map(([n,l], i, arr) => (
            <div key={l} style={{ paddingRight:48, borderRight: i < arr.length-1 ? `1px solid ${C.border}` : "none", marginRight:48, marginBottom:16 }}>
              <div style={{ fontSize:32, fontWeight:900, color:C.orange, lineHeight:1 }}>{n}</div>
              <div style={{ fontSize:11, color:C.grayD, marginTop:5, letterSpacing:1, textTransform:"uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── MARCAS ────────────────────────────────────────────────────────────────────
function Marcas() {
  const [filtro, setFiltro] = useState("Todas");
  const cats = ["Todas","Automotriz","Herramientas","Industrial"];
  const lista = filtro === "Todas" ? MARCAS : MARCAS.filter(m => m.c === filtro);

  return (
    <section id="marcas" style={{ background:C.surface, padding:"96px 24px", borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ marginBottom:44 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.orange, letterSpacing:3, textTransform:"uppercase", marginBottom:10 }}>Catálogo de marcas</div>
          <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:900, color:C.white, margin:0, letterSpacing:"-1.5px" }}>
            Las marcas que los<br /><span style={{ color:C.orange }}>mejores talleres</span> usan
          </h2>
        </div>

        <div style={{ display:"flex", gap:8, marginBottom:32, flexWrap:"wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFiltro(c)}
              style={{ padding:"7px 18px", fontSize:12, fontWeight:600, borderRadius:100, cursor:"pointer",
                transition:"all 0.15s", letterSpacing:0.3,
                background: filtro === c ? C.orange : "transparent",
                color: filtro === c ? C.white : C.gray,
                border: `1.5px solid ${filtro === c ? C.orange : C.border}` }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(248px, 1fr))", gap:12 }}>
          {lista.map(m => (
            <div key={m.n}
              style={{ background:C.s2, border:`1px solid ${C.border}`, borderRadius:12, padding:22,
                transition:"all 0.2s", cursor:"default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.orange; e.currentTarget.style.background = "#1D1D1D"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.s2; e.currentTarget.style.transform = "none"; }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <span style={{ fontSize:30 }}>{m.i}</span>
                <span style={{ fontSize:10, background:C.orangeD, color:C.orange, padding:"2px 9px", borderRadius:100, fontWeight:700, letterSpacing:1 }}>{m.c}</span>
              </div>
              <div style={{ fontSize:15, fontWeight:800, color:C.white, marginBottom:5 }}>{m.n}</div>
              <div style={{ fontSize:12, color:C.gray, lineHeight:1.5 }}>{m.d}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:28, padding:"14px 20px", background:C.orangeD, border:`1px solid ${C.orangeB}`, borderRadius:10 }}>
          <span style={{ fontSize:13, color:C.grayLt }}>
            <span style={{ color:C.orange, fontWeight:700 }}>¿No ves lo que buscás?</span> Si existe en Alemania, lo conseguimos. Mandá el número de parte OEM o la descripción técnica.
          </span>
        </div>
      </div>
    </section>
  );
}

// ── PROCESO ───────────────────────────────────────────────────────────────────
function Proceso() {
  return (
    <section id="proceso" style={{ background:C.black, padding:"96px 24px", borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ marginBottom:56 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.orange, letterSpacing:3, textTransform:"uppercase", marginBottom:10 }}>Cómo funciona</div>
          <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:900, color:C.white, margin:0, letterSpacing:"-1.5px" }}>
            De Alemania a tu taller<br /><span style={{ color:C.orange }}>sin complicaciones</span>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, position:"relative" }}>
          <div style={{ position:"absolute", top:28, left:"10%", right:"10%", height:2,
            background:`linear-gradient(to right, ${C.orange}, ${C.grayD})`, zIndex:0 }} />
          {PROCESO.map((p,i) => (
            <div key={i} style={{ textAlign:"center", position:"relative", zIndex:1, padding:"0 8px" }}>
              <div style={{ width:56, height:56, borderRadius:"50%",
                background: i===0 ? C.orange : C.s2,
                border:`2px solid ${i===0 ? C.orange : C.border}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                margin:"0 auto 20px", fontSize:22, boxShadow: i===0 ? `0 0 20px ${C.orange}50` : "none" }}>
                {p.i}
              </div>
              <div style={{ fontSize:10, fontWeight:700, color:C.orange, letterSpacing:2, marginBottom:6 }}>{p.n}</div>
              <div style={{ fontSize:13, fontWeight:700, color:C.white, marginBottom:7, lineHeight:1.3 }}>{p.t}</div>
              <div style={{ fontSize:11, color:C.gray, lineHeight:1.6 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── DIFERENCIADORES ───────────────────────────────────────────────────────────
function Diferenciadores() {
  return (
    <section style={{ background:C.surface, padding:"80px 24px", borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ marginBottom:44 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.orange, letterSpacing:3, textTransform:"uppercase", marginBottom:10 }}>Por qué elegirnos</div>
          <h2 style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:900, color:C.white, margin:0, letterSpacing:"-1px" }}>
            No somos otro<br /><span style={{ color:C.orange }}>intermediario genérico</span>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:14 }}>
          {DIFERENCIADORES.map((d,i) => (
            <div key={i} style={{ background:C.s2, border:`1px solid ${C.border}`, borderRadius:12, padding:24, display:"flex", gap:16 }}>
              <div style={{ fontSize:30, flexShrink:0 }}>{d.i}</div>
              <div>
                <div style={{ fontSize:14, fontWeight:800, color:C.white, marginBottom:6 }}>{d.t}</div>
                <div style={{ fontSize:13, color:C.gray, lineHeight:1.6 }}>{d.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FORMULARIO ────────────────────────────────────────────────────────────────
function Cotizar() {
  const [form, setForm] = useState({
    nombre:"", empresa:"", email:"", telefono:"",
    pieza:"", marca:"", modelo:"", cantidad:"1",
    urgente:false, notas:""
  });
  const [status, setStatus] = useState("idle");
  const set = (k,v) => setForm(f => ({...f,[k]:v}));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:"POST",
        headers:{ "Content-Type":"application/json", Accept:"application/json" },
        body: JSON.stringify({
          ...form,
          urgente: form.urgente ? "⚡ SÍ — URGENTE" : "No",
          _subject: `🔧 RepuestosNow${form.urgente?" ⚡URGENTE":""} — ${form.pieza}`,
          _replyto: form.email,
        }),
      });
      if (res.ok) {
        setStatus("success");
        // Abrir WhatsApp con mensaje precargado
        const msg = encodeURIComponent(
          `Hola RepuestosNow! 🔧 Acabo de enviar una cotización por la web.\n\n`+
          `📋 *Pieza:* ${form.pieza}\n`+
          `🏷️ *Marca:* ${form.marca||"Sin preferencia"}\n`+
          `🚗 *Vehículo/Máquina:* ${form.modelo||"N/A"}\n`+
          `🔢 *Cantidad:* ${form.cantidad}\n`+
          `${form.urgente?"⚡ *URGENTE*\n":""}`+
          `${form.notas?`\n📝 ${form.notas}`:""}`
        );
        setTimeout(() => window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`,"_blank"), 1000);
      } else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inp = { width:"100%", padding:"12px 14px", background:C.s3,
    border:`1.5px solid ${C.border}`, borderRadius:8, color:C.white,
    fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit", transition:"border-color 0.2s" };
  const lbl = { fontSize:12, fontWeight:600, color:C.grayLt, marginBottom:6, display:"block", letterSpacing:0.2 };

  if (status === "success") return (
    <section id="cotizar" style={{ background:C.black, padding:"96px 24px", borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:560, margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:76, marginBottom:24 }}>✅</div>
        <h2 style={{ fontSize:34, fontWeight:900, color:C.white, margin:"0 0 16px" }}>¡Solicitud recibida!</h2>
        <p style={{ fontSize:15, color:C.gray, lineHeight:1.8, marginBottom:36 }}>
          Te contactamos en menos de <strong style={{ color:C.orange }}>24 horas hábiles</strong> con precio final incluyendo flete y aduana. También te abrimos un chat de WhatsApp ahora.
        </p>
        <a href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noreferrer"
          style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#25D366", color:C.white,
            padding:"14px 28px", borderRadius:10, textDecoration:"none", fontWeight:800, fontSize:15,
            boxShadow:"0 4px 20px rgba(37,211,102,0.35)" }}>
          💬 Continuar por WhatsApp
        </a>
        <br />
        <button onClick={() => { setStatus("idle"); setForm({nombre:"",empresa:"",email:"",telefono:"",pieza:"",marca:"",modelo:"",cantidad:"1",urgente:false,notas:""}); }}
          style={{ background:"none", border:"none", color:C.orange, cursor:"pointer", fontSize:13, marginTop:20, textDecoration:"underline" }}>
          Hacer otra cotización
        </button>
      </div>
    </section>
  );

  return (
    <section id="cotizar" style={{ background:C.black, padding:"96px 24px", borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.7fr", gap:64, alignItems:"start" }}>

          {/* Info */}
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:C.orange, letterSpacing:3, textTransform:"uppercase", marginBottom:12 }}>Cotización gratuita</div>
            <h2 style={{ fontSize:"clamp(26px,3.5vw,40px)", fontWeight:900, color:C.white, margin:"0 0 22px", letterSpacing:"-1px", lineHeight:1.08 }}>
              Pedí tu pieza.<br /><span style={{ color:C.orange }}>La buscamos.</span><br />Te cotizamos.
            </h2>
            <p style={{ fontSize:14, color:C.gray, lineHeight:1.8, marginBottom:28 }}>
              Sin compromiso. Sin registro. Completá el formulario y respondemos en menos de 24 horas con precio final incluyendo flete y aduana.
            </p>
            {["✅ Cotización gratuita en menos de 24h",
              "✅ Precio final con flete y aduana incluidos",
              "✅ Factura del proveedor alemán en cada envío",
              "✅ Garantía de autenticidad de marca",
              "✅ Entrega Quito · Guayaquil · Cuenca"].map(t => (
              <div key={t} style={{ fontSize:13, color:C.grayLt, marginBottom:9 }}>{t}</div>
            ))}

            <div style={{ marginTop:32, padding:"16px 20px", background:C.orangeD, border:`1px solid ${C.orangeB}`, borderRadius:10, marginBottom:10 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.orange, marginBottom:7 }}>¿Preferís hablar directo?</div>
              <a href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noreferrer"
                style={{ fontSize:14, color:C.white, textDecoration:"none", display:"flex", alignItems:"center", gap:8, fontWeight:600 }}>
                💬 WhatsApp: +593 XX XXX XXXX
              </a>
            </div>
            <div style={{ padding:"14px 20px", background:C.s2, border:`1px solid ${C.border}`, borderRadius:10 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.grayLt, marginBottom:5 }}>✉️ Email</div>
              <a href={`mailto:${EMAIL_CONTACTO}`} style={{ fontSize:13, color:C.orange, textDecoration:"none" }}>{EMAIL_CONTACTO}</a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:36 }}>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
              <div><label style={lbl}>Nombre *</label>
                <input required value={form.nombre} onChange={e=>set("nombre",e.target.value)} placeholder="Juan Pérez" style={inp}
                  onFocus={e=>e.target.style.borderColor=C.orange} onBlur={e=>e.target.style.borderColor=C.border}/></div>
              <div><label style={lbl}>Empresa / Taller</label>
                <input value={form.empresa} onChange={e=>set("empresa",e.target.value)} placeholder="Taller Pérez Hnos." style={inp}
                  onFocus={e=>e.target.style.borderColor=C.orange} onBlur={e=>e.target.style.borderColor=C.border}/></div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:22 }}>
              <div><label style={lbl}>Email *</label>
                <input required type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="juan@correo.com" style={inp}
                  onFocus={e=>e.target.style.borderColor=C.orange} onBlur={e=>e.target.style.borderColor=C.border}/></div>
              <div><label style={lbl}>WhatsApp *</label>
                <input required value={form.telefono} onChange={e=>set("telefono",e.target.value)} placeholder="+593 99 XXX XXXX" style={inp}
                  onFocus={e=>e.target.style.borderColor=C.orange} onBlur={e=>e.target.style.borderColor=C.border}/></div>
            </div>

            <div style={{ height:1, background:C.border, marginBottom:20 }}/>
            <div style={{ fontSize:11, fontWeight:700, color:C.orange, letterSpacing:2, marginBottom:16, textTransform:"uppercase" }}>Datos del repuesto</div>

            <div style={{ marginBottom:14 }}>
              <label style={lbl}>¿Qué pieza necesitás? *</label>
              <input required value={form.pieza} onChange={e=>set("pieza",e.target.value)}
                placeholder="Ej: Sensor MAF, Alicates Knipex Cobra 250mm, Kit distribución OM651..." style={inp}
                onFocus={e=>e.target.style.borderColor=C.orange} onBlur={e=>e.target.style.borderColor=C.border}/>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 72px", gap:12, marginBottom:14 }}>
              <div><label style={lbl}>Marca preferida</label>
                <input value={form.marca} onChange={e=>set("marca",e.target.value)} placeholder="Bosch, Knipex, SKF..." style={inp}
                  onFocus={e=>e.target.style.borderColor=C.orange} onBlur={e=>e.target.style.borderColor=C.border}/></div>
              <div><label style={lbl}>Vehículo / Máquina</label>
                <input value={form.modelo} onChange={e=>set("modelo",e.target.value)} placeholder="Mercedes C200 2019..." style={inp}
                  onFocus={e=>e.target.style.borderColor=C.orange} onBlur={e=>e.target.style.borderColor=C.border}/></div>
              <div><label style={lbl}>Cantidad</label>
                <input type="number" min="1" value={form.cantidad} onChange={e=>set("cantidad",e.target.value)} style={inp}
                  onFocus={e=>e.target.style.borderColor=C.orange} onBlur={e=>e.target.style.borderColor=C.border}/></div>
            </div>

            <div style={{ marginBottom:20 }}>
              <label style={lbl}>Notas (número de parte OEM, marca alternativa aceptada, especificaciones...)</label>
              <textarea value={form.notas} onChange={e=>set("notas",e.target.value)} rows={3}
                placeholder="Nro de parte: A6510901400 / Acepto INA o Gates como alternativa..."
                style={{...inp, resize:"vertical"}}
                onFocus={e=>e.target.style.borderColor=C.orange} onBlur={e=>e.target.style.borderColor=C.border}/>
            </div>

            {/* Toggle urgente */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24, cursor:"pointer" }}
              onClick={() => set("urgente", !form.urgente)}>
              <div style={{ width:40, height:22, borderRadius:100, background:form.urgente?C.orange:C.border,
                position:"relative", transition:"background 0.2s", flexShrink:0 }}>
                <div style={{ position:"absolute", top:4, left:form.urgente?20:4, width:14, height:14,
                  borderRadius:"50%", background:C.white, transition:"left 0.2s" }}/>
              </div>
              <span style={{ fontSize:13, color:form.urgente?C.orange:C.gray, fontWeight:form.urgente?700:400 }}>
                ⚡ Pedido urgente — necesito respuesta hoy
              </span>
            </div>

            {status === "error" && (
              <div style={{ background:"#1A0505", border:"1px solid #EF444430", borderRadius:8, padding:12, marginBottom:14, fontSize:13, color:"#EF4444" }}>
                ⚠️ Error al enviar. Escribinos directamente al WhatsApp para no perder tiempo.
              </div>
            )}

            <button type="submit" disabled={status==="loading"}
              style={{ width:"100%", padding:"16px", background:status==="loading"?C.grayD:C.orange,
                border:"none", color:C.white, fontSize:15, fontWeight:900, borderRadius:10,
                cursor:status==="loading"?"not-allowed":"pointer", letterSpacing:0.3, transition:"all 0.2s",
                boxShadow: status!=="loading" ? `0 0 24px ${C.orange}35` : "none" }}
              onMouseEnter={e => status!=="loading" && (e.target.style.background = C.orangeH)}
              onMouseLeave={e => status!=="loading" && (e.target.style.background = C.orange)}>
              {status==="loading" ? "⏳ Enviando..." : "📋 Solicitar cotización gratuita →"}
            </button>
            <p style={{ fontSize:11, color:C.grayD, textAlign:"center", marginTop:10 }}>
              Sin spam. Solo te contactamos para cotizar tu repuesto.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ background:C.surface, padding:"96px 24px", borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:720, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:44 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.orange, letterSpacing:3, textTransform:"uppercase", marginBottom:10 }}>FAQ</div>
          <h2 style={{ fontSize:"clamp(26px,4vw,42px)", fontWeight:900, color:C.white, margin:0, letterSpacing:"-1px" }}>Preguntas frecuentes</h2>
        </div>
        {FAQS.map((f,i) => (
          <div key={i} style={{ background:C.s2, border:`1px solid ${open===i?C.orange:C.border}`,
            borderRadius:10, marginBottom:8, overflow:"hidden", transition:"border-color 0.2s" }}>
            <button onClick={() => setOpen(open===i?null:i)}
              style={{ width:"100%", padding:"17px 20px", background:"none", border:"none", color:C.white,
                fontSize:14, fontWeight:600, cursor:"pointer", textAlign:"left",
                display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
              <span>{f.q}</span>
              <span style={{ color:C.orange, fontSize:24, flexShrink:0, transition:"transform 0.25s", transform:open===i?"rotate(45deg)":"none" }}>+</span>
            </button>
            {open===i && (
              <div style={{ padding:"0 20px 17px", fontSize:13, color:C.gray, lineHeight:1.8, borderTop:`1px solid ${C.border}`, paddingTop:14 }}>
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── BANNER WA ─────────────────────────────────────────────────────────────────
function WABanner() {
  return (
    <section style={{ background:C.orange, padding:"54px 24px" }}>
      <div style={{ maxWidth:1000, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", gap:24, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontSize:26, fontWeight:900, color:C.white, letterSpacing:"-0.5px", marginBottom:7 }}>¿Ya sabés exactamente lo que necesitás?</div>
          <div style={{ fontSize:15, color:"rgba(255,255,255,0.8)" }}>Mandanos el número de parte por WhatsApp y cotizamos en minutos.</div>
        </div>
        <a href={`https://wa.me/${WHATSAPP_NUM}?text=Hola+RepuestosNow!+Necesito+cotizar`}
          target="_blank" rel="noreferrer"
          style={{ display:"inline-flex", alignItems:"center", gap:10, background:C.black, color:C.white,
            padding:"15px 30px", borderRadius:10, textDecoration:"none", fontWeight:800, fontSize:15,
            whiteSpace:"nowrap", transition:"opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity="0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity="1"}>
          💬 Escribir al WhatsApp
        </a>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background:C.black, borderTop:`1px solid ${C.border}`, padding:"52px 24px 28px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:36, marginBottom:44 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <div style={{ width:30, height:30, background:C.orange, borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>⚙️</div>
              <span style={{ fontSize:17, fontWeight:900, color:C.white }}>Repuestos<span style={{ color:C.orange }}>Now</span></span>
            </div>
            <p style={{ fontSize:13, color:C.grayD, lineHeight:1.7, margin:"0 0 14px", maxWidth:240 }}>
              Repuestos industriales y automotrices alemanes, importados directamente a Ecuador. Calidad original, entrega rápida.
            </p>
            <div style={{ fontSize:12, color:C.grayD }}>🇩🇪 Alemania → 🇪🇨 Ecuador</div>
          </div>
          <div>
            <div style={{ fontSize:10, fontWeight:700, color:C.orange, letterSpacing:2, textTransform:"uppercase", marginBottom:14 }}>Productos</div>
            {["Herramientas Knipex","Repuestos Bosch","Rodamientos SKF","Herramientas Wera","Insertos CNC Sandvik"].map(l => (
              <div key={l} style={{ fontSize:13, color:C.grayD, marginBottom:8 }}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize:10, fontWeight:700, color:C.orange, letterSpacing:2, textTransform:"uppercase", marginBottom:14 }}>Empresa</div>
            {["Cómo funciona","Marcas disponibles","Preguntas frecuentes","Contacto"].map(l => (
              <div key={l} style={{ fontSize:13, color:C.grayD, marginBottom:8 }}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize:10, fontWeight:700, color:C.orange, letterSpacing:2, textTransform:"uppercase", marginBottom:14 }}>Contacto</div>
            <div style={{ fontSize:13, color:C.grayD, marginBottom:12 }}>💬 WhatsApp<br /><span style={{ color:"#555" }}>+593 XX XXX XXXX</span></div>
            <div style={{ fontSize:13, color:C.grayD, marginBottom:12 }}>✉️ Email<br /><span style={{ color:"#555" }}>{EMAIL_CONTACTO}</span></div>
            <div style={{ fontSize:13, color:C.grayD }}>📍 Quito · Ecuador</div>
          </div>
        </div>
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:22, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div style={{ fontSize:12, color:C.grayD }}>© 2026 RepuestosNow · repuestosnow.com · Todos los derechos reservados.</div>
          <div style={{ fontSize:12, color:C.grayD }}>Quito, Ecuador · RUC: XXXXXXXXXX001</div>
        </div>
      </div>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background:C.black, minHeight:"100vh" }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:#080808; -webkit-font-smoothing:antialiased; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        input::placeholder, textarea::placeholder { color:#333; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#0A0A0A; }
        ::-webkit-scrollbar-thumb { background:#2A2A2A; border-radius:3px; }
        ::-webkit-scrollbar-thumb:hover { background:#3A3A3A; }
      `}</style>

      <NavBar />
      <Hero />
      <Marcas />
      <Proceso />
      <Diferenciadores />
      <Cotizar />
      <WABanner />
      <FAQ />
      <Footer />

      {/* Botón WhatsApp flotante */}
      <a href={`https://wa.me/${WHATSAPP_NUM}?text=Hola+RepuestosNow!+Necesito+cotizar+un+repuesto`}
        target="_blank" rel="noreferrer"
        style={{ position:"fixed", bottom:26, right:26, zIndex:300, width:60, height:60,
          background:"#25D366", borderRadius:"50%", display:"flex", alignItems:"center",
          justifyContent:"center", fontSize:28, textDecoration:"none",
          boxShadow:"0 4px 28px rgba(37,211,102,0.5)", transition:"all 0.22s" }}
        onMouseEnter={e => { e.currentTarget.style.transform="scale(1.12)"; e.currentTarget.style.boxShadow="0 6px 36px rgba(37,211,102,0.7)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 4px 28px rgba(37,211,102,0.5)"; }}>
        💬
      </a>
    </div>
  );
}
