// Иконки для инфраструктуры — линейные, в природной стилистике

const InfraIcon = ({ name, size = 28 }) => {
  const s = size;
  const stroke = "#2A3A2E";
  const sw = 1.5;
  const props = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "road":
      return <svg {...props}><path d="M5 21l3-18M19 21l-3-18M12 5v2M12 11v2M12 17v2"/></svg>;
    case "lamp":
      return <svg {...props}><path d="M12 3v8M8 11h8l-1 6H9z M12 17v4M9 21h6"/></svg>;
    case "shield":
      return <svg {...props}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>;
    case "tree":
      return <svg {...props}><path d="M12 3l-5 8h3l-3 5h10l-3-5h3z M12 16v5"/></svg>;
    case "kid":
      return <svg {...props}><circle cx="12" cy="6" r="2.5"/><path d="M12 8.5v6M8 12l4 2.5 4-2.5M9 21l3-6.5 3 6.5"/></svg>;
    case "ball":
      return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18M5.5 5.5l13 13M18.5 5.5l-13 13"/></svg>;
    case "gas":
      return <svg {...props}><path d="M12 3c4 4 5 7 5 10a5 5 0 01-10 0c0-3 1-6 5-10z"/></svg>;
    case "bolt":
      return <svg {...props}><path d="M13 3L5 14h6l-1 7 8-11h-6z"/></svg>;
    default:
      return null;
  }
};

window.InfraIcon = InfraIcon;
