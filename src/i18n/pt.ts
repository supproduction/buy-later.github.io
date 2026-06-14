import type { Dictionary } from './en';

export const pt: Dictionary = {
  common: {
    appName: 'BuyLater',
    tagline: 'Simulador de compras virtuais',
    simulation: 'Simulação',
    loading: 'A carregar…',
    optional: '(opcional)',
  },
  nav: {
    home: 'Início',
    products: 'Produtos',
    cart: 'Carrinho',
    orders: 'Pedidos',
    stats: 'Estatísticas',
  },
  lang: {
    label: 'Idioma',
  },
  footer: {
    tagline: 'BuyLater — um simulador de compras virtuais.',
    disclaimer:
      'Isto não é uma loja real. Não há compras, pagamentos ou entregas reais. O acompanhamento de entrega é uma simulação concebida para te ajudar a adiar compras por impulso.',
    howItWorks: 'Como funciona',
    privacy: 'Privacidade',
    terms: 'Termos & Aviso legal',
    settings: 'Definições',
    skip: 'Saltar para o conteúdo',
  },
  categories: {
    Tech: 'Tecnologia',
    Fashion: 'Moda',
    Home: 'Casa',
    Fitness: 'Fitness',
    Beauty: 'Beleza',
    Gaming: 'Jogos',
  },
  vibes: {
    home_vibe: 'Vibe de casa',
    office_vibe: 'Vibe de escritório',
    secret_base: 'Base secreta',
    moon_station: 'Estação lunar',
    doesnt_matter: 'Tanto faz',
  },
  status: {
    confirmed: 'Confirmado',
    packed: 'Embalado',
    handed_to_virtual_courier: 'Entregue ao estafeta virtual',
    in_transit: 'Em trânsito',
    virtually_delivered: 'Entregue virtualmente',
    review_pending: 'Revisão de período de reflexão pendente',
  },
  landing: {
    heroTitle: 'Trava as compras por impulso antes que aconteçam.',
    heroText:
      'O BuyLater permite-te simular a experiência de finalização e entrega sem gastar dinheiro. Adiciona algo que queres, compra virtualmente, espera e decide depois se ainda precisas.',
    ctaStart: 'Começar compras virtuais',
    ctaHow: 'Como funciona',
    howHeading: 'Como funciona',
    step: 'Passo {n}',
    whyHeading: 'Porque é que isto existe',
    whyP1: 'Muitas vezes comprar não é sobre o produto — é sobre um sentimento. Stress, tédio, um rasgo de entusiasmo, um banner esperto de “tempo limitado”. O impulso dispara e, uns toques depois, o dinheiro foi-se.',
    whyP2: 'A solução não é a culpa. É um pouco de tempo. Dar a um impulso um período de reflexão — mesmo uns minutos ou uns dias — deixa o sentimento passar para poderes perguntar com calma se realmente queres aquilo.',
    whyP3: 'O BuyLater dá-te o ritual satisfatório de “comprar” — a finalização, a confirmação do pedido, o acompanhamento da entrega — sem o custo. Depois incentiva-te a decidir mais tarde, de cabeça fria, e mostra-te o que poupaste.',
    transTitle: 'Isto não é uma loja real',
    transPre:
      'Não há compras, pagamentos ou entregas reais. O BuyLater é um simulador de compras virtuais e uma ferramenta de reflexão para compras por impulso. Consulta as nossas páginas de ',
    transTerms: 'Termos & Aviso legal',
    transAnd: ' e ',
    transPrivacy: 'Privacidade',
    transPost: '.',
  },
  steps: {
    s1Title: 'Adiciona um produto que queres',
    s1Desc:
      'Escolhe entre itens de demonstração ou adiciona os teus — exatamente aquilo que tens vontade de comprar agora.',
    s2Title: 'Compra-o virtualmente',
    s2Desc:
      'Faz uma finalização simulada. Sem pagamento, sem dados de cartão, sem pedido real — só a parte satisfatória.',
    s3Title: 'Acompanha a entrega simulada',
    s3Desc:
      'Vê uma linha do tempo de entrega divertida e claramente simulada enquanto o impulso arrefece.',
    s4Title: 'Decide depois se ainda o queres',
    s4Desc:
      'Após um período de reflexão, fazemos a pergunta honesta: ainda precisas disto?',
    s5Title: 'Vê quanto dinheiro poupaste',
    s5Desc:
      'Cada compra que evitas soma-se. Vê o teu “dinheiro poupado” crescer em vez dos teus gastos.',
  },
  how: {
    title: 'Como funciona',
    subtitle: 'Um ritual de compra simulado que ajuda um impulso a passar.',
    reminderTitle: 'Lembrete: nada aqui é real',
    reminderBody:
      'Não é cobrado nenhum pagamento, não é feito nenhum pedido e nenhum item é enviado. O acompanhamento de entrega é uma simulação concebida para te dar tempo.',
    cta: 'Começar compras virtuais',
  },
  catalog: {
    title: 'Explorar & simular',
    subtitle:
      'Escolhe algo que te tenta — e compra-o virtualmente em vez de o comprares a sério.',
    addOwn: '+ Adicionar o teu item',
    transparency:
      'Estes são produtos de demonstração, apenas para simulação — carregados de um catálogo público fictício (DummyJSON). Nada aqui está à venda e nenhuma marca está associada ao BuyLater.',
    fallbackTitle: 'A mostrar uma amostra offline',
    fallbackBody:
      'Não conseguimos chegar ao catálogo de demonstração ao vivo, por isso é mostrada uma pequena amostra integrada. Tudo continua a funcionar como simulação.',
    searchLabel: 'Pesquisar por título',
    searchPlaceholder: 'ex.: auscultadores',
    categoryLabel: 'Categoria',
    allCategories: 'Todas as categorias',
    sortLabel: 'Ordenar por preço',
    sortFeatured: 'Em destaque',
    sortAsc: 'Preço: crescente',
    sortDesc: 'Preço: decrescente',
    emptyTitle: 'Sem itens correspondentes',
    emptyDesc:
      'Tenta outra pesquisa ou categoria — ou adiciona o teu próprio item para simular.',
    emptyCta: 'Adicionar o teu item',
  },
  product: {
    addToCart: 'Adicionar ao carrinho',
    virtualBuy: 'Comprar virtualmente',
    yourItem: 'O teu item',
  },
  addItem: {
    title: 'Adicionar o teu item',
    subtitle:
      'Indica aquilo que tens vontade de comprar. Vamos simular a compra para poderes arrefecer.',
    manualTitle: 'Apenas entrada manual',
    manualBody:
      'Ainda não obtemos nem fazemos scraping de lojas. Por agora, adiciona o produto manualmente.',
    name: 'Nome do produto',
    priceEur: 'Preço (EUR)',
    category: 'Categoria',
    store: 'Nome da loja',
    productUrl: 'URL do produto',
    imageUrl: 'URL da imagem',
    errName: 'O nome do produto é obrigatório.',
    errPriceReq: 'O preço é obrigatório.',
    errPriceGt0: 'O preço tem de ser maior que 0.',
    errUrl: 'Indica um URL http(s) válido ou deixa em branco.',
    saveCatalog: 'Guardar no catálogo',
    saveAndCart: 'Guardar & adicionar ao carrinho',
  },
  cart: {
    title: 'O teu carrinho',
    subtitle: 'Revê os teus itens antes de uma finalização virtual.',
    emptyTitle: 'O teu carrinho está vazio',
    emptyDesc:
      'Adiciona algo que te tenta e passa-o por uma compra virtual.',
    emptyCta: 'Começar compras virtuais',
    total: 'Total',
    transTitle: 'Isto é um pedido virtual',
    transBody:
      'Nenhum pagamento será cobrado. Nenhum produto real será enviado. Este passo simula uma finalização para te ajudar a parar e reconsiderar.',
    checkout: 'Finalização virtual',
    keepBrowsing: 'Continuar a explorar',
    remove: 'Remover',
    decrease: 'Diminuir a quantidade de {name}',
    increase: 'Aumentar a quantidade de {name}',
    quantity: 'Quantidade: {n}',
  },
  checkout: {
    title: 'Finalização virtual',
    subtitle: 'Sem pagamento, morada ou dados de cartão reais — nunca.',
    vibeLegend: 'Onde devemos entregar virtualmente?',
    vibeHelp:
      'Escolhe uma vibe — guardamos apenas esta escolha divertida, nunca uma morada real.',
    demoMode: 'Modo demo',
    demoModeDesc:
      'Acelera a entrega simulada (segundos em vez de horas) e encurta o período de reflexão para 5 minutos — útil para experimentar o fluxo.',
    orderTotal: 'Total do pedido (virtual)',
    transTitle: 'Isto é um pedido virtual',
    transBody:
      'Nenhum pagamento será cobrado. Nenhum produto real será enviado. Estamos a simular a finalização e a entrega para te ajudar a adiar uma compra por impulso.',
    confirm: 'Confirmar pedido virtual',
  },
  orders: {
    title: 'Pedidos virtuais',
    subtitle:
      'Acompanha a entrega simulada e decide depois se ainda queres cada item.',
    emptyTitle: 'Ainda não há pedidos virtuais',
    emptyDesc:
      'Faz uma finalização virtual e os teus pedidos simulados aparecerão aqui, com um período de reflexão antes de decidires.',
    emptyCta: 'Começar compras virtuais',
    reviewIn: 'Revisão {time}',
    avoidedSaved: 'Evitado — poupado',
    stillWanted: 'Ainda quero',
    maybeLater: 'Talvez depois',
    deliveryVibe: 'Vibe de entrega',
  },
  orderDetail: {
    allOrders: '← Todos os pedidos',
    placed: 'Feito {date}',
    transTitle: 'O acompanhamento de entrega é simulado',
    transBody:
      'O acompanhamento de entrega é simulado para te ajudar a adiar compras por impulso. Nada é enviado fisicamente e nenhum pagamento foi cobrado.',
    maybeLaterMsg:
      'Sem pressão. Mantemos este item na tua lista em pausa e perguntamos de novo mais tarde — revisão {time}.',
    simulatedDelivery: 'Entrega simulada',
    demoMode: 'Modo demo',
    summary: 'Resumo',
    qty: 'Qtd {n}',
    notFoundTitle: 'Pedido não encontrado',
    notFoundDesc:
      'Pode ter sido apagado do armazenamento local deste navegador.',
    notFoundCardTitle: 'Não conseguimos encontrar esse pedido',
    back: 'Voltar aos pedidos',
  },
  decision: {
    question: 'Ainda queres isto?',
    questionSub: 'Agora que o impulso arrefeceu, decide com mais calma.',
    no: 'Não, não preciso disto',
    maybe: 'Talvez depois',
    yes: 'Sim, ainda quero',
    avoidedTitle: 'Evitaste uma compra por impulso e poupaste {amount}.',
    avoidedSub: 'Esse valor foi adicionado ao teu total poupado.',
    stillWantedTitle: 'Registado — ainda o queres.',
    stillWantedSub:
      'Após um verdadeiro período de reflexão, essa é uma decisão muito mais ponderada.',
    openProduct: 'Abrir a página original do produto ↗',
    notSell:
      'O BuyLater não vende este item. Abrir um link externo é decisão tua e o BuyLater não é responsável por sites de terceiros.',
    coolingTitle: 'Período de reflexão em curso',
    coolingBody:
      'Vamos perguntar se ainda o queres assim que for entregue virtualmente (e após um período de reflexão de {days} dias). Sem pressa — essa pausa é o objetivo todo.',
  },
  timeline: {
    current: 'Atual',
    pending: 'Pendente',
  },
  stats: {
    title: 'O teu impacto',
    subtitle: 'Como o teu hábito de reflexão se vai somando.',
    emptyTitle: 'Ainda sem estatísticas',
    emptyDesc:
      'Assim que simulares algumas compras e tomares decisões de reflexão, verás aqui quanto poupaste.',
    emptyCta: 'Começar compras virtuais',
    moneySaved: 'Dinheiro poupado',
    purchasesAvoided: 'Compras evitadas',
    virtualOrders: 'Pedidos virtuais',
    virtuallySpent: 'Gasto virtualmente',
    stillWanted: 'Ainda quero',
    maybeLater: 'Em pausa / talvez depois',
    savedNotePre: '“Dinheiro poupado” conta apenas pedidos em que escolheste ',
    savedNoteBold: '“Não, não preciso disto”',
    savedNotePost:
      '. Reflete preços virtuais, não transações reais.',
    topCategories: 'Categorias principais por gasto evitado',
    topEmpty: 'Evita uma compra para começar a construir esta análise.',
    recent: 'Decisões recentes',
    pending: 'Pendente',
    avoided: 'Evitado',
  },
  privacy: {
    title: 'Privacidade',
    subtitle: 'O que guardamos — e o que deliberadamente não guardamos.',
    p1: 'O BuyLater é um simulador de compras virtuais. Foi concebido para recolher o mínimo possível — não há conta, não há backend e não há rastreio da tua identidade.',
    whatStored: 'O que é guardado',
    s1Pre: 'Todos os teus dados são guardados ',
    s1Bold: 'localmente no teu navegador',
    s1Post: ' através do localStorage. Nunca saem do teu dispositivo através desta app.',
    s2: 'Itens que adicionas, o teu carrinho, os teus pedidos virtuais e as tuas definições.',
    s3: 'Uma escolha divertida de “vibe de entrega” — nunca uma morada real.',
    neverTitle: 'O que nunca é recolhido',
    n1: 'Sem dados de cartão ou pagamento — nunca é processado nenhum pagamento.',
    n2: 'Sem morada de entrega real.',
    n3: 'Sem número de telefone.',
    n4: 'Sem dados pessoais sensíveis e sem recolha de dados oculta.',
    analyticsTitle: 'Análise',
    analyticsBody:
      'O MVP não integra qualquer análise de terceiros. Os eventos internos são registados apenas na consola do navegador em desenvolvimento, para nos ajudar a construir o produto.',
    clearTitle: 'Apagar os teus dados',
    clearPre:
      'Como tudo vive no teu navegador, tens sempre o controlo. Podes apagar todos os dados do BuyLater a qualquer momento em ',
    clearLink: 'Definições',
    clearPost: '. Limpar o armazenamento do navegador também os remove.',
  },
  terms: {
    title: 'Termos & Aviso legal',
    subtitle: 'Lê, por favor — isto não é uma loja.',
    whatTitle: 'O que é o BuyLater',
    w1: 'O BuyLater é um simulador de compras virtuais e uma ferramenta de reflexão.',
    w2: 'Não é uma loja real. Esta app não vende quaisquer bens.',
    w3: 'Não é processado nenhum pagamento real e não é efetuada nenhuma entrega real.',
    w4: 'O acompanhamento de entrega é uma simulação para te ajudar a adiar compras por impulso.',
    prodTitle: 'Informação do produto',
    p1: 'Os produtos de demonstração são fictícios e ilustrativos. A informação do produto é de demonstração ou fornecida pelo utilizador e pode não ser exata.',
    p2: 'Os nomes de lojas e marcas no conteúdo de demonstração são marcadores de posição e não implicam qualquer associação ou aprovação.',
    linksTitle: 'Links externos',
    l1: 'Se decidires abrir um link de produto externo que adicionaste, fá-lo por tua conta e risco. És responsável pelas decisões tomadas em sites de terceiros.',
    l2: 'O BuyLater não é responsável pelo conteúdo, preços ou segurança de sites externos.',
    warrantyTitle: 'Sem garantia',
    warrantyBody:
      'Este MVP é fornecido “tal como está”, sem garantias de qualquer tipo. O valor de “dinheiro poupado” é uma estimativa baseada em preços virtuais, apenas para motivação — não representa aconselhamento financeiro real nem uma transação real.',
    affTitle: 'Divulgação futura de afiliados',
    affBody:
      'O BuyLater não usa atualmente links de afiliados. Se for adicionada monetização por afiliados no futuro através de programas oficiais, será mostrada uma divulgação como “Enquanto Associados Amazon, ganhamos com compras elegíveis.” antes desses links.',
  },
  settings: {
    title: 'Definições',
    subtitle: 'Tens o controlo dos teus dados locais.',
    dataTitle: 'Os teus dados',
    dataBody:
      'Tudo o que o BuyLater sabe é guardado apenas neste navegador. Apagar remove os teus itens personalizados, o carrinho, os pedidos virtuais e as estatísticas guardadas. Isto não pode ser anulado.',
    clearedTitle: 'Tudo limpo',
    clearedBody: 'Os teus dados do BuyLater foram removidos deste navegador.',
    clearBtn: 'Apagar todos os meus dados',
    confirmQuestion:
      'Tens a certeza? Isto remove permanentemente todos os dados locais do BuyLater.',
    confirmYes: 'Sim, apagar tudo',
    cancel: 'Cancelar',
    langTitle: 'Idioma',
    langBody: 'Escolhe o idioma da interface do BuyLater.',
  },
  notFound: {
    title: 'Página não encontrada',
    cardTitle: 'Essa página não existe',
    desc: 'O link pode estar partido ou a página pode ter sido movida.',
    back: 'Voltar ao início',
  },
};
