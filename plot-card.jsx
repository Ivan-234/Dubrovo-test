// Карточка участка — попап при клике на участок на карте
// Поля по ТЗ: номер, площадь, кадастр, статус, кнопка заявки
// Цена убрана — только «Узнать цену» через заявку

const StatusBadge = ({ status }) => {
  const map = {
    free: { label: "Свободен", bg: "#C8D4B8", fg: "#2A3A2E" },
    reserved: { label: "Бронь", bg: "#E6D9B8", fg: "#6B5320" },
    sold: { label: "Продан", bg: "#D9C9BC", fg: "#6B4530" },
  }[status];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px", borderRadius: 999,
      background: map.bg, color: map.fg,
      fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, fontWeight: 600,
      letterSpacing: 0.5, textTransform: "uppercase",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: map.fg }}></span>
      {map.label}
    </span>
  );
};

const PlotCard = ({ plot, onClose, onSubmit }) => {
  if (!plot) return null;
  return (
    <div style={{
      position: "absolute", top: 24, right: 24, width: 340,
      background: "#FFFFFF",
      border: "1px solid #E0D6BE",
      boxShadow: "0 24px 60px rgba(42, 58, 46, 0.18)",
      padding: 28,
      zIndex: 20,
    }}>
      <button onClick={onClose} aria-label="Закрыть" style={{
        position: "absolute", top: 16, right: 16, width: 28, height: 28,
        border: "1px solid #E0D6BE", background: "transparent",
        cursor: "pointer", borderRadius: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 2l8 8M10 2l-8 8" stroke="#2A3A2E" strokeWidth="1.5"/></svg>
      </button>

      <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, color: "#7A6A4A", letterSpacing: 2 }}>
        УЧАСТОК
      </div>
      <div style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: 44, fontWeight: 400, color: "#2A3A2E", lineHeight: 1, marginTop: 4, letterSpacing: -0.5 }}>
        №{plot.id}
      </div>
      <div style={{ marginTop: 12 }}>
        <StatusBadge status={plot.status}/>
      </div>

      <div style={{ marginTop: 24, borderTop: "1px solid #E0D6BE" }}>
        <Row label="Площадь" value={`${plot.area_m2} м²`} large/>
        <Row label="" value={`${plot.area} соток`} sub/>
        <Row label="Кадастр" value={plot.cadastral} mono/>
        <Row label="Коммуникации" value={(plot.utilities || []).join(" · ")}/>
        <Row label="Стоимость" value="по запросу" muted/>
      </div>

      {plot.status === "free" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 20 }}>
          <button onClick={() => onSubmit(plot)} style={{
            padding: "14px 0",
            background: "#2A3A2E", color: "#F5F0E6",
            border: "none", cursor: "pointer", borderRadius: 0,
            fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
            letterSpacing: 1, textTransform: "uppercase",
          }}>
            Узнать цену
          </button>
          <button onClick={() => onSubmit(plot)} style={{
            padding: "14px 0",
            background: "transparent", color: "#2A3A2E",
            border: "1px solid #2A3A2E", cursor: "pointer", borderRadius: 0,
            fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
            letterSpacing: 1, textTransform: "uppercase",
          }}>
            Позвонить
          </button>
        </div>
      ) : plot.status === "reserved" ? (
        <div style={{
          width: "100%", marginTop: 20, padding: "14px 0", textAlign: "center",
          background: "#F5F0E6", color: "#7A6A4A",
          fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, letterSpacing: 1,
        }}>
          Уточнить у менеджера
        </div>
      ) : (
        <div style={{
          width: "100%", marginTop: 20, padding: "14px 0", textAlign: "center",
          background: "#F5F0E6", color: "#9C7A6A",
          fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, letterSpacing: 1,
        }}>
          Этот участок продан
        </div>
      )}
    </div>
  );
};

const Row = ({ label, value, large, mono, sub, muted }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "baseline",
    padding: sub ? "0 0 12px" : "12px 0",
    borderBottom: sub ? "1px solid #F0E8D4" : (label ? "1px solid #F0E8D4" : "none"),
    marginTop: sub ? -8 : 0,
  }}>
    <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10, color: "#7A6A4A", letterSpacing: 1.5, textTransform: "uppercase" }}>{label}</span>
    <span style={{
      fontFamily: mono ? "ui-monospace, Menlo, monospace" : "Inter, sans-serif",
      fontSize: large ? 22 : (sub ? 11 : 13),
      color: muted ? "#7A6A4A" : "#2A3A2E",
      fontWeight: large ? 600 : 500,
      fontStyle: muted ? "italic" : "normal",
      letterSpacing: sub ? 1 : 0,
    }}>{value}</span>
  </div>
);

window.PlotCard = PlotCard;
window.StatusBadge = StatusBadge;
