import sigiriya from "@/assets/images/features/sigiriya.webp";
import ellaTrain from "@/assets/images/features/ella-train.webp";
import leopard from "@/assets/images/features/leopard.webp";
import mirissa from "@/assets/images/features/mirissa.webp";
import galleFort from "@/assets/images/features/galle-fort.webp";
import ellaRock from "@/assets/images/features/ella-rock.webp";
import nineArch from "@/assets/images/features/nine-arch.webp";
import teaPlantation from "@/assets/images/features/tea-plntation.webp";
import whale from "@/assets/images/features/whale.webp";
import mirissaBeach from "@/assets/images/destinations/mirissa-beach.webp";
import ellaRockDest from "@/assets/images/destinations/ella-rock.webp";

// ─── DATA SCHEMA (every tour should follow this shape) ───────────────────────
//
//  slug            string    URL key e.g. "island-sampler"
//  title           string    Full display title
//  titleMain       string    Title prefix (rendered white)
//  titleAccent     string    Title suffix (rendered italic gold)
//  tagline         string    One-liner shown in hero
//  categoryDisplay string    Readable category label
//  category        string    Machine-readable filter key
//  duration        number    Total days
//  nights          number    Total nights (duration - 1 if omitted)
//  groupType       string    "Private" | "Small Group" etc.
//  regions         string[]  Region labels for at-a-glance strip
//  coverImage      import    Hero image (webp import)
//  description     string    Overview paragraph
//  highlights      string[]  Sidebar checklist
//  route           string[]  Ordered stop names
//  itinerary       DayObj[]  See below
//  includes        string[]  What's covered
//  excludes        string[]  What's not covered
//  customiseOptions string[] Customise section pills
//  featured        boolean   Show on homepage featured section
//
//  DayObj shape:
//    day           number
//    title         string
//    overnight     string | null
//    departure     boolean (optional)
//    driveTime     string  (optional)
//    bestMoment    string  (optional)
//    note          string  (optional)
//    activities    string[]


// ─── 5 DAYS / 4 NIGHTS — THE ISLAND SAMPLER ─────────────────────────────────
const islandSampler = {
  slug: "island-sampler",
  title: "Sri Lanka in 5 Days",
  titleMain: "Sri Lanka",
  titleAccent: "in 5 Days",
  tagline:
    "Culture, mountains, wildlife and waves — Sri Lanka's greatest hits in one seamless private journey.",
  categoryDisplay: "Classic Circuit",
  category: "classic-circuit",
  duration: 5,
  nights: 4,
  groupType: "Private",
  regions: ["Hill Country", "South Coast"],
  coverImage: ellaTrain,
  description:
    "From Kandy's ancient temples and misty tea plantations to Ella's iconic nine-arch bridge, Yala's leopard-stalked plains, and the deep-blue bays of Mirissa — this 5-day journey hits Sri Lanka's greatest hits in one seamless private trip. Perfect for first-time visitors who want culture, scenery, wildlife, and beach without compromise. Every element can be adapted to your pace, interests, and group size.",
  highlights: [
    "Scenic Hill Country Train Journey (Nanu Oya → Ella)",
    "Ella Mountain Experience",
    "Yala Wildlife Safari",
    "Blue Whale Watching",
    "Beautiful Southern Beaches",
    "Temple of the Tooth Relic",
    "Pinnawala Elephant Orphanage",
  ],
  route: ["Airport", "Kandy", "Nuwara Eliya", "Ella", "Yala", "Mirissa", "Airport"],
  itinerary: [
    {
      day: 1,
      title: "Airport → Kandy",
      overnight: "Kandy",
      driveTime: "3–4 hrs from Colombo airport to Kandy",
      bestMoment:
        "Elephants crossing the Maha Oya river at Pinnawala — visit around 10 AM or 2 PM for the bathing ritual. There is nothing quite like watching 90+ elephants splash and play in the river while the mahouts stand by. It is chaotic, joyful, and completely unforgettable.",
      activities: [
        "Airport pickup & warm welcome from your private driver-guide",
        "Pinnawala Elephant Orphanage — watch the world's largest captive elephant herd bathe in the river",
        "Spice Garden visit with tasting session — cinnamon, pepper, cloves and more",
        "Kandy city tour — scenic lake, local markets, Kandy View Point",
        "Temple of the Tooth Relic (Sri Dalada Maligawa)",
        "Evening: Traditional Kandyan Cultural Dance Show",
      ],
    },
    {
      day: 2,
      title: "Kandy → Nuwara Eliya → Ella",
      overnight: "Ella",
      driveTime: "~5 hrs total including stops through hill country",
      bestMoment:
        "A blue train rolling across the Nine Arch Bridge through jungle canopy — late afternoon light is ideal. Stand on the upper path above the bridge and wait for the 6:41 PM train. The sound of the whistle echoing through the valley just before it appears from the tunnel is something every visitor remembers long after they leave.",
      note:
        "The scenic hill-country train currently operates reliably on the Nanu Oya → Ella segment (via Ohiya, Idalgashinna, Haputale, Bandarawela). We drive you from Kandy through Nuwara Eliya to Nanu Oya, where you board the train for the most scenic 2-hour section into Ella. Train travel is subject to Sri Lanka Railways operational conditions and seat availability — we confirm and book all seats in advance.",
      activities: [
        "Drive through emerald tea country — rolling hills and misty valleys",
        "Tea plantation & factory visit — see Ceylon tea from leaf to cup",
        "Ramboda View Point — panoramic view of three cascading waterfalls",
        "Nuwara Eliya — Gregory Lake & colonial-era town",
        "Drive to Nanu Oya station for the scenic hill country train departure",
        "Scenic train journey: Nanu Oya → Ohiya → Idalgashinna → Haputale → Bandarawela → Ella (~2 hrs)",
        "Nine Arch Bridge — Sri Lanka's most photographed landmark",
        "Evening: Little Adam's Peak hike for sunset panoramas",
      ],
    },
    {
      day: 3,
      title: "Ella → Yala National Park",
      overnight: "Yala / Tissamaharama",
      driveTime: "~3 hrs Ella to Yala gate",
      bestMoment:
        "A leopard resting in a palu tree at golden hour — Yala's defining image. Sri Lanka has the highest density of wild leopards on Earth, and Yala Block 1 is your best chance to see one up close. Ask your guide to scan the palu and weera trees along the dry zone scrubland as the afternoon light turns gold.",
      activities: [
        "Morning: Visit Ravana Falls — a dramatic multi-tiered cascade near Ella",
        "Scenic drive south through the Sri Lankan heartland",
        "Half Day Yala safari (2:00 PM start) — world's highest density of leopards",
        "Wildlife: leopards, elephants, sloth bears, crocodiles & 200+ bird species",
      ],
    },
    {
      day: 4,
      title: "Yala → Mirissa / Weligama",
      overnight: "Mirissa",
      driveTime: "~2.5 hrs along the southern coast",
      bestMoment:
        "Sunset from Parrot Rock above Mirissa with the crescent bay spread below you. Climb the rocky outcrop at the western end of the beach about 30 minutes before sunset and watch the fishing boats head out as the sky turns pink and orange over the Indian Ocean. It is one of the most peaceful moments you will find anywhere in Sri Lanka.",
      activities: [
        "Scenic southern coastal drive along Sri Lanka's most beautiful shoreline",
        "Coconut Tree Hill — iconic cliff-top palm grove overlooking Mirissa bay",
        "Relax at Mirissa Beach or the gentle surf of Weligama",
        "Free time: swim, snorkel, or simply unwind on the sand",
        "Optional: stilt fishermen visit at Koggala",
      ],
    },
    {
      day: 5,
      title: "Whale Watching → Turtle Hatchery → Airport",
      overnight: null,
      departure: true,
      driveTime: "~2.5 hrs Mirissa to airport (via Galle optional)",
      bestMoment:
        "A blue whale surfacing and exhaling at sunrise — an experience that stays with you for life. Mirissa sits at one of the world's best blue whale corridors. When the boat engine cuts and that enormous back breaks the surface just metres away, followed by a spout of mist shooting into the morning air, the silence on the boat is absolute. Everyone is simply stunned.",
      activities: [
        "Early morning Blue Whale Watching Tour — Mirissa is among the world's finest blue whale destinations",
        "Turtle Hatchery visit — rescued sea turtles being nursed and released",
        "Optional: Galle Dutch Fort (UNESCO) en route north",
        "Transfer to Bandaranaike International Airport for your onward flight",
      ],
    },
  ],
  includes: [
    "Private air-conditioned vehicle throughout",
    "English-speaking private driver-guide",
    "All fuel and road tolls",
    "Airport pickup on arrival",
    "Airport drop-off on departure",
    "Train ticket arrangement — Nanu Oya → Ella (subject to Sri Lanka Railways availability)",
  ],
  excludes: [
    "Hotel accommodation (we can recommend options)",
    "Entry tickets to parks and attractions",
    "Meals and beverages",
    "International flights",
    "Travel insurance",
  ],
  customiseOptions: [
    "Adjust pacing",
    "Swap destinations",
    "Add extra days",
    "Family-friendly options",
    "Honeymoon upgrades",
    "Adventure add-ons",
    "Extend to 7 or 10 days",
  ],
  featured: true,
};


// ─── 7 DAYS / 6 NIGHTS — DISCOVER SRI LANKA ─────────────────────────────────
const discoverSriLanka7 = {
  slug: "discover-sri-lanka-7",
  title: "Discover Sri Lanka in 7 Days",
  titleMain: "Discover Sri Lanka",
  titleAccent: "in 7 Days",
  tagline: "Culture · Nature · Wildlife · Hill Country · Beaches",
  categoryDisplay: "Classic Circuit",
  category: "classic-circuit",
  duration: 7,
  nights: 6,
  groupType: "Private",
  regions: ["Cultural Triangle", "Hill Country", "South Coast"],
  coverImage: sigiriya,
  description:
    "A perfectly balanced week that takes you from the ancient cave temples of Dambulla and the majestic Lion Rock of Sigiriya, through the misty tea country of Kandy and Nuwara Eliya, to the scenic mountain village of Ella — finishing on Sri Lanka's glorious southern coast at Tangalle and the UNESCO-listed Galle Fort. Seven days, six completely different landscapes, one extraordinary island.",
  highlights: [
    "Dambulla Cave Temple",
    "Sigiriya Lion Rock",
    "Elephant Safari",
    "Scenic Hill Country Train (Nanu Oya → Ella)",
    "Nine Arches Bridge",
    "Ravana Falls",
    "Tangalle Beach",
    "Galle Dutch Fort",
    "Ayurvedic Wellness",
  ],
  route: [
    "Airport / Negombo",
    "Sigiriya",
    "Kandy",
    "Nuwara Eliya",
    "Ella",
    "Tangalle",
    "Galle",
    "Airport",
  ],
  itinerary: [
    {
      day: 1,
      title: "Airport / Negombo → Sigiriya",
      overnight: "Sigiriya",
      driveTime: "~3.5 hrs from Colombo airport to Sigiriya",
      bestMoment:
        "Stepping inside the first Dambulla cave as your eyes adjust to the dim light and hundreds of golden Buddha statues slowly emerge from the shadows — a moment of genuine awe that no photograph can fully prepare you for.",
      activities: [
        "Airport or Negombo pickup by your private driver-guide",
        "Transfer to Sigiriya — gateway to the Cultural Triangle",
        "Visit Dambulla Cave Temple — five magnificent caves adorned with ancient murals",
        "Enjoy a traditional village experience by bullock cart or bicycle",
        "Optional Sri Lankan cultural dance show in the evening",
        "Check in and relax at your Sigiriya hotel",
      ],
    },
    {
      day: 2,
      title: "Sigiriya Adventure Day",
      overnight: "Sigiriya",
      driveTime: "Local transfers only",
      bestMoment:
        "The sunrise over the Cultural Triangle plains from the summit of Pidurangala Rock — arrive by 5:30 AM. You will stand above the jungle canopy as the mist peels back to reveal Sigiriya Rock glowing amber in the first light, with lakes and ancient reservoirs shimmering below. Locals say this is the best free view in all of Sri Lanka — and they are right.",
      activities: [
        "Early morning Pidurangala Rock sunrise hike — stunning panoramic views over Sigiriya",
        "Full visit to Sigiriya Lion Rock Fortress — UNESCO World Heritage Site",
        "Half Day elephant safari (2:00 PM start) — Minneriya, Kaudulla, or Eco Park (seasonal best)",
        "Evening Ayurvedic herbal oil massage",
      ],
    },
    {
      day: 3,
      title: "Sigiriya → Kandy",
      overnight: "Kandy",
      driveTime: "~2.5 hrs Sigiriya to Kandy via Matale",
      bestMoment:
        "The moment you enter the inner shrine of the Temple of the Tooth Relic during evening Puja — drums thunder, incense fills the air, and worshippers press forward with flowers and prayers around the golden casket that houses the most sacred relic in the Buddhist world.",
      activities: [
        "Transfer to Kandy via Matale",
        "Visit Matale Hindu Temple — striking Dravidian architecture",
        "Scenic hill country journey through spice gardens and jungle",
        "Kandy View Point — panoramic overview of the highland capital",
        "Explore Temple of the Tooth Relic (Sri Dalada Maligawa)",
        "Free time in Kandy city — lakeside walk, local markets",
      ],
    },
    {
      day: 4,
      title: "Kandy → Nuwara Eliya",
      overnight: "Nuwara Eliya",
      driveTime: "~2 hrs Kandy to Nuwara Eliya through tea country",
      bestMoment:
        "Mist rolling over endless rows of tea bushes at dawn — Nuwara Eliya at its most magical. Pull over on the Kandy–Nuwara Eliya road just after Ramboda and step out of the vehicle. The cool mountain air, the smell of fresh tea leaves, and a Tamil tea plucker working her way across the hillside in a colourful sari is a scene that feels timeless.",
      activities: [
        "Scenic drive through beautiful tea plantations — windows down, fresh mountain air",
        "Tea factory & tea plantation visit — see the full Ceylon tea production process",
        "Tea tasting experience with expert guidance",
        "Visit Ramboda Waterfall — spectacular three-tiered cascade",
        "Relax at Gregory Lake — paddle boats, waterside cafés",
        "Explore Nuwara Eliya city — colonial bungalows and cool mountain air",
      ],
    },
    {
      day: 5,
      title: "Nuwara Eliya → Nanu Oya → Ella",
      overnight: "Ella",
      driveTime: "~1 hr drive Nuwara Eliya to Nanu Oya station; ~2 hr train to Ella",
      note:
        "The hill-country scenic train currently operates reliably on the Nanu Oya → Ella segment (via Ohiya, Idalgashinna, Haputale, Bandarawela). We drive you from Nuwara Eliya to Nanu Oya station and board the train there for the most spectacular section of the journey. Train travel is subject to Sri Lanka Railways operational conditions — we verify schedules and book all seats well in advance.",
      bestMoment:
        "Hanging out of the open train door as the highland scenery scrolls past — one of the world's great short rail journeys. The stretch from Nanu Oya through Ohiya and down through the cloud forest to Ella takes you past waterfalls, over colonial-era viaducts, and through tea country so green it barely seems real. Keep your camera ready for the views from Idalgashinna as the train descends toward the southern plains.",
      activities: [
        "Morning: explore Nuwara Eliya at your own pace",
        "Drive to Nanu Oya station and board the scenic train (passing Pattipola — the highest railway station in Sri Lanka at 1,898 m)",
        "Board the scenic hill country train: Nanu Oya → Ohiya → Idalgashinna → Haputale → Bandarawela → Ella (~2 hrs)",
        "Visit Nine Arches Bridge — the crown jewel of Sri Lanka's railway heritage",
        "Hike Little Adam's Peak — easy trail with spectacular valley views",
        "Relax and enjoy the laid-back atmosphere of Ella village",
        "Sunset views from the ridge above town",
      ],
    },
    {
      day: 6,
      title: "Ella → Tangalle",
      overnight: "Tangalle",
      driveTime: "~3 hrs Ella to Tangalle via Ravana Falls",
      bestMoment:
        "Arriving at Tangalle Beach in the late afternoon when the fishing fleet is returning — brightly painted oruwa outrigger canoes being pulled ashore by fishermen as the golden light hits the water. Tangalle has none of the crowds of the west coast, and this moment feels like discovering Sri Lanka's best-kept secret.",
      activities: [
        "Transfer south to Sri Lanka's beautiful southern coast",
        "Visit Ravana Falls — one of the widest waterfalls in the country",
        "Optional Kalametiya Bird Sanctuary visit — a hidden lagoon with superb birdlife",
        "Relax at Tangalle Beach — golden sands, calm waters, fewer crowds",
        "Free time for swimming and beach relaxation",
      ],
    },
    {
      day: 7,
      title: "Tangalle → Galle → Airport",
      overnight: null,
      departure: true,
      driveTime: "~3.5 hrs Tangalle to airport via Galle",
      bestMoment:
        "Walking the ramparts of Galle Fort at sunrise, when the old town is still quiet and the lighthouse stands against a pale pink sky over the Indian Ocean. The Dutch built these walls in the 1600s, and standing on top of them with the sea breeze in your face, looking back over the red-tiled rooftops, you feel the full weight of that history.",
      activities: [
        "Leisurely morning departure along the southern coastline",
        "Visit Galle Dutch Fort — UNESCO World Heritage Site, Dutch colonial ramparts and cobbled streets",
        "Optional Madu River Boat Safari — mangroves, bird islands, cinnamon farms",
        "Optional Turtle Hatchery visit at Kosgoda",
        "Airport drop-off at Bandaranaike International Airport",
      ],
    },
  ],
  includes: [
    "Private air-conditioned vehicle throughout",
    "English-speaking private driver-guide",
    "All fuel and road tolls",
    "Airport pickup on arrival",
    "Airport drop-off on departure",
    "Train ticket arrangement — Nanu Oya → Ella (subject to Sri Lanka Railways availability)",
  ],
  excludes: [
    "Hotel accommodation (we can recommend options)",
    "Entry tickets to parks and attractions",
    "Meals and beverages",
    "International flights",
    "Travel insurance",
  ],
  customiseOptions: [
    "Adjust pacing",
    "Swap destinations",
    "Add beach days",
    "Family-friendly options",
    "Honeymoon upgrades",
    "Extend to 10 days",
  ],
  featured: true,
};


// ─── 10 DAYS / 9 NIGHTS ──────────────────────────────────────────────────────
const sriLanka10Days = {
  slug: "sri-lanka-10-days",
  title: "Sri Lanka 10 Days / 9 Nights",
  titleMain: "Sri Lanka",
  titleAccent: "10 Days",
  tagline:
    "Culture, nature, adventure, wildlife, hill country & beach relaxation — the complete experience.",
  categoryDisplay: "Grand Circuit",
  category: "classic-circuit",
  duration: 10,
  nights: 9,
  groupType: "Private",
  regions: ["Cultural Triangle", "Hill Country", "South Coast"],
  coverImage: teaPlantation,
  description:
    "Ten days is the sweet spot for experiencing Sri Lanka in full — enough time to go deep into each region without feeling rushed. This itinerary takes you from the ancient rock fortress of Sigiriya and the jungle safaris of Minneriya, through the mist-wrapped tea country of Kandy and Nuwara Eliya, to Ella's mountain village, the wild beaches of Rekawa with its nesting sea turtles, and finally the whale grounds of Mirissa and the colonial grandeur of Galle Fort.",
  highlights: [
    "Sigiriya Lion Rock",
    "Pidurangala Sunrise",
    "Ayurvedic Massage",
    "Scenic Hill Country Train (Nanu Oya → Ella)",
    "Ella Eco Trekking",
    "Nine Arches Bridge",
    "Night Turtle Watching (Rekawa)",
    "Whale Watching",
    "Galle Dutch Fort",
    "Ravana Falls",
  ],
  route: [
    "Airport",
    "Sigiriya",
    "Kandy",
    "Nuwara Eliya",
    "Ella",
    "Rekawa",
    "Mirissa / Weligama",
    "Galle",
    "Airport",
  ],
  itinerary: [
    {
      day: 1,
      title: "Airport / Negombo → Sigiriya",
      overnight: "Sigiriya",
      driveTime: "~3.5 hrs from Colombo airport",
      bestMoment:
        "Your first glimpse of Sigiriya Rock through the trees as you approach from the highway — this massive monolith rising 200 metres straight out of the flat jungle floor stops every first-time visitor mid-sentence. Nothing you see in a photograph quite prepares you for the sheer scale of it in real life.",
      activities: [
        "Airport pickup & warm welcome",
        "Visit Dambulla Royal Cave Temple — ancient murals and Buddha statues inside five cave shrines",
        "Evening hike to Pidurangala Rock — spectacular sunset views over the Cultural Triangle plains",
        "Check in and relax at hotel",
      ],
    },
    {
      day: 2,
      title: "Sigiriya Experience",
      overnight: "Sigiriya",
      driveTime: "Local transfers only",
      bestMoment:
        "The Lion Paws gateway on the ascent to Sigiriya — monumental scale, extraordinary preservation. You pass through the paws of a colossal brick lion that once stood guard over the final staircase to King Kashyapa's sky palace. Fifteen hundred years old, and they still command complete respect.",
      activities: [
        "Visit Sigiriya Lion Rock Fortress — climb the UNESCO World Heritage 5th-century rock citadel",
        "Sri Lankan Village Tour — bullock cart ride, local family lunch, toddy tapping",
        "Full Day elephant safari (5:30 AM start) — Minneriya, Kaudulla, or Eco Park (seasonal)",
        "Ayurveda herbal oil massage — traditional Sri Lankan wellness treatment",
      ],
    },
    {
      day: 3,
      title: "Sigiriya → Kandy",
      overnight: "Kandy",
      driveTime: "~2.5 hrs Sigiriya to Kandy",
      bestMoment:
        "The ancient Polonnaruwa Vatadage — a perfectly circular relic house with intricate stone carvings, four seated Buddha statues facing the cardinal directions, and moonstone steps worn smooth by centuries of pilgrims. Stand at the centre and look up at the open roof against the blue sky — it is one of the finest moments of ancient architecture in Asia.",
      activities: [
        "Visit ancient Polonnaruwa City (optional detour, +1.5 hrs) — medieval royal palace and colossal Buddha statues",
        "Travel to Kandy via Matale",
        "Visit the famous Matale Hindu Temple — elaborate Dravidian-style architecture",
        "Explore the colourful temple courtyard and cultural heritage of Matale",
        "Evening Cultural Dance Show in Kandy",
      ],
    },
    {
      day: 4,
      title: "Kandy City Tour",
      overnight: "Kandy",
      driveTime: "Local transfers",
      bestMoment:
        "Watching the evening Puja ceremony at the Temple of the Tooth Relic as the drums begin — the heartbeat rhythm fills the courtyard, the smell of frangipani and incense drifts through the air, and the golden doors of the inner shrine slowly open to reveal the relic chamber. This ceremony has happened every single day for over a thousand years.",
      activities: [
        "Visit Temple of the Tooth Relic — home of the sacred Buddha tooth relic",
        "Kandy View Point — panoramic vista over the highland capital",
        "Royal Botanical Garden, Peradeniya — 60 acres of exotic flora",
        "Bahirawakanda Temple — hilltop white Buddha statue with city views",
        "Evening: lakeside walk and local dining",
      ],
    },
    {
      day: 5,
      title: "Kandy → Nuwara Eliya → Nanu Oya → Ella",
      overnight: "Ella",
      driveTime: "~3 hrs drive Kandy to Nanu Oya via Nuwara Eliya; ~2 hrs train Nanu Oya to Ella",
      note:
        "The scenic hill-country train currently operates reliably on the Nanu Oya → Ella segment (via Ohiya, Idalgashinna, Haputale, Bandarawela). We drive through Nuwara Eliya to Nanu Oya station where you board the scenic train. The route passes Pattipola — the highest railway station in Sri Lanka at 1,898 m — on the way to Ella. Train travel is subject to Sri Lanka Railways operational conditions. We verify schedules and book all seats well in advance of your tour date.",
      bestMoment:
        "Watching the blue locomotive emerge from mist-covered jungle as it crosses the Nine Arch Bridge. Position yourself on the upper viewing path about 20 minutes before the 6:41 PM crossing. The jungle is backlit by the fading sun, then the whistle sounds from inside the Demodara tunnel, and the train appears — a moment that defines the Sri Lanka everyone comes to find.",
      activities: [
        "Tea Plantation & Tea Factory visit en route — the full story of Ceylon tea",
        "Tea tasting and tea-plucking experience",
        "Ramboda View Point — three waterfalls visible in one panoramic sweep",
        "Visit Nuwara Eliya — Gregory Lake, colonial post office, colourful gardens",
        "Drive to Nanu Oya station and board the scenic train (passing Pattipola — the highest railway station in Sri Lanka)",
        "Board scenic hill country train: Nanu Oya → Ohiya → Idalgashinna → Haputale → Bandarawela → Ella (~2 hrs)",
        "Arrive Ella; check in and explore the village",
      ],
    },
    {
      day: 6,
      title: "Ella Adventure Day",
      overnight: "Ella",
      driveTime: "Walking / tuk-tuk locally",
      bestMoment:
        "The golden hour light flooding the valley from Little Adam's Peak ridge. Reach the summit about 45 minutes before sunset and watch the light shift from white to amber to deep orange across the Ella Gap. The whole valley glows, the tea estates turn to fire, and you can see all the way to the southern plains on a clear evening — this is why people fall in love with Ella.",
      activities: [
        "Ella Eco Trekking — guided nature walk through jungle and tea estates",
        "Café time and relaxation in Ella village",
        "Evening hike to Little Adam's Peak — 360° sunset views over the valley",
        "Nine Arch Bridge visit — catch the 6:41 PM train crossing if timing allows",
      ],
    },
    {
      day: 7,
      title: "Ella → Rekawa",
      overnight: "Rekawa",
      driveTime: "~3 hrs Ella to Rekawa",
      bestMoment:
        "The stretch of road between Wellawaya and Hambantota where the dry zone suddenly opens up and you spot wild elephants grazing right by the roadside — this is Sri Lanka away from the tour buses, raw and real. Keep your eyes on the scrubland as you head south and you will almost certainly see them.",
      activities: [
        "Visit Nine Arches Bridge — Sri Lanka's most iconic railway structure",
        "Visit Ravana Falls — thundering multi-tiered waterfall",
        "Visit Buduruwagala Temple — 9th-century rock-carved Buddha reliefs",
        "Relax at Rekawa Beach — quiet, unspoilt, a hidden gem",
      ],
    },
    {
      day: 8,
      title: "Rekawa Beach & Night Turtle Watching",
      overnight: "Rekawa",
      driveTime: "Local only",
      bestMoment:
        "Watching a leatherback turtle emerge silently from the ocean to lay eggs under a starlit sky. Rekawa is one of the very few places in the world where you can witness this completely undisturbed — no bright lights, no crowds, just you, a conservation ranger, and a 300-kilogram sea turtle digging her nest in silence while the Indian Ocean breaks softly behind her. It is a deeply moving experience.",
      activities: [
        "Full day beach relaxation — swimming, reading, beach café",
        "🐢 Night Turtle Watching Experience (from 8:00 PM onwards)",
        "Visit Rekawa Turtle Conservation Project — world-class community-run conservation site",
        "Watch sea turtles laying eggs naturally on the beach under expert guidance",
        "Learn about turtle species and conservation efforts",
      ],
    },
    {
      day: 9,
      title: "Rekawa → Mirissa / Weligama",
      overnight: "Mirissa / Weligama",
      driveTime: "~1.5 hrs along the southern coast",
      bestMoment:
        "The view from Coconut Tree Hill at Mirissa just before sunset — a cluster of tall palms arching dramatically over a turquoise crescent bay, with fishing boats anchored below and the horizon stretching endlessly into the Indian Ocean. It is the image that defines Sri Lanka's south coast and it is even more beautiful in person.",
      activities: [
        "Visit Hummanaya Blow Hole — Sri Lanka's largest natural blowhole, spectacular at high tide",
        "Visit Coconut Tree Hill — iconic golden palms curving over turquoise ocean",
        "Relax at Mirissa or Weligama Beach — great swimming, surf, and seafood",
        "Enjoy sunset and evening at beachside cafés",
      ],
    },
    {
      day: 10,
      title: "Mirissa / Weligama → Galle → Airport",
      overnight: null,
      departure: true,
      driveTime: "~2.5 hrs Mirissa to airport via Galle",
      bestMoment:
        "A blue whale's fluke disappearing into the Indian Ocean at dawn. Mirissa sits directly on the blue whale migration corridor, and between November and April the sightings are almost guaranteed. When the captain cuts the engine, the ocean goes quiet, and that enormous grey back rolls slowly to the surface just 30 metres from the boat — you will understand exactly why people travel across the world for this moment.",
      activities: [
        "Early morning Whale Watching tour by troller boat — blue whales, sperm whales, dolphins",
        "Visit Galle Dutch Fort — wander the ramparts, lighthouse, and colonial streets",
        "Madu River Boat Safari (time-dependent) — mangroves and cinnamon islands",
        "Airport drop-off at Bandaranaike International Airport",
        "End of tour",
      ],
    },
  ],
  includes: [
    "Private air-conditioned vehicle throughout",
    "English-speaking private driver-guide",
    "All fuel and road tolls",
    "Airport pickup on arrival",
    "Airport drop-off on departure",
    "Train ticket arrangement — Nanu Oya → Ella (subject to Sri Lanka Railways availability)",
  ],
  excludes: [
    "Hotel accommodation (we can recommend options)",
    "Entry tickets to parks and attractions",
    "Whale watching and safari fees",
    "Meals and beverages",
    "International flights",
    "Travel insurance",
  ],
  customiseOptions: [
    "Adjust pacing",
    "Swap destinations",
    "Add east coast",
    "Family-friendly options",
    "Honeymoon upgrades",
    "Adventure add-ons",
    "Extend to 14 days",
  ],
  featured: true,
};


// ─── 11 DAYS / 10 NIGHTS — ADVENTURE TOUR ────────────────────────────────────
const adventureTour11Days = {
  slug: "adventure-tour-11-days",
  title: "Sri Lanka 11-Day Adventure Tour",
  titleMain: "Sri Lanka",
  titleAccent: "Adventure Tour",
  tagline: "Wild parks, ancient cities, east coast beaches, mountain hikes, and untamed coastline.",
  categoryDisplay: "Adventure",
  category: "adventure",
  duration: 11,
  nights: 10,
  groupType: "Private",
  regions: ["North Central", "East Coast", "Hill Country", "South Coast"],
  coverImage: ellaRockDest,
  description:
    "Sri Lanka's most adventurous route — starting with a jeep safari at the wild Wilpattu National Park, then threading through the UNESCO cities of Anuradhapura, the dramatic summit of Sigiriya, across to Trincomalee's turquoise bays and Arugam Bay's legendary surf, up into Ella's mountain scenery, and finally south to Yala's leopard territory and the secret beaches of Hiriketiya. Eleven days, zero boring days.",
  highlights: [
    "Wilpattu National Park Safari",
    "Anuradhapura Sacred Cities",
    "Sigiriya Lion Rock",
    "Trincomalee & Pigeon Island",
    "Arugam Bay Surfing",
    "Ella Sightseeing",
    "Flying Ravana Zipline",
    "Yala Evening Safari",
    "Hiriketiya Secret Beach",
    "Stilt Fishermen",
  ],
  route: [
    "Airport",
    "Wilpattu",
    "Anuradhapura",
    "Sigiriya",
    "Trincomalee",
    "Arugam Bay",
    "Ella",
    "Yala",
    "Hiriketiya",
  ],
  itinerary: [
    {
      day: 1,
      title: "Colombo Airport → Wilpattu",
      overnight: "Wilpattu",
      driveTime: "~3 hrs from Colombo airport",
      bestMoment:
        "Your first Wilpattu leopard sighting — this park is less visited than Yala which means the animals are less habituated to vehicles and the encounters feel rawer and more wild. Wilpattu's defining feature is its villus — natural lake basins surrounded by dense jungle — and finding a leopard drinking at the water's edge as the afternoon light drops through the canopy is as close to pure wilderness as Sri Lanka gets.",
      activities: [
        "Airport pickup & warm welcome",
        "Scenic drive north to Wilpattu National Park",
        "Half Day Wilpattu safari (2:00 PM start) — leopards, elephants, sloth bears, crocodiles",
        "Full Day Wilpattu safari (5:30 AM start) — best for leopard and sloth bear tracking",
        "Overnight at eco-lodge near the park",
      ],
    },
    {
      day: 2,
      title: "Wilpattu → Sigiriya via Anuradhapura",
      overnight: "Sigiriya",
      driveTime: "~4 hrs total including stops",
      bestMoment:
        "The Sri Maha Bodhi — a 2,000-year-old sacred fig tree, the oldest historically documented tree on Earth. This living tree was grown from a cutting of the original Bodhi Tree under which the Buddha attained enlightenment in India. White-robed pilgrims place lotus flowers at its base every single day. Standing quietly beneath its canopy, you are in the presence of something genuinely ancient.",
      activities: [
        "Sri Maha Bodhi Tree — sacred fig tree grown from a sapling of the original Bodhi Tree",
        "Ruwanwelisaya — monumental white dagoba, one of the wonders of ancient Asia",
        "Jetavanaramaya — once the world's third-tallest structure",
        "Isurumuniya Temple — 3rd century BCE rock-cut temple with famous carvings",
        "Mihintale — the cradle of Buddhism in Sri Lanka",
        "Traditional village experience",
      ],
    },
    {
      day: 3,
      title: "Sigiriya Exploration",
      overnight: "Sigiriya",
      driveTime: "Local transfers",
      bestMoment:
        "The Sigiriya frescoes — ancient paintings of celestial maidens on a sheer rock face, 100 metres above the jungle floor, painted in the 5th century and still vivid with colour. You reach them via a spiral metal staircase bolted to the vertical cliff. The combination of the height, the history, and the beauty of the paintings stops most visitors completely speechless.",
      activities: [
        "Sigiriya Lion Rock Fortress — UNESCO World Heritage, 5th-century cloud palace",
        "Pidurangala Rock (sunrise or sunset option)",
        "Dambulla Cave Temple — ancient murals and 150+ Buddha statues",
        "Village safari by tractor and catamaran ride on the village tank",
      ],
    },
    {
      day: 4,
      title: "Sigiriya → Trincomalee",
      overnight: "Trincomalee",
      driveTime: "~3 hrs Sigiriya to Trincomalee",
      bestMoment:
        "Standing at Swami Rock at Koneswaram Temple — a sheer cliff 130 metres above the Indian Ocean where the ancient Dravidian temple meets the edge of the world. Look north along the coast and you see one of the finest natural harbours in Asia spreading below you. The Portuguese threw the original deity statue off this cliff in 1624 — it was recovered from the seabed in 1963 and reinstated. That history adds an extra layer to an already extraordinary place.",
      activities: [
        "Koneswaram Temple — ancient Hindu temple perched on Swami Rock above the ocean",
        "Lover's Leap — dramatic cliff with panoramic Indian Ocean views",
        "Marble Beach — pristine bay with white sand and clear water",
        "Nilaveli Beach — one of Sri Lanka's most beautiful and unspoilt beaches",
        "Beach relaxation and swimming",
      ],
    },
    {
      day: 5,
      title: "Trincomalee Beach Day",
      overnight: "Trincomalee",
      driveTime: "Local boat / transfers",
      bestMoment:
        "Snorkelling over coral gardens at Pigeon Island with reef fish and blacktip sharks. The water clarity at Pigeon Island is exceptional — visibility of 15 to 20 metres on a good day — and the blacktip reef sharks that circle the coral bommies are completely harmless but utterly thrilling to watch. This is the best accessible snorkelling on the entire east coast.",
      activities: [
        "Pigeon Island snorkelling and marine national park",
        "Whale and dolphin watching (seasonal — blue whales Apr–Oct)",
        "Water sports: kayaking, stand-up paddleboard",
        "Beach relaxation and sunset from the shore",
      ],
    },
    {
      day: 6,
      title: "Trincomalee → Arugam Bay",
      overnight: "Arugam Bay",
      driveTime: "~4 hrs Trincomalee to Arugam Bay via Pasikuda",
      bestMoment:
        "Pasikuda Bay at low tide — the water here is so shallow and so flat that you can walk 500 metres from the shore and still only be waist-deep. The colour shifts from pale turquoise to deep blue in perfectly smooth gradients. After the long drive south from Trincomalee, stepping into this water is the most refreshing thing imaginable.",
      activities: [
        "Pasikuda Beach — shallow turquoise bay, ideal for swimming",
        "Batticaloa Lagoon — expansive inland lagoon with local life",
        "Kallady Bridge — panoramic lagoon views",
        "Arugam Bay sunset — one of the world's 10 best surf breaks",
        "Surfing and lagoon safari in the evening",
      ],
    },
    {
      day: 7,
      title: "Arugam Bay Adventure Day",
      overnight: "Arugam Bay",
      driveTime: "Local tuk-tuk",
      bestMoment:
        "Watching the sun rise over the Indian Ocean from Elephant Rock Viewpoint above Arugam Bay — the whole coast is laid out below you, the lagoon glows amber, and the first surfers of the day are already paddling out at the point break. It is a spectacular and completely uncrowded spot that most visitors entirely miss.",
      activities: [
        "Surfing lessons at Main Point — all levels welcome",
        "Whiskey Point Beach — quieter surf spot north of Arugam",
        "Elephant Rock Viewpoint — panoramic elevated views",
        "Lagoon safari and bird watching — hundreds of migratory species",
      ],
    },
    {
      day: 8,
      title: "Arugam Bay → Ella",
      overnight: "Ella",
      driveTime: "~4 hrs via Ravana Falls",
      bestMoment:
        "The drive through Wellawaya and up into the hill country as the landscape transforms around you — in the space of an hour the flat coastal scrubland gives way to paddy fields, then to rubber plantations, then suddenly to steep green mountain ridges wrapped in cloud. Sri Lanka compresses its geography in a way that is genuinely startling, and this drive from coast to mountain makes that transformation feel like a physical journey through different worlds.",
      activities: [
        "Ravana Falls — dramatic multi-tiered waterfall, perfect swimming spot",
        "Ella Gap Viewpoint — sweeping views across the southern plains",
        "Tea plantation drive through misty highland scenery",
        "Arrive Ella; explore the village and settle in",
      ],
    },
    {
      day: 9,
      title: "Ella Sightseeing",
      overnight: "Ella",
      driveTime: "Walking / tuk-tuk locally",
      note:
        "The scenic hill-country train currently operates on the Nanu Oya → Ella segment. For a short local train experience within the Ella area, we can arrange a hop between Ella and Demodara stations to experience the famous loop tunnel. Subject to Sri Lanka Railways operational conditions.",
      bestMoment:
        "The Flying Ravana zipline — 1.2 km across a jungle valley at 80 km/h. You launch from a platform on one forested ridge and fly across a canopy of jungle to the opposite hillside. Halfway across, with the valley floor 150 metres below you and nothing but jungle in every direction, you experience a few seconds of absolute silence and complete exhilaration that is unlike anything else in Sri Lanka.",
      activities: [
        "Nine Arches Bridge — photograph the 8:50 AM or 6:41 PM train crossing",
        "Little Adam's Peak — 1.5-hr return hike with panoramic summit views",
        "Flying Ravana Zipline — Sri Lanka's longest zipline, 1.2 km across jungle valley",
        "Tea Factory visit — see Ceylon tea production from fresh leaf to packaged tea",
        "Optional: short scenic train hop Ella → Demodara to experience the famous loop tunnel",
      ],
    },
    {
      day: 10,
      title: "Ella → Yala",
      overnight: "Yala area",
      driveTime: "~3 hrs Ella to Yala",
      bestMoment:
        "An evening leopard encounter in Yala Block 1 — the last hour before park closing, when the light turns gold and the temperature drops, is when Yala's leopards become most active. Your guide will radio other jeeps and follow the tracks. When you finally find one — padding unhurriedly between the rocks, completely indifferent to your presence — the silence in the jeep is absolute.",
      activities: [
        "Visit Ravana Cave — legendary cave with ancient temple shrine",
        "Half Day Yala safari (2:00 PM start) — world's highest leopard density",
        "Full Day Yala safari (5:30 AM start) — elephant sightings, early bird activity, sloth bears",
        "Wildlife: leopards, elephants, sloth bears, crocodiles, water buffalo",
        "Overnight near Yala gate for Full Day safari option (5:30 AM start)",
      ],
    },
    {
      day: 11,
      title: "Yala → Hiriketiya Beach",
      overnight: null,
      departure: true,
      driveTime: "~2.5 hrs Yala to Hiriketiya",
      bestMoment:
        "Hiriketiya Beach on your last morning — a perfect horseshoe bay hidden behind a headland, with gentle waves rolling in from the Indian Ocean and a handful of small cafés tucked into the treeline. It feels like a secret. Swim in the warm water, have a final Sri Lankan breakfast of hoppers and coconut sambal, and let the island have the last word.",
      activities: [
        "Mirissa Coconut Tree Hill — iconic palms over turquoise ocean",
        "Secret Beach at Mirissa — hidden cove accessible by short walk",
        "Stilt fishermen at Koggala — traditional fishermen on wooden poles",
        "Matara Dutch Fort — small but perfectly preserved 17th-century Dutch fortification",
        "Relax at Hiriketiya Beach — a hidden horseshoe bay beloved by surfers",
      ],
    },
  ],
  includes: [
    "Private air-conditioned vehicle throughout",
    "English-speaking private driver-guide",
    "All fuel and road tolls",
    "Airport pickup on arrival",
    "Drop-off at your final destination (Hiriketiya Beach) on departure day",
    "Experienced safari guides at all national parks",
  ],
  excludes: [
    "Hotel accommodation (we can recommend options)",
    "Entry tickets to all sites and parks",
    "Safari and activity fees",
    "Surfing lessons and equipment",
    "Meals and beverages",
    "International flights",
    "Travel insurance",
  ],
  customiseOptions: [
    "Adjust pacing",
    "Swap destinations",
    "Add Horton Plains trek",
    "Add Adam's Peak climb",
    "Family-friendly adaptation",
    "Extend to 14 days",
  ],
  featured: true,
};


// ─── 14 DAYS / 13 NIGHTS ─────────────────────────────────────────────────────
const sriLanka14Days = {
  slug: "sri-lanka-14-days",
  title: "Sri Lanka 14 Days / 13 Nights",
  titleMain: "Sri Lanka",
  titleAccent: "14 Days",
  tagline: "The ultimate Sri Lanka — ancient cities, wild safaris, hill country, and golden coasts.",
  categoryDisplay: "Grand Island Circuit",
  category: "classic-circuit",
  duration: 14,
  nights: 13,
  groupType: "Private",
  regions: ["Island-wide"],
  coverImage: galleFort,
  description:
    "Fourteen days allows you to experience the true breadth and depth of Sri Lanka — from the colonial streets of Colombo and the surf of Hikkaduwa to the sacred city of Kataragama, the surf paradise of Arugam Bay on the east coast, the mountain scenery of Ella, the ancient kingdom of Polonnaruwa, and the iconic rock fortresses of Sigiriya. This is the definitive Sri Lanka experience, tailored entirely to your preferences.",
  highlights: [
    "Colombo City Tour",
    "Hikkaduwa Beach & Snorkeling",
    "Yala Leopard Safari",
    "Arugam Bay Surfing",
    "Diyaluma Falls (2nd highest)",
    "Ella & Nine Arches Bridge",
    "Vedda Indigenous Village",
    "Polonnaruwa Ancient Kingdom",
    "Sigiriya Lion Rock",
    "Galle Dutch Fort",
    "Muthurajawela Boat Safari",
  ],
  route: [
    "Colombo",
    "Hikkaduwa",
    "Kataragama",
    "Arugam Bay",
    "Ella",
    "Mahiyanganaya",
    "Habarana",
    "Kandy",
    "Negombo",
    "Airport",
  ],
  itinerary: [
    {
      day: 1,
      title: "Airport → Colombo City Tour",
      overnight: "Colombo",
      driveTime: "~45 mins airport to Colombo city",
      bestMoment:
        "Galle Face Green at sunset — the long coastal promenade fills with families, kite sellers, and street food vendors as the sun drops into the Indian Ocean. The smell of isso wade prawn fritters, the sound of kites rattling in the sea breeze, and the silhouettes of people against the pink sky is your first true taste of Sri Lanka.",
      activities: [
        "Arrival at Bandaranaike International Airport — meet & greet with private transfer",
        "Colombo city sightseeing tour with private guide",
        "Gangaramaya Temple visit — eclectic Buddhist temple with museum",
        "Independence Square visit — colonial-era open monument",
        "Galle Face Green — sunset stroll on the Indian Ocean seafront",
        "Lotus Tower (optional) — Sri Lanka's tallest tower",
      ],
    },
    {
      day: 2,
      title: "Colombo → Hikkaduwa",
      overnight: "Hikkaduwa",
      driveTime: "~1.5 hrs via Southern Expressway",
      bestMoment:
        "Snorkelling over Hikkaduwa's shallow coral gardens at high tide. Put on the mask, drop into the warm water, and within seconds you are surrounded by parrotfish, angelfish, and hawksbill sea turtles gliding past you completely unbothered. The reef is just metres from the beach — this is some of the most accessible marine wildlife in Sri Lanka.",
      activities: [
        "Travel south via the Southern Expressway",
        "Check in at beach hotel in Hikkaduwa",
        "Beach relaxation time",
        "Turtle watching experience along the shore",
        "Optional snorkelling / coral reef exploration",
        "Sunset at Hikkaduwa Beach",
      ],
    },
    {
      day: 3,
      title: "Hikkaduwa → Kataragama → Yala Safari",
      overnight: "Kataragama",
      driveTime: "~4 hrs Hikkaduwa to Kataragama",
      bestMoment:
        "Kataragama at dusk when the evening puja begins at the Maha Devale — devotees walk across burning coals, others carry kavadi shoulder frames pierced through their skin as acts of devotion, and the air is thick with incense and drumming. This is one of the most raw and powerful religious experiences you will encounter anywhere in Asia.",
      activities: [
        "Morning transfer to Kataragama",
        "Visit Kataragama Sacred City — one of Sri Lanka's most revered pilgrimage sites",
        "Half Day Yala safari (2:00 PM start) — world's highest leopard density",
        "Full Day Yala safari (5:30 AM start) — elephants, sloth bears, and birdlife",
        "Professional safari jeep and experienced wildlife guide included",
        "Wildlife: leopards, elephants, deer, crocodiles, 200+ bird species",
      ],
    },
    {
      day: 4,
      title: "Kataragama → Arugam Bay",
      overnight: "Arugam Bay",
      driveTime: "~4 hrs Kataragama to Arugam Bay via Kirivehera",
      bestMoment:
        "Your first view of Arugam Bay as you come over the causeway — a wide horseshoe of golden sand, a flat lagoon on one side, and long Indian Ocean waves peeling perfectly down the right-hand point break on the other. After hours of inland driving the sight of it is genuinely breathtaking.",
      activities: [
        "Visit Kirivehera Temple — a sacred Buddhist stupa near Kataragama",
        "Kataragama Devalaya visit",
        "Scenic drive to Arugam Bay along the east coast",
        "Evening beach relaxation at one of Asia's best surf breaks",
      ],
    },
    {
      day: 5,
      title: "Arugam Bay — Leisure Day",
      overnight: "Arugam Bay",
      driveTime: "Local only",
      bestMoment:
        "Catching your first wave at Arugam's Main Point — suitable for all levels. Even if you have never surfed before, the long gentle rollers at the southern end of the bay give you plenty of time to stand up and feel that first ride. When it clicks, and the wave carries you all the way to the shore, you will understand immediately why surfers return to Arugam Bay year after year.",
      activities: [
        "Full day beach relaxation and exploration",
        "Optional surfing lessons — beginner through to advanced",
        "Surfboard rental available",
        "Cafés and beachside dining along the bay",
        "Sunset photography and relaxation",
      ],
    },
    {
      day: 6,
      title: "Arugam Bay — Second Beach Day",
      overnight: "Arugam Bay",
      driveTime: "Local only",
      bestMoment:
        "A lagoon safari at sunrise from the Pottuvil Lagoon end of town — the water is glass-calm, a crocodile slides off the bank just ahead of the boat, painted storks and purple herons stand in the shallows, and the whole scene is reflected perfectly in the still surface. Most visitors never discover this side of Arugam Bay.",
      activities: [
        "Free beach time — swimming, sunbathing, exploring",
        "Optional surfing at Whiskey Point or Pottuvil Point",
        "Optional lagoon tour — wildlife, birdlife, crocodiles",
        "Seafood restaurant experience — fresh catch of the day",
      ],
    },
    {
      day: 7,
      title: "Arugam Bay → Ella",
      overnight: "Ella",
      driveTime: "~4 hrs via Diyaluma Falls and Ravana Falls",
      bestMoment:
        "Standing behind the curtain of Diyaluma Falls after the upper-pool trek. The 220-metre cascade free-falls off the escarpment and you can walk right to the edge of the cliff above it, peer over, and then cool off in the natural infinity pools that collect just before the drop. On a clear day the view from the top stretches all the way to the southern coast.",
      activities: [
        "Visit Diyaluma Falls — Sri Lanka's second highest waterfall (220 m)",
        "Optional upper waterfall trekking with local guide to the natural pools",
        "Visit Ravana Falls — dramatic multi-tiered cascade",
        "Scenic mountain drive to Ella through jungle and tea country",
      ],
    },
    {
      day: 8,
      title: "Ella Sightseeing",
      overnight: "Ella",
      driveTime: "Tuk-tuk / walking locally",
      bestMoment:
        "Sitting at a rooftop café in Ella village with a pot of fresh-brewed Ceylon tea, looking out over the Ella Gap — a 500-metre break in the mountain ridge that frames a perfect rectangle of southern plains stretching to the horizon. The village itself sits at 1,000 metres, the air is cool, and on a clear morning the view from any café on the main road is simply extraordinary.",
      activities: [
        "Nine Arches Bridge visit — catch the morning train crossing",
        "Little Adam's Peak hike — easy trail, spectacular 360° views",
        "Halpe / Kumbal Oya scenic viewpoints",
        "Tuk-tuk local sightseeing tour through the valley",
        "Ella village exploration — cafés, local shops",
      ],
    },
    {
      day: 9,
      title: "Ella → Mahiyanganaya",
      overnight: "Mahiyanganaya",
      driveTime: "~3 hrs Ella to Mahiyanganaya",
      bestMoment:
        "Meeting the Vedda community at Dambana — Sri Lanka's last indigenous people. A Vedda elder demonstrating how to start fire with two sticks, then speaking about their forest life through your guide's translation, is one of those encounters that quietly stays with you. These are people who have lived in the same forests for tens of thousands of years, and they are extraordinarily generous in sharing their world with visitors.",
      activities: [
        "Visit Mahiyanganaya Raja Maha Viharaya — one of Sri Lanka's oldest and most sacred Buddhist sites",
        "Sorabora Wewa — ancient reservoir linked to legendary history",
        "Visit Dambana Indigenous Vedda Village — Sri Lanka's last surviving indigenous community",
        "Cultural dance experience: Kiri Koraha traditional dance show",
      ],
    },
    {
      day: 10,
      title: "Mahiyanganaya → Polonnaruwa → Habarana",
      overnight: "Habarana",
      driveTime: "~2.5 hrs Mahiyanganaya to Polonnaruwa, then 1 hr to Habarana",
      bestMoment:
        "The Gal Vihara at Polonnaruwa — four colossal Buddha figures carved directly into a single granite face, the largest standing Buddha in Sri Lanka among them. Stand in front of the 15-metre reclining Buddha entering Parinirvana and you feel a stillness that is difficult to explain. This is the artistic and spiritual pinnacle of Sri Lanka's medieval civilisation.",
      activities: [
        "Visit Polonnaruwa Ancient Kingdom — Sri Lanka's medieval royal capital",
        "Parakrama Samudraya — the Great Lake, ancient irrigation marvel",
        "Cycle through palace ruins, colossal Gal Vihara Buddha reliefs, and ancient temples",
        "Optional cultural dance show in the evening",
        "Transfer to Habarana",
      ],
    },
    {
      day: 11,
      title: "Habarana — Safari & Sigiriya Day",
      overnight: "Habarana",
      driveTime: "Local transfers",
      bestMoment:
        "The gathering of 300+ elephants at Minneriya reservoir in August–October — known simply as The Gathering, it is the largest congregation of Asian elephants anywhere on Earth. The reservoir recedes in the dry season and hundreds of elephants come to graze on the exposed grass. Your jeep stops in the middle of it all and the herd just mills around you. It is completely overwhelming.",
      activities: [
        "Visit Sigiriya Lion Rock Fortress — climb the iconic 5th-century UNESCO citadel",
        "Village tour experience — traditional Sri Lankan rural life",
        "Full Day elephant safari (5:30 AM start) — Minneriya, Kaudulla, or Eco Park (seasonal best)",
        "Optional Ayurvedic oil massage",
      ],
    },
    {
      day: 12,
      title: "Habarana → Dambulla → Kandy",
      overnight: "Kandy",
      driveTime: "~2.5 hrs Habarana to Kandy via Dambulla",
      bestMoment:
        "The ceiling of Cave Two at Dambulla — the Maharaja Viharaya — covered floor to ceiling in 2,000-year-old painted murals that glow in the soft light. Lie on your back and look straight up at the intricate patterns of lotus flowers, reclining Buddhas, and celestial figures. This is one of the finest examples of ancient cave art in all of Asia.",
      activities: [
        "Dambulla Cave Temple visit — Sri Lanka's finest ancient cave murals",
        "Matale Hindu Temple visit — ornate Dravidian gopuram",
        "Kandy City View Point — panoramic hilltop views",
        "Kandy Lake walk and local market",
        "Temple of the Sacred Tooth Relic — evening Puja ceremony",
      ],
    },
    {
      day: 13,
      title: "Kandy → Peradeniya → Negombo",
      overnight: "Negombo",
      driveTime: "~2 hrs Kandy to Negombo",
      bestMoment:
        "The Avenue of Royal Palms at Peradeniya Botanical Garden — a kilometre-long corridor of towering Bismarck palms planted in the 1950s that forms a cathedral of green above your head. Walk its length in the morning light and then find the Giant Java Fig tree — a single tree whose canopy covers half an acre. The garden is one of the finest in Asia and rarely gets the credit it deserves.",
      activities: [
        "Royal Botanical Gardens, Peradeniya — 60 acres of orchids, palms, and exotic flora",
        "Transfer to Negombo",
        "Negombo Fish Market visit — colourful morning market (depart Kandy early)",
        "Dutch Canal and Old Dutch Port area heritage walk",
        "Beach sunset relaxation at Negombo",
      ],
    },
    {
      day: 14,
      title: "Negombo → Muthurajawela → Airport",
      overnight: null,
      departure: true,
      driveTime: "~1 hr Negombo to airport",
      bestMoment:
        "Gliding silently through the Muthurajawela mangrove estuary by boat in the early morning — the largest mangrove wetland in Sri Lanka. A purple-rumped sunbird darts between the roots, a monitor lizard as long as your arm swims calmly across the channel, and the city of Colombo is visible in the distance as a reminder of how extraordinary it is that this wilderness exists right on its doorstep.",
      activities: [
        "Optional Muthurajawela Boat Safari — Sri Lanka's largest mangrove estuary",
        "Bird watching and wildlife in the mangrove ecosystem",
        "Monitor lizards, water buffalo, rare migratory birds",
        "Airport transfer for departure — end of tour",
      ],
    },
  ],
  includes: [
    "Private air-conditioned vehicle throughout",
    "English-speaking private driver-guide",
    "All fuel and road tolls",
    "Airport pickup on arrival",
    "Airport drop-off on departure",
  ],
  excludes: [
    "Hotel accommodation (we can recommend options)",
    "Entry tickets to all sites and parks",
    "Safari and activity fees",
    "Meals and beverages",
    "International flights",
    "Travel insurance",
  ],
  customiseOptions: [
    "Adjust pacing",
    "Swap destinations",
    "Add north Sri Lanka",
    "Honeymoon upgrades",
    "Family-friendly options",
    "Shorten to 10 days",
  ],
  featured: true,
};


// ─── 20 DAYS / 19 NIGHTS — RELAXATION & HIGHLANDS ───────────────────────────
const sriLanka20Days = {
  slug: "sri-lanka-20-days",
  title: "Sri Lanka 20 Days / 19 Nights",
  titleMain: "Sri Lanka",
  titleAccent: "20 Days",
  tagline:
    "Beach relaxation, scenic train rides, misty tea country, east coast escape — the unhurried island experience.",
  categoryDisplay: "Relaxation & Highlands",
  category: "classic-circuit",
  duration: 20,
  nights: 19,
  groupType: "Private",
  regions: ["West Coast", "South Coast", "Hill Country", "East Coast", "Colombo"],
  coverImage: mirissa,
  description:
    "Twenty days is for travellers who want to actually breathe — who want to sit on a beach for three mornings in a row, who want to take the slow train through the highlands and not rush off the same afternoon, who want to discover the calm east coast after everyone else has gone home. This itinerary moves from Negombo down the west coast to Bentota, sweeps through Mirissa and Tangalle, climbs to Ella and the Hatton tea highlands, crosses to the serene beaches of Pasikudah, and closes with a Colombo city farewell.",
  highlights: [
    "Negombo Beach & Fish Market",
    "Bentota Beach & River Safari",
    "Ahungalla Turtle Hatchery",
    "Mirissa Beach & Whale Watching",
    "Tangalle Hidden Beaches",
    "Ella & Nine Arches Bridge",
    "Scenic Train — Ella to Hatton",
    "Hatton Tea Highlands",
    "Devon & St Clair's Falls",
    "Pasikudah East Coast Beach",
    "Colombo City Tour",
  ],
  route: [
    "Airport / Negombo",
    "Bentota",
    "Mirissa",
    "Tangalle",
    "Ella",
    "Hatton",
    "Kandy",
    "Pasikudah",
    "Colombo",
    "Airport",
  ],
  itinerary: [
    {
      day: 1,
      title: "Airport Arrival → Negombo",
      overnight: "Negombo",
      driveTime: "~15 mins airport to Negombo",
      bestMoment:
        "Negombo Beach at sunset on your very first evening — the sky turns amber over the Indian Ocean, fishing canoes are being hauled ashore, and the smell of fresh seafood drifts from the beachside restaurants. It is the gentlest possible introduction to Sri Lanka, and after a long flight it feels like the island is already looking after you.",
      activities: [
        "Airport pickup from Katunayake (BIA)",
        "Transfer to Negombo hotel — just 15 minutes from the airport",
        "Relax and recover after your long flight",
        "Negombo beach sunset walk",
        "Optional seafood dinner at a beachside restaurant",
      ],
    },
    {
      day: 2,
      title: "Negombo → Bentota",
      overnight: "Bentota",
      driveTime: "~2 hrs Negombo to Bentota via coastal road",
      bestMoment:
        "The first moment the Bentota River comes into view as you cross the bridge — a wide, calm stretch of water lined with mangroves and lagoon islands, with the beach visible on the other side. Bentota is one of Sri Lanka's most beautiful resort areas and the combination of river and ocean in one place makes it genuinely special.",
      activities: [
        "Scenic coastal drive south to Bentota",
        "Check in and relax at your beach hotel",
        "Optional Madu River boat safari — mangroves, bird islands, cinnamon cultivation",
        "Beach leisure evening — swimming, sunset walks",
      ],
    },
    {
      day: 3,
      title: "Bentota Leisure Day",
      overnight: "Bentota",
      driveTime: "Local only",
      bestMoment:
        "A full day to do absolutely nothing on Bentota's golden beach — swimming in the warm Indian Ocean, walking barefoot along the shoreline, and watching the sun sink into the sea with a fresh coconut in hand. Pure relaxation.",
      activities: [
        "Full relaxing beach day — swimming and sunbathing",
        "Optional water sports — jet ski, windsurfing, banana boat",
        "Evening beach walk and dinner",
      ],
    },
    {
      day: 4,
      title: "Bentota & Ahungalla Turtle Hatchery",
      overnight: "Bentota",
      driveTime: "~20 mins Bentota to Ahungalla",
      bestMoment:
        "Holding a newly hatched baby sea turtle at the Ahungalla Hatchery before it is released into the ocean — a tiny creature the size of your palm, paddling its flippers furiously as it heads toward the breaking waves for the very first time. Of the hundreds that are released, some will return to this same beach 30 years from now to lay their own eggs.",
      activities: [
        "Relaxing morning by the beach",
        "Visit Ahungalla Turtle Conservation & Hatchery — learn about five species of sea turtle",
        "Watch turtle eggs being incubated and hatchlings being released",
        "Optional river or lagoon kayaking in the afternoon",
        "Sunset relaxation at Bentota beach",
      ],
    },
    {
      day: 5,
      title: "Bentota → Mirissa",
      overnight: "Mirissa",
      driveTime: "~2.5 hrs along the southern coastline",
      bestMoment:
        "Coconut Tree Hill at Mirissa at golden hour — the leaning palms frame a perfect arc over the crescent bay below, and the light turns everything warm and golden. It is the image that defines the Sri Lankan south coast and it looks even better in person than in every photograph you have ever seen of it.",
      activities: [
        "Scenic coastal drive south — passing Galle Fort (optional stop)",
        "Scenic southern coastline views all the way",
        "Coconut Tree Hill visit — iconic palm grove over turquoise bay",
        "Relax at Mirissa beach",
      ],
    },
    {
      day: 6,
      title: "Mirissa Relaxation Day",
      overnight: "Mirissa",
      driveTime: "Local only",
      bestMoment:
        "An early morning blue whale watching boat trip from Mirissa harbour — the boat heads out into open ocean before sunrise, and as the sky lightens the captain suddenly cuts the engine. In the silence that follows, a blue whale — the largest animal to have ever lived on Earth — surfaces just ahead of you. The spout shoots metres into the air and the sheer size of the animal alongside the boat is breathtaking.",
      activities: [
        "Optional early morning whale watching tour — blue whales and spinner dolphins",
        "Beach leisure time — swimming, reading, exploring",
        "Optional surfing lessons at Mirissa or Weligama",
        "Beachside cafés and fresh seafood dinner",
      ],
    },
    {
      day: 7,
      title: "Mirissa Leisure Day",
      overnight: "Mirissa",
      driveTime: "Local only",
      bestMoment:
        "Sunrise at Parrot Rock — climb the rocky outcrop at the western end of Mirissa Beach at dawn when the beach is completely empty, watch the fishing fleet head out to sea, and have the most beautiful bay in Sri Lanka entirely to yourself for a few magical minutes before the day begins.",
      activities: [
        "Full relaxing beach holiday day",
        "Optional snorkelling or glass-bottom boat rides",
        "Beach cafés, fresh fruit, and afternoon naps",
        "Optional evening visit to Weligama — watch local surfers at sunset",
      ],
    },
    {
      day: 8,
      title: "Mirissa → Tangalle",
      overnight: "Tangalle",
      driveTime: "~1.5 hrs along the southern coast",
      bestMoment:
        "Goyambokka Beach at Tangalle — a small, sheltered cove with dark golden sand and almost no other visitors. The water is calm and warm, the treeline comes right down to the sand, and the only sound is the ocean. This is what the Sri Lankan south coast looked like before tourism arrived — and in Tangalle it still looks like this.",
      activities: [
        "Scenic coastal drive to Tangalle",
        "Visit Silent Beach / Goyambokka Beach — sheltered coves with calm water",
        "Beach relaxation evening",
        "Fresh seafood dinner at a local restaurant",
      ],
    },
    {
      day: 9,
      title: "Tangalle Leisure Day",
      overnight: "Tangalle",
      driveTime: "Local only",
      bestMoment:
        "A sunrise kayak on the Tangalle Lagoon — paddle out through the still water as the mist rises off the surface, egrets lift from the mangrove banks, and the whole lagoon glows rose-gold in the first light. Tangalle has one of the most beautiful lagoons on the south coast and almost nobody uses it before 8 AM.",
      activities: [
        "Full relaxing beach day at Tangalle",
        "Optional lagoon kayaking — Tangalle lagoon, egrets, kingfishers",
        "Evening beach walk along the headland",
      ],
    },
    {
      day: 10,
      title: "Tangalle → Ella",
      overnight: "Ella",
      driveTime: "~3 hrs Tangalle to Ella via Wellawaya",
      bestMoment:
        "Ravana Falls on the approach to Ella — pulling over on the mountain road as this wide, curtain-like waterfall crashes down the cliff face right beside you. After days of flat coastal driving, the sudden appearance of mountains, waterfalls, and cool misty air as you climb toward Ella feels like entering a completely different country.",
      activities: [
        "Scenic drive north toward the hill country",
        "Ravana Falls stop — one of Sri Lanka's widest and most dramatic waterfalls",
        "Ella Gap Viewpoint — sweeping views back across the southern plains",
        "Arrive Ella and settle into the cool mountain atmosphere",
      ],
    },
    {
      day: 11,
      title: "Ella Exploration",
      overnight: "Ella",
      driveTime: "Walking / tuk-tuk locally",
      bestMoment:
        "The summit of Little Adam's Peak at sunset — a straightforward 45-minute hike through tea estates brings you to a ridge with 360-degree views of the entire Ella valley. The Ella Gap frames the southern plains to one side, and the mountain ridges stack up in every other direction. As the sun drops the whole landscape turns golden and the tea bushes catch fire with light.",
      activities: [
        "Little Adam's Peak hike — 45-min return, panoramic summit views",
        "Nine Arch Bridge visit — catch the morning or late afternoon train crossing",
        "Relaxing cafés with spectacular valley views",
        "Optional Flying Ravana zipline — 1.2 km across jungle valley",
      ],
    },
    {
      day: 12,
      title: "Ella → Hatton (Scenic Train Journey)",
      overnight: "Hatton",
      driveTime: "Scenic train journey Ella → Hatton (~3.5 hrs)",
      note:
        "The scenic hill-country train currently operates reliably on the Nanu Oya → Ella segment. For this day we travel in the reverse direction from Ella toward the highlands. Train availability on this segment should be confirmed closer to your tour date — we handle all bookings and seat reservations and will advise the best available option.",
      bestMoment:
        "The train crossing the Demodara Loop — a unique piece of railway engineering where the track spirals inside the mountain and emerges at a point 30 metres below where it entered. You can look out of the window and see the tunnel entrance above you that you passed through just minutes ago. It is the most extraordinary piece of railway engineering in Asia and it happens right in the middle of the most scenic stretch of the journey.",
      activities: [
        "Morning: final Ella exploration and breakfast",
        "Board the scenic hill country train from Ella station",
        "Scenic train journey through tea country — Ella → Demodara Loop → Bandarawela → Haputale → Hatton (~3.5 hrs)",
        "Arrive Hatton — cool highland air, tea estate scenery",
        "Relax and enjoy the misty mountain atmosphere",
      ],
    },
    {
      day: 13,
      title: "Hatton Highlands Experience",
      overnight: "Hatton",
      driveTime: "Local transfers",
      bestMoment:
        "Devon Falls — a single unbroken ribbon of white water dropping 97 metres in a perfect straight line into a deep gorge below, completely surrounded by tea estates. You can see it from the road as you round a bend, and the scale of it in such a green and quiet landscape is genuinely stunning. Sri Lanka has many waterfalls but Devon is among the most elegant.",
      activities: [
        "Tea plantation & tea factory visit — Hatton is in the heart of Ceylon tea country",
        "Devon Falls — a dramatic 97-metre single-drop waterfall",
        "St Clair's Falls — the widest waterfall in Sri Lanka, known as the Little Niagara",
        "Scenic highland viewpoints — sweeping views over tea estates",
      ],
    },
    {
      day: 14,
      title: "Hatton Leisure Day",
      overnight: "Hatton",
      driveTime: "Local only",
      bestMoment:
        "Waking up at your tea estate bungalow in Hatton when the mist is still thick over the hills — stepping onto the veranda with a cup of just-brewed Ceylon tea, watching the mist slowly burn off the ridgeline as the sun rises behind it. The silence is absolute. This is one of the most restorative mornings you will have anywhere in the world.",
      activities: [
        "Relaxing tea estate stay — slow morning with fresh Ceylon tea",
        "Optional nature walks through the tea estates",
        "Visit a local tea plucking family — see how the leaves are harvested by hand",
        "Enjoy misty mountain scenery and highland birdlife",
      ],
    },
    {
      day: 15,
      title: "Hatton → Kandy",
      overnight: "Kandy",
      driveTime: "~2 hrs Hatton to Kandy",
      bestMoment:
        "The evening Puja ceremony at the Temple of the Tooth Relic — this is the spiritual heartbeat of Sri Lanka, a ritual that has taken place every single evening for over a thousand years without interruption. The thunder of drums in the courtyard, the smell of incense and jasmine, the press of white-robed devotees, and the slow opening of the golden doors to the inner sanctum — it is an experience that connects you directly to something ancient and alive.",
      activities: [
        "Scenic drive from Hatton to Kandy through hill country",
        "Temple of the Sacred Tooth Relic — attend the evening Puja ceremony",
        "Kandy Lake walk — peaceful lakeside stroll through the highland capital",
        "Optional Cultural Dance Show — traditional Kandyan drumming and fire-walking",
        "Optional Ayurvedic spa or traditional herbal treatment in Kandy",
      ],
    },
    {
      day: 16,
      title: "Kandy → Pasikudah (via Mahiyanganaya)",
      overnight: "Pasikudah",
      driveTime: "~4 hrs Kandy to Pasikudah via Mahiyanganaya",
      bestMoment:
        "The descent from the hill country toward the eastern plains on the Mahiyanganaya road — the road drops steeply from cool green mountain forest into warm dry scrubland, and the temperature rises noticeably within minutes. Then the road straightens out across the flat eastern plain and suddenly the Indian Ocean appears ahead — a vivid stripe of blue-green at the horizon. After days in the mountains it is a genuinely dramatic arrival.",
      activities: [
        "Scenic cross-country drive from Kandy toward the east coast",
        "Mahiyanganaya temple stop — one of Sri Lanka's oldest and most sacred Buddhist sites",
        "Continue to Pasikudah on the east coast",
        "Relax by the east coast beach — calm, clear, and uncrowded",
      ],
    },
    {
      day: 17,
      title: "Pasikudah Leisure Day",
      overnight: "Pasikudah",
      driveTime: "Local only",
      bestMoment:
        "Swimming at Pasikudah Bay at low tide — the reef shelf creates a natural lagoon where the water stays shallow, warm, and completely calm for hundreds of metres from the shore. The colour is extraordinary — every shade of turquoise from pale mint to deep aquamarine. It is the most perfect natural swimming pool in Sri Lanka and you share it with almost nobody.",
      activities: [
        "Full relaxing beach day — swimming in the famously calm, shallow bay",
        "Optional snorkelling — the reef just beyond the lagoon has good coral",
        "Optional glass-bottom boat tour",
        "Beach cafés and fresh seafood",
      ],
    },
    {
      day: 18,
      title: "Pasikudah Second Leisure Day",
      overnight: "Pasikudah",
      driveTime: "Local only",
      bestMoment:
        "A sunrise beach walk on the Pasikudah shore before any other guests are up — the beach curves in a wide arc, the water is completely still, the sky goes from deep violet to pale gold, and the only footprints on the sand are yours. The east coast keeps a different pace from the rest of Sri Lanka — quieter, slower, and all the better for it.",
      activities: [
        "Additional leisure day at Pasikudah — rest, swim, explore at your own pace",
        "Beach relaxation",
        "Optional sunrise beach walk",
        "Enjoy the peaceful east coast atmosphere",
      ],
    },
    {
      day: 19,
      title: "Pasikudah → Colombo",
      overnight: "Colombo",
      driveTime: "~4 hrs Pasikudah to Colombo",
      bestMoment:
        "Galle Face Green on your last evening in Colombo — the wide oceanfront promenade where the whole city comes to breathe. Street food vendors, flying kites, families, couples, and the great sweep of the Indian Ocean all together under a pink and orange sunset sky. It is one of the great urban seafronts of Asia and the perfect place to let Sri Lanka have its final say.",
      activities: [
        "Drive back across the island to Colombo",
        "Colombo city tour — Gangaramaya Temple, Independence Square, Galle Face Green",
        "Evening leisure at Galle Face Green — sunset walk along the oceanfront promenade",
      ],
    },
    {
      day: 20,
      title: "Colombo → Airport Departure",
      overnight: null,
      departure: true,
      driveTime: "~45 mins Colombo to airport",
      bestMoment:
        "A final Sri Lankan breakfast before you leave — a plate of string hoppers with coconut sambal, pol roti, and a cup of thick Ceylon tea, eaten quietly before the airport transfer arrives. Sri Lanka feeds you well from the first day to the last, and this final meal is a reminder of everything you are taking home with you.",
      activities: [
        "Breakfast at hotel",
        "Lotus Tower visit — panoramic 360-degree views over Colombo from the tallest tower in South Asia",
        "One Galle Face Mall — shopping, cafés, and final leisure before departure",
        "Airport transfer at required time",
        "End of your Sri Lanka holiday — safe travels",
      ],
    },
  ],
  includes: [
    "Private air-conditioned vehicle throughout",
    "English-speaking private driver-guide",
    "All fuel and road tolls",
    "Airport pickup on arrival",
    "Airport drop-off on departure",
    "Train ticket arrangement where applicable (subject to Sri Lanka Railways availability)",
  ],
  excludes: [
    "Hotel accommodation (we can recommend options for every category)",
    "Entry tickets to parks and attractions",
    "Whale watching and activity fees",
    "Meals and beverages",
    "International flights",
    "Travel insurance",
  ],
  customiseOptions: [
    "Adjust pacing",
    "Add safari days",
    "Include Yala or Wilpattu",
    "Honeymoon upgrades",
    "Family-friendly options",
    "Shorten to 14 days",
    "Add north Sri Lanka",
  ],
  featured: false,
};


// ─── 22 DAYS / 21 NIGHTS — THE GRAND ISLAND CIRCUIT ─────────────────────────
const sriLanka22Days = {
  slug: "sri-lanka-22-days",
  title: "Sri Lanka 22 Days / 21 Nights",
  titleMain: "Sri Lanka",
  titleAccent: "22 Days",
  tagline:
    "The complete island — north, south, east, west, ancient cities, wild coasts, and everything in between.",
  categoryDisplay: "Grand Island Circuit",
  category: "classic-circuit",
  duration: 22,
  nights: 21,
  groupType: "Private",
  regions: ["Island-wide"],
  coverImage: mirissaBeach,
  description:
    "Twenty-two days is the complete Sri Lanka — a full circuit of the island that takes in every major region, every landscape, and every dimension of this extraordinary country. From the ancient sacred cities of the north, through the wild west coast jungle of Wilpattu, across to the remote peninsula of Mannar and the cultural capital of Jaffna, down through Trincomalee's turquoise east coast bays, into the Cultural Triangle, up through the highland tea country, and finally along the golden south coast before returning through the colonial grandeur of Galle and Colombo. This is for travellers who want to leave Sri Lanka knowing they have seen it all.",
  highlights: [
    "Negombo Fish Market & Dutch Fort",
    "Wilpattu Safari — Leopards & Sloth Bears",
    "Mannar — Baobab Tree & Bird Watching",
    "Jaffna — Nallur Kovil & Island Tour",
    "Delft Island Wild Ponies",
    "Trincomalee — Koneswaram Temple",
    "Pigeon Island Snorkelling",
    "Polonnaruwa Ancient Kingdom",
    "Sigiriya Lion Rock",
    "Knuckles Mountain Trekking",
    "Kandy Temple of the Tooth",
    "Nuwara Eliya Tea Country",
    "Horton Plains & World's End",
    "Scenic Train Nanu Oya → Ella",
    "Nine Arches Bridge",
    "Lipton's Seat Haputale",
    "Diyaluma Falls Upper Pools",
    "Udawalawe Safari",
    "Mirissa Whale Watching",
    "Galle Dutch Fort",
  ],
  route: [
    "Airport / Negombo",
    "Wilpattu",
    "Mannar",
    "Jaffna",
    "Trincomalee",
    "Polonnaruwa",
    "Sigiriya",
    "Knuckles",
    "Kandy",
    "Nuwara Eliya",
    "Ella",
    "Haputale",
    "Udawalawe",
    "Mirissa / Weligama",
    "Galle",
    "Colombo",
    "Airport",
  ],
  itinerary: [
    {
      day: 1,
      title: "Airport → Negombo",
      overnight: "Negombo",
      driveTime: "~15 mins airport to Negombo",
      bestMoment:
        "Negombo Fish Market in the late afternoon when the day's catch is being sorted and auctioned — enormous yellowfin tuna, baskets of prawns, squid drying in the sun, and fishermen in worn-out sarongs haggling in rapid Sinhala. This is the real working life of Sri Lanka's largest fishing port, and it is completely electric.",
      activities: [
        "Airport pickup from Katunayake (BIA)",
        "Negombo Fish Market — one of Asia's busiest and most colourful fish markets",
        "Dutch Fort visit — colonial-era fortification in the old town",
        "Beach relaxation at Negombo",
      ],
    },
    {
      day: 2,
      title: "Negombo → Wilpattu Safari",
      overnight: "Wilpattu area",
      driveTime: "~2.5 hrs Negombo to Wilpattu",
      bestMoment:
        "A sloth bear lumbering across a Wilpattu villu clearing in the late afternoon — an animal that most visitors to Sri Lanka never see. Wilpattu's bears are elusive and rarely photographed, which makes an encounter here feel like a genuine privilege. The park is also far less crowded than Yala, so when you find wildlife, you often have it entirely to yourselves.",
      activities: [
        "Travel to Wilpattu National Park",
        "Half Day safari (2:00 PM start) — leopards, elephants, sloth bears, crocodiles",
        "Wilpattu's famous villus — natural lake clearings surrounded by dense jungle",
        "Overnight at eco-lodge near the park gate",
      ],
    },
    {
      day: 3,
      title: "Wilpattu → Mannar",
      overnight: "Mannar",
      driveTime: "~3 hrs Wilpattu to Mannar",
      bestMoment:
        "The Mannar Baobab Tree — a single enormous African baobab, believed to be over 700 years old, standing alone in a flat semi-arid landscape under an enormous sky. No one knows exactly how it got here — one theory is Arab traders brought it centuries ago. It is one of the most unexpectedly moving trees you will ever stand under.",
      activities: [
        "Visit the Mannar Baobab Tree — ancient African baobab, possibly 700+ years old",
        "Mannar Fort — a Portuguese and Dutch colonial fortification",
        "Bird watching — Mannar is one of Sri Lanka's finest migratory bird sanctuaries",
        "Lagoon sunset — the flat Mannar landscape turns extraordinary colours at dusk",
      ],
    },
    {
      day: 4,
      title: "Mannar → Jaffna",
      overnight: "Jaffna",
      driveTime: "~2 hrs Mannar to Jaffna",
      bestMoment:
        "Crossing the Sangupiddy Bridge over the Jaffna Lagoon — a long elevated causeway over still silver water with the flat peninsula spreading out ahead of you. The north of Sri Lanka has a completely different character from the rest of the island — flatter, drier, the architecture shaped by Hindu Tamil culture — and crossing this bridge feels like entering a different country.",
      activities: [
        "Cross Sangupiddy Bridge — dramatic crossing over Jaffna Lagoon",
        "Visit Nallur Kovil — the most important Hindu temple in northern Sri Lanka, ornate Dravidian gopuram",
        "Rio Ice Cream — a legendary Jaffna institution, famous for its unique flavours",
        "Visit Point Pedro — the northernmost tip of Sri Lanka, where the Indian Ocean meets the Bay of Bengal, with a historic lighthouse and sweeping coastal views",
        "Explore Jaffna town — the cultural capital of Tamil Sri Lanka",
      ],
    },
    {
      day: 5,
      title: "Jaffna Island Tour",
      overnight: "Jaffna",
      driveTime: "Local ferry / causeway transfers",
      bestMoment:
        "Delft Island — reached by a 40-minute ferry crossing, this flat remote island has wild ponies descended from Dutch colonial horses roaming freely through the scrubland, a giant baobab, an ancient ruined fort, and almost no tourists. Standing on Delft with nothing but open sea in every direction and wild horses grazing around you is one of the most extraordinary moments in Sri Lanka.",
      activities: [
        "Island tour — choose Nagadeepa Island (sacred Buddhist temple by boat) OR Delft Island (wild ponies, baobab, ruins)",
        "Jaffna local market — fresh palmyra products, dried fish, local produce",
        "Tamil food experience — Jaffna crab curry, pittu, string hoppers",
      ],
    },
    {
      day: 6,
      title: "Jaffna → Trincomalee",
      overnight: "Trincomalee",
      driveTime: "~3.5 hrs Jaffna to Trincomalee via A9",
      bestMoment:
        "Jaffna Fort at sunrise before you leave — a massive Dutch star fort built in 1658 right on the Jaffna Lagoon, largely intact and almost always empty in the early morning. Walk the battlements as the light comes up over the water, and you have one of the finest colonial-era fortress views in South Asia entirely to yourself.",
      activities: [
        "Jaffna Fort visit — one of Asia's best-preserved Dutch forts",
        "Public Library visit — the rebuilt Jaffna Public Library, a symbol of reconciliation",
        "Scenic A9 highway drive south to Trincomalee",
        "Beach relaxation on arrival",
      ],
    },
    {
      day: 7,
      title: "Trincomalee Sightseeing",
      overnight: "Trincomalee",
      driveTime: "Local transfers",
      bestMoment:
        "Sunset from Swami Rock at Koneswaram Temple — you stand on a sheer cliff 130 metres above the ocean as the sun drops into the Indian Ocean to the west, turning the entire bay below you into a sheet of copper. The ancient temple behind you is still active and the sound of evening prayers drifts out across the cliff edge. It is one of the great sunsets of Asia.",
      activities: [
        "Koneswaram Temple — dramatic Hindu temple on Swami Rock cliff above the ocean",
        "Lover's Leap viewpoint — panoramic cliff-top views over Trincomalee Bay",
        "Deer Park — spotted deer grazing freely near the fort area",
        "Beach leisure at Nilaveli or Marble Beach",
        "Sunset at Swami Rock",
      ],
    },
    {
      day: 8,
      title: "Trincomalee Full Beach Day",
      overnight: "Trincomalee",
      driveTime: "Local only",
      bestMoment:
        "Snorkelling at Pigeon Island Marine National Park — the water visibility here on a clear day reaches 20 metres, the coral gardens are some of the best on the east coast, and blacktip reef sharks cruise the outer reef in lazy circles. Take the short boat ride from Nilaveli Beach and drop into the water — within seconds you are in a world that makes everything above the surface feel very far away.",
      activities: [
        "Pigeon Island snorkelling — coral gardens, reef fish, blacktip sharks",
        "Beach relaxation and swimming at Nilaveli",
        "Optional whale and dolphin watching (blue whales Apr–Oct)",
        "Photography and sunset from the beach",
      ],
    },
    {
      day: 9,
      title: "Trincomalee → Polonnaruwa → Sigiriya",
      overnight: "Sigiriya",
      driveTime: "~3.5 hrs total with Polonnaruwa stop",
      bestMoment:
        "The Gal Vihara at Polonnaruwa — four enormous Buddhas carved from a single granite face, the 15-metre reclining figure the most powerful of all. The face of the reclining Buddha has an expression of absolute peace that stops visitors mid-sentence. You feel it before you can explain it, and it stays with you long after you have left.",
      activities: [
        "Visit Polonnaruwa Ancient City — medieval royal capital, UNESCO World Heritage",
        "Parakrama Samudra — the Great Lake, a marvel of ancient irrigation",
        "Gal Vihara — four colossal Buddhas carved from a single granite face",
        "Transfer to Sigiriya for overnight",
      ],
    },
    {
      day: 10,
      title: "Sigiriya Experience",
      overnight: "Sigiriya",
      driveTime: "Local transfers",
      bestMoment:
        "The frescoes gallery on the ascent of Sigiriya — 18 surviving paintings of celestial maidens, painted in the 5th century on a sheer rock face 100 metres above the jungle, still vivid with ochre and red. You reach them on a spiral staircase bolted to the vertical cliff. The height, the art, and the age of it combined is one of the most extraordinary human encounters in Asia.",
      activities: [
        "Sigiriya Lion Rock Fortress — UNESCO World Heritage, 5th-century cloud palace",
        "Village safari and cycling through traditional rural Sri Lanka",
        "Optional: Half Day elephant safari (2:00 PM start) — Minneriya or Kaudulla",
        "Herbal Ayurvedic oil massage",
      ],
    },
    {
      day: 11,
      title: "Sigiriya → Dambulla → Matale → Knuckles",
      overnight: "Knuckles",
      driveTime: "~3 hrs Sigiriya to Knuckles",
      bestMoment:
        "The Nalanda Gedige — a completely unique 8th-century stone temple that blends Buddhist and Hindu architectural styles in a way found nowhere else in Sri Lanka, sitting alone beside a lake in total silence. Most visitors drive straight past it. Stop, walk around it slowly, and appreciate one of the most quietly extraordinary ancient buildings on the island.",
      activities: [
        "Dambulla Cave Temple — five caves of ancient murals and 150+ Buddha statues",
        "Nalanda Gedige — unique 8th-century hybrid Hindu-Buddhist stone temple",
        "Matale Hindu Temple — ornate Dravidian architecture",
        "Drive into the Knuckles Mountain Range — misty, forested, spectacular",
      ],
    },
    {
      day: 12,
      title: "Knuckles Trekking → Kandy",
      overnight: "Kandy",
      driveTime: "~2 hrs Knuckles to Kandy after trekking",
      bestMoment:
        "A Knuckles mountain trek through cloud forest in the early morning — the trail moves through patches of bamboo, past small waterfalls, through tea and cardamom gardens, with views across forested ridges that seem to go on forever. The Knuckles Range is a UNESCO Biosphere Reserve and one of the last true wilderness areas in Sri Lanka. Almost nobody comes here and the silence is extraordinary.",
      activities: [
        "Morning guided trekking in the Knuckles Range — cloud forest, waterfalls, village paths",
        "Nature walk through endemic forest with experienced local tracker",
        "Visit a traditional Knuckles village — see rural highland life",
        "Scenic drive down to Kandy in the afternoon",
      ],
    },
    {
      day: 13,
      title: "Kandy City Tour",
      overnight: "Kandy",
      driveTime: "Local transfers",
      bestMoment:
        "The evening Puja at the Temple of the Tooth Relic — drums fill the courtyard with a rhythm that seems to resonate in your chest, incense smoke drifts through the golden light, and the crowd of devotees presses forward with flowers. The inner doors open to reveal the golden casket. This ritual has happened every single day for over a thousand years and it has lost none of its power.",
      activities: [
        "Temple of the Sacred Tooth Relic — attend the evening Puja ceremony",
        "Kandy View Point — panoramic hilltop views over the highland capital",
        "Bahirawakanda Temple — hilltop white Buddha with city views",
        "Evening Cultural Dance Show — Kandyan drumming, fire-walking, traditional performance",
      ],
    },
    {
      day: 14,
      title: "Kandy → Nuwara Eliya",
      overnight: "Nuwara Eliya",
      driveTime: "~2 hrs Kandy to Nuwara Eliya through tea country",
      bestMoment:
        "A tea factory visit in the heart of the Nuwara Eliya estates — watching the freshly plucked leaves go through withering, rolling, fermentation, drying, and grading in a building that smells overwhelmingly of fresh tea. At the end you sit down with the factory manager and taste four or five grades of Ceylon tea. You will never drink tea the same way again.",
      activities: [
        "Tea factory visit & tea plucking experience — see Ceylon tea from leaf to cup",
        "Tea tasting with expert guidance",
        "Ramboda Falls — spectacular three-tiered waterfall",
        "Shanthipura & Eagle View Point — panoramic highland viewpoints",
        "Nuwara Eliya city visit — colonial post office, Gregory Lake, Victoria Park",
      ],
    },
    {
      day: 15,
      title: "Horton Plains & World's End",
      overnight: "Nuwara Eliya",
      driveTime: "~1.5 hrs Nuwara Eliya to Horton Plains; return same day",
      bestMoment:
        "World's End at Horton Plains — a sheer 870-metre escarpment where the plateau simply stops and the southern lowland plains fall away below you in a vertical drop. On a clear morning before 9 AM the view extends all the way to the coast. The walk through the cloud forest to reach it, passing Baker's Falls and through misty grassland full of sambar deer, makes the arrival at the edge even more dramatic.",
      activities: [
        "Early departure ~5:00 AM to beat the clouds at World's End",
        "4×4 jeep or van required for Horton Plains access",
        "World's End viewpoint — 870-metre sheer drop, views to the southern coast",
        "Baker's Falls — beautiful waterfall on the Horton Plains trail",
        "Seetha Amman Temple visit on the return — Ramayana legend site",
      ],
    },
    {
      day: 16,
      title: "Nuwara Eliya → Nanu Oya → Ella (Scenic Train)",
      overnight: "Ella",
      driveTime: "~45 mins drive Nuwara Eliya to Nanu Oya; ~2 hrs train to Ella",
      note:
        "The scenic hill-country train currently operates reliably on the Nanu Oya → Ella segment (via Ohiya, Idalgashinna, Haputale, Bandarawela). We drive you from Nuwara Eliya to Nanu Oya station and board the scenic train. The route passes Pattipola — the highest railway station in Sri Lanka at 1,898 m — on the way to Ella. Train travel is subject to Sri Lanka Railways operational conditions. We book all seats well in advance.",
      bestMoment:
        "The view from the open train door somewhere between Idalgashinna and Haputale — the train hugs the edge of the escarpment and below you the land drops away for hundreds of metres into a valley of jungle and tea estates. The breeze is cool, the sky is blue above the cloud line, and you are moving slowly enough to take it all in. This is the moment that everyone who takes this train tries to describe and never quite manages to.",
      activities: [
        "Drive to Nanu Oya station and board the scenic train (passing Pattipola — the highest railway station in Sri Lanka at 1,898 m)",
        "Board the scenic hill country train: Nanu Oya → Ohiya → Idalgashinna → Haputale → Bandarawela → Ella (~2 hrs)",
        "Nine Arches Bridge visit on arrival — Sri Lanka's most iconic railway landmark",
        "Little Adam's Peak hike — 360° sunset views over the valley",
        "Explore Ella village and settle in",
      ],
    },
    {
      day: 17,
      title: "Ella → Haputale",
      overnight: "Haputale",
      driveTime: "~1 hr Ella to Haputale",
      bestMoment:
        "Lipton's Seat at dawn — Thomas Lipton himself used to ride up here on horseback to survey his tea empire, and the view he looked at has barely changed. The Haputale ridge drops away on both sides, tea estates spread out in every direction, and on a clear morning you can see both the south coast and the east coast from the same spot. It is one of the finest viewpoints in Sri Lanka and almost entirely free of crowds before 8 AM.",
      activities: [
        "Lipton's Seat viewpoint — panoramic 270° views over tea estates from 1,970 m",
        "Adisham Bungalow — a beautiful English country house built in 1931, now a Benedictine monastery",
        "Walk through the Haputale tea estates with the mist rolling in",
        "Explore Haputale town — a working highland community perched on a ridge",
      ],
    },
    {
      day: 18,
      title: "Haputale → Diyaluma → Udawalawe",
      overnight: "Udawalawe",
      driveTime: "~3 hrs Haputale to Udawalawe via Diyaluma",
      bestMoment:
        "The natural infinity pools above Diyaluma Falls — a 45-minute scramble up the rock face with a local guide brings you to a series of smooth rock pools collecting water just before it launches off the 220-metre drop. You can swim right to the edge and look out over the southern plains. It is one of the most exhilarating swimming spots in Sri Lanka and almost nobody makes the climb.",
      activities: [
        "Visit Diyaluma Falls — Sri Lanka's second highest waterfall at 220 m",
        "Upper pool trekking with experienced guide — natural rock pools at the cliff edge",
        "Elephant Transit Home — watch rescued baby elephants being fed and rehabilitated",
        "Transfer to Udawalawe for overnight",
      ],
    },
    {
      day: 19,
      title: "Udawalawe Safari → Mirissa / Weligama",
      overnight: "Mirissa / Weligama",
      driveTime: "~2 hrs Udawalawe to Mirissa",
      bestMoment:
        "A morning elephant herd crossing at Udawalawe National Park — Udawalawe has the highest density of elephants of any park in Sri Lanka, and in the early morning the herds move between the reservoir and the grasslands. Your jeep stops in the middle of the crossing and 40 or 50 elephants walk calmly past you on both sides. It is completely overwhelming and unlike anything at Yala or Minneriya.",
      activities: [
        "Full Day Udawalawe safari (5:30 AM start) — elephant herd watching",
        "Elephants, deer, crocodiles, water buffalo and 200+ bird species",
        "Coconut Tree Hill visit — iconic palms over Mirissa bay",
        "Relax at Mirissa or Weligama beach on arrival",
      ],
    },
    {
      day: 20,
      title: "Mirissa — Whale Watching & Beach Leisure",
      overnight: "Mirissa / Weligama",
      driveTime: "Local only",
      bestMoment:
        "A blue whale surfacing alongside the boat at dawn — the largest animal on Earth, close enough that you can hear it breathe. The exhaled spout hangs in the air for several seconds, the massive back rolls slowly, and then the fluke rises and disappears. The boat is silent. Nobody speaks. Mirissa is one of the best blue whale destinations on the planet and on a good day you see multiple animals.",
      activities: [
        "Early morning whale watching tour — blue whales, sperm whales, spinner dolphins",
        "Return to Mirissa for beach relaxation",
        "Optional surfing at Weligama",
        "Sunset beachside dinner — fresh grilled fish and seafood",
      ],
    },
    {
      day: 21,
      title: "Mirissa → Galle → Colombo",
      overnight: "Colombo",
      driveTime: "~3 hrs Mirissa to Colombo via Galle",
      bestMoment:
        "Walking the Galle Fort ramparts in the early morning when the town inside the walls is still waking up — a baker carrying bread, a cat sleeping on a Dutch doorstep, a lighthouse keeper crossing the grass, and the Indian Ocean crashing against the 400-year-old walls below you. Galle Fort is one of the finest colonial-era towns in Asia and it is at its best before the day-trippers arrive.",
      activities: [
        "Visit Galle Dutch Fort — UNESCO World Heritage Site, ramparts, lighthouse, colonial streets",
        "Ahungalla Turtle Hatchery visit — see rescued sea turtles and hatchlings",
        "Madu River boat safari — mangroves, cinnamon islands, bird life",
        "Transfer to Colombo for final overnight",
      ],
    },
    {
      day: 22,
      title: "Colombo City Tour → Airport Departure",
      overnight: null,
      departure: true,
      driveTime: "~45 mins Colombo city to airport",
      bestMoment:
        "A final walk through the Pettah markets of Colombo — the oldest commercial district in the city, a labyrinth of covered streets where you can buy everything from saffron to mobile phones, where the smells of spice shops and flower stalls mix in the morning air, and where the city feels most alive. Sri Lanka at its most urban, its most chaotic, and its most human — the perfect final memory.",
      activities: [
        "Gangaramaya Temple visit — eclectic Buddhist temple with museum and antique collection",
        "Colombo city tour — Independence Square, Galle Face Green",
        "Lotus Tower visit — Sri Lanka's tallest tower with panoramic city views",
        "Pettah market exploration — colours, spices, fabrics, street food",
        "Airport transfer based on flight time — end of tour",
      ],
    },
  ],
  includes: [
    "Private air-conditioned vehicle throughout",
    "English-speaking private driver-guide",
    "All fuel and road tolls",
    "Airport pickup on arrival",
    "Airport drop-off on departure",
    "Train ticket arrangement — Nanu Oya → Ella (subject to Sri Lanka Railways availability)",
    "Experienced safari guides at all national parks",
  ],
  excludes: [
    "Hotel accommodation (we can recommend options for every budget)",
    "Entry tickets to all sites and parks",
    "Safari and activity fees",
    "Whale watching fees",
    "Meals and beverages",
    "International flights",
    "Travel insurance",
  ],
  customiseOptions: [
    "Adjust pacing",
    "Swap destinations",
    "Add Adam's Peak climb",
    "Honeymoon upgrades",
    "Family-friendly options",
    "Shorten to 14 or 17 days",
    "Luxury hotel upgrades",
  ],
  featured: false,
};


// ─── EXPORTS ──────────────────────────────────────────────────────────────────

export const tours = [
  islandSampler,         //  5 days
  discoverSriLanka7,     //  7 days
  sriLanka10Days,        // 10 days
  adventureTour11Days,   // 11 days
  sriLanka14Days,        // 14 days
  sriLanka20Days,        // 20 days
  sriLanka22Days,        // 22 days
];

export const tourCategories = [
  { id: "all", label: "All" },
  { id: "classic-circuit", label: "Classic" },
  { id: "cultural", label: "Cultural" },
  { id: "hill-country", label: "Hill Country" },
  { id: "wildlife", label: "Wildlife" },
  { id: "coast", label: "Coast" },
  { id: "adventure", label: "Adventure" },
];
