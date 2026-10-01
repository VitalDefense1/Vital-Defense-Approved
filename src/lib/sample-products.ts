import { mainCategories } from "@/lib/navigation"

/**
 * Sample catalog for the design preview.
 * The listing layout does not live here. Pages ask this module for items,
 * then render them with the shared category listing.
 */

export type ProductImage = {
  src: string
  width: number
  height: number
}

export type SampleProduct = {
  id: string
  category: string
  title: string
  description: string
  price: number
  image: ProductImage
}

const images = {
  scoped: { src: "/photos/showcase/rifle-scoped.png", width: 1163, height: 563 },
  camo: { src: "/photos/showcase/rifle-camo.png", width: 1169, height: 575 },
  dot: { src: "/photos/showcase/rifle-dot.png", width: 1107, height: 404 },
  rail: { src: "/photos/showcase/rifle-rail.png", width: 1177, height: 442 },
  compact: { src: "/photos/showcase/pdw.png", width: 1136, height: 496 },
  optic: { src: "/photos/showcase/pistol-optic.png", width: 760, height: 695 },
  chevron: { src: "/photos/showcase/pistol-chevron.png", width: 760, height: 641 },
  mag: { src: "/photos/showcase/pistol-mag.png", width: 770, height: 688 },
} as const satisfies Record<string, ProductImage>

type Seed = {
  title: string
  description: string
  price: number
  /** Keeps the homepage carousel and this catalog on the same item. */
  id?: string
  image?: ProductImage
}

const longGuns: ProductImage[] = [
  images.scoped,
  images.camo,
  images.dot,
  images.rail,
  images.compact,
]

const handgunPhotos: ProductImage[] = [images.optic, images.chevron, images.mag]

const opticPhotos: ProductImage[] = [images.scoped, images.optic, images.rail, images.dot]

function build(category: string, pool: ProductImage[], seeds: Seed[]): SampleProduct[] {
  return seeds.map((seed, index) => ({
    id: seed.id ?? `${category}-${String(index + 1).padStart(2, "0")}`,
    category,
    title: seed.title,
    description: seed.description,
    price: seed.price,
    image: seed.image ?? pool[index % pool.length],
  }))
}

const rifles = build("rifles", longGuns, [
  {
    id: "scoped-rifle",
    title: "Scoped rifle, camouflage sling",
    description: "Camouflage rifle with a magnified optic and sling.",
    price: 2450,
    image: images.scoped,
  },
  {
    id: "camo-rifle",
    title: "Camouflage rifle, desert sling",
    description: "Desert-camouflage rifle with a matching sling.",
    price: 2180,
    image: images.camo,
  },
  {
    id: "dot-rifle",
    title: "Black rifle with a dot sight",
    description: "Black rifle set up with a compact dot sight.",
    price: 1640,
    image: images.dot,
  },
  {
    id: "rail-rifle",
    title: "Black rifle with optic and light",
    description: "Black rifle carrying an optic and a weapon light.",
    price: 1890,
    image: images.rail,
  },
  {
    id: "compact",
    title: "Compact firearm with an optic",
    description: "Short firearm with an optic mounted on the rail.",
    price: 1520,
    image: images.compact,
  },
  {
    title: "Ranch rifle",
    description: "A straightforward rifle for the truck and the pasture.",
    price: 890,
  },
  {
    title: "Bolt rifle in walnut",
    description: "Walnut stock, blued bolt action, iron sights.",
    price: 1120,
  },
  {
    title: "Precision rifle with a heavy barrel",
    description: "Heavy barrel and a stock meant for a supported shot.",
    price: 2760,
  },
  {
    title: "Scout rifle",
    description: "Light rifle with a forward-mounted optic.",
    price: 1340,
  },
  {
    title: "Lever rifle, octagon barrel",
    description: "Classic lever gun with an octagon barrel.",
    price: 1485,
  },
  {
    title: "Pump rifle",
    description: "Pump-action rifle with a short barrel.",
    price: 760,
  },
  {
    title: "Single-shot hunting rifle",
    description: "One shot, a simple break action, and a sling stud.",
    price: 540,
  },
  {
    title: "Patrol carbine with a sling",
    description: "Carbine-length rifle fitted with a two-point sling.",
    price: 1710,
  },
  {
    title: "Mountain rifle",
    description: "A lighter rifle meant to carry farther.",
    price: 1590,
  },
  {
    title: "Varmint rifle, fluted barrel",
    description: "Fluted barrel and a stock shaped for the bench.",
    price: 1325,
  },
  {
    title: "Truck gun",
    description: "Compact rifle that stays easy to bring along.",
    price: 980,
  },
  {
    title: "Match rifle, adjustable stock",
    description: "Adjustable stock and a rail for a competition optic.",
    price: 2340,
  },
  {
    title: "Takedown survival rifle",
    description: "Breaks into two pieces for a smaller case.",
    price: 690,
  },
  {
    title: "Stainless brush gun",
    description: "Stainless rifle with a shorter barrel for thick cover.",
    price: 1210,
  },
  {
    title: "Youth rifle, shortened stock",
    description: "Shorter stock and a lighter overall length.",
    price: 610,
  },
])

const handguns = build("handguns", handgunPhotos, [
  {
    id: "pistol-optic",
    title: "Pistol with a red-dot optic",
    description: "Semi-automatic pistol with a red-dot sight mounted.",
    price: 1275,
    image: images.optic,
  },
  {
    id: "pistol-chevron",
    title: "Pistol with chevron slide cuts",
    description: "Pistol with chevron cuts along the slide.",
    price: 1340,
    image: images.chevron,
  },
  {
    id: "pistol-mag",
    title: "Pistol with an extended magazine",
    description: "Pistol shown with an extended magazine seated.",
    price: 1410,
    image: images.mag,
  },
  {
    title: "Service pistol",
    description: "A full-size pistol with a standard magazine.",
    price: 620,
  },
  {
    title: "Compact carry pistol",
    description: "Shorter grip and slide for everyday carry.",
    price: 580,
  },
  {
    title: "Revolver, six shot",
    description: "Steel revolver with a six-shot cylinder.",
    price: 740,
  },
  {
    title: "Snub revolver",
    description: "Short-barrel revolver that stays easy to pocket.",
    price: 490,
  },
  {
    title: "Single-shot hunting handgun",
    description: "Break-action handgun for a single precise shot.",
    price: 860,
  },
  {
    title: "Derringer",
    description: "A small two-shot derringer.",
    price: 280,
  },
  {
    title: "Target pistol, long slide",
    description: "Longer slide and sights set up for the range.",
    price: 1120,
  },
  {
    title: "Competition pistol",
    description: "Pistol with an optic cut and a flared magazine well.",
    price: 1680,
  },
  {
    title: "Rimfire pistol",
    description: "A .22 pistol for practice and small-game use.",
    price: 340,
  },
  {
    title: "Hammer-fired compact",
    description: "Compact pistol with an exposed hammer.",
    price: 650,
  },
  {
    title: "Striker pistol, night sights",
    description: "Striker-fired pistol with night sights.",
    price: 710,
  },
  {
    title: "Range pistol",
    description: "Straightforward pistol for a day of practice.",
    price: 455,
  },
  {
    title: "Steel-frame revolver",
    description: "Heavier revolver with a longer barrel.",
    price: 920,
  },
  {
    title: "Pocket pistol",
    description: "A very small pistol with a short grip.",
    price: 390,
  },
  {
    title: "Optics-ready duty pistol",
    description: "Duty-size pistol milled for a pistol optic.",
    price: 890,
  },
  {
    title: "Single-action revolver",
    description: "Single-action revolver with a walnut grip.",
    price: 770,
  },
  {
    title: "Trail pistol",
    description: "Longer barrel and a sight set for the field.",
    price: 1040,
  },
])

const shotguns = build("shotguns", longGuns, [
  { title: "Field pump", description: "Pump shotgun for birds and the back forty.", price: 420 },
  { title: "Semi-auto field gun", description: "Gas-operated shotgun with a vent rib.", price: 980 },
  { title: "Side-by-side", description: "Double barrels set beside each other.", price: 1460 },
  { title: "Over-under sporting gun", description: "Stacked barrels for clays and upland days.", price: 1890 },
  { title: "Tactical pump", description: "Short pump shotgun with a magazine extension.", price: 560 },
  { title: "Youth shotgun", description: "Shorter stock so a new shooter can mount it.", price: 390 },
  { title: "Lever shotgun", description: "Lever-action shotgun with a tubular magazine.", price: 870 },
  { title: "Single-shot shotgun", description: "Break-open shotgun that takes one shell.", price: 240 },
  { title: "Waterfowl semi-auto", description: "Camouflage semi-auto built for the marsh.", price: 1240 },
  { title: "Home defense shotgun", description: "Short barrel and a simple bead sight.", price: 510 },
  { title: "Trap gun", description: "Over-under with a high rib for rising targets.", price: 2100 },
  { title: "Skeet gun", description: "Open chokes and a stock shaped for a fast mount.", price: 1760 },
  { title: "Slug gun", description: "Rifle sights on a shotgun meant for slugs.", price: 640 },
  { title: "Compact pump", description: "A shorter pump that still feeds from a tube.", price: 475 },
  { title: "Walnut pump", description: "Pump shotgun with a walnut stock and forend.", price: 530 },
  { title: "Synthetic field gun", description: "Weather-resistant stock on a field shotgun.", price: 610 },
  { title: "Coach gun", description: "Short side-by-side with double triggers.", price: 820 },
  { title: "Inertia semi-auto", description: "Inertia-driven semi-auto with a field barrel.", price: 1090 },
  { title: "Bullpup shotgun", description: "A compact shotgun with the action behind the grip.", price: 1320 },
  { title: "Break-action combo", description: "Single-shot shotgun with an extra barrel.", price: 450 },
])

const optics = build("optics", opticPhotos, [
  { title: "Red dot", description: "A compact red-dot sight for a rifle or pistol.", price: 240 },
  { title: "Holographic sight", description: "Window-style sight with a crisp reticle.", price: 520 },
  { title: "Low mount", description: "A low optic mount that keeps the head down.", price: 65 },
  { title: "Riser", description: "A short riser for a more upright sight picture.", price: 48 },
  { title: "Magnifier", description: "Flip-to-side magnifier that sits behind a dot.", price: 310 },
  { title: "Iron sights", description: "A front and rear sight set.", price: 90 },
  { title: "Low-power variable optic", description: "A 1–6 style scope for a general-purpose rifle.", price: 420 },
  { title: "Mid-power scope", description: "More magnification for a longer shot.", price: 560 },
  { title: "High-power hunting scope", description: "A larger scope for open country.", price: 680 },
  { title: "Spotting scope", description: "Angled eyepiece for glassing from a rest.", price: 740 },
  { title: "Binoculars", description: "A mid-size binocular for the range bag.", price: 210 },
  { title: "Rangefinder", description: "Handheld rangefinder with a clear readout.", price: 280 },
  { title: "Night vision monocular", description: "A single-tube night vision unit.", price: 1890 },
  { title: "Thermal monocular", description: "Handheld thermal for spotting heat.", price: 1640 },
  { title: "Pistol red dot", description: "A small optic cut for a pistol slide.", price: 320 },
  { title: "Offset iron sights", description: "Canted sights that clear a primary optic.", price: 110 },
  { title: "Scope sunshade", description: "A short shade that threads onto the objective.", price: 28 },
  { title: "Throw lever", description: "A lever that makes the magnification ring easier to turn.", price: 36 },
  { title: "Anti-reflection device", description: "A honeycomb shade for the objective lens.", price: 72 },
  { title: "Compact prism sight", description: "A small etched-reticle prism optic.", price: 290 },
])

const accessories = build("accessories", [...longGuns, ...handgunPhotos], [
  { title: "Weapon light", description: "A rail light with a clicky tail cap.", price: 140 },
  { title: "Laser aiming module", description: "A compact laser that shares a rail slot.", price: 260 },
  { title: "Two-point sling", description: "An adjustable sling with quiet hardware.", price: 48 },
  { title: "Single-point sling", description: "A short sling that parks the rifle in front.", price: 36 },
  { title: "Electronic ear pro", description: "Muffs that amplify talk and cut the shot.", price: 72 },
  { title: "Clear glasses", description: "Wraparound eye protection with a clear lens.", price: 18 },
  { title: "Rifle magazine", description: "A polymer magazine for a semi-auto rifle.", price: 16 },
  { title: "Pistol magazine", description: "A metal magazine for a compact pistol.", price: 32 },
  { title: "Bipod", description: "A folding bipod that clamps to a rail.", price: 120 },
  { title: "Tripod", description: "A field tripod tall enough to shoot from.", price: 210 },
  { title: "Paper targets", description: "A pack of silhouette targets.", price: 12 },
  { title: "Steel target", description: "An hanging plate with a fresh face.", price: 85 },
  { title: "Scope base", description: "A two-piece base for a bolt rifle.", price: 42 },
  { title: "Scope mount", description: "A one-piece mount that holds the rings.", price: 130 },
  { title: "Scope rings", description: "A matched pair of rings in a medium height.", price: 64 },
  { title: "Light pressure switch", description: "A tape switch for a rail-mounted light.", price: 55 },
  { title: "Sling stud adapter", description: "Turns a sling stud into a socket for a bipod.", price: 22 },
  { title: "Magazine pouch", description: "A belt pouch that holds one rifle magazine.", price: 28 },
  { title: "Amber glasses", description: "Eye protection with an amber lens.", price: 18 },
  { title: "Rail panel set", description: "Soft panels that cover unused rail.", price: 24 },
])

const parts = build("parts", [...handgunPhotos, ...longGuns], [
  { title: "Handgun trigger", description: "A curved trigger shoe for a striker pistol.", price: 160 },
  { title: "Handgun frame", description: "A stripped polymer frame.", price: 280 },
  { title: "Handgun barrel", description: "A drop-in barrel with a threaded muzzle.", price: 190 },
  { title: "Slide", description: "An optics-cut slide without a barrel.", price: 340 },
  { title: "Rifle trigger", description: "A single-stage trigger for a rifle lower.", price: 150 },
  { title: "Rifle barrel", description: "A mid-length barrel with a pinned gas block.", price: 220 },
  { title: "Upper receiver parts", description: "A small parts kit for an upper.", price: 28 },
  { title: "Stock", description: "A collapsible stock with a rubber pad.", price: 75 },
  { title: "Brace", description: "A stabilizing brace for a short firearm.", price: 140 },
  { title: "Bolt carrier group", description: "A complete bolt and carrier.", price: 160 },
  { title: "Bolt", description: "A spare bolt head for a semi-auto rifle.", price: 90 },
  { title: "Handguard rail", description: "A free-float rail that replaces the handguard.", price: 180 },
  { title: "Lower parts kit", description: "Pins, springs, and a safety selector.", price: 45 },
  { title: "Lower receiver", description: "A stripped lower receiver.", price: 110 },
  { title: "Recoil spring", description: "A replacement spring for a pistol.", price: 18 },
  { title: "Guide rod", description: "A steel guide rod for a full-size pistol.", price: 32 },
  { title: "Extractor", description: "A spare extractor and spring.", price: 24 },
  { title: "Safety selector", description: "A short-throw selector lever.", price: 36 },
  { title: "Buffer spring", description: "A rifle buffer spring.", price: 14 },
  { title: "Charging handle", description: "An ambidextrous charging handle.", price: 68 },
])

const ammo = build("ammo", [...handgunPhotos, ...longGuns], [
  { title: "Handgun practice, 50 rounds", description: "A box of full-metal-jacket handgun ammunition.", price: 18 },
  { title: "Handgun defense, 20 rounds", description: "A short box of hollow-point handgun ammunition.", price: 28 },
  { title: "Rifle practice, 20 rounds", description: "A box of brass-cased rifle ammunition.", price: 16 },
  { title: "Rifle match, 20 rounds", description: "Match rifle ammunition with a consistent load.", price: 32 },
  { title: "Shotgun target load", description: "A box of light target shells.", price: 12 },
  { title: "Shotgun buckshot", description: "A box of buckshot shells.", price: 22 },
  { title: "Rimfire brick", description: "A bulk pack of rimfire cartridges.", price: 40 },
  { title: "Rimfire hunting, 50 rounds", description: "Hollow-point rimfire in a small box.", price: 14 },
  { title: "Slug, 5 rounds", description: "A five-pack of shotgun slugs.", price: 9 },
  { title: "Birdshot, 25 rounds", description: "A box of upland birdshot.", price: 15 },
  { title: "Subsonic handgun, 50 rounds", description: "Heavier handgun ammunition loaded subsonic.", price: 36 },
  { title: "Training rifle, 200 rounds", description: "A larger pack of rifle practice ammunition.", price: 110 },
  { title: "Defensive rifle, 20 rounds", description: "A box of soft-point rifle ammunition.", price: 26 },
  { title: "Shotshells, low recoil", description: "Lighter shells for a long round of clays.", price: 13 },
  { title: "Magnum handgun, 20 rounds", description: "A box of magnum revolver ammunition.", price: 30 },
  { title: "Cowboy action, 50 rounds", description: "Lead handgun ammunition for a light load.", price: 24 },
  { title: "Rifle hunting, 20 rounds", description: "A hunting load in a twenty-round box.", price: 38 },
  { title: "Buck and ball", description: "A small box of mixed shotgun loads.", price: 18 },
  { title: "Tracer practice, 20 rounds", description: "Rifle practice ammunition with a visible trace.", price: 22 },
  { title: "Small pistol primers", description: "A sleeve of primers for handloading.", price: 8 },
])

const services = build("services", longGuns, [
  { title: "Firearm transfer", description: "Receive a shipped firearm and run the transfer.", price: 40 },
  { title: "Private-party transfer", description: "Transfer between two people in the shop.", price: 35 },
  { title: "Laser engraving, small", description: "A short line engraved on metal.", price: 45 },
  { title: "Laser engraving, receiver", description: "Engraving across a receiver flat.", price: 85 },
  { title: "Cerakote, one color", description: "A single-color coating on a firearm.", price: 175 },
  { title: "Cerakote, two colors", description: "A two-color coating with a simple break.", price: 240 },
  { title: "Cerakote, small part", description: "Coating for a single small part.", price: 40 },
  { title: "Sight installation", description: "Install and center a set of sights.", price: 30 },
  { title: "Optic mounting", description: "Mount and level an optic on a rifle.", price: 40 },
  { title: "Bore sight", description: "A rough zero before the first shots.", price: 20 },
  { title: "Pin and weld", description: "Pin and weld a muzzle device to length.", price: 60 },
  { title: "Trigger install", description: "Install a drop-in trigger and check function.", price: 45 },
  { title: "Stock fit", description: "Fit a stock or brace and torque the hardware.", price: 25 },
  { title: "Deep clean", description: "Detail strip and clean of one firearm.", price: 80 },
  { title: "Function check", description: "A safety and function check after parts work.", price: 15 },
  { title: "Magazine catch tune", description: "Adjust a magazine catch that sits proud.", price: 20 },
  { title: "Slide milling referral", description: "Arrange optics milling for a pistol slide.", price: 150 },
  { title: "Serialized engraving", description: "Engrave a required mark on a receiver.", price: 55 },
  { title: "Color match", description: "Match a new part to an existing coating.", price: 70 },
  { title: "Rush coating", description: "Move a one-color coating ahead in the queue.", price: 50 },
])

const merch = build("merch", [images.compact, images.camo, images.scoped, images.dot], [
  { title: "Cap", description: "A structured cap with the shop mark.", price: 24 },
  { title: "Knit beanie", description: "A watch cap for a cold range morning.", price: 22 },
  { title: "T-shirt", description: "A short-sleeve shirt in a heavy cotton.", price: 28 },
  { title: "Long-sleeve shirt", description: "A long-sleeve shirt with a small chest mark.", price: 34 },
  { title: "Hoodie", description: "A pullover hoodie with a front pocket.", price: 52 },
  { title: "Zip hoodie", description: "A zip hoodie in a mid weight.", price: 58 },
  { title: "Patch", description: "An embroidered patch ready to sew on.", price: 8 },
  { title: "Morale patch", description: "A hook-backed patch for a hat or bag.", price: 12 },
  { title: "Sticker", description: "A die-cut sticker of the shield mark.", price: 4 },
  { title: "Sticker pack", description: "A small set of shop stickers.", price: 10 },
  { title: "Printed magazine", description: "A shop magazine of notes and photos.", price: 8 },
  { title: "Range tee", description: "A lighter shirt for a hot day on the line.", price: 26 },
  { title: "Pocket tee", description: "A shirt with a single chest pocket.", price: 30 },
  { title: "Work shirt", description: "A button shirt that can take a patch.", price: 42 },
  { title: "Crewneck", description: "A crewneck sweatshirt without a hood.", price: 46 },
  { title: "Hat, unstructured", description: "A soft hat with a curved brim.", price: 24 },
  { title: "Lapel pin", description: "A small metal pin of the shield.", price: 10 },
  { title: "Keychain", description: "A metal keychain with the shop name.", price: 12 },
  { title: "Decal sheet", description: "Several small decals on one sheet.", price: 6 },
  { title: "Shop coin", description: "A metal coin with the shield on the face.", price: 15 },
])

const extras = build("extras", [images.rail, images.compact, images.camo, images.mag], [
  { title: "Range bag", description: "A soft bag with padded pistol sleeves.", price: 70 },
  { title: "Rifle case", description: "A padded soft case for one rifle.", price: 55 },
  { title: "Cleaning kit", description: "Rod, patches, and a small bottle of solvent.", price: 28 },
  { title: "Bore snake", description: "A pull-through cleaner for one caliber.", price: 14 },
  { title: "Solvent", description: "A bottle of carbon solvent.", price: 12 },
  { title: "Oil", description: "A small bottle of gun oil.", price: 10 },
  { title: "Cleaning mat", description: "A mat with a parts tray printed on it.", price: 22 },
  { title: "Brass brush", description: "A caliber-specific brass brush.", price: 6 },
  { title: "Jag and tip set", description: "Tips that fit a standard cleaning rod.", price: 16 },
  { title: "Less-lethal launcher", description: "A dedicated launcher sold as its own item.", price: 320 },
  { title: "Less-lethal rounds", description: "A short box of less-lethal projectiles.", price: 24 },
  { title: "Glove set", description: "Light gloves for handling solvent.", price: 8 },
  { title: "Chamber flag", description: "A bright flag that shows an open chamber.", price: 5 },
  { title: "Armorers wrench", description: "A wrench for common rifle hardware.", price: 32 },
  { title: "Torque driver", description: "A small driver for optic screws.", price: 48 },
  { title: "Punch set", description: "Roll-pin punches in a few sizes.", price: 26 },
  { title: "Bench block", description: "A plastic block for driving pins.", price: 18 },
  { title: "Patch holder", description: "A loop tip that holds a cleaning patch.", price: 7 },
  { title: "Soft pistol rug", description: "A small rug for one handgun.", price: 20 },
  { title: "Dry bag", description: "A roll-top bag for a wet day outside.", price: 36 },
])

export const sampleProducts: SampleProduct[] = [
  ...rifles,
  ...handguns,
  ...shotguns,
  ...optics,
  ...accessories,
  ...parts,
  ...ammo,
  ...services,
  ...merch,
  ...extras,
]

const byId = new Map<string, SampleProduct>()
const byCategory = new Map<string, SampleProduct[]>()

for (const product of sampleProducts) {
  if (byId.has(product.id)) {
    throw new Error(`Duplicate sample product id: ${product.id}`)
  }
  byId.set(product.id, product)
  const list = byCategory.get(product.category)
  if (list) list.push(product)
  else byCategory.set(product.category, [product])
}

for (const category of mainCategories) {
  const slug = category.href.replace(/^\//, "")
  if (!byCategory.has(slug)) {
    throw new Error(`Sample catalog is missing category: ${slug}`)
  }
}

export function getProductsByCategory(slug: string) {
  return byCategory.get(slug) ?? []
}

export function getSampleProduct(id: string) {
  return byId.get(id)
}

export function productPath(id: string) {
  return `/products/${id}`
}
