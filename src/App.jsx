import { useState, useEffect, useRef } from "react";

const T = {
  fr: {
    // Nav
    caisse: "🧾 Caisse", cuisine: "👨‍🍳 Cuisine", stocks: "📦 Stocks",
    dashboard: "📊 Dashboard", menuPrix: "⚙️ Menu & Prix", sysconfig: "🔧 Config. Système",
    // Login
    loginTitle: "Qui êtes-vous ?", loginChoose: "Choisissez votre prénom",
    loginOr: "Ou tapez votre prénom...", loginPoste: "Poste du jour",
    loginBtn: "→ Commencer",
    roles: { Caisse: "🧾 Caisse", Cuisine: "👨‍🍳 Cuisine", Service: "🍽️ Service" },
    // Order modes
    comptoir: "Comptoir", table: "Table", emporter: "A emporter", livraison: "Livraison",
    tableNo: "Table n°", autreTable: "Autre",
    clientNom: "Nom du client *", adresse: "Adresse de livraison *",
    telephone: "Téléphone (optionnel)", remarques: "Remarques (code porte, étage, instructions...)",
    // Cart
    commande: "Commande", envoyerCuisine: "✓ ENVOYER EN CUISINE",
    viderCommande: "Vider la commande", remise: "🎁 Remise", total: "TOTAL",
    // Kitchen
    enCours: "🔥 En cours", termineesRecentes: "✓ Terminées récentes",
    enPreparation: "En préparation", pret: "Prêt", servi: "Servi",
    enRoute: "En route", termine: "Terminé", annuler: "Annuler",
    encaisser: "💰 Encaisser", encaissement: "💰 Encaissement",
    confirmerEncaissement: "✓ Confirmer l'encaissement",
    aucuneCommande: "{t ? t.aucuneCommande : "Aucune commande en cours"}",
    // Payment
    cb: "Carte bancaire", especes: "Espèces", mixte: "Mixte CB + Espèces",
    modePaiement: "Mode de paiement",
    // Stock
    stockBas: "⚠️ Stock bas", rupture: "RUPTURE", ok: "OK", bas: "BAS",
    reaappro: "Réappro", ajouter: "+ Ajouter", quantite: "Qté",
    // Dashboard
    caJour: "CA du jour", commandes: "Commandes", ticketMoyen: "Ticket moyen",
    alertesStock: "Alertes stock", clotureCaisse: "Clôture de caisse",
    clotureSub: "Espèces attendues dans le tiroir",
    repartitionMode: "Répartition par mode", activiteHeure: "Activité par heure",
    cloturService: "🌙 Clôture de service",
    // Settings
    articles: "Articles", formules: "Formules", categories: "Catégories", equipe: "👥 Équipe",
    ajouterArticle: "+ Ajouter un article", ajouterFormule: "+ Ajouter une formule",
    modifier: "✏️ Modifier", supprimer: "🗑️", actif: "✓ Actif", inactif: "⏸ Inactif",
    sauver: "✓ Sauver", annulerBtn: "✕ Annuler",
    // Misc
    changer: "Changer", surPlace: "Sur place", messagesCuisine: "📢 Message cuisine",
    envoyer: "Envoyer", passer: "Passer",
  },
  es: {
    // Nav
    caisse: "🧾 Caja", cuisine: "👨‍🍳 Cocina", stocks: "📦 Stock",
    dashboard: "📊 Panel", menuPrix: "⚙️ Menú & Precios", sysconfig: "🔧 Config. Sistema",
    // Login
    loginTitle: "¿Quién eres?", loginChoose: "Elige tu nombre",
    loginOr: "O escribe tu nombre...", loginPoste: "Puesto de hoy",
    loginBtn: "→ Empezar",
    roles: { Caisse: "🧾 Caja", Cuisine: "👨‍🍳 Cocina", Service: "🍽️ Servicio" },
    // Order modes
    comptoir: "Mostrador", table: "Mesa", emporter: "Para llevar", livraison: "Domicilio",
    tableNo: "Mesa n°", autreTable: "Otra",
    clientNom: "Nombre del cliente *", adresse: "Dirección de entrega *",
    telephone: "Teléfono (opcional)", remarques: "Notas (código puerta, piso, instrucciones...)",
    // Cart
    commande: "Pedido", envoyerCuisine: "✓ ENVIAR A COCINA",
    viderCommande: "Vaciar pedido", remise: "🎁 Descuento", total: "TOTAL",
    // Kitchen
    enCours: "🔥 En curso", termineesRecentes: "✓ Completados recientes",
    enPreparation: "En preparación", pret: "Listo", servi: "Servido",
    enRoute: "En camino", termine: "Completado", annuler: "Cancelar",
    encaisser: "💰 Cobrar", encaissement: "💰 Cobro",
    confirmerEncaissement: "✓ Confirmar cobro",
    aucuneCommande: "Sin pedidos en curso — tranquilo 😎",
    // Payment
    cb: "Tarjeta bancaria", especes: "Efectivo", mixte: "Mixto Tarjeta + Efectivo",
    modePaiement: "Forma de pago",
    // Stock
    stockBas: "⚠️ Stock bajo", rupture: "AGOTADO", ok: "OK", bas: "BAJO",
    reaappro: "Reponer", ajouter: "+ Añadir", quantite: "Cant.",
    // Dashboard
    caJour: "Ventas del día", commandes: "Pedidos", ticketMoyen: "Ticket medio",
    alertesStock: "Alertas stock", clotureCaisse: "Cierre de caja",
    clotureSub: "Efectivo esperado en caja",
    repartitionMode: "Reparto por modo", activiteHeure: "Actividad por hora",
    cloturService: "🌙 Cierre de servicio",
    // Settings
    articles: "Artículos", formules: "Menús", categories: "Categorías", equipe: "👥 Equipo",
    ajouterArticle: "+ Añadir artículo", ajouterFormule: "+ Añadir menú",
    modifier: "✏️ Editar", supprimer: "🗑️", actif: "✓ Activo", inactif: "⏸ Inactivo",
    sauver: "✓ Guardar", annulerBtn: "✕ Cancelar",
    // Misc
    changer: "Cambiar", surPlace: "En local", messagesCuisine: "📢 Mensaje cocina",
    envoyer: "Enviar", passer: "Omitir",
  }
};

const INITIAL_CATEGORIES = ["Burgers", "Sandwichs", "Bistrot", "Boissons", "Desserts", "Extras"];

const INITIAL_MENU = [
  { id: "b1", cat: "Burgers", name: "Smash Burger Simple", price: 8.5, emoji: "🍔", stock: 40, threshold: 10, unit: "portions" },
  { id: "b2", cat: "Burgers", name: "Smash Burger Double", price: 11, emoji: "🍔", stock: 35, threshold: 8, unit: "portions" },
  { id: "b3", cat: "Burgers", name: "Burger Brioche Classic", price: 9.5, emoji: "🥪", stock: 30, threshold: 8, unit: "portions" },
  { id: "b4", cat: "Burgers", name: "Burger Brioche Bacon", price: 12, emoji: "🥪", stock: 25, threshold: 6, unit: "portions" },
  { id: "b5", cat: "Burgers", name: "Smash Burger Veggie", price: 9, emoji: "🌿", stock: 20, threshold: 5, unit: "portions" },
  { id: "s1", cat: "Sandwichs", name: "Chicken Tikka", price: 8, emoji: "🫓", stock: 30, threshold: 8, unit: "portions", modifiers: [{ id: "sauce_sand", label: "Sauce sandwich", options: ["Algérienne","Mayonnaise","Ketchup","Harissa","Blanche","BBQ","Samouraï"], required: false, maxSelect: 2 }] },
  { id: "s2", cat: "Sandwichs", name: "Triple Steak", price: 10, emoji: "🫓", stock: 25, threshold: 6, unit: "portions", modifiers: [{ id: "sauce_sand", label: "Sauce sandwich", options: ["Algérienne","Mayonnaise","Ketchup","Harissa","Blanche","BBQ","Samouraï"], required: false, maxSelect: 2 }] },
  { id: "s3", cat: "Sandwichs", name: "Chicken Crispy", price: 8.5, emoji: "🫓", stock: 28, threshold: 7, unit: "portions", modifiers: [{ id: "sauce_sand", label: "Sauce sandwich", options: ["Algérienne","Mayonnaise","Ketchup","Harissa","Blanche","BBQ","Samouraï"], required: false, maxSelect: 2 }] },
  { id: "s4", cat: "Sandwichs", name: "Mix Viandes", price: 9.5, emoji: "🫓", stock: 20, threshold: 5, unit: "portions", modifiers: [{ id: "sauce_sand", label: "Sauce sandwich", options: ["Algérienne","Mayonnaise","Ketchup","Harissa","Blanche","BBQ","Samouraï"], required: false, maxSelect: 2 }] },
  { id: "p1", cat: "Bistrot", name: "Entrecôte Frites", price: 18, emoji: "🥩", stock: 15, threshold: 4, unit: "portions" },
  { id: "p2", cat: "Bistrot", name: "Tartare Maison", price: 16, emoji: "🍽️", stock: 12, threshold: 3, unit: "portions" },
  { id: "p3", cat: "Bistrot", name: "Poulet Braisé", price: 15, emoji: "🍗", stock: 10, threshold: 3, unit: "portions" },
  { id: "p4", cat: "Bistrot", name: "Salade César", price: 12, emoji: "🥗", stock: 18, threshold: 5, unit: "portions" },
  { id: "d1", cat: "Boissons", name: "Coca-Cola 33cl", price: 3, emoji: "🥤", stock: 80, threshold: 20, unit: "canettes" },
  { id: "d2", cat: "Boissons", name: "Eau 50cl", price: 2, emoji: "💧", stock: 100, threshold: 25, unit: "bouteilles" },
  { id: "d3", cat: "Boissons", name: "Jus Orange", price: 3.5, emoji: "🍊", stock: 60, threshold: 15, unit: "bouteilles" },
  { id: "d4", cat: "Boissons", name: "Limonade", price: 3, emoji: "🍋", stock: 50, threshold: 12, unit: "canettes" },
  { id: "d5", cat: "Boissons", name: "Café", price: 2, emoji: "☕", stock: 200, threshold: 50, unit: "doses" },
  { id: "e1", cat: "Extras", name: "Frites Maison", price: 3.5, emoji: "🍟", stock: 50, threshold: 12, unit: "portions" },
  { id: "e2", cat: "Extras", name: "Sauce +", price: 0.5, emoji: "🧴", stock: 200, threshold: 50, unit: "unités", variants: ["Algérienne","Mayonnaise","Ketchup","Harissa","Blanche","BBQ","Samouraï"] },
  { id: "e3", cat: "Extras", name: "Supplément Fromage", price: 1, emoji: "🧀", stock: 100, threshold: 20, unit: "unités" },
  // Desserts
  { id: "ds1", cat: "Desserts", name: "Tiramisu Maison", price: 6, emoji: "🍮", stock: 12, threshold: 3, unit: "portions" },
  { id: "ds2", cat: "Desserts", name: "Coulant Chocolat", price: 6.5, emoji: "🍫", stock: 10, threshold: 3, unit: "portions" },
  { id: "ds3", cat: "Desserts", name: "Cheesecake", price: 5.5, emoji: "🍰", stock: 8, threshold: 2, unit: "portions" },
  { id: "ds4", cat: "Desserts", name: "Glace 2 boules", price: 4, emoji: "🍦", stock: 30, threshold: 8, unit: "portions" },
];

// Formules prédéfinies
const INITIAL_FORMULES = [
  { id: "f1", name: "Formule Smash", emoji: "🔥", price: 13.5, items: ["b1","e1","d1"], description: "Smash Simple + Frites + Coca", modifiers: [{ id: "sauce_frites", label: "Sauce frites", options: ["Algérienne","Mayonnaise","Ketchup","Harissa","Blanche","BBQ","Samouraï"], required: false, maxSelect: 2 }] },
  { id: "f2", name: "Formule Double", emoji: "💥", price: 16, items: ["b2","e1","d1"], description: "Smash Double + Frites + Coca", modifiers: [{ id: "sauce_frites", label: "Sauce frites", options: ["Algérienne","Mayonnaise","Ketchup","Harissa","Blanche","BBQ","Samouraï"], required: false, maxSelect: 2 }] },
  { id: "f3", name: "Formule Brioche", emoji: "⭐", price: 14.5, items: ["b3","e1","d2"], description: "Brioche Classic + Frites + Eau", modifiers: [{ id: "sauce_frites", label: "Sauce frites", options: ["Algérienne","Mayonnaise","Ketchup","Harissa","Blanche","BBQ","Samouraï"], required: false, maxSelect: 2 }] },
  { id: "f4", name: "Formule Sandwich", emoji: "🫓", price: 12.5, items: ["s1","e1","d1"], description: "Sandwich + Frites + Coca", modifiers: [{ id: "sauce_sand", label: "Sauce sandwich", options: ["Algérienne","Mayonnaise","Ketchup","Harissa","Blanche","BBQ","Samouraï"], required: false, maxSelect: 2 }, { id: "sauce_frites", label: "Sauce frites", options: ["Algérienne","Mayonnaise","Ketchup","Harissa","Blanche","BBQ","Samouraï"], required: false, maxSelect: 2 }] },
];

const INITIAL_EMPLOYEES = [
  { id: "emp1", name: "Hamza", isOwner: true },
  { id: "emp2", name: "Fatima", isOwner: false },
  { id: "emp3", name: "Mohamed", isOwner: false },
  { id: "emp4", name: "Wissal", isOwner: false },
];
const EMOJIS = ["🍔","🥪","🫓","🍗","🥩","🍽️","🥗","🍟","🧀","🧴","🥤","💧","🍊","🍋","☕","🌿","🔥","⭐","💥","🎯","🍮","🍫","🍰","🍦","🍩","🧁","🎂","🍪"];
const KITCHEN_ALERT_SECONDS = 600; // 10 minutes

let orderCounter = 1;
function generateOrderId() { return `#${String(orderCounter++).padStart(3, "0")}`; }

function useTimer() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(iv);
  }, []);
  return tick;
}

function elapsed(date) {
  return Math.floor((Date.now() - new Date(date).getTime()) / 1000);
}

function fmtElapsed(secs) {
  const m = Math.floor(secs / 60), s = secs % 60;
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

export default function App() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [lang, setLang] = useState("es"); // es by default
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [view, setView] = useState("pos");
  const [menuItems, setMenuItems] = useState(INITIAL_MENU);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [formules, setFormules] = useState(INITIAL_FORMULES);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderMode, setOrderMode] = useState("Comptoir"); // Comptoir | Table | A emporter | Livraison
  const [tableNumber, setTableNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryRemarks, setDeliveryRemarks] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("pct"); // pct | fixed
  const [discountPending, setDiscountPending] = useState(null); // value waiting for manager approval
  const [managerPinModal, setManagerPinModal] = useState(false);
  const [managerPinInput, setManagerPinInput] = useState("");
  const [managerPinError, setManagerPinError] = useState(false);
  const [encaisserModal, setEncaisserModal] = useState(null);
  const [encaisserMode, setEncaisserMode] = useState("CB");
  const [kitchenMessages, setKitchenMessages] = useState([]);
  const [showEndOfService, setShowEndOfService] = useState(false);
  const [activeCat, setActiveCat] = useState("Formules");
  const [notification, setNotification] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const t = T[lang];
  const lowStockItems = menuItems.filter(i => i.stock <= i.threshold);
  const pendingKitchen = orders.filter(o => o.status === "En préparation").length;
  const unreadMessages = kitchenMessages.filter(m => !m.read).length;

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2800);
  };

  const addToCart = (item, isFormule = false) => {
    if (!isFormule && item.stock === 0) { notify("Rupture de stock !", "error"); return; }
    const incomingNote = item.note || "";
    // If item has a note (from modifiers), always add as new line, never merge
    if (incomingNote) {
      const cartId = item.id + "_" + Date.now();
      setCart(prev => [...prev, { ...item, cartId, qty: 1, note: incomingNote, isFormule }]);
      return;
    }
    setCart(prev => {
      const existing = prev.find(c => c.cartId === item.id && !c.note);
      if (existing) return prev.map(c => c.cartId === item.id && !c.note ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, cartId: item.id, qty: 1, note: "", isFormule }];
    });
  };

  const addFormuleToCart = (formule, extraNote = "") => {
    const id = "formule_" + formule.id + "_" + Date.now();
    setCart(prev => [...prev, {
      id, cartId: id, name: formule.name, emoji: formule.emoji,
      price: formule.price, qty: 1, note: extraNote, isFormule: true,
      description: formule.description,
    }]);
  };

  const removeFromCart = (cartId) => setCart(prev => prev.filter(c => c.cartId !== cartId));

  const updateQty = (cartId, delta) => {
    setCart(prev => prev.map(c => c.cartId === cartId ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  };

  const updateNote = (cartId, note) => {
    setCart(prev => prev.map(c => c.cartId === cartId ? { ...c, note } : c));
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  const validateOrder = () => {
    if (cart.length === 0) return;
    if (orderMode === "Table" && !tableNumber) { notify("Indiquez le numéro de table", "error"); return; }
    if (orderMode === "Livraison" && !deliveryAddress) { notify("Indiquez l'adresse de livraison", "error"); return; }
    const destination = orderMode === "Table" ? `Table ${tableNumber}`
      : orderMode === "Livraison" ? `Livraison — ${deliveryName || "Client"} — ${deliveryAddress}${deliveryPhone ? " — " + deliveryPhone : ""}`
      : orderMode;
    const newOrder = {
      id: generateOrderId(),
      items: cart.map(c => ({ ...c })),
      total: discount > 0 ? (discountType === 'pct' ? parseFloat((cartTotal * (1 - discount/100)).toFixed(2)) : Math.max(0, parseFloat((cartTotal - discount).toFixed(2)))) : cartTotal,
      mode: orderMode,
      destination,
      tableNumber: orderMode === "Table" ? tableNumber : null,
      delivery: orderMode === "Livraison" ? { name: deliveryName, address: deliveryAddress, phone: deliveryPhone, remarks: deliveryRemarks } : null,
      discount,
      discountType,
      totalBeforeDiscount: cartTotal,
      discountBy: discount > 0 ? currentUser : null,
      paymentMode: null, // set at encaissement
      status: "En préparation",
      time: new Date(),
      user: currentUser,
    };
    setOrders(prev => [newOrder, ...prev]);
    setMenuItems(prev => prev.map(item => {
      const cartItem = cart.find(c => c.id === item.id && !c.isFormule);
      if (cartItem) return { ...item, stock: Math.max(0, item.stock - cartItem.qty) };
      return item;
    }));
    setCart([]);
    setDiscount(0);
    setDeliveryRemarks("");
    setConfirmedOrder(newOrder);
    setTimeout(() => setConfirmedOrder(null), 4000);
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    if (status === "Prêt") {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        // Serveur bip: 3 short high beeps — distinct from kitchen (2 descending)
        [0, 0.18, 0.36].forEach(t => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.frequency.value = 1046; // High C
          gain.gain.setValueAtTime(0.25, ctx.currentTime + t);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.12);
          osc.start(ctx.currentTime + t);
          osc.stop(ctx.currentTime + t + 0.12);
        });
      } catch(e) {}
    }
  };

  const encaisserOrder = (orderId, mode) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentMode: mode, status: "Terminée", paidAt: new Date() } : o));
    setEncaisserModal(null);
    notify(`Commande encaissée — ${mode} ✓`);
  };

  const todayOrders = orders.filter(o => new Date(o.time).toDateString() === new Date().toDateString());
  const todayCA = todayOrders.reduce((s, o) => s + o.total, 0);
  const avgTicket = todayOrders.length ? todayCA / todayOrders.length : 0;

  if (!loggedIn) {
    return <LoginScreen employees={employees} lang={lang} setLang={setLang} onLogin={(name) => { setCurrentUser(name); setLoggedIn(true); }} />;
  }

  return (
    <div style={S.root}>
      {/* CONFIRMED ORDER OVERLAY */}
      {confirmedOrder && (
        <div style={S.orderOverlay}>
          <div style={S.orderOverlayCard}>
            <div style={S.orderOverlayNum}>{confirmedOrder.id}</div>
            <div style={S.orderOverlayType}>{confirmedOrder.destination}</div>
            {confirmedOrder.discount > 0 && <div style={{ fontSize: 13, color: "#27ae60" }}>Remise -{confirmedOrder.discount}% appliquée</div>}
            <div style={{ fontSize: 13, color: "#888" }}>par {confirmedOrder.user}</div>
            <div style={S.orderOverlayMsg}>Commande envoyée en cuisine ✓</div>
          </div>
        </div>
      )}

      {/* NOTIFICATION */}
      {notification && (
        <div style={{ ...S.notification, background: notification.type === "error" ? "#e74c3c" : "#27ae60" }}>
          {notification.msg}
        </div>
      )}

      {/* HEADER */}
      <header style={S.header}>
        <div style={S.headerLeft}>
          <span style={S.logo}>🔥 LE COMPTOIR</span>
          <span style={S.headerSub}>Gestion Restaurant</span>
        </div>
        <nav style={S.nav}>
          {[
            { key: "pos", label: t.caisse },
            { key: "kitchen", label: t.cuisine },
            { key: "stock", label: t.stocks },
            { key: "dashboard", label: t.dashboard },
            { key: "settings", label: t.menuPrix },
            ...(employees.find(e => e.name === currentUser && e.isOwner) ? [{ key: "sysconfig", label: t.sysconfig }] : []),

          ].map(v => (
            <button key={v.key} style={{ ...S.navBtn, ...(view === v.key ? S.navBtnActive : {}) }}
              onClick={() => setView(v.key)}>
              {v.label}
              {v.key === "stock" && lowStockItems.length > 0 && <span style={S.badge}>{lowStockItems.length}</span>}
              {v.key === "kitchen" && pendingKitchen > 0 && <span style={{ ...S.badge, background: "#e67e22" }}>{pendingKitchen}</span>}
              {v.key === "kitchen" && unreadMessages > 0 && <span style={{ ...S.badge, background: "#e67e22", top: -4, right: 14 }}>📢</span>}
            </button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button style={{ ...S.logoutBtn, fontSize: 16, padding: "3px 8px" }} onClick={() => setLang(l => l === "fr" ? "es" : "fr")}>
            {lang === "fr" ? "🇪🇸" : "🇫🇷"}
          </button>
          <span style={{ color: "#D4A843", fontSize: 13 }}>👤 {currentUser}</span>
          <button style={S.logoutBtn} onClick={() => { setLoggedIn(false); setCurrentUser(""); setCart([]); }}>{t.changer}</button>
        </div>
      </header>

      <main style={S.main}>
        {view === "pos" && <POSView menuItems={menuItems} formules={formules} cart={cart}
          categories={categories}
          kitchenMessages={kitchenMessages} setKitchenMessages={setKitchenMessages}
          setMenuItems={setMenuItems}
          t={t}
          activeCat={activeCat} setActiveCat={setActiveCat} addToCart={addToCart}
          addFormuleToCart={addFormuleToCart} removeFromCart={removeFromCart}
          updateQty={updateQty} updateNote={updateNote} cartTotal={cartTotal}
          validateOrder={validateOrder}
          orderMode={orderMode} setOrderMode={setOrderMode}
          tableNumber={tableNumber} setTableNumber={setTableNumber}
          deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress}
          deliveryName={deliveryName} setDeliveryName={setDeliveryName}
          deliveryPhone={deliveryPhone} setDeliveryPhone={setDeliveryPhone}
          deliveryRemarks={deliveryRemarks} setDeliveryRemarks={setDeliveryRemarks}
          discount={discount} setDiscount={setDiscount}
          discountType={discountType} setDiscountType={setDiscountType}
          discountPending={discountPending} setDiscountPending={setDiscountPending}
          managerPinModal={managerPinModal} setManagerPinModal={setManagerPinModal}
          managerPinInput={managerPinInput} setManagerPinInput={setManagerPinInput}
          managerPinError={managerPinError} setManagerPinError={setManagerPinError}
          currentUser={currentUser} />}
        {view === "kitchen" && <KitchenView orders={orders} updateOrderStatus={updateOrderStatus}
          encaisserModal={encaisserModal} setEncaisserModal={setEncaisserModal}
          encaisserMode={encaisserMode} setEncaisserMode={setEncaisserMode}
          encaisserOrder={encaisserOrder}
          kitchenMessages={kitchenMessages} setKitchenMessages={setKitchenMessages} t={t} />}
        {view === "stock" && <StockView menuItems={menuItems} setMenuItems={setMenuItems} categories={categories} notify={notify} t={t} />}
        {view === "dashboard" && <DashboardView orders={orders} todayOrders={todayOrders}
          todayCA={todayCA} avgTicket={avgTicket} menuItems={menuItems}
          showEndOfService={showEndOfService} setShowEndOfService={setShowEndOfService} t={t} />}
        {view === "settings" && <SettingsView menuItems={menuItems} setMenuItems={setMenuItems}
          formules={formules} setFormules={setFormules}
          categories={categories} setCategories={setCategories}
          employees={employees} setEmployees={setEmployees} notify={notify} t={t} />}
        {view === "sysconfig" && employees.find(e => e.name === currentUser && e.isOwner) && <SysConfigView orders={orders} />}
      </main>
    </div>
  );
}

function POSView({ menuItems, formules, cart, categories, activeCat, setActiveCat, addToCart, addFormuleToCart,
  removeFromCart, updateQty, updateNote, cartTotal, validateOrder,
  orderMode, setOrderMode, tableNumber, setTableNumber,
  deliveryAddress, setDeliveryAddress, deliveryName, setDeliveryName, deliveryPhone, setDeliveryPhone,
  deliveryRemarks, setDeliveryRemarks,
  discount, setDiscount, discountType, setDiscountType,
  discountPending, setDiscountPending,
  managerPinModal, setManagerPinModal, managerPinInput, setManagerPinInput, managerPinError, setManagerPinError,
  kitchenMessages, setKitchenMessages, setMenuItems, t,
  currentUser }) {
  const [showKitchenMsg, setShowKitchenMsg] = useState(false);
  const [kitchenMsgText, setKitchenMsgText] = useState("");

  const [noteOpen, setNoteOpen] = useState(null);
  const [variantItem, setVariantItem] = useState(null);
  const [modifierItem, setModifierItem] = useState(null); // item with sauce/modifier questions
  const [modifierSelections, setModifierSelections] = useState({}); // { modifierId: [opt1, opt2] }
  const allCats = ["Formules", ...categories];
  const filtered = activeCat === "Formules"
    ? formules
    : menuItems.filter(i => i.cat === activeCat && i.active !== false);

  return (
    <div style={S.posLayout}>
      {/* LEFT */}
      <div style={S.posLeft}>
        <div style={S.catTabs}>
          {allCats.map(cat => (
            <button key={cat} style={{ ...S.catTab, ...(activeCat === cat ? S.catTabActive : {}) }}
              onClick={() => setActiveCat(cat)}>
              {cat === "Formules" ? "⭐ Formules" : cat}
            </button>
          ))}
        </div>

        {/* QUICK ACTIONS BAR */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <button style={{ ...S.filterTab, fontSize: 11, padding: "5px 12px", color: "#e67e22", border: "1px solid #e67e22" }}
            onClick={() => setShowKitchenMsg(v => !v)}>
            📢 Message cuisine
          </button>
          {showKitchenMsg && (
            <div style={{ display: "flex", gap: 6, flex: 1, minWidth: 280 }}>
              <input style={{ ...S.formInput, flex: 1, fontSize: 12, padding: "5px 10px" }}
                placeholder="Ex: Plus de frites ! Table 3 allergie..."
                value={kitchenMsgText} onChange={e => setKitchenMsgText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && kitchenMsgText.trim()) {
                    setKitchenMessages(prev => [{ id: Date.now(), text: kitchenMsgText.trim(), time: new Date(), from: currentUser, read: false }, ...prev]);
                    setKitchenMsgText(""); setShowKitchenMsg(false);
                  }
                }} autoFocus />
              <button style={{ ...S.restockBtn, padding: "5px 12px" }} onClick={() => {
                if (kitchenMsgText.trim()) {
                  setKitchenMessages(prev => [{ id: Date.now(), text: kitchenMsgText.trim(), time: new Date(), from: currentUser, read: false }, ...prev]);
                  setKitchenMsgText(""); setShowKitchenMsg(false);
                }
              }}>{t.envoyer}</button>
              <button style={{ ...S.clearBtn, width: "auto", padding: "5px 10px" }} onClick={() => setShowKitchenMsg(false)}>✕</button>
            </div>
          )}
        </div>

        <div style={S.itemsGrid}>
          {activeCat === "Formules"
            ? formules.map(f => (
              <button key={f.id} style={{ ...S.itemCard, border: "1px solid #D4A843" }}
                onClick={() => { if (f.modifiers?.length) { setModifierItem(f); setModifierSelections({}); } else addFormuleToCart(f); }}>
                <span style={S.itemEmoji}>{f.emoji}</span>
                <span style={S.itemName}>{f.name}</span>
                <span style={{ fontSize: 11, color: "#999", textAlign: "center" }}>{f.description}</span>
                <span style={{ ...S.itemPrice, fontSize: 17 }}>{f.price.toFixed(2)}€</span>
                <span style={{ fontSize: 10, color: "#D4A843", background: "#2c2208", borderRadius: 4, padding: "2px 6px" }}>FORMULE</span>
                {f.modifiers?.length > 0 && <span style={{ fontSize: 9, color: "#888", background: "#1a1a1a", borderRadius: 4, padding: "2px 5px" }}>🧴 sauce incluse</span>}
              </button>
            ))
            : filtered.map(item => (
              <button key={item.id} style={{ ...S.itemCard, ...(item.stock === 0 ? S.itemCardOut : {}) }}
                onClick={() => {
                  if (item.stock === 0) return;
                  if (item.modifiers?.length) { setModifierItem(item); setModifierSelections({}); }
                  else if (item.variants?.length) setVariantItem(item);
                  else addToCart(item);
                }}>
                <span style={S.itemEmoji}>{item.emoji}</span>
                <span style={S.itemName}>{item.name}</span>
                <span style={S.itemPrice}>{item.price.toFixed(2)}€</span>
                {item.variants?.length > 0 && <span style={S.variantTag}>▾ {item.variants.length} variantes</span>}
                {item.stock <= item.threshold && item.stock > 0 && (
                  <span style={S.lowStockTag}>⚠️ {item.stock} restants</span>
                )}
                {item.stock === 0 && <span style={S.outTag}>RUPTURE</span>}
              </button>
            ))}
        </div>
      </div>

      {/* RIGHT: Cart */}
      <div style={S.posRight}>
        <div style={S.cartHeader}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={S.cartTitle}>{t.commande}</span>
            <span style={{ fontSize: 11, color: "#D4A843" }}>👤 {currentUser}</span>
          </div>
          <div style={S.orderModeBtns}>
            {[
              { key: "Comptoir", icon: "🏪", label: t.comptoir },
              { key: "Table", icon: "🪑", label: t.table },
              { key: "A emporter", icon: "🥡", label: t.emporter },
              { key: "Livraison", icon: "🛵", label: t.livraison },
            ].map(m => (
              <button key={m.key}
                style={{ ...S.orderModeBtn, ...(orderMode === m.key ? S.orderModeBtnActive : {}) }}
                onClick={() => setOrderMode(m.key)}>
                {m.icon} {m.label || m.key}
              </button>
            ))}
          </div>
          {orderMode === "Table" && (
            <div style={{ marginTop: 8, display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#999" }}>{t.tableNo}</span>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <button key={n}
                    style={{ ...S.tableBtn, ...(tableNumber === String(n) ? S.tableBtnActive : {}) }}
                    onClick={() => setTableNumber(String(n))}>{n}</button>
                ))}
              </div>
              <input style={{ ...S.tableInput }} type="number" min="1" placeholder="Autre"
                value={tableNumber} onChange={e => setTableNumber(e.target.value)} />
            </div>
          )}
          {orderMode === "Livraison" && (
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
              <input style={S.deliveryInput} placeholder={t.clientNom} value={deliveryName} onChange={e => setDeliveryName(e.target.value)} />
              <input style={S.deliveryInput} placeholder={t.adresse} value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} />
              <input style={S.deliveryInput} placeholder={t.telephone} value={deliveryPhone} onChange={e => setDeliveryPhone(e.target.value)} />
              <textarea style={{ ...S.deliveryInput, resize: "none", minHeight: 52 }} placeholder={t.remarques} value={deliveryRemarks} onChange={e => setDeliveryRemarks(e.target.value)} />
            </div>
          )}
        </div>

        <div style={S.cartItems}>
          {cart.length === 0 && <div style={S.cartEmpty}>Touchez un article ou une formule</div>}
          {cart.map(c => (
            <div key={c.cartId} style={S.cartLineWrap}>
              <div style={S.cartLine}>
                <span style={S.cartLineEmoji}>{c.emoji}</span>
                <span style={S.cartLineName}>
                  {c.name}
                  {c.isFormule && <span style={S.formuleBadge}>formule</span>}
                </span>
                <div style={S.cartQtyCtrl}>
                  <button style={S.qtyBtn} onClick={() => updateQty(c.cartId, -1)}>−</button>
                  <span style={S.qtyNum}>{c.qty}</span>
                  <button style={S.qtyBtn} onClick={() => updateQty(c.cartId, 1)}>+</button>
                </div>
                <span style={S.cartLinePrice}>{(c.price * c.qty).toFixed(2)}€</span>
                <button style={S.noteToggle} onClick={() => setNoteOpen(noteOpen === c.cartId ? null : c.cartId)}
                  title="Ajouter une note">📝</button>
                <button style={S.cartRemove} onClick={() => removeFromCart(c.cartId)}>✕</button>
              </div>
              {/* NOTE FIELD */}
              {noteOpen === c.cartId && (
                <input style={S.noteInput} placeholder="Note cuisine (ex: sans oignon, bien cuit...)"
                  value={c.note} onChange={e => updateNote(c.cartId, e.target.value)}
                  autoFocus />
              )}
              {c.note && noteOpen !== c.cartId && (
                <div style={S.notePill}>📝 {c.note}</div>
              )}
            </div>
          ))}
        </div>

        <div style={S.cartFooter}>
          {/* DISCOUNT */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "#999" }}>{t.remise}</span>
              <div style={{ display: "flex", gap: 4 }}>
                <button style={{ ...S.discountBtn, ...(discountType === "pct" ? S.discountBtnActive : {}) }} onClick={() => { setDiscountType("pct"); setDiscount(0); }}>%</button>
                <button style={{ ...S.discountBtn, ...(discountType === "fixed" ? S.discountBtnActive : {}) }} onClick={() => { setDiscountType("fixed"); setDiscount(0); }}>€</button>
              </div>
            </div>
            {discountType === "pct" ? (
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {[0, 5, 10, 15, 20].map(d => (
                  <button key={d} style={{ ...S.discountBtn, ...(discount === d ? S.discountBtnActive : {}) }}
                    onClick={() => {
                      if (d > 20) { setDiscountPending(d); setManagerPinModal(true); setManagerPinInput(""); }
                      else setDiscount(d);
                    }}>{d === 0 ? "Aucune" : `-${d}%`}</button>
                ))}
                <input type="number" min="0" max="100" placeholder="%" style={{ ...S.restockInput, width: 48, fontSize: 12 }}
                  onChange={e => {
                    const v = parseInt(e.target.value) || 0;
                    if (v > 20) { setDiscountPending(v); setManagerPinModal(true); setManagerPinInput(""); e.target.value = ""; }
                    else setDiscount(v);
                  }} />
              </div>
            ) : (
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <input type="number" min="0" step="0.5" placeholder="Montant €" style={{ ...S.restockInput, flex: 1, fontSize: 13 }}
                  onChange={e => {
                    const v = parseFloat(e.target.value) || 0;
                    const pctEquiv = cartTotal > 0 ? (v / cartTotal) * 100 : 0;
                    if (pctEquiv > 20) { setDiscountPending({ fixed: v }); setManagerPinModal(true); setManagerPinInput(""); e.target.value = ""; }
                    else setDiscount(v);
                  }} />
                {discount > 0 && <button style={{ ...S.discountBtn, color: "#e74c3c" }} onClick={() => setDiscount(0)}>✕</button>}
              </div>
            )}
          </div>

          {/* MANAGER PIN MODAL */}
          {managerPinModal && (
            <div style={{ background: "#0a0a0a", border: "1px solid #e67e22", borderRadius: 10, padding: "14px", marginBottom: 10, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "#e67e22", fontWeight: 700, marginBottom: 8 }}>🔐 Autorisation manager requise</div>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 10 }}>Remise supérieure à 20% — code manager</div>
              <input type="password" maxLength={4} placeholder="••••"
                style={{ ...S.loginInput, textAlign: "center", letterSpacing: 6, fontSize: 18, width: 100, padding: "8px", border: managerPinError ? "2px solid #e74c3c" : "2px solid #e67e22" }}
                value={managerPinInput}
                onChange={e => setManagerPinInput(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                onKeyDown={e => {
                  if (e.key === "Enter" && managerPinInput.length === 4) {
                    if (managerPinInput === "2805") {
                      const v = discountPending?.fixed !== undefined ? discountPending.fixed : discountPending;
                      setDiscount(v); setDiscountType(discountPending?.fixed !== undefined ? "fixed" : "pct");
                      setManagerPinModal(false); setDiscountPending(null); setManagerPinError(false);
                    } else { setManagerPinError(true); setManagerPinInput(""); setTimeout(() => setManagerPinError(false), 1200); }
                  }
                }}
                autoFocus />
              {managerPinError && <div style={{ color: "#e74c3c", fontSize: 11, marginTop: 6 }}>Code incorrect</div>}
              <div style={{ display: "flex", gap: 6, marginTop: 10, justifyContent: "center" }}>
                <button style={{ ...S.actionBtn, background: "#27ae60" }} onClick={() => {
                  if (managerPinInput === "2805") {
                    const v = discountPending?.fixed !== undefined ? discountPending.fixed : discountPending;
                    setDiscount(v); setDiscountType(discountPending?.fixed !== undefined ? "fixed" : "pct");
                    setManagerPinModal(false); setDiscountPending(null); setManagerPinError(false);
                  } else { setManagerPinError(true); setManagerPinInput(""); setTimeout(() => setManagerPinError(false), 1200); }
                }}>Valider</button>
                <button style={{ ...S.actionBtn, background: "#555" }} onClick={() => { setManagerPinModal(false); setDiscountPending(null); setManagerPinInput(""); }}>Annuler</button>
              </div>
            </div>
          )}

          {/* TOTAL */}
          <div style={S.cartTotal}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 12, color: "#888" }}>{t.total}</span>
              {discount > 0 && <span style={{ fontSize: 11, color: "#e67e22", textDecoration: "line-through" }}>{cartTotal.toFixed(2)}€</span>}
            </div>
            <span style={S.cartTotalAmount}>
              {discount > 0
                ? (discountType === "pct"
                    ? (cartTotal * (1 - discount/100)).toFixed(2)
                    : Math.max(0, cartTotal - discount).toFixed(2))
                : cartTotal.toFixed(2)}€
              {discount > 0 && <span style={{ fontSize: 12, color: "#27ae60", marginLeft: 6 }}>
                {discountType === "pct" ? `-${discount}%` : `-${discount.toFixed(2)}€`}
              </span>}
            </span>
          </div>
          <button style={{ ...S.validateBtn, ...(cart.length === 0 ? S.validateBtnDisabled : {}) }}
            onClick={validateOrder} disabled={cart.length === 0}>
            {t.envoyerCuisine}
          </button>
          <button style={S.clearBtn} onClick={() => { }}>{t.viderCommande}</button>
        </div>
      </div>
      {/* MODIFIER MODAL — sauce / options automatiques */}
      {modifierItem && (
        <div style={S.variantOverlay} onClick={() => setModifierItem(null)}>
          <div style={{ ...S.variantModal, maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div style={S.variantModalHeader}>
              <span style={{ fontSize: 28 }}>{modifierItem.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{modifierItem.name}</div>
                <div style={{ fontSize: 12, color: "#888" }}>Options incluses • Prix inchangé</div>
              </div>
              <button style={{ background: "transparent", border: "none", color: "#666", fontSize: 20, cursor: "pointer", marginLeft: "auto" }} onClick={() => setModifierItem(null)}>✕</button>
            </div>

            {modifierItem.modifiers.map(mod => {
              const maxSel = mod.maxSelect || 1;
              const sel = modifierSelections[mod.id] || [];
              const noSauce = sel.includes("__none__");
              const count = noSauce ? 0 : sel.length;

              const toggleOpt = (opt) => {
                setModifierSelections(prev => {
                  const cur = (prev[mod.id] || []).filter(x => x !== "__none__");
                  if (cur.includes(opt)) return { ...prev, [mod.id]: cur.filter(x => x !== opt) };
                  if (cur.length >= maxSel) return { ...prev, [mod.id]: [...cur.slice(1), opt] };
                  return { ...prev, [mod.id]: [...cur, opt] };
                });
              };

              const toggleNone = () => {
                setModifierSelections(prev => {
                  const cur = prev[mod.id] || [];
                  if (cur.includes("__none__")) return { ...prev, [mod.id]: [] };
                  return { ...prev, [mod.id]: ["__none__"] };
                });
              };

              return (
                <div key={mod.id} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#D4A843", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>🧴 {mod.label}</span>
                    <span style={{ color: count > 0 ? "#27ae60" : "#555", fontWeight: 400, fontSize: 11 }}>
                      {count}/{maxSel} choisie{count > 1 ? "s" : ""} • optionnel
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                    {mod.options.map(opt => {
                      const isSelected = !noSauce && sel.includes(opt);
                      return (
                        <button key={opt} style={{
                          ...S.variantBtn,
                          justifyContent: "center",
                          padding: "8px 6px",
                          fontSize: 12,
                          background: isSelected ? "#1a2a1a" : "#2a2a2a",
                          border: isSelected ? "1px solid #27ae60" : "1px solid #333",
                          color: isSelected ? "#27ae60" : "#f0ece4",
                          fontWeight: isSelected ? 700 : 400,
                        }} onClick={() => toggleOpt(opt)}>
                          {isSelected ? "✓ " : ""}{opt}
                        </button>
                      );
                    })}
                    <button style={{
                      ...S.variantBtn,
                      justifyContent: "center",
                      padding: "8px 6px",
                      fontSize: 12,
                      background: noSauce ? "#2a1a1a" : "#222",
                      border: noSauce ? "1px solid #e74c3c" : "1px solid #2a2a2a",
                      color: noSauce ? "#e74c3c" : "#555",
                    }} onClick={toggleNone}>
                      {noSauce ? "✓ " : ""}Sans sauce
                    </button>
                  </div>
                </div>
              );
            })}

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button style={{ ...S.validateBtn, flex: 1, padding: "11px" }}
                onClick={() => {
                  const mods = modifierItem.modifiers.map(m => {
                    const sel = modifierSelections[m.id] || [];
                    if (sel.includes("__none__")) return `${m.label}: Sans sauce`;
                    if (sel.length > 0) return `${m.label}: ${sel.join(" + ")}`;
                    return null;
                  }).filter(Boolean);
                  const noteStr = mods.join(" | ");
                  const isFormule = !!modifierItem.items;
                  if (isFormule) {
                    const id = "formule_" + modifierItem.id + "_" + Date.now();
                    addToCart({ ...modifierItem, id, cartId: id, qty: 1, note: noteStr, isFormule: true, description: modifierItem.description }, true);
                  } else {
                    addToCart({ ...modifierItem, note: noteStr });
                  }
                  setModifierItem(null); setModifierSelections({});
                }}>
                ✓ Ajouter au panier
              </button>
              <button style={{ ...S.clearBtn, width: "auto", padding: "11px 16px" }}
                onClick={() => {
                  const isFormule = !!modifierItem.items;
                  if (isFormule) {
                    const id = "formule_" + modifierItem.id + "_" + Date.now();
                    addToCart({ ...modifierItem, id, cartId: id, qty: 1, note: "", isFormule: true }, true);
                  } else { addToCart(modifierItem); }
                  setModifierItem(null); setModifierSelections({});
                }}>
                Passer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VARIANT MODAL — choix simple (ex: Sauce +) */}
      {variantItem && (
        <div style={S.variantOverlay} onClick={() => setVariantItem(null)}>
          <div style={S.variantModal} onClick={e => e.stopPropagation()}>
            <div style={S.variantModalHeader}>
              <span style={{ fontSize: 28 }}>{variantItem.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{variantItem.name}</div>
                <div style={{ fontSize: 12, color: "#888" }}>Choisissez une variante</div>
              </div>
              <button style={{ background: "transparent", border: "none", color: "#666", fontSize: 20, cursor: "pointer", marginLeft: "auto" }} onClick={() => setVariantItem(null)}>✕</button>
            </div>
            <div style={S.variantList}>
              {variantItem.variants.map(v => (
                <button key={v} style={S.variantBtn}
                  onClick={() => {
                    addToCart({ ...variantItem, id: variantItem.id + "_" + v, name: variantItem.name + " " + v, cartVariant: v });
                    setVariantItem(null);
                  }}>
                  <span>{variantItem.emoji} {v}</span>
                  <span style={{ color: "#D4A843", fontWeight: 700 }}>{variantItem.price.toFixed(2)}€</span>
                </button>
              ))}
              <button style={{ ...S.variantBtn, borderTop: "1px solid #333", marginTop: 4, color: "#888" }}
                onClick={() => { addToCart(variantItem); setVariantItem(null); }}>
                <span>Sans précision</span>
                <span style={{ color: "#D4A843", fontWeight: 700 }}>{variantItem.price.toFixed(2)}€</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KitchenView({ orders, updateOrderStatus, encaisserModal, setEncaisserModal, encaisserMode, setEncaisserMode, encaisserOrder, kitchenMessages, setKitchenMessages, t }) {
  const tick = useTimer();
  const [modeFilter, setModeFilter] = useState("Tous");
  const prevCountRef = useRef(0);

  // Sound alert on new order
  useEffect(() => {
    const active = orders.filter(o => o.status !== "Terminée" && o.status !== "Annulée");
    if (active.length > prevCountRef.current) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.setValueAtTime(660, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
      } catch(e) {}
    }
    prevCountRef.current = active.length;
  }, [orders]);

  const allActive = orders.filter(o => o.status !== "Terminée" && o.status !== "Annulée");
  const active = modeFilter === "Tous" ? allActive : allActive.filter(o => o.mode === modeFilter);
  const done = orders.filter(o => o.status === "Terminée").slice(0, 6);
  const statusColor = { "En préparation": "#e67e22", "Prêt": "#27ae60", "Servi": "#3498db", "En route": "#a855f7" };
  const statusLabel = { "En préparation": t.enPreparation, "Prêt": t.pret, "Servi": t.servi, "En route": t.enRoute };
  const modes = ["Tous", "Comptoir", "Table", "A emporter", "Livraison"];

  return (
    <div style={S.kitchenLayout}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
          <h2 style={{ ...S.sectionTitle, margin: 0 }}>{t.enCours} ({allActive.length})</h2>
          <div style={{ display: "flex", gap: 6 }}>
            {modes.map(m => {
              const count = m === "Tous" ? allActive.length : allActive.filter(o => o.mode === m).length;
              return (
                <button key={m} style={{ ...S.filterTab, ...(modeFilter === m ? S.filterTabActive : {}), fontSize: 11, padding: "4px 10px" }}
                  onClick={() => setModeFilter(m)}>
                  {m === "Livraison" ? "🛵" : m === "Table" ? "🪑" : m === "A emporter" ? "🥡" : m === "Comptoir" ? "🏪" : ""} {m}
                  {count > 0 && <span style={{ marginLeft: 4, background: "#D4A843", color: "#111", borderRadius: 10, padding: "0 5px", fontSize: 10, fontWeight: 700 }}>{count}</span>}
                </button>
              );
            })}
          </div>
        </div>
        {active.length === 0 && <div style={S.emptyState}>Aucune commande{modeFilter !== "Tous" ? ` (${modeFilter})` : ""} — tranquille 😎</div>}
        <div style={S.kitchenGrid}>
          {active.map(order => {
            const secs = elapsed(order.time);
            const isLate = secs > KITCHEN_ALERT_SECONDS;
            const isUrgent = secs > KITCHEN_ALERT_SECONDS * 1.5;
            return (
              <div key={order.id} style={{
                ...S.kitchenCard,
                borderTop: `4px solid ${statusColor[order.status] || "#666"}`,
                ...(isUrgent ? S.kitchenCardUrgent : isLate ? S.kitchenCardLate : {}),
              }}>
                <div style={S.kitchenCardHeader}>
                  <span style={S.kitchenOrderId}>{order.id}</span>
                  <span style={{ ...S.kitchenStatus, color: statusColor[order.status] }}>{statusLabel[order.status] || order.status}</span>
                  <span style={{
                    ...S.kitchenType,
                    background: order.mode === "Livraison" ? "#1a0a2a" : order.mode === "Table" ? "#0a1a2a" : "#2a2a2a",
                    color: order.mode === "Livraison" ? "#a855f7" : order.mode === "Table" ? "#3b82f6" : "#999",
                    border: order.mode === "Livraison" ? "1px solid #7c3aed" : order.mode === "Table" ? "1px solid #2563eb" : "none",
                  }}>
                    {order.mode === "Livraison" ? "🛵" : order.mode === "Table" ? "🪑" : order.mode === "A emporter" ? "🥡" : "🏪"} {order.destination}
                  </span>
                </div>
                {order.mode === "Livraison" && order.delivery && (
                  <div style={{ fontSize: 11, background: "#1a0a2a", border: "1px solid #7c3aed", borderRadius: 6, padding: "6px 10px", color: "#c084fc", display: "flex", flexDirection: "column", gap: 3 }}>
                    <span>🛵 {order.delivery.name} — {order.delivery.address}{order.delivery.phone ? " — 📞 " + order.delivery.phone : ""}</span>
                    {order.delivery.remarks && <span style={{ color: "#f0abfc" }}>📋 {order.delivery.remarks}</span>}
                  </div>
                )}

                {/* TIMER */}
                <div style={{ ...S.kitchenTimer, color: isUrgent ? "#e74c3c" : isLate ? "#e67e22" : "#888" }}>
                  ⏱ {fmtElapsed(secs)}
                  {isLate && !isUrgent && " — Prend du temps !"}
                  {isUrgent && " ⚠️ URGENT !"}
                </div>

                <div style={S.kitchenCardTime}>⏰ {new Date(order.time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} — 👤 {order.user}</div>

                <div style={S.kitchenItems}>
                  {order.items.map((item, i) => (
                    <div key={i} style={S.kitchenItem}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span>{item.emoji} {item.name} {item.isFormule && <span style={{ fontSize: 10, color: "#D4A843" }}>●formule</span>}</span>
                        {item.note && <span style={S.kitchenNote}>📝 {item.note}</span>}
                      </div>
                      <span style={S.kitchenItemQty}>×{item.qty}</span>
                    </div>
                  ))}
                </div>

                <div style={S.kitchenActions}>
                  {order.status === "En préparation" && (
                    <button style={{ ...S.statusBtn, background: "#27ae60" }}
                      onClick={() => updateOrderStatus(order.id, "Prêt")}>{t.pret}</button>
                  )}
                  {order.status === "Prêt" && order.mode === "Livraison" && (
                    <button style={{ ...S.statusBtn, background: "#a855f7" }}
                      onClick={() => updateOrderStatus(order.id, "En route")}>{t.enRoute}</button>
                  )}
                  {order.status === "Prêt" && order.mode !== "Livraison" && (
                    <button style={{ ...S.statusBtn, background: "#3498db" }}
                      onClick={() => updateOrderStatus(order.id, "Servi")}>{t.servi}</button>
                  )}
                  {(order.status === "Servi" || order.status === "En route") && (
                    <button style={{ ...S.statusBtn, background: "#8e44ad" }}
                      onClick={() => updateOrderStatus(order.id, "Terminée")}>{t.termine}</button>
                  )}
                  {order.status !== "Annulée" && !order.paymentMode && (
                    <button style={{ ...S.statusBtn, background: "#D4A843", color: "#111" }}
                      onClick={() => { setEncaisserModal(order.id); setEncaisserMode("CB"); }}>{t ? t.encaisser : "💰 Encaisser"}</button>
                  )}
                  {order.paymentMode && (
                    <span style={{ fontSize: 11, color: "#27ae60", padding: "6px", textAlign: "center" }}>
                      {order.paymentMode === "CB" ? "💳" : order.paymentMode === "Espèces" ? "💵" : "🔄"} {order.paymentMode}
                    </span>
                  )}
                  <button style={{ ...S.statusBtn, background: "#c0392b" }}
                    onClick={() => updateOrderStatus(order.id, "Annulée")}>✕</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* KITCHEN MESSAGES */}
      {kitchenMessages.filter(m => !m.read).length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {kitchenMessages.filter(m => !m.read).map(msg => (
            <div key={msg.id} style={{ background: "#2a1500", border: "1px solid #e67e22", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>📢</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 700, color: "#e67e22", fontSize: 14 }}>{msg.text}</span>
                <span style={{ fontSize: 11, color: "#888", marginLeft: 10 }}>de {msg.from} — {new Date(msg.time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <button style={{ ...S.actionBtn, background: "#27ae60", padding: "5px 12px" }}
                onClick={() => setKitchenMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m))}>
                ✓ Lu
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ENCAISSER MODAL */}
      {encaisserModal && (
        <div style={S.variantOverlay} onClick={() => setEncaisserModal(null)}>
          <div style={{ ...S.variantModal, maxWidth: 340 }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#D4A843", marginBottom: 16, textAlign: "center" }}>
              {t.encaissement}
            </div>
            <div style={{ fontSize: 13, color: "#888", textAlign: "center", marginBottom: 16 }}>
              Commande {encaisserModal} — Mode de paiement
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[{ k: "CB", icon: "💳", label: t.cb }, { k: "Espèces", icon: "💵", label: t.especes }, { k: "Mixte", icon: "🔄", label: t.mixte }].map(p => (
                <button key={p.k} style={{
                  background: encaisserMode === p.k ? "#2c2208" : "#2a2a2a",
                  border: encaisserMode === p.k ? "2px solid #D4A843" : "1px solid #333",
                  color: encaisserMode === p.k ? "#D4A843" : "#f0ece4",
                  borderRadius: 10, padding: "12px 16px", cursor: "pointer",
                  fontFamily: "inherit", fontWeight: encaisserMode === p.k ? 700 : 400,
                  fontSize: 14, display: "flex", alignItems: "center", gap: 10,
                }} onClick={() => setEncaisserMode(p.k)}>
                  <span style={{ fontSize: 22 }}>{p.icon}</span>
                  <span>{p.label}</span>
                  {encaisserMode === p.k && <span style={{ marginLeft: "auto" }}>✓</span>}
                </button>
              ))}
            </div>
            <button style={{ ...S.validateBtn, marginTop: 16 }}
              onClick={() => encaisserOrder(encaisserModal, encaisserMode)}>
              ✓ Confirmer l'encaissement
            </button>
            <button style={S.clearBtn} onClick={() => setEncaisserModal(null)}>Annuler</button>
          </div>
        </div>
      )}

      <div>
        <h2 style={S.sectionTitle}>{t.termineesRecentes}</h2>
        {done.map(order => (
          <div key={order.id} style={S.kitchenDoneLine}>
            <span style={S.kitchenOrderId}>{order.id}</span>
            <span>{order.type}</span>
            <span>{order.items.length} article(s)</span>
            <span>{order.total.toFixed(2)}€</span>
            <span style={{ color: "#27ae60", fontSize: 12 }}>✓ Terminée</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StockView({ menuItems, setMenuItems, categories, notify, t }) {
  const [restock, setRestock] = useState({});
  const [filterCat, setFilterCat] = useState("Tous");
  const filtered = filterCat === "Tous" ? menuItems : menuItems.filter(i => i.cat === filterCat);
  const lowItems = menuItems.filter(i => i.stock <= i.threshold);

  const handleRestock = (id) => {
    const qty = parseInt(restock[id] || 0);
    if (!qty || qty <= 0) return;
    setMenuItems(prev => prev.map(i => i.id === id ? { ...i, stock: i.stock + qty } : i));
    setRestock(prev => ({ ...prev, [id]: "" }));
    notify("Stock mis à jour ✓");
  };

  return (
    <div style={S.stockLayout}>
      {lowItems.length > 0 && (
        <div style={S.alertBanner}>⚠️ Stock bas : {lowItems.map(i => i.name).join(", ")}</div>
      )}
      <div style={S.stockHeader}>
        <h2 style={S.sectionTitle}>{t ? t.stocks : "📦 Stocks"}</h2>
        <div style={S.filterTabs}>
          {["Tous", ...categories].map(cat => (
            <button key={cat} style={{ ...S.filterTab, ...(filterCat === cat ? S.filterTabActive : {}) }}
              onClick={() => setFilterCat(cat)}>{cat}</button>
          ))}
        </div>
      </div>
      <div style={S.stockTable}>
        <div style={S.stockTableHead}><span>Article</span><span>Catégorie</span><span>Stock</span><span>Seuil</span><span>Statut</span><span>Réappro</span></div>
        {filtered.map(item => {
          const isLow = item.stock <= item.threshold, isOut = item.stock === 0;
          return (
            <div key={item.id} style={{ ...S.stockRow, ...(isOut ? S.stockRowOut : isLow ? S.stockRowLow : {}) }}>
              <span>{item.emoji} {item.name}</span>
              <span style={{ fontSize: 11, color: "#666" }}>{item.cat}</span>
              <span style={{ fontWeight: 700, color: isOut ? "#e74c3c" : isLow ? "#e67e22" : "#27ae60" }}>
                {item.stock} {item.unit}
              </span>
              <span style={{ color: "#999" }}>min. {item.threshold}</span>
              <span style={{ ...S.stockStatus, background: isOut ? "#e74c3c" : isLow ? "#e67e22" : "#27ae60" }}>
                {isOut ? "RUPTURE" : isLow ? "BAS" : "OK"}
              </span>
              <div style={S.restockCtrl}>
                <input type="number" min="1" placeholder="Qté" style={S.restockInput}
                  value={restock[item.id] || ""}
                  onChange={e => setRestock(prev => ({ ...prev, [item.id]: e.target.value }))} />
                <button style={S.restockBtn} onClick={() => handleRestock(item.id)}>+ Ajouter</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DashboardView({ orders, todayOrders, todayCA, avgTicket, menuItems, showEndOfService, setShowEndOfService, t }) {
  const sales = {};
  orders.forEach(o => o.items.forEach(i => { sales[i.name] = (sales[i.name] || 0) + i.qty; }));
  const bestSellers = Object.entries(sales).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const lowStock = menuItems.filter(i => i.stock <= i.threshold).length;
  const byStatus = {
    "En préparation": orders.filter(o => o.status === "En préparation").length,
    "Prêt": orders.filter(o => o.status === "Prêt").length,
    "Terminée": orders.filter(o => o.status === "Terminée").length,
  };

  return (
    <div style={S.dashLayout}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={S.sectionTitle}>📊 Dashboard — {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</h2>
        <button style={{ background: "#1a0a2a", border: "1px solid #8e44ad", color: "#a855f7", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700 }}
          onClick={() => setShowEndOfService(true)}>
          🌙 Clôture de service
        </button>
      </div>
      <div style={S.kpiGrid}>
        <div style={S.kpiCard}><span style={S.kpiLabel}>{t ? t.caJour : "CA du jour"}</span><span style={S.kpiValue}>{todayCA.toFixed(2)}€</span></div>
        <div style={S.kpiCard}><span style={S.kpiLabel}>{t ? t.commandes : "Commandes"}</span><span style={S.kpiValue}>{todayOrders.length}</span></div>
        <div style={S.kpiCard}><span style={S.kpiLabel}>{t ? t.ticketMoyen : "Ticket moyen"}</span><span style={S.kpiValue}>{avgTicket.toFixed(2)}€</span></div>
        <div style={{ ...S.kpiCard, ...(lowStock > 0 ? S.kpiCardWarn : {}) }}><span style={S.kpiLabel}>{t ? t.alertesStock : "Alertes stock"}</span><span style={S.kpiValue}>{lowStock}</span></div>
      </div>

      <ClotureCaisse todayOrders={todayOrders} />
      <div style={S.dashRow}>
        <div style={S.dashCard}>
          <h3 style={S.dashCardTitle}>🏆 Articles les plus vendus</h3>
          {bestSellers.length === 0 && <div style={S.emptyState}>Aucune vente pour l&apos;instant</div>}
          {bestSellers.map(([name, qty], i) => (
            <div key={name} style={S.bestSellerRow}>
              <span style={S.bestSellerRank}>{i + 1}</span>
              <span style={S.bestSellerName}>{name}</span>
              <div style={S.bestSellerBar}><div style={{ ...S.bestSellerFill, width: `${Math.min(100, (qty / (bestSellers[0]?.[1] || 1)) * 100)}%` }} /></div>
              <span style={S.bestSellerQty}>{qty} vendus</span>
            </div>
          ))}
        </div>
        <div style={S.dashCard}>
          <h3 style={S.dashCardTitle}>🧾 Dernières commandes</h3>
          {orders.length === 0 && <div style={S.emptyState}>Aucune commande</div>}
          {orders.slice(0, 8).map(order => (
            <div key={order.id} style={S.recentOrderRow}>
              <span style={S.kitchenOrderId}>{order.id}</span>
              <span>{order.type}</span>
              <span>{order.items.length} art.</span>
              <span style={{ fontWeight: 700 }}>{order.total.toFixed(2)}€</span>
              <span style={{ fontSize: 11 }}>{order.paymentMode === "CB" ? "💳" : order.paymentMode === "Espèces" ? "💵" : "🔄"}</span>
              <span style={{ color: order.status === "Terminée" ? "#27ae60" : "#e67e22", fontSize: 11 }}>{statusLabel[order.status] || order.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={S.dashCard}>
        <h3 style={S.dashCardTitle}>📋 Statut en temps réel</h3>
        <div style={S.statusSummary}>
          {Object.entries(byStatus).map(([status, count]) => (
            <div key={status} style={S.statusSummaryItem}>
              <span style={S.statusSummaryCount}>{count}</span>
              <span style={S.statusSummaryLabel}>{status}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={S.dashCard}>
        <h3 style={S.dashCardTitle}>🗂️ Répartition par mode (aujourd&apos;hui)</h3>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            { mode: "Comptoir", icon: "🏪" },
            { mode: "Table", icon: "🪑" },
            { mode: "A emporter", icon: "🥡" },
            { mode: "Livraison", icon: "🛵" },
          ].map(({ mode, icon }) => {
            const count = todayOrders.filter(o => o.mode === mode).length;
            const ca = todayOrders.filter(o => o.mode === mode).reduce((s, o) => s + o.total, 0);
            return (
              <div key={mode} style={{ flex: 1, minWidth: 110, background: "#111", borderRadius: 10, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <span style={{ fontSize: 12, color: "#888" }}>{mode}</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: "#D4A843" }}>{count}</span>
                <span style={{ fontSize: 12, color: "#aaa" }}>{ca.toFixed(2)}€</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* HOURLY HEATMAP */}
      <HourlyHeatmap todayOrders={todayOrders} />

      {/* END OF SERVICE MODAL */}
      {showEndOfService && (
        <EndOfServiceModal
          todayOrders={todayOrders}
          todayCA={todayCA}
          onClose={() => setShowEndOfService(false)}
        />
      )}
    </div>
  );
}

function SettingsView({ menuItems, setMenuItems, formules, setFormules, categories, setCategories, employees, setEmployees, notify, t }) {
  const [tab, setTab] = useState("articles");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [filterCat, setFilterCat] = useState("Tous");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", cat: "Burgers", price: "", emoji: "🍔", stock: 0, threshold: 5, unit: "portions" });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [modEditItem, setModEditItem] = useState(null); // item being edited for modifiers
  const [showAddFormule, setShowAddFormule] = useState(false);
  const [newFormule, setNewFormule] = useState({ name: "", emoji: "⭐", price: "", description: "" });

  const filtered = filterCat === "Tous" ? menuItems : menuItems.filter(i => i.cat === filterCat);

  const startEdit = (item) => { setEditId(item.id); setEditData({ ...item }); };
  const saveEdit = () => {
    if (!editData.name || !editData.price) return;
    setMenuItems(prev => prev.map(i => i.id === editId ? { ...editData, price: parseFloat(editData.price) || i.price } : i));
    setEditId(null); notify("Article mis à jour ✓");
  };
  const toggleActive = (id) => setMenuItems(prev => prev.map(i => i.id === id ? { ...i, active: i.active === false ? true : false } : i));
  const deleteItem = (id) => { setMenuItems(prev => prev.filter(i => i.id !== id)); setConfirmDelete(null); notify("Article supprimé"); };
  const addItem = () => {
    if (!newItem.name || !newItem.price) { notify("Nom et prix obligatoires", "error"); return; }
    setMenuItems(prev => [...prev, { ...newItem, id: "c_" + Date.now(), price: parseFloat(newItem.price), active: true }]);
    setNewItem({ name: "", cat: "Burgers", price: "", emoji: "🍔", stock: 0, threshold: 5, unit: "portions" });
    setShowAddForm(false); notify("Article ajouté ✓");
  };
  const addFormule = () => {
    if (!newFormule.name || !newFormule.price) { notify("Nom et prix obligatoires", "error"); return; }
    setFormules(prev => [...prev, { ...newFormule, id: "f_" + Date.now(), price: parseFloat(newFormule.price), items: [] }]);
    setNewFormule({ name: "", emoji: "⭐", price: "", description: "" });
    setShowAddFormule(false); notify("Formule ajoutée ✓");
  };
  const deleteFormule = (id) => { setFormules(prev => prev.filter(f => f.id !== id)); notify("Formule supprimée"); };

  return (
    <div style={S.settingsLayout}>
      <div style={S.settingsHeaderRow}>
        <h2 style={S.sectionTitle}>⚙️ Menu & Prix</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...S.tabSwitchBtn, ...(tab === "articles" ? S.tabSwitchActive : {}) }} onClick={() => setTab("articles")}>{t ? t.articles : "Articles"}</button>
          <button style={{ ...S.tabSwitchBtn, ...(tab === "formules" ? S.tabSwitchActive : {}) }} onClick={() => setTab("formules")}>{t ? t.formules : "Formules"}</button>
          <button style={{ ...S.tabSwitchBtn, ...(tab === "categories" ? S.tabSwitchActive : {}) }} onClick={() => setTab("categories")}>{t ? t.categories : "Catégories"}</button>
          <button style={{ ...S.tabSwitchBtn, ...(tab === "employees" ? S.tabSwitchActive : {}) }} onClick={() => setTab("employees")}>{t ? t.equipe : "👥 Équipe"}</button>
        </div>
        {tab !== "categories" && tab !== "employees" && (
          <button style={S.addItemBtn} onClick={() => tab === "articles" ? setShowAddForm(v => !v) : setShowAddFormule(v => !v)}>
            {(tab === "articles" ? showAddForm : showAddFormule) ? "✕ Annuler" : `+ Ajouter ${tab === "articles" ? "un article" : "une formule"}`}
          </button>
        )}
      </div>

      {/* ADD ARTICLE FORM */}
      {tab === "articles" && showAddForm && (
        <div style={S.addForm}>
          <h3 style={S.addFormTitle}>Nouvel article</h3>
          <div style={S.addFormGrid}>
            <div style={S.formField}><label style={S.formLabel}>Emoji</label>
              <select style={S.formInput} value={newItem.emoji} onChange={e => { const v = e.target.value; setNewItem(p => ({ ...p, emoji: v })); }}>
                {EMOJIS.map(em => <option key={em} value={em}>{em}</option>)}
              </select></div>
            <div style={{ ...S.formField, flex: 2 }}><label style={S.formLabel}>Nom *</label>
              <input style={S.formInput} placeholder="Ex: Smash Triple" value={newItem.name} onChange={e => { const v = e.target.value; setNewItem(p => ({ ...p, name: v })); }} /></div>
            <div style={S.formField}><label style={S.formLabel}>Catégorie</label>
              <select style={S.formInput} value={newItem.cat} onChange={e => { const v = e.target.value; setNewItem(p => ({ ...p, cat: v })); }}>
                {categories.map(c => <option key={c}>{c}</option>)}</select></div>
            <div style={S.formField}><label style={S.formLabel}>Prix (€) *</label>
              <input style={S.formInput} type="number" min="0" step="0.5" placeholder="0.00" value={newItem.price} onChange={e => { const v = e.target.value; setNewItem(p => ({ ...p, price: v })); }} /></div>
            <div style={S.formField}><label style={S.formLabel}>Stock initial</label>
              <input style={S.formInput} type="number" min="0" value={newItem.stock} onChange={e => setNewItem(p => ({ ...p, stock: parseInt(e.target.value) || 0 }))} /></div>
            <div style={S.formField}><label style={S.formLabel}>Seuil alerte</label>
              <input style={S.formInput} type="number" min="0" value={newItem.threshold} onChange={e => setNewItem(p => ({ ...p, threshold: parseInt(e.target.value) || 0 }))} /></div>
            <div style={S.formField}><label style={S.formLabel}>Unité</label>
              <input style={S.formInput} placeholder="portions" value={newItem.unit} onChange={e => { const v = e.target.value; setNewItem(p => ({ ...p, unit: v })); }} /></div>
          </div>
          <button style={S.saveNewBtn} onClick={addItem}>✓ Ajouter l&apos;article</button>
        </div>
      )}

      {/* ADD FORMULE FORM */}
      {tab === "formules" && showAddFormule && (
        <div style={S.addForm}>
          <h3 style={S.addFormTitle}>Nouvelle formule</h3>
          <div style={S.addFormGrid}>
            <div style={S.formField}><label style={S.formLabel}>Emoji</label>
              <select style={S.formInput} value={newFormule.emoji} onChange={e => { const v = e.target.value; setNewFormule(p => ({ ...p, emoji: v })); }}>
                {EMOJIS.map(em => <option key={em} value={em}>{em}</option>)}</select></div>
            <div style={{ ...S.formField, flex: 2 }}>
              <label style={S.formLabel}>Nom *</label>
              <input style={S.formInput} placeholder="Ex: Formule Midi" value={newFormule.name}
                onChange={e => { const v = e.target.value; setNewFormule(p => ({ ...p, name: v })); }} />
            </div>
            <div style={S.formField}>
              <label style={S.formLabel}>Prix formule (€) *</label>
              <input style={S.formInput} type="number" min="0" step="0.5" placeholder="0.00" value={newFormule.price}
                onChange={e => { const v = e.target.value; setNewFormule(p => ({ ...p, price: v })); }} />
            </div>
            <div style={{ ...S.formField, flex: 2 }}>
              <label style={S.formLabel}>Description</label>
              <input style={S.formInput} placeholder="Ex: Burger + Frites + Boisson" value={newFormule.description}
                onChange={e => { const v = e.target.value; setNewFormule(p => ({ ...p, description: v })); }} />
            </div>
          </div>
          <button style={S.saveNewBtn} onClick={addFormule}>✓ Ajouter la formule</button>
        </div>
      )}

      {tab === "articles" && (
        <>
          <div style={S.filterTabs}>
            {["Tous", ...categories].map(cat => (
              <button key={cat} style={{ ...S.filterTab, ...(filterCat === cat ? S.filterTabActive : {}) }} onClick={() => setFilterCat(cat)}>{cat}</button>
            ))}
          </div>
          <div style={S.settingsTable}>
            <div style={S.settingsTableHead}><span>Article</span><span>Catégorie</span><span>Prix</span><span>Seuil</span><span>Statut</span><span>Actions</span></div>
            {filtered.map(item => {
              const isEditing = editId === item.id, isInactive = item.active === false;
              return (
                <div key={item.id} style={{ ...S.settingsRow, ...(isInactive ? S.settingsRowInactive : {}) }}>
                  {isEditing ? (
                    <div style={S.editRowMain}>
                      <select style={{ ...S.editInput, width: 55 }} value={editData.emoji} onChange={e => { const v = e.target.value; setEditData(p => ({ ...p, emoji: v })); }}>
                        {EMOJIS.map(em => <option key={em} value={em}>{em}</option>)}</select>
                      <input style={{ ...S.editInput, flex: 2 }} value={editData.name} onChange={e => { const v = e.target.value; setEditData(p => ({ ...p, name: v })); }} />
                      <select style={S.editInput} value={editData.cat} onChange={e => { const v = e.target.value; setEditData(p => ({ ...p, cat: v })); }}>
                        {categories.map(c => <option key={c}>{c}</option>)}</select>
                      <input style={{ ...S.editInput, width: 75 }} type="number" min="0" step="0.5" value={editData.price} onChange={e => { const v = e.target.value; setEditData(p => ({ ...p, price: v })); }} />
                      <input style={{ ...S.editInput, width: 65 }} type="number" min="0" value={editData.threshold} onChange={e => setEditData(p => ({ ...p, threshold: parseInt(e.target.value) || 0 }))} />
                      <div style={S.editActions}>
                        <button style={{ ...S.actionBtn, background: "#27ae60" }} onClick={saveEdit}>✓ Sauver</button>
                        <button style={{ ...S.actionBtn, background: "#555" }} onClick={() => setEditId(null)}>✕</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span style={{ opacity: isInactive ? 0.4 : 1 }}>{item.emoji} {item.name}</span>
                      <span style={{ fontSize: 11, color: "#666", opacity: isInactive ? 0.4 : 1 }}>{item.cat}</span>
                      <span style={{ fontWeight: 700, color: "#D4A843", opacity: isInactive ? 0.4 : 1 }}>{item.price.toFixed(2)}€</span>
                      <span style={{ color: "#888", fontSize: 12 }}>min. {item.threshold}</span>
                      <button style={{ ...S.toggleBtn, background: isInactive ? "#333" : "#1a3a1a", color: isInactive ? "#666" : "#27ae60", border: `1px solid ${isInactive ? "#444" : "#27ae60"}` }}
                        onClick={() => toggleActive(item.id)}>{isInactive ? "⏸ Inactif" : "✓ Actif"}</button>
                      <div style={S.rowActions}>
                        <button style={{ ...S.actionBtn, background: "#2c3e50" }} onClick={() => startEdit(item)}>✏️ Modifier</button>
                        <button style={{ ...S.actionBtn, background: "#1a2a3a", color: "#3b82f6" }} onClick={() => setModEditItem(item)}>🧴 Options</button>
                        {confirmDelete === item.id
                          ? <><button style={{ ...S.actionBtn, background: "#e74c3c" }} onClick={() => deleteItem(item.id)}>Confirmer</button>
                            <button style={{ ...S.actionBtn, background: "#555" }} onClick={() => setConfirmDelete(null)}>Non</button></>
                          : <button style={{ ...S.actionBtn, background: "#3a1a1a", color: "#e74c3c" }} onClick={() => setConfirmDelete(item.id)}>🗑️</button>}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* MODIFIER EDITOR PANEL */}
      {modEditItem && (
        <ModifierEditor item={modEditItem} onSave={(updatedItem) => {
          setMenuItems(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
          setModEditItem(null);
          notify("Options mises à jour ✓");
        }} onClose={() => setModEditItem(null)} />
      )}

      {tab === "formules" && (
        <div style={S.formulesGrid}>
          {formules.map(f => (
            <div key={f.id} style={S.formuleCard}>
              <span style={{ fontSize: 30 }}>{f.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "#f0ece4" }}>{f.name}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>{f.description}</div>
              </div>
              <span style={{ fontSize: 20, fontWeight: 700, color: "#D4A843" }}>{f.price.toFixed(2)}€</span>
              <button style={{ ...S.actionBtn, background: "#3a1a1a", color: "#e74c3c" }} onClick={() => deleteFormule(f.id)}>🗑️</button>
            </div>
          ))}
        </div>
      )}

      {tab === "categories" && (
        <CategoriesManager categories={categories} setCategories={setCategories}
          menuItems={menuItems} setMenuItems={setMenuItems} notify={notify} />
      )}

      {tab === "employees" && (
        <EmployeesManager employees={employees} setEmployees={setEmployees} notify={notify} />
      )}

      <div style={S.settingsNote}>
        💡 Les articles <strong>Inactifs</strong> disparaissent de la caisse mais restent dans le système. Les <strong>Formules</strong> apparaissent en premier onglet de la caisse.
      </div>
    </div>
  );
}

function EmployeesManager({ employees, setEmployees, notify }) {
  const [newName, setNewName] = useState("");
  const [newIsOwner, setNewIsOwner] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [confirmDel, setConfirmDel] = useState(null);

  const addEmployee = () => {
    const name = newName.trim();
    if (!name) return;
    if (employees.find(e => e.name.toLowerCase() === name.toLowerCase())) {
      notify("Ce prénom existe déjà", "error"); return;
    }
    setEmployees(prev => [...prev, { id: "emp_" + Date.now(), name, isOwner: newIsOwner }]);
    setNewName(""); setNewIsOwner(false);
    notify(`${name} ajouté(e) à l'équipe ✓`);
  };

  const saveEdit = (id) => {
    const name = editName.trim();
    if (!name) return;
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, name } : e));
    setEditId(null);
    notify("Nom mis à jour ✓");
  };

  const toggleOwner = (id) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, isOwner: !e.isOwner } : e));
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    setConfirmDel(null);
    notify("Employé supprimé");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Info banner */}
      <div style={{ background: "#0a1a2a", border: "1px solid #1e3a5a", borderRadius: 8, padding: "12px 16px", fontSize: 12, color: "#3b82f6" }}>
        👑 Le flag <strong>Owner</strong> donne accès à l'onglet Config. Système (stats employés). Les stats de chaque personne restent liées à son prénom, même si son poste change.
      </div>

      {/* Add employee */}
      <div style={{ background: "#1e1e1e", border: "1px solid #D4A843", borderRadius: 10, padding: "16px 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#D4A843", marginBottom: 12 }}>+ Ajouter un membre de l&apos;équipe</div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ ...S.formField, flex: 2 }}>
            <label style={S.formLabel}>Prénom</label>
            <input style={S.formInput} placeholder="Ex: Karim, Nadia..."
              value={newName} onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addEmployee()} />
          </div>
          <div style={S.formField}>
            <label style={S.formLabel}>Accès Owner ?</label>
            <select style={S.formInput} value={newIsOwner} onChange={e => setNewIsOwner(e.target.value === "true")}>
              <option value="false">Non</option>
              <option value="true">Oui (accès stats)</option>
            </select>
          </div>
          <button style={{ ...S.saveNewBtn, padding: "9px 20px" }} onClick={addEmployee}>+ Ajouter</button>
        </div>
      </div>

      {/* Employee list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, padding: "0 4px" }}>
          {employees.length} membre(s) dans l'équipe
        </div>
        {employees.map(emp => (
          <div key={emp.id} style={{ background: "#1e1e1e", border: `1px solid ${emp.isOwner ? "#D4A843" : "#2a2a2a"}`, borderRadius: 8, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 20 }}>{emp.isOwner ? "👑" : "👤"}</span>
            {editId === emp.id ? (
              <input style={{ ...S.editInput, flex: 1 }} value={editName}
                onChange={e => setEditName(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") saveEdit(emp.id); if (e.key === "Escape") setEditId(null); }}
                autoFocus />
            ) : (
              <span style={{ flex: 1, fontWeight: 700, fontSize: 15, color: emp.isOwner ? "#D4A843" : "#f0ece4" }}>{emp.name}</span>
            )}
            {emp.isOwner && <span style={{ fontSize: 11, color: "#D4A843", background: "#2c2208", borderRadius: 20, padding: "3px 10px" }}>Owner</span>}
            <div style={{ display: "flex", gap: 6 }}>
              {editId === emp.id ? (
                <>
                  <button style={{ ...S.actionBtn, background: "#27ae60" }} onClick={() => saveEdit(emp.id)}>✓</button>
                  <button style={{ ...S.actionBtn, background: "#555" }} onClick={() => setEditId(null)}>✕</button>
                </>
              ) : (
                <>
                  <button style={{ ...S.actionBtn, background: "#2c3e50" }} onClick={() => { setEditId(emp.id); setEditName(emp.name); }}>✏️ Renommer</button>
                  <button style={{ ...S.actionBtn, background: emp.isOwner ? "#2c2208" : "#1a2a3a", color: emp.isOwner ? "#D4A843" : "#3b82f6", border: `1px solid ${emp.isOwner ? "#D4A843" : "#3b82f6"}` }}
                    onClick={() => toggleOwner(emp.id)}>
                    {emp.isOwner ? "👑 Owner" : "Mettre Owner"}
                  </button>
                  {confirmDel === emp.id ? (
                    <>
                      <button style={{ ...S.actionBtn, background: "#e74c3c" }} onClick={() => deleteEmployee(emp.id)}>Confirmer</button>
                      <button style={{ ...S.actionBtn, background: "#555" }} onClick={() => setConfirmDel(null)}>Non</button>
                    </>
                  ) : (
                    <button style={{ ...S.actionBtn, background: "#3a1a1a", color: "#e74c3c" }} onClick={() => setConfirmDel(emp.id)}>🗑️</button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModifierEditor({ item, onSave, onClose }) {
  const [modifiers, setModifiers] = useState(item.modifiers ? JSON.parse(JSON.stringify(item.modifiers)) : []);
  const [newModLabel, setNewModLabel] = useState("");
  const [newModMax, setNewModMax] = useState(1);
  const [newModRequired, setNewModRequired] = useState(false);
  const [newOptText, setNewOptText] = useState({});

  const addModifier = () => {
    if (!newModLabel.trim()) return;
    setModifiers(prev => [...prev, {
      id: "mod_" + Date.now(),
      label: newModLabel.trim(),
      options: [],
      required: newModRequired,
      maxSelect: newModMax,
    }]);
    setNewModLabel(""); setNewModMax(1); setNewModRequired(false);
  };

  const removeModifier = (id) => setModifiers(prev => prev.filter(m => m.id !== id));

  const addOption = (modId) => {
    const txt = (newOptText[modId] || "").trim();
    if (!txt) return;
    setModifiers(prev => prev.map(m => m.id === modId ? { ...m, options: [...m.options, txt] } : m));
    setNewOptText(prev => ({ ...prev, [modId]: "" }));
  };

  const removeOption = (modId, opt) => {
    setModifiers(prev => prev.map(m => m.id === modId ? { ...m, options: m.options.filter(o => o !== opt) } : m));
  };

  return (
    <div style={{ background: "#111", border: "2px solid #3b82f6", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 700, color: "#3b82f6", fontSize: 14 }}>🧴 Options & Modificateurs</div>
          <div style={{ fontSize: 12, color: "#888" }}>{item.emoji} {item.name}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...S.saveNewBtn, padding: "7px 16px" }} onClick={() => onSave({ ...item, modifiers })}>✓ Sauvegarder</button>
          <button style={{ ...S.actionBtn, background: "#333" }} onClick={onClose}>✕ Fermer</button>
        </div>
      </div>

      {/* Existing modifiers */}
      {modifiers.map(mod => (
        <div key={mod.id} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, padding: "12px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: "#D4A843" }}>{mod.label}</span>
              <span style={{ fontSize: 11, color: "#888" }}>max {mod.maxSelect || 1} choix</span>
              <span style={{ fontSize: 11, color: mod.required ? "#e74c3c" : "#555" }}>{mod.required ? "obligatoire" : "optionnel"}</span>
            </div>
            <button style={{ ...S.actionBtn, background: "#3a1a1a", color: "#e74c3c", padding: "4px 8px" }} onClick={() => removeModifier(mod.id)}>🗑️</button>
          </div>
          {/* Options list */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
            {mod.options.map(opt => (
              <span key={opt} style={{ background: "#2a2a2a", border: "1px solid #333", borderRadius: 20, padding: "4px 10px", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                {opt}
                <button style={{ background: "transparent", border: "none", color: "#666", cursor: "pointer", fontSize: 14, padding: 0 }} onClick={() => removeOption(mod.id, opt)}>×</button>
              </span>
            ))}
          </div>
          {/* Add option */}
          <div style={{ display: "flex", gap: 6 }}>
            <input style={{ ...S.restockInput, flex: 1, fontSize: 12 }} placeholder="Ajouter une option..."
              value={newOptText[mod.id] || ""}
              onChange={e => setNewOptText(p => ({ ...p, [mod.id]: e.target.value }))}
              onKeyDown={e => e.key === "Enter" && addOption(mod.id)} />
            <button style={S.restockBtn} onClick={() => addOption(mod.id)}>+ Ajouter</button>
          </div>
        </div>
      ))}

      {/* Add new modifier */}
      <div style={{ background: "#0a1a0a", border: "1px solid #1a3a1a", borderRadius: 8, padding: "12px 14px" }}>
        <div style={{ fontSize: 12, color: "#27ae60", fontWeight: 700, marginBottom: 10 }}>+ Nouveau modificateur</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={S.formField}>
            <label style={S.formLabel}>Nom (ex: Cuisson, Taille, Pain...)</label>
            <input style={S.formInput} placeholder="Choix du pain" value={newModLabel}
              onChange={e => setNewModLabel(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addModifier()} />
          </div>
          <div style={{ ...S.formField, maxWidth: 90 }}>
            <label style={S.formLabel}>Max choix</label>
            <select style={S.formInput} value={newModMax} onChange={e => setNewModMax(parseInt(e.target.value))}>
              {[1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div style={{ ...S.formField, maxWidth: 100 }}>
            <label style={S.formLabel}>Obligatoire ?</label>
            <select style={S.formInput} value={newModRequired} onChange={e => setNewModRequired(e.target.value === "true")}>
              <option value="false">Non</option>
              <option value="true">Oui</option>
            </select>
          </div>
          <button style={{ ...S.saveNewBtn, padding: "9px 16px", alignSelf: "flex-end" }} onClick={addModifier}>Créer</button>
        </div>
      </div>

      <div style={{ fontSize: 11, color: "#555" }}>
        💡 Exemples : "Choix du pain" (Brioche / Turc / Classique) • "Cuisson" (Saignant / À point / Bien cuit) • "Taille" (Petite / Grande)
      </div>
    </div>
  );
}

const OWNER_PIN = "7682";

function SysConfigView({ orders }) {
  const [pinInput, setPinInput] = useState("");
  const [stage, setStage] = useState("pin"); // pin | fakeconsole | stats
  const [fakeSection, setFakeSection] = useState(null);
  const [pinError, setPinError] = useState(false);
  const [period, setPeriod] = useState("today");
  const [consoleLines, setConsoleLines] = useState([]);
  const [consoleReady, setConsoleReady] = useState(false);

  const tryUnlock = () => {
    if (pinInput === OWNER_PIN) {
      setStage("fakeconsole");
      setPinError(false);
      // Simulate console boot sequence
      const lines = [

        { t: 400,  c: "#888",    tx: "  Loading /etc/app/config.json ... OK" },
        { t: 700,  c: "#888",    tx: "  Mounting persistent storage ... OK" },
        { t: 1000, c: "#888",    tx: "  Checking DB connection pool [max:20] ... CONNECTED" },
        { t: 1300, c: "#e67e22", tx: "  WARN: cache TTL mismatch detected (redis ≠ local)" },
        { t: 1600, c: "#888",    tx: "  Resyncing worker threads [4/4] ........... OK" },
        { t: 1900, c: "#3b82f6", tx: "  API gateway heartbeat: 42ms latency avg" },
        { t: 2200, c: "#888",    tx: "  Session token refreshed. exp: +3600s" },
        { t: 2500, c: "#27ae60", tx: "✔ System ready. Select a configuration module below." },
      ];
      setConsoleLines([
        { c: "#27ae60", tx: "Initializing system config daemon v2.4.1..." },
        { c: "#888",    tx: "  Loading /etc/app/config.json ... OK" },
        { c: "#888",    tx: "  Mounting persistent storage ... OK" },
        { c: "#888",    tx: "  Checking DB connection pool [max:20] ... CONNECTED" },
        { c: "#e67e22", tx: "  WARN: cache TTL mismatch detected (redis != local)" },
        { c: "#888",    tx: "  Resyncing worker threads [4/4] ........... OK" },
        { c: "#3b82f6", tx: "  API gateway heartbeat: 42ms latency avg" },
        { c: "#888",    tx: "  Session token refreshed. exp: +3600s" },
        { c: "#27ae60", tx: "System ready. Select a configuration module below." },
      ]);
      setConsoleReady(true);
    } else {
      setPinError(true);
      setPinInput("");
      setTimeout(() => setPinError(false), 1500);
    }
  };

  const FAKE_SECTIONS = [
    { id: "db",   label: "Database Config",       icon: "🗄️",  desc: "Connection pool, replica sets, sharding parameters" },
    { id: "api",  label: "API Endpoints",          icon: "🔌",  desc: "Rate limits, timeout values, CORS policy" },
    { id: "cache",label: "Cache Management",       icon: "⚡",  desc: "TTL rules, eviction policy, Redis cluster config" },
    { id: "perf", label: "Performance Metrics",    icon: "📊",  desc: "Runtime analytics, request tracing, load distribution" },
    { id: "logs", label: "System Logs",            icon: "📋",  desc: "Error log level, retention policy, log rotation" },
    { id: "sec",  label: "Security & Auth",        icon: "🔐",  desc: "Token expiry, IP whitelist, session policy" },
  ];

  const FAKE_DB_PARAMS = [
    { label: "Max connections", value: "20", unit: "pool" },
    { label: "Query timeout",   value: "5000", unit: "ms" },
    { label: "Replica lag",     value: "12", unit: "ms" },
    { label: "Cache hit ratio", value: "94.3", unit: "%" },
    { label: "Worker threads",  value: "4", unit: "active" },
    { label: "Heap allocated",  value: "247", unit: "MB" },
  ];

  if (stage === "pin") {
    return (
      <div style={S.sysconfigLock}>
        <div style={S.sysconfigLockCard}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>⚙️</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#f0ece4", marginBottom: 2 }}>Configuration Système</div>
          <div style={{ fontSize: 11, color: "#666", marginBottom: 20, textAlign: "center", maxWidth: 280 }}>
            Paramètres avancés de l'application. Accès restreint — toute modification non autorisée peut affecter le fonctionnement du service.
          </div>
          <div style={{ fontSize: 11, color: "#555", marginBottom: 12 }}>Code d&apos;accès administrateur</div>
          <input type="password" maxLength={4} placeholder="••••"
            style={{ ...S.loginInput, textAlign: "center", letterSpacing: 8, fontSize: 22, width: 120, border: pinError ? "2px solid #e74c3c" : "2px solid #444" }}
            value={pinInput}
            onChange={e => setPinInput(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
            onKeyDown={e => e.key === "Enter" && tryUnlock()}
            autoFocus />
          {pinError && <div style={{ color: "#e74c3c", fontSize: 12, marginTop: 8 }}>Code incorrect</div>}
          <button style={{ ...S.validateBtn, marginTop: 16, width: 160 }} onClick={tryUnlock} disabled={pinInput.length !== 4}>Accéder</button>
          <div style={{ fontSize: 10, color: "#2a2a2a", marginTop: 16 }}>v2.4.1-stable — build 20240601.1142 — env: production</div>
        </div>
      </div>
    );
  }

  if (stage === "fakeconsole") {
    return (
      <div style={S.fakeConsoleLayout}>
        {/* Terminal boot log */}
        <div style={S.fakeTerminal}>
          <div style={S.fakeTerminalBar}>
            <span style={{ color: "#e74c3c" }}>●</span>
            <span style={{ color: "#e67e22", marginLeft: 6 }}>●</span>
            <span style={{ color: "#27ae60", marginLeft: 6 }}>●</span>
            <span style={{ fontSize: 11, color: "#555", marginLeft: 12 }}>system-config — bash — 80x24</span>
          </div>
          <div style={S.fakeTerminalBody}>
            {consoleLines.map((l, i) => (
              <div key={i} style={{ color: l.c, fontFamily: "monospace", fontSize: 12, lineHeight: 1.7 }}>{l.tx}</div>
            ))}
            {!consoleReady && (
              <span style={{ display: "inline-block", width: 8, height: 14, background: "#27ae60", marginTop: 4, animation: "none" }}>█</span>
            )}
          </div>
        </div>

        {/* Fake module grid */}
        {consoleReady && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 12, color: "#666", letterSpacing: 1, textTransform: "uppercase" }}>Modules de configuration disponibles</div>
            <div style={S.fakeModuleGrid}>
              {FAKE_SECTIONS.map(sec => (
                <button key={sec.id} style={{
                  ...S.fakeModuleCard,
                  ...(sec.id === "perf" ? S.fakeModuleCardHighlight : {}),
                  ...(fakeSection === sec.id ? S.fakeModuleCardActive : {})
                }} onClick={() => {
                  setFakeSection(sec.id);
                  if (sec.id === "perf") setTimeout(() => setStage("stats"), 600);
                }}>
                  <span style={{ fontSize: 24 }}>{sec.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 13, color: sec.id === "perf" ? "#D4A843" : "#f0ece4" }}>{sec.label}</span>
                  <span style={{ fontSize: 11, color: "#555", lineHeight: 1.4 }}>{sec.desc}</span>
                  {sec.id === "perf" && <span style={{ fontSize: 10, color: "#D4A843", marginTop: 2 }}>↗ Données temps réel</span>}
                </button>
              ))}
            </div>

            {/* Fake param display for non-perf sections */}
            {fakeSection && fakeSection !== "perf" && (
              <div style={S.fakeParamBox}>
                <div style={{ fontSize: 12, color: "#27ae60", marginBottom: 10, fontFamily: "monospace" }}>
                  $ cat /etc/app/{fakeSection}.config
                </div>
                {FAKE_DB_PARAMS.map((p, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1a1a1a", fontFamily: "monospace", fontSize: 12 }}>
                    <span style={{ color: "#888" }}>{p.label}</span>
                    <span style={{ color: "#27ae60" }}>{p.value} <span style={{ color: "#555" }}>{p.unit}</span></span>
                  </div>
                ))}
                <div style={{ fontSize: 11, color: "#444", marginTop: 10 }}>⚠ Modification réservée aux administrateurs système. Contactez le support technique avant toute intervention.</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

    const now = new Date();

  const filterByPeriod = (o) => {
    const t = new Date(o.time);
    if (period === "today") return t.toDateString() === now.toDateString();
    if (period === "week") {
      const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);
      return t >= weekAgo;
    }
    if (period === "month") {
      return t.getMonth() === now.getMonth() && t.getFullYear() === now.getFullYear();
    }
    return true;
  };

  const periodOrders = orders.filter(filterByPeriod).filter(o => o.status !== "Annulée");

  // Stats per employee
  const employees = {};
  periodOrders.forEach(o => {
    const name = o.user || "Inconnu";
    if (!employees[name]) employees[name] = { orders: 0, ca: 0, days: new Set() };
    employees[name].orders++;
    employees[name].ca += o.total;
    employees[name].days.add(new Date(o.time).toDateString());
  });

  // Worked days per employee across all time
  const allDays = {};
  orders.forEach(o => {
    const name = o.user || "Inconnu";
    if (!allDays[name]) allDays[name] = new Set();
    allDays[name].add(new Date(o.time).toDateString());
  });

  const empList = Object.entries(employees).sort((a, b) => b[1].ca - a[1].ca);
  const totalCA = periodOrders.reduce((s, o) => s + o.total, 0);

  return (
    <div style={S.sysconfigLayout}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 style={S.sectionTitle}>📊 Stats Équipe</h2>
          <div style={{ fontSize: 11, color: "#555" }}>Visible uniquement par vous</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {[{ k: "today", l: "Aujourd'hui" }, { k: "week", l: "7 jours" }, { k: "month", l: "Ce mois" }, { k: "all", l: "Tout" }].map(p => (
            <button key={p.k} style={{ ...S.filterTab, ...(period === p.k ? S.filterTabActive : {}) }}
              onClick={() => setPeriod(p.k)}>{p.l}</button>
          ))}
          <button style={{ ...S.logoutBtn, marginLeft: 8 }} onClick={() => { setStage("fakeconsole"); }}>← Retour config</button>
          <button style={{ ...S.logoutBtn }} onClick={() => { setStage("pin"); setPinInput(""); setConsoleLines([]); setConsoleReady(false); }}>🔒 Verrouiller</button>
        </div>
      </div>

      {/* Global KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        <div style={S.kpiCard}><span style={S.kpiLabel}>CA période</span><span style={S.kpiValue}>{totalCA.toFixed(0)}€</span></div>
        <div style={S.kpiCard}><span style={S.kpiLabel}>{t ? t.commandes : "Commandes"}</span><span style={S.kpiValue}>{periodOrders.length}</span></div>
        <div style={S.kpiCard}><span style={S.kpiLabel}>{t ? t.ticketMoyen : "Ticket moyen"}</span><span style={S.kpiValue}>{periodOrders.length ? (totalCA / periodOrders.length).toFixed(2) : "0.00"}€</span></div>
      </div>

      {/* Employee ranking */}
      {empList.length === 0 && <div style={S.emptyState}>Aucune commande sur cette période.</div>}
      {empList.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {empList.map(([name, stats], rank) => {
            const totalDays = allDays[name] ? allDays[name].size : 0;
            const avgTicket = stats.orders ? (stats.ca / stats.orders).toFixed(2) : "0.00";
            const share = totalCA > 0 ? ((stats.ca / totalCA) * 100) : 0;
            const cbCa = periodOrders.filter(o => o.user === name && (o.paymentMode === "CB" || !o.paymentMode)).reduce((s, o) => s + o.total, 0);
            const cashCa = periodOrders.filter(o => o.user === name && o.paymentMode === "Espèces").reduce((s, o) => s + o.total, 0);
            const medals = ["🥇","🥈","🥉"];
            return (
              <div key={name} style={{ background: "#1e1e1e", border: rank === 0 ? "1px solid #D4A843" : "1px solid #2a2a2a", borderRadius: 10, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>{medals[rank] || "👤"}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 16, color: rank === 0 ? "#D4A843" : "#f0ece4" }}>{name}</div>
                    <div style={{ fontSize: 11, color: "#666" }}>{totalDays} jour{totalDays > 1 ? "s" : ""} travaillé{totalDays > 1 ? "s" : ""} au total</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#27ae60" }}>{stats.ca.toFixed(2)}€</div>
                    <div style={{ fontSize: 11, color: "#888" }}>{stats.orders} commandes</div>
                  </div>
                </div>
                {/* CA bar */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888", marginBottom: 4 }}>
                    <span>Part du CA</span><span>{share.toFixed(0)}%</span>
                  </div>
                  <div style={{ height: 6, background: "#2a2a2a", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${share}%`, background: rank === 0 ? "#D4A843" : "#27ae60", borderRadius: 3 }} />
                  </div>
                </div>
                {/* Stats row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                  <div style={{ background: "#111", borderRadius: 6, padding: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#666" }}>Ticket moy.</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#D4A843" }}>{avgTicket}€</div>
                  </div>
                  <div style={{ background: "#111", borderRadius: 6, padding: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#666" }}>Commandes</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#f0ece4" }}>{stats.orders}</div>
                  </div>
                  <div style={{ background: "#0a1a2a", borderRadius: 6, padding: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#666" }}>💳 CB</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#3b82f6" }}>{cbCa.toFixed(0)}€</div>
                  </div>
                  <div style={{ background: "#0a2a1a", borderRadius: 6, padding: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#666" }}>💵 Espèces</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#27ae60" }}>{cashCa.toFixed(0)}€</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Discount traceability */}
      <DiscountTrace periodOrders={periodOrders} />

      {/* Per employee order list */}
      {empList.length > 0 && (
        <div style={S.dashCard}>
          <h3 style={S.dashCardTitle}>🧾 Détail commandes par employé</h3>
          {empList.map(([name]) => {
            const empOrders = periodOrders.filter(o => o.user === name).slice(0, 5);
            return (
              <div key={name} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#D4A843", marginBottom: 6 }}>👤 {name}</div>
                {empOrders.map(o => (
                  <div key={o.id} style={{ display: "flex", gap: 12, padding: "6px 0", borderBottom: "1px solid #222", fontSize: 12, color: "#aaa" }}>
                    <span style={{ color: "#D4A843" }}>{o.id}</span>
                    <span>{new Date(o.time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
                    <span>{o.destination}</span>
                    <span style={{ marginLeft: "auto", fontWeight: 700, color: "#27ae60" }}>{o.total.toFixed(2)}€</span>
                    {o.discount > 0 && <span style={{ color: "#e67e22" }}>-{o.discount}%</span>}
                  </div>
                ))}
                {periodOrders.filter(o => o.user === name).length > 5 && (
                  <div style={{ fontSize: 11, color: "#555", paddingTop: 4 }}>
                    + {periodOrders.filter(o => o.user === name).length - 5} autres commandes
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LoginScreen({ employees, onLogin }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Caisse");
  const ROLES = ["Caisse", "Cuisine", "Service"];

  const handleLogin = (selectedName) => {
    const trimmed = (selectedName || name).trim();
    if (!trimmed) return;
    onLogin(trimmed);
  };

  return (
    <div style={S.loginRoot}>
      <div style={S.loginCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={S.loginLogo}>🔥 LE COMPTOIR</div>
          <button style={{ background: "transparent", border: "1px solid #333", borderRadius: 20, padding: "4px 12px", cursor: "pointer", fontSize: 18 }}
            onClick={() => setLang(l => l === "fr" ? "es" : "fr")}>
            {lang === "fr" ? "🇪🇸 ES" : "🇫🇷 FR"}
          </button>
        </div>
        <div style={S.loginSub}>{t.loginTitle}</div>

        <div style={S.loginSection}>
          <label style={S.formLabel}>Choisissez votre nom</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {employees.map(emp => (
              <button key={emp.id}
                style={{ ...S.quickNameBtn, ...(name === emp.name ? S.quickNameBtnActive : {}), padding: "10px 18px", fontSize: 14 }}
                onClick={() => setName(emp.name)}>
                {emp.isOwner ? "👑 " : ""}{emp.name}
              </button>
            ))}
          </div>
          <input style={{ ...S.loginInput, marginTop: 8 }} placeholder="Ou tapez votre prénom..."
            value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()} />
        </div>

        <div style={S.loginSection}>
          <label style={S.formLabel}>{t.loginPoste}</label>
          <div style={S.roleBtns}>
            {ROLES.map(r => (
              <button key={r} style={{ ...S.roleBtn, ...(role === r ? S.roleBtnActive : {}) }}
                onClick={() => setRole(r)}>
                {r === "Caisse" ? "🧾" : r === "Cuisine" ? "👨‍🍳" : "🍽️"} {r}
              </button>
            ))}
          </div>
        </div>

        <button style={{ ...S.validateBtn, marginTop: 8, opacity: name.trim() ? 1 : 0.4 }}
          onClick={() => handleLogin()} disabled={!name.trim()}>
          {t.loginBtn} ({t.roles[role] || role})
        </button>
      </div>
    </div>
  );
}

function CategoriesManager({ categories, setCategories, menuItems, setMenuItems, notify }) {
  const [newCatName, setNewCatName] = useState("");
  const [newCatEmoji, setNewCatEmoji] = useState("🍽️");
  const [editCat, setEditCat] = useState(null);
  const [editCatName, setEditCatName] = useState("");
  const [confirmDeleteCat, setConfirmDeleteCat] = useState(null);

  const FIXED_CATS = []; // no locked categories - all can be managed

  const addCategory = () => {
    const name = newCatName.trim();
    if (!name) { notify("Nom de catégorie obligatoire", "error"); return; }
    if (categories.includes(name)) { notify("Cette catégorie existe déjà", "error"); return; }
    setCategories(prev => [...prev, name]);
    setNewCatName("");
    notify(`Catégorie "${name}" ajoutée ✓`);
  };

  const renameCategory = (oldName) => {
    const name = editCatName.trim();
    if (!name || name === oldName) { setEditCat(null); return; }
    if (categories.includes(name)) { notify("Ce nom existe déjà", "error"); return; }
    setCategories(prev => prev.map(c => c === oldName ? name : c));
    setMenuItems(prev => prev.map(i => i.cat === oldName ? { ...i, cat: name } : i));
    setEditCat(null);
    notify(`Catégorie renommée en "${name}" ✓`);
  };

  const deleteCategory = (catName) => {
    const count = menuItems.filter(i => i.cat === catName).length;
    setCategories(prev => prev.filter(c => c !== catName));
    if (count > 0) {
      setMenuItems(prev => prev.map(i => i.cat === catName ? { ...i, cat: "Extras", active: false } : i));
      notify(`Catégorie supprimée. ${count} article(s) déplacé(s) vers Extras.`, "success");
    } else {
      notify(`Catégorie "${catName}" supprimée ✓`);
    }
    setConfirmDeleteCat(null);
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    setCategories(prev => { const a = [...prev]; [a[idx-1], a[idx]] = [a[idx], a[idx-1]]; return a; });
  };
  const moveDown = (idx) => {
    setCategories(prev => { if (idx >= prev.length-1) return prev; const a = [...prev]; [a[idx], a[idx+1]] = [a[idx+1], a[idx]]; return a; });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* ADD NEW */}
      <div style={{ background: "#1e1e1e", border: "1px solid #D4A843", borderRadius: 10, padding: "16px 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#D4A843", marginBottom: 12 }}>+ Nouvelle catégorie</div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={S.formLabel}>Emoji</label>
            <select style={{ ...S.formInput, width: 70 }} value={newCatEmoji} onChange={e => setNewCatEmoji(e.target.value)}>
              {["🍽️","🍔","🥪","🫓","🍗","🥩","🥗","🍟","🥤","☕","🍰","🍩","🧁","🎂","🍪","🍫","🍮","🍦","🌿","⭐","🔥","💥"].map(em => <option key={em} value={em}>{em}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1, minWidth: 180 }}>
            <label style={S.formLabel}>Nom de la catégorie</label>
            <input style={S.formInput} placeholder="Ex: Poulets, Salades, Happy Hour..."
              value={newCatName} onChange={e => setNewCatName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addCategory()} />
          </div>
          <button style={{ ...S.saveNewBtn, padding: "9px 20px" }} onClick={addCategory}>+ Ajouter</button>
        </div>
      </div>

      {/* LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, padding: "0 4px", marginBottom: 4 }}>
          {categories.length} catégorie(s) — glisse les flèches pour réordonner
        </div>
        {categories.map((cat, idx) => {
          const count = menuItems.filter(i => i.cat === cat).length;
          const isEditing = editCat === cat;
          return (
            <div key={cat} style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 8, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
              {/* ORDER BTNS */}
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <button style={{ ...S.qtyBtn, width: 22, height: 20, fontSize: 11 }} onClick={() => moveUp(idx)}>▲</button>
                <button style={{ ...S.qtyBtn, width: 22, height: 20, fontSize: 11 }} onClick={() => moveDown(idx)}>▼</button>
              </div>
              {/* NAME / EDIT */}
              {isEditing ? (
                <input style={{ ...S.editInput, flex: 1 }} value={editCatName}
                  onChange={e => setEditCatName(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") renameCategory(cat); if (e.key === "Escape") setEditCat(null); }}
                  autoFocus />
              ) : (
                <span style={{ flex: 1, fontWeight: 600, fontSize: 14 }}>{cat}</span>
              )}
              <span style={{ fontSize: 12, color: "#666", minWidth: 80 }}>{count} article{count > 1 ? "s" : ""}</span>
              {/* ACTIONS */}
              {isEditing ? (
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ ...S.actionBtn, background: "#27ae60" }} onClick={() => renameCategory(cat)}>✓ Sauver</button>
                  <button style={{ ...S.actionBtn, background: "#555" }} onClick={() => setEditCat(null)}>✕</button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ ...S.actionBtn, background: "#2c3e50" }} onClick={() => { setEditCat(cat); setEditCatName(cat); }}>✏️ Renommer</button>
                  {confirmDeleteCat === cat ? (
                    <>
                      <button style={{ ...S.actionBtn, background: "#e74c3c" }} onClick={() => deleteCategory(cat)}>Confirmer</button>
                      <button style={{ ...S.actionBtn, background: "#555" }} onClick={() => setConfirmDeleteCat(null)}>Non</button>
                    </>
                  ) : (
                    <button style={{ ...S.actionBtn, background: "#3a1a1a", color: "#e74c3c" }} onClick={() => setConfirmDeleteCat(cat)}>🗑️</button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}



function ClotureCaisse({ todayOrders }) {
  const cbTotal = todayOrders.filter(o => o.paymentMode === "CB" || !o.paymentMode).reduce((s, o) => s + o.total, 0);
  const cashTotal = todayOrders.filter(o => o.paymentMode === "Especes").reduce((s, o) => s + o.total, 0);
  const mixTotal = todayOrders.filter(o => o.paymentMode === "Mixte").reduce((s, o) => s + o.total, 0);
  const cbCount = todayOrders.filter(o => o.paymentMode === "CB" || !o.paymentMode).length;
  const cashCount = todayOrders.filter(o => o.paymentMode === "Especes").length;
  const mixCount = todayOrders.filter(o => o.paymentMode === "Mixte").length;
  return (
    <div style={{ background: "#1e1e1e", border: "1px solid #333", borderRadius: 12, padding: "18px 20px" }}>
      <h3 style={{ ...S.dashCardTitle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>Cloture de caisse</span>
        <span style={{ fontSize: 12, color: "#888", fontWeight: 400 }}>Especes attendues dans le tiroir</span>
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <div style={{ background: "#0a1a2a", border: "1px solid #1e3a5a", borderRadius: 10, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 18 }}>💳</span>
          <span style={{ fontSize: 12, color: "#888" }}>CB — {cbCount} cmd</span>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#3b82f6" }}>{cbTotal.toFixed(2)}€</span>
        </div>
        <div style={{ background: "#0a2a1a", border: "1px solid #1a5a3a", borderRadius: 10, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 18 }}>💵</span>
          <span style={{ fontSize: 12, color: "#888" }}>Especes — {cashCount} cmd</span>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#27ae60" }}>{cashTotal.toFixed(2)}€</span>
          <span style={{ fontSize: 11, color: "#27ae60", background: "#0a3a1a", borderRadius: 4, padding: "2px 6px", marginTop: 2 }}>A avoir en caisse</span>
        </div>
        <div style={{ background: "#1a1a0a", border: "1px solid #3a3a1a", borderRadius: 10, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 18 }}>🔄</span>
          <span style={{ fontSize: 12, color: "#888" }}>Mixte — {mixCount} cmd</span>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#D4A843" }}>{mixTotal.toFixed(2)}€</span>
        </div>
      </div>
    </div>
  );
}

function HourlyHeatmap({ todayOrders }) {
  const hours = Array.from({ length: 16 }, (_, i) => i + 7);
  const hourlyData = {};
  hours.forEach(h => { hourlyData[h] = { count: 0 }; });
  todayOrders.forEach(o => {
    const h = new Date(o.time).getHours();
    if (hourlyData[h]) hourlyData[h].count++;
  });
  const maxCount = Math.max(...Object.values(hourlyData).map(h => h.count), 1);
  return (
    <div style={S.dashCard}>
      <h3 style={S.dashCardTitle}>Activite par heure</h3>
      <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 80 }}>
        {hours.map(h => {
          const data = hourlyData[h];
          const pct = data.count / maxCount;
          const isHot = pct > 0.6;
          const isMed = pct > 0.3;
          return (
            <div key={h} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ fontSize: 9, color: "#666" }}>{data.count > 0 ? data.count : ""}</div>
              <div style={{ width: "100%", background: isHot ? "#D4A843" : isMed ? "#8a6820" : "#2a2a2a", borderRadius: "3px 3px 0 0", height: `${Math.max(4, pct * 52)}px` }} />
              <div style={{ fontSize: 9, color: "#555" }}>{h}h</div>
            </div>
          );
        })}
      </div>
      {todayOrders.length === 0 && <div style={{ color: "#555", fontSize: 13, paddingTop: 8 }}>Aucune commande</div>}
    </div>
  );
}

function EndOfServiceModal({ todayOrders, todayCA, onClose }) {
  const cbTotal = todayOrders.filter(o => o.paymentMode === "CB" || !o.paymentMode).reduce((s, o) => s + o.total, 0);
  const cashTotal = todayOrders.filter(o => o.paymentMode === "Especes").reduce((s, o) => s + o.total, 0);
  const mixTotal = todayOrders.filter(o => o.paymentMode === "Mixte").reduce((s, o) => s + o.total, 0);
  const sales = {};
  todayOrders.forEach(o => o.items.forEach(i => { sales[i.name] = (sales[i.name] || 0) + i.qty; }));
  const top3 = Object.entries(sales).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const h = {};
  todayOrders.forEach(o => { const hr = new Date(o.time).getHours(); h[hr] = (h[hr] || 0) + 1; });
  const peakEntry = Object.entries(h).sort((a, b) => b[1] - a[1])[0];
  const peakHour = peakEntry ? peakEntry[0] + "h (" + peakEntry[1] + " cmd)" : "---";
  return (
    <div style={S.variantOverlay} onClick={onClose}>
      <div style={{ ...S.variantModal, maxWidth: 480, maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 32 }}>🌙</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#D4A843" }}>Recapitulatif de service</div>
          <div style={{ fontSize: 12, color: "#888" }}>{new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</div>
        </div>
        <div style={{ background: "#111", borderRadius: 10, padding: "16px 20px", marginBottom: 12, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#888" }}>CHIFFRE D AFFAIRES</div>
          <div style={{ fontSize: 42, fontWeight: 700, color: "#D4A843" }}>{todayCA.toFixed(2)}€</div>
          <div style={{ fontSize: 13, color: "#888" }}>{todayOrders.length} commandes</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
          <div style={{ background: "#0a1a2a", borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 16 }}>💳</div>
            <div style={{ fontSize: 11, color: "#888" }}>CB</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#3b82f6" }}>{cbTotal.toFixed(2)}€</div>
          </div>
          <div style={{ background: "#0a2a1a", borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 16 }}>💵</div>
            <div style={{ fontSize: 11, color: "#888" }}>Especes</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#27ae60" }}>{cashTotal.toFixed(2)}€</div>
          </div>
          <div style={{ background: "#1a1a0a", borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 16 }}>🔄</div>
            <div style={{ fontSize: 11, color: "#888" }}>Mixte</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#D4A843" }}>{mixTotal.toFixed(2)}€</div>
          </div>
        </div>
        <div style={{ background: "#111", borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>TOP ARTICLES</div>
          {top3.length === 0 && <div style={{ color: "#555", fontSize: 12 }}>Aucune vente</div>}
          {top3.map(([name, qty], i) => (
            <div key={name} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #1a1a1a", fontSize: 13 }}>
              <span>{["🥇","🥈","🥉"][i]} {name}</span>
              <span style={{ color: "#D4A843", fontWeight: 700 }}>{qty} vendus</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#111", borderRadius: 10, padding: "14px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: "#888" }}>Heure de pointe</span>
          <span style={{ fontWeight: 700, color: "#D4A843" }}>{peakHour}</span>
        </div>
        <div style={{ fontSize: 11, color: "#27ae60", textAlign: "center", marginBottom: 12 }}>
          Especes a avoir dans le tiroir : <strong>{cashTotal.toFixed(2)}€</strong>
        </div>
        <button style={S.validateBtn} onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}

function DiscountTrace({ periodOrders }) {
  const discountOrders = periodOrders.filter(o => o.discount > 0);
  if (discountOrders.length === 0) return null;
  const totalDiscount = discountOrders.reduce((s, o) => s + ((o.totalBeforeDiscount || o.total) - o.total), 0);
  return (
    <div style={S.dashCard}>
      <h3 style={S.dashCardTitle}>Remises accordees ({discountOrders.length}) — Total offert : {totalDiscount.toFixed(2)}€</h3>
      {discountOrders.map(o => (
        <div key={o.id} style={{ display: "flex", gap: 12, padding: "7px 0", borderBottom: "1px solid #222", fontSize: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ color: "#D4A843", fontWeight: 700 }}>{o.id}</span>
          <span style={{ color: "#888" }}>{new Date(o.time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
          <span style={{ color: "#f0ece4" }}>👤 {o.discountBy || o.user}</span>
          <span style={{ color: "#e67e22" }}>{o.discountType === "fixed" ? "-" + o.discount.toFixed(2) + "€" : "-" + o.discount + "%"}</span>
          <span style={{ color: "#27ae60", fontWeight: 700 }}>{o.total.toFixed(2)}€</span>
        </div>
      ))}
    </div>
  );
}

const S = {
  root: { fontFamily: "'Georgia', serif", background: "#1a1a1a", color: "#f0ece4", minHeight: "100vh", display: "flex", flexDirection: "column" },

  // Overlay confirmed order
  orderOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center" },
  orderOverlayCard: { background: "#1e1e1e", border: "3px solid #D4A843", borderRadius: 20, padding: "40px 60px", textAlign: "center", display: "flex", flexDirection: "column", gap: 12 },
  orderOverlayNum: { fontSize: 72, fontWeight: 700, color: "#D4A843", lineHeight: 1 },
  orderOverlayType: { fontSize: 18, color: "#999" },
  orderOverlayMsg: { fontSize: 16, color: "#27ae60", fontWeight: 700 },

  notification: { position: "fixed", top: 16, right: 16, zIndex: 9999, padding: "12px 24px", borderRadius: 8, color: "#fff", fontWeight: 700, fontSize: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" },

  header: { background: "#111", borderBottom: "2px solid #D4A843", padding: "0 20px", height: 60, display: "flex", alignItems: "center", gap: 24, flexShrink: 0, position: "sticky", top: 0, zIndex: 100 },
  headerLeft: { display: "flex", alignItems: "baseline", gap: 10 },
  logo: { fontSize: 20, fontWeight: 700, color: "#D4A843", letterSpacing: 2 },
  headerSub: { fontSize: 11, color: "#666", letterSpacing: 1, textTransform: "uppercase" },
  nav: { display: "flex", gap: 4, flex: 1 },
  navBtn: { background: "transparent", border: "none", color: "#999", padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontFamily: "inherit", transition: "all 0.15s", position: "relative" },
  navBtnActive: { background: "#D4A843", color: "#111", fontWeight: 700 },
  badge: { position: "absolute", top: -4, right: -4, background: "#e74c3c", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" },
  userSelect: { background: "#222", color: "#D4A843", border: "1px solid #333", borderRadius: 6, padding: "6px 10px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" },
  main: { flex: 1, overflow: "auto", padding: "20px" },

  // POS
  posLayout: { display: "grid", gridTemplateColumns: "1fr 360px", gap: 20, height: "calc(100vh - 100px)" },
  posLeft: { display: "flex", flexDirection: "column", gap: 12 },
  catTabs: { display: "flex", gap: 8, flexWrap: "wrap" },
  catTab: { background: "#2a2a2a", border: "1px solid #333", color: "#ccc", padding: "8px 18px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontFamily: "inherit" },
  catTabActive: { background: "#D4A843", border: "1px solid #D4A843", color: "#111", fontWeight: 700 },
  itemsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10, overflowY: "auto" },
  itemCard: { background: "#242424", border: "1px solid #333", borderRadius: 10, padding: "14px 12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, transition: "all 0.15s", position: "relative", fontFamily: "inherit" },
  itemCardOut: { opacity: 0.4, cursor: "not-allowed" },
  itemEmoji: { fontSize: 28 },
  itemName: { fontSize: 12, color: "#ddd", textAlign: "center", lineHeight: 1.3 },
  itemPrice: { fontSize: 15, fontWeight: 700, color: "#D4A843" },
  lowStockTag: { fontSize: 10, color: "#e67e22", background: "#2a1f0a", borderRadius: 4, padding: "2px 6px" },
  outTag: { fontSize: 10, color: "#e74c3c", background: "#2a0a0a", borderRadius: 4, padding: "2px 6px", fontWeight: 700 },
  formuleBadge: { fontSize: 9, background: "#D4A843", color: "#111", borderRadius: 3, padding: "1px 5px", marginLeft: 5, fontWeight: 700 },

  // Cart
  posRight: { background: "#1e1e1e", border: "1px solid #333", borderRadius: 12, display: "flex", flexDirection: "column" },
  cartHeader: { padding: "16px", borderBottom: "1px solid #333" },
  cartTitle: { fontSize: 16, fontWeight: 700, color: "#D4A843", display: "block", marginBottom: 10 },
  orderTypeBtns: { display: "flex", gap: 8 },
  orderTypeBtn: { flex: 1, background: "#2a2a2a", border: "1px solid #333", color: "#999", padding: "7px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: "inherit" },
  orderTypeBtnActive: { background: "#2c2208", border: "1px solid #D4A843", color: "#D4A843", fontWeight: 700 },
  cartItems: { flex: 1, overflowY: "auto", padding: "10px 14px" },
  cartEmpty: { color: "#555", fontSize: 13, textAlign: "center", marginTop: 40 },
  cartLineWrap: { borderBottom: "1px solid #2a2a2a", paddingBottom: 6, marginBottom: 6 },
  cartLine: { display: "flex", alignItems: "center", gap: 7, paddingTop: 6 },
  cartLineEmoji: { fontSize: 18, flexShrink: 0 },
  cartLineName: { flex: 1, fontSize: 12, color: "#ddd" },
  cartQtyCtrl: { display: "flex", alignItems: "center", gap: 5 },
  qtyBtn: { background: "#333", border: "none", color: "#D4A843", width: 24, height: 24, borderRadius: 5, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" },
  qtyNum: { minWidth: 18, textAlign: "center", fontSize: 14, fontWeight: 700 },
  cartLinePrice: { fontSize: 13, fontWeight: 700, color: "#D4A843", minWidth: 46, textAlign: "right" },
  noteToggle: { background: "transparent", border: "none", cursor: "pointer", fontSize: 14, opacity: 0.6, padding: "0 2px", fontFamily: "inherit" },
  cartRemove: { background: "transparent", border: "none", color: "#555", cursor: "pointer", fontSize: 13, padding: "0 2px", fontFamily: "inherit" },
  noteInput: { width: "100%", background: "#1a2a1a", border: "1px solid #3a6a3a", color: "#cfc", borderRadius: 6, padding: "6px 10px", fontSize: 12, fontFamily: "inherit", marginTop: 4, boxSizing: "border-box" },
  notePill: { fontSize: 11, color: "#9c9", background: "#1a2a1a", borderRadius: 5, padding: "3px 8px", marginTop: 3, display: "inline-block" },
  cartFooter: { padding: "14px", borderTop: "1px solid #333" },
  cartTotal: { display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "center" },
  cartTotalAmount: { fontSize: 24, fontWeight: 700, color: "#D4A843" },
  validateBtn: { width: "100%", background: "#D4A843", color: "#111", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 8, letterSpacing: 1 },
  validateBtnDisabled: { opacity: 0.4, cursor: "not-allowed" },
  clearBtn: { width: "100%", background: "transparent", color: "#666", border: "1px solid #333", borderRadius: 8, padding: "8px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" },

  // Kitchen
  kitchenLayout: { display: "flex", flexDirection: "column", gap: 24 },
  kitchenGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14, marginTop: 12 },
  kitchenCard: { background: "#1e1e1e", border: "1px solid #333", borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", gap: 8 },
  kitchenCardLate: { background: "#221a0a", border: "1px solid #e67e22" },
  kitchenCardUrgent: { background: "#2a0a0a", border: "1px solid #e74c3c" },
  kitchenCardHeader: { display: "flex", alignItems: "center", gap: 10 },
  kitchenOrderId: { fontSize: 18, fontWeight: 700, color: "#D4A843" },
  kitchenStatus: { fontSize: 12, fontWeight: 700, flex: 1 },
  kitchenType: { fontSize: 11, background: "#2a2a2a", padding: "3px 8px", borderRadius: 20, color: "#999" },
  kitchenTimer: { fontSize: 13, fontWeight: 700, fontFamily: "monospace" },
  kitchenCardTime: { fontSize: 12, color: "#666" },
  kitchenItems: { display: "flex", flexDirection: "column", gap: 8 },
  kitchenItem: { display: "flex", justifyContent: "space-between", fontSize: 13, color: "#ccc", alignItems: "flex-start" },
  kitchenNote: { fontSize: 11, color: "#9c9", background: "#1a2a1a", borderRadius: 4, padding: "2px 6px" },
  kitchenItemQty: { fontWeight: 700, color: "#D4A843", flexShrink: 0 },
  kitchenActions: { display: "flex", gap: 8, marginTop: 4 },
  statusBtn: { flex: 1, border: "none", color: "#fff", padding: "8px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" },
  kitchenDoneLine: { display: "flex", gap: 20, padding: "10px 0", borderBottom: "1px solid #2a2a2a", fontSize: 13, alignItems: "center" },

  // Stock
  stockLayout: { display: "flex", flexDirection: "column", gap: 16 },
  alertBanner: { background: "#2a1f0a", border: "1px solid #e67e22", borderRadius: 8, padding: "12px 16px", color: "#e67e22", fontSize: 13 },
  stockHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 },
  filterTabs: { display: "flex", gap: 6, flexWrap: "wrap" },
  filterTab: { background: "#2a2a2a", border: "1px solid #333", color: "#999", padding: "5px 12px", borderRadius: 16, cursor: "pointer", fontSize: 12, fontFamily: "inherit" },
  filterTabActive: { background: "#D4A843", border: "1px solid #D4A843", color: "#111", fontWeight: 700 },
  stockTable: { display: "flex", flexDirection: "column", gap: 2 },
  stockTableHead: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 80px 160px", padding: "8px 14px", fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, background: "#111", borderRadius: 8, gap: 8 },
  stockRow: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 80px 160px", padding: "12px 14px", background: "#1e1e1e", borderRadius: 8, alignItems: "center", fontSize: 13, gap: 8, border: "1px solid #2a2a2a" },
  stockRowLow: { background: "#221a0a", border: "1px solid #e67e22" },
  stockRowOut: { background: "#220a0a", border: "1px solid #e74c3c" },
  stockStatus: { color: "#fff", fontWeight: 700, fontSize: 11, padding: "3px 8px", borderRadius: 20, textAlign: "center" },
  restockCtrl: { display: "flex", gap: 6 },
  restockInput: { background: "#2a2a2a", border: "1px solid #444", color: "#fff", borderRadius: 6, padding: "5px 8px", width: 60, fontSize: 13, fontFamily: "inherit" },
  restockBtn: { background: "#D4A843", color: "#111", border: "none", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" },

  // Dashboard
  dashLayout: { display: "flex", flexDirection: "column", gap: 20 },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 },
  kpiCard: { background: "#1e1e1e", border: "1px solid #333", borderRadius: 12, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 8 },
  kpiCardWarn: { border: "1px solid #e67e22", background: "#221a0a" },
  kpiLabel: { fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: 1 },
  kpiValue: { fontSize: 32, fontWeight: 700, color: "#D4A843" },
  dashRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  dashCard: { background: "#1e1e1e", border: "1px solid #333", borderRadius: 12, padding: "18px 20px" },
  dashCardTitle: { fontSize: 14, fontWeight: 700, color: "#D4A843", margin: "0 0 14px 0" },
  bestSellerRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 },
  bestSellerRank: { width: 22, height: 22, background: "#D4A843", color: "#111", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 },
  bestSellerName: { flex: 1, fontSize: 13, color: "#ccc" },
  bestSellerBar: { width: 80, height: 6, background: "#2a2a2a", borderRadius: 3, overflow: "hidden" },
  bestSellerFill: { height: "100%", background: "#D4A843", borderRadius: 3 },
  bestSellerQty: { fontSize: 12, color: "#888", minWidth: 60, textAlign: "right" },
  recentOrderRow: { display: "flex", alignItems: "center", gap: 14, padding: "8px 0", borderBottom: "1px solid #2a2a2a", fontSize: 13 },
  statusSummary: { display: "flex", gap: 30 },
  statusSummaryItem: { display: "flex", flexDirection: "column", gap: 4, alignItems: "center" },
  statusSummaryCount: { fontSize: 36, fontWeight: 700, color: "#D4A843" },
  statusSummaryLabel: { fontSize: 12, color: "#888" },

  // Settings
  settingsLayout: { display: "flex", flexDirection: "column", gap: 16 },
  settingsHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 },
  tabSwitchBtn: { background: "#2a2a2a", border: "1px solid #333", color: "#999", padding: "7px 18px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontFamily: "inherit" },
  tabSwitchActive: { background: "#333", border: "1px solid #D4A843", color: "#D4A843", fontWeight: 700 },
  addItemBtn: { background: "#D4A843", color: "#111", border: "none", borderRadius: 8, padding: "9px 18px", cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "inherit" },
  addForm: { background: "#1e1e1e", border: "1px solid #D4A843", borderRadius: 10, padding: "18px 20px" },
  addFormTitle: { fontSize: 14, fontWeight: 700, color: "#D4A843", margin: "0 0 14px 0" },
  addFormGrid: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 },
  formField: { display: "flex", flexDirection: "column", gap: 5, flex: 1, minWidth: 120 },
  formLabel: { fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 },
  formInput: { background: "#2a2a2a", border: "1px solid #444", color: "#f0ece4", borderRadius: 6, padding: "7px 10px", fontSize: 13, fontFamily: "inherit" },
  saveNewBtn: { background: "#27ae60", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "inherit" },
  settingsTable: { display: "flex", flexDirection: "column", gap: 3 },
  settingsTableHead: { display: "grid", gridTemplateColumns: "2fr 1fr 0.8fr 0.8fr 100px 180px", padding: "8px 14px", fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, background: "#111", borderRadius: 8, gap: 8 },
  settingsRow: { display: "grid", gridTemplateColumns: "2fr 1fr 0.8fr 0.8fr 100px 180px", padding: "11px 14px", background: "#1e1e1e", borderRadius: 8, alignItems: "center", fontSize: 13, gap: 8, border: "1px solid #2a2a2a" },
  settingsRowInactive: { background: "#181818", border: "1px solid #222" },
  editRowMain: { display: "flex", gap: 8, alignItems: "center", gridColumn: "1 / -1" },
  editInput: { background: "#2a2a2a", border: "1px solid #D4A843", color: "#f0ece4", borderRadius: 6, padding: "6px 8px", fontSize: 13, fontFamily: "inherit", flex: 1 },
  editActions: { display: "flex", gap: 6 },
  toggleBtn: { borderRadius: 20, padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit" },
  rowActions: { display: "flex", gap: 6 },
  actionBtn: { border: "none", color: "#fff", padding: "6px 10px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit" },
  formulesGrid: { display: "flex", flexDirection: "column", gap: 8 },
  formuleCard: { background: "#1e1e1e", border: "1px solid #D4A843", borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 },
  settingsNote: { background: "#1a1a2a", border: "1px solid #334", borderRadius: 8, padding: "12px 16px", color: "#888", fontSize: 12 },

  sectionTitle: { fontSize: 16, fontWeight: 700, color: "#f0ece4", margin: "0 0 4px 0" },
  emptyState: { color: "#555", fontSize: 13, padding: "20px 0" },
  // Variants
  variantTag: { fontSize: 10, color: "#888", background: "#2a2a2a", borderRadius: 4, padding: "2px 6px" },
  variantOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" },
  variantModal: { background: "#1e1e1e", border: "1px solid #D4A843", borderRadius: 14, padding: 20, width: "100%", maxWidth: 340 },
  variantModalHeader: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 },
  variantList: { display: "flex", flexDirection: "column", gap: 6 },
  variantBtn: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#2a2a2a", border: "1px solid #333", borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontSize: 13, color: "#f0ece4", fontFamily: "inherit", transition: "all 0.1s" },

  // Fake console
  fakeConsoleLayout: { display: "flex", flexDirection: "column", gap: 16 },
  fakeTerminal: { background: "#0a0a0a", border: "1px solid #333", borderRadius: 10, overflow: "hidden" },
  fakeTerminalBar: { background: "#1a1a1a", padding: "8px 14px", display: "flex", alignItems: "center", borderBottom: "1px solid #222" },
  fakeTerminalBody: { padding: "14px 16px", minHeight: 120 },
  fakeModuleGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 },
  fakeModuleCard: { background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "14px 16px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 6, textAlign: "left", fontFamily: "inherit" },
  fakeModuleCardHighlight: { border: "1px solid #444" },
  fakeModuleCardActive: { background: "#111", border: "1px solid #D4A843" },
  fakeParamBox: { background: "#0a0a0a", border: "1px solid #222", borderRadius: 8, padding: "14px 16px" },

  // Discount
  discountRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 6 },
  discountBtn: { background: "#2a2a2a", border: "1px solid #333", color: "#999", padding: "4px 8px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontFamily: "inherit" },
  discountBtnActive: { background: "#1a2a1a", border: "1px solid #27ae60", color: "#27ae60", fontWeight: 700 },

  // Sysconfig
  sysconfigLock: { minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" },
  sysconfigLockCard: { background: "#111", border: "1px solid #333", borderRadius: 16, padding: "36px 40px", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 380, width: "100%" },
  sysconfigLayout: { display: "flex", flexDirection: "column", gap: 18 },

  // Login
  loginRoot: { minHeight: "100vh", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  loginCard: { background: "#1e1e1e", border: "1px solid #D4A843", borderRadius: 16, padding: "40px 36px", width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: 22 },
  loginLogo: { fontSize: 26, fontWeight: 700, color: "#D4A843", letterSpacing: 2, textAlign: "center" },
  loginSub: { fontSize: 13, color: "#888", textAlign: "center", marginTop: -12 },
  loginSection: { display: "flex", flexDirection: "column", gap: 10 },
  loginInput: { background: "#2a2a2a", border: "2px solid #D4A843", color: "#f0ece4", borderRadius: 8, padding: "12px 14px", fontSize: 16, fontFamily: "inherit", outline: "none" },
  quickNames: { display: "flex", gap: 6, flexWrap: "wrap" },
  quickNameBtn: { background: "#2a2a2a", border: "1px solid #333", color: "#999", padding: "5px 12px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontFamily: "inherit" },
  quickNameBtnActive: { background: "#2c2208", border: "1px solid #D4A843", color: "#D4A843", fontWeight: 700 },
  roleBtns: { display: "flex", gap: 8 },
  roleBtn: { flex: 1, background: "#2a2a2a", border: "1px solid #333", color: "#999", padding: "10px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: "inherit", textAlign: "center" },
  roleBtnActive: { background: "#2c2208", border: "1px solid #D4A843", color: "#D4A843", fontWeight: 700 },
  logoutBtn: { background: "#2a2a2a", border: "1px solid #444", color: "#999", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontFamily: "inherit" },

  // Order mode (replaces orderType)
  orderModeBtns: { display: "flex", gap: 4, flexWrap: "wrap" },
  orderModeBtn: { flex: 1, background: "#2a2a2a", border: "1px solid #333", color: "#999", padding: "6px 4px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontFamily: "inherit", textAlign: "center", minWidth: 60 },
  orderModeBtnActive: { background: "#2c2208", border: "1px solid #D4A843", color: "#D4A843", fontWeight: 700 },
  tableBtn: { background: "#2a2a2a", border: "1px solid #333", color: "#999", width: 28, height: 28, borderRadius: 6, cursor: "pointer", fontSize: 12, fontFamily: "inherit" },
  tableBtnActive: { background: "#0a1a2a", border: "1px solid #3b82f6", color: "#3b82f6", fontWeight: 700 },
  tableInput: { background: "#2a2a2a", border: "1px solid #444", color: "#fff", borderRadius: 6, padding: "4px 8px", width: 55, fontSize: 12, fontFamily: "inherit" },
  deliveryInput: { background: "#1a0a2a", border: "1px solid #7c3aed", color: "#f0ece4", borderRadius: 6, padding: "7px 10px", fontSize: 12, fontFamily: "inherit" },

};
