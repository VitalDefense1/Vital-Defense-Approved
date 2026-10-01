<?php

function vd_product_meta_box() {
	add_meta_box(
		'vd_product_details',
		'Preview details',
		'vd_product_meta_box_html',
		'vd_product',
		'normal',
		'high'
	);
}
add_action( 'add_meta_boxes', 'vd_product_meta_box' );

function vd_product_meta_box_html( $post ) {
	wp_nonce_field( 'vd_product_meta', 'vd_product_meta_nonce' );
	$price = get_post_meta( $post->ID, '_vd_price', true );
	$image = get_post_meta( $post->ID, '_vd_image', true );
	$specs = get_post_meta( $post->ID, '_vd_specs', true );
	?>
	<p>
		<label for="vd_price"><strong>Price</strong></label><br>
		<input type="number" min="0" step="1" id="vd_price" name="vd_price" value="<?php echo esc_attr( $price ); ?>" class="small-text">
	</p>
	<p>
		<label for="vd_image"><strong>Photograph path</strong></label><br>
		<input type="text" id="vd_image" name="vd_image" value="<?php echo esc_attr( $image ); ?>" class="widefat">
		<span class="description">Used when no featured image is set. A featured image replaces it on the site.</span>
	</p>
	<p>
		<label for="vd_specs"><strong>Specifications</strong></label><br>
		<textarea id="vd_specs" name="vd_specs" rows="6" class="widefat"><?php echo esc_textarea( $specs ); ?></textarea>
		<span class="description">One line per row: Label: Value. Leave empty when there is nothing extra to list.</span>
	</p>
	<?php
}

function vd_save_product_meta( $post_id ) {
	if ( ! isset( $_POST['vd_product_meta_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['vd_product_meta_nonce'] ) ), 'vd_product_meta' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	$price = isset( $_POST['vd_price'] ) ? (float) wp_unslash( $_POST['vd_price'] ) : 0;
	$image = isset( $_POST['vd_image'] ) ? sanitize_text_field( wp_unslash( $_POST['vd_image'] ) ) : '';
	$specs = isset( $_POST['vd_specs'] ) ? sanitize_textarea_field( wp_unslash( $_POST['vd_specs'] ) ) : '';
	update_post_meta( $post_id, '_vd_price', $price );
	update_post_meta( $post_id, '_vd_image', $image );
	update_post_meta( $post_id, '_vd_specs', $specs );
	delete_transient( 'vd_catalog_index' );
}
add_action( 'save_post_vd_product', 'vd_save_product_meta' );

/**
 * @return array<int, array{label: string, value: string}>
 */
function vd_product_specs( $post_id ) {
	$raw  = (string) get_post_meta( $post_id, '_vd_specs', true );
	$rows = array();
	foreach ( preg_split( "/\r\n|\n|\r/", $raw ) as $line ) {
		$line = trim( $line );
		if ( '' === $line || ! str_contains( $line, ':' ) ) {
			continue;
		}
		list( $label, $value ) = array_map( 'trim', explode( ':', $line, 2 ) );
		if ( '' === $label || '' === $value ) {
			continue;
		}
		$rows[] = array(
			'label' => $label,
			'value' => $value,
		);
	}
	return $rows;
}
