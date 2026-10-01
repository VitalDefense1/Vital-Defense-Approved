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

export const departments: Department[] = [
  {
    slug: "rifles",
    label: "Rifles",
    summary: `Rifles at Vital Defense, grouped by action. The current site’s separate “AR Style Rifles” label is not used here. Those rifles belong under Semi Auto Rifles.`,
    groups: [
      {
        slug: "semi-auto",
        label: "Semi Auto Rifles",
        summary: `Semi-automatic rifles, including rifles the current navigation lists separately as AR-style.`,
      },
      {
        slug: "bolt-action",
        label: "Bolt Action Rifles",
        summary: `Bolt-action rifles.`,
      },
      {
        slug: "lever-action",
        label: "Lever Action Rifles",
        summary: `Lever-action rifles.`,
      },
      {
        slug: "pump-action",
        label: "Pump Action Rifles",
        summary: `Pump-action rifles.`,
      },
      {
        slug: "single-shot",
        label: "Single Shot Rifles",
        summary: `Single-shot rifles.`,
      },
    ],
  },
  {
    slug: "handguns",
    label: "Handguns",
    summary: `Handguns at Vital Defense, grouped by type.`,
    groups: [
      {
        slug: "semi-auto",
        label: "Semi Auto Handguns",
        summary: `Semi-automatic handguns.`,
      },
      {
        slug: "revolvers",
        label: "Revolvers",
        summary: `Revolvers.`,
      },
      {
        slug: "single-shot",
        label: "Single Shot Handguns",
        summary: `Single-shot handguns.`,
      },
      {
        slug: "derringers",
        label: "Derringers",
        summary: `Derringers.`,
      },
      {
        slug: "other",
        label: "Other Handguns",
        summary: `Handguns that do not fit the other handgun labels.`,
      },
    ],
  },
  {
    slug: "shotguns",
    label: "Shotguns",
    summary: `Shotguns at Vital Defense, grouped by action.`,
    groups: [
      {
        slug: "semi-auto",
        label: "Semi-Auto Shotguns",
        summary: `Semi-automatic shotguns.`,
      },
      {
        slug: "pump-action",
        label: "Pump Action Shotguns",
        summary: `Pump-action shotguns.`,
      },
      {
        slug: "side-by-side",
        label: "Side By Side Shotguns",
        summary: `Side-by-side shotguns.`,
      },
      {
        slug: "over-under",
        label: "Over Under Shotguns",
        summary: `Over-under shotguns.`,
      },
      {
        slug: "lever-action",
        label: "Lever Action Shotguns",
        summary: `Lever-action shotguns.`,
      },
      {
        slug: "single-shot",
        label: "Single Shot Shotguns",
        summary: `Single-shot shotguns.`,
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

/** Shop categories besides rifles, handguns, and shotguns. */
export type CatalogNode = {
  label: string
  children?: CatalogNode[]
}

export type CatalogCategory = CatalogNode & {
  slug: string
}

export type MainCategory = {
  label: string
  href: string
}

export const catalog: CatalogCategory[] = [
  {
    slug: "optics",
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
    slug: "accessories",
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
    slug: "parts",
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
    slug: "ammo",
    label: "Ammo",
    children: [
      { label: "Handgun" },
      { label: "Rifle" },
      { label: "Shotgun" },
      { label: "Rimfire" },
    ],
  },
  {
    slug: "services",
    label: "Services",
    children: [
      { label: "Transfers" },
      { label: "Laser Engraving" },
      { label: "Cerakote" },
    ],
  },
  {
    slug: "merch",
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
    slug: "extras",
    label: "Extras",
    children: [
      { label: "Range Bags" },
      { label: "Gun Cleaning" },
      { label: "Less Lethal" },
    ],
  },
]

/** Every top-level category, in menu order, with its page route. */
export const mainCategories: MainCategory[] = [
  ...departments.map((department) => ({
    label: department.label,
    href: `/${department.slug}`,
  })),
  ...catalog.map((item) => ({
    label: item.label,
    href: `/${item.slug}`,
  })),
]

export function getCatalogCategory(slug: string) {
  return catalog.find((item) => item.slug === slug)
}

