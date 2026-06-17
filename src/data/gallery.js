// ─── Dynamically load ALL images from gallery folder ────────────────────────
let imageModules = {};
try {
  imageModules = import.meta.glob("../assets/images/gallery/**/*.{webp,png,jpg,jpeg}", {
    eager: true,
  });
} catch (_) {
  /* glob not available — empty gallery */
}

// ─── Known metadata for images with custom captions ─────────────────────────
const known = {
  "gallery-adisham": {
    category: "temples",
    location: "Haputale",
    caption: "Adisham Bungalow nestled in the mist",
  },
  "gallery-second-leopard": {
    category: "wildlife",
    location: "Yala",
    caption: "A leopard prowling the wilderness",
  },
  "gallery-bird": {
    category: "wildlife",
    location: "Sri Lanka",
    caption: "Vibrant birdlife of the island",
  },
  "gallery-boat-ride": {
    category: "nature",
    location: "Sri Lanka",
    caption: "A serene boat ride through the waterways",
  },
  "gallery-bull": {
    category: "wildlife",
    location: "Sri Lanka",
    caption: "Wild bull roaming the grasslands",
  },
  "gallery-cart-ride": {
    category: "nature",
    location: "Sri Lanka",
    caption: "Cruising through the highland roads",
  },
  "gallery-cart": {
    category: "food",
    location: "Sri Lanka",
    caption: "A local street cart at the market",
  },
  "gallery-caultaral-dance": {
    category: "temples",
    location: "Kandy",
    caption: "Traditional Kandyan cultural dance",
  },
  "gallery-color-kovil": {
    category: "temples",
    location: "Sri Lanka",
    caption: "Vivid colours of a Hindu kovil",
  },
  "gallery-elephants-srilanka": {
    category: "wildlife",
    location: "Minneriya",
    caption: "Elephants gathering at the plains",
  },
  "gallery-elephant-family": {
    category: "wildlife",
    location: "Minneriya",
    caption: "An elephant family on the move",
  },
  "gallery-elephant-group": {
    category: "wildlife",
    location: "Minneriya",
    caption: "The great elephant gathering",
  },
  "gallery-flemingo-birds": {
    category: "wildlife",
    location: "Sri Lanka",
    caption: "Flamingos wading in the lagoon",
  },
  "gallery-leopard-resting": {
    category: "wildlife",
    location: "Yala",
    caption: "A leopard resting in the shade",
  },
  "gallery-leopard-on-tree": {
    category: "wildlife",
    location: "Yala",
    caption: "Leopard draped across a tree branch",
  },
  "gallery-loepard-resting-on-tree": {
    category: "wildlife",
    location: "Yala",
    caption: "Leopard resting on a tree branch",
  },
  "gallery-nine-arch-with-train": {
    category: "nature",
    location: "Ella",
    caption: "The long blue train crossing the Nine Arch Bridge",
  },
  "gallery-nine-arch-red-train": {
    category: "nature",
    location: "Ella",
    caption: "A red train over the Nine Arch Bridge",
  },
  "gallery-nine-arch-sideview": {
    category: "nature",
    location: "Ella",
    caption: "Nine Arch Bridge side view",
  },
  "gallery-nine-arch-sideview-second": {
    category: "nature",
    location: "Ella",
    caption: "Nine Arch Bridge alternative angle",
  },
  "gallery-nuwara-elya-post-office": {
    category: "nature",
    location: "Nuwara Eliya",
    caption: "The charming colonial post office",
  },
  "gallery-train-to-ella": {
    category: "nature",
    location: "Ella",
    caption: "Train journey to Ella in the rain",
  },
  "gallery-sigiriya-garden": {
    category: "temples",
    location: "Sigiriya",
    caption: "The ancient water gardens of Sigiriya",
  },
  "gallery-sigirya-sideview": {
    category: "temples",
    location: "Sigiriya",
    caption: "Sigiriya Rock from the side",
  },
  "gallery-sunset-with-lake": {
    category: "nature",
    location: "Sri Lanka",
    caption: "Golden sunset over the still lake",
  },
  "gallery-tea-estate": {
    category: "nature",
    location: "Nuwara Eliya",
    caption: "Rolling tea estates in the highlands",
  },
  "gallery-temple": {
    category: "temples",
    location: "Sri Lanka",
    caption: "A peaceful Buddhist temple",
  },
  "gallery-waterfall-group": {
    category: "nature",
    location: "Sri Lanka",
    caption: "Cascading waterfall hidden in the jungle",
  },
  "gallery-sigiriya": {
    category: "temples",
    location: "Sigiriya",
    caption: "The Lion Rock at first light",
  },
  "gallery-ella-train": {
    category: "nature",
    location: "Ella",
    caption: "The highland express through tea estates",
  },
  "gallery-leopard": {
    category: "wildlife",
    location: "Yala",
    caption: "A leopard at golden hour",
  },
  "gallery-mirissa-beach": {
    category: "coast",
    location: "Mirissa",
    caption: "Crescent bay sunset",
  },
  "gallery-tea-plntation": {
    category: "nature",
    location: "Nuwara Eliya",
    caption: "Endless tea estates",
  },
  "gallery-tooth-temple": {
    category: "temples",
    location: "Kandy",
    caption: "The sacred Temple of the Tooth",
  },
  "gallery-galle-fort": {
    category: "coast",
    location: "Galle Fort",
    caption: "Colonial ramparts at dusk",
  },
  "gallery-food-banana-leaves": {
    category: "food",
    location: "Kandy",
    caption: "Authentic rice and curry on banana leaves",
  },
  "gallery-beach-surfing": {
    category: "coast",
    location: "Weligama",
    caption: "Surfing the warm Indian Ocean waves",
  },
  "gallery-nine-arach": {
    category: "nature",
    location: "Ella",
    caption: "The iconic Nine Arch Bridge",
  },
  "gallery-ella-rock": {
    category: "nature",
    location: "Ella",
    caption: "Views from the summit of Ella Rock",
  },
  "gallery-ella-bridge": {
    category: "nature",
    location: "Ella",
    caption: "The famous bridge over Ella gap",
  },
  "gallery-galle-fort-street": {
    category: "coast",
    location: "Galle Fort",
    caption: "Streets within the colonial fort",
  },
  "gallery-miriss-tropical": {
    category: "coast",
    location: "Mirissa",
    caption: "Tropical vibes at Mirissa",
  },
  "gallery-tea-plantation-nuwara-eliya": {
    category: "nature",
    location: "Nuwara Eliya",
    caption: "Tea plantations stretching to the horizon",
  },
  "gallery-train-ride": {
    category: "nature",
    location: "Hill Country",
    caption: "The iconic train ride through tea country",
  },
  "gallery-nuwara-eliya": {
    category: "nature",
    location: "Nuwara Eliya",
    caption: "Misty highlands of Nuwara Eliya",
  },
  "local-food_compressed": {
    category: "food",
    location: "Sri Lanka",
    caption: "A spread of fresh local flavours",
  },
  "loepard-on-tree_compressed": {
    category: "wildlife",
    location: "Yala",
    caption: "Leopard draped across a tree branch",
  },
  "nine-arch-sideview_compressed": {
    category: "nature",
    location: "Ella",
    caption: "Nine Arch Bridge side view",
  },
  "galey-village-house": {
    category: "people",
    location: "Sri Lanka",
    caption: "Traditional village house",
  },
  "galler-guest-img": {
    category: "people",
    location: "Sri Lanka",
    caption: "Happy guests on tour",
  },
  "gallery-buddha-statue": {
    category: "temples",
    location: "Sri Lanka",
    caption: "Ancient Buddha statue",
  },
  "gallery-cart-ride-village": {
    category: "nature",
    location: "Sri Lanka",
    caption: "Village cart ride experience",
  },
  "gallery-chicken": { category: "food", location: "Sri Lanka", caption: "Local chicken curry" },
  "gallery-couple": {
    category: "people",
    location: "Sri Lanka",
    caption: "Couple enjoying Sri Lanka",
  },
  "gallery-couple-closeup": {
    category: "people",
    location: "Sri Lanka",
    caption: "Close-up portrait at the temple",
  },
  "gallery-couple-lunch": {
    category: "food",
    location: "Sri Lanka",
    caption: "Couple enjoying local lunch",
  },
  "gallery-couple-mirissa": {
    category: "coast",
    location: "Mirissa",
    caption: "Couple at Mirissa beach",
  },
  "gallery-couple-temple": {
    category: "temples",
    location: "Sri Lanka",
    caption: "Couple visiting a temple",
  },
  "gallery-couple-village-house": {
    category: "people",
    location: "Sri Lanka",
    caption: "Couple at a village home",
  },
  "gallery-deer": {
    category: "wildlife",
    location: "Sri Lanka",
    caption: "Spotted deer in the wild",
  },
  "gallery-elephmats-of-jungle": {
    category: "wildlife",
    location: "Minneriya",
    caption: "Elephant herd crossing",
  },
  "gallery-fish-market": { category: "food", location: "Negombo", caption: "Busy fish market" },
  "gallery-food": {
    category: "food",
    location: "Sri Lanka",
    caption: "Delicious Sri Lankan cuisine",
  },
  "gallery-garden": { category: "nature", location: "Sri Lanka", caption: "Lush tropical garden" },
  "gallery-god-statue": {
    category: "temples",
    location: "Sri Lanka",
    caption: "Hindu deity statue",
  },
  "gallery-group-img": { category: "people", location: "Sri Lanka", caption: "Happy tour group" },
  "gallery-guest-family": {
    category: "people",
    location: "Sri Lanka",
    caption: "Family enjoying their tour",
  },
  "gallery-guests-couple": {
    category: "people",
    location: "Sri Lanka",
    caption: "Guests at a viewpoint",
  },
  "gallery-guests-day": {
    category: "people",
    location: "Sri Lanka",
    caption: "Guests exploring the highlands",
  },
  "gallery-guests-group": {
    category: "people",
    location: "Sri Lanka",
    caption: "Group tour experience",
  },
  "gallery-guets-mountain": {
    category: "nature",
    location: "Hill Country",
    caption: "Mountain vista",
  },
  "gallery-horton-plain": {
    category: "nature",
    location: "Horton Plains",
    caption: "Horton Plains landscape",
  },
  "gallery-horton-plain-moose": {
    category: "wildlife",
    location: "Horton Plains",
    caption: "Sambar deer at Horton Plains",
  },
  "gallery-king-statue": {
    category: "temples",
    location: "Polonnaruwa",
    caption: "Ancient king statue",
  },
  "gallery-lake-ride": {
    category: "nature",
    location: "Sri Lanka",
    caption: "Boat ride on the lake",
  },
  "gallery-lake-with-boates": {
    category: "nature",
    location: "Sri Lanka",
    caption: "Lake with fishing boats",
  },
  "gallery-lanka-flag": { category: "nature", location: "Sri Lanka", caption: "Sri Lankan flag" },
  "gallery-leopard-zoomed": { category: "wildlife", location: "Yala", caption: "Leopard close-up" },
  "gallery-liptoseat-couple": {
    category: "people",
    location: "Haputale",
    caption: "Couple at Lipton's Seat",
  },
  "gallery-local-food": { category: "food", location: "Sri Lanka", caption: "Local food spread" },
  "gallery-nine-arch-sideview-second": {
    category: "nature",
    location: "Ella",
    caption: "Nine Arch Bridge alternate view",
  },
  "gallery-sigiriya-with-lake": {
    category: "temples",
    location: "Sigiriya",
    caption: "Sigiriya reflected in the moat",
  },
  "gallery-temple-img": {
    category: "temples",
    location: "Sri Lanka",
    caption: "Temple architecture detail",
  },
  "gallery-tooth-temple-door": {
    category: "temples",
    location: "Kandy",
    caption: "Ornate temple doorway",
  },
  "gallery-turtle": { category: "wildlife", location: "Sri Lanka", caption: "Sea turtle" },
  "gallery-village-cart": {
    category: "nature",
    location: "Sri Lanka",
    caption: "Traditional village cart",
  },
  "gallery-village-kitchen": {
    category: "food",
    location: "Sri Lanka",
    caption: "Village kitchen cooking",
  },
  "gallery-whale": { category: "coast", location: "Mirissa", caption: "Blue whale sighting" },
  "gallery-wild-animal": {
    category: "wildlife",
    location: "Sri Lanka",
    caption: "Wild animal in the national park",
  },
  "gallery-wild-fox": { category: "wildlife", location: "Sri Lanka", caption: "Wild fox spotted" },
};

// ─── Auto-detect remaining metadata ─────────────────────────────────────────
function detectCategory(name) {
  if (/temple|kovil|buddha|king.statue|god.statue|tooth|dance/.test(name)) return "temples";
  if (/leopard|elephant|bird|bull|deer|fox|turtle|moose|wild|flamingo/.test(name))
    return "wildlife";
  if (/beach|surf|coast|mirissa|whale|ocean/.test(name)) return "coast";
  if (/food|banana|cart|lunch|kitchen|chicken/.test(name)) return "food";
  if (/couple|guest|group|family|people|liptoseat/.test(name)) return "people";
  return "nature";
}

function makeCaption(name) {
  return name
    .replace(/^gallery-/, "")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function guessLocation(name) {
  if (/ella|nine.arch/i.test(name)) return "Ella";
  if (/sigiriya|pidurangala/i.test(name)) return "Sigiriya";
  if (/galle/i.test(name)) return "Galle Fort";
  if (/kandy|tooth/i.test(name)) return "Kandy";
  if (/mirissa|whale/i.test(name)) return "Mirissa";
  if (/nuwara|tea.estate|tea.plntation/i.test(name)) return "Nuwara Eliya";
  if (/yala|leopard/i.test(name)) return "Yala";
  if (/minneriya|elephant/i.test(name)) return "Minneriya";
  if (/haputale|adisham|liptoseat/i.test(name)) return "Haputale";
  if (/weligama|surf/i.test(name)) return "Weligama";
  return "Sri Lanka";
}

// ─── Build gallery array ────────────────────────────────────────────────────
const loaded = [];

try {
  for (const [absPath, mod] of Object.entries(imageModules)) {
    const url = (mod && mod.default) || mod;
    const filename = absPath
      .replace(/\\/g, "/")
      .split("/")
      .pop()
      .replace(/\.\w+$/, "");
    if (!filename || filename === "gallery-" || filename === "gallery") continue;

    const meta = known[filename];
    loaded.push({
      url,
      category: meta ? meta.category : detectCategory(filename),
      location: meta ? meta.location : guessLocation(filename),
      caption: meta ? meta.caption : makeCaption(filename),
    });
  }
} catch (_) {
  /* silent */
}

export const galleryImages = loaded.sort((a, b) => {
  const fa = a.caption.toLowerCase();
  const fb = b.caption.toLowerCase();
  return fa < fb ? -1 : fa > fb ? 1 : 0;
});
