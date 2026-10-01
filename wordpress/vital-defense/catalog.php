<?php
$term = vd_resolve_catalog_term();
get_header();
if ( ! $term ) {
	status_header( 404 );
	?>
	<main class="vd-page">
		<header class="vd-page-head">
			<p class="vd-kicker">Vital Defense</p>
			<span class="vd-rule" aria-hidden="true"></span>
			<h1>Page not found</h1>
		</header>
	</main>
	<?php
	get_footer();
	return;
}
$products = vd_products_for_term( $term->term_id );
$parent   = $term->parent ? get_term( (int) $term->parent, 'vd_catalog' ) : null;
?>
<main>
	<header class="vd-page-head">
		<p class="vd-kicker">
			<?php if ( $parent && ! is_wp_error( $parent ) ) : ?>
				<a class="vd-link" href="<?php echo esc_url( vd_term_url( $parent ) ); ?>"><?php echo esc_html( $parent->name ); ?></a>
			<?php else : ?>
				Vital Defense
			<?php endif; ?>
		</p>
		<span class="vd-rule" aria-hidden="true"></span>
		<h1><?php echo esc_html( $term->name ); ?></h1>
	</header>
	<div class="vd-listing">
		<?php get_template_part( 'template-parts/listing', null, array( 'products' => $products ) ); ?>
	</div>
</main>
<?php
get_footer();
