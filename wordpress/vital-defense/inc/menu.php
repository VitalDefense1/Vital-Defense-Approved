<?php

function vd_render_catalog_menu() {
	echo '<ul>';
	foreach ( vd_top_terms() as $term ) {
		vd_render_term( $term, 0 );
	}
	echo '</ul>';
}

function vd_render_term( $term, $depth ) {
	$children = vd_term_children( $term->term_id );
	$url      = vd_term_url( $term );

	if ( ! $children ) {
		echo '<li>';
		echo '<a class="vd-link vd-nav-child" href="' . esc_url( $url ) . '">' . esc_html( $term->name ) . '</a>';
		echo '</li>';
		return;
	}

	$item_class = 0 === $depth ? 'vd-nav-item' : 'vd-nav-branch';
	$link_class = 0 === $depth ? 'vd-link vd-nav-top' : 'vd-link vd-nav-nested-link';
	$list_class = 0 === $depth ? 'vd-nav-sub' : 'vd-nav-nested-list';

	echo '<li class="' . esc_attr( $item_class ) . '">';
	echo '<a class="' . esc_attr( $link_class ) . '" href="' . esc_url( $url ) . '">' . esc_html( $term->name ) . '</a>';
	echo '<details class="vd-disclosure">';
	echo '<summary class="vd-nav-toggle" aria-label="' . esc_attr( 'Show ' . $term->name . ' subcategories' ) . '"><span class="vd-plus" aria-hidden="true">+</span></summary>';
	echo '<ul class="' . esc_attr( $list_class ) . '">';
	if ( 0 === $depth ) {
		echo '<li><a class="vd-link vd-nav-child" href="' . esc_url( $url ) . '">All ' . esc_html( strtolower( $term->name ) ) . '</a></li>';
	}
	foreach ( $children as $child ) {
		vd_render_term( $child, $depth + 1 );
	}
	echo '</ul></details></li>';
}

function vd_render_category_strip() {
	echo '<nav class="vd-strip" aria-label="Categories"><ul>';
	$terms = vd_top_terms();
	foreach ( $terms as $term ) {
		echo '<li><a class="vd-link" href="' . esc_url( vd_term_url( $term ) ) . '">' . esc_html( $term->name ) . '</a></li>';
	}
	echo '</ul></nav>';
}

function vd_render_product_grid( $products, $class ) {
	echo '<div class="vd-grid-wrap" tabindex="-1">';
	echo '<ul class="' . esc_attr( $class ) . '">';
	foreach ( $products as $post ) {
		$price = vd_product_price( $post->ID );
		$url   = get_permalink( $post );
		$title = get_the_title( $post );
		echo '<li class="vd-card">';
		echo '<button type="button" class="vd-heart" data-favorite="' . esc_attr( $post->post_name ) . '" data-title="' . esc_attr( $title ) . '" aria-pressed="false" aria-label="' . esc_attr( 'Add ' . $title . ' to favorites' ) . '">' . vd_icon( 'heart' ) . '</button>';
		echo '<a class="vd-product-card" href="' . esc_url( $url ) . '">';
		echo '<span class="vd-product-media"><img src="' . esc_url( vd_product_image_url( $post->ID ) ) . '" alt=""></span>';
		echo '<span class="vd-product-title">' . esc_html( $title ) . '</span>';
		echo '<span class="vd-product-desc">' . esc_html( wp_strip_all_tags( $post->post_content ) ) . '</span>';
		echo '<span class="vd-price">' . esc_html( vd_format_price( $price ) ) . '</span>';
		echo '</a>';
		echo '<button type="button" class="vd-button vd-card-cart" data-add-cart data-id="' . esc_attr( $post->post_name ) . '" data-title="' . esc_attr( $title ) . '" data-price="' . esc_attr( (string) $price ) . '">Add to cart</button>';
		echo '</li>';
	}
	echo '</ul>';
	echo '<div class="vd-pagination" data-pagination>';
	echo '<p class="vd-muted" data-page-status></p>';
	echo '<nav aria-label="Pagination"><button type="button" data-page-prev>Previous</button><span data-page-numbers></span><button type="button" data-page-next>Next</button></nav>';
	echo '</div></div>';
}

function vd_products_for_term( $term_id ) {
	return get_posts(
		array(
			'post_type'      => 'vd_product',
			'posts_per_page' => 200,
			'orderby'        => 'menu_order',
			'order'          => 'ASC',
			'tax_query'      => array(
				array(
					'taxonomy' => 'vd_catalog',
					'field'    => 'term_id',
					'terms'    => array( (int) $term_id ),
				),
			),
		)
	);
}
