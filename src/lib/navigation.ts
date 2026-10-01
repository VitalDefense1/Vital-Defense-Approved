export type NavGroup = {
  slug: string
  label: string
  summary: string
}

export type Department = {
  slug: string
  label: string
  summary: string
  groups: NavGroup[]
}

const noListings = "Product listings, prices, and stock are not part of this preview."

export const departments: Department[] = [
  {
    slug: "rifles",
    label: "Rifles",
    summary: `Rifles at Vital Defense, grouped by action. The current site’s separate “AR Style Rifles” label is not used here. Those rifles belong under Semi Auto Rifles. ${noListings}`,
    groups: [
      {
        slug: "semi-auto",
        label: "Semi Auto Rifles",
        summary: `Semi-automatic rifles, including rifles the current navigation lists separately as AR-style. ${noListings}`,
      },
      {
        slug: "bolt-action",
        label: "Bolt Action Rifles",
        summary: `Bolt-action rifles. ${noListings}`,
      },
      {
        slug: "lever-action",
        label: "Lever Action Rifles",
        summary: `Lever-action rifles. ${noListings}`,
      },
      {
        slug: "pump-action",
        label: "Pump Action Rifles",
        summary: `Pump-action rifles. ${noListings}`,
      },
      {
        slug: "single-shot",
        label: "Single Shot Rifles",
        summary: `Single-shot rifles. ${noListings}`,
      },
    ],
  },
  {
    slug: "handguns",
    label: "Handguns",
    summary: `Handguns at Vital Defense, grouped by type. ${noListings}`,
    groups: [
      {
        slug: "semi-auto",
        label: "Semi Auto Handguns",
        summary: `Semi-automatic handguns. ${noListings}`,
      },
      {
        slug: "revolvers",
        label: "Revolvers",
        summary: `Revolvers. ${noListings}`,
      },
      {
        slug: "single-shot",
        label: "Single Shot Handguns",
        summary: `Single-shot handguns. ${noListings}`,
      },
      {
        slug: "derringers",
        label: "Derringers",
        summary: `Derringers. ${noListings}`,
      },
      {
        slug: "other",
        label: "Other Handguns",
        summary: `Handguns that do not fit the other handgun labels. ${noListings}`,
      },
    ],
  },
  {
    slug: "shotguns",
    label: "Shotguns",
    summary: `Shotguns at Vital Defense, grouped by action. ${noListings}`,
    groups: [
      {
        slug: "semi-auto",
        label: "Semi-Auto Shotguns",
        summary: `Semi-automatic shotguns. ${noListings}`,
      },
      {
        slug: "pump-action",
        label: "Pump Action Shotguns",
        summary: `Pump-action shotguns. ${noListings}`,
      },
      {
        slug: "side-by-side",
        label: "Side By Side Shotguns",
        summary: `Side-by-side shotguns. ${noListings}`,
      },
      {
        slug: "over-under",
        label: "Over Under Shotguns",
        summary: `Over-under shotguns. ${noListings}`,
      },
      {
        slug: "lever-action",
        label: "Lever Action Shotguns",
        summary: `Lever-action shotguns. ${noListings}`,
      },
      {
        slug: "single-shot",
        label: "Single Shot Shotguns",
        summary: `Single-shot shotguns. ${noListings}`,
      },
    ],
  },
]

export function getDepartment(slug: string) {
  return departments.find((department) => department.slug === slug)
}

export function getGroup(departmentSlug: string, groupSlug: string) {
  const department = getDepartment(departmentSlug)
  const group = department?.groups.find((item) => item.slug === groupSlug)
  if (!department || !group) return undefined
  return { department, group }
}

/** Shop categories that do not have pages yet. Names only — no destinations. */
export type CatalogNode = {
  label: string
  children?: CatalogNode[]
}

export type MainCategory = {
  label: string
  href?: string
}

export const catalog: CatalogNode[] = [
  {
    label: "Optics",
    children: [
      { label: "Red Dots and Holographics" },
      { label: "Mounts and Risers" },
      { label: "Magnifiers" },
      { label: "Iron & Other Sights" },
      { label: "LPVO, MPVO, HPVO" },
      { label: "Spotting Scopes" },
      { label: "Binos" },
      { label: "Range Finders" },
      { label: "Night Vision" },
      { label: "Thermal" },
    ],
  },
  {
    label: "Accessories",
    children: [
      { label: "Lights and Lasers" },
      { label: "Slings" },
      { label: "Ear Pro / Eye Pro" },
      { label: "Magazines" },
      { label: "Bipods / Tripods" },
      { label: "Targets" },
      { label: "Scope Bases" },
      { label: "Scope Mounts" },
      { label: "Scope Rings" },
    ],
  },
  {
    label: "Parts",
    children: [
      {
        label: "Handgun Parts",
        children: [
          { label: "Triggers" },
          { label: "Frames" },
          { label: "Barrels" },
          { label: "Slides" },
        ],
      },
      {
        label: "Long Gun Parts",
        children: [
          { label: "Triggers" },
          { label: "Barrels" },
          { label: "AR Upper Parts" },
          { label: "Stocks/Braces" },
          { label: "Bolts / BCGs" },
          { label: "Rails" },
          { label: "Lower Parts" },
          { label: "Lower Receivers" },
        ],
      },
    ],
  },
  {
    label: "Ammo",
    children: [
      { label: "Handgun" },
      { label: "Rifle" },
      { label: "Shotgun" },
      { label: "Rimfire" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Transfers" },
      { label: "Laser Engraving" },
      { label: "Cerakote" },
    ],
  },
  {
    label: "Merch",
    children: [
      { label: "Hats" },
      { label: "Shirts" },
      { label: "Hoodies" },
      { label: "Patches" },
      { label: "Stickers" },
      { label: "Magazines" },
    ],
  },
  {
    label: "Extras",
    children: [
      { label: "Range Bags" },
      { label: "Gun Cleaning" },
      { label: "Less Lethal" },
    ],
  },
]

/** Every top-level category, in menu order. Firearm entries keep their pages. */
export const mainCategories: MainCategory[] = [
  ...departments.map((department) => ({
    label: department.label,
    href: `/${department.slug}`,
  })),
  ...catalog.map((item) => ({ label: item.label })),
]

