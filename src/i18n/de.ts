import type { Dictionary } from './en';

export const de: Dictionary = {
  common: {
    appName: 'BuyLater',
    tagline: 'Simulator für virtuelle Käufe',
    simulation: 'Simulation',
    loading: 'Lädt…',
    optional: '(optional)',
  },
  nav: {
    home: 'Start',
    products: 'Produkte',
    cart: 'Warenkorb',
    orders: 'Bestellungen',
    stats: 'Statistik',
  },
  lang: {
    label: 'Sprache',
  },
  footer: {
    tagline: 'BuyLater — ein Simulator für virtuelle Käufe.',
    disclaimer:
      'Dies ist kein echter Shop. Es finden keine echten Käufe, Zahlungen oder Lieferungen statt. Die Sendungsverfolgung ist eine Simulation, die dir hilft, Impulskäufe hinauszuzögern.',
    howItWorks: 'So funktioniert es',
    privacy: 'Datenschutz',
    terms: 'AGB & Haftungsausschluss',
    settings: 'Einstellungen',
    skip: 'Zum Inhalt springen',
  },
  categories: {
    Tech: 'Technik',
    Fashion: 'Mode',
    Home: 'Zuhause',
    Fitness: 'Fitness',
    Beauty: 'Beauty',
    Gaming: 'Gaming',
  },
  vibes: {
    home_vibe: 'Zuhause-Vibe',
    office_vibe: 'Büro-Vibe',
    secret_base: 'Geheimbasis',
    moon_station: 'Mondstation',
    doesnt_matter: 'Egal',
  },
  status: {
    confirmed: 'Bestätigt',
    packed: 'Verpackt',
    handed_to_virtual_courier: 'An virtuellen Kurier übergeben',
    in_transit: 'Unterwegs',
    virtually_delivered: 'Virtuell geliefert',
    review_pending: 'Bedenkzeit-Prüfung ausstehend',
  },
  landing: {
    heroTitle: 'Halte Impulskäufe an, bevor sie passieren.',
    heroText:
      'Mit BuyLater simulierst du den Bestell- und Liefervorgang, ohne Geld auszugeben. Füge etwas hinzu, das du willst, kaufe es virtuell, warte und entscheide später, ob du es noch brauchst.',
    ctaStart: 'Virtuelles Shopping starten',
    ctaHow: 'So funktioniert es',
    howHeading: 'So funktioniert es',
    step: 'Schritt {n}',
    whyHeading: 'Warum es das gibt',
    whyP1: 'Beim Kaufen geht es oft gar nicht um das Produkt — sondern um ein Gefühl. Stress, Langeweile, ein Funke Aufregung, ein cleveres „nur für kurze Zeit“-Banner. Der Drang schnellt hoch, und ein paar Klicks später ist das Geld weg.',
    whyP2: 'Die Lösung ist keine Schuld. Es ist ein bisschen Zeit. Wenn man einem Drang eine Bedenkzeit gibt — auch nur ein paar Minuten oder Tage — verfliegt das Gefühl, und du kannst in Ruhe fragen, ob du das Ding wirklich willst.',
    whyP3: 'BuyLater gibt dir das befriedigende Ritual des „Kaufens“ — den Checkout, die Bestellbestätigung, die Sendungsverfolgung — ohne die Kosten. Dann stupst es dich an, später mit klarem Kopf zu entscheiden, und zeigt dir, was du behalten hast.',
    transTitle: 'Dies ist kein echter Shop',
    transPre:
      'Es finden keine echten Käufe, Zahlungen oder Lieferungen statt. BuyLater ist ein Simulator für virtuelle Käufe und ein Werkzeug für die Bedenkzeit bei Impulskäufen. Siehe unsere ',
    transTerms: 'AGB & Haftungsausschluss',
    transAnd: ' und ',
    transPrivacy: 'Datenschutz',
    transPost: '-Seiten.',
  },
  steps: {
    s1Title: 'Füge ein Produkt hinzu, das du willst',
    s1Desc:
      'Wähle aus Demo-Artikeln oder füge eigene hinzu — genau das, was du gerade kaufen möchtest.',
    s2Title: 'Kaufe es virtuell',
    s2Desc:
      'Durchlaufe einen simulierten Checkout. Keine Zahlung, keine Kartendaten, keine echte Bestellung — nur der schöne Teil.',
    s3Title: 'Verfolge die simulierte Lieferung',
    s3Desc:
      'Sieh dir eine verspielte, klar als Simulation gekennzeichnete Lieferzeitleiste an, während der Impuls abkühlt.',
    s4Title: 'Entscheide später, ob du es noch willst',
    s4Desc:
      'Nach einer Bedenkzeit stellen wir die ehrliche Frage: Brauchst du das noch?',
    s5Title: 'Sieh, wie viel Geld du gespart hast',
    s5Desc:
      'Jeder ausgelassene Kauf summiert sich. Lass dein „gespartes Geld“ wachsen statt deiner Ausgaben.',
  },
  how: {
    title: 'So funktioniert es',
    subtitle: 'Ein simuliertes Kaufritual, das einen Impuls vorübergehen lässt.',
    reminderTitle: 'Erinnerung: Nichts hier ist echt',
    reminderBody:
      'Es wird keine Zahlung abgebucht, keine Bestellung aufgegeben und kein Artikel versandt. Die Sendungsverfolgung ist eine Simulation, die dir Zeit verschafft.',
    cta: 'Virtuelles Shopping starten',
  },
  catalog: {
    title: 'Stöbern & simulieren',
    subtitle:
      'Wähle etwas, das dich reizt — und kaufe es virtuell, statt es wirklich zu kaufen.',
    addOwn: '+ Eigenen Artikel hinzufügen',
    transparency:
      'Dies sind Demo-Produkte, nur zur Simulation — geladen aus einem öffentlichen Mock-Katalog (DummyJSON). Nichts hier steht zum Verkauf und keine Marke ist mit BuyLater verbunden.',
    fallbackTitle: 'Offline-Beispiel wird angezeigt',
    fallbackBody:
      'Wir konnten den Live-Demo-Katalog nicht erreichen, daher wird ein kleines integriertes Beispiel angezeigt. Alles funktioniert weiterhin als Simulation.',
    searchLabel: 'Nach Titel suchen',
    searchPlaceholder: 'z. B. Kopfhörer',
    categoryLabel: 'Kategorie',
    allCategories: 'Alle Kategorien',
    sortLabel: 'Nach Preis sortieren',
    sortFeatured: 'Empfohlen',
    sortAsc: 'Preis: aufsteigend',
    sortDesc: 'Preis: absteigend',
    emptyTitle: 'Keine passenden Artikel',
    emptyDesc:
      'Probiere eine andere Suche oder Kategorie — oder füge einen eigenen Artikel zum Simulieren hinzu.',
    emptyCta: 'Eigenen Artikel hinzufügen',
  },
  product: {
    addToCart: 'In den Warenkorb',
    virtualBuy: 'Jetzt virtuell kaufen',
    yourItem: 'Dein Artikel',
  },
  addItem: {
    title: 'Eigenen Artikel hinzufügen',
    subtitle:
      'Gib das Ding ein, das du kaufen möchtest. Wir simulieren den Kauf, damit du abkühlen kannst.',
    manualTitle: 'Nur manuelle Eingabe',
    manualBody:
      'Wir rufen oder scrapen noch keine Shops ab. Füge das Produkt vorerst manuell hinzu.',
    name: 'Produktname',
    priceEur: 'Preis (EUR)',
    category: 'Kategorie',
    store: 'Shop-Name',
    productUrl: 'Produkt-URL',
    imageUrl: 'Bild-URL',
    errName: 'Produktname ist erforderlich.',
    errPriceReq: 'Preis ist erforderlich.',
    errPriceGt0: 'Der Preis muss größer als 0 sein.',
    errUrl: 'Gib eine gültige http(s)-URL ein oder lass das Feld leer.',
    saveCatalog: 'Im Katalog speichern',
    saveAndCart: 'Speichern & in den Warenkorb',
  },
  cart: {
    title: 'Dein Warenkorb',
    subtitle: 'Prüfe deine Artikel vor einem virtuellen Checkout.',
    emptyTitle: 'Dein Warenkorb ist leer',
    emptyDesc:
      'Füge etwas hinzu, das dich reizt, und durchlaufe damit einen virtuellen Kauf.',
    emptyCta: 'Virtuelles Shopping starten',
    total: 'Summe',
    transTitle: 'Dies ist eine virtuelle Bestellung',
    transBody:
      'Es wird keine Zahlung abgebucht. Es wird kein echtes Produkt versandt. Dieser Schritt simuliert einen Checkout, damit du innehalten und überdenken kannst.',
    checkout: 'Virtueller Checkout',
    keepBrowsing: 'Weiter stöbern',
    remove: 'Entfernen',
    decrease: 'Menge von {name} verringern',
    increase: 'Menge von {name} erhöhen',
    quantity: 'Menge: {n}',
  },
  checkout: {
    title: 'Virtueller Checkout',
    subtitle: 'Keine echte Zahlung, Adresse oder Kartendaten — niemals.',
    vibeLegend: 'Wohin sollen wir es virtuell liefern?',
    vibeHelp:
      'Wähle einen Vibe — wir speichern nur diese verspielte Auswahl, nie eine echte Adresse.',
    demoMode: 'Demo-Modus',
    demoModeDesc:
      'Beschleunigt die simulierte Lieferung (Sekunden statt Stunden) und verkürzt die Bedenkzeit auf 5 Minuten — praktisch zum Ausprobieren.',
    orderTotal: 'Bestellsumme (virtuell)',
    transTitle: 'Dies ist eine virtuelle Bestellung',
    transBody:
      'Es wird keine Zahlung abgebucht. Es wird kein echtes Produkt versandt. Wir simulieren Checkout und Lieferung, damit du einen Impulskauf hinauszögern kannst.',
    confirm: 'Virtuelle Bestellung bestätigen',
  },
  orders: {
    title: 'Virtuelle Bestellungen',
    subtitle:
      'Verfolge die simulierte Lieferung und entscheide später, ob du jeden Artikel noch willst.',
    emptyTitle: 'Noch keine virtuellen Bestellungen',
    emptyDesc:
      'Durchlaufe einen virtuellen Checkout, und deine simulierten Bestellungen erscheinen hier — mit einer Bedenkzeit, bevor du entscheidest.',
    emptyCta: 'Virtuelles Shopping starten',
    reviewIn: 'Prüfung {time}',
    avoidedSaved: 'Vermieden — gespart',
    stillWanted: 'Trotzdem gewollt',
    maybeLater: 'Vielleicht später',
    deliveryVibe: 'Liefer-Vibe',
  },
  orderDetail: {
    allOrders: '← Alle Bestellungen',
    placed: 'Aufgegeben {date}',
    transTitle: 'Die Sendungsverfolgung ist simuliert',
    transBody:
      'Die Sendungsverfolgung ist simuliert, um dir zu helfen, Impulskäufe hinauszuzögern. Es wird nichts physisch versandt, und es wurde keine Zahlung abgebucht.',
    maybeLaterMsg:
      'Kein Druck. Wir behalten diesen Artikel in deiner pausierten Liste und fragen später erneut — Prüfung {time}.',
    simulatedDelivery: 'Simulierte Lieferung',
    demoMode: 'Demo-Modus',
    summary: 'Übersicht',
    qty: 'Menge {n}',
    notFoundTitle: 'Bestellung nicht gefunden',
    notFoundDesc:
      'Sie wurde möglicherweise aus dem lokalen Speicher dieses Browsers gelöscht.',
    notFoundCardTitle: 'Wir konnten diese Bestellung nicht finden',
    back: 'Zurück zu den Bestellungen',
  },
  decision: {
    question: 'Willst du das noch?',
    questionSub: 'Jetzt, wo der Drang abgekühlt ist, triff eine ruhigere Entscheidung.',
    no: 'Nein, ich brauche es nicht',
    maybe: 'Vielleicht später',
    yes: 'Ja, ich will es noch',
    avoidedTitle: 'Du hast einen Impulskauf vermieden und {amount} gespart.',
    avoidedSub: 'Dieser Betrag wurde deiner Gesamtersparnis hinzugefügt.',
    stillWantedTitle: 'Notiert — du willst es noch.',
    stillWantedSub:
      'Nach einer echten Bedenkzeit ist das eine viel bewusstere Entscheidung.',
    openProduct: 'Originale Produktseite öffnen ↗',
    notSell:
      'BuyLater verkauft diesen Artikel nicht. Das Öffnen eines externen Links ist deine Entscheidung, und BuyLater ist nicht für Drittanbieter-Seiten verantwortlich.',
    coolingTitle: 'Bedenkzeit läuft',
    coolingBody:
      'Wir fragen, ob du es noch willst, sobald es virtuell geliefert wurde (und nach einer Bedenkzeit von {days} Tagen). Keine Eile — diese Pause ist der ganze Sinn.',
  },
  timeline: {
    current: 'Aktuell',
    pending: 'Ausstehend',
  },
  stats: {
    title: 'Deine Wirkung',
    subtitle: 'Wie sich deine Bedenkzeit-Gewohnheit summiert.',
    emptyTitle: 'Noch keine Statistik',
    emptyDesc:
      'Sobald du ein paar Käufe simulierst und Bedenkzeit-Entscheidungen triffst, siehst du hier, wie viel du gespart hast.',
    emptyCta: 'Virtuelles Shopping starten',
    moneySaved: 'Gespartes Geld',
    purchasesAvoided: 'Vermiedene Käufe',
    virtualOrders: 'Virtuelle Bestellungen',
    virtuallySpent: 'Virtuell ausgegeben',
    stillWanted: 'Trotzdem gewollt',
    maybeLater: 'Pausiert / vielleicht später',
    savedNotePre: '„Gespartes Geld“ zählt nur Bestellungen, bei denen du dich für ',
    savedNoteBold: '„Nein, ich brauche es nicht“',
    savedNotePost:
      ' entschieden hast. Es spiegelt virtuelle Preise wider, keine echten Transaktionen.',
    topCategories: 'Top-Kategorien nach vermiedenen Ausgaben',
    topEmpty: 'Vermeide einen Kauf, um diese Aufschlüsselung aufzubauen.',
    recent: 'Letzte Entscheidungen',
    pending: 'Ausstehend',
    avoided: 'Vermieden',
  },
  privacy: {
    title: 'Datenschutz',
    subtitle: 'Was wir speichern — und was wir bewusst nicht tun.',
    p1: 'BuyLater ist ein Simulator für virtuelle Käufe. Er ist darauf ausgelegt, so wenig wie möglich zu erfassen — kein Konto, kein Backend und keine Verfolgung deiner Identität.',
    whatStored: 'Was gespeichert wird',
    s1Pre: 'Alle deine Daten werden ',
    s1Bold: 'lokal in deinem Browser',
    s1Post: ' über localStorage gespeichert. Sie verlassen dein Gerät über diese App nie.',
    s2: 'Hinzugefügte Artikel, dein Warenkorb, deine virtuellen Bestellungen und deine Einstellungen.',
    s3: 'Eine verspielte „Liefer-Vibe“-Auswahl — nie eine echte Adresse.',
    neverTitle: 'Was nie erfasst wird',
    n1: 'Keine Karten- oder Zahlungsdaten — es wird nie eine Zahlung verarbeitet.',
    n2: 'Keine echte Lieferadresse.',
    n3: 'Keine Telefonnummer.',
    n4: 'Keine sensiblen personenbezogenen Daten und keine versteckte Datenerfassung.',
    analyticsTitle: 'Analyse',
    analyticsBody:
      'Das MVP bindet keine Drittanbieter-Analyse ein. Interne Ereignisse werden nur in der Entwicklung in die Browser-Konsole geschrieben, um uns beim Bauen des Produkts zu helfen.',
    clearTitle: 'Deine Daten löschen',
    clearPre:
      'Da alles in deinem Browser liegt, hast du immer die Kontrolle. Du kannst alle BuyLater-Daten jederzeit unter ',
    clearLink: 'Einstellungen',
    clearPost: ' löschen. Das Leeren deines Browser-Speichers entfernt sie ebenfalls.',
  },
  terms: {
    title: 'AGB & Haftungsausschluss',
    subtitle: 'Bitte lesen — dies ist kein Shop.',
    whatTitle: 'Was BuyLater ist',
    w1: 'BuyLater ist ein Simulator für virtuelles Shopping und ein Bedenkzeit-Werkzeug.',
    w2: 'Es ist kein echter Laden. Über diese App werden keine Waren verkauft.',
    w3: 'Es wird keine echte Zahlung verarbeitet und keine echte Lieferung durchgeführt.',
    w4: 'Die Sendungsverfolgung ist eine Simulation, die dir hilft, Impulskäufe hinauszuzögern.',
    prodTitle: 'Produktinformationen',
    p1: 'Demo-Produkte sind fiktiv und illustrativ. Produktinformationen stammen aus Demo- oder Nutzereingaben und sind möglicherweise nicht korrekt.',
    p2: 'Shop- und Markennamen in Demo-Inhalten sind Platzhalter und implizieren keine Verbindung oder Empfehlung.',
    linksTitle: 'Externe Links',
    l1: 'Wenn du einen von dir hinzugefügten externen Produktlink öffnest, tust du das auf eigenes Ermessen. Für Entscheidungen auf Drittanbieter-Seiten bist du selbst verantwortlich.',
    l2: 'BuyLater ist nicht für Inhalt, Preise oder Sicherheit externer Seiten verantwortlich.',
    warrantyTitle: 'Keine Gewährleistung',
    warrantyBody:
      'Dieses MVP wird „wie besehen“ bereitgestellt, ohne jegliche Gewährleistung. Die Zahl „gespartes Geld“ ist eine Schätzung auf Basis virtueller Preise, nur zur Motivation — sie stellt keine echte Finanzberatung und keine echte Transaktion dar.',
    affTitle: 'Künftige Affiliate-Offenlegung',
    affBody:
      'BuyLater verwendet derzeit keine Affiliate-Links. Falls künftig eine Affiliate-Monetarisierung über offizielle Programme hinzukommt, wird vor solchen Links ein Hinweis wie „Als Amazon-Partner verdienen wir an qualifizierten Käufen.“ angezeigt.',
  },
  settings: {
    title: 'Einstellungen',
    subtitle: 'Du hast die Kontrolle über deine lokalen Daten.',
    dataTitle: 'Deine Daten',
    dataBody:
      'Alles, was BuyLater weiß, wird nur in diesem Browser gespeichert. Beim Löschen werden deine eigenen Artikel, der Warenkorb, virtuelle Bestellungen und gespeicherte Statistiken entfernt. Das kann nicht rückgängig gemacht werden.',
    clearedTitle: 'Alles gelöscht',
    clearedBody: 'Deine BuyLater-Daten wurden aus diesem Browser entfernt.',
    clearBtn: 'Alle meine Daten löschen',
    confirmQuestion:
      'Bist du sicher? Dies entfernt dauerhaft alle lokalen BuyLater-Daten.',
    confirmYes: 'Ja, alles löschen',
    cancel: 'Abbrechen',
    langTitle: 'Sprache',
    langBody: 'Wähle die Sprache für die BuyLater-Oberfläche.',
  },
  notFound: {
    title: 'Seite nicht gefunden',
    cardTitle: 'Diese Seite existiert nicht',
    desc: 'Der Link ist möglicherweise defekt oder die Seite wurde verschoben.',
    back: 'Zurück zur Startseite',
  },
};
