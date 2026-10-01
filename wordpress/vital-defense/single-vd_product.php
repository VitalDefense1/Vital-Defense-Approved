<?php
get_header();
while ( have_posts() ) :
	the_post();
	$terms = get_the_terms( get_the_ID(), 'vd_catalog' );
	$term  = ( $terms && ! is_wp_error( $terms ) ) ? $terms[0] : null;
	$path  = $term ? (string) get_term_meta( $term->term_id, '_vd_path', true ) : '';
	$price = vd_product_price( get_the_ID() );
	$specs = vd_product_specs( get_the_ID() );
	$text  = wp_strip_all_tags( get_the_content() );
	?>
	<main class="vd-product">
		<div class="vd-product-top">
			<div>
				<div class="vd-gallery" data-gallery>
					<div class="vd-gallery-frame">
						<img src="<?php echo esc_url( vd_product_image_url( get_the_ID() ) ); ?>" alt="<?php echo esc_attr( get_the_title() ); ?>">
						<button type="button" class="vd-heart" data-favorite="<?php echo esc_attr( $post->post_name ); ?>" data-title="<?php echo esc_attr( get_the_title() ); ?>" aria-pressed="false" aria-label="<?php echo esc_attr( 'Add ' . get_the_title() . ' to favorites' ); ?>"><?php echo vd_icon( 'heart' ); ?></button>
						<p>FOR ILLUSTRATION PURPOSES ONLY, THIS IMAGE MAY NOT BE AN EXACT REPRESENTATION OF THE PRODUCT</p>
					</div>
				</div>
			</div>
			<div>
				<?php if ( $term && $path ) : ?>
					<a class="vd-link vd-kicker" href="<?php echo esc_url( home_url( '/' . $path . '/' ) ); ?>"><?php echo esc_html( $term->name ); ?></a>
				<?php endif; ?>
				<h1><?php the_title(); ?></h1>
				<p class="vd-blurb" data-product-summary><?php echo esc_html( $text ); ?></p>
				<div class="vd-buy">
					<p class="vd-price vd-price-lg"><?php echo esc_html( vd_format_price( $price ) ); ?></p>
					<button type="button" class="vd-button" data-add-cart data-id="<?php echo esc_attr( $post->post_name ); ?>" data-title="<?php echo esc_attr( get_the_title() ); ?>" data-price="<?php echo esc_attr( $price ); ?>">Add to cart</button>
					<p class="vd-cart-status" data-cart-status="<?php echo esc_attr( $post->post_name ); ?>" role="status"></p>
				</div>
			</div>
		</div>
		<section class="vd-tabs" data-tabs>
			<div class="vd-tablist" role="tablist">
				<button type="button" role="tab" aria-selected="true" data-tab="description">Description</button>
				<button type="button" role="tab" aria-selected="false" data-tab="information">Additional information</button>
				<button type="button" role="tab" aria-selected="false" data-tab="reviews">Reviews</button>
				<span class="vd-tab-indicator" aria-hidden="true"></span>
			</div>
			<div data-panel="description" role="tabpanel">
				<p><?php echo esc_html( $text ); ?></p>
			</div>
			<div data-panel="information" role="tabpanel" hidden>
				<?php if ( $specs ) : ?>
					<dl>
						<?php foreach ( $specs as $spec ) : ?>
							<div>
								<dt><?php echo esc_html( $spec['label'] ); ?></dt>
								<dd><?php echo esc_html( $spec['value'] ); ?></dd>
							</div>
						<?php endforeach; ?>
					</dl>
				<?php endif; ?>
			</div>
			<div data-panel="reviews" role="tabpanel" hidden>
				<p class="vd-muted">NO REVIEWS YET</p>
				<form class="vd-form vd-review" data-review-form>
					<h3>Write a review</h3>
					<div class="vd-review-names">
						<div>
							<label for="review-first">First name</label>
							<input id="review-first" name="firstName" autocomplete="given-name">
							<p class="vd-error" data-error="first" hidden></p>
						</div>
						<div>
							<label for="review-initial">Last initial</label>
							<input id="review-initial" name="lastInitial" maxlength="1" autocomplete="off">
							<p class="vd-error" data-error="initial" hidden></p>
						</div>
					</div>
					<label for="review-body">Review</label>
					<textarea id="review-body" name="body"></textarea>
					<p class="vd-error" data-error="body" hidden></p>
					<label id="review-rating-label">Rating</label>
					<div class="vd-stars" role="radiogroup" aria-labelledby="review-rating-label">
						<?php for ( $star = 1; $star <= 5; $star++ ) : ?>
							<button type="button" data-star="<?php echo esc_attr( (string) $star ); ?>" aria-label="<?php echo esc_attr( $star . ' star' . ( 1 === $star ? '' : 's' ) ); ?>">★</button>
						<?php endfor; ?>
					</div>
					<p class="vd-error" data-error="rating" hidden></p>
					<button class="vd-button" type="submit">Submit review</button>
					<p class="vd-form-note" role="status" hidden></p>
				</form>
			</div>
		</section>
	</main>
	<?php
endwhile;
get_footer();
