import { useState, useEffect, useCallback, createContext, useContext } from "react";

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --green:      #16A47A;
      --green-dark: #0D7A5A;
      --green-deep: #07201A;
      --green-light:#DFF4EC;
      --green-mid:  #8FDDBD;
      --green-glow: rgba(22,164,122,0.18);
      --amber:      #D97B06;
      --amber-light:#FDF3DC;
      --coral:      #C84B2F;
      --coral-light:#FAECE7;
      --blue:       #185FA5;
      --blue-light: #E6F1FB;
      --purple:     #534AB7;
      --purple-light:#EEEDFE;
      --text:       #111C17;
      --muted:      #496058;
      --border:     #C2E2D4;
      --surface:    #F4F8F6;
      --card-bg:    #FFFFFF;
      --white:      #FFFFFF;
      --radius:     16px;
      --radius-sm:  10px;
      --shadow:     0 2px 20px rgba(7,32,26,0.09);
      --shadow-md:  0 4px 28px rgba(7,32,26,0.12);
      --shadow-lg:  0 10px 50px rgba(7,32,26,0.18);
      --shadow-green: 0 4px 24px rgba(22,164,122,0.25);
    }

    html, body, #root {
      height: 100%;
      font-family: 'DM Sans', sans-serif;
      background: var(--surface);
      color: var(--text);
    }

    h1,h2,h3,h4,h5 { font-family: 'Syne', sans-serif; }
    button { cursor: pointer; font-family: 'DM Sans', sans-serif; border: none; outline: none; }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

    .fade-in { animation: fadeIn 0.4s cubic-bezier(0.16,1,0.3,1); }
    @keyframes fadeIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }

    .slide-up { animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1); }
    @keyframes slideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }

    .pulse { animation: pulse 2.2s ease-in-out infinite; }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.55; } }

    .badge {
      display:inline-flex; align-items:center; gap:4px;
      padding:3px 10px; border-radius:999px;
      font-size:10.5px; font-weight:600; letter-spacing:0.03em;
    }
    .badge-green  { background:var(--green-light); color:var(--green-dark); }
    .badge-amber  { background:var(--amber-light); color:var(--amber); }
    .badge-coral  { background:var(--coral-light); color:var(--coral); }
    .badge-blue   { background:var(--blue-light);  color:var(--blue); }
    .badge-purple { background:var(--purple-light);color:var(--purple); }

    .card {
      background:var(--card-bg); border:1px solid var(--border);
      border-radius:var(--radius); padding:18px; box-shadow:var(--shadow);
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .card:active { transform: scale(0.99); }

    .btn {
      display:inline-flex; align-items:center; justify-content:center; gap:8px;
      padding:13px 24px; border-radius:var(--radius-sm);
      font-size:14px; font-weight:600; transition:all 0.2s cubic-bezier(0.16,1,0.3,1);
      letter-spacing: 0.01em;
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--green), var(--green-dark));
      color:#fff; box-shadow: var(--shadow-green);
    }
    .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(22,164,122,0.35); }
    .btn-outline { background:transparent; color:var(--green); border:1.5px solid var(--green); }
    .btn-outline:hover { background:var(--green-light); }
    .btn-dark { background:var(--green-deep); color:#fff; }
    .btn-dark:hover { background:#0F2F24; transform:translateY(-1px); }
    .btn-amber { background:linear-gradient(135deg,#E8890A,#C96F04); color:#fff; }
    .btn-amber:hover { transform:translateY(-1px); box-shadow:0 6px 24px rgba(217,123,6,0.3); }
    .btn-sm { padding:9px 16px; font-size:12px; }
    .btn-lg { padding:16px 28px; font-size:15px; font-weight:700; border-radius:14px; }
    .btn:disabled { opacity:0.45; cursor:not-allowed; transform:none !important; }

    .progress-bar { height:7px; background:#E0ECE8; border-radius:999px; overflow:hidden; }
    .progress-fill { height:100%; background:linear-gradient(90deg,var(--green),var(--green-dark)); border-radius:999px; transition:width 0.6s cubic-bezier(0.16,1,0.3,1); }

    .tag { display:inline-block; padding:3px 9px; background:var(--green-light); color:var(--green-dark); border-radius:6px; font-size:11px; font-weight:600; }

    .product-img {
      width:100%; height:100%; object-fit:cover; border-radius:inherit;
      display:block;
    }

    @keyframes scanLine { 
      0% { top:0; } 100% { top:100%; } 
    }

    .glass {
      background: rgba(255,255,255,0.08);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.15);
    }

    .shimmer {
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
      background-size: 200% 100%;
      animation: shimmer 1.8s infinite;
    }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  `}</style>
);

const AppCtx = createContext<any>(null);
const useApp = () => useContext(AppCtx);

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const PRODUCTS = [
  {
    id: 1,
    name: "Under-bed Storage Bins (Set of 4)",
    shortName: "Storage Bins Set",
    category: "Storage",
    description: "Modular stackable bins that help students maximize small hostel spaces. Slim-profile design slides under any standard hostel bed.",
    price: 145,
    groupPrice: 88,
    min: 10,
    img: `${BASE}/products/storage-bins.png`,
    imgFallback: "🗄️",
    tag: "Space Saver",
    savings: 39,
    color: "#1D9E75",
    lightColor: "#E1F5EE",
  },
  {
    id: 2,
    name: "Architecture & Law Major Kit",
    shortName: "Major-Specific Kit",
    category: "Academic",
    description: "Specialized kits per faculty — drafting paper & parallel rulers for Architecture, legal pads for Law, protective gear for lab students.",
    price: 95,
    groupPrice: 58,
    min: 8,
    img: `${BASE}/products/major-kit.png`,
    imgFallback: "📐",
    tag: "Major Special",
    savings: 39,
    color: "#185FA5",
    lightColor: "#E6F1FB",
  },
  {
    id: 3,
    name: "Rechargeable Desk Lamp + Fan Bundle",
    shortName: "Lamp & Fan Bundle",
    category: "Electronics",
    description: "Rechargeable LED desk lamp and USB-powered table fan — crucial for studying during power fluctuations common in campus hostels.",
    price: 210,
    groupPrice: 132,
    min: 6,
    img: `${BASE}/products/lamp-fan.png`,
    imgFallback: "💡",
    tag: "Power-safe",
    savings: 37,
    color: "#D4860A",
    lightColor: "#FDF3DC",
  },
  {
    id: 4,
    name: "Shared Kitchen Essentials Pack",
    shortName: "Kitchen Essentials",
    category: "Kitchen",
    description: "Bulk packs of dish soap, sponges, and bin liners — ideal for students in communal hostel kitchens. Saves 40% vs buying individually.",
    price: 68,
    groupPrice: 40,
    min: 12,
    img: `${BASE}/products/kitchen-essentials.png`,
    imgFallback: "🧴",
    tag: "Best seller",
    savings: 41,
    color: "#1D9E75",
    lightColor: "#E1F5EE",
  },
  {
    id: 5,
    name: "Hygiene & Personal Care Multipack",
    shortName: "Hygiene Multipack",
    category: "Hygiene",
    description: "Bulk-priced multipacks of sanitary pads, deodorants, and toothpaste — products students need consistently at significant campus markup.",
    price: 88,
    groupPrice: 54,
    min: 8,
    img: `${BASE}/products/hygiene-pack.png`,
    imgFallback: "🪥",
    tag: "Monthly need",
    savings: 39,
    color: "#534AB7",
    lightColor: "#EEEDFE",
  },
  {
    id: 6,
    name: "Dorm Bathroom Cleaning Kit",
    shortName: "Cleaning Kit",
    category: "Cleaning",
    description: "Bundled floor cleaners, scourers, and disinfectants specifically packaged for shared hostel bathrooms and common areas.",
    price: 72,
    groupPrice: 44,
    min: 10,
    img: `${BASE}/products/cleaning-kit.png`,
    imgFallback: "🧹",
    tag: "Hostel ready",
    savings: 39,
    color: "#C84B2F",
    lightColor: "#FAECE7",
  },
  {
    id: 7,
    name: "Laundry Detergent & Bleach Bale",
    shortName: "Laundry Bale",
    category: "Laundry",
    description: "Large multi-packs of sachet detergent and gallon bleach containers — heavy to carry individually but dramatically cheaper in bulk.",
    price: 115,
    groupPrice: 68,
    min: 8,
    img: `${BASE}/products/laundry-bale.png`,
    imgFallback: "🫧",
    tag: "Bulk deal",
    savings: 41,
    color: "#1D9E75",
    lightColor: "#E1F5EE",
  },
];

const HUBS = [
  "Legon Hall — Block C",
  "Pentagon Hostel",
  "Main Library Steps",
  "Engineering Quad",
];

const INITIAL_GROUPS: Record<number, { joined: number; min: number; secondsLeft: number; members: string[] }> = {
  1: { joined: 7,  min: 10, secondsLeft: 3600 * 4,  members: ["Ama","Kofi","Yaw","Efua","Kojo","Abena","Kwame"] },
  2: { joined: 5,  min: 8,  secondsLeft: 3600 * 11, members: ["Nana","Adwoa","Kwesi","Akua","Paa"] },
  3: { joined: 4,  min: 6,  secondsLeft: 3600 * 22, members: ["Esi","Mensah","Aba","Dei"] },
  4: { joined: 10, min: 12, secondsLeft: 3600 * 6,  members: ["Akos","Adjei","Bea","Cynthia","David","Emma","Frank","Grace","Hawa","Ifeoma"] },
  5: { joined: 6,  min: 8,  secondsLeft: 3600 * 18, members: ["Jo","Kaf","Lena","Mo","Naa","Otu"] },
  6: { joined: 3,  min: 10, secondsLeft: 3600 * 30, members: ["Nana","Osei","Pam"] },
  7: { joined: 5,  min: 8,  secondsLeft: 3600 * 14, members: ["Abe","Boni","Cee","Doe","Eli"] },
};

function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [joinedGroups, setJoinedGroups] = useState<Record<number, boolean>>({});
  const [orderStage, setOrderStage] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [selectedHub, setSelectedHub] = useState(HUBS[0]);
  const [studentName] = useState("Kwame Asante");
  const [orderRef] = useState("SC-2026-" + Math.random().toString(36).substr(2, 6).toUpperCase());
  const [savings, setSavings] = useState(0);
  const [qrScanned, setQrScanned] = useState(false);
  const [rating, setRating] = useState(0);
  const [aiSuggestion, setAiSuggestion] = useState<any>(null);
  const [completedOrders, setCompletedOrders] = useState<any[]>([]);
  const [notification, setNotification] = useState<{ msg: string; type: string } | null>(null);

  const notify = useCallback((msg: string, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3200);
  }, []);

  const joinGroup = useCallback((productId: number) => {
    setGroups((g) => ({
      ...g,
      [productId]: { ...g[productId], joined: g[productId].joined + 1 },
    }));
    setJoinedGroups((j) => ({ ...j, [productId]: true }));
    notify("Payment hold placed — you're in the group!");
  }, [notify]);

  const placeOrder = useCallback((product: typeof PRODUCTS[0], isSolo = false) => {
    const price = isSolo ? product.price : product.groupPrice;
    setSavings((s) => s + (product.price - price));
    setCompletedOrders((o) => [
      ...o,
      { product, price, isSolo, ref: orderRef, hub: selectedHub, ts: Date.now() },
    ]);
  }, [orderRef, selectedHub]);

  return (
    <AppCtx.Provider
      value={{
        screen, setScreen,
        selectedProduct, setSelectedProduct,
        cart, setCart,
        groups, setGroups,
        joinedGroups, joinGroup,
        orderStage, setOrderStage,
        paymentStatus, setPaymentStatus,
        selectedHub, setSelectedHub,
        studentName, orderRef,
        savings, setSavings,
        qrScanned, setQrScanned,
        rating, setRating,
        aiSuggestion, setAiSuggestion,
        completedOrders, placeOrder,
        notification, notify,
        PRODUCTS, HUBS,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
}

function fmtTime(s: number) {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${String(sec).padStart(2, "0")}s`;
}

function Icon({ name, size = 18, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const icons: Record<string, React.ReactNode> = {
    cart:     <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0"/>,
    home:     <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    search:   <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    users:    <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>,
    clock:    <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    check:    <polyline points="20 6 9 17 4 12"/>,
    "check-circle": <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    arrow:    <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    "arrow-left": <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    star:     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    zap:      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    package:  <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    truck:    <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    map:      <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
    qr:       <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><rect x="18" y="14" width="3" height="3"/><rect x="14" y="18" width="3" height="3"/><rect x="18" y="18" width="3" height="3"/><rect x="5" y="5" width="3" height="3"/><rect x="16" y="5" width="3" height="3"/><rect x="5" y="16" width="3" height="3"/></>,
    bell:     <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></>,
    robot:    <><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M9 11V7a3 3 0 016 0v4"/><circle cx="9" cy="16" r="1"/><circle cx="15" cy="16" r="1"/><path d="M12 3v2M8 3h8"/></>,
    warning:  <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    gift:     <><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7"/></>,
    refresh:  <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></>,
    "bar-chart": <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    logout:   <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></>,
    fire:     <path d="M12 2s-4.5 5-4.5 9A6 6 0 0012 22a6 6 0 004.5-11C16.5 7 12 2 12 2z M9.5 14c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5c0-1.8-2.5-4-2.5-4S9.5 12.2 9.5 14z"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name] || null}
    </svg>
  );
}

function ProductImage({ product, style = {} }: { product: typeof PRODUCTS[0]; style?: React.CSSProperties }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div style={{
        width: "100%", height: "100%",
        background: product.lightColor,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 36, borderRadius: "inherit", ...style
      }}>
        {product.imgFallback}
      </div>
    );
  }
  return (
    <img
      src={product.img}
      alt={product.name}
      className="product-img"
      style={{ ...style }}
      onError={() => setErrored(true)}
    />
  );
}

function BottomNav() {
  const { screen, setScreen, joinedGroups, completedOrders } = useApp();
  const activeGroups = Object.keys(joinedGroups).length;
  const tabs = [
    { id: "home",    label: "Home",   icon: "home" },
    { id: "browse",  label: "Shop",   icon: "search" },
    { id: "groups",  label: "Groups", icon: "users",   badge: activeGroups || null },
    { id: "orders",  label: "Orders", icon: "package", badge: completedOrders.length || null },
    { id: "profile", label: "Profile",icon: "settings" },
  ];
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 430, margin: "0 auto",
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)",
      borderTop: "1px solid var(--border)", display: "flex",
      padding: "10px 0 max(12px,env(safe-area-inset-bottom))", zIndex: 100,
      boxShadow: "0 -4px 30px rgba(7,32,26,0.1)"
    }}>
      {tabs.map((t) => (
        <button key={t.id} onClick={() => setScreen(t.id)}
          style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            background: "none", padding: "4px 0", position: "relative",
            color: screen === t.id ? "var(--green)" : "var(--muted)"
          }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 40, height: 32, borderRadius: 10,
              background: screen === t.id ? "var(--green-light)" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s"
            }}>
              <Icon name={t.icon} size={19} color="currentColor" />
            </div>
            {t.badge ? (
              <span style={{
                position: "absolute", top: -2, right: -2, background: "var(--coral)",
                color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 999, padding: "1px 5px",
                minWidth: 16, textAlign: "center", lineHeight: "14px"
              }}>{t.badge}</span>
            ) : null}
          </div>
          <span style={{ fontSize: 10, fontWeight: screen === t.id ? 700 : 400 }}>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

function TopBar({ title, back, right }: { title: string; back?: string; right?: React.ReactNode }) {
  const { setScreen } = useApp();
  return (
    <div style={{
      display: "flex", alignItems: "center", padding: "16px 20px 14px",
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 50
    }}>
      {back && (
        <button onClick={() => setScreen(back)} style={{
          background: "var(--surface)", borderRadius: 999, padding: "7px",
          marginRight: 12, color: "var(--muted)", border: "1px solid var(--border)"
        }}>
          <Icon name="arrow-left" size={18} />
        </button>
      )}
      <h2 style={{ flex: 1, fontSize: 17, fontWeight: 700, fontFamily: "Syne, sans-serif" }}>{title}</h2>
      {right}
    </div>
  );
}

function Toast() {
  const { notification } = useApp();
  if (!notification) return null;
  const bg = notification.type === "success"
    ? "linear-gradient(135deg,#16A47A,#0D7A5A)"
    : notification.type === "error"
    ? "linear-gradient(135deg,#C84B2F,#9E3520)"
    : "linear-gradient(135deg,#D97B06,#B56205)";
  return (
    <div style={{
      position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)",
      background: bg, color: "#fff", padding: "13px 22px",
      borderRadius: 14, fontSize: 13, fontWeight: 600, zIndex: 200,
      boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
      animation: "fadeIn 0.3s ease", maxWidth: 340, textAlign: "center",
      backdropFilter: "blur(20px)"
    }}>
      {notification.msg}
    </div>
  );
}

function HomeScreen() {
  const { studentName, savings, groups, PRODUCTS, setScreen, setSelectedProduct } = useApp();
  const liveDeals = PRODUCTS.slice(0, 3).map((p: typeof PRODUCTS[0]) => ({ ...p, group: groups[p.id] }));

  return (
    <div className="fade-in" style={{ paddingBottom: 90 }}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(160deg, #07201A 0%, #0D3D2C 50%, #0A2E22 100%)",
        padding: "0 0 0", overflow: "hidden", position: "relative"
      }}>
        <div style={{
          position: "absolute", top: -60, right: -60, width: 280, height: 280,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(22,164,122,0.2) 0%, transparent 70%)"
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(22,164,122,0.08) 1px, transparent 0)",
          backgroundSize: "28px 28px"
        }} />
        <div style={{ position: "relative", padding: "28px 20px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", background: "#16A47A",
                  boxShadow: "0 0 8px rgba(22,164,122,0.8)"
                }} className="pulse" />
                <p style={{ fontSize: 11, color: "rgba(143,221,189,0.8)", letterSpacing: "0.1em", fontWeight: 600 }}>GOOD MORNING</p>
              </div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>{studentName} 👋</h1>
            </div>
            <div style={{ position: "relative" }}>
              <button className="glass" style={{
                borderRadius: 999, padding: "10px 16px", color: "#fff",
                fontSize: 12, display: "flex", alignItems: "center", gap: 7, fontWeight: 600
              }}>
                <Icon name="bell" size={15} />
                <span style={{
                  position: "absolute", top: 4, right: 12, width: 8, height: 8,
                  background: "var(--coral)", borderRadius: "50%",
                  border: "2px solid #07201A"
                }} />
                3
              </button>
            </div>
          </div>

          {/* Savings card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(22,164,122,0.25) 0%, rgba(13,122,90,0.15) 100%)",
            border: "1px solid rgba(143,221,189,0.25)", borderRadius: 18,
            padding: "20px 22px", marginBottom: 4
          }}>
            <p style={{ fontSize: 10, color: "var(--green-mid)", marginBottom: 6, letterSpacing: "0.1em", fontWeight: 700 }}>
              TOTAL SAVED WITH SMARTCART
            </p>
            <p style={{ fontSize: 36, fontWeight: 800, fontFamily: "Syne, sans-serif", color: "#fff", marginBottom: 4 }}>
              GHS {savings > 0 ? savings.toFixed(2) : "0.00"}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ background: "rgba(22,164,122,0.3)", borderRadius: 6, padding: "3px 8px" }}>
                <span style={{ fontSize: 11, color: "var(--green-mid)", fontWeight: 600 }}>Group buying power</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick action strip */}
        <div style={{ padding: "0 16px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
            {[
              { icon: "search", label: "Browse",  screen: "browse",  color: "#16A47A" },
              { icon: "users",  label: "Groups",  screen: "groups",  color: "#534AB7" },
              { icon: "truck",  label: "Track",   screen: "stage4",  color: "#D97B06" },
              { icon: "qr",     label: "Collect", screen: "stage7",  color: "#185FA5" },
            ].map((a) => (
              <button key={a.label} onClick={() => setScreen(a.screen)}
                className="glass"
                style={{
                  borderRadius: 14, padding: "14px 8px",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: 8, color: "#fff"
                }}>
                <div style={{
                  background: `${a.color}33`, borderRadius: 10, padding: 9,
                  border: `1px solid ${a.color}44`
                }}>
                  <Icon name={a.icon} size={17} color={a.color} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 600 }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>
        {/* Live group deals */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700 }}>Live Group Deals</h3>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Ends when timers hit zero</p>
          </div>
          <button onClick={() => setScreen("browse")}
            style={{
              background: "var(--green-light)", color: "var(--green-dark)",
              borderRadius: 999, padding: "7px 14px", fontSize: 12, fontWeight: 600, border: "none"
            }}>
            See all
          </button>
        </div>

        {liveDeals.map((p: any) => {
          const g = p.group;
          const pct = Math.round((g.joined / g.min) * 100);
          return (
            <div key={p.id}
              onClick={() => { setSelectedProduct(p); setScreen("product"); }}
              style={{
                background: "#fff", border: "1px solid var(--border)", borderRadius: 18,
                marginBottom: 14, cursor: "pointer", overflow: "hidden",
                boxShadow: "0 2px 20px rgba(7,32,26,0.08)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}>
              <div style={{ display: "flex", gap: 0 }}>
                <div style={{ width: 100, height: 110, flexShrink: 0, position: "relative" }}>
                  <ProductImage product={p} />
                  {p.tag && (
                    <div style={{
                      position: "absolute", top: 8, left: 8,
                      background: "rgba(7,32,26,0.75)", backdropFilter: "blur(8px)",
                      color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px",
                      borderRadius: 8, letterSpacing: "0.02em"
                    }}>
                      {p.tag}
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, padding: "14px 14px 12px" }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 5 }}>
                    <span className="badge badge-green">{Math.round((1 - p.groupPrice / p.price) * 100)}% off</span>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, lineHeight: 1.3 }}>{p.shortName}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: "var(--green)", fontFamily: "Syne" }}>GHS {p.groupPrice}</span>
                    <span style={{ fontSize: 12, color: "var(--muted)", textDecoration: "line-through" }}>GHS {p.price}</span>
                  </div>
                  <div className="progress-bar" style={{ marginBottom: 5 }}>
                    <div className="progress-fill" style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)" }}>
                    <span><strong style={{ color: "var(--text)" }}>{g.joined}/{g.min}</strong> joined</span>
                    <span style={{ color: g.secondsLeft < 7200 ? "var(--coral)" : "var(--muted)" }}>
                      {fmtTime(g.secondsLeft)} left
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Stage journey banner */}
        <div style={{
          background: "linear-gradient(135deg, #07201A, #0D3D2C)",
          borderRadius: 18, padding: "20px 18px", color: "#fff",
          border: "1px solid rgba(22,164,122,0.2)"
        }}>
          <p style={{ fontSize: 11, color: "var(--green-mid)", letterSpacing: "0.08em", marginBottom: 10, fontWeight: 700 }}>
            YOUR ORDER JOURNEY
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 4, overflowX: "auto", paddingBottom: 4 }}>
            {["Browse", "Group", "Payment", "QC", "Sort", "Hub", "Collect"].map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                <div style={{
                  background: i === 0 ? "var(--green)" : "rgba(255,255,255,0.1)",
                  borderRadius: 999, padding: "5px 12px", fontSize: 11, fontWeight: 700,
                  color: i === 0 ? "#fff" : "rgba(255,255,255,0.45)"
                }}>
                  {i + 1}. {s}
                </div>
                {i < 6 && <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 14 }}>›</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowseScreen() {
  const { PRODUCTS, groups, setScreen, setSelectedProduct, aiSuggestion, setAiSuggestion } = useApp();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [showAI, setShowAI] = useState(false);

  const cats = ["All", "Storage", "Academic", "Electronics", "Kitchen", "Hygiene", "Cleaning", "Laundry"];

  const filtered = (PRODUCTS as typeof PRODUCTS).filter((p: typeof PRODUCTS[0]) =>
    (cat === "All" || p.category === cat) &&
    (p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()))
  );

  const triggerAI = (p: typeof PRODUCTS[0]) => {
    const cheaper = (PRODUCTS as typeof PRODUCTS).find(
      (x: typeof PRODUCTS[0]) => x.id !== p.id && x.groupPrice < p.groupPrice && x.category !== p.category
    );
    if (cheaper) {
      setAiSuggestion({ for: p, alt: cheaper });
      setShowAI(true);
    }
  };

  return (
    <div className="fade-in" style={{ paddingBottom: 90 }}>
      <div style={{ background: "linear-gradient(160deg, #07201A, #0D3D2C)", padding: "20px 16px 16px" }}>
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 14, fontFamily: "Syne" }}>
          Discover Products
        </h2>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}>
            <Icon name="search" size={16} />
          </span>
          <input value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories..."
            style={{
              width: "100%", padding: "13px 13px 13px 42px", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)", fontSize: 14,
              background: "rgba(255,255,255,0.1)", outline: "none", color: "#fff"
            }} />
        </div>
      </div>

      <div style={{
        background: "linear-gradient(135deg, #EEEDFE 0%, #E6F1FB 100%)",
        padding: "13px 16px", display: "flex", alignItems: "center", gap: 10,
        borderBottom: "1px solid var(--border)"
      }}>
        <div style={{ background: "var(--purple)", borderRadius: 9, padding: 7, flexShrink: 0 }}>
          <Icon name="robot" size={15} color="#fff" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--purple)" }}>AI Budget Assistant active</p>
          <p style={{ fontSize: 11, color: "var(--muted)" }}>Watching your basket for better deals</p>
        </div>
        <span className="badge badge-purple pulse">Live</span>
      </div>

      <div style={{ display: "flex", gap: 8, padding: "12px 16px", overflowX: "auto" }}>
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            style={{
              padding: "8px 16px", borderRadius: 999,
              border: `1.5px solid ${cat === c ? "var(--green)" : "var(--border)"}`,
              background: cat === c ? "var(--green)" : "#fff",
              color: cat === c ? "#fff" : "var(--muted)",
              fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0,
              transition: "all 0.2s"
            }}>
            {c}
          </button>
        ))}
      </div>

      {showAI && aiSuggestion && (
        <div style={{
          margin: "0 16px 16px",
          background: "linear-gradient(135deg, #EEEDFE, #E6F1FB)",
          border: "1.5px solid var(--purple)", borderRadius: 16, padding: 14
        }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <Icon name="robot" size={16} color="var(--purple)" />
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--purple)" }}>AI Suggestion</p>
            <button onClick={() => setShowAI(false)} style={{ marginLeft: "auto", background: "none", color: "var(--purple)", fontSize: 18 }}>×</button>
          </div>
          <p style={{ fontSize: 12, color: "var(--text)", marginBottom: 8 }}>
            Check out this deal instead — saves even more:
          </p>
          <div
            style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "#fff", borderRadius: 10, padding: 10, cursor: "pointer",
              overflow: "hidden"
            }}
            onClick={() => { setSelectedProduct(aiSuggestion.alt); setScreen("product"); setShowAI(false); }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
              <ProductImage product={aiSuggestion.alt} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700 }}>{aiSuggestion.alt.shortName}</p>
              <p style={{ fontSize: 12, color: "var(--green)", fontWeight: 700 }}>GHS {aiSuggestion.alt.groupPrice} group price</p>
            </div>
            <span className="badge badge-green" style={{ marginLeft: "auto" }}>Save more</span>
          </div>
        </div>
      )}

      <div style={{ padding: "0 16px" }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <Icon name="search" size={40} color="var(--border)" />
            <p style={{ color: "var(--muted)", marginTop: 12, fontSize: 14 }}>No products found</p>
          </div>
        )}
        {(filtered as typeof PRODUCTS).map((p: typeof PRODUCTS[0]) => {
          const g = groups[p.id];
          const pct = Math.round((g.joined / g.min) * 100);
          return (
            <div key={p.id}
              onClick={() => { setSelectedProduct(p); setScreen("product"); triggerAI(p); }}
              style={{
                background: "#fff", border: "1px solid var(--border)", borderRadius: 18,
                marginBottom: 14, cursor: "pointer", overflow: "hidden",
                boxShadow: "0 2px 20px rgba(7,32,26,0.07)"
              }}>
              <div style={{ display: "flex", gap: 0 }}>
                <div style={{ width: 110, height: 120, flexShrink: 0, position: "relative" }}>
                  <ProductImage product={p} />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                    padding: "8px 6px 6px"
                  }}>
                    <span style={{
                      background: p.color, color: "#fff",
                      fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 6
                    }}>{p.category}</span>
                  </div>
                </div>
                <div style={{ flex: 1, padding: "14px 14px 12px" }}>
                  {p.tag && (
                    <div style={{ marginBottom: 5 }}>
                      <span style={{
                        background: "var(--amber-light)", color: "var(--amber)",
                        fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6
                      }}>{p.tag}</span>
                    </div>
                  )}
                  <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 3, lineHeight: 1.3 }}>{p.shortName}</p>
                  <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8, lineHeight: 1.4,
                    overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                    {p.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 7 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "var(--green)", fontFamily: "Syne" }}>
                      GHS {p.groupPrice}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--muted)", textDecoration: "line-through" }}>GHS {p.price}</span>
                    <span className="badge badge-green" style={{ fontSize: 9 }}>-{Math.round((1 - p.groupPrice / p.price) * 100)}%</span>
                  </div>
                  <div className="progress-bar" style={{ marginBottom: 4 }}>
                    <div className="progress-fill" style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                  <p style={{ fontSize: 11, color: "var(--muted)" }}>
                    {g.joined}/{g.min} joined · {fmtTime(g.secondsLeft)} left
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProductScreen() {
  const { selectedProduct: p, groups, joinedGroups, joinGroup, setScreen, HUBS, selectedHub, setSelectedHub, placeOrder, notify } = useApp();
  const [tab, setTab] = useState("group");
  const [paying, setPaying] = useState(false);
  const [localTime, setLocalTime] = useState(p ? groups[p.id]?.secondsLeft : 0);

  useEffect(() => {
    if (!p) return;
    setLocalTime(groups[p.id]?.secondsLeft || 0);
    const iv = setInterval(() => setLocalTime((t: number) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(iv);
  }, [p, groups]);

  if (!p) return null;
  const g = groups[p.id];
  const pct = Math.round((g.joined / g.min) * 100);
  const alreadyJoined = joinedGroups[p.id];
  const thresholdMet = g.joined >= g.min;

  const handleSoloPay = () => {
    setPaying(true);
    setTimeout(() => { placeOrder(p, true); notify("Solo order placed! Processing..."); setScreen("stage3"); }, 1800);
  };

  const handleGroupConfirm = () => {
    if (!alreadyJoined) joinGroup(p.id);
    setPaying(true);
    setTimeout(() => { placeOrder(p, false); notify("Payment held — you're in the group!"); setScreen("stage3"); }, 1800);
  };

  return (
    <div className="fade-in" style={{ paddingBottom: 110 }}>
      <TopBar title="Product Detail" back="browse" />

      {/* Hero image */}
      <div style={{ position: "relative", height: 240, overflow: "hidden", background: p.lightColor }}>
        <ProductImage product={p} style={{ borderRadius: 0 }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(7,32,26,0.8) 0%, transparent 50%)"
        }} />
        <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
            <span style={{ background: p.color, color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 8 }}>
              {p.category}
            </span>
            {p.tag && (
              <span style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 8 }}>
                {p.tag}
              </span>
            )}
          </div>
          <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 800, fontFamily: "Syne", lineHeight: 1.2 }}>{p.name}</h2>
        </div>
      </div>

      {/* Description */}
      <div style={{ padding: "14px 16px 0", background: "#fff", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, paddingBottom: 14 }}>{p.description}</p>
      </div>

      {/* Tab toggle */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid var(--border)" }}>
        {[["group", "Group Order"], ["solo", "Buy Solo"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{
              flex: 1, padding: "14px", fontFamily: "Syne, sans-serif", fontSize: 13, fontWeight: 700,
              background: "none", color: tab === id ? "var(--green)" : "var(--muted)",
              borderBottom: tab === id ? "2.5px solid var(--green)" : "2.5px solid transparent",
              transition: "color 0.2s"
            }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px 16px" }}>
        {tab === "group" ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div style={{
                background: "linear-gradient(135deg, var(--green-light), #c8f0e0)",
                borderRadius: 16, padding: "16px 18px", border: "2px solid var(--green)"
              }}>
                <p style={{ fontSize: 10, color: "var(--green-dark)", fontWeight: 700, marginBottom: 4, letterSpacing: "0.06em" }}>GROUP PRICE</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: "var(--green)", fontFamily: "Syne" }}>GHS {p.groupPrice}</p>
                <span className="badge badge-green">Save {Math.round((1 - p.groupPrice / p.price) * 100)}%</span>
              </div>
              <div style={{
                background: "var(--surface)", borderRadius: 16, padding: "16px 18px", border: "1px solid var(--border)"
              }}>
                <p style={{ fontSize: 10, color: "var(--muted)", fontWeight: 700, marginBottom: 4, letterSpacing: "0.06em" }}>SOLO PRICE</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: "var(--muted)", fontFamily: "Syne", textDecoration: "line-through" }}>GHS {p.price}</p>
                <p style={{ fontSize: 11, color: "var(--muted)" }}>Pay more alone</p>
              </div>
            </div>

            <div className="card" style={{
              marginBottom: 16,
              border: localTime < 7200 ? "1.5px solid var(--coral)" : "1px solid var(--border)",
              borderRadius: 16
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                <div style={{
                  background: localTime < 7200 ? "var(--coral-light)" : "var(--amber-light)",
                  borderRadius: 10, padding: 9
                }}>
                  <Icon name="clock" size={18} color={localTime < 7200 ? "var(--coral)" : "var(--amber)"} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14 }}>Group closes in</p>
                  <p style={{ fontSize: 11, color: "var(--muted)" }}>
                    {thresholdMet ? "Threshold met — locks when timer ends" : `Need ${g.min - g.joined} more students`}
                  </p>
                </div>
                <div style={{ marginLeft: "auto", textAlign: "right" }}>
                  <p style={{ fontSize: 22, fontWeight: 800, fontFamily: "Syne", color: localTime < 7200 ? "var(--coral)" : "var(--text)" }}>
                    {fmtTime(localTime)}
                  </p>
                </div>
              </div>
              <div className="progress-bar" style={{ marginBottom: 8 }}>
                <div className="progress-fill" style={{
                  width: `${Math.min(pct, 100)}%`,
                  background: thresholdMet ? "linear-gradient(90deg,var(--green),var(--green-dark))" : "linear-gradient(90deg,#E8890A,#B56205)"
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)" }}>
                <span><strong style={{ color: "var(--text)" }}>{g.joined}</strong> joined</span>
                <span>Need <strong style={{ color: "var(--text)" }}>{g.min}</strong> minimum</span>
              </div>
            </div>

            {/* Members */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, fontWeight: 600 }}>Current group members</p>
              <div style={{ display: "flex" }}>
                {g.members.slice(0, 6).map((m: string, i: number) => (
                  <div key={i} style={{
                    width: 34, height: 34, borderRadius: 999,
                    background: `hsl(${140 + i * 25},50%,38%)`,
                    border: "2.5px solid #fff", marginLeft: i > 0 ? -10 : 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                  }}>
                    {m[0]}
                  </div>
                ))}
                {g.joined > 6 && (
                  <div style={{
                    width: 34, height: 34, borderRadius: 999, background: "var(--green-light)",
                    border: "2.5px solid #fff", marginLeft: -10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 700, color: "var(--green)", flexShrink: 0
                  }}>+{g.joined - 6}</div>
                )}
                {!alreadyJoined && (
                  <div style={{
                    width: 34, height: 34, borderRadius: 999,
                    background: "var(--green)", border: "2.5px solid #fff", marginLeft: -10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0, color: "#fff"
                  }}>+</div>
                )}
              </div>
            </div>

            {/* Hub selector */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Pickup Hub</p>
              {HUBS.map((h: string) => (
                <button key={h} onClick={() => setSelectedHub(h)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, width: "100%",
                    padding: "13px 14px", marginBottom: 8, borderRadius: 12,
                    border: selectedHub === h ? "2px solid var(--green)" : "1px solid var(--border)",
                    background: selectedHub === h ? "var(--green-light)" : "#fff", textAlign: "left",
                    transition: "all 0.18s"
                  }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: selectedHub === h ? "rgba(22,164,122,0.2)" : "var(--surface)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <Icon name="map" size={15} color={selectedHub === h ? "var(--green)" : "var(--muted)"} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: selectedHub === h ? 700 : 400, color: selectedHub === h ? "var(--green-dark)" : "var(--text)", flex: 1 }}>
                    {h}
                  </span>
                  {selectedHub === h && <Icon name="check" size={16} color="var(--green)" />}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            <div className="card" style={{ marginBottom: 16, border: "1.5px solid var(--amber)", borderRadius: 16 }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <Icon name="warning" size={20} color="var(--amber)" />
                <p style={{ fontWeight: 700, fontSize: 14 }}>Buying solo costs more</p>
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
                You'll pay <strong>GHS {p.price}</strong> instead of{" "}
                <strong style={{ color: "var(--green)" }}>GHS {p.groupPrice}</strong> in a group.
                That's <strong style={{ color: "var(--coral)" }}>GHS {p.price - p.groupPrice} extra</strong> you're leaving on the table.
              </p>
            </div>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Pickup Hub</p>
              <select value={selectedHub} onChange={(e) => setSelectedHub(e.target.value)}
                style={{
                  width: "100%", padding: "13px", borderRadius: 12,
                  border: "1px solid var(--border)", fontSize: 13, background: "#fff", outline: "none"
                }}>
                {HUBS.map((h: string) => <option key={h}>{h}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)",
        width: "calc(100% - 32px)", maxWidth: 398, padding: "0"
      }}>
        <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)", borderRadius: 16, padding: "12px 0 0" }}>
          {tab === "group" ? (
            <div style={{ display: "flex", gap: 10 }}>
              {!alreadyJoined ? (
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => joinGroup(p.id)}>
                  <Icon name="users" size={16} /> Join
                </button>
              ) : (
                <div style={{
                  flex: 1, display: "flex", alignItems: "center", gap: 6,
                  background: "var(--green-light)", borderRadius: 10, padding: "12px 16px",
                  border: "1.5px solid var(--green)"
                }}>
                  <Icon name="check-circle" size={16} color="var(--green)" />
                  <span style={{ fontSize: 13, color: "var(--green-dark)", fontWeight: 600 }}>Joined!</span>
                </div>
              )}
              <button className="btn btn-primary btn-lg" style={{ flex: 2 }}
                onClick={handleGroupConfirm} disabled={paying}>
                {paying ? "Holding payment..." : `Hold GHS ${p.groupPrice}`}
              </button>
            </div>
          ) : (
            <button className="btn btn-amber btn-lg" style={{ width: "100%" }}
              onClick={handleSoloPay} disabled={paying}>
              {paying ? "Processing..." : `Buy Solo — GHS ${p.price}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Stage3Screen() {
  const { selectedProduct: p, orderRef, selectedHub, setScreen } = useApp();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const steps = [
    { label: "Payments captured", icon: "check-circle", color: "var(--green)" },
    { label: "Purchase order sent to supplier", icon: "zap", color: "var(--purple)" },
    { label: "Supplier confirmed", icon: "package", color: "var(--amber)" },
  ];

  if (!p) return null;

  return (
    <div className="fade-in" style={{ paddingBottom: 100 }}>
      <TopBar title="Stage 3 — Procurement" />
      <div style={{ padding: "24px 16px" }}>
        <div className="card" style={{ marginBottom: 20, textAlign: "center", borderRadius: 18 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 999,
            background: "linear-gradient(135deg, var(--green-light), #c8f0e0)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
            boxShadow: "0 4px 20px rgba(22,164,122,0.2)"
          }}>
            <Icon name="zap" size={30} color="var(--green)" />
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
            {step < 3 ? "Processing your order..." : "Order Confirmed!"}
          </h3>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>
            {step < 3 ? "Auto-triggering supplier..." : `Group discount locked at GHS ${p.groupPrice}`}
          </p>
        </div>

        <div className="card" style={{ marginBottom: 20, borderRadius: 18 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", marginBottom: 14, letterSpacing: "0.06em" }}>
            PROCUREMENT STEPS
          </p>
          {steps.map((s, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "center",
              padding: "12px 0", borderBottom: i < 2 ? "1px solid var(--border)" : undefined
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 999, flexShrink: 0,
                background: step > i ? "var(--green-light)" : "var(--surface)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.4s", border: step > i ? "1.5px solid var(--green)" : "1px solid var(--border)"
              }}>
                {step > i
                  ? <Icon name="check" size={16} color="var(--green)" />
                  : <div className={step === i ? "pulse" : ""} style={{
                    width: 10, height: 10, borderRadius: 999,
                    background: step === i ? "var(--green)" : "var(--border)"
                  }} />
                }
              </div>
              <span style={{ fontSize: 13, fontWeight: step > i ? 700 : 400, color: step > i ? "var(--text)" : "var(--muted)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {step >= 3 && (
          <div className="card slide-up" style={{ marginBottom: 20, border: "1.5px solid var(--green)", borderRadius: 18 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--green)", marginBottom: 12, letterSpacing: "0.06em" }}>
              ORDER CONFIRMED
            </p>
            {[
              ["Order Ref", orderRef],
              ["Product", p.name],
              ["You pay", `GHS ${p.groupPrice}`],
              ["You save", `GHS ${p.price - p.groupPrice}`],
              ["Pickup Hub", selectedHub],
              ["Est. Delivery", "Today, 6–8pm"],
            ].map(([label, val]) => (
              <div key={label} style={{
                display: "flex", justifyContent: "space-between",
                padding: "9px 0", borderBottom: "1px solid var(--border)", fontSize: 13
              }}>
                <span style={{ color: "var(--muted)" }}>{label}</span>
                <span style={{ fontWeight: 700 }}>{val}</span>
              </div>
            ))}
          </div>
        )}

        {step >= 3 && (
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setScreen("browse")}>
              <Icon name="search" size={15} /> Keep Shopping
            </button>
            <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => setScreen("stage4")}>
              Track Order <Icon name="arrow" size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Stage4Screen() {
  const { setScreen, selectedProduct: p, orderRef } = useApp();
  const [progress, setProgress] = useState(18);

  useEffect(() => {
    const iv = setInterval(() => setProgress((v) => Math.min(v + 0.5, 92)), 800);
    return () => clearInterval(iv);
  }, []);

  const statusStages = [
    { label: "Order placed",         done: true,  time: "11:02 AM" },
    { label: "Supplier confirmed",   done: true,  time: "11:14 AM" },
    { label: "Quality check",        done: progress > 50, time: progress > 50 ? "11:45 AM" : "" },
    { label: "Out for delivery",     done: progress > 75, time: progress > 75 ? "12:30 PM" : "" },
    { label: "Delivered to hub",     done: false, time: "" },
  ];

  return (
    <div className="fade-in" style={{ paddingBottom: 90 }}>
      <TopBar title="Stage 4 — Live Tracking" right={<span className="badge badge-green">LIVE</span>} />
      <div style={{ padding: "16px" }}>
        <div style={{
          background: "linear-gradient(160deg, #07201A, #0D3D2C)", borderRadius: 18,
          height: 180, display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16, position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.25,
            backgroundImage: "radial-gradient(circle, rgba(22,164,122,0.8) 1px, transparent 1px)",
            backgroundSize: "22px 22px"
          }} />
          <div style={{ textAlign: "center", color: "#fff", position: "relative" }}>
            <div className="pulse">
              <Icon name="truck" size={44} color="var(--green-mid)" />
            </div>
            <p style={{ marginTop: 10, fontSize: 14, fontWeight: 700 }}>Rider en route</p>
            <p style={{ fontSize: 12, color: "var(--green-mid)", marginTop: 4 }}>ETA: 35 minutes</p>
          </div>
          <div style={{
            position: "absolute", bottom: 16, left: 16, right: 16
          }}>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 6, textAlign: "center" }}>
              {Math.round(progress)}% to delivery hub
            </p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 16, borderRadius: 18 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", marginBottom: 14, letterSpacing: "0.06em" }}>
            ORDER TIMELINE
          </p>
          {statusStages.map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
              borderBottom: i < statusStages.length - 1 ? "1px solid var(--border)" : undefined
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 999, flexShrink: 0,
                background: s.done ? "var(--green-light)" : "var(--surface)",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: s.done ? "1.5px solid var(--green)" : "1px solid var(--border)"
              }}>
                {s.done
                  ? <Icon name="check" size={14} color="var(--green)" />
                  : <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--border)" }} />
                }
              </div>
              <span style={{ flex: 1, fontSize: 13, fontWeight: s.done ? 600 : 400, color: s.done ? "var(--text)" : "var(--muted)" }}>
                {s.label}
              </span>
              {s.time && <span style={{ fontSize: 11, color: "var(--muted)" }}>{s.time}</span>}
            </div>
          ))}
        </div>

        {p && (
          <div className="card" style={{ marginBottom: 16, borderRadius: 18 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                <ProductImage product={p} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</p>
                <p style={{ fontSize: 12, color: "var(--muted)" }}>Ref: {orderRef}</p>
                <p style={{ fontSize: 12, color: "var(--green)", fontWeight: 600, marginTop: 2 }}>GHS {p.groupPrice}</p>
              </div>
            </div>
          </div>
        )}

        <button className="btn btn-primary btn-lg" style={{ width: "100%" }} onClick={() => setScreen("stage5")}>
          View Sorting Screen <Icon name="arrow" size={16} />
        </button>
      </div>
    </div>
  );
}

function Stage5Screen() {
  const { setScreen, orderRef, selectedHub, studentName } = useApp();
  const [sorted, setSorted] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  const packages = [
    { name: studentName, hub: selectedHub, ref: orderRef, status: "labelled" },
    { name: "Ama Mensah",   hub: "Pentagon Hostel",    ref: "SC-2026-X1Y", status: "sorting" },
    { name: "Kofi Adjei",   hub: "Main Library Steps", ref: "SC-2026-PQ7", status: "labelled" },
  ];

  return (
    <div className="fade-in" style={{ paddingBottom: 90 }}>
      <TopBar title="Stage 5 — Sorting" right={<span className="badge badge-amber">OPS VIEW</span>} />
      <div style={{ padding: "16px" }}>
        <div className="card" style={{ marginBottom: 16, borderRadius: 18 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", marginBottom: 14, letterSpacing: "0.06em" }}>
            PACKAGE QUEUE
          </p>
          {packages.map((pkg, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "center", padding: "12px 0",
              borderBottom: i < packages.length - 1 ? "1px solid var(--border)" : undefined
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: pkg.status === "labelled" ? "var(--green-light)" : "var(--amber-light)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Icon name="package" size={18} color={pkg.status === "labelled" ? "var(--green)" : "var(--amber)"} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700 }}>{pkg.name}</p>
                <p style={{ fontSize: 11, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {pkg.hub}
                </p>
                <p style={{ fontSize: 10, color: "var(--muted)", fontFamily: "monospace", marginTop: 1 }}>{pkg.ref}</p>
              </div>
              <span className={`badge ${pkg.status === "labelled" ? "badge-green" : "badge-amber"}`}>
                {pkg.status === "labelled" ? "Labelled ✓" : "Sorting"}
              </span>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginBottom: 16, textAlign: "center", borderRadius: 18 }}>
          <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Your Package Label</p>
          <div style={{
            background: "var(--surface)", borderRadius: 12, padding: "20px",
            border: "2px dashed var(--border)", marginBottom: 12
          }}>
            <div style={{ width: 80, height: 80, margin: "0 auto 12px", display: "grid", gridTemplateColumns: "repeat(8,10px)", gap: 1 }}>
              {Array.from({ length: 64 }, (_, i) => (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: 1,
                  background: [0,1,2,3,4,5,6,8,14,16,22,24,30,32,38,40,41,42,43,44,45,46,48,54,56,57,58,59,60,61,62,9,11,13,17,19,21,25,27,29,33,35,37,50,52].includes(i)
                    ? "var(--text)" : "var(--surface)"
                }} />
              ))}
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, fontFamily: "monospace", letterSpacing: "0.1em" }}>{orderRef}</p>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{studentName}</p>
            <p style={{ fontSize: 12, color: "var(--green)", marginTop: 2, fontWeight: 600 }}>{selectedHub}</p>
          </div>
        </div>

        {!sorted ? (
          <button className="btn btn-primary btn-lg" style={{ width: "100%" }} onClick={() => setSorted(true)}>
            <Icon name="check" size={16} /> Mark All Sorted & Labelled
          </button>
        ) : !dispatched ? (
          <button className="btn btn-dark btn-lg" style={{ width: "100%" }}
            onClick={() => { setDispatched(true); setTimeout(() => setScreen("stage6"), 1000); }}>
            <Icon name="truck" size={16} /> Dispatch Rider
          </button>
        ) : (
          <div style={{ textAlign: "center", padding: 16 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--green)" }}>Rider Dispatched!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Stage6Screen() {
  const { setScreen, studentName, selectedHub, orderRef } = useApp();
  const [arrived, setArrived] = useState(false);
  const [notified, setNotified] = useState(false);

  return (
    <div className="fade-in" style={{ paddingBottom: 90 }}>
      <TopBar title="Stage 6 — Hub Arrival" right={<span className="badge badge-blue">RIDER VIEW</span>} />
      <div style={{ padding: "16px" }}>
        <div style={{
          background: "linear-gradient(160deg, #07201A, #0D3D2C)",
          borderRadius: 18, height: 180,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16, position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.2,
            backgroundImage: "radial-gradient(circle, rgba(22,164,122,0.6) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }} />
          <div style={{ textAlign: "center", color: "#fff", position: "relative" }}>
            <Icon name="map" size={44} color="var(--green-mid)" />
            <p style={{ marginTop: 10, fontSize: 15, fontWeight: 700 }}>{selectedHub}</p>
            <span className="badge" style={{ background: arrived ? "rgba(22,164,122,0.4)" : "rgba(255,255,255,0.1)", color: "#fff", marginTop: 8, display: "inline-flex" }}>
              {arrived ? "✓ Arrived" : "En route"}
            </span>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 16, borderRadius: 18 }}>
          {[["Hub", selectedHub], ["Packages", "3 items"], ["Students", "3 students"], ["ETA", "Arrived"]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--muted)" }}>{l}</span>
              <span style={{ fontWeight: 700 }}>{v}</span>
            </div>
          ))}
        </div>

        {notified && (
          <div style={{
            background: "linear-gradient(135deg, #07201A, #0D3D2C)",
            borderRadius: 18, padding: 18, marginBottom: 16, animation: "fadeIn 0.4s ease"
          }}>
            <p style={{ fontSize: 10, color: "var(--green-mid)", fontWeight: 700, marginBottom: 10, letterSpacing: "0.08em" }}>
              AUTO-NOTIFICATION SENT
            </p>
            <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: 14 }}>
              <p style={{ color: "#fff", fontSize: 13, lineHeight: 1.7 }}>
                <strong>SmartCart Campus</strong><br />
                Hi {studentName}! Your order is ready at <strong>{selectedHub}</strong>.<br />
                Pickup code: <strong style={{ fontFamily: "monospace", fontSize: 16, color: "var(--green-mid)" }}>
                  {orderRef.split("-").pop()}
                </strong><br />
                Collect by 8:00 PM today.
              </p>
            </div>
            <p style={{ fontSize: 11, color: "var(--green-mid)", marginTop: 10, fontWeight: 600 }}>SMS + Push sent ✓</p>
          </div>
        )}

        {!arrived ? (
          <button className="btn btn-primary btn-lg" style={{ width: "100%" }}
            onClick={() => { setArrived(true); setTimeout(() => setNotified(true), 1500); }}>
            <Icon name="map" size={16} /> Check In at Hub
          </button>
        ) : !notified ? (
          <div style={{ textAlign: "center", padding: 20 }}>
            <div className="pulse" style={{
              width: 44, height: 44, borderRadius: 999, background: "var(--green-light)",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px"
            }}>
              <Icon name="bell" size={20} color="var(--green)" />
            </div>
            <p style={{ color: "var(--muted)", fontSize: 13 }}>Sending notifications...</p>
          </div>
        ) : (
          <button className="btn btn-dark btn-lg" style={{ width: "100%" }} onClick={() => setScreen("stage7")}>
            Go to Collection <Icon name="arrow" size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function Stage7Screen() {
  const { qrScanned, setQrScanned, rating, setRating, orderRef, selectedHub, selectedProduct: p, savings, setSavings, setScreen, notify } = useApp();
  const [pin, setPin] = useState("");
  const [scanning, setScanning] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const correctPin = orderRef.split("-").pop();

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => { setQrScanned(true); setScanning(false); }, 2000);
  };

  const handlePinSubmit = () => {
    if (pin === correctPin) { setQrScanned(true); }
    else { notify("Incorrect PIN. Try again.", "error"); }
  };

  const handleConfirm = () => {
    const saved = p ? p.price - p.groupPrice : 18;
    setSavings((s: number) => s + saved);
    setConfirmed(true);
    setTimeout(() => setShowReview(true), 600);
    notify("Order confirmed! Payment released to supplier.");
  };

  if (showReview) {
    return (
      <div className="fade-in" style={{ paddingBottom: 90 }}>
        <div style={{
          background: "linear-gradient(160deg, #07201A, #0D3D2C)",
          padding: "36px 20px 32px", textAlign: "center"
        }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>🎉</div>
          <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, fontFamily: "Syne", marginBottom: 6 }}>Order Complete!</h2>
          <p style={{ color: "var(--green-mid)", fontSize: 14 }}>Transaction fully closed</p>
        </div>
        <div style={{ padding: "20px 16px" }}>
          <div style={{
            background: "linear-gradient(135deg, #DFF4EC, #c8f0e0)",
            border: "2px solid var(--green)", borderRadius: 20,
            padding: "24px 20px", textAlign: "center", marginBottom: 16
          }}>
            <p style={{ fontSize: 11, color: "var(--green-dark)", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 4 }}>YOU SAVED</p>
            <p style={{ fontSize: 44, fontWeight: 800, color: "var(--green)", fontFamily: "Syne" }}>
              GHS {p ? (p.price - p.groupPrice).toFixed(2) : "18.00"}
            </p>
            <p style={{ fontSize: 13, color: "var(--green-dark)", marginTop: 4 }}>vs buying solo this order</p>
          </div>

          <div className="card" style={{ marginBottom: 16, borderRadius: 18 }}>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Rate your experience</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 12 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setRating(n)} style={{ background: "none", fontSize: 30, transition: "transform 0.15s" }}>
                  <span style={{ filter: rating >= n ? "none" : "grayscale(1)", opacity: rating >= n ? 1 : 0.4 }}>⭐</span>
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p style={{ textAlign: "center", fontSize: 13, color: "var(--green)", fontWeight: 600 }}>
                {["","Poor","Fair","Good","Great","Excellent!"][rating]} — Thanks!
              </p>
            )}
          </div>

          <div style={{
            background: "linear-gradient(135deg, #07201A, #0D3D2C)",
            borderRadius: 18, padding: 20, marginBottom: 16
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 10, color: "var(--green-mid)", fontWeight: 700, marginBottom: 4, letterSpacing: "0.08em" }}>TOTAL LIFETIME SAVINGS</p>
                <p style={{ fontSize: 30, fontWeight: 800, color: "#fff", fontFamily: "Syne" }}>GHS {savings.toFixed(2)}</p>
                <p style={{ fontSize: 12, color: "var(--green-mid)", marginTop: 2 }}>with SmartCart Campus</p>
              </div>
              <Icon name="bar-chart" size={44} color="rgba(143,221,189,0.5)" />
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, var(--purple-light), var(--blue-light))",
            border: "1.5px solid var(--purple)", borderRadius: 18, padding: 18, marginBottom: 20
          }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <Icon name="gift" size={20} color="var(--purple)" />
              <p style={{ fontWeight: 700, fontSize: 14, color: "var(--purple)" }}>Upgrade to SmartCart Pro</p>
            </div>
            <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12, lineHeight: 1.6 }}>
              Get priority group access, full AI budget reports, and early-bird deals every week.
            </p>
            <button className="btn" style={{ background: "var(--purple)", color: "#fff", width: "100%", fontSize: 13, fontWeight: 700 }}>
              Try Pro — GHS 15/month
            </button>
          </div>

          <button className="btn btn-primary btn-lg" style={{ width: "100%" }} onClick={() => setScreen("home")}>
            <Icon name="home" size={16} /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ paddingBottom: 90 }}>
      <TopBar title="Stage 7 — Collection" />
      <div style={{ padding: "16px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{
            width: 76, height: 76, borderRadius: 999,
            background: "linear-gradient(135deg, var(--green-light), #c8f0e0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px", boxShadow: "0 4px 24px rgba(22,164,122,0.2)"
          }}>
            <Icon name="qr" size={34} color="var(--green)" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Collect Your Order</h3>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>{selectedHub}</p>
        </div>

        {!qrScanned ? (
          <>
            <div className="card" style={{ marginBottom: 16, textAlign: "center", borderRadius: 18 }}>
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Scan your QR code</p>
              <div style={{
                width: 180, height: 180, margin: "0 auto 16px", borderRadius: 16,
                border: "2px dashed var(--border)", display: "flex", alignItems: "center",
                justifyContent: "center", position: "relative", background: "var(--surface)"
              }}>
                {scanning ? (
                  <div style={{ textAlign: "center" }}>
                    <div className="pulse" style={{
                      width: 44, height: 44, borderRadius: 999, background: "var(--green-light)",
                      display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px"
                    }}>
                      <Icon name="refresh" size={22} color="var(--green)" />
                    </div>
                    <p style={{ fontSize: 12, color: "var(--green)", fontWeight: 600 }}>Scanning...</p>
                  </div>
                ) : (
                  <div>
                    <Icon name="qr" size={66} color="var(--border)" />
                    <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 8 }}>Camera viewfinder</p>
                  </div>
                )}
                {scanning && <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "var(--green)", animation: "scanLine 1s linear infinite",
                  boxShadow: "0 0 12px var(--green)"
                }} />}
              </div>
              <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleScan}>
                <Icon name="qr" size={16} /> Simulate QR Scan
              </button>
            </div>

            <div style={{ textAlign: "center", color: "var(--muted)", fontSize: 13, margin: "8px 0" }}>— or enter PIN manually —</div>

            <div className="card" style={{ borderRadius: 18 }}>
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Enter pickup code</p>
              <input value={pin} onChange={(e) => setPin(e.target.value.toUpperCase())}
                placeholder={`Try: ${correctPin}`}
                style={{
                  width: "100%", padding: "14px", borderRadius: 12,
                  border: "1px solid var(--border)", fontSize: 20, textAlign: "center",
                  fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: 700,
                  outline: "none", marginBottom: 10
                }} />
              <button className="btn btn-outline" style={{ width: "100%" }} onClick={handlePinSubmit}>
                Verify PIN
              </button>
            </div>
          </>
        ) : !confirmed ? (
          <div className="fade-in">
            <div style={{
              background: "linear-gradient(135deg, var(--green-light), #c8f0e0)",
              border: "2px solid var(--green)", borderRadius: 18,
              padding: 22, textAlign: "center", marginBottom: 16
            }}>
              <Icon name="check-circle" size={42} color="var(--green)" />
              <p style={{ fontSize: 16, fontWeight: 700, color: "var(--green-dark)", marginTop: 10 }}>Identity Verified!</p>
              <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{orderRef} · {selectedHub}</p>
            </div>
            <div className="card" style={{ marginBottom: 20, borderRadius: 18 }}>
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Package Details</p>
              {p && (
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                    <ProductImage product={p} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</p>
                    <p style={{ fontSize: 12, color: "var(--muted)" }}>Group price: GHS {p.groupPrice}</p>
                  </div>
                </div>
              )}
              <div style={{ background: "var(--amber-light)", borderRadius: 10, padding: 12 }}>
                <p style={{ fontSize: 12, color: "var(--amber)", fontWeight: 600 }}>
                  By confirming, you release payment to the supplier and close this order.
                </p>
              </div>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: "100%" }} onClick={handleConfirm}>
              <Icon name="check-circle" size={16} /> Confirm Receipt & Close Order
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function GroupsScreen() {
  const { groups, joinedGroups, joinGroup, PRODUCTS, setScreen, setSelectedProduct } = useApp();
  const [timers, setTimers] = useState<Record<number, number>>({});

  useEffect(() => {
    const iv = setInterval(() => {
      setTimers((t) => {
        const next: Record<number, number> = {};
        (PRODUCTS as typeof PRODUCTS).forEach((p: typeof PRODUCTS[0]) => {
          next[p.id] = (t[p.id] || groups[p.id].secondsLeft) - 1;
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [PRODUCTS, groups]);

  return (
    <div className="fade-in" style={{ paddingBottom: 90 }}>
      <div style={{ background: "linear-gradient(160deg, #07201A, #0D3D2C)", padding: "22px 16px 18px" }}>
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, fontFamily: "Syne", marginBottom: 4 }}>
          Active Group Orders
        </h2>
        <p style={{ color: "var(--green-mid)", fontSize: 13 }}>Join before the timer runs out</p>
      </div>
      <div style={{ padding: "16px" }}>
        {(PRODUCTS as typeof PRODUCTS).map((p: typeof PRODUCTS[0]) => {
          const g = groups[p.id];
          const pct = Math.round((g.joined / g.min) * 100);
          const timeLeft = timers[p.id] ?? g.secondsLeft;
          const met = g.joined >= g.min;

          return (
            <div key={p.id} style={{
              background: "#fff", border: "1px solid var(--border)", borderRadius: 18,
              marginBottom: 14, overflow: "hidden", boxShadow: "0 2px 16px rgba(7,32,26,0.07)"
            }}>
              <div style={{ display: "flex", gap: 0 }}>
                <div style={{ width: 80, height: 90, flexShrink: 0 }}>
                  <ProductImage product={p} />
                </div>
                <div style={{ flex: 1, padding: "12px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <p style={{ fontWeight: 700, fontSize: 13, flex: 1, marginRight: 8, lineHeight: 1.3 }}>{p.shortName}</p>
                    {met && <span className="badge badge-green" style={{ flexShrink: 0 }}>Ready</span>}
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "baseline", marginBottom: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "var(--green)", fontFamily: "Syne" }}>GHS {p.groupPrice}</span>
                    <span style={{ fontSize: 11, color: "var(--muted)", textDecoration: "line-through" }}>GHS {p.price}</span>
                  </div>
                  <div className="progress-bar" style={{ marginBottom: 5 }}>
                    <div className="progress-fill" style={{ width: `${Math.min(pct, 100)}%`, background: met ? "linear-gradient(90deg,var(--green),var(--green-dark))" : "linear-gradient(90deg,#E8890A,#B56205)" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)" }}>
                    <span>{g.joined}/{g.min} joined</span>
                    <span style={{ color: timeLeft < 3600 ? "var(--coral)" : "inherit", fontWeight: 600 }}>
                      {fmtTime(timeLeft)}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, padding: "10px 14px 14px" }}>
                <button className="btn btn-outline btn-sm" style={{ flex: 1 }}
                  onClick={() => { setSelectedProduct(p); setScreen("product"); }}>
                  View
                </button>
                <button className="btn btn-sm" style={{
                  flex: 2,
                  background: joinedGroups[p.id] ? "var(--green-light)" : "var(--green)",
                  color: joinedGroups[p.id] ? "var(--green-dark)" : "#fff",
                  border: joinedGroups[p.id] ? "1.5px solid var(--green)" : "none",
                  fontWeight: 700
                }}
                  onClick={() => { if (!joinedGroups[p.id]) joinGroup(p.id); }}>
                  {joinedGroups[p.id] ? "✓ Joined" : "Join Group"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrdersScreen() {
  const { completedOrders, setScreen } = useApp();
  return (
    <div className="fade-in" style={{ paddingBottom: 90 }}>
      <TopBar title="My Orders" />
      <div style={{ padding: "16px" }}>
        {completedOrders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "70px 20px" }}>
            <div style={{
              width: 80, height: 80, borderRadius: 999,
              background: "var(--surface)", border: "2px dashed var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px"
            }}>
              <Icon name="package" size={32} color="var(--border)" />
            </div>
            <p style={{ color: "var(--text)", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>No orders yet</p>
            <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 20 }}>Start shopping to see your orders here</p>
            <button className="btn btn-primary" onClick={() => setScreen("browse")}>
              Browse Products
            </button>
          </div>
        ) : (
          completedOrders.map((o: any, i: number) => (
            <div key={i} className="card" style={{ marginBottom: 12, borderRadius: 18, overflow: "hidden", padding: 0 }}>
              <div style={{ display: "flex" }}>
                <div style={{ width: 70, height: 70, flexShrink: 0 }}>
                  <ProductImage product={o.product} />
                </div>
                <div style={{ flex: 1, padding: "12px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <p style={{ fontWeight: 700, fontSize: 13 }}>{o.product.shortName}</p>
                    <span className={`badge ${o.isSolo ? "badge-amber" : "badge-green"}`}>
                      {o.isSolo ? "Solo" : "Group"}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--green)", fontWeight: 700, marginBottom: 3 }}>GHS {o.price}</p>
                  <p style={{ fontSize: 11, color: "var(--muted)" }}>{o.hub}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ProfileScreen() {
  const { studentName, savings, completedOrders, joinedGroups } = useApp();

  return (
    <div className="fade-in" style={{ paddingBottom: 90 }}>
      <div style={{ background: "linear-gradient(160deg, #07201A, #0D3D2C)", padding: "32px 16px 28px", textAlign: "center" }}>
        <div style={{
          width: 80, height: 80, borderRadius: 999,
          background: "linear-gradient(135deg, var(--green), var(--green-dark))",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 14px", fontSize: 32, boxShadow: "0 4px 24px rgba(22,164,122,0.4)"
        }}>
          {studentName[0]}
        </div>
        <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 800, fontFamily: "Syne", marginBottom: 4 }}>{studentName}</h2>
        <p style={{ color: "var(--green-mid)", fontSize: 13 }}>University of Ghana</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>
          <span className="badge badge-green">Verified Student</span>
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Total Saved", value: `GHS ${savings.toFixed(0)}`, color: "var(--green)" },
            { label: "Orders", value: completedOrders.length, color: "var(--text)" },
            { label: "Groups Joined", value: Object.keys(joinedGroups).length, color: "var(--purple)" },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: "#fff", border: "1px solid var(--border)", borderRadius: 16,
              padding: "14px 12px", textAlign: "center", boxShadow: "var(--shadow)"
            }}>
              <p style={{ fontSize: 20, fontWeight: 800, fontFamily: "Syne", color: stat.color }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: "var(--muted)", marginTop: 2, fontWeight: 600 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {[
          ["Notification Settings", "bell"],
          ["Payment Methods", "cart"],
          ["Saved Addresses", "map"],
          ["Referral Programme", "gift"],
        ].map(([label, icon]) => (
          <div key={label} style={{
            background: "#fff", border: "1px solid var(--border)", borderRadius: 14,
            padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12,
            cursor: "pointer", boxShadow: "0 1px 8px rgba(7,32,26,0.04)"
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={icon} size={17} color="var(--green)" />
            </div>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{label}</span>
            <Icon name="arrow" size={16} color="var(--muted)" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SmartCartCampus() {
  return (
    <AppProvider>
      <GlobalStyle />
      <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", position: "relative", overflow: "hidden", background: "var(--surface)" }}>
        <Toast />
        <ScreenRouter />
        <BottomNav />
      </div>
    </AppProvider>
  );
}

function ScreenRouter() {
  const { screen } = useApp();
  switch (screen) {
    case "home":    return <HomeScreen />;
    case "browse":  return <BrowseScreen />;
    case "product": return <ProductScreen />;
    case "stage3":  return <Stage3Screen />;
    case "stage4":  return <Stage4Screen />;
    case "stage5":  return <Stage5Screen />;
    case "stage6":  return <Stage6Screen />;
    case "stage7":  return <Stage7Screen />;
    case "groups":  return <GroupsScreen />;
    case "orders":  return <OrdersScreen />;
    case "profile": return <ProfileScreen />;
    default:        return <HomeScreen />;
  }
}

export default SmartCartCampus;
