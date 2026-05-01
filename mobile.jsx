// Мобильная версия — ключевые экраны для iOS frame

const MobileLanding = () => {
  const [tab, setTab] = useState("home");
  const data = window.DUBROVO_DATA;
  const plots = data.plots;
  const [selectedId, setSelectedId] = useState(null);
  const selected = plots.find(p => p.id === selectedId);

  return (
    <div style={{ width: "100%", height: "100%", background: "#F5F0E6", overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: "Inter, sans-serif", color: "#2A3A2E" }}>
      {/* Контент */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {tab === "home" && <MobileHome onGoToMap={() => setTab("map")}/>}
        {tab === "map" && <MobileMap plots={plots} selectedId={selectedId} setSelectedId={setSelectedId}/>}
        {tab === "info" && <MobileInfo data={data}/>}
      </div>

      {/* Карточка участка — мобильная */}
      {selected && tab === "map" && (
        <div style={{ position: "absolute", left: 8, right: 8, bottom: 76, background: "#FFFFFF", border: "1px solid #E0D6BE", padding: 18, boxShadow: "0 -10px 30px rgba(42,58,46,0.15)", zIndex: 30 }}>
          <button onClick={() => setSelectedId(null)} style={{ position: "absolute", top: 12, right: 12, width: 24, height: 24, border: "1px solid #E0D6BE", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="10" height="10"><path d="M2 2l6 6M8 2l-6 6" stroke="#2A3A2E" strokeWidth="1.5"/></svg>
          </button>
          <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9, color: "#7A6A4A", letterSpacing: 1.5 }}>УЧАСТОК</div>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 32, lineHeight: 1, marginTop: 2 }}>№{selected.id}</div>
          <div style={{ marginTop: 8 }}><StatusBadge status={selected.status}/></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 14, fontSize: 12 }}>
            <div><div style={{ fontSize: 9, color: "#7A6A4A", letterSpacing: 1.5, textTransform: "uppercase" }}>Площадь</div><div style={{ fontFamily: "Fraunces, serif", fontSize: 18, marginTop: 2 }}>{selected.area} сот</div></div>
            <div><div style={{ fontSize: 9, color: "#7A6A4A", letterSpacing: 1.5, textTransform: "uppercase" }}>Цена</div><div style={{ fontFamily: "Fraunces, serif", fontSize: 18, marginTop: 2 }}>{formatPrice(selected.price)}</div></div>
          </div>
          {selected.status === "free" && (
            <button style={{ width: "100%", marginTop: 14, padding: "12px 0", background: "#2A3A2E", color: "#F5F0E6", border: "none", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>
              Оставить заявку
            </button>
          )}
        </div>
      )}

      {/* Tab bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid #E0D6BE", background: "#FFFFFF", paddingBottom: 18 }}>
        {[
          { id: "home", label: "Главная", icon: "M3 9l7-6 7 6v8H3z" },
          { id: "map", label: "Карта", icon: "M3 5l5-2 4 2 5-2v12l-5 2-4-2-5 2z M8 3v12 M12 5v12" },
          { id: "info", label: "О посёлке", icon: "M10 3v8 M10 14v.5 M3 10a7 7 0 1014 0 7 7 0 00-14 0z" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "12px 0", background: "transparent", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            color: tab === t.id ? "#2A3A2E" : "#9A8E72", cursor: "pointer",
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d={t.icon}/>
            </svg>
            <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9, letterSpacing: 1, textTransform: "uppercase" }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const MobileHome = ({ onGoToMap }) => (
  <div>
    {/* Hero */}
    <div style={{ background: "#2A3A2E", color: "#F5F0E6", padding: "48px 20px 32px", position: "relative", overflow: "hidden" }}>
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 80, opacity: 0.3 }} viewBox="0 0 400 80" preserveAspectRatio="none">
        {Array.from({ length: 12 }, (_, i) => {
          const x = i * 35 + 10;
          const h = 40 + ((i * 17) % 30);
          return <path key={i} d={`M${x} 80 L${x} ${80-h} L${x-6} ${80-h+10} L${x-3} ${80-h+10} L${x-9} ${80-h+30} L${x+9} ${80-h+30} L${x+3} ${80-h+10} L${x+6} ${80-h+10} Z`} fill="#1A2620"/>;
        })}
      </svg>
      <div style={{ position: "relative" }}>
        <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9, letterSpacing: 1.5, opacity: 0.7 }}>НЬЮ ДУБРОВО · 18 КМ ОТ ЕКБ</div>
        <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 40, fontWeight: 300, lineHeight: 0.95, letterSpacing: -1, margin: "16px 0 0" }}>
          Жить в&nbsp;лесу,<br/><em style={{ fontStyle: "italic", color: "#C8D4B8" }}>а&nbsp;не&nbsp;на&nbsp;его&nbsp;месте.</em>
        </h1>
        <p style={{ fontSize: 13, opacity: 0.85, marginTop: 16, lineHeight: 1.5 }}>48 участков ИЖС с газом, светом и асфальтом. Закрытая территория, охрана 24/7.</p>
        <button onClick={onGoToMap} style={{ width: "100%", marginTop: 20, padding: "14px 0", background: "#F5F0E6", color: "#2A3A2E", border: "none", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>
          Выбрать участок →
        </button>
      </div>
    </div>

    {/* Факты */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderBottom: "1px solid #E0D6BE" }}>
      {[
        { v: "60", l: "участков" },
        { v: "7,4 га", l: "1 очередь" },
        { v: "18 км", l: "до ЕКБ" },
        { v: "15 кВт", l: "электричество" },
      ].map((f, i) => (
        <div key={i} style={{
          padding: "20px 16px",
          borderRight: i % 2 === 0 ? "1px solid #E0D6BE" : "none",
          borderBottom: i < 2 ? "1px solid #E0D6BE" : "none",
        }}>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 32, fontWeight: 300, lineHeight: 1, letterSpacing: -0.5 }}>{f.v}</div>
          <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9, marginTop: 4, letterSpacing: 1.5, color: "#7A6A4A", textTransform: "uppercase" }}>{f.l}</div>
        </div>
      ))}
    </div>

    {/* Преимущества — карусель/список */}
    <div style={{ padding: "32px 20px" }}>
      <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9, letterSpacing: 1.5, color: "#7A6A4A", textTransform: "uppercase" }}>⎯ Преимущества</div>
      <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 30, fontWeight: 300, lineHeight: 1, letterSpacing: -1, margin: "10px 0 24px" }}>
        Шесть причин,<br/><em style={{ fontStyle: "italic", color: "#6B7E5A" }}>почему здесь.</em>
      </h2>
      {window.DUBROVO_DATA.advantages.slice(0, 3).map(a => (
        <div key={a.id} style={{ padding: "20px 0", borderTop: "1px solid #E0D6BE" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, color: "#7A6A4A" }}>{a.id}</span>
            <span style={{ width: 6, height: 6, background: "#6B7E5A", borderRadius: "50%" }}/>
          </div>
          <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 22, fontWeight: 400, marginTop: 10 }}>{a.title}</h3>
          <p style={{ fontSize: 13, color: "#4A4A3E", marginTop: 6, lineHeight: 1.5, fontWeight: 300 }}>{a.body}</p>
        </div>
      ))}
    </div>

    {/* Расположение */}
    <div style={{ padding: "32px 20px", background: "#EDE3CF" }}>
      <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9, letterSpacing: 1.5, color: "#7A6A4A", textTransform: "uppercase" }}>⎯ Расположение</div>
      <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 30, fontWeight: 300, lineHeight: 1, letterSpacing: -1, margin: "10px 0 20px" }}>25 минут до&nbsp;центра.</h2>
      {window.DUBROVO_DATA.distances.slice(0, 4).map((d, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "12px 0", borderTop: "1px solid #D9CDB0" }}>
          <span style={{ fontSize: 13 }}>{d.label}</span>
          <span><span style={{ fontFamily: "Fraunces, serif", fontSize: 17 }}>{d.value}</span> <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, color: "#7A6A4A", marginLeft: 6 }}>{d.time}</span></span>
        </div>
      ))}
    </div>

    {/* CTA */}
    <div style={{ padding: "32px 20px 60px", background: "#2A3A2E", color: "#F5F0E6" }}>
      <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 28, fontWeight: 300, lineHeight: 1.05, letterSpacing: -0.5 }}>Приезжайте посмотреть</h2>
      <p style={{ fontSize: 13, opacity: 0.85, marginTop: 12, lineHeight: 1.5 }}>Экскурсии ежедневно с&nbsp;10:00 до&nbsp;19:00. Покажем участки и&nbsp;коммуникации.</p>
      <button style={{ width: "100%", marginTop: 16, padding: "14px 0", background: "#F5F0E6", color: "#2A3A2E", border: "none", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>
        Записаться на экскурсию
      </button>
      <button style={{ width: "100%", marginTop: 8, padding: "14px 0", background: "transparent", color: "#F5F0E6", border: "1px solid rgba(245,240,230,0.4)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" }}>
        +7 995 088 77 21
      </button>
    </div>
  </div>
);

const MobileMap = ({ plots, selectedId, setSelectedId }) => {
  const [statusFilter, setStatusFilter] = useState("all");
  const stats = {
    all: plots.length,
    free: plots.filter(p => p.status === "free").length,
    reserved: plots.filter(p => p.status === "reserved").length,
    sold: plots.filter(p => p.status === "sold").length,
  };

  return (
    <div>
      <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #E0D6BE", position: "sticky", top: 0, background: "#F5F0E6", zIndex: 10 }}>
        <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9, letterSpacing: 1.5, color: "#7A6A4A", textTransform: "uppercase" }}>⎯ Генплан</div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 400, marginTop: 4, letterSpacing: -0.5 }}>Выберите участок</h2>
        <div style={{ display: "flex", gap: 0, marginTop: 12, border: "1px solid #E0D6BE" }}>
          {[
            { id: "all", label: `Все · ${stats.all}` },
            { id: "free", label: `Свободны · ${stats.free}` },
            { id: "reserved", label: `Бронь · ${stats.reserved}` },
          ].map((f, i) => (
            <button key={f.id} onClick={() => setStatusFilter(f.id)} style={{
              flex: 1, padding: "8px 4px",
              background: statusFilter === f.id ? "#2A3A2E" : "#FFFFFF",
              color: statusFilter === f.id ? "#F5F0E6" : "#2A3A2E",
              border: "none",
              borderRight: i < 2 ? "1px solid #E0D6BE" : "none",
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9, letterSpacing: 0.5, textTransform: "uppercase",
            }}>{f.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 8px", background: "#F5F0E6" }}>
        <div style={{ background: "#FFFFFF", border: "1px solid #E0D6BE", overflow: "hidden" }}>
          <Masterplan plots={plots} selectedId={selectedId} onSelect={p => setSelectedId(p.id)} statusFilter={statusFilter} areaFilter="all"/>
        </div>
      </div>

      <div style={{ padding: "0 20px 80px" }}>
        <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9, letterSpacing: 1.5, color: "#7A6A4A", textTransform: "uppercase", marginBottom: 8, marginTop: 16 }}>Свободные участки · список</div>
        {plots.filter(p => p.status === "free").slice(0, 6).map(p => (
          <button key={p.id} onClick={() => setSelectedId(p.id)} style={{
            width: "100%", display: "grid", gridTemplateColumns: "auto 1fr auto",
            gap: 14, alignItems: "center", padding: "14px 0", borderTop: "1px solid #E0D6BE",
            background: "transparent", textAlign: "left", cursor: "pointer",
          }}>
            <span style={{ fontFamily: "Fraunces, serif", fontSize: 22, fontWeight: 400, minWidth: 50 }}>№{p.id}</span>
            <span><div style={{ fontSize: 11, fontFamily: "ui-monospace, Menlo, monospace", color: "#7A6A4A", letterSpacing: 1 }}>{p.area} сот · {p.street}</div><div style={{ fontFamily: "Fraunces, serif", fontSize: 16, marginTop: 2 }}>{formatPrice(p.price)}</div></span>
            <svg width="14" height="14"><path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="#2A3A2E" strokeWidth="1.4"/></svg>
          </button>
        ))}
      </div>
    </div>
  );
};

const MobileInfo = ({ data }) => (
  <div>
    <div style={{ padding: "32px 20px 20px" }}>
      <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9, letterSpacing: 1.5, color: "#7A6A4A", textTransform: "uppercase" }}>⎯ Инфраструктура</div>
      <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 28, fontWeight: 400, marginTop: 4, letterSpacing: -0.5 }}>Что уже подведено</h2>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid #E0D6BE", margin: "0 20px" }}>
      {data.infrastructure.map((it, i) => (
        <div key={i} style={{
          padding: "20px 16px",
          borderRight: i % 2 === 0 ? "1px solid #E0D6BE" : "none",
          borderBottom: i < data.infrastructure.length - 2 ? "1px solid #E0D6BE" : "none",
        }}>
          <div style={{ color: "#6B7E5A", marginBottom: 12 }}><InfraIcon name={it.icon} size={22}/></div>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 16, fontWeight: 400 }}>{it.title}</div>
          <div style={{ fontSize: 11, color: "#7A6A4A", marginTop: 4, lineHeight: 1.4 }}>{it.body}</div>
        </div>
      ))}
    </div>
    <div style={{ padding: "32px 20px 80px" }}>
      <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9, letterSpacing: 1.5, color: "#7A6A4A", textTransform: "uppercase" }}>⎯ Контакты</div>
      <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 28, fontWeight: 400, marginTop: 4, letterSpacing: -0.5 }}>Связаться</h2>
      <div style={{ marginTop: 16 }}>
        {[["Телефон","+7 995 088 77 21"],["Email","sales@newdubrovo.ru"]].map(([l, v], i) => (
          <div key={i} style={{ padding: "14px 0", borderTop: "1px solid #E0D6BE", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, color: "#7A6A4A", letterSpacing: 1.5, textTransform: "uppercase" }}>{l}</span>
            <span style={{ fontFamily: "Fraunces, serif", fontSize: 15 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

window.MobileLanding = MobileLanding;
