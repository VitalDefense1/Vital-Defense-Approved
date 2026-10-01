<?php
$products = $args['products'] ?? array();
if ( ! $products ) {
	echo '<p class="vd-empty">No products in this category yet.</p>';
	return;
}
?>
<div class="vd-listing-mobile" data-listing data-page-size="12">
	<?php vd_render_product_grid( $products, 'vd-grid-2' ); ?>
</div>
<div class="vd-listing-desktop" data-listing data-page-size="18">
	<?php vd_render_product_grid( $products, 'vd-grid-3' ); ?>
</div>
