# Vital Defense preview

A local visual prototype for Vital Defense in Lake City, Florida. It is a separate build from the current WordPress site at [vitaldefenseco.com](https://vitaldefenseco.com). It does not change that site, the domain, DNS, Cloudflare, or hosting.

This preview covers the look of the site and the informational pages. It does not take payment, run checkout, or connect to FFL Cockpit.

## Launch it

From this folder:

```bash
npm install
npm run dev
```

Then open [http://127.0.0.1:4317](http://127.0.0.1:4317).

To reopen it later, start the same command again and use the same address. Leave the terminal running while you look at the site. Stop it with Ctrl+C.

`npm run dev` is only a local preview server. It does not publish the site.

## What you are looking at

The homepage has the header, a footage placeholder directly under it, proposed headline copy, featured-brand placeholders, a frame for the three-firearm composite, a contact area, and a footer. The menu links to rifle, handgun, and shotgun pages. “AR Style Rifles” is not a separate label. Those rifles are under Semi Auto Rifles.

Proposed homepage headline, for your review: “Rifles, handguns, and shotguns.”

## Placeholders

The homepage uses two stand-in photographs so the layout can be judged before your files arrive:

- `public/placeholders/hero-placeholder.jpg` fills the video area. It is not your footage.
- `public/placeholders/composite-placeholder.jpg` fills the three-firearm frame. It is not your composite.

Replace those files, or pass your video into the video section, when you have the real assets. Individual firearm photos and the sticker image are still unused. Brand slots stay labeled as placeholders until you confirm the list and send logo files.

The logo on the site is `public/brand/vital-defense-logo.png`. White was removed from your original file and the empty margin was cropped. The shield, skull, and lettering were not redrawn. The original upload is still at `public/brand/vital-defense-logo.jpg`.

Phone and email are the ones published on the current contact page. Street address and hours are left off on purpose.

Search, favorites, account, and cart open short notices. They do not save anything or sell anything. The contact form explains that it does not send.

## Packages

- `next`, `react`, and `react-dom` run the preview and the local server.
- `tailwindcss` is the styling.
- `@base-ui/react`, `shadcn`, `class-variance-authority`, `cn`, `lucide-react`, and `tw-animate-css` provide the accessible menu, dialogs, and icons.
- `next-themes` and `sonner` came in with that interface kit. This preview does not use a dark theme or toast popups.

No commerce plugin is installed.

## Search engines

Every page sends `noindex`. `robots.txt` also asks crawlers not to index the preview. That is a request to well-behaved crawlers. It is not a password, and anyone with the address can still open the page.

Before a real launch, remove the `noindex` metadata in `src/app/layout.tsx` and replace `src/app/robots.ts`. Then review the host’s own “discourage search engines” switch, whether that is WordPress Reading settings or the host panel. Do that review before submitting a sitemap.

## Adapting this to a WordPress theme later

This project is a Next.js site. Copying the folder into WordPress will not turn it into a theme.

What can move across:

- The section order, spacing, colors, and type choices.
- The logo crop, which is ordinary CSS.
- The category labels in `src/lib/navigation.ts`.

What has to be rebuilt in the theme:

- Pages and routes. WordPress uses templates and permalinks, not the App Router files in `src/app`.
- The menu, search, account, cart, and pause button. Those are React components and would become theme markup plus a small script, or blocks.
- Fonts. Next.js downloads Syne and Outfit for you. A theme would load those same families itself.
- Products, checkout, and FFL Cockpit. They are not in this preview. A later theme would connect them in WordPress, not by extending these placeholder buttons.

The approved design can be followed closely. The React code itself is not the WordPress theme.
