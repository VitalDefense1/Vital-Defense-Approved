<?php
get_header();
$line1 = vd_mod( 'headline_1' );
$line2 = vd_mod( 'headline_2' );
?>
<main>
	<section class="vd-opening" aria-label="Opening" data-intro="unknown">
		<div class="vd-opening-spacer" aria-hidden="true"><div></div></div>
		<div class="vd-opening-stage" data-intro-stage>
			<video class="vd-opening-video" muted playsinline preload="auto" aria-hidden="true" data-intro-video src="<?php echo esc_url( vd_video_url() ); ?>"></video>
			<div class="vd-opening-feather" data-intro-feather aria-hidden="true"></div>
		</div>
		<div class="vd-wordmark" data-intro-wordmark>
			<img src="<?php echo esc_url( vd_asset( '/brand/vital-defense-stacked.png' ) ); ?>" alt="Vital Defense" width="1945" height="809" draggable="false">
		</div>
		<button type="button" class="vd-skip" data-intro-skip hidden>Skip intro</button>
		<div class="vd-opening-gold" data-intro-gold aria-hidden="true"></div>
	</section>

	<section class="vd-hero">
		<img class="vd-hero-watermark" src="<?php echo esc_url( vd_asset( '/photos/shield-rifle.jpg' ) ); ?>" alt="" width="1536" height="1024">
		<div class="opening-copy vd-hero-copy">
			<h1><?php echo esc_html( $line1 ); ?><br><?php echo esc_html( $line2 ); ?></h1>
			<span class="vd-rule" aria-hidden="true"></span>
			<p><?php echo esc_html( vd_mod( 'intro' ) ); ?></p>
		</div>
	</section>

	<section class="vd-brands" aria-labelledby="featured-brands">
		<div class="vd-section-title">
			<span aria-hidden="true"></span>
			<h2 id="featured-brands"><?php echo esc_html( vd_mod( 'brands_heading' ) ); ?></h2>
			<span aria-hidden="true"></span>
		</div>
		<ul class="vd-brand-row">
			<?php foreach ( vd_brands() as $brand ) : ?>
				<li>
					<img class="vd-brand vd-brand-<?php echo esc_attr( $brand['frame'] ); ?>" src="<?php echo esc_url( $brand['src'] ); ?>" alt="<?php echo esc_attr( $brand['alt'] ); ?>">
				</li>
			<?php endforeach; ?>
		</ul>
		<div class="vd-pdw">
			<img src="<?php echo esc_url( vd_asset( '/photos/pdw.png' ) ); ?>" alt="Black compact firearm with an optic, from the supplied photographs." width="1140" height="496">
		</div>
	</section>

	<?php get_template_part( 'template-parts/contact' ); ?>
	<?php get_template_part( 'template-parts/showcase' ); ?>
	<?php vd_render_category_strip(); ?>
	<div class="vd-home-contact">
		<a class="vd-button" href="<?php echo esc_url( vd_internal_url( 'contact' ) ); ?>"><?php echo esc_html( vd_mod( 'contact_button' ) ); ?></a>
	</div>
</main>
<?php
get_footer();
