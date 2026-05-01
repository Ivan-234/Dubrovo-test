// Секция карты — интерактивный генплан с фильтрами
// Использует Masterplan + PlotCard

const MapSection = ({ plots, selectedId, setSelectedId }) => {
  const [statusFilter, setStatusFilter] = useState("all");
  const areaFilter = "all";

  const stats = useMemo(() => ({
    free: plots.filter(p => p.status === "free").length,
    reserved: plots.filter(p => p.status === "reserved").length,
    sold: plots.filter(p => p.status === "sold").length,
  }), [plots]);

  const selected = plots.find(p => p.id === selectedId);

  return (
    <section id="map" style={{ background: "#F5F0E6", padding: "140px 64px 64px", color: "#2A3A2E" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 56 }}>
        <div>
          <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#7A6A4A" }}>
            ⎯ 05 · Генплан
          </div>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 72, fontWeight: 300, lineHeight: 1, letterSpacing: -2, margin: "28px 0 0" }}>
            Выберите свой<br/>
            <em style={{ fontStyle: "italic", color: "#6B7E5A" }}>квадрат леса.</em>
          </h2>
        </div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#4A4A3E", maxWidth: 320, textAlign: "right" }}>
          Кликните на участок, чтобы увидеть площадь, кадастровый номер и&nbsp;статус. Статусы обновляются менеджерами в&nbsp;реальном времени.
        </div>
      </div>

      {/* Панель управления — фильтры + легенда */}
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "center", padding: "20px 28px", background: "#FFFFFF", border: "1px solid #E0D6BE", marginBottom: 0 }}>
        {/* Фильтры по статусу */}
        <div style={{ display: "flex", gap: 0, border: "1px solid #E0D6BE" }}>
          {[
            { id: "all", label: `Все · ${plots.length}` },
            { id: "free", label: `Свободны · ${stats.free}` },
            { id: "reserved", label: `Бронь · ${stats.reserved}` },
            { id: "sold", label: `Проданы · ${stats.sold}` },
          ].map((f, i, a) => (
            <button key={f.id} onClick={() => setStatusFilter(f.id)} style={{
              padding: "10px 18px",
              background: statusFilter === f.id ? "#2A3A2E" : "transparent",
              color: statusFilter === f.id ? "#F5F0E6" : "#2A3A2E",
              border: "none",
              borderRight: i < a.length - 1 ? "1px solid #E0D6BE" : "none",
              cursor: "pointer", borderRadius: 0,
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, letterSpacing: 1,
              textTransform: "uppercase",
            }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Легенда */}
        <div style={{ display: "flex", gap: 24, justifyContent: "center", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#5D5340" }}>
          <LegendItem color="#C8D4B8" border="#6B7E5A" label="Свободно"/>
          <LegendItem color="#E6D9B8" border="#A88B4A" label="Бронь"/>
          <LegendItem color="#D9C9BC" border="#9C7A6A" label="Продано"/>
        </div>

        {/* Статистика */}
        <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#5D5340", textAlign: "right" }}>
          <div style={{ color: "#3F5638", fontWeight: 600 }}>все свободны</div>
          <div style={{ marginTop: 2, opacity: 0.7 }}>старт продаж</div>
        </div>
      </div>

      {/* Карта */}
      <div style={{ position: "relative", border: "1px solid #E0D6BE", borderTop: "none", background: "#F5F0E6", overflow: "hidden" }}>
        <Masterplan
          plots={plots}
          selectedId={selectedId}
          onSelect={(p) => {
            setSelectedId(p.id);
            // Плавно скроллим к карте, чтобы карточка была видна сверху
            requestAnimationFrame(() => {
              const map = document.getElementById("map");
              if (map) {
                const top = map.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "smooth" });
              }
            });
          }}
          statusFilter={statusFilter}
          areaFilter={areaFilter}
        />
        <PlotCard plot={selected} onClose={() => setSelectedId(null)} onSubmit={() => {}}/>

        {!selected && (
          <div style={{
            position: "absolute", bottom: 24, left: 24,
            background: "rgba(245, 240, 230, 0.95)", border: "1px solid #E0D6BE",
            padding: "16px 20px", maxWidth: 320,
          }}>
            <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, letterSpacing: 1.5, color: "#7A6A4A", textTransform: "uppercase", marginBottom: 6 }}>
              Подсказка
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#2A3A2E", lineHeight: 1.5 }}>
              Кликните на любой участок, чтобы открыть&nbsp;карточку с&nbsp;деталями.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const LegendItem = ({ color, border, icon, label }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
    {icon ? (
      <svg width="14" height="14" viewBox="0 0 14 14"><polygon points="7,2 12,6 12,12 2,12 2,6" fill="#8B5A3C" stroke="#5C3A24" strokeWidth="0.8"/></svg>
    ) : (
      <span style={{ width: 14, height: 14, background: color, border: `1px solid ${border}` }}/>
    )}
    {label}
  </span>
);

// Форма заявки
const ContactForm = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Укажите имя";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) errs.phone = "Введите телефон";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      try {
        const key = "newdubrovo_leads";
        const existing = JSON.parse(localStorage.getItem(key) || "[]");
        existing.unshift({
          id: "L" + Date.now().toString(36).toUpperCase() + Math.floor(Math.random()*1e3),
          name: form.name.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          plotId: null,
          source: "landing-desktop",
          status: "new",
          notes: [],
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem(key, JSON.stringify(existing));
      } catch (err) { /* ignore quota */ }
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" style={{ background: "#EDE3CF", padding: "140px 64px", color: "#2A3A2E" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100 }}>
        <div>
          <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#7A6A4A" }}>
            ⎯ 06 · Связаться
          </div>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 72, fontWeight: 300, lineHeight: 1, letterSpacing: -2, margin: "28px 0 0" }}>
            Приезжайте<br/>посмотреть.
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, lineHeight: 1.7, marginTop: 32, color: "#4A4A3E", fontWeight: 300, maxWidth: 440 }}>
            Покажем участки, проедем по&nbsp;дорогам, расскажем про коммуникации. Экскурсии — по&nbsp;записи, ежедневно с&nbsp;10:00 до&nbsp;19:00.
          </p>

          <div style={{ marginTop: 56 }}>
            <ContactRow label="Телефон" value="+7 995 088 77 21"/>
            <ContactRow label="Email" value="sales@newdubrovo.ru"/>
          </div>
        </div>

        <div style={{ background: "#F5F0E6", padding: 56, border: "1px solid #D9CDB0", position: "relative" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <svg width="56" height="56" viewBox="0 0 56 56" style={{ margin: "0 auto 24px", display: "block" }}>
                <circle cx="28" cy="28" r="26" fill="none" stroke="#6B7E5A" strokeWidth="1.5"/>
                <path d="M16 28l8 8 16-16" stroke="#6B7E5A" strokeWidth="2" fill="none"/>
              </svg>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 36, fontWeight: 400, lineHeight: 1.1 }}>
                Заявка принята
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "#4A4A3E", marginTop: 16, fontWeight: 300 }}>
                Менеджер позвонит в&nbsp;течение часа в&nbsp;рабочее время.
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, letterSpacing: 2, color: "#7A6A4A", textTransform: "uppercase" }}>
                Запись на экскурсию
              </div>
              <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 36, fontWeight: 400, lineHeight: 1.1, margin: "12px 0 32px" }}>
                Оставить заявку
              </h3>

              <Field label="Как к вам обращаться" error={errors.name}>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Имя"/>
              </Field>
              <Field label="Телефон" error={errors.phone}>
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+7 ___ ___ __ __"/>
              </Field>
              <Field label="Что интересует" optional>
                <textarea rows="3" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Например: участок 10-12 соток ближе к лесу"/>
              </Field>

              <button type="submit" style={{
                width: "100%", padding: "18px 0", marginTop: 24,
                background: "#2A3A2E", color: "#F5F0E6",
                border: "none", cursor: "pointer", borderRadius: 0,
                fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500,
                letterSpacing: 2, textTransform: "uppercase",
              }}>
                Отправить заявку
              </button>
              <p style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, color: "#7A6A4A", textAlign: "center", marginTop: 16, lineHeight: 1.5 }}>
                Нажимая кнопку, вы соглашаетесь<br/>с обработкой персональных данных
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, optional, error, children }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{
      display: "flex", justifyContent: "space-between",
      fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, letterSpacing: 1.5,
      color: error ? "#A04A30" : "#7A6A4A", textTransform: "uppercase", marginBottom: 8,
    }}>
      <span>{label} {optional && <span style={{ opacity: 0.6 }}>· необязательно</span>}</span>
      {error && <span style={{ color: "#A04A30", textTransform: "none", letterSpacing: 0 }}>{error}</span>}
    </label>
    {React.cloneElement(children, {
      style: {
        width: "100%",
        padding: "14px 16px",
        background: "transparent",
        border: `1px solid ${error ? "#A04A30" : "#D9CDB0"}`,
        borderRadius: 0,
        fontFamily: "Inter, sans-serif",
        fontSize: 15,
        color: "#2A3A2E",
        outline: "none",
        resize: "none",
      }
    })}
  </div>
);

const ContactRow = ({ label, value }) => (
  <div style={{ borderTop: "1px solid #D9CDB0", padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
    <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, letterSpacing: 1.5, color: "#7A6A4A", textTransform: "uppercase" }}>{label}</span>
    <span style={{ fontFamily: "Fraunces, serif", fontSize: 20, fontWeight: 400 }}>{value}</span>
  </div>
);

const Footer = () => (
  <footer style={{ background: "#1A2620", color: "#A8B5A2", padding: "60px 64px 28px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, paddingBottom: 48, borderBottom: "1px solid rgba(245, 240, 230, 0.1)" }}>
      <div>
        <div style={{ fontFamily: "Fraunces, serif", fontSize: 28, color: "#F5F0E6", letterSpacing: -0.5 }}>Нью Дуброво</div>
        <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, marginTop: 8, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>Коттеджный посёлок · Свердловская область</div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, marginTop: 24, lineHeight: 1.7, fontWeight: 300, maxWidth: 360 }}>
7,4&nbsp;га первой очереди в&nbsp;18&nbsp;км от&nbsp;Екатеринбурга. 60&nbsp;участков ИЖС с&nbsp;газом, светом и&nbsp;асфальтом.
        </p>
      </div>
      <FooterCol title="Сайт" items={["О посёлке", "Преимущества", "Локация", "Генплан", "Инфраструктура"]}/>
      <FooterCol title="Покупателю" items={["Свободные участки", "Кадастровые номера", "Коммуникации", "Документы", "Условия покупки"]}/>
      <FooterCol title="Контакты" items={["+7 995 088 77 21", "sales@newdubrovo.ru"]}/>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 28, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.55 }}>
      <span>© 2026 Нью Дуброво · ИП «Дуброво»</span>
      <span>57.012° N · 60.834° E</span>
      <span>Сайт: NEWDUBROVO.RU</span>
    </div>
  </footer>
);

const FooterCol = ({ title, items }) => (
  <div>
    <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, color: "#F5F0E6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 18 }}>{title}</div>
    {items.map((it, i) => (
      <div key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, padding: "6px 0", fontWeight: 300 }}>{it}</div>
    ))}
  </div>
);

window.MapSection = MapSection;
window.ContactForm = ContactForm;
window.Footer = Footer;
