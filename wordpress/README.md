# Vital Defense WordPress theme

This folder is the installable design theme for the approved Next.js preview. It is a separate local site. It does not change vitaldefenseco.com, DNS, or hosting, and it does not connect to FFL Cockpit or take payment.

The theme lives in `vital-defense/`. The approved design checkpoint is the Git tag `approved-wordpress-design-v1`. Staging steps, including what the theme ZIP does not create by itself, are in `vital-defense/readme.txt`. Zip only the `vital-defense` folder, then in WordPress go to Appearance → Themes → Add New → Upload Theme. Do not upload the Next.js project as a theme.

## What you can edit

In Appearance → Customize → Vital Defense content:

- Homepage headline, introduction, headings, and the Contact us label
- Opening video and featured brand marks
- Phone, email, place, appointment line, and street address

The street address stays blank until you enter one. The appointment line starts as BY APPOINTMENT ONLY.

Products, prices, descriptions, specifications, and photographs are under Products. Catalog names are under Products → Catalog categories. “AR Style Rifles” is not a category. Semi Auto Rifles is the group for those rifles.

The shield logo artwork is the approved file. Its size and position are part of the theme, not a replaceable upload.

## Local preview

The Next.js preview stays on port 4317:

```bash
npm install
npm run dev
```

WordPress needs PHP 8 with the `pdo_sqlite` extension, or MySQL if you prefer a normal host. A local SQLite setup:

```bash
php /tmp/wp-cli.phar core download --path=/tmp/vd-wp
php /tmp/wp-cli.phar config create --path=/tmp/vd-wp --dbname=vital_defense --dbuser=unused --dbpass=unused --dbhost=localhost --skip-check
# Install the SQLite Database Integration plugin, copy its db.copy file to wp-content/db.php,
# then install and activate this theme.
php -S 127.0.0.1:47221 -t /tmp/vd-wp /tmp/vd-wp/router.php
```

Use a router file so pretty permalinks work on PHP’s built-in server. On Apache or nginx, set permalinks to Post name. Turn on “Discourage search engines” before anyone outside your machine can open the preview.

Search, account, reviews, the contact form, promo codes, and checkout are layout-only. They do not send mail, save reviews, or place orders.
