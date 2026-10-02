<?php
/**
 * Template Name: Cart
 */
get_header();
?>
<main>
	<div class="vd-cart" data-cart-page
		data-sample-one="<?php echo esc_attr( 'scoped-rifle' ); ?>"
		data-sample-two="<?php echo esc_attr( 'pistol-optic' ); ?>">
		<header class="vd-page-head">
			<p class="vd-kicker">Vital Defense</p>
			<span class="vd-rule" aria-hidden="true"></span>
			<h1>Cart</h1>
			<p class="vd-muted" data-cart-source>Showing sample products so this layout can be reviewed.</p>
			<p class="vd-muted vd-cart-demo">Demonstration only. Changing a quantity, removing a line, applying a promo code, and proceeding to checkout do not place an order, check a code, or take payment. Discount, shipping, and tax are placeholders.</p>
		</header>
		<div class="vd-cart-layout">
			<section aria-labelledby="cart-items-heading">
				<h2 id="cart-items-heading" class="vd-sr">Items</h2>
				<ul class="vd-cart-lines" data-cart-lines></ul>
			</section>
			<aside class="vd-summary">
				<span class="vd-rule" aria-hidden="true"></span>
				<h2>Order summary</h2>
				<dl>
					<div><dt>Subtotal</dt><dd data-cart-subtotal>$0</dd></div>
					<div><dt>Discount</dt><dd>— <span>Not applied</span></dd></div>
					<div><dt>Shipping</dt><dd>— <span>Not calculated</span></dd></div>
					<div><dt>Tax</dt><dd>— <span>Not calculated</span></dd></div>
				</dl>
				<form class="vd-promo" data-promo-form>
					<label for="promo-code">Promo code</label>
					<input id="promo-code" name="promo" autocomplete="off" placeholder="Enter code">
					<button class="vd-button vd-button-outline" type="submit">Apply</button>
					<p class="vd-form-note" role="status" hidden></p>
				</form>
				<button type="button" class="vd-button vd-button-block" data-checkout>Proceed to checkout</button>
				<p class="vd-form-note" data-checkout-note role="status" hidden></p>
				<p class="vd-continue"><a class="vd-text-link" href="<?php echo esc_url( vd_internal_url() ); ?>">Continue shopping</a></p>
			</aside>
		</div>
	</div>
</main>
<?php
get_footer();
