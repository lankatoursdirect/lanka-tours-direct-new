// ─── Featured experience hero images (local) ─────────────────────────────────
import trainHero from "@/assets/images/features/nine-arch-with-train.webp";
import leopardHero from "@/assets/images/features/leopard-zoomed.webp";
import whaleHero from "@/assets/images/features/whale.webp";
import sigiriyaHero from "@/assets/images/destinations/sigiriya-with-lake.webp";
import ellaHero from "@/assets/images/features/nine-arch.webp";
import galleHero from "@/assets/images/features/galle-fort.webp";
import teaHero from "@/assets/images/destinations/tea-plantation-nuwara-eliya.webp";
import foodHero from "@/assets/images/features/food-banana-leaves.webp";
import peraharaHero from "@/assets/images/destinations/kandy/kandy-perahara.webp";

// ─── Category card images (local) ────────────────────────────────────────────
import leopardCat from "@/assets/images/features/leopard.webp";
import mirissaCat from "@/assets/images/destinations/mirissa-beach.webp";
import templeCat from "@/assets/images/features/tooth-temple.webp";
import foodCat from "@/assets/images/features/food.webp";
import hikingCat from "@/assets/images/features/ella-rock.webp";
import trainCat from "@/assets/images/destinations/ella-bridge.webp";

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE CATEGORIES  (icon name must match the iconMap key in Experiences.jsx)
// ─────────────────────────────────────────────────────────────────────────────
export const experienceCategories = [
  {
    icon: "Binoculars",
    title: "Wildlife & Safaris",
    tagline: "Eye-to-eye with leopards",
    image: leopardCat,
  },
  {
    icon: "Waves",
    title: "Ocean & Water",
    tagline: "2,000km of paradise",
    image: mirissaCat,
  },
  {
    icon: "Landmark",
    title: "History & Culture",
    tagline: "Walk where kings ruled",
    image: templeCat,
  },
  {
    icon: "Utensils",
    title: "Food & Local Life",
    tagline: "The flavours of Ceylon",
    image: foodCat,
  },
  {
    icon: "Mountain",
    title: "Hiking & Adventure",
    tagline: "From rafting to summits",
    image: hikingCat,
  },
  {
    icon: "TrainFront",
    title: "Iconic Train Journeys",
    tagline: "Cinematic rail through tea hills",
    image: trainCat,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FEATURED EXPERIENCES  (Alternates image left/right in the UI)
// ─────────────────────────────────────────────────────────────────────────────
export const featuredExperiences = [
  // 1 ── Train ────────────────────────────────────────────────────────────────
  {
    subtitle: "The Kandy–Ella Train",
    title: "The Most Beautiful Train Journey in the World",
    image: trainHero,
    description:
      "The 7-hour highland rail journey winds through mist-wrapped tea estates, colonial-era tunnels, and cloud-touching mountains. Travellers open the carriage doors and let their legs dangle over the valleys far below — it is one of the most iconic travel images in the world, and Sri Lanka's most unforgettable slow-travel experience.",
    tip: "Book reserved seats at least 30 days ahead — they sell out fast. Sit on the right side travelling Kandy→Ella for the best valley views. The early-morning departure catches golden light on the tea hills.",
    duration: "7 hours",
    season: "Year-round",
  },

  // 2 ── Leopard ──────────────────────────────────────────────────────────────
  {
    subtitle: "Yala Leopard Safari",
    title: "Eye to Eye with the World's Most Elusive Cat",
    image: leopardHero,
    description:
      "Unlike African safaris on open savanna, Yala's leopards live in dense scrub jungle — making encounters extraordinarily intimate. Sri Lanka has the world's highest density of wild leopards per square kilometre, and a leopard sitting just five metres from the jeep is not unusual here. No other destination offers this closeness.",
    tip: "5:30am pickup → 6am park open → 6–8am is peak leopard activity → back by noon. Block 1 gives the best sightings. Never use camera flash — it disturbs the animals and other visitors.",
    duration: "4 hours",
    season: "Feb–Jul",
  },

  // 3 ── Whale ────────────────────────────────────────────────────────────────
  {
    subtitle: "Blue Whale Watching at Mirissa",
    title: "The Largest Animal on Earth, 500 Metres Away",
    image: whaleHero,
    description:
      "Sri Lanka's southern waters are home to one of the world's highest concentrations of blue whales. A 30-metre whale surfacing just fifteen metres from the boat — exhaling a column of spray taller than a house — is an experience that genuinely changes your sense of scale. Spinner dolphins escort the boat on both the outward and return journeys.",
    tip: "6am departure, 4–5 hours at sea. Sighting rate hits 95% during the Feb–Mar peak. Take seasickness tablets the night before if you are sensitive to motion. Bring a light jacket — ocean air at dawn is surprisingly cool.",
    duration: "6 hours",
    season: "Nov–Apr",
  },

  // 4 ── Sigiriya ─────────────────────────────────────────────────────────────
  {
    subtitle: "Sigiriya at Sunrise",
    title: "1,500 Years. 200 Metres. One Extraordinary Morning.",
    image: sigiriyaHero,
    description:
      "Arriving at Sigiriya for the 6:30am opening — before the tour groups — means golden light painting the ancient rock face and mist still rising from the surrounding jungle far below. King Kassyapa built his palace atop this granite monolith in the 5th century. It remains one of the world's most dramatic ancient monuments and a UNESCO World Heritage Site.",
    tip: "Climb Pidurangala Rock (1.5km away, only $3 entry) for the definitive wide-angle Sigiriya photograph — the full rock reflected in the garden moat at dawn is the shot every travel photographer is after.",
    duration: "3 hours",
    season: "Dec–Apr",
  },

  // 5 ── Ella ─────────────────────────────────────────────────────────────────
  {
    subtitle: "Ella & the Nine Arch Bridge",
    title: "The Shot That Made a Million Travellers Book Sri Lanka",
    image: ellaHero,
    description:
      "The Nine Arch Bridge is Sri Lanka's most photographed structure — a colonial-era stone viaduct cutting through hills thick with emerald tea bushes. Standing at the viewpoint as the blue train curves across its nine arches is one of those travel moments that stays with you for decades. Pair it with the Little Adam's Peak hike for a perfect half-day in the hills above Ella town.",
    tip: "Arrive at the bridge viewpoint at exactly 8:50am or 4:15pm — those are the scheduled train crossing times. The walk from Ella town takes 25 minutes through working tea estates. No guide needed for this one.",
    duration: "Half day (4–5 hrs)",
    season: "Year-round",
  },

  // 6 ── Galle ────────────────────────────────────────────────────────────────
  {
    subtitle: "Galle Fort at Golden Hour",
    title: "Four Centuries of History. One Perfect Sunset.",
    image: galleHero,
    description:
      "Built by the Portuguese in 1589 and expanded by the Dutch in 1663, Galle Fort is a UNESCO World Heritage Site that is still lived in today. Boutique hotels, galleries, and cafes line its 400-year-old cobblestone streets, while the Indian Ocean crashes against the ancient rampart walls just metres below. At sunset the entire Fort turns the colour of warm honey.",
    tip: "Walk the full rampart circuit at 5:30pm — the lighthouse silhouette against the orange sky is the defining photograph of the Sri Lankan south coast. The circuit is 1.5km, completely flat, and takes around 40 minutes.",
    duration: "2–3 hours",
    season: "Nov–Apr",
  },

  // 7 ── Tea Country ──────────────────────────────────────────────────────────
  {
    subtitle: "Ceylon Tea Highlands, Nuwara Eliya",
    title: "Where Every Hill is a Different Shade of Green.",
    image: teaHero,
    description:
      "The central highlands of Sri Lanka produce some of the finest tea on earth — and look extraordinary doing it. Rolling hills carpeted in bright green tea bushes, misty valleys at dawn, and colonial-era plantation bungalows create the island's most visually distinctive landscape. A working factory tour shows every step of the journey from hand-plucked leaf to freshly brewed cup.",
    tip: "Visit Pedro or Mackwoods Estate for free factory tours. Go at 7am when mist still sits in the valleys and the light is soft and golden across the tea bushes. The winding drive up from Kandy alone is worth an early start.",
    duration: "Full day",
    season: "Dec–Apr",
  },

  // 8 ── Food ─────────────────────────────────────────────────────────────────
  {
    subtitle: "Markets, Kitchens & Villages",
    title: "Sri Lanka's Flavours Will Change How You Think About Curry.",
    image: foodHero,
    description:
      "Rice and curry served on a banana leaf with twelve small dishes arranged around it. Hoppers — bowl-shaped rice flour crepes — eaten at 7am roadside stalls while the town wakes up around you. Kottu roti chopped rhythmically on a hot iron griddle, the metallic sound carrying half a street away. Sri Lankan food is one of the world's great undiscovered cuisines, and your guide knows exactly where the locals eat.",
    tip: "Always ask your guide to take you where locals eat — not the tourist restaurants near the main sites. A full banana leaf rice and curry with twelve dishes costs around LKR 600 ($2) and will be the best meal of your entire trip.",
    duration: "3–4 hours",
    season: "Year-round",
  },

  // 9 ── Kandy Perahera ───────────────────────────────────────────────────────
  {
    subtitle: "The Kandy Esala Perahera",
    title: "Asia's Most Vibrant, Ancient, and Majestic Cultural Pageant",
    image: peraharaHero,
    description:
      "For ten nights every summer, the streets of Kandy transform into a mesmerizing sea of fire, rhythm, and color. Honoring the Sacred Tooth Relic of Lord Buddha, this centuries-old pageant brings together hundreds of traditional Kandyan dancers, dynamic fire-twirlers, energetic drummers, and beautifully adorned majestic elephants. It is a powerful, sensory explosion of living history and deep-rooted spiritual devotion.",
    tip: "The festival peaks on the final night (Randoli Perahera). Seats along the street route sell out months in advance, so secure a balcony spot early. Arrive by mid-afternoon to avoid heavy street closures around the Lake and Temple area.",
    duration: "4–5 hours per night",
    season: "Jul–Aug",
  },
];