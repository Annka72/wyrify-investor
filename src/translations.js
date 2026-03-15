const translations = {
  no: {
    nav: {
      items: [
        { label: "Oversikt", id: "oversikt" },
        { label: "Produkt", id: "produkt" },
        { label: "Marked", id: "marked" },
        { label: "Teknologi", id: "teknologi" },
        { label: "Team", id: "team" },
        { label: "Kontakt oss", id: "kontakt" },
      ],
      investorBadge: "INVESTORPRESENTASJON",
      menuAriaLabel: "Meny",
    },

    hero: {
      label: "UAVHENGIG BETALINGSINFRASTRUKTUR",
      titleLine1: "Betaling uten",
      titleLine2: "bank eller kort",
      titleLine3: "Overalt",
      description:
        "Wyrify er verdens første betalingsplattform som fungerer helt uten bankkort og helt uavhengig av VISA eller Mastercard. Vår Bluetooth-baserte beacon-teknologi gjør det mulig å gjennomføre sikre transaksjoner på under to sekunder — med begrenset offline-funksjonalitet der nettilgang ikke er tilgjengelig.",
      pills: [
        "Uavhengig av kort",
        "Ingen bankkort",
        "0,5 % gebyr",
        "1–2 sek. transaksjoner",
        "Krypto & fiat",
      ],
      ctaExplore: "UTFORSK PLATTFORMEN →",
      ctaWhitepaper: "WHITEPAPER",
    },

    stats: [
      {
        value: "3 mrd+",
        label: "Mennesker uten tilgang til banktjenester globalt",
        sub: "MÅLGRUPPE",
      },
      {
        value: "60M+",
        label: "POS-terminaler kontrollert av kun to selskaper",
        sub: "Verifone + Ingenico",
      },
      {
        value: "$0",
        label: "Kostnad for kunden å komme i gang",
        sub: "Gratis beacon",
      },
      {
        value: "1–2s",
        label: "Transaksjonstid via blokkjeden",
        sub: "vs 3–5 dager tradisjonelt",
      },
      {
        value: "0,5 %",
        label: "Transaksjonsgebyr",
        sub: "vs 3 %+ kortgebyr",
      },
    ],

    network: {
      label: "SLIK FUNGERER DET",
      titleLine1: "Fra forhandler til kunde,",
      titleLine2: "via blokkjeden",
    },

    problem: {
      label: "PROBLEMET",
      titleLine1: "Et betalingssystem bygget",
      titleLine2: "for en annen tid",
      description:
        "Dagens betalingsinfrastruktur er sentralisert, dyr og ekskluderende. Milliarder av mennesker er utestengt fra det globale økonomiske systemet, og selv de som har tilgang betaler overpris for trege tjenester.",
      cards: [
        {
          icon: "🏦",
          title: "Kortmonopolet",
          body: "VISA og Mastercard kontrollerer over 90 % av alle POS-terminaler gjennom Verifone og Ingenico. Gebyrene er høye (ofte 3 %+), oppgjøret tar dager, og tilbakebetalinger (chargebacks) koster butikkene milliarder hvert år. Systemet er designet for kortutstedernes profitt — ikke for forbrukerne eller selgerne.",
        },
        {
          icon: "🌍",
          title: "Global ekskludering",
          body: "Over tre milliarder mennesker har ingen bankkonto, og dermed ingen mulighet til å delta i digital økonomi. Tradisjonelle betalingssystemer krever bankforbindelse, kredittvurdering og fysisk infrastruktur som ikke finnes i store deler av verden. Disse menneskene er låst ute — ikke fordi teknologien ikke finnes, men fordi den aldri ble laget for dem.",
        },
        {
          icon: "💳",
          title: "Avhengighet av kortnettverket",
          body: "Selv nye fintech-løsninger er bygget oppå VISA og Mastercards infrastruktur. De er raskere grensesnitt til det samme gamle systemet — med de samme gebyrene, de samme mellomleddene og de samme begrensningene. Ingen har til nå bygget et genuint alternativ som erstatter selve kortnettverket.",
        },
        {
          icon: "🔒",
          title: "Ingen reelt alternativ — før nå",
          body: "POS-markedet har aldri hatt ekte konkurranse. Plastkortet har dominert i over 50 år. Wyrify er fundamentalt annerledes: en fullverdig betalingsplattform som erstatter hele verdikjeden — fra terminal til oppgjør — uten kort og uten bankavhengighet.",
        },
      ],
    },

    product: {
      label: "PRODUKTET",
      titleLine1: "En komplett betalingsplattform,",
      titleLine2: "bygget fra grunnen av",
      description:
        "Wyrify kombinerer en Bluetooth BLE-basert hardware-beacon, mobilapper for kunder og forhandlere, og en online betalingsløsning — alt drevet av en proprietær proof-of-stake-blokkjede med 1–2 sekunders bekreftelsestid. Plattformen er primært online, men støtter begrenset offline-bruk via Bluetooth der nettilgang mangler.",
      cards: [
        {
          num: "01",
          title: "Wyrify Beacon",
          subtitle: "POS-hardware",
          desc: "En Bluetooth Low Energy-terminal som erstatter tradisjonelle kortlesere fullstendig. Forhandlere mottar beaconen gratis og betaler kun 0,5 % per transaksjon. Kunder betaler via Wyrify-appen — uten kort og uten bank. Beaconen kommuniserer direkte med kundens telefon over BLE, og transaksjonen bekreftes på 1–2 sekunder. Ved begrenset nettilgang kan mindre transaksjoner gjennomføres lokalt og synkroniseres til blokkjeden når tilkobling gjenopprettes.",
          features: [
            "BLE / NFC-kommunikasjon",
            "Umiddelbart oppgjør",
            "Alle kryptovalutaer akseptert",
            "Null risiko for tilbakebetaling",
          ],
        },
        {
          num: "02",
          title: "Wyrify App",
          subtitle: "Kunde & forhandler",
          desc: "En mobil lommebok som støtter alle kryptovalutaer og fiat-valutaer. Kunder kan holde, veksle og bruke digitale verdier hos enhver Wyrify-tilkoblet forhandler. Forhandlere får bekreftelse på sekunder, med verdi låst umiddelbart. Appen inkluderer innebygd KYC/UBO-verifisering og et komplett dashbord for transaksjonshistorikk og rapportering.",
          features: [
            "Flervaluta-lommebok",
            "Betal med ett klikk",
            "Forhandler-dashbord",
            "Innebygd KYC / UBO",
          ],
        },
        {
          num: "03",
          title: "Wyrify Online",
          subtitle: "Netthandelsløsning",
          desc: "En plug-in betalingsløsning for netthandel som fungerer via telefonnummer. Kunden mottar en app-varsling, godkjenner transaksjonen, og oppgjøret skjer umiddelbart. Ingen tilbakebetalinger. Fastlåste kurser ved transaksjonstidspunkt. Enkel API-integrasjon for alle e-handelsplattformer, med støtte for mikrobetalinger ned til brøkdeler av en krone.",
          features: [
            "Null tilbakebetalinger",
            "Umiddelbar clearing",
            "Mikrobetalinger",
            "Lojalitetsprogram-klar",
          ],
        },
      ],
      flowLabel: "TRANSAKSJONSFLYT",
      flowSteps: [
        { label: "Kunde", sub: "App / Lommebok", icon: "📱" },
        { label: "Wyrify Beacon", sub: "BLE-signal", icon: "📡" },
        { label: "Blokkjede", sub: "Krypto-node", icon: "⛓️" },
        {
          label: "Forhandlerkonto",
          sub: "Umiddelbart oppgjør",
          icon: "🏪",
        },
      ],
      flowStats: [
        ["⚡ 1–2 sekunder", "Transaksjonstid"],
        ["🔗 Uavhengig", "Ingen kort eller bank"],
        ["💱 Alle valutaer", "Fiat & krypto"],
      ],
    },

    market: {
      label: "MARKEDET",
      titleLine1: "Målrettede vertikaler med",
      titleLine2: "akutte betalingsbehov",
      description:
        "Wyrify konkurrerer ikke bredt mot etablerte betalingssystemer. I stedet retter vi oss mot underserviserte sektorer der betalinger er dyre, utilgjengelige eller direkte blokkert — og skaper rask, organisk adopsjon i markeder som desperat trenger en løsning.",
      urgencyLabel: "BETALINGSBEHOV",
      cards: [
        {
          icon: "🌍",
          title: "Befolkning uten banktjenester",
          urgency: 95,
          desc: "Over tre milliarder mennesker mangler grunnleggende finansielle tjenester. Med Wyrify kan enhver forhandler bli et bankpunkt. Vår agentmodell muliggjør person-til-person-transaksjoner, mikrolån og sparing — alt via en mobiltelefon og en beacon, uten behov for bankkonto.",
          pilot: "Dialog med afrikanske myndigheter",
        },
        {
          icon: "💊",
          title: "Farmasøytisk industri",
          urgency: 85,
          desc: "Kontrollerte substanser krever spesialisert betalingshåndtering med strenge krav til sporbarhet og compliance. Wyrify sin blokkjedeverifiserte, umiddelbare oppgjørsløsning gir farmasøytiske forhandlere den kombinasjonen av etterlevelse, sikkerhet og hastighet de trenger for å operere effektivt.",
          pilot: "20+ signerte kontrakter",
        },
        {
          icon: "🎰",
          title: "Casino og spill",
          urgency: 80,
          desc: "Internasjonal pengeflyt, gevinsthåndtering og umiddelbare betalinger direkte ved spillebordene. Wyrify-beacons lar spillere gjennomføre sikre transaksjoner uten å forlate plassen sin — med full sporbarhet og umiddelbart oppgjør til operatøren.",
          pilot: "Pilotprogram i Asia",
        },
        {
          icon: "🏪",
          title: "Detaljhandel uten kortavhengighet",
          urgency: 90,
          desc: "Butikker som ønsker seg bort fra høye kortgebyrer og lang oppgjørstid. Wyrify tilbyr en komplett alternativ betalingsinfrastruktur med umiddelbart oppgjør, null tilbakebetalinger og langt lavere kostnader enn tradisjonelle kortterminaler.",
          pilot: "Pilotprosjekter i Skandinavia",
        },
        {
          icon: "🛒",
          title: "Mikrobetalinger på nett",
          urgency: 75,
          desc: "Tips, donasjoner, digitalt innhold og abonnementer til svært lave beløp — nettet trenger et mikrobetalingslag. Wyrify sin infrastruktur håndterer transaksjoner helt ned til brøkdeler av en krone, med nesten null kostnad og umiddelbar bekreftelse.",
          pilot: "API klar",
        },
        {
          icon: "🚢",
          title: "Maritim og offshore",
          urgency: 70,
          desc: "Skip, oljeplattformer og avsidesliggende arbeidsplasser har behov for fleksible betalingsløsninger. Wyrify sin beacon-teknologi muliggjør transaksjoner med begrenset tilkobling, med synkronisering til blokkjeden når full nettilgang gjenopprettes.",
          pilot: "I utredning",
        },
      ],
    },

    technology: {
      label: "TEKNOLOGI",
      titleLine1: "Proprietær blokkjede,",
      titleLine2: "bygget for handel",
      items: [
        {
          label: "Proof-of-Stake-protokoll",
          icon: "⛓",
          desc: "Blackcoin-basert PoS-nodenettverk med dynamisk sekvensering. Eliminerer energikrevende mining, og sikrer raske, sikre transaksjoner med lavt strømforbruk. Nettverket er desentralisert og skalerbart.",
        },
        {
          label: "Nullbekreftelses-noder",
          icon: "⚡",
          desc: "Betrodde noder mottar «Droplet»-dynamisk sekvensering — dette muliggjør null-bekreftelses-blokker som preges umiddelbart, uten å vente på nettverkskonsensus. Resultatet er at transaksjoner bekreftes på under to sekunder.",
        },
        {
          label: "Transaksjonsklynging",
          icon: "🔄",
          desc: "Transaksjoner grupperes i lommebok-til-lommebok-overføringer hvert sekund, mens full blokkjedesporbarhet opprettholdes. Dette gir enorm gjennomstrømning uten å ofre transparens eller sikkerhet.",
        },
        {
          label: "30 000–40 000 TPS",
          icon: "📊",
          desc: "Forventet transaksjonskapasitet per sekund på nåværende nodenettverk — langt over Bitcoin (7 TPS) og Ethereum (15–45 TPS). Arkitekturen er designet for horisontal skalering etter behov.",
        },
        {
          label: "Nullvolatilitets-clearing",
          icon: "💱",
          desc: "Et fastprislag over det volatile krypto-laget. Forhandlere fakturerer i fiat og mottar oppgjør til fast verdi — all kryptovolatilitetsrisiko elimineres fullstendig for selgeren. Kunden kan betale i valgfri kryptovaluta.",
        },
      ],
      stackLabel: "TEKNOLOGISTAKK",
      stackLayers: [
        {
          layer: "Forbrukerlag",
          items: ["Wyrify App (iOS/Android)", "Forhandler-app", "Netthandel-SDK"],
        },
        {
          layer: "Plattformlag",
          items: ["Wyrify POS-plattform", "Veksling & lommebok", "KYC / UBO-motor"],
        },
        {
          layer: "Transaksjonslag",
          items: ["Transaksjonsmellomvare", "Nodesekvensering", "Klystringsmotor"],
        },
        {
          layer: "Blokkjedelag",
          items: ["NXChain / WBC", "PoS-protokoll", "PoS-noder"],
        },
        {
          layer: "Oppgjørslag",
          items: ["Fiat-bankintegrasjon", "Kryptoveksling", "Fastpris-clearing"],
        },
      ],
      proofLabel: "KONSEPTBEVIS — DANMARK",
      proofText:
        'I 2013 utviklet GoAppified beacon-baserte betalinger for MobilePay™ i Danmark. Innen <strong style="color: #E4EBE8">to år hadde 80 % av den betalende befolkningen</strong> appen. Konkurrenter med 40 % markedsandel la ned. Kontantbruken i småbutikker kollapset. Wyrify har tatt denne velprøvde modellen og transformert den for global bruk med kryptovaluta.',
    },

    business: {
      label: "FORRETNINGSMODELL",
      titleLine1: "Flere inntektsstrømmer,",
      titleLine2: "strukturelt fordelaktig",
      description:
        "Wyrify genererer inntekter fra hver transaksjon, hver valutaveksling og hver integrasjon. Modellen er designet for å skalere globalt med minimale marginalkostnader.",
      streams: [
        {
          stream: "Transaksjonsgebyrer",
          rate: "0,5 % – 5 %+",
          note: "Grunngebyr på 0,5 % for standardforhandlere, opptil 5 %+ for høyrisikobransjer. Over 50 % billigere enn tradisjonelle kortgebyrer — og med umiddelbart oppgjør inkludert.",
          icon: "💸",
        },
        {
          stream: "Valutaveksling",
          rate: "Valutaspread",
          note: "Inntekter på krypto-til-fiat og fiat-til-krypto-konverteringer via den integrerte vekslingsplattformen. Hver transaksjon som krysser valutagrenser genererer spread-inntekt.",
          icon: "💱",
        },
        {
          stream: "Vekslingsplattform",
          rate: "Handelsgebyrer",
          note: "Proprietær kryptobørs integrert i Wyrify-plattformen, som fanger ytterligere margin på alle myntbevegelser og vekslinger innad i økosystemet.",
          icon: "📈",
        },
        {
          stream: "Integrasjonsgebyrer",
          rate: "Lisensiering",
          note: "Merkevare-tilpassede implementeringer, API-integrasjoner og skreddersydde enterpriseløsninger for store kunder med spesialtilpassede behov og høye transaksjonsvolumer.",
          icon: "🔧",
        },
        {
          stream: "Samarbeidsprosjekter",
          rate: "Inntektsdeling",
          note: "Profittdeling med industrielle aktører som integrerer Wyrify i sine eksisterende betalingsinfrastrukturer, inkludert telekommunikasjon, bank og detaljhandel.",
          icon: "🤝",
        },
      ],
      investorTitle: "Investorløp",
      investorText:
        "Wyrify er selvfinansiert av grunnleggerne gjennom den innledende driftsfasen. Selskapet vurderer notering på tyske og britiske børser, alternativt en full børsnotering (IPO), avhengig av resultatene fra de første kundeutrullingene og operasjonelle milepæler. Selskapet er etablert som en britisk enhet med pågående FCA-dialog, og kryssjurisdiksjonelle alternativer er under vurdering.",
      advantageTitle: "Konkurransefortrinn",
      advantages: [
        "Eneste plattform som fullt ut erstatter bank + kort ved POS",
        "Uavhengig av VISA og Mastercard",
        "Forhandlerkostnad per enhet: ca. $3–5",
        "Ingen minstegrense — støtter mikrobetalinger",
        "Fastprisoppgjør fjerner all volatilitetsrisiko for forhandlere",
        "Begrenset offline-støtte via Bluetooth BLE",
        "Samarbeidspartnere med milliardomsetning",
      ],
    },

    team: {
      label: "TEAMET",
      titleLine1: "Industriveteraner,",
      titleLine2: "global rekkevidde",
      description:
        "Wyrify er bygget av et tverrfaglig team med dyp erfaring innen betalingsteknologi, kryptografi, maskinvare og internasjonal forretningsutvikling. Sammen dekker teamet hele verdikjeden — fra blokkjedeprotokoll til salgspipeline.",
      members: [
        {
          name: "Henrik Onarheim",
          role: "CEO & oppfinner",
          detail:
            "Oppfinner av Wyrify-plattformen og NXChain-teknologien. Designet blokkjedens transaksjonslag sammen med Thomas Wong. Har ledet prosjektet fra idé til fungerende prototyp og internasjonale pilotprosjekter.",
          flag: "🇬🇧",
        },
        {
          name: "Thomas Wong",
          role: "Kryptologisjef",
          detail:
            "Sikkerhetsekspert, foreleser og kryptograf. Har bygget hele NXChain-blokkjedeplattformen og Wyrify sine primære teknologiske ryggrader. Spesialist på kryptografisk protokolldesign og sikker transaksjonshåndtering.",
          flag: "🔐",
        },
      ],
    },

    cta: {
      label: "INVESTORRELASJONER",
      titleLine1: "Bli med på betalings-",
      titleLine2: "revolusjonen",
      description:
        "Wyrify søker strategiske partnere og investorer for å akselerere den globale utrullingen. Vinduet for å entre POS-disrupsjonsmuligheten er åpent nå. Ta kontakt for å lære mer om hvordan du kan bli en del av fremtidens betalingsinfrastruktur.",
      ctaDeck: "BE OM INVESTOR-PRESENTASJON",
      ctaCall: "BOOK ET MØTE",
      qrLabel: "SKANN FOR Å DELE",
    },

    footer: {
      copyright:
        "© 2025 WYRIFY LTD · ALLE RETTIGHETER FORBEHOLDT · KONFIDENSIELT INVESTORDOKUMENT",
      version: "Investorpresentasjon v1.0",
    },

    modals: {
      whitepaper: {
        title: "Wyrify — Whitepaper",
        intro: "Wyrify — Fremtidens betalingsinfrastruktur",
        body: "Wyrify er en komplett betalingsplattform som erstatter tradisjonelle kortterminaler med Bluetooth-basert beacon-teknologi. Plattformen fungerer uavhengig av VISA, Mastercard og bankinfrastruktur.",
        principlesTitle: "Nøkkelprinsipper:",
        principles: [
          "Uavhengig: Fungerer uten VISA, Mastercard eller bankinfrastruktur",
          "Umiddelbart oppgjør: 1–2 sekunder, sammenlignet med 3–5 dager for tradisjonelle kort",
          "Null tilbakebetalingsrisiko: Blokkjedebasert, irreversibel bekreftelse",
          "Universell tilgang: Fungerer for alle — uavhengig av bankkonto eller kredittvurdering",
          "Fastpris-clearing: Forhandlere er beskyttet mot kryptovolatilitet",
          "Begrenset offline-støtte: Små transaksjoner kan gjennomføres via BLE uten nett",
        ],
        techNote:
          "Plattformen er bygget på NXChain, en proprietær proof-of-stake-blokkjede med kapasitet på 30 000–40 000 transaksjoner per sekund. Systemet er designet for å skalere horisontalt etter behov.",
        contactNote:
          "For fullstendig whitepaper, ta kontakt med investorrelasjoner.",
      },
      deck: {
        title: "Be om investor-presentasjon",
        intro:
          "Takk for din interesse i Wyrify. Vår detaljerte investor-presentasjon inkluderer:",
        items: [
          "Komplett markedsanalyse og konkurransebildet",
          "Detaljert teknisk arkitekturoversikt",
          "Finansielle fremskrivninger og inntektsmodell",
          "Utrullingsplan og milepæler",
          "Teamets fullstendige bakgrunn og track record",
        ],
        contactIntro:
          "For å motta presentasjonen, vennligst kontakt oss:",
        emailLabel: "E-post:",
        phoneLabel: "Telefon:",
        contactNote:
          "Vi behandler alle henvendelser konfidensielt og svarer vanligvis innen 24 timer.",
      },
      call: {
        title: "Book et møte",
        intro:
          "Vi tilbyr personlige gjennomganger av Wyrify-plattformen for kvalifiserte investorer og strategiske partnere.",
        coversTitle: "Hva møtet dekker:",
        covers: [
          "Live demonstrasjon av beacon-teknologien",
          "Gjennomgang av teknisk arkitektur og blokkjede",
          "Forretningsmodell og vekstutsikter",
          "Investeringsmuligheter og strukturer",
          "Spørsmål og svar med teamet",
        ],
        contactIntro: "For å booke tid, kontakt oss direkte:",
        emailLabel: "E-post:",
        phoneLabel: "Telefon:",
        contactNote:
          "Møter kan gjennomføres digitalt (Zoom/Teams) eller fysisk etter avtale.",
      },
    },

    illustrations: {
      merchant: "FORHANDLER",
      customer: "KUNDE",
      customerMobile: "KUNDENS MOBIL",
      beacon: "BEACON",
      send: "Send",
      confirm: "Bekreft",
      ble: "BLE",
      transactionTime: "1–2 sek",
      cryptoNetwork: "KRYPTO-NODENETTVERK",
      digitalWallet: "DIGITAL LOMMEBOK",
      blockchain: "blokkjede",
      secureTransaction: "sikker transaksjon",
    },
  },

  en: {
    nav: {
      items: [
        { label: "Overview", id: "oversikt" },
        { label: "Product", id: "produkt" },
        { label: "Market", id: "marked" },
        { label: "Technology", id: "teknologi" },
        { label: "Team", id: "team" },
        { label: "Contact us", id: "kontakt" },
      ],
      investorBadge: "INVESTOR PRESENTATION",
      menuAriaLabel: "Menu",
    },

    hero: {
      label: "INDEPENDENT PAYMENT INFRASTRUCTURE",
      titleLine1: "Payments without",
      titleLine2: "banks or cards",
      titleLine3: "Everywhere",
      description:
        "Wyrify is the world's first payment platform that works entirely without bank cards and completely independent of Visa or Mastercard. Our Bluetooth-based beacon technology enables secure transactions in under two seconds — with limited offline functionality where internet access is unavailable.",
      pills: [
        "Card-independent",
        "No bank cards",
        "0.5% fee",
        "1–2 sec transactions",
        "Crypto & fiat",
      ],
      ctaExplore: "EXPLORE THE PLATFORM →",
      ctaWhitepaper: "WHITEPAPER",
    },

    stats: [
      {
        value: "3B+",
        label: "People without access to banking services globally",
        sub: "TARGET GROUP",
      },
      {
        value: "60M+",
        label: "POS terminals controlled by just two companies",
        sub: "Verifone + Ingenico",
      },
      {
        value: "$0",
        label: "Cost for the customer to get started",
        sub: "Free beacon",
      },
      {
        value: "1–2s",
        label: "Transaction time via the blockchain",
        sub: "vs 3–5 days traditional",
      },
      {
        value: "0.5%",
        label: "Transaction fee",
        sub: "vs 3%+ card fees",
      },
    ],

    network: {
      label: "HOW IT WORKS",
      titleLine1: "From merchant to customer,",
      titleLine2: "via the blockchain",
    },

    problem: {
      label: "THE PROBLEM",
      titleLine1: "A payment system built",
      titleLine2: "for another era",
      description:
        "Today's payment infrastructure is centralized, expensive, and exclusionary. Billions of people are locked out of the global economic system, and even those with access pay excessive fees for slow services.",
      cards: [
        {
          icon: "🏦",
          title: "The card monopoly",
          body: "Visa and Mastercard control over 90% of all POS terminals through Verifone and Ingenico. Fees are high (often 3%+), settlement takes days, and chargebacks cost merchants billions every year. The system is designed for card issuers' profit — not for consumers or sellers.",
        },
        {
          icon: "🌍",
          title: "Global exclusion",
          body: "Over three billion people have no bank account, and therefore no way to participate in the digital economy. Traditional payment systems require a bank connection, credit assessment, and physical infrastructure that doesn't exist in large parts of the world. These people are locked out — not because the technology doesn't exist, but because it was never built for them.",
        },
        {
          icon: "💳",
          title: "Dependence on the card network",
          body: "Even new fintech solutions are built on top of Visa and Mastercard's infrastructure. They are faster interfaces to the same old system — with the same fees, the same intermediaries, and the same limitations. No one has yet built a genuine alternative that replaces the card network itself.",
        },
        {
          icon: "🔒",
          title: "No real alternative — until now",
          body: "The POS market has never had true competition. The plastic card has dominated for over 50 years. Wyrify is fundamentally different: a full payment platform that replaces the entire value chain — from terminal to settlement — without cards and without bank dependence.",
        },
      ],
    },

    product: {
      label: "THE PRODUCT",
      titleLine1: "A complete payment platform,",
      titleLine2: "built from the ground up",
      description:
        "Wyrify combines a Bluetooth BLE-based hardware beacon, mobile apps for customers and merchants, and an online payment solution — all powered by a proprietary proof-of-stake blockchain with 1–2 second confirmation time. The platform is primarily online, with limited offline support via Bluetooth where internet access is unavailable.",
      cards: [
        {
          num: "01",
          title: "Wyrify Beacon",
          subtitle: "POS hardware",
          desc: "A Bluetooth Low Energy terminal that completely replaces traditional card readers. Merchants receive the beacon for free and pay only 0.5% per transaction. Customers pay via the Wyrify app — no cards, no bank. The beacon communicates directly with the customer's phone over BLE, and the transaction is confirmed in 1–2 seconds. With limited connectivity, smaller transactions can be processed locally and synced to the blockchain when connectivity is restored.",
          features: [
            "BLE / NFC communication",
            "Instant settlement",
            "All cryptocurrencies accepted",
            "Zero chargeback risk",
          ],
        },
        {
          num: "02",
          title: "Wyrify App",
          subtitle: "Customer & merchant",
          desc: "A mobile wallet that supports all cryptocurrencies and fiat currencies. Customers can hold, exchange, and spend digital assets at any Wyrify-connected merchant. Merchants receive confirmation in seconds, with value locked instantly. The app includes built-in KYC/UBO verification and a complete dashboard for transaction history and reporting.",
          features: [
            "Multi-currency wallet",
            "One-click payment",
            "Merchant dashboard",
            "Built-in KYC / UBO",
          ],
        },
        {
          num: "03",
          title: "Wyrify Online",
          subtitle: "E-commerce solution",
          desc: "A plug-in payment solution for e-commerce that works via phone number. The customer receives an app notification, approves the transaction, and settlement happens instantly. No chargebacks. Locked exchange rates at transaction time. Simple API integration for all e-commerce platforms, with support for micropayments down to fractions of a cent.",
          features: [
            "Zero chargebacks",
            "Instant clearing",
            "Micropayments",
            "Loyalty program ready",
          ],
        },
      ],
      flowLabel: "TRANSACTION FLOW",
      flowSteps: [
        { label: "Customer", sub: "App / Wallet", icon: "📱" },
        { label: "Wyrify Beacon", sub: "BLE signal", icon: "📡" },
        { label: "Blockchain", sub: "Crypto node", icon: "⛓️" },
        {
          label: "Merchant account",
          sub: "Instant settlement",
          icon: "🏪",
        },
      ],
      flowStats: [
        ["⚡ 1–2 seconds", "Transaction time"],
        ["🔗 Independent", "No cards or banks"],
        ["💱 All currencies", "Fiat & crypto"],
      ],
    },

    market: {
      label: "THE MARKET",
      titleLine1: "Targeted verticals with",
      titleLine2: "acute payment needs",
      description:
        "Wyrify does not compete broadly against established payment systems. Instead, we target underserved sectors where payments are expensive, inaccessible, or outright blocked — creating rapid, organic adoption in markets that desperately need a solution.",
      urgencyLabel: "PAYMENT NEED",
      cards: [
        {
          icon: "🌍",
          title: "Unbanked population",
          urgency: 95,
          desc: "Over three billion people lack basic financial services. With Wyrify, any merchant can become a banking point. Our agent model enables person-to-person transactions, microloans, and savings — all via a mobile phone and a beacon, with no need for a bank account.",
          pilot: "Dialogue with African authorities",
        },
        {
          icon: "💊",
          title: "Pharmaceutical industry",
          urgency: 85,
          desc: "Controlled substances require specialized payment handling with strict traceability and compliance requirements. Wyrify's blockchain-verified, instant settlement solution gives pharmaceutical retailers the combination of compliance, security, and speed they need to operate effectively.",
          pilot: "20+ signed contracts",
        },
        {
          icon: "🎰",
          title: "Casino and gaming",
          urgency: 80,
          desc: "International money flows, prize handling, and instant payments directly at the gaming tables. Wyrify beacons let players conduct secure transactions without leaving their seat — with full traceability and instant settlement to the operator.",
          pilot: "Pilot program in Asia",
        },
        {
          icon: "🏪",
          title: "Retail without card dependence",
          urgency: 90,
          desc: "Shops that want to move away from high card fees and long settlement times. Wyrify offers a complete alternative payment infrastructure with instant settlement, zero chargebacks, and significantly lower costs than traditional card terminals.",
          pilot: "Pilot projects in Scandinavia",
        },
        {
          icon: "🛒",
          title: "Online micropayments",
          urgency: 75,
          desc: "Tips, donations, digital content, and subscriptions at very low amounts — the web needs a micropayment layer. Wyrify's infrastructure handles transactions down to fractions of a cent, with near-zero cost and instant confirmation.",
          pilot: "API ready",
        },
        {
          icon: "🚢",
          title: "Maritime and offshore",
          urgency: 70,
          desc: "Ships, oil platforms, and remote workplaces need flexible payment solutions. Wyrify's beacon technology enables transactions with limited connectivity, with synchronization to the blockchain when full internet access is restored.",
          pilot: "Under evaluation",
        },
      ],
    },

    technology: {
      label: "TECHNOLOGY",
      titleLine1: "Proprietary blockchain,",
      titleLine2: "built for commerce",
      items: [
        {
          label: "Proof-of-Stake protocol",
          icon: "⛓",
          desc: "Blackcoin-based PoS node network with dynamic sequencing. Eliminates energy-intensive mining, ensuring fast, secure transactions with low power consumption. The network is decentralized and scalable.",
        },
        {
          label: "Zero-confirmation nodes",
          icon: "⚡",
          desc: 'Trusted nodes receive "Droplet" dynamic sequencing — this enables zero-confirmation blocks that are minted instantly, without waiting for network consensus. The result is that transactions are confirmed in under two seconds.',
        },
        {
          label: "Transaction clustering",
          icon: "🔄",
          desc: "Transactions are grouped into wallet-to-wallet transfers every second, while full blockchain traceability is maintained. This provides enormous throughput without sacrificing transparency or security.",
        },
        {
          label: "30,000–40,000 TPS",
          icon: "📊",
          desc: "Expected transaction capacity per second on the current node network — far exceeding Bitcoin (7 TPS) and Ethereum (15–45 TPS). The architecture is designed for horizontal scaling as needed.",
        },
        {
          label: "Zero-volatility clearing",
          icon: "💱",
          desc: "A fixed-price layer above the volatile crypto layer. Merchants invoice in fiat and receive settlement at fixed value — all crypto volatility risk is completely eliminated for the seller. The customer can pay in any cryptocurrency.",
        },
      ],
      stackLabel: "TECHNOLOGY STACK",
      stackLayers: [
        {
          layer: "Consumer layer",
          items: ["Wyrify App (iOS/Android)", "Merchant app", "E-commerce SDK"],
        },
        {
          layer: "Platform layer",
          items: ["Wyrify POS platform", "Exchange & wallet", "KYC / UBO engine"],
        },
        {
          layer: "Transaction layer",
          items: ["Transaction middleware", "Node sequencing", "Clustering engine"],
        },
        {
          layer: "Blockchain layer",
          items: ["NXChain / WBC", "PoS protocol", "PoS nodes"],
        },
        {
          layer: "Settlement layer",
          items: ["Fiat bank integration", "Crypto exchange", "Fixed-price clearing"],
        },
      ],
      proofLabel: "PROOF OF CONCEPT — DENMARK",
      proofText:
        'In 2013, GoAppified developed beacon-based payments for MobilePay™ in Denmark. Within <strong style="color: #E4EBE8">two years, 80% of the paying population</strong> had the app. Competitors with 40% market share shut down. Cash usage in small shops collapsed. Wyrify has taken this proven model and transformed it for global use with cryptocurrency.',
    },

    business: {
      label: "BUSINESS MODEL",
      titleLine1: "Multiple revenue streams,",
      titleLine2: "structurally advantaged",
      description:
        "Wyrify generates revenue from every transaction, every currency exchange, and every integration. The model is designed to scale globally with minimal marginal costs.",
      streams: [
        {
          stream: "Transaction fees",
          rate: "0.5% – 5%+",
          note: "Base fee of 0.5% for standard merchants, up to 5%+ for high-risk industries. Over 50% cheaper than traditional card fees — with instant settlement included.",
          icon: "💸",
        },
        {
          stream: "Currency exchange",
          rate: "Currency spread",
          note: "Revenue from crypto-to-fiat and fiat-to-crypto conversions via the integrated exchange platform. Every transaction crossing currency boundaries generates spread income.",
          icon: "💱",
        },
        {
          stream: "Exchange platform",
          rate: "Trading fees",
          note: "Proprietary crypto exchange integrated into the Wyrify platform, capturing additional margin on all coin movements and exchanges within the ecosystem.",
          icon: "📈",
        },
        {
          stream: "Integration fees",
          rate: "Licensing",
          note: "White-label implementations, API integrations, and custom enterprise solutions for large clients with specialized needs and high transaction volumes.",
          icon: "🔧",
        },
        {
          stream: "Partnerships",
          rate: "Revenue sharing",
          note: "Profit sharing with industrial players integrating Wyrify into their existing payment infrastructures, including telecommunications, banking, and retail.",
          icon: "🤝",
        },
      ],
      investorTitle: "Investment path",
      investorText:
        "Wyrify is self-funded by the founders through the initial operational phase. The company is evaluating listing on German and British exchanges, alternatively a full IPO, depending on results from the first customer rollouts and operational milestones. The company is established as a British entity with ongoing FCA dialogue, and cross-jurisdictional alternatives are under consideration.",
      advantageTitle: "Competitive advantages",
      advantages: [
        "Only platform that fully replaces bank + card at POS",
        "Independent of Visa and Mastercard",
        "Merchant cost per unit: approx. $3–5",
        "No minimum amount — supports micropayments",
        "Fixed-price settlement removes all volatility risk for merchants",
        "Limited offline support via Bluetooth BLE",
        "Partners with billion-dollar revenue",
      ],
    },

    team: {
      label: "THE TEAM",
      titleLine1: "Industry veterans,",
      titleLine2: "global reach",
      description:
        "Wyrify is built by a cross-disciplinary team with deep experience in payment technology, cryptography, hardware, and international business development. Together, the team covers the entire value chain — from blockchain protocol to sales pipeline.",
      members: [
        {
          name: "Henrik Onarheim",
          role: "CEO & Inventor",
          detail:
            "Inventor of the Wyrify platform and NXChain technology. Designed the blockchain's transaction layer together with Thomas Wong. Has led the project from idea to working prototype and international pilot projects.",
          flag: "🇬🇧",
        },
        {
          name: "Thomas Wong",
          role: "Chief Cryptologist",
          detail:
            "Security expert, lecturer, and cryptographer. Has built the entire NXChain blockchain platform and Wyrify's primary technological backbones. Specialist in cryptographic protocol design and secure transaction handling.",
          flag: "🔐",
        },
      ],
    },

    cta: {
      label: "INVESTOR RELATIONS",
      titleLine1: "Join the payment",
      titleLine2: "revolution",
      description:
        "Wyrify is seeking strategic partners and investors to accelerate the global rollout. The window to enter the POS disruption opportunity is open now. Get in touch to learn more about how you can be part of the future of payment infrastructure.",
      ctaDeck: "REQUEST INVESTOR PRESENTATION",
      ctaCall: "BOOK A MEETING",
      qrLabel: "SCAN TO SHARE",
    },

    footer: {
      copyright:
        "© 2025 WYRIFY LTD · ALL RIGHTS RESERVED · CONFIDENTIAL INVESTOR DOCUMENT",
      version: "Investor presentation v1.0",
    },

    modals: {
      whitepaper: {
        title: "Wyrify — Whitepaper",
        intro: "Wyrify — The future of payment infrastructure",
        body: "Wyrify is a complete payment platform that replaces traditional card terminals with Bluetooth-based beacon technology. The platform operates independently of Visa, Mastercard, and banking infrastructure.",
        principlesTitle: "Key principles:",
        principles: [
          "Independent: Works without Visa, Mastercard, or banking infrastructure",
          "Instant settlement: 1–2 seconds, compared to 3–5 days for traditional cards",
          "Zero chargeback risk: Blockchain-based, irreversible confirmation",
          "Universal access: Works for everyone — regardless of bank account or credit assessment",
          "Fixed-price clearing: Merchants are protected against crypto volatility",
          "Limited offline support: Small transactions can be processed via BLE without internet",
        ],
        techNote:
          "The platform is built on NXChain, a proprietary proof-of-stake blockchain with a capacity of 30,000–40,000 transactions per second. The system is designed to scale horizontally as needed.",
        contactNote:
          "For the complete whitepaper, please contact investor relations.",
      },
      deck: {
        title: "Request investor presentation",
        intro:
          "Thank you for your interest in Wyrify. Our detailed investor presentation includes:",
        items: [
          "Complete market analysis and competitive landscape",
          "Detailed technical architecture overview",
          "Financial projections and revenue model",
          "Rollout plan and milestones",
          "Team's complete background and track record",
        ],
        contactIntro:
          "To receive the presentation, please contact us:",
        emailLabel: "Email:",
        phoneLabel: "Phone:",
        contactNote:
          "We treat all inquiries confidentially and typically respond within 24 hours.",
      },
      call: {
        title: "Book a meeting",
        intro:
          "We offer personal walkthroughs of the Wyrify platform for qualified investors and strategic partners.",
        coversTitle: "What the meeting covers:",
        covers: [
          "Live demonstration of beacon technology",
          "Technical architecture and blockchain overview",
          "Business model and growth outlook",
          "Investment opportunities and structures",
          "Q&A with the team",
        ],
        contactIntro: "To book a time, contact us directly:",
        emailLabel: "Email:",
        phoneLabel: "Phone:",
        contactNote:
          "Meetings can be conducted digitally (Zoom/Teams) or in person by arrangement.",
      },
    },

    illustrations: {
      merchant: "MERCHANT",
      customer: "CUSTOMER",
      customerMobile: "CUSTOMER MOBILE",
      beacon: "BEACON",
      send: "Send",
      confirm: "Confirm",
      ble: "BLE",
      transactionTime: "1–2 sec",
      cryptoNetwork: "CRYPTO NODE NETWORK",
      digitalWallet: "DIGITAL WALLET",
      blockchain: "blockchain",
      secureTransaction: "secure transaction",
    },
  },
};

export default translations;
