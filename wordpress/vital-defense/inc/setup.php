<?php

function vd_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	register_nav_menus(
		array(
			'footer' => 'Footer categories',
		)
	);
}
add_action( 'after_setup_theme', 'vd_setup' );

function vd_register_types() {
	register_post_type(
		'vd_product',
		array(
			'labels' => array(
				'name'          => 'Products',
				'singular_name' => 'Product',
				'add_new_item'  => 'Add product',
				'edit_item'     => 'Edit product',
			),
			'public'       => true,
			'show_in_rest' => true,
			'menu_icon'    => 'dashicons-products',
			'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
			'has_archive'  => false,
			'rewrite'      => array(
				'slug'       => 'products',
				'with_front' => false,
			),
		)
	);

	register_taxonomy(
		'vd_catalog',
		'vd_product',
		array(
			'labels' => array(
				'name'          => 'Catalog categories',
				'singular_name' => 'Catalog category',
			),
			'public'       => true,
			'hierarchical' => true,
			'show_in_rest' => true,
			'rewrite'      => false,
		)
	);
}
add_action( 'init', 'vd_register_types' );

function vd_catalog_top_slugs() {
	$slugs = array();
	foreach ( vd_catalog_tree() as $node ) {
		if ( ! empty( $node['path'] ) ) {
			$slugs[] = $node['path'];
		}
	}
	return $slugs;
}

function vd_rewrite_rules() {
	$top = implode( '|', vd_catalog_top_slugs() );
	add_rewrite_rule( '^(' . $top . ')/(.+)/?$', 'index.php?vd_catalog=$matches[1]&vd_trail=$matches[2]', 'top' );
	add_rewrite_rule( '^(' . $top . ')/?$', 'index.php?vd_catalog=$matches[1]', 'top' );
}
add_action( 'init', 'vd_rewrite_rules' );

function vd_request_path() {
	$home = trim( (string) wp_parse_url( home_url( '/' ), PHP_URL_PATH ), '/' );
	$path = trim( (string) wp_parse_url( $_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH ), '/' );
	if ( $home && ( $path === $home || str_starts_with( $path, $home . '/' ) ) ) {
		$path = trim( substr( $path, strlen( $home ) ), '/' );
	}
	return $path;
}

function vd_catalog_request( $vars ) {
	if ( ! empty( $vars['vd_catalog'] ) ) {
		return $vars;
	}
	$path = vd_request_path();
	if ( '' === $path ) {
		return $vars;
	}
	$parts = explode( '/', $path );
	if ( ! in_array( $parts[0], vd_catalog_top_slugs(), true ) ) {
		return $vars;
	}
	$vars['vd_catalog'] = $parts[0];
	if ( count( $parts ) > 1 ) {
		$vars['vd_trail'] = implode( '/', array_slice( $parts, 1 ) );
	}
	unset( $vars['error'], $vars['pagename'], $vars['name'], $vars['page'] );
	return $vars;
}
add_filter( 'request', 'vd_catalog_request' );

function vd_relative_product_link( $url, $post ) {
	if ( ! $post instanceof WP_Post || 'vd_product' !== $post->post_type ) {
		return $url;
	}
	$path = wp_parse_url( $url, PHP_URL_PATH );
	return $path ? $path : $url;
}
add_filter( 'post_type_link', 'vd_relative_product_link', 10, 2 );

function vd_query_vars( $vars ) {
	$vars[] = 'vd_catalog';
	$vars[] = 'vd_trail';
	return $vars;
}

function vd_flush_catalog_rewrites() {
	if ( '4' === get_option( 'vd_rewrite_ver' ) ) {
		return;
	}
	flush_rewrite_rules( false );
	update_option( 'vd_rewrite_ver', '4' );
}

function vd_catalog_is_not_404() {
	if ( ! get_query_var( 'vd_catalog' ) || ! vd_resolve_catalog_term() ) {
		return;
	}
	global $wp_query;
	if ( $wp_query instanceof WP_Query ) {
		$wp_query->is_404 = false;
	}
	status_header( 200 );
}
add_action( 'template_redirect', 'vd_catalog_is_not_404', 0 );
add_action( 'init', 'vd_flush_catalog_rewrites', 99 );
add_filter( 'query_vars', 'vd_query_vars' );

function vd_template_include( $template ) {
	if ( get_query_var( 'vd_catalog' ) ) {
		return get_template_directory() . '/catalog.php';
	}
	if ( is_singular( 'vd_product' ) ) {
		return get_template_directory() . '/single-vd_product.php';
	}
	return $template;
}
add_filter( 'template_include', 'vd_template_include' );

function vd_assets() {
	wp_enqueue_style(
		'vd-fonts',
		'https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Rajdhani:wght@500;600&display=swap',
		array(),
		null
	);
	wp_enqueue_style( 'vd-theme', vd_public_url( get_template_directory_uri() . '/assets/css/theme.css' ), array( 'vd-fonts' ), '1.1.3' );
	wp_enqueue_script( 'vd-theme', vd_public_url( get_template_directory_uri() . '/assets/js/theme.js' ), array(), '1.1.3', true );
	wp_localize_script(
		'vd-theme',
		'vdPreview',
		array(
			'home' => is_front_page() ? '1' : '0',
		)
	);
}
add_action( 'wp_enqueue_scripts', 'vd_assets' );

function vd_keep_theme_assets_on_this_host( $src, $handle ) {
	if ( 'vd-theme' !== $handle ) {
		return $src;
	}
	return vd_public_url( $src );
}
add_filter( 'style_loader_src', 'vd_keep_theme_assets_on_this_host', 10, 2 );
add_filter( 'script_loader_src', 'vd_keep_theme_assets_on_this_host', 10, 2 );

function vd_robots( $robots ) {
	$robots['noindex']  = true;
	$robots['nofollow'] = true;
	return $robots;
}
add_filter( 'wp_robots', 'vd_robots' );

function vd_document_title( $parts ) {
	$term = vd_resolve_catalog_term();
	if ( $term ) {
		$parts['title'] = $term->name;
	}
	return $parts;
}
add_filter( 'document_title_parts', 'vd_document_title' );

function vd_find_top( $path ) {
	$terms = get_terms(
		array(
			'taxonomy'   => 'vd_catalog',
			'parent'     => 0,
			'hide_empty' => false,
			'meta_key'   => '_vd_path',
			'meta_value' => $path,
		)
	);
	if ( is_wp_error( $terms ) || ! $terms ) {
		return null;
	}
	return $terms[0];
}

function vd_find_child_path( $parent_id, $path ) {
	$terms = get_terms(
		array(
			'taxonomy'   => 'vd_catalog',
			'parent'     => (int) $parent_id,
			'hide_empty' => false,
			'meta_key'   => '_vd_path',
			'meta_value' => $path,
		)
	);
	if ( is_wp_error( $terms ) || ! $terms ) {
		return null;
	}
	return $terms[0];
}

function vd_resolve_catalog_term() {
	$top = (string) get_query_var( 'vd_catalog' );
	if ( '' === $top ) {
		return null;
	}
	$term = vd_find_top( $top );
	if ( ! $term ) {
		return null;
	}
	$trail = trim( (string) get_query_var( 'vd_trail' ), '/' );
	if ( '' === $trail ) {
		return $term;
	}
	foreach ( explode( '/', $trail ) as $segment ) {
		$segment = trim( $segment );
		if ( '' === $segment ) {
			continue;
		}
		$term = vd_find_child_path( $term->term_id, $segment );
		if ( ! $term ) {
			return null;
		}
	}
	return $term;
}

function vd_catalog_index() {
	$cached = get_transient( 'vd_catalog_index' );
	if ( is_array( $cached ) ) {
		return $cached;
	}
	$posts = get_posts(
		array(
			'post_type'      => 'vd_product',
			'posts_per_page' => 300,
			'orderby'        => 'menu_order',
			'order'          => 'ASC',
		)
	);
	$index = array();
	foreach ( $posts as $post ) {
		$index[] = array(
			'id'    => $post->post_name,
			'title' => get_the_title( $post ),
			'price' => vd_product_price( $post->ID ),
			'image' => vd_product_image_url( $post->ID ),
			'url'   => get_permalink( $post ),
		);
	}
	set_transient( 'vd_catalog_index', $index, HOUR_IN_SECONDS );
	return $index;
}

function vd_print_catalog_index() {
	echo '<script type="application/json" id="vd-catalog">';
	echo wp_json_encode( vd_catalog_index() );
	echo '</script>';
}
add_action( 'wp_footer', 'vd_print_catalog_index', 5 );

function vd_body_class( $classes ) {
	if ( is_front_page() ) {
		$classes[] = 'vd-home';
	}
	return $classes;
}
add_filter( 'body_class', 'vd_body_class' );
