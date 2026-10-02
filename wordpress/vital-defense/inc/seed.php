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

function vd_sync_catalog() {
	if ( '4' === get_option( 'vd_catalog_ver' ) ) {
		return;
	}
	vd_seed_catalog();
	$products = wp_count_posts( 'vd_product' );
	if ( empty( $products->publish ) ) {
		vd_seed_products();
	}
	flush_rewrite_rules( false );
	update_option( 'vd_catalog_ver', '4' );
	update_option( 'vd_rewrite_ver', '5' );
	delete_transient( 'vd_catalog_index' );
}

function vd_install_sample_content() {
	vd_seed_catalog();
	vd_seed_products();
	vd_ensure_page( 'Home', 'home' );
	vd_ensure_page( 'Contact', 'contact' );
	vd_ensure_page( 'Cart', 'cart' );
	flush_rewrite_rules( false );
}

function vd_sample_content_counts() {
	$terms = get_terms(
		array(
			'taxonomy'   => 'vd_catalog',
			'hide_empty' => false,
		)
	);
	$products = wp_count_posts( 'vd_product' );
	return array(
		'categories' => is_wp_error( $terms ) ? 0 : count( $terms ),
		'products'   => isset( $products->publish ) ? (int) $products->publish : 0,
	);
}

function vd_sample_admin_menu() {
	add_management_page(
		'Vital Defense samples',
		'Vital Defense samples',
		'manage_options',
		'vd-sample-content',
		'vd_sample_admin_page'
	);
}
add_action( 'admin_menu', 'vd_sample_admin_menu' );

function vd_sample_admin_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	if ( isset( $_POST['vd_install_samples'] ) && check_admin_referer( 'vd_install_samples' ) ) {
		vd_install_sample_content();
		update_option( 'vd_catalog_ver', '4' );
		update_option( 'vd_rewrite_ver', '5' );
		delete_transient( 'vd_catalog_index' );
		echo '<div class="notice notice-success"><p>Sample categories and products are in place. Existing pages, Customizer text, and products you added yourself stay in place. Built-in sample products are refreshed.</p></div>';
	}
	$counts = vd_sample_content_counts();
	$permalinks = get_option( 'permalink_structure' );
	echo '<div class="wrap">';
	echo '<h1>Vital Defense samples</h1>';
	echo '<p>These listings are sample content for the staging site. They are not the shop inventory and they are not connected to FFL Cockpit. The button below creates missing categories and refreshes the built-in sample products. It does not delete pages, Customizer text, or products you added yourself.</p>';
	echo '<p>This theme does not use WooCommerce categories. Menu, footer, and homepage links go to addresses such as <code>/rifles/</code> and <code>/rifles/semi-auto/</code> on this site. WooCommerce can stay installed; it does not supply these listings.</p>';
	if ( class_exists( 'WooCommerce' ) ) {
		echo '<p>WooCommerce is active. Leave it active only if something else on this site needs it. These category pages still come from Vital Defense catalog categories.</p>';
	}
	echo '<p><strong>' . esc_html( (string) $counts['categories'] ) . '</strong> catalog categories and <strong>' . esc_html( (string) $counts['products'] ) . '</strong> published sample products are stored right now.</p>';
	if ( '/%postname%/' !== $permalinks ) {
		echo '<div class="notice notice-warning"><p>Permalinks are not set to Post name. Open Settings → Permalinks, choose Post name, and click Save Changes. This theme still opens catalog paths such as /rifles/ when those rules have not been saved, as long as the category exists.</p></div>';
	}
	echo '<form method="post">';
	wp_nonce_field( 'vd_install_samples' );
	submit_button( 'Create sample categories and products', 'primary', 'vd_install_samples' );
	echo '</form></div>';
}
add_action( 'init', 'vd_sync_catalog', 20 );

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
		update_post_meta( $post_id, '_vd_sample', '1' );
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
