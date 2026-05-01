// Секция "О посёлке" + Преимущества + Локация + Инфраструктура + Форма + Footer

const About = () => (
  <section id="about" style={{ background: "#F5F0E6", padding: "140px 64px", color: "#2A3A2E" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 100, alignItems: "start" }}>
      <div style={{ position: "sticky", top: 40 }}>
        <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#7A6A4A" }}>
          ⎯ 01 · О посёлке
        </div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 72, fontWeight: 300, lineHeight: 1, letterSpacing: -2, margin: "28px 0 0" }}>
          Не земля,<br/>а среда.
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, lineHeight: 1.7, marginTop: 32, color: "#4A4A3E", fontWeight: 300, maxWidth: 380 }}>
          Нью&nbsp;Дуброво — это 24 гектара соснового бора между Тюменским трактом и&nbsp;конным клубом «Дубрава». Мы взяли участок, нанесли минимум разметки и&nbsp;провели коммуникации так, чтобы лес остался лесом.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 60 }}>
        <Placeholder ratio="4/3" label="Аэрофото посёлка" sub="вид сверху · вечерний свет · 4К рендер"/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <Placeholder ratio="3/4" label="Сосны на участке" sub="референс среды"/>
          <Placeholder ratio="3/4" label="Главный въезд" sub="КПП с воротами"/>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid #D9CDB0", marginTop: 24 }}>
          {[
            { k: "Земли", v: "ИЖС" },
            { k: "Прописка", v: "да" },
            { k: "Электричество", v: "15 кВт" },
            { k: "Газ", v: "магистральный" },
            { k: "Дороги", v: "асфальт" },
            { k: "Охрана", v: "24/7" },
          ].map((row, i) => (
            <div key={i} style={{
              borderBottom: "1px solid #D9CDB0",
              borderRight: i % 3 < 2 ? "1px solid #D9CDB0" : "none",
              padding: "20px 24px",
            }}>
              <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, letterSpacing: 1.5, color: "#7A6A4A", textTransform: "uppercase" }}>{row.k}</div>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 28, fontWeight: 400, marginTop: 6 }}>{row.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Advantages = ({ data }) => (
  <section id="advantages" style={{ background: "#EDE3CF", padding: "140px 64px", color: "#2A3A2E" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 80 }}>
      <div>
        <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#7A6A4A" }}>
          ⎯ 02 · Преимущества
        </div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 72, fontWeight: 300, lineHeight: 1, letterSpacing: -2, margin: "28px 0 0" }}>
          Шесть причин,<br/>
          <em style={{ fontStyle: "italic", color: "#6B7E5A" }}>почему здесь.</em>
        </h2>
      </div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, lineHeight: 1.6, color: "#4A4A3E", maxWidth: 320 }}>
        Без маркетинговых слоганов. Только то, что вы заметите в первый же день после переезда.
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid #2A3A2E" }}>
      {data.map((adv, i) => (
        <div key={adv.id} style={{
          padding: "44px 36px 56px",
          borderBottom: i < 3 ? "1px solid #2A3A2E" : "none",
          borderRight: (i + 1) % 3 !== 0 ? "1px solid #2A3A2E" : "none",
          minHeight: 280,
          position: "relative",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, letterSpacing: 2, color: "#7A6A4A" }}>{adv.id}</span>
            <span style={{ width: 8, height: 8, background: "#6B7E5A", borderRadius: "50%" }}/>
          </div>
          <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 32, fontWeight: 400, lineHeight: 1.1, letterSpacing: -0.5, margin: "32px 0 16px" }}>
            {adv.title}
          </h3>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, lineHeight: 1.6, color: "#4A4A3E", fontWeight: 300 }}>
            {adv.body}
          </p>
        </div>
      ))}
    </div>
  </section>
);

const Location = ({ distances }) => (
  <section id="location" style={{ background: "#F5F0E6", padding: "140px 64px", color: "#2A3A2E" }}>
    <div style={{ marginBottom: 64 }}>
      <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#7A6A4A" }}>
        ⎯ 03 · Расположение
      </div>
      <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 72, fontWeight: 300, lineHeight: 1, letterSpacing: -2, margin: "28px 0 0", maxWidth: 800 }}>
        Двадцать пять минут до&nbsp;центра, и ни одного светофора по&nbsp;дороге.
      </h2>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 60 }}>
      {/* Карта района — Яндекс.Карты */}
      <div style={{ position: "relative", aspectRatio: "16/11", background: "#EDE3CF", border: "1px solid #D9CDB0", overflow: "hidden" }}>
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=65.787%2C57.158&z=11&pt=65.787%2C57.158%2Cpm2dgl"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, filter: "saturate(0.85) contrast(0.95)" }}
          title="Нью Дуброво на карте"
        ></iframe>
        <div style={{
          position: "absolute", left: 16, top: 16, padding: "8px 14px",
          background: "rgba(245,240,230,0.94)", border: "1px solid #2A3A2E",
          fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
          letterSpacing: 1.5, textTransform: "uppercase", color: "#2A3A2E",
        }}>
          Нью Дуброво · вы здесь
        </div>
      </div>

      <div>
        <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, letterSpacing: 2, color: "#7A6A4A", textTransform: "uppercase", marginBottom: 20 }}>
          Расстояния
        </div>
        {distances.map((d, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1fr auto auto", gap: 24, alignItems: "baseline",
            padding: "18px 0", borderBottom: "1px solid #D9CDB0",
          }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400 }}>{d.label}</span>
            <span style={{ fontFamily: "Fraunces, serif", fontSize: 22, fontWeight: 400 }}>{d.value}</span>
            <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, color: "#7A6A4A", letterSpacing: 1, minWidth: 60, textAlign: "right" }}>{d.time}</span>
          </div>
        ))}
        <button style={{
          marginTop: 32, padding: "14px 24px",
          background: "transparent", color: "#2A3A2E",
          border: "1px solid #2A3A2E", cursor: "pointer", borderRadius: 0,
          fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
          letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          Построить маршрут
        </button>
      </div>
    </div>
  </section>
);

const Infrastructure = ({ items }) => (
  <section style={{ background: "#2A3A2E", color: "#F5F0E6", padding: "140px 64px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80, marginBottom: 80 }}>
      <div>
        <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", opacity: 0.6 }}>
          ⎯ 04 · Инфраструктура
        </div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 72, fontWeight: 300, lineHeight: 1, letterSpacing: -2, margin: "28px 0 0" }}>
          Всё, что нужно —<br/>
          <em style={{ fontStyle: "italic", color: "#C8D4B8" }}>уже подведено.</em>
        </h2>
      </div>
      <div style={{ alignSelf: "end" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, lineHeight: 1.7, opacity: 0.8, fontWeight: 300, maxWidth: 540 }}>
          Газ к&nbsp;участку, электричество 15&nbsp;кВт, асфальт до&nbsp;границ, освещение, оптоволокно, охрана. Дополнительно — общая поляна, теннисный корт и&nbsp;1.4&nbsp;км прогулочных аллей по периметру леса.
        </p>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid rgba(245, 240, 230, 0.2)" }}>
      {items.map((it, i) => (
        <div key={i} style={{
          padding: "32px 28px 36px",
          borderRight: (i + 1) % 4 !== 0 ? "1px solid rgba(245, 240, 230, 0.2)" : "none",
          borderBottom: i < 4 ? "1px solid rgba(245, 240, 230, 0.2)" : "none",
        }}>
          <div style={{ marginBottom: 24, color: "#C8D4B8" }}>
            <InfraIcon name={it.icon} size={32}/>
          </div>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 22, fontWeight: 400, lineHeight: 1.2 }}>{it.title}</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, lineHeight: 1.5, marginTop: 8, opacity: 0.7, fontWeight: 300 }}>{it.body}</div>
        </div>
      ))}
    </div>
  </section>
);

window.About = About;
window.Advantages = Advantages;
window.Location = Location;
window.Infrastructure = Infrastructure;
