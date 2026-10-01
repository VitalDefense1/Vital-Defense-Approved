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

function vd_rewrite_rules() {
	$tops = array( 'rifles', 'handguns', 'shotguns', 'optics', 'accessories', 'parts', 'ammo', 'services', 'merch', 'extras' );
	$top  = implode( '|', $tops );
	add_rewrite_rule( '^(' . $top . ')/([^/]+)/?$', 'index.php?vd_catalog=$matches[1]&vd_group=$matches[2]', 'top' );
	add_rewrite_rule( '^(' . $top . ')/?$', 'index.php?vd_catalog=$matches[1]', 'top' );
}
add_action( 'init', 'vd_rewrite_rules' );

function vd_query_vars( $vars ) {
	$vars[] = 'vd_catalog';
	$vars[] = 'vd_group';
	return $vars;
}
add_filter( 'query_vars', 'vd_query_vars' );

function vd_template_include( $template ) {
	if ( get_query_var( 'vd_group' ) ) {
		return get_template_directory() . '/group.php';
	}
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
	wp_enqueue_style( 'vd-theme', get_template_directory_uri() . '/assets/css/theme.css', array( 'vd-fonts' ), '1.0.4' );
	wp_enqueue_script( 'vd-theme', get_template_directory_uri() . '/assets/js/theme.js', array(), '1.0.4', true );
	wp_localize_script(
		'vd-theme',
		'vdPreview',
		array(
			'home' => is_front_page() ? '1' : '0',
		)
	);
}
add_action( 'wp_enqueue_scripts', 'vd_assets' );

function vd_robots( $robots ) {
	$robots['noindex']  = true;
	$robots['nofollow'] = true;
	return $robots;
}
add_filter( 'wp_robots', 'vd_robots' );

function vd_document_title( $parts ) {
	$catalog = get_query_var( 'vd_catalog' );
	$group   = get_query_var( 'vd_group' );
	if ( $group && $catalog ) {
		$match = vd_find_group( $catalog, $group );
		if ( $match ) {
			$parts['title'] = $match->name;
		}
	} elseif ( $catalog ) {
		$term = vd_find_top( $catalog );
		if ( $term ) {
			$parts['title'] = $term->name;
		}
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

function vd_find_group( $parent_path, $group_path ) {
	$parent = vd_find_top( $parent_path );
	if ( ! $parent ) {
		return null;
	}
	$terms = get_terms(
		array(
			'taxonomy'   => 'vd_catalog',
			'parent'     => $parent->term_id,
			'hide_empty' => false,
			'meta_key'   => '_vd_path',
			'meta_value' => $group_path,
		)
	);
	if ( is_wp_error( $terms ) || ! $terms ) {
		return null;
	}
	$term = $terms[0];
	if ( '1' !== (string) get_term_meta( $term->term_id, '_vd_public', true ) ) {
		return null;
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
