<?php

function vd_asset( $path ) {
	return get_template_directory_uri() . '/assets' . $path;
}

function vd_default( $key ) {
	$defaults = array(
		'headline_1'      => 'Vital Defense.',
		'headline_2'      => 'Built on experience.',
		'intro'           => 'Veteran-owned and based in Lake City, Florida. Vital Defense brings a personal approach to a broad selection of firearms, optics, and accessories.',
		'brands_heading'  => 'Featured brands',
		'featured_heading'=> 'Featured items',
		'contact_heading' => 'Contact',
		'contact_button'  => 'Contact us',
		'appointment'     => 'BY APPOINTMENT ONLY',
		'phone_display'   => '(386) 466-5353',
		'phone_href'      => 'tel:+13864665353',
		'email'           => 'sales@vitaldefenseco.com',
		'place'           => 'Lake City, Florida',
		'address'         => '',
		'age_title'       => 'Are you 21 years of age or older?',
		'age_body'        => 'This is a self-declared age confirmation, not verified proof of age.',
		'footer_note'     => 'Design preview for Vital Defense. This does not replace vitaldefenseco.com. Search engines are asked to skip this preview. That request is not a password.',
		'site_name'       => 'Vital Defense',
	);
	return $defaults[ $key ] ?? '';
}

function vd_mod( $key ) {
	$default = vd_default( $key );
	$value   = get_theme_mod( 'vd_' . $key, null );
	if ( null === $value ) {
		return $default;
	}
	return $value;
}

function vd_phone_href() {
	$href = vd_mod( 'phone_href' );
	if ( $href ) {
		return $href;
	}
	$digits = preg_replace( '/\D+/', '', vd_mod( 'phone_display' ) );
	if ( strlen( $digits ) === 10 ) {
		return 'tel:+1' . $digits;
	}
	return 'tel:+13864665353';
}

function vd_video_url() {
	$id = (int) get_theme_mod( 'vd_opening_video', 0 );
	if ( $id ) {
		$url = wp_get_attachment_url( $id );
		if ( $url ) {
			return $url;
		}
	}
	return vd_asset( '/video/opening.mp4' );
}

function vd_product_image_url( $post_id ) {
	$thumb = get_the_post_thumbnail_url( $post_id, 'large' );
	if ( $thumb ) {
		return $thumb;
	}
	$path = (string) get_post_meta( $post_id, '_vd_image', true );
	if ( ! $path ) {
		return '';
	}
	if ( str_starts_with( $path, 'http://' ) || str_starts_with( $path, 'https://' ) ) {
		return $path;
	}
	return vd_asset( $path );
}

function vd_format_price( $price ) {
	return '$' . number_format( (float) $price, 0, '.', ',' );
}

function vd_product_price( $post_id ) {
	return (float) get_post_meta( $post_id, '_vd_price', true );
}

/**
 * @return array<int, array<string, string>>
 */
function vd_brands() {
	$brands = array();
	foreach ( vd_default_brands() as $index => $brand ) {
		$slot = $index + 1;
		$alt  = get_theme_mod( 'vd_brand_' . $slot . '_alt', null );
		if ( null === $alt || '' === $alt ) {
			$alt = $brand['alt'];
		}
		$image_id = (int) get_theme_mod( 'vd_brand_' . $slot . '_image', 0 );
		$src      = $image_id ? wp_get_attachment_image_url( $image_id, 'full' ) : vd_asset( $brand['src'] );
		if ( ! $src ) {
			continue;
		}
		$brands[] = array(
			'src'   => $src,
			'alt'   => $alt,
			'frame' => $brand['frame'],
		);
	}
	return $brands;
}

function vd_icon( $name ) {
	$icons = array(
		'search' => '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
		'heart'  => '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
		'user'   => '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
		'bag'    => '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
		'left'   => '<path d="m15 18-6-6 6-6"/>',
		'right'  => '<path d="m9 18 6-6-6-6"/>',
		'x'      => '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
	);
	$body = $icons[ $name ] ?? '';
	return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . $body . '</svg>';
}

function vd_term_children( $parent_id ) {
	$terms = get_terms(
		array(
			'taxonomy'   => 'vd_catalog',
			'parent'     => $parent_id,
			'hide_empty' => false,
		)
	);
	if ( is_wp_error( $terms ) || ! $terms ) {
		return array();
	}
	usort(
		$terms,
		function ( $a, $b ) {
			$ao = (int) get_term_meta( $a->term_id, '_vd_order', true );
			$bo = (int) get_term_meta( $b->term_id, '_vd_order', true );
			return $ao <=> $bo;
		}
	);
	return $terms;
}

function vd_top_terms() {
	return vd_term_children( 0 );
}

function vd_term_url( $term ) {
	if ( ! $term || is_wp_error( $term ) ) {
		return home_url( '/' );
	}
	$segments = array();
	$guard    = 0;
	$current  = $term;
	while ( $current && ! is_wp_error( $current ) && $guard < 8 ) {
		$path = (string) get_term_meta( $current->term_id, '_vd_path', true );
		if ( '' === $path ) {
			$path = $current->slug;
		}
		array_unshift( $segments, $path );
		if ( ! $current->parent ) {
			break;
		}
		$current = get_term( (int) $current->parent, 'vd_catalog' );
		$guard++;
	}
	return home_url( '/' . implode( '/', $segments ) . '/' );
}
