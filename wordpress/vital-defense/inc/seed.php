<?php

function vd_after_switch() {
	vd_register_types();
	vd_rewrite_rules();
	flush_rewrite_rules();
	if ( get_option( 'vd_seeded' ) ) {
		return;
	}
	vd_seed_catalog();
	wp_cache_flush();
	vd_seed_products();
	vd_seed_pages();
	update_option( 'vd_seeded', '1' );
	delete_transient( 'vd_catalog_index' );
}
add_action( 'after_switch_theme', 'vd_after_switch' );

function vd_seed_catalog() {
	$order = 0;
	foreach ( vd_catalog_tree() as $node ) {
		vd_seed_term( $node, 0, $order, true );
		$order += 10;
	}
}

function vd_seed_term( $node, $parent, $order, $public ) {
	$path   = $node['path'];
	$slug   = $parent ? get_term( $parent, 'vd_catalog' )->slug . '-' . $path : $path;
	$exists = term_exists( $slug, 'vd_catalog' );
	if ( $exists ) {
		$term_id = (int) ( is_array( $exists ) ? $exists['term_id'] : $exists );
	} else {
		$created = wp_insert_term(
			$node['label'],
			'vd_catalog',
			array(
				'slug'        => $slug,
				'parent'      => $parent,
				'description' => $node['summary'] ?? '',
			)
		);
		if ( is_wp_error( $created ) ) {
			return 0;
		}
		$term_id = (int) $created['term_id'];
	}
	$is_public = array_key_exists( 'public', $node ) ? (bool) $node['public'] : $public;
	update_term_meta( $term_id, '_vd_path', $path );
	update_term_meta( $term_id, '_vd_order', $order );
	update_term_meta( $term_id, '_vd_public', $is_public ? '1' : '0' );
	if ( ! empty( $node['photo'] ) ) {
		update_term_meta( $term_id, '_vd_photo', $node['photo'] );
		update_term_meta( $term_id, '_vd_photo_w', (int) $node['photo_w'] );
		update_term_meta( $term_id, '_vd_photo_h', (int) $node['photo_h'] );
		update_term_meta( $term_id, '_vd_photo_alt', $node['photo_alt'] );
		update_term_meta( $term_id, '_vd_photo_wide', ! empty( $node['wide'] ) ? '1' : '0' );
	}
	$child_order = 0;
	foreach ( $node['children'] ?? array() as $child ) {
		$child_public = array_key_exists( 'public', $child ) ? (bool) $child['public'] : $is_public;
		vd_seed_term( $child, $term_id, $child_order, $child_public );
		$child_order += 10;
	}
	return $term_id;
}

function vd_seed_products() {
	$file = get_template_directory() . '/inc/products.json';
	if ( ! file_exists( $file ) ) {
		return;
	}
	$products = json_decode( file_get_contents( $file ), true );
	if ( ! is_array( $products ) ) {
		return;
	}
	$order = 0;
	foreach ( $products as $product ) {
		$existing = get_page_by_path( $product['id'], OBJECT, 'vd_product' );
		if ( $existing ) {
			$post_id = $existing->ID;
		} else {
			$post_id = wp_insert_post(
				array(
					'post_type'    => 'vd_product',
					'post_status'  => 'publish',
					'post_title'   => $product['title'],
					'post_name'    => $product['id'],
					'post_content' => $product['description'],
					'menu_order'   => $order,
				)
			);
		}
		if ( ! $post_id || is_wp_error( $post_id ) ) {
			continue;
		}
		update_post_meta( $post_id, '_vd_price', (float) $product['price'] );
		update_post_meta( $post_id, '_vd_image', $product['image']['src'] ?? '' );
		$term = vd_find_top( $product['category'] );
		if ( $term ) {
			wp_set_object_terms( $post_id, array( (int) $term->term_id ), 'vd_catalog' );
		}
		$order++;
	}
}

function vd_seed_pages() {
	$home = vd_ensure_page( 'Home', 'home' );
	$contact = vd_ensure_page( 'Contact', 'contact' );
	vd_ensure_page( 'Cart', 'cart' );
	if ( $home ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $home );
	}
	if ( $contact ) {
		update_option( 'page_for_posts', 0 );
	}
	update_option( 'blog_public', '0' );
	update_option( 'permalink_structure', '/%postname%/' );
}

function vd_ensure_page( $title, $slug, $template = '' ) {
	$existing = get_page_by_path( $slug );
	if ( $existing ) {
		$post_id = $existing->ID;
	} else {
		$post_id = wp_insert_post(
			array(
				'post_type'   => 'page',
				'post_status' => 'publish',
				'post_title'  => $title,
				'post_name'   => $slug,
			)
		);
	}
	if ( $template && $post_id && ! is_wp_error( $post_id ) ) {
		update_post_meta( $post_id, '_wp_page_template', $template );
	}
	return is_wp_error( $post_id ) ? 0 : (int) $post_id;
}
