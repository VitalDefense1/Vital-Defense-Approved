<?php
/**
 * Approved category tree.
 * "AR Style Rifles" is not a category. Those rifles belong with Semi Auto Rifles.
 *
 * @return array<int, array<string, mixed>>
 */
function vd_catalog_tree() {
	return array(
		array(
			'path'    => 'rifles',
			'label'   => 'Rifles',
			'summary' => 'Rifles at Vital Defense, grouped by action.',
			'photo'   => '/photos/rifle-camo.png',
			'photo_w' => 1197,
			'photo_h' => 575,
			'photo_alt' => 'Camouflage rifle with a sling, from the supplied photographs.',
			'wide'    => true,
			'children' => array(
				array( 'path' => 'semi-auto', 'label' => 'Semi Auto Rifles', 'summary' => 'Semi-automatic rifles, including rifles the current navigation lists separately as AR-style.' ),
				array( 'path' => 'bolt-action', 'label' => 'Bolt Action Rifles', 'summary' => 'Bolt-action rifles.' ),
				array( 'path' => 'lever-action', 'label' => 'Lever Action Rifles', 'summary' => 'Lever-action rifles.' ),
				array( 'path' => 'pump-action', 'label' => 'Pump Action Rifles', 'summary' => 'Pump-action rifles.' ),
				array( 'path' => 'single-shot', 'label' => 'Single Shot Rifles', 'summary' => 'Single-shot rifles.' ),
			),
		),
		array(
			'path'    => 'handguns',
			'label'   => 'Handguns',
			'summary' => 'Handguns at Vital Defense, grouped by type.',
			'photo'   => '/photos/pistol-chevron.png',
			'photo_w' => 760,
			'photo_h' => 641,
			'photo_alt' => 'Black semi-automatic handgun with a red-dot sight, from the supplied photographs.',
			'wide'    => false,
			'children' => array(
				array( 'path' => 'semi-auto', 'label' => 'Semi Auto Handguns', 'summary' => 'Semi-automatic handguns.' ),
				array( 'path' => 'revolvers', 'label' => 'Revolvers', 'summary' => 'Revolvers.' ),
				array( 'path' => 'single-shot', 'label' => 'Single Shot Handguns', 'summary' => 'Single-shot handguns.' ),
				array( 'path' => 'derringers', 'label' => 'Derringers', 'summary' => 'Derringers.' ),
				array( 'path' => 'other', 'label' => 'Other Handguns', 'summary' => 'Handguns that do not fit the other handgun labels.' ),
			),
		),
		array(
			'path'    => 'shotguns',
			'label'   => 'Shotguns',
			'summary' => 'Shotguns at Vital Defense, grouped by action.',
			'children' => array(
				array( 'path' => 'semi-auto', 'label' => 'Semi-Auto Shotguns', 'summary' => 'Semi-automatic shotguns.' ),
				array( 'path' => 'pump-action', 'label' => 'Pump Action Shotguns', 'summary' => 'Pump-action shotguns.' ),
				array( 'path' => 'side-by-side', 'label' => 'Side By Side Shotguns', 'summary' => 'Side-by-side shotguns.' ),
				array( 'path' => 'over-under', 'label' => 'Over Under Shotguns', 'summary' => 'Over-under shotguns.' ),
				array( 'path' => 'lever-action', 'label' => 'Lever Action Shotguns', 'summary' => 'Lever-action shotguns.' ),
				array( 'path' => 'single-shot', 'label' => 'Single Shot Shotguns', 'summary' => 'Single-shot shotguns.' ),
			),
		),
		vd_menu_branch( 'optics', 'Optics', array(
			'Red Dots and Holographics',
			'Mounts and Risers',
			'Magnifiers',
			'Iron & Other Sights',
			'LPVO, MPVO, HPVO',
			'Spotting Scopes',
			'Binos',
			'Range Finders',
			'Night Vision',
			'Thermal',
		) ),
		vd_menu_branch( 'accessories', 'Accessories', array(
			'Lights and Lasers',
			'Slings',
			'Ear Pro / Eye Pro',
			'Magazines',
			'Bipods / Tripods',
			'Targets',
			'Scope Bases',
			'Scope Mounts',
			'Scope Rings',
		) ),
		array(
			'path'  => 'parts',
			'label' => 'Parts',
			'children' => array(
				array(
					'path'  => 'handgun-parts',
					'label' => 'Handgun Parts',
					'public' => false,
					'children' => array(
						array( 'path' => 'triggers', 'label' => 'Triggers', 'public' => false ),
						array( 'path' => 'frames', 'label' => 'Frames', 'public' => false ),
						array( 'path' => 'barrels', 'label' => 'Barrels', 'public' => false ),
						array( 'path' => 'slides', 'label' => 'Slides', 'public' => false ),
					),
				),
				array(
					'path'  => 'long-gun-parts',
					'label' => 'Long Gun Parts',
					'public' => false,
					'children' => array(
						array( 'path' => 'triggers', 'label' => 'Triggers', 'public' => false ),
						array( 'path' => 'barrels', 'label' => 'Barrels', 'public' => false ),
						array( 'path' => 'ar-upper-parts', 'label' => 'AR Upper Parts', 'public' => false ),
						array( 'path' => 'stocks-braces', 'label' => 'Stocks/Braces', 'public' => false ),
						array( 'path' => 'bolts-bcgs', 'label' => 'Bolts / BCGs', 'public' => false ),
						array( 'path' => 'rails', 'label' => 'Rails', 'public' => false ),
						array( 'path' => 'lower-parts', 'label' => 'Lower Parts', 'public' => false ),
						array( 'path' => 'lower-receivers', 'label' => 'Lower Receivers', 'public' => false ),
					),
				),
			),
		),
		vd_menu_branch( 'ammo', 'Ammo', array( 'Handgun', 'Rifle', 'Shotgun', 'Rimfire' ) ),
		vd_menu_branch( 'services', 'Services', array( 'Transfers', 'Laser Engraving', 'Cerakote' ) ),
		vd_menu_branch( 'merch', 'Merch', array( 'Hats', 'Shirts', 'Hoodies', 'Patches', 'Stickers', 'Magazines' ) ),
		vd_menu_branch( 'extras', 'Extras', array( 'Range Bags', 'Gun Cleaning', 'Less Lethal' ) ),
	);
}

/**
 * @param array<int, string> $labels
 * @return array<string, mixed>
 */
function vd_menu_branch( $path, $label, $labels ) {
	$children = array();
	foreach ( $labels as $child ) {
		$children[] = array(
			'path'   => sanitize_title( $child ),
			'label'  => $child,
			'public' => false,
		);
	}
	return array(
		'path'     => $path,
		'label'    => $label,
		'children' => $children,
	);
}

/**
 * @return array<int, array<string, string>>
 */
function vd_default_brands() {
	return array(
		array( 'src' => '/brands/hk.png', 'alt' => 'HK', 'frame' => 'hk' ),
		array( 'src' => '/brands/radian.png', 'alt' => 'Radian', 'frame' => 'radian' ),
		array( 'src' => '/brands/iray.png', 'alt' => 'InfiRay Outdoor, iRayUSA', 'frame' => 'iray' ),
		array( 'src' => '/brands/surefire.png', 'alt' => 'SureFire', 'frame' => 'surefire' ),
		array( 'src' => '/brands/dark-forge.png', 'alt' => 'Dark Forge', 'frame' => 'dark-forge' ),
		array( 'src' => '/brands/atlas-gunworks.png', 'alt' => 'Atlas Gunworks', 'frame' => 'atlas' ),
	);
}

/**
 * @return array<int, string>
 */
function vd_featured_slugs() {
	return array(
		'scoped-rifle',
		'camo-rifle',
		'dot-rifle',
		'rail-rifle',
		'compact',
		'pistol-optic',
		'pistol-chevron',
		'pistol-mag',
	);
}
