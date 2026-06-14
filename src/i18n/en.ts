/**
 * English dictionary. This object defines the SHAPE of all translations:
 * `de` and `pt` are typed as `typeof en`, so a missing key is a compile error.
 *
 * Interpolation: use `{name}` placeholders, filled via t(key, { name }).
 */
export const en = {
  common: {
    appName: 'BuyLater',
    tagline: 'Virtual purchase simulator',
    simulation: 'Simulation',
    loading: 'Loading…',
    optional: '(optional)',
  },
  nav: {
    home: 'Home',
    products: 'Products',
    cart: 'Cart',
    orders: 'Orders',
    stats: 'Stats',
  },
  lang: {
    label: 'Language',
  },
  footer: {
    tagline: 'BuyLater — a virtual purchase simulator.',
    disclaimer:
      'This is not a real shop. No real purchases, payments, or deliveries happen. Delivery tracking is a simulation designed to help you delay impulse buying.',
    howItWorks: 'How it works',
    privacy: 'Privacy',
    terms: 'Terms & Disclaimer',
    settings: 'Settings',
    skip: 'Skip to content',
  },
  categories: {
    Tech: 'Tech',
    Fashion: 'Fashion',
    Home: 'Home',
    Fitness: 'Fitness',
    Beauty: 'Beauty',
    Gaming: 'Gaming',
  },
  vibes: {
    home_vibe: 'Home vibe',
    office_vibe: 'Office vibe',
    secret_base: 'Secret base',
    moon_station: 'Moon station',
    doesnt_matter: "Doesn't matter",
  },
  status: {
    confirmed: 'Confirmed',
    packed: 'Packed',
    handed_to_virtual_courier: 'Handed to virtual courier',
    in_transit: 'In transit',
    virtually_delivered: 'Virtually delivered',
    review_pending: 'Cooling-off review pending',
  },
  landing: {
    heroTitle: 'Pause impulse purchases before they happen.',
    heroText:
      'BuyLater lets you simulate the checkout and delivery experience without spending money. Add something you want, virtually buy it, wait, and decide later if you still need it.',
    ctaStart: 'Start virtual shopping',
    ctaHow: 'How it works',
    howHeading: 'How it works',
    step: 'Step {n}',
    whyHeading: 'Why this exists',
    whyP1: "A lot of buying isn't really about the product — it's about a feeling. Stress, boredom, a flash of excitement, a clever “limited time” banner. The urge spikes, and a few taps later the money's gone.",
    whyP2: "The fix isn't guilt. It's a little bit of time. Giving an urge a cooling-off period — even a few minutes or a few days — lets the feeling fade so you can ask calmly whether you actually want the thing.",
    whyP3: 'BuyLater gives you the satisfying ritual of “buying” — the checkout, the order confirmation, the delivery tracking — without the cost. Then it nudges you to decide later, with a clear head, and shows you what you kept in your pocket.',
    transTitle: 'This is not a real shop',
    transPre:
      'No real purchases, payments, or deliveries happen. BuyLater is a virtual purchase simulator and an impulse-purchase cooling-off tool. See our ',
    transTerms: 'Terms & Disclaimer',
    transAnd: ' and ',
    transPrivacy: 'Privacy',
    transPost: ' pages.',
  },
  steps: {
    s1Title: 'Add a product you want',
    s1Desc:
      'Pick from demo items or add your own — the exact thing you feel the urge to buy right now.',
    s2Title: 'Virtually buy it',
    s2Desc:
      'Run a simulated checkout. No payment, no card details, no real order — just the satisfying part.',
    s3Title: 'Track simulated delivery',
    s3Desc:
      'Watch a playful, clearly-simulated delivery timeline while the impulse cools down.',
    s4Title: 'Decide later if you still want it',
    s4Desc:
      'After a cooling-off period, we ask the honest question: do you still need this?',
    s5Title: 'See how much money you saved',
    s5Desc:
      'Every purchase you skip adds up. Watch your “money saved” grow instead of your spending.',
  },
  how: {
    title: 'How it works',
    subtitle: 'A simulated buying ritual that helps an impulse pass.',
    reminderTitle: 'Reminder: nothing here is real',
    reminderBody:
      'No payment is taken, no order is placed, and no item is shipped. The delivery tracking is a simulation designed to buy you time.',
    cta: 'Start virtual shopping',
  },
  catalog: {
    title: 'Browse & simulate',
    subtitle:
      "Pick something you're tempted by — then virtually buy it instead of really buying it.",
    addOwn: '+ Add your own item',
    transparency:
      'These are demo products for simulation only — loaded from a public mock catalog (DummyJSON). Nothing here is for sale and no brand is affiliated with BuyLater.',
    fallbackTitle: 'Showing an offline sample',
    fallbackBody:
      "We couldn't reach the live demo catalog, so a small built-in sample is shown instead. Everything still works as a simulation.",
    searchLabel: 'Search by title',
    searchPlaceholder: 'e.g. headphones',
    categoryLabel: 'Category',
    allCategories: 'All categories',
    sortLabel: 'Sort by price',
    sortFeatured: 'Featured',
    sortAsc: 'Price: low to high',
    sortDesc: 'Price: high to low',
    emptyTitle: 'No matching items',
    emptyDesc:
      'Try a different search or category — or add your own item to simulate.',
    emptyCta: 'Add your own item',
  },
  product: {
    addToCart: 'Add to cart',
    virtualBuy: 'Virtual buy now',
    yourItem: 'Your item',
    noRealMoney: 'No real money charged',
    popular: 'Popular',
    ratingAria: 'Rated {rating} out of 5',
    refPriceShort: 'ref.',
    refPriceTitle: 'Reference retail price — informational only, not a discount',
  },
  addItem: {
    title: 'Add your own item',
    subtitle:
      "Enter the thing you're tempted to buy. We'll simulate the purchase so you can cool off.",
    manualTitle: 'Manual entry only',
    manualBody: 'We do not fetch or scrape shops yet. Add the product manually for now.',
    name: 'Product name',
    priceEur: 'Price (EUR)',
    category: 'Category',
    store: 'Store name',
    productUrl: 'Product URL',
    imageUrl: 'Image URL',
    errName: 'Product name is required.',
    errPriceReq: 'Price is required.',
    errPriceGt0: 'Price must be greater than 0.',
    errUrl: 'Enter a valid http(s) URL or leave it empty.',
    saveCatalog: 'Save to catalog',
    saveAndCart: 'Save & add to cart',
  },
  cart: {
    title: 'Your cart',
    subtitle: 'Review your items before a virtual checkout.',
    emptyTitle: 'Your cart is empty',
    emptyDesc:
      "Add something you're tempted by and run it through a virtual purchase.",
    emptyCta: 'Start virtual shopping',
    total: 'Total',
    transTitle: 'This is a virtual order',
    transBody:
      'No payment will be taken. No real product will be shipped. This step simulates a checkout to help you pause and reconsider.',
    checkout: 'Virtual checkout',
    keepBrowsing: 'Keep browsing',
    remove: 'Remove',
    decrease: 'Decrease quantity of {name}',
    increase: 'Increase quantity of {name}',
    quantity: 'Quantity: {n}',
  },
  checkout: {
    title: 'Virtual checkout',
    subtitle: 'No real payment, address, or card details — ever.',
    vibeLegend: 'Where should we virtually deliver it?',
    vibeHelp:
      'Pick a vibe — we only store this playful choice, never a real address.',
    demoMode: 'Demo mode',
    demoModeDesc:
      'Speeds up the simulated delivery (seconds instead of hours) and shortens the cooling-off period to 5 minutes — handy for trying the flow.',
    orderTotal: 'Order total (virtual)',
    transTitle: 'This is a virtual order',
    transBody:
      "No payment will be taken. No real product will be shipped. We're simulating the checkout and delivery to help you delay an impulse purchase.",
    confirm: 'Confirm virtual order',
  },
  orders: {
    title: 'Virtual orders',
    subtitle: 'Track simulated delivery and decide later if you still want each item.',
    emptyTitle: 'No virtual orders yet',
    emptyDesc:
      'Run a virtual checkout and your simulated orders will appear here, with a cooling-off window before you decide.',
    emptyCta: 'Start virtual shopping',
    reviewIn: 'Review {time}',
    avoidedSaved: 'Avoided — saved',
    stillWanted: 'Still wanted',
    maybeLater: 'Maybe later',
    deliveryVibe: 'Delivery vibe',
  },
  orderDetail: {
    allOrders: '← All orders',
    placed: 'Placed {date}',
    transTitle: 'Delivery tracking is simulated',
    transBody:
      'Delivery tracking is simulated to help you delay impulse buying. Nothing is physically shipped, and no payment was taken.',
    maybeLaterMsg:
      "No pressure. We'll keep this item in your paused list and ask again later — review {time}.",
    simulatedDelivery: 'Simulated delivery',
    demoMode: 'Demo mode',
    summary: 'Summary',
    qty: 'Qty {n}',
    notFoundTitle: 'Order not found',
    notFoundDesc: "It may have been cleared from this browser's local storage.",
    notFoundCardTitle: "We couldn't find that order",
    back: 'Back to orders',
  },
  decision: {
    question: 'Do you still want this?',
    questionSub: 'Now that the urge has cooled, make a calmer call.',
    no: 'No, I do not need it',
    maybe: 'Maybe later',
    yes: 'Yes, I still want it',
    avoidedTitle: 'You avoided an impulse purchase and saved {amount}.',
    avoidedSub: 'That amount has been added to your total saved.',
    stillWantedTitle: 'Noted — you still want this.',
    stillWantedSub:
      "After a real cooling-off period, that's a much more deliberate decision.",
    openProduct: 'Open the original product page ↗',
    notSell:
      'BuyLater does not sell this item. Opening an external link is your decision and BuyLater is not responsible for third-party sites.',
    coolingTitle: 'Cooling-off in progress',
    coolingBody:
      "We'll ask whether you still want this once it's virtually delivered (and after a {days}-day cooling-off window). No rush — that pause is the whole point.",
  },
  timeline: {
    current: 'Current',
    pending: 'Pending',
  },
  stats: {
    title: 'Your impact',
    subtitle: 'How your cooling-off habit is adding up.',
    emptyTitle: 'No stats yet',
    emptyDesc:
      "Once you simulate a few purchases and make cooling-off decisions, you'll see how much you've saved here.",
    emptyCta: 'Start virtual shopping',
    moneySaved: 'Money saved',
    purchasesAvoided: 'Purchases avoided',
    virtualOrders: 'Virtual orders',
    virtuallySpent: 'Virtually spent',
    stillWanted: 'Still wanted',
    maybeLater: 'Paused / maybe later',
    savedNotePre: '“Money saved” counts only orders where you decided ',
    savedNoteBold: '“No, I do not need it”',
    savedNotePost: '. It reflects virtual prices, not real transactions.',
    topCategories: 'Top categories by avoided spending',
    topEmpty: 'Avoid a purchase to start building this breakdown.',
    recent: 'Recent decisions',
    pending: 'Pending',
    avoided: 'Avoided',
  },
  privacy: {
    title: 'Privacy',
    subtitle: "What we store, and what we deliberately don't.",
    p1: 'BuyLater is a virtual purchase simulator. It is designed to collect as little as possible — there is no account, no backend, and no tracking of your identity.',
    whatStored: 'What is stored',
    s1Pre: 'All of your data is stored ',
    s1Bold: 'locally in your browser',
    s1Post: ' using localStorage. It never leaves your device through this app.',
    s2: 'Items you add, your cart, your virtual orders, and your settings.',
    s3: 'A playful “delivery vibe” choice — never a real address.',
    neverTitle: 'What is never collected',
    n1: 'No card or payment details — no payment is ever processed.',
    n2: 'No real delivery address.',
    n3: 'No phone number.',
    n4: 'No sensitive personal data, and no hidden data collection.',
    analyticsTitle: 'Analytics',
    analyticsBody:
      'The MVP integrates no third-party analytics. Internal events are logged only to the browser console in development to help us build the product.',
    clearTitle: 'Clearing your data',
    clearPre:
      'Because everything lives in your browser, you are always in control. You can wipe all BuyLater data at any time from ',
    clearLink: 'Settings',
    clearPost: '. Clearing your browser storage also removes it.',
  },
  terms: {
    title: 'Terms & Disclaimer',
    subtitle: 'Please read — this is not a shop.',
    whatTitle: 'What BuyLater is',
    w1: 'BuyLater is a virtual shopping simulator and a cooling-off tool.',
    w2: 'It is not a real store. No goods are sold by this app.',
    w3: 'No real payment is processed and no real delivery is performed.',
    w4: 'Delivery tracking is a simulation to help you delay impulse buying.',
    prodTitle: 'Product information',
    p1: 'Demo products are fictional and illustrative. Product information is demo or user-provided and may not be accurate.',
    p2: 'Store and brand names in demo content are placeholders and do not imply any affiliation or endorsement.',
    linksTitle: 'External links',
    l1: 'If you choose to open an external product link you added, you do so at your own discretion. You are responsible for decisions made on third-party sites.',
    l2: 'BuyLater is not responsible for the content, pricing, or safety of external sites.',
    warrantyTitle: 'No warranty',
    warrantyBody:
      'This MVP is provided “as is”, without warranties of any kind. The “money saved” figure is an estimate based on virtual prices, for motivation only — it does not represent real financial advice or a real transaction.',
    affTitle: 'Future affiliate disclosure',
    affBody:
      'BuyLater does not currently use affiliate links. If affiliate monetization is added in the future via official programs, a disclosure such as “As an Amazon Associate, we earn from qualifying purchases.” will be shown before any such links.',
  },
  settings: {
    title: 'Settings',
    subtitle: "You're in control of your local data.",
    dataTitle: 'Your data',
    dataBody:
      'Everything BuyLater knows is stored only in this browser. Clearing it removes your custom items, cart, virtual orders, and saved stats. This cannot be undone.',
    clearedTitle: 'All clear',
    clearedBody: 'Your BuyLater data has been removed from this browser.',
    clearBtn: 'Clear all my data',
    confirmQuestion:
      'Are you sure? This permanently removes all local BuyLater data.',
    confirmYes: 'Yes, clear everything',
    cancel: 'Cancel',
    langTitle: 'Language',
    langBody: 'Choose the language for the BuyLater interface.',
  },
  notFound: {
    title: 'Page not found',
    cardTitle: "That page doesn't exist",
    desc: 'The link may be broken or the page may have moved.',
    back: 'Back to home',
  },
};

export type Dictionary = typeof en;
