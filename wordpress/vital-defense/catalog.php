<?php
$path = get_query_var( 'vd_catalog' );
$term = vd_find_top( $path );
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
?>
<main>
	<header class="vd-page-head">
		<p class="vd-kicker">Vital Defense</p>
		<span class="vd-rule" aria-hidden="true"></span>
		<h1><?php echo esc_html( $term->name ); ?></h1>
	</header>
	<div class="vd-listing">
		<?php get_template_part( 'template-parts/listing', null, array( 'products' => $products ) ); ?>
	</div>
</main>
<?php
get_footer();
