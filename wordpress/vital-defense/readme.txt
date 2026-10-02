Vital Defense staging theme
===========================

Theme 1.1.5. Category cards keep a gap between the two phone columns, show an Add to cart button under the price, and open /products/… detail pages even when rewrite rules were not saved. The footer label reads Contact information. On a phone, the intro film starts inside the “I am over 21” tap, muted and inline, including when the file was not buffered yet. The film file is H.264 High profile level 4.0 with no audio track, and the theme sends it as video/mp4 with byte ranges. Category addresses such as /rifles/ are resolved by the theme even if rewrite rules were not saved yet. Links are paths on the current site, not the local preview address.

Replacing an installed copy
---------------------------

Uploading this ZIP does not delete pages, categories, products, or Customizer text. Keep the folder name vital-defense.

1. In WordPress, go to Appearance → Themes → Add New → Upload Theme and choose the new ZIP.
2. If WordPress says the destination folder already exists, do not delete products or pages. Use the host file manager or SFTP to replace wp-content/themes/vital-defense with the folder inside the ZIP. Leave the folder name as vital-defense.
3. Open the site homepage once, then go to Settings → Permalinks, choose Post name, and click Save Changes.
4. If a category still says Page not found, open Tools → Vital Defense samples and click “Create sample categories and products.” That button writes sample categories and sample products. It does not connect FFL Cockpit.
5. If the host caches pages, purge that cache so the new theme script loads. The script address ends in ver=1.1.5. On a phone, open the homepage in a private tab, accept the age question, and confirm the film plays. iPhone Reduce Motion skips the film and shows the finished homepage.

Sample products are for testing until a real product feed is connected. Subcategories with no products show an empty listing, not a missing page. WooCommerce is not required. This theme’s categories are separate from WooCommerce product categories.

This file ships inside the theme. It explains how to install the approved WordPress design on a new hosted staging site.

This package does not purchase hosting, point vitaldefenseco.com at the new site, change DNS or Cloudflare, or edit the current live website. Leave FFL Cockpit credentials and any live shop integration untouched.


Versions that were actually tested
----------------------------------

The local preview that matches tag approved-wordpress-design-v1 was:

- WordPress 7.1.2
- PHP 8.3.6
- Theme Vital Defense 1.1.2
- Permalinks set to Post name
- Database: SQLite, through the SQLite Database Integration plugin 3.0.2 and its db.php drop-in

That SQLite plugin was only for the local preview. A normal host gives you MySQL or MariaDB. Do not install the SQLite plugin on the host unless the host has no MySQL database.

The theme file says it needs WordPress 6.4 or newer and PHP 8.0 or newer, and that it was checked through WordPress 7.1. Only WordPress 7.1.2 and PHP 8.3.6 were exercised for this package, on the local preview. Theme 1.1.4 was checked on the local preview for phone-sized playback after the age question. It was not installed on the Convesio test site during packaging.

Required plugins: none.

WordPress includes Akismet and Hello Dolly on a new site. Leave them inactive. They are not part of this design. WooCommerce is not used. Do not install WooCommerce to make the menu or the product pages work.


What is in the theme ZIP, and what is not
-----------------------------------------

Uploading the theme does not, by itself, rebuild the preview. Two different things have to happen.

1. The theme files. Logos, photographs, brand marks, the opening video, styles, and the catalog names are files in this theme. They are not in the Media Library. The local preview’s Media Library was empty.

2. Demo content created in the database the first time you activate the theme on that site. Activation creates:

   - Pages named Home, Contact, and Cart. Home is set as the static homepage.
   - The catalog category tree (10 top-level categories and their subcategories).
   - 200 demo products attached to those top-level categories.
   - Permalinks of the form /%postname%/.
   - “Discourage search engines from indexing this site.”

   The hamburger menu is not a WordPress menu under Appearance → Menus. It is drawn from the catalog categories. The local preview had no menus saved there. Footer category links are the same top-level categories.

   Homepage sentences, the phone number, the email address, “BY APPOINTMENT ONLY,” and the blank street address are defaults in the theme. The local preview did not save separate Customizer overrides. You can change those later under Appearance → Customize → Vital Defense content.

Activation stores an option named vd_seeded. The demo content is created only when that option is missing. Activating the theme a second time, or switching away and back, does not rebuild products you deleted. For a clean copy, start from a new empty WordPress site and activate the theme once.

There is no separate database file to import. A Tools → Export file can back up pages and products after they exist, but that export does not contain the theme photographs, the video, or the category path data the menu links need. Restoring the preview means this theme on a fresh site, then one activation. The export is only an extra backup.


Demo content and real store data
--------------------------------

The 200 products, their prices, and most of their pictures are made-up listings so the grids can be reviewed. The same few photographs are reused on purpose. These are not the shop’s inventory, stock counts, or prices. Subcategory pages, such as Semi Auto Rifles or Triggers, open a normal listing and say “No products in this category yet.” The demo products sit on the parent category (Rifles, Handguns, and so on), not on those subcategories.

Phone (386) 466-5353, sales@vitaldefenseco.com, and Lake City, Florida are the published contact details. The street address is blank until you type one in the Customizer.

Category names match the approved navigation. They are not an import from a live catalog. “AR Style Rifles” is not a category. Those rifles belong under Semi Auto Rifles.

Do not type FFL Cockpit passwords, API keys, or live payment credentials into this staging site.


Create the ZIP if you are packing it yourself
----------------------------------------------

From the repository, zip the vital-defense folder so style.css is inside that folder, not loose at the top of the ZIP:

    vital-defense/style.css
    vital-defense/functions.php
    vital-defense/assets/...

Do not zip the Next.js app, node_modules, or the whole repository. WordPress will reject a ZIP that is not a theme.


Install on a host’s temporary address
--------------------------------------

Use the host’s temporary address, such as a staging subdomain the host assigns. Do not attach vitaldefenseco.com.

1. Create a new WordPress site on that temporary address. Choose the host’s MySQL database when it offers one. Create the WordPress administrator while you are there, and store that password somewhere safe.

2. Before you send the address to anyone, turn on the host’s password protection for the site. Hosting panels call this Directory Privacy, Password Protect, Coming Soon, or a staging lock. Pick a password for visitors. That password is separate from the WordPress administrator login. WordPress itself does not lock the whole site.

3. In WordPress, go to Appearance → Themes → Add New → Upload Theme. Choose vital-defense-1.1.5.zip and install it, then click Activate.

   The ZIP is about 15 MB because the opening video is inside it. If the host refuses the upload, the limit is usually smaller than the file. Use the host’s file manager or SFTP instead: unzip the package and place the vital-defense folder in wp-content/themes/. Then use Appearance → Themes and activate Vital Defense. Do not rename the folder.

4. Open the site’s homepage once. The first activation builds the demo pages, categories, and products. Give it a moment.

5. Go to Settings → Permalinks. Choose Post name and click Save Changes. Do this even if Post name is already selected. Saving refreshes the category links.

6. Go to Settings → Reading.
   - “Your homepage displays” should be “A static page,” and the homepage should be Home.
   - Leave the posts page blank.
   - Check “Discourage search engines from indexing this site” and save.

7. Trash the default “Sample Page” if it is still published. It is not part of this design. Leave the Privacy Policy draft alone unless you want to write one.

8. Take a backup from the host panel now that the demo content exists. If the host has automatic backups, turn them on before you upload the theme as well. An optional extra copy is Tools → Export → All content. Keep that file with the backup. It does not replace the theme ZIP.


Check the staging site
-----------------------

Look at the temporary address while logged out, on a desktop window and on a phone width (or a real phone).

- The age question appears once. Choosing “I am over 21” hides it in that browser. It does not verify an ID.
- The homepage intro video plays. When the shield in the video reaches the header, it matches the header logo’s position and size, and the page does not jump sideways.
- The header logo is centered on the page. On a phone, the hamburger stays on the left, and search, favorites, account, and cart stay on the right.
- Open the menu. Every category name and every subcategory name is a link and opens a listing. The gold + opens and closes a group and does not navigate by itself.
- A parent category such as Rifles shows demo products. A subcategory such as Semi Auto Rifles, or Parts → Handgun Parts → Triggers, shows the empty listing message.
- Open one product. The photograph loads. Add to cart stays in this browser and does not charge a card.
- Contact shows the phone, email, and BY APPOINTMENT ONLY. The street address stays hidden while it is blank.
- Photographs, brand marks, and the opening video load. Broken images usually mean the theme folder was renamed or only part of the ZIP was uploaded.
- The page does not scroll sideways.


Limits of this staging theme
-----------------------------

These items are layout only. They were reviewed in the local preview and they are still not live features:

- Checkout, shipping, tax, and promo codes do not charge anyone or place an order.
- The contact form does not send email. Call or email the shop.
- Search does not search the catalog.
- Account sign-in is not available.
- The review form does not save a review.
- Favorites and the cart are stored in that browser only. They disappear in a private window or on another computer.
- The age gate is a self-check, not proof of age.
- FFL Cockpit is not connected.
- Additional information on a product stays empty until specifications are typed in the product editor.
- There is no separate shotgun photograph in the supplied pictures.
- The theme asks search engines not to index every page. Discourage search engines in Reading settings as well. Neither one is a password. A later public launch has to remove that noindex behavior on purpose. Do not do that for this staging site.
- Fonts are loaded from fonts.googleapis.com. If the host blocks that connection, the browser uses a fallback font and the layout can look different.
- A caching or security plugin was not part of the test. If the header looks like an older copy, clear the host cache.
- Theme 1.1.3 opens catalog paths such as /rifles/ even when rewrite rules were stale. Settings → Permalinks → Post name → Save Changes is still the right step on a normal Apache or nginx host. If the category itself is missing, Tools → Vital Defense samples creates the sample categories and sample products. Uploading the ZIP does not do that by itself when sample content was already stored.
- This package was not run through a commercial host’s installer, WordPress.com, or a host that disables custom permalink rules. If the menu links 404 after saving permalinks, the host’s support needs to allow WordPress rewrite rules. Do not point the live domain at the site to test that.
