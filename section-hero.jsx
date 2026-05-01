// Секции лендинга — hero, about, advantages, location, infrastructure, map, form, footer

const { useState, useEffect, useRef, useMemo } = React;

const Placeholder = ({ ratio = "16/9", label, sub, dark = false }) => (
  <div style={{
    aspectRatio: ratio,
    background: dark ? "#2A3A2E" : "#EDE3CF",
    backgroundImage: `repeating-linear-gradient(45deg, ${dark ? "#324339" : "#E5DAC2"} 0 1px, transparent 1px 16px)`,
    border: `1px solid ${dark ? "#3A4D40" : "#D9CDB0"}`,
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    color: dark ? "#A8BC92" : "#7A6A4A",
    fontFamily: "ui-monospace, Menlo, monospace",
    textAlign: "center", padding: 24, gap: 6,
  }}>
    <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>{label}</div>
    {sub && <div style={{ fontSize: 10, opacity: 0.7, maxWidth: 280 }}>{sub}</div>}
  </div>
);

// HERO
const Hero = ({ onGoToMap }) => (
  <section style={{ position: "relative", minHeight: 760, background: "#2A3A2E", color: "#F5F0E6", overflow: "hidden" }}>
    {/* Декоративный фон */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: `repeating-linear-gradient(60deg, #324339 0 1px, transparent 1px 28px)`,
      opacity: 0.5,
    }}/>
    {/* Силуэт деревьев снизу */}
    <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 180, opacity: 0.35 }} viewBox="0 0 1440 180" preserveAspectRatio="none">
      {Array.from({ length: 28 }, (_, i) => {
        const x = i * 52 + ((i * 31) % 24);
        const h = 80 + ((i * 47) % 80);
        return <path key={i} d={`M${x} 180 L${x} ${180-h} L${x-12} ${180-h+20} L${x-6} ${180-h+20} L${x-16} ${180-h+50} L${x-4} ${180-h+50} L${x-20} ${180-h+90} L${x+20} ${180-h+90} L${x+4} ${180-h+50} L${x+16} ${180-h+50} L${x+6} ${180-h+20} L${x+12} ${180-h+20} Z`} fill="#1A2620"/>;
      })}
    </svg>

    {/* Шапка */}
    <header style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 64px", zIndex: 2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 36, height: 36, border: "1.5px solid #F5F0E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2 L4 10 L7 10 L4 14 L14 14 L11 10 L14 10 Z M9 14 V17" stroke="#F5F0E6" strokeWidth="1.2"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 20, fontWeight: 500, letterSpacing: -0.3 }}>Нью Дуброво</div>
          <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9, opacity: 0.6, letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>Коттеджный посёлок · 2026</div>
        </div>
      </div>
      <nav style={{ display: "flex", gap: 36, fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 400 }}>
        <a href="#about" style={{ color: "#F5F0E6", opacity: 0.85, textDecoration: "none" }}>О посёлке</a>
        <a href="#advantages" style={{ color: "#F5F0E6", opacity: 0.85, textDecoration: "none" }}>Преимущества</a>
        <a href="#location" style={{ color: "#F5F0E6", opacity: 0.85, textDecoration: "none" }}>Локация</a>
        <a href="#map" style={{ color: "#F5F0E6", opacity: 0.85, textDecoration: "none" }}>Генплан</a>
        <a href="#contact" style={{ color: "#F5F0E6", opacity: 0.85, textDecoration: "none" }}>Контакты</a>
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12 }}>+7 919 369 42 38</span>
      </div>
    </header>

    {/* Основной контент hero */}
    <div style={{ position: "relative", zIndex: 2, padding: "100px 64px 140px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>
          <span style={{ width: 32, height: 1, background: "#F5F0E6", opacity: 0.5 }}/>
          18 км от Екатеринбурга
        </div>
        <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 116, fontWeight: 300, lineHeight: 0.95, letterSpacing: -3, margin: "32px 0 0", color: "#F5F0E6" }}>
          Жить в&nbsp;лесу,<br/>
          <em style={{ fontStyle: "italic", fontWeight: 300, color: "#C8D4B8" }}>а не на&nbsp;его&nbsp;месте.</em>
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 17, lineHeight: 1.6, maxWidth: 560, marginTop: 36, opacity: 0.85, fontWeight: 300 }}>
          49 участков, вписанных между сосен. Газ, свет, асфальт, охрана.
          Закрытая территория, прогулочные аллеи и тишина, которой не бывает в&nbsp;черте&nbsp;города.
        </p>

        <div style={{ display: "flex", gap: 16, marginTop: 48 }}>
          <button onClick={onGoToMap} style={{
            background: "#F5F0E6", color: "#2A3A2E", padding: "18px 32px",
            border: "none", cursor: "pointer", borderRadius: 0,
            fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500,
            letterSpacing: 2, textTransform: "uppercase",
            display: "inline-flex", alignItems: "center", gap: 14,
          }}>
            Выбрать участок
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 5h14m0 0L11 1m4 4l-4 4" stroke="#2A3A2E" strokeWidth="1.5"/></svg>
          </button>
          <button style={{
            background: "transparent", color: "#F5F0E6", padding: "18px 32px",
            border: "1px solid rgba(245, 240, 230, 0.4)", cursor: "pointer", borderRadius: 0,
            fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500,
            letterSpacing: 2, textTransform: "uppercase",
          }}>
            Оставить заявку
          </button>
        </div>
      </div>

      {/* Правая колонка — мини-факты */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, alignSelf: "end" }}>
        <FactBlock value="49" label="участков"/>
        <FactBlock value="7,4 га" label="1 очередь"/>
        <FactBlock value="18 км" label="до центра города"/>
        <FactBlock value="2026" label="старт продаж"/>
      </div>
    </div>

    {/* Нижняя полоса */}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 64px", borderTop: "1px solid rgba(245, 240, 230, 0.15)", display: "flex", justifyContent: "space-between", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", opacity: 0.55, zIndex: 2 }}>
      <span>57.012° N, 60.834° E</span>
      <span>Екатеринбург · Свердловская область</span>
      <span>Очередь&nbsp;1 · 49 свободных</span>
    </div>
  </section>
);

const FactBlock = ({ value, label }) => (
  <div style={{ borderTop: "1px solid rgba(245, 240, 230, 0.25)", paddingTop: 16 }}>
    <div style={{ fontFamily: "Fraunces, serif", fontSize: 56, fontWeight: 300, lineHeight: 1, color: "#F5F0E6", letterSpacing: -1.5 }}>{value}</div>
    <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", opacity: 0.6, marginTop: 6 }}>{label}</div>
  </div>
);

window.Hero = Hero;
window.Placeholder = Placeholder;
