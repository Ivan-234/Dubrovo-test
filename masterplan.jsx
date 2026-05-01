// Masterplan v2 — реальный сканированный план как фон + кликабельные SVG-зоны
// Фон: assets/genplan.jpg (1800×2961, ratio ≈ 0.608)
// Координаты участков заданы в % относительно изображения (см. data.js)

const Masterplan = ({ plots, selectedId, onSelect, statusFilter, areaFilter, onZoom }) => {
  const containerRef = React.useRef(null);
  const [hoverId, setHoverId] = React.useState(null);

  const isFiltered = (p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (areaFilter !== "all") {
      if (areaFilter === "small" && p.area > 9) return false;
      if (areaFilter === "med" && (p.area <= 9 || p.area > 11)) return false;
      if (areaFilter === "large" && p.area <= 11) return false;
    }
    return true;
  };

  const fillFor = (status) => {
    if (status === "free") return "#3F8C3F";       // зелёный
    if (status === "reserved") return "#D9A516";   // жёлтый
    if (status === "sold") return "#C13B2A";       // красный
    if (status === "reconstruction") return "#2E78D9"; // синий
    return "rgba(42,58,46,0.92)";
  };
  const glowFor = (status) => {
    if (status === "free") return "#3F8C3F";
    if (status === "reserved") return "#D9A516";
    if (status === "sold") return "#C13B2A";
    if (status === "reconstruction") return "#2E78D9";
    return "#2A3A2E";
  };
  const strokeFor = (status) => {
    if (status === "free") return "#2C6B2C";
    if (status === "reserved") return "#8B6A0E";
    if (status === "sold") return "#7A2418";
    if (status === "reconstruction") return "#1B4F94";
    return "#444";
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        // Сохраняем пропорции исходного плана
        paddingBottom: `${(2961 / 1800) * 100}%`,
        background: "#F5F0E6",
        overflow: "hidden",
      }}
    >
      {/* Фоновое изображение плана */}
      <img
        src="assets/genplan.jpg"
        alt="Генплан Нью Дуброво, 1 очередь"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          userSelect: "none",
          pointerEvents: "none",
        }}
        draggable={false}
      />

      {/* SVG-оверлей с кликабельными зонами */}
      <svg
        viewBox="0 0 100 164.5"  /* 100 × (2961/1800)*100 = 100×164.5 */
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {plots.map(p => {
          const dimmed = !isFiltered(p);
          const selected = String(selectedId) === String(p.id);
          const hovered = String(hoverId) === String(p.id);
          const cx = p.cx;
          const cy = p.cy * 1.645;
          // Радиус пина — крупнее у активного/выбранного
          const r = selected ? 2.2 : (hovered ? 2.0 : 1.7);
          return (
            <g
              key={p.id}
              style={{ cursor: dimmed ? "default" : "pointer", pointerEvents: dimmed ? "none" : "auto" }}
              opacity={dimmed ? 0.2 : 1}
            >
              {/* Невидимая зона клика — крупнее пина */}
              <circle
                cx={cx}
                cy={cy}
                r={Math.max(r * 1.8, 2.6)}
                fill="rgba(0,0,0,0.001)"
                onClick={() => !dimmed && onSelect(p)}
                onMouseEnter={() => setHoverId(p.id)}
                onMouseLeave={() => setHoverId(null)}
                style={{ cursor: dimmed ? "default" : "pointer" }}
              />
              {/* Пин-круг с номером, привязан к центру участка */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={fillFor(p.status)}
                stroke="#F5F0E6"
                strokeWidth="0.35"
                style={{
                  transition: "r 0.15s, fill 0.15s, filter 0.15s",
                  filter: `drop-shadow(0 0 ${selected || hovered ? 1.6 : 0.9}px ${glowFor(p.status)})`,
                  pointerEvents: "none",
                }}
              />
              <text
                x={cx}
                y={cy + 0.55}
                textAnchor="middle"
                fontFamily="ui-monospace, Menlo, monospace"
                fontSize={r * 0.85}
                fontWeight="700"
                fill="#F5F0E6"
                pointerEvents="none"
              >
                {p.id}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Информер при ховере — внизу слева */}
      {hoverId && (() => {
        const p = plots.find(pl => String(pl.id) === String(hoverId));
        if (!p) return null;
        return (
          <div style={{
            position: "absolute",
            left: 16, bottom: 16,
            background: "rgba(245, 240, 230, 0.97)",
            border: "1px solid #C4B89A",
            padding: "10px 16px",
            fontFamily: "ui-monospace, Menlo, monospace",
            fontSize: 11,
            color: "#2A3A2E",
            letterSpacing: 1,
            display: "flex", gap: 16, alignItems: "center",
            pointerEvents: "none",
          }}>
            <span style={{ fontWeight: 700 }}>УЧАСТОК №{p.id}</span>
            <span>·</span>
            <span>{p.area_m2} м² ({p.area} сот.)</span>
            <span>·</span>
            <span style={{ color: "#3F5638" }}>СВОБОДЕН</span>
          </div>
        );
      })()}
    </div>
  );
};

window.Masterplan = Masterplan;
