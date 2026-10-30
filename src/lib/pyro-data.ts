export type Tier = "signature" | "flagship" | "elite";
export type Category = "shells" | "cakes" | "firecrackers" | "effects";
export type Priority = "balanced" | "aerial" | "finale";

export interface ProductSpecs {
  caliber?: string;
  shots?: string;
  duration: string;
  burstHeight?: string;
  safetyRadius: string;
  classification: string;
  transport: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  tier: Tier;
  priceMin: number;
  priceMax: number;
  priceUnit: string;
  impact: number; // 0-10
  tagline: string;
  description: string;
  effects: string[];
  specs: ProductSpecs;
  safetyNotes: string[];
  bestFor: string[];
}

export const TIERS: Record<
  Tier,
  { label: string; range: string; blurb: string; accent: string; ring: string; badge: string }
> = {
  signature: {
    label: "Signature",
    range: "$120 – $750",
    blurb:
      "Premium professional staples. The dependable workhorses that fill a show with consistent, high-grade color and sound.",
    accent: "text-amber-300",
    ring: "ring-amber-400/40",
    badge: "bg-amber-400/10 text-amber-300 border-amber-400/30",
  },
  flagship: {
    label: "Flagship",
    range: "$750 – $2,500",
    blurb:
      "Show-stopping centerpieces. Larger calibers, multi-break patterns and signature Japanese-style effects that anchor a program.",
    accent: "text-orange-300",
    ring: "ring-orange-400/40",
    badge: "bg-orange-400/10 text-orange-300 border-orange-400/30",
  },
  elite: {
    label: "Elite",
    range: "$2,500 – $12,000+",
    blurb:
      "Museum-grade, record-setting pieces. Hand-built shells, pyromusical sequencing and monumental set pieces for once-in-a-lifetime shows.",
    accent: "text-red-300",
    ring: "ring-red-400/40",
    badge: "bg-red-400/10 text-red-300 border-red-400/30",
  },
};

export const CATEGORIES: Record<
  Category,
  { label: string; short: string; icon: string; blurb: string }
> = {
  shells: {
    label: "Display Shells",
    short: "Shells",
    icon: "Rocket",
    blurb:
      "Aerial artillery — the heart of any high-budget show. Caliber, break pattern and star chemistry define the drama.",
  },
  cakes: {
    label: "Cake Assortments",
    short: "Cakes",
    icon: "Layers",
    blurb:
      "Multi-shot repeaters that deliver continuous choreographed sequences — density, rhythm and sky coverage between shell volleys.",
  },
  firecrackers: {
    label: "Firecrackers & Salutes",
    short: "Salutes",
    icon: "Zap",
    blurb:
      "Report effects — ground-shaking percussion and crackle texture that punctuate finales and symphonic scores.",
  },
  effects: {
    label: "Special Effects",
    short: "FX",
    icon: "Sparkles",
    blurb:
      "Waterfalls, gerbs, mines and lance set pieces — architectural fire used to frame stages, bridges, skylines and brand moments.",
  },
};

export const PRODUCTS: Product[] = [
  // ---------------- DISPLAY SHELLS ----------------
  {
    id: "shell-emperor-6",
    name: 'Emperor Peony 6" Display Shell',
    category: "shells",
    tier: "signature",
    priceMin: 85,
    priceMax: 140,
    priceUnit: "per shell",
    impact: 7.4,
    tagline: "The gold standard opening caliber",
    description:
      'A 6-inch professional peony with dense, spherical star coverage and a hard break. This is the caliber professional crews use to open premium shows — big enough to read across a full venue, cheap enough to fire in sequences of six or nine. Color purity is excellent thanks to pressed star composition, and the symmetrical break photographs beautifully for broadcast.',
    effects: ["Spherical peony break", "Dense star coverage", "Color tail options"],
    specs: {
      caliber: '6 in / 150 mm',
      duration: "4 – 6 s break",
      burstHeight: "350 – 450 ft",
      safetyRadius: "420 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Requires HDPE or fiber mortars anchored in sand-filled drums",
      "Minimum 70 ft between racked 6-inch mortar positions",
      "Electric match or e-match firing strongly recommended over hand-fire",
    ],
    bestFor: ["Show openers", "Volley sequences", "Mid-program color blocks"],
  },
  {
    id: "shell-titanium-6",
    name: 'Titanium Rain Chrysanthemum 6" (6-Pack)',
    category: "shells",
    tier: "signature",
    priceMin: 450,
    priceMax: 720,
    priceUnit: "per 6-pack",
    impact: 8.1,
    tagline: "Palm of molten metal with thunder tail",
    description:
      "A six-shell pack of chrysanthemum-break shells seeded with machine-cut titanium flakes. The burn leaves a dense palm of long-lived silver sparks that drift under their own weight before extinguishing. Titanium content makes this one of the most photogenic signature-tier effects available, and the falling-spark afterglow fills the gap before the next volley lands.",
    effects: ["Chrysanthemum palm", "Titanium rain tail", "Long spark dwell time"],
    specs: {
      caliber: '6 in / 150 mm',
      duration: "6 – 8 s incl. tail",
      burstHeight: "350 – 450 ft",
      safetyRadius: "500 ft (titanium fallout)",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Titanium fallout demands extended downwind clearance",
      "Never fire over audiences, watercraft or dry vegetation",
      "Inspect mortars for debris between shots — hot slag jams lifts",
    ],
    bestFor: ["Crowd-pleaser moments", "Broadcast close-ups", "Golden-hour sequences"],
  },
  {
    id: "shell-kamuro-8",
    name: 'Kamuro Willow 8" Japanese-Style Shell',
    category: "shells",
    tier: "flagship",
    priceMin: 320,
    priceMax: 520,
    priceUnit: "per shell",
    impact: 9.1,
    tagline: "Cascading gold veil, hand-pasted",
    description:
      'An 8-inch kamuro — the Japanese "wordless poem" — built with hand-pasted stars that burn to a thick golden veil dropping nearly the full burst height. Kamuro stars demand master-level construction: each shell is wrapped and filled over days. The result is a silence-then-awe effect, the longest-dwelling single break in the flagship tier and the one audiences remember.',
    effects: ["Golden kamuro veil", "Willow descent", "Silver core option"],
    specs: {
      caliber: '8 in / 200 mm',
      duration: "10 – 14 s descent",
      burstHeight: "500 – 650 ft",
      safetyRadius: "700 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Long descent means fallout drift is the primary hazard — compute wind vectors",
      "Fire no closer than 300 ft to any structure",
      "Requires 8-inch fiberglass mortars, tube-ins-tube inspection each use",
    ],
    bestFor: ["Emotional crescendos", "Slow musical passages", "Tribute moments"],
  },
  {
    id: "shell-pattern-8",
    name: 'Grand Finale Multi-Break Pattern 8"',
    category: "shells",
    tier: "flagship",
    priceMin: 420,
    priceMax: 680,
    priceUnit: "per shell",
    impact: 8.5,
    tagline: "Five breaks stacked in one ascent",
    description:
      "A multi-break cylinder shell carrying five sequential breaks — color peony, crossette, strobe, crackle and a finishing salute report. Pattern shells at this caliber are engineering showcases: internal timing fuses must land each break at the same altitude band. This is the shell you fire when one shot has to carry a whole musical phrase.",
    effects: ["5 sequential breaks", "Crossette split", "Strobe core", "Report finish"],
    specs: {
      caliber: '8 in / 200 mm',
      duration: "12 – 16 s total",
      burstHeight: "500 – 650 ft",
      safetyRadius: "700 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Multi-break shells carry heavier lift powder — verify mortar condition",
      "Time-fuse tolerances: never re-cut or modify factory fusing",
      "Do not rack tighter than 6 ft centers at 8-inch caliber",
    ],
    bestFor: ["Musical phrase emphasis", "Anniversary beats", "Pre-finale ramp"],
  },
  {
    id: "shell-brocade-10",
    name: 'Brocade Crown with Pistil 10"',
    category: "shells",
    tier: "flagship",
    priceMin: 550,
    priceMax: 900,
    priceUnit: "per shell",
    impact: 9.0,
    tagline: "Crown of gold around a spinning core",
    description:
      "A 10-inch two-tier effect: an outer brocade crown of gold tassels with an inner pistil of color stars and strobe. Double-petal construction at 10-inch caliber produces a dome of fire over 600 feet across — a genuinely architectural presence in the sky. Crews save these for the two or three moments in a program where the entire audience looks up at once.",
    effects: ["Brocade crown", "Inner color pistil", "Strobe nucleus"],
    specs: {
      caliber: '10 in / 250 mm',
      duration: "8 – 12 s",
      burstHeight: "600 – 750 ft",
      safetyRadius: "850 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "10-inch mortars require certified lifting team — 40 lb tubes",
      "Burst radius >500 ft: audience setback per NFPA 1123 Table 4.1.2",
      "Gun-drilled HDPE mortars only; steel tubes are prohibited",
    ],
    bestFor: ["Main-event moments", "Skyline reveals", "Broadcast hero shots"],
  },
  {
    id: "shell-double-12",
    name: 'Gen-zan Double-Petal 12" Premium',
    category: "shells",
    tier: "elite",
    priceMin: 1800,
    priceMax: 3200,
    priceUnit: "per shell",
    impact: 9.6,
    tagline: "Two concentric chrysanthemums",
    description:
      'A 12-inch gen-zan — "mountain splitting" — shell with two fully-formed concentric petals of color stars around a glitter heart. Hand-built by master shell makers, each unit is a one-off: star colorways are matched to the show palette on order. At this caliber a single break can dominate a two-mile sightline, which is why gen-zan shells close the world\u2019s most famous competitions.',
    effects: ["Double-petal chrysanthemum", "Glitter heart", "Custom colorway"],
    specs: {
      caliber: '12 in / 300 mm',
      duration: "10 – 15 s",
      burstHeight: "750 – 950 ft",
      safetyRadius: "1,050 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Site radius at 12-inch exceeds 1,000 ft — most urban venues are disqualified",
      "Requires engineered mortar pads or buried concrete emplacements",
      "Two-person certified crew minimum per mortar position",
    ],
    bestFor: ["Competition-grade finales", "National celebrations", "Legacy commissions"],
  },
  {
    id: "shell-nishiki-12",
    name: 'Nishiki Kamuro "Silver Wave" 12"',
    category: "shells",
    tier: "elite",
    priceMin: 2400,
    priceMax: 4000,
    priceUnit: "per shell",
    impact: 9.8,
    tagline: "The silver curtain every collector wants",
    description:
      "The pinnacle of kamuro artistry: a 12-inch shell whose stars burn to a silver wave that cascades in layered sheets rather than a single veil. Production is measured in weeks, not days, and shells are typically reserved years ahead by competition teams. When the wave breaks clean, the sky reads like a falling wall of mercury — the single most requested elite effect of the past decade.",
    effects: ["Layered silver wave", "Extended kamuro dwell", "Crown transition finish"],
    specs: {
      caliber: '12 in / 300 mm',
      duration: "14 – 18 s descent",
      burstHeight: "750 – 950 ft",
      safetyRadius: "1,050 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Maximum fallout duration of any catalog item — enforce full downwind sweep",
      "Fire only as an isolated shot with 15 s minimum gap either side",
      "Requires written fallout plan attached to the site permit",
    ],
    bestFor: ["Once-a-night signature moment", "Pyromusical climax", "Media showcase"],
  },
  {
    id: "shell-yarimono-16",
    name: 'Yarimono "King of Night" 16"',
    category: "shells",
    tier: "elite",
    priceMin: 5500,
    priceMax: 9000,
    priceUnit: "per shell",
    impact: 10.0,
    tagline: "The widest break fired on Earth",
    description:
      "A 16-inch yarimono — the caliber that headlines Japan\u2019s great festivals — producing a break over 1,300 feet across that hangs for the better part of a minute. Each shell weighs over 100 pounds and is fired from a steel-reinforced emplacement. This is not a product so much as a commission: ordered through the shell maker with a signed site-safety study. One shot, and the show becomes local history.",
    effects: ["Widest catalog break", "Multi-mile visibility", "Legendary kamuro variants"],
    specs: {
      caliber: '16 in / 400 mm',
      duration: "20 – 40 s dwell",
      burstHeight: "1,000 – 1,300 ft",
      safetyRadius: "1,500 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "1,500 ft radius — rural or water-launch sites only",
      "Steel-reinforced emplacement with engineered drawings required",
      "Percussion report may require local noise-ordinance waiver",
      "Insurance riders mandatory; most venues cannot host this caliber",
    ],
    bestFor: ["Historic commissions", "Festival headline moments", "Water-launch venues"],
  },

  // ---------------- CAKE ASSORTMENTS ----------------
  {
    id: "cake-dragon-36",
    name: "Dragon's Breath 36-Shot 1.3G Pro Cake",
    category: "cakes",
    tier: "signature",
    priceMin: 240,
    priceMax: 400,
    priceUnit: "per cake",
    impact: 7.7,
    tagline: "Flamethrower column in a box",
    description:
      "A 36-shot professional cake firing 1.3G powder loads in a tight vertical fan — brocade crowns, comet tails and strobe mines chained on a single fuse. Pro cakes at this spec read like a shell sequence fired in miniature, making them the budget-efficient way to guarantee continuous sky presence between volleys. Stagger two across the site and the horizon never goes dark.",
    effects: ["Brocade crown shots", "Comet tail fan", "Strobe mine base"],
    specs: {
      shots: "36 × 50 mm",
      duration: "18 – 22 s",
      burstHeight: "150 – 200 ft",
      safetyRadius: "250 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Strap to a stake or sandbag frame — recoil walks unsecured cakes",
      "Keep 50 ft minimum between adjacent cake positions",
      "Verify fuse path is clear of other products before ignition",
    ],
    bestFor: ["Volley fillers", "Stage backline", "Choreographed walls of fire"],
  },
  {
    id: "cake-vulcan-100",
    name: "Vulcan's Fury 100-Shot Pro Cake",
    category: "cakes",
    tier: "signature",
    priceMin: 380,
    priceMax: 560,
    priceUnit: "per cake",
    impact: 8.2,
    tagline: "Ninety seconds without a dark frame",
    description:
      "A hundred-shot repeater engineered for sustained pace: alternating crackling palms, color pearls and timed mines at a rate of just over one shot per second. The choreography is baked in — crews use it when they need a full musical verse covered with zero dead air. Among signature-tier products this is the highest impact-per-dollar item in the catalog.",
    effects: ["Crackling palms", "Color pearl sequins", "Timed mine risers"],
    specs: {
      shots: "100 × 30 mm",
      duration: "80 – 95 s",
      burstHeight: "120 – 160 ft",
      safetyRadius: "250 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Long burn builds heat — allow 10 min cooldown before approach",
      "Anchor both rails; 100-shot racks generate sustained recoil",
      "Inspect tube mouths for star debris before repositioning",
    ],
    bestFor: ["Sustained verse coverage", "Mid-show rhythm", "High-impact-per-dollar fill"],
  },
  {
    id: "cake-willow-60",
    name: "Horsetail Cascade 60-Shot Willow Cake",
    category: "cakes",
    tier: "flagship",
    priceMin: 560,
    priceMax: 880,
    priceUnit: "per cake",
    impact: 8.6,
    tagline: "Sixty golden waterfalls in sequence",
    description:
      "A flagship cake firing 60 slow-dwelling willow stars that drop as individual golden waterfalls. Sequenced left-to-right across a 150-foot fan, it creates the illusion of a burning curtain being drawn across the sky. Willow chemistry sacrifices brightness for dwell time, so this cake pairs best with dimming lighting and slow ballads — it is a texture piece, not a percussive one.",
    effects: ["Golden willow waterfalls", "150 ft lateral fan", "Curtain illusion"],
    specs: {
      shots: "60 × 50 mm",
      duration: "45 – 55 s",
      burstHeight: "180 – 220 ft",
      safetyRadius: "300 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Willow fallout drifts — maintain extended downwind clearance",
      "Angle no more than 15° off vertical to keep fallout inside the site",
      "Do not fire under overhangs or tree canopies",
    ],
    bestFor: ["Slow ballads", "Romantic cues", "Waterfront venues"],
  },
  {
    id: "cake-skyloom-200",
    name: "Sky Loom 200-Shot Fan Cake",
    category: "cakes",
    tier: "flagship",
    priceMin: 700,
    priceMax: 1200,
    priceUnit: "per cake",
    impact: 8.8,
    tagline: "A woven ceiling over the whole site",
    description:
      "Two hundred shots woven across a 40-degree fan in alternating layers — the firing pattern literally looms a lattice of color and crackle above the venue. At flagship tier this is the closest a single product gets to choreographed sequencing without a firing system: the internal timing produces rising and falling waves. Two units mirrored on opposite site edges produce a full-sky dome.",
    effects: ["40° woven fan", "Rising/falling wave pattern", "Crackle and color lattice"],
    specs: {
      shots: "200 × 40 mm",
      duration: "90 – 110 s",
      burstHeight: "160 – 200 ft",
      safetyRadius: "300 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Wide fan — verify neighboring product positions are outside sweep",
      "Requires level, compacted ground; fan geometry skews on slopes",
      "Sequence manual is included — do not modify factory timing chain",
    ],
    bestFor: ["Full-sky coverage", "Dance/electronic sets", "Twin-position mirroring"],
  },
  {
    id: "cake-thunder-300",
    name: "Thunder Finale Bar 300-Shot Rapid",
    category: "cakes",
    tier: "elite",
    priceMin: 2000,
    priceMax: 3500,
    priceUnit: "per bar",
    impact: 9.4,
    tagline: "Ten gallons of sky per second",
    description:
      "A 300-shot finale bar firing at up to 25 shots per second — technically a machine, built as a welded 12-tube rack with electronic ignition on all banks. At full rate the break density saturates the sky; at half rate it runs as a 90-second rolling barrage. Elite crews deploy these in rows of four to six for the last 60 seconds of a show, and nothing short of a shell volley wall matches the pressure.",
    effects: ["25 shots/sec burst mode", "Rolling barrage mode", "Saturation density"],
    specs: {
      shots: "300 × 40 mm, 12-bank",
      duration: "25 – 90 s (mode-dependent)",
      burstHeight: "150 – 190 ft",
      safetyRadius: "350 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Electronic ignition module required — included, must be bench-tested",
      "Racked bars need ballast to 3× unit weight for full-rate recoil",
      "Full-rate mode may breach local percussion limits — check permit",
    ],
    bestFor: ["Show finales", "Rolling barrages", "Massed multi-bar walls"],
  },
  {
    id: "cake-symphony",
    name: "Symphony of Fire Pyromusical Rack",
    category: "cakes",
    tier: "elite",
    priceMin: 5000,
    priceMax: 12000,
    priceUnit: "per system",
    impact: 9.9,
    tagline: "Frame-accurate fireworks, scored",
    description:
      "A complete pyromusical system: 240 effects across 8 addressing channels, fired by a DMX-locked control rack with sub-100 ms timing accuracy to an audio timecode track. The package includes show-design scripting for up to 4 minutes of music, engineering drawings for site layout, and a rehearsal module. This is how city-scale displays hit every downbeat — the entire catalog\u2019s choreography capability distilled into one product.",
    effects: ["240 effects, 8 channels", "Sub-100 ms sync", "Custom scripted cues"],
    specs: {
      shots: "240 effects / 8 channels",
      duration: "3 – 4 min scored program",
      burstHeight: "120 – 500 ft (mixed)",
      safetyRadius: "400 ft minimum site radius",
      classification: "1.3G UN0336 + 1.4G components",
      transport: "Hazmat Class 1.3G/1.4G split, licensed carrier only",
    },
    safetyNotes: [
      "Requires licensed pyrotechnician with firing-system certification on site",
      "Timecode rehearsal is mandatory — script deviations create hazards",
      "RF coordination: file frequency plan with venue management",
      "Insurance and fire-marshal sign-off on the scripted cue sheet",
    ],
    bestFor: ["Corporate flagship shows", "City celebrations", "Broadcast pyromusicals"],
  },

  // ---------------- FIRECRACKERS & SALUTES ----------------
  {
    id: "fc-reddragon",
    name: "Red Dragon 1,000-String Celebration Crackers",
    category: "firecrackers",
    tier: "signature",
    priceMin: 120,
    priceMax: 260,
    priceUnit: "per string",
    impact: 6.8,
    tagline: "Ninety seconds of rolling thunder",
    description:
      "A professional 1,000-unit cracker string burning at controlled cadence — the ceremonial texture of festivals across Asia, scaled for a premium site. Hung from a frame or tower, a full string runs roughly ninety seconds and produces a rolling band of percussion that sweeps the venue. Low cost per unit makes this the highest-duration-per-dollar sound element in the catalog.",
    effects: ["Rolling percussion sweep", "Red paper bloom", "90 s sustained texture"],
    specs: {
      duration: "80 – 95 s",
      safetyRadius: "150 ft minimum site radius",
      classification: "1.4G UN0337 display firework",
      transport: "Hazmat Class 1.4G, licensed carrier only",
    },
    safetyNotes: [
      "Suspend from rated frame — never lay on ground or drape over flammables",
      "Paper fallout: sweep site and waterways after firing",
      "Keep entire string clear of audience line of sight hang points",
    ],
    bestFor: ["Festival openings", "Cultural celebrations", "Sound texture beds"],
  },
  {
    id: "fc-thunderclap-3",
    name: 'Thunderclap Titanium Salute 3"',
    category: "firecrackers",
    tier: "signature",
    priceMin: 40,
    priceMax: 75,
    priceUnit: "per shell",
    impact: 7.8,
    tagline: "A chest-thump felt at 800 feet",
    description:
      "A 3-inch aerial salute — no color, pure report. Titanium-flash composition produces a single detonation-scale report with a white flash core. Salutes are the percussion section of a display: fired in pairs or bars of four, they punctuate musical hits and drive crowd energy. The concussive feel is why big shows still carry them despite having zero visual payload.",
    effects: ["Pure report", "White flash core", "Concussive percussion"],
    specs: {
      caliber: '3 in / 75 mm',
      duration: "Instant report",
      burstHeight: "300 – 400 ft",
      safetyRadius: "500 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Largest report-to-caliber ratio in the catalog — enforce full setback",
      "Never fire below 300 ft altitude or inside a valley wall (echo Ricochet)",
      "Hearing protection within 200 ft is mandatory for crew",
    ],
    bestFor: ["Musical hit points", "Crowd energy spikes", "Rhythmic bars"],
  },
  {
    id: "fc-maroons",
    name: "Maroon Ground Salute Pro Kit (12)",
    category: "firecrackers",
    tier: "signature",
    priceMin: 180,
    priceMax: 320,
    priceUnit: "per 12-kit",
    impact: 7.4,
    tagline: "Earthquake percussion from ground level",
    description:
      "Twelve professional maroons — boxground salutes buried in drum emplacements that turn each report into a groundwave. Maroons are the oldest theatrical sound effect in pyrotechnics: a bright flash, a flat crack, and a pressure wave the audience feels through their feet. The kit includes emplacement drums, sand fill specification and e-match pigtail leads for sequenced firing.",
    effects: ["Groundwave percussion", "Flat crack report", "Flash pulse"],
    specs: {
      duration: "Instant report × 12",
      safetyRadius: "400 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Bury drums to rim in compacted sand — never on surface",
      "Sequence spacing: 100 ft minimum between emplacements",
      "Inspect drum integrity after every shot; replace split drums",
    ],
    bestFor: ["Dramatic reveals", "Thunder effects", "Sequence punctuation"],
  },
  {
    id: "fc-skysplitter-6",
    name: 'Sky Splitter Report 6" Salute',
    category: "firecrackers",
    tier: "flagship",
    priceMin: 250,
    priceMax: 460,
    priceUnit: "per shell",
    impact: 8.9,
    tagline: "The loudest legal thing in the sky",
    description:
      'A 6-inch full-payload salute at flagship tier — the report that makes security radios flinch two sites away. Breaking at altitude, it produces a double-crack: the initial detonation followed by an echo off terrain or skyline. Used sparingly, it is the exclamation mark of a flagship program; fired in a three-shell stagger with the Symphony rack it becomes a percussion solo.',
    effects: ["Double-crack report", "Skyline echo", "White flash dome"],
    specs: {
      caliber: '6 in / 150 mm',
      duration: "Instant report",
      burstHeight: "400 – 500 ft",
      safetyRadius: "650 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Loudest catalog item — verify venue percussion ceiling in dB",
      "Do not fire within 500 ft of residences without acoustic study",
      "Crew hearing protection mandatory within 250 ft",
    ],
    bestFor: ["Program exclamations", "Percussion solos", "Sporting event cues"],
  },
  {
    id: "fc-thunderdome",
    name: "Thunder Dome Sequential Salute Wall",
    category: "firecrackers",
    tier: "elite",
    priceMin: 2800,
    priceMax: 5200,
    priceUnit: "per system",
    impact: 9.5,
    tagline: "A pressure wave with choreography",
    description:
      "Thirty-six 4-inch salutes on an electronically sequenced wall frame, fired in programmed figures — heartbeat, roll, firecrack ripple, or full-dome simultaneous. The wall converts report shells from punctuation into a composed instrument: sound designers write to it the way they write to a drum line. Elite shows use the dome mode as the physical climax under the final shell volley.",
    effects: ["Programmed figures", "Heartbeat/roll/ripple modes", "Simultaneous dome"],
    specs: {
      shots: "36 × 4 in salutes",
      duration: "Scripted, 20 – 60 s",
      burstHeight: "350 – 450 ft",
      safetyRadius: "800 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Electronic sequencing module must be certified before each show",
      "Simultaneous mode concentrates percussion — enforce 800 ft setback",
      "Structural review of mounting surface for wall installations",
    ],
    bestFor: ["Sound-designed finales", "Drum-line sync", "Stadium venues"],
  },

  // ---------------- SPECIAL EFFECTS ----------------
  {
    id: "fx-gerb-wall",
    name: "Gerb Wall Sprint — 24 Gerb Array",
    category: "effects",
    tier: "signature",
    priceMin: 280,
    priceMax: 450,
    priceUnit: "per array",
    impact: 7.3,
    tagline: "Stage-front silver jets, synchronized",
    description:
      "Twenty-four professional gerbs — silver-tail fountains — mounted as a synchronised wall array for stage fronts, runways or product reveals. Gerbs are the workhorse of close-proximity pyro: bright, crisp and safe at distances no shell could ever approach. The array fires in programmable pairs, making it the standard entrance effect for headline acts and award ceremonies.",
    effects: ["Silver jet wall", "Programmable pairs", "Close-proximity safe"],
    specs: {
      duration: "8 – 12 s per bank",
      safetyRadius: "15 ft performer separation",
      classification: "1.4G UN0431 proximate pyrotechnic",
      transport: "Hazmat Class 1.4G, licensed carrier only",
    },
    safetyNotes: [
      "Performer separation per 1.4G proximate rules — 15 ft minimum",
      "Mount only to rated hardware; jets produce real thrust",
      "Indoor use requires smoke-management sign-off",
    ],
    bestFor: ["Stage entrances", "Award reveals", "Runway moments"],
  },
  {
    id: "fx-mines",
    name: "Column of Flame Mine Quartet",
    category: "effects",
    tier: "signature",
    priceMin: 320,
    priceMax: 520,
    priceUnit: "per quartet",
    impact: 7.9,
    tagline: "Four pillars of fire, on command",
    description:
      "Four ground mines loaded with glitter and comet stars, firing simultaneous 60-foot columns from emplaced mortars. Mines are vertical emphasis: they draw the eye from stage to sky in a single frame and give the launch site itself a starring role. The quartet is wired for one-cue firing so all four columns hit together — the classic coronation frame for a headline shell immediately after.",
    effects: ["60 ft flame columns", "Glitter base", "One-cue firing"],
    specs: {
      duration: "2 – 3 s per shot",
      burstHeight: "60 ft columns",
      safetyRadius: "300 ft minimum site radius",
      classification: "1.3G UN0336 display firework",
      transport: "Hazmat Class 1.3G, licensed carrier only",
    },
    safetyNotes: [
      "Mortar emplacement must be pinned — mine recoil is severe",
      "Clear overhead: columns reach 60 ft with debris",
      "Fire before, never during, overhead shell sequences",
    ],
    bestFor: ["Headline shell frames", "Launch-site drama", "Stage-to-sky transitions"],
  },
  {
    id: "fx-letters",
    name: "Fire Script Letter Set Piece (per letter)",
    category: "effects",
    tier: "flagship",
    priceMin: 900,
    priceMax: 1800,
    priceUnit: "per letter",
    impact: 8.0,
    tagline: "Your brand, written in fire",
    description:
      "Bespoke lance-based set pieces spelling names, dates or logos — each letter is a steel frame carrying hand-lanced colored flares that ignite letter-by-letter. At flagship pricing, single words become the most shareable frame of the night: proposals, brand launches and anniversaries commission these constantly. Color palettes are matched to brand guidelines on order.",
    effects: ["Lance script", "Brand colorways", "Letter-by-letter ignition"],
    specs: {
      duration: "30 – 45 s per word",
      safetyRadius: "100 ft minimum site radius",
      classification: "1.4G UN0337 display firework",
      transport: "Hazmat Class 1.4G, licensed carrier only",
    },
    safetyNotes: [
      "Frames require engineered ground anchors or certified rigging",
      "Lance fallout drips — never mount over walkways or lawns",
      "Custom orders need 6–8 week lead time and site inspection",
    ],
    bestFor: ["Brand launches", "Proposals", "Anniversary dedications"],
  },
  {
    id: "fx-waterfall-40",
    name: "Silver Waterfall — 40 ft Set Piece",
    category: "effects",
    tier: "elite",
    priceMin: 3000,
    priceMax: 6500,
    priceUnit: "per piece",
    impact: 9.3,
    tagline: "A burning river off the bridge",
    description:
      "A 40-foot lance waterfall array built for bridges, façades and crane-hung grids — when fired, a sheet of silver fire pours downward for over a minute. Waterfalls are the most photographed non-aerial effect in the industry, and at elite tier the array is engineered to architectural spec: load calculations, weather rating and permit drawings included. The visual is slow, silent and monumental.",
    effects: ["40 ft silver sheet", "60 s continuous pour", "Architectural mounting"],
    specs: {
      duration: "60 – 75 s",
      safetyRadius: "150 ft drop-zone exclusion",
      classification: "1.4G UN0337 display firework",
      transport: "Hazmat Class 1.4G, licensed carrier only",
    },
    safetyNotes: [
      "Load-rated rigging mandatory — arrays exceed 200 lb wet",
      "Exclusion zone under pour line for full burn duration",
      "Structural engineer sign-off required for bridge mounts",
    ],
    bestFor: ["Bridges & façades", "Iconic photography", "Silent-awe moments"],
  },
  {
    id: "fx-emblem",
    name: "Lance Mesh Pictorial 'Emblem' Frame",
    category: "effects",
    tier: "elite",
    priceMin: 4200,
    priceMax: 8500,
    priceUnit: "per frame",
    impact: 9.2,
    tagline: "Portraits and logos in burning mesh",
    description:
      "The most intricate set piece in the catalog: a full lance-mesh frame that renders detailed imagery — national emblems, portraits, crests — in fire, with color-shifting lances animated by internal timing. Each frame is a bespoke fabrication project built from vector artwork you supply, with two supervised rehearsals before show night. Elite commissions treat these as permanent cultural moments, filmed and archived.",
    effects: ["Detailed fire imagery", "Color-shifting lances", "Animated reveal"],
    specs: {
      duration: "90 – 120 s",
      safetyRadius: "200 ft minimum site radius",
      classification: "1.4G UN0337 display firework",
      transport: "Hazmat Class 1.4G, licensed carrier only",
    },
    safetyNotes: [
      "8–10 week fabrication lead time from approved artwork",
      "Two certified crew minimum for install and firing",
      "Wind limit 12 mph — mesh frames are sail surfaces",
    ],
    bestFor: ["National celebrations", "Legacy commissions", "Centennial events"],
  },
];

export const SAFETY_DISTANCES = [
  {
    caliber: "Up to 3 in",
    radius: "210 ft",
    notes: "Consumer-adjacent display caliber",
  },
  {
    caliber: '4 – 6 in',
    radius: "420 – 500 ft",
    notes: "Standard municipal show calibers",
  },
  {
    caliber: '8 – 10 in',
    radius: "700 – 850 ft",
    notes: "Flagship tier — urban sites rarely qualify",
  },
  {
    caliber: '12 – 16 in',
    radius: "1,050 – 1,500 ft",
    notes: "Elite tier — rural or water-launch venues",
  },
  {
    caliber: "Ground salutes / maroons",
    radius: "400 ft + burial",
    notes: "Percussion propagates through ground",
  },
  {
    caliber: "Proximate (1.4G gerbs)",
    radius: "15 – 20 ft performer sep.",
    notes: "Indoor/outdoor stage use only",
  },
];

export const COMPLIANCE_CHECKLIST = [
  {
    title: "Licensed Pyrotechnic Operator",
    detail:
      "Every high-budget display requires a state-licensed pyrotechnic operator with caliber endorsements matching the largest shell on site. Elite-tier 12-inch-plus work additionally needs crew members holding assisting-pyrotechnician cards, and many jurisdictions require the operator to file a personal bond.",
  },
  {
    title: "NFPA 1123 Site Plan",
    detail:
      "The display site must map launch positions, mortars, fallout zones, crowd lines and emergency egress per NFPA 1123. Distances scale with the largest caliber fired — a 12-inch shell demands over 1,000 feet of site radius, which disqualifies most urban venues before budget is even discussed.",
  },
  {
    title: "ATF & Federal Licensing",
    detail:
      "US displays require an ATF Type 54 federal explosives license or permit for the purchaser, and all 1.3G product must be acquired through licensed distributors. Storage follows ATF tables; day-boxes on site must be attended and placarded. International shows follow equivalent national regimes.",
  },
  {
    title: "Insurance & Permits",
    detail:
      "High-budget shows typically carry $5M–$10M liability coverage, with riders for waterfront sites, drone filming and elite calibers. Fire-marshal permits, noise waivers for salute products and police details are line items that add 30–50% on top of product spend — plan for them from day one.",
  },
  {
    title: "Weather Protocol",
    detail:
      "Wind above 20 mph grounds most programs; elite kamuro and waterfall pieces often hold to 12 mph because of fallout drift. A written go/no-go protocol with wind, humidity and lightning thresholds protects both the audience and the investment — product cannot be re-fired once mortars are loaded.",
  },
];

export const PRIORITY_ALLOCATIONS: Record<
  Priority,
  { label: string; desc: string; alloc: Record<Category, number> }
> = {
  balanced: {
    label: "Balanced Spectacle",
    desc: "Even coverage of color, sound and architecture",
    alloc: { shells: 0.42, cakes: 0.26, firecrackers: 0.12, effects: 0.2 },
  },
  aerial: {
    label: "Aerial Dominance",
    desc: "Maximize shell caliber and break density",
    alloc: { shells: 0.58, cakes: 0.22, firecrackers: 0.1, effects: 0.1 },
  },
  finale: {
    label: "Finale Overload",
    desc: "Rolling barrages and percussion saturation",
    alloc: { shells: 0.34, cakes: 0.34, firecrackers: 0.2, effects: 0.12 },
  },
};

export function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function tierForBudget(budget: number): { tier: Tier; mix: string } {
  if (budget < 5000)
    return {
      tier: "signature",
      mix: "Signature-heavy build with selective flagship accents",
    };
  if (budget < 15000)
    return {
      tier: "flagship",
      mix: "Flagship core with signature fill and one elite statement piece",
    };
  if (budget < 50000)
    return {
      tier: "elite",
      mix: "Elite statement pieces anchored by flagship volleys",
    };
  return {
    tier: "elite",
    mix: "Full elite commission — custom shells, pyromusical rack, set pieces",
  };
}
