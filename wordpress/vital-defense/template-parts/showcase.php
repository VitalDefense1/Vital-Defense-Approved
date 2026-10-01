<?php
$slides = array();
foreach ( vd_featured_slugs() as $slug ) {
	$post = get_page_by_path( $slug, OBJECT, 'vd_product' );
	if ( ! $post ) {
		continue;
	}
	$slides[] = $post;
}
?>
<section class="vd-showcase-section" aria-roledescription="carousel" aria-labelledby="product-showcase">
	<div class="vd-showcase-head">
		<span class="vd-rule" aria-hidden="true"></span>
		<h2 id="product-showcase"><?php echo esc_html( vd_mod( 'featured_heading' ) ); ?></h2>
	</div>
	<?php if ( $slides ) : ?>
		<div class="vd-showcase-wrap" data-showcase>
			<button type="button" class="vd-showcase-arrow vd-showcase-prev" aria-label="Previous photograph"><?php echo vd_icon( 'left' ); ?></button>
			<button type="button" class="vd-showcase-arrow vd-showcase-next" aria-label="Next photograph"><?php echo vd_icon( 'right' ); ?></button>
			<div class="vd-showcase" tabindex="0" aria-label="Photograph showcase">
				<?php foreach ( array( 'prev', 'current', 'next' ) as $copy ) : ?>
					<?php foreach ( $slides as $index => $post ) : ?>
						<?php
						$hidden = 'current' !== $copy;
						$price  = vd_product_price( $post->ID );
						?>
						<div class="vd-slide" data-slide data-copy="<?php echo esc_attr( $copy ); ?>" <?php echo $hidden ? 'aria-hidden="true"' : ''; ?> <?php echo $hidden ? '' : 'aria-label="' . esc_attr( ( $index + 1 ) . ' of ' . count( $slides ) ) . '"'; ?>>
							<div class="vd-slide-face" data-slide-face>
								<div class="vd-slide-photo">
									<img src="<?php echo esc_url( vd_product_image_url( $post->ID ) ); ?>" alt="<?php echo esc_attr( $hidden ? '' : get_the_title( $post ) ); ?>" draggable="false">
								</div>
								<h3><?php echo esc_html( get_the_title( $post ) ); ?></h3>
								<p class="vd-price"><?php echo esc_html( vd_format_price( $price ) ); ?></p>
								<button type="button" class="vd-button" data-add-cart data-id="<?php echo esc_attr( $post->post_name ); ?>" data-title="<?php echo esc_attr( get_the_title( $post ) ); ?>" data-price="<?php echo esc_attr( $price ); ?>" <?php echo $hidden ? 'tabindex="-1"' : ''; ?>>Add to cart</button>
								<p class="vd-cart-status" data-cart-status="<?php echo esc_attr( $post->post_name ); ?>" role="status"></p>
							</div>
						</div>
					<?php endforeach; ?>
				<?php endforeach; ?>
			</div>
			<p class="vd-sr" aria-live="polite" data-showcase-live></p>
		</div>
	<?php endif; ?>
</section>
