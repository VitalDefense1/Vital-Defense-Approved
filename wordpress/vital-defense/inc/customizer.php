<?php

function vd_customize_register( $wp_customize ) {
	$wp_customize->add_panel(
		'vd_content',
		array(
			'title'    => 'Vital Defense content',
			'priority' => 30,
		)
	);

	$sections = array(
		'vd_home'    => 'Homepage',
		'vd_contact' => 'Contact',
		'vd_age'     => 'Age confirmation',
		'vd_footer'  => 'Footer',
		'vd_brands'  => 'Featured brands',
		'vd_video'   => 'Opening video',
	);
	foreach ( $sections as $id => $title ) {
		$wp_customize->add_section(
			$id,
			array(
				'title' => $title,
				'panel' => 'vd_content',
			)
		);
	}

	$text_fields = array(
		array( 'vd_home', 'headline_1', 'First headline line' ),
		array( 'vd_home', 'headline_2', 'Second headline line' ),
		array( 'vd_home', 'brands_heading', 'Featured brands heading' ),
		array( 'vd_home', 'featured_heading', 'Featured items heading' ),
		array( 'vd_home', 'contact_button', 'Contact button' ),
		array( 'vd_contact', 'contact_heading', 'Contact heading' ),
		array( 'vd_contact', 'appointment', 'Appointment line' ),
		array( 'vd_contact', 'phone_display', 'Phone' ),
		array( 'vd_contact', 'email', 'Email' ),
		array( 'vd_contact', 'place', 'Place' ),
		array( 'vd_contact', 'address', 'Street address' ),
		array( 'vd_age', 'age_title', 'Age question' ),
		array( 'vd_age', 'age_body', 'Age explanation' ),
		array( 'vd_footer', 'footer_note', 'Footer note' ),
		array( 'vd_footer', 'site_name', 'Footer name' ),
	);

	foreach ( $text_fields as $field ) {
		$key = 'vd_' . $field[1];
		$wp_customize->add_setting(
			$key,
			array(
				'default'           => vd_default( $field[1] ),
				'sanitize_callback' => 'vd_sanitize_text',
				'transport'         => 'refresh',
			)
		);
		$wp_customize->add_control(
			$key,
			array(
				'label'       => $field[2],
				'section'     => $field[0],
				'type'        => 'text',
				'description' => 'address' === $field[1] ? 'Leave blank until the street address should appear.' : '',
			)
		);
	}

	$wp_customize->add_setting(
		'vd_intro',
		array(
			'default'           => vd_default( 'intro' ),
			'sanitize_callback' => 'vd_sanitize_paragraph',
			'transport'         => 'refresh',
		)
	);
	$wp_customize->add_control(
		'vd_intro',
		array(
			'label'   => 'Introductory paragraph',
			'section' => 'vd_home',
			'type'    => 'textarea',
		)
	);

	$wp_customize->add_setting(
		'vd_opening_video',
		array(
			'default'           => 0,
			'sanitize_callback' => 'absint',
		)
	);
	$wp_customize->add_control(
		new WP_Customize_Media_Control(
			$wp_customize,
			'vd_opening_video',
			array(
				'label'     => 'Opening video',
				'section'   => 'vd_video',
				'mime_type' => 'video',
				'description' => 'Leave empty to keep the approved opening film.',
			)
		)
	);

	foreach ( vd_default_brands() as $index => $brand ) {
		$slot = $index + 1;
		$wp_customize->add_setting(
			'vd_brand_' . $slot . '_alt',
			array(
				'default'           => $brand['alt'],
				'sanitize_callback' => 'vd_sanitize_text',
			)
		);
		$wp_customize->add_control(
			'vd_brand_' . $slot . '_alt',
			array(
				'label'   => 'Brand ' . $slot . ' name',
				'section' => 'vd_brands',
				'type'    => 'text',
			)
		);
		$wp_customize->add_setting(
			'vd_brand_' . $slot . '_image',
			array(
				'default'           => 0,
				'sanitize_callback' => 'absint',
			)
		);
		$wp_customize->add_control(
			new WP_Customize_Media_Control(
				$wp_customize,
				'vd_brand_' . $slot . '_image',
				array(
					'label'     => 'Brand ' . $slot . ' logo',
					'section'   => 'vd_brands',
					'mime_type' => 'image',
					'description' => 'Leave empty to keep the approved ' . $brand['alt'] . ' mark.',
				)
			)
		);
	}
}
add_action( 'customize_register', 'vd_customize_register' );

function vd_sanitize_text( $value ) {
	return sanitize_text_field( $value );
}

function vd_sanitize_paragraph( $value ) {
	return sanitize_textarea_field( $value );
}
