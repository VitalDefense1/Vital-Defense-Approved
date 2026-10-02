<div class="vd-sheet" data-sheet hidden>
	<div class="vd-sheet-backdrop" data-close-menu></div>
	<div class="vd-sheet-panel" id="site-navigation" role="dialog" aria-modal="true" aria-label="Browse Vital Defense">
		<button type="button" class="vd-sheet-close" data-close-menu aria-label="Close"><?php echo vd_icon( 'x' ); ?></button>
		<div class="vd-sheet-head">
			<img src="<?php echo esc_url( vd_asset( '/brand/shield-symbol.png' ) ); ?>" alt="Vital Defense" width="293" height="248">
		</div>
		<div class="vd-sheet-body">
			<nav aria-label="Categories">
				<?php vd_render_catalog_menu(); ?>
			</nav>
			<div class="vd-sheet-contact">
				<a class="vd-link vd-nav-top" href="<?php echo esc_url( vd_internal_url( 'contact' ) ); ?>">Contact</a>
				<div class="vd-sheet-mini">
					<button type="button" class="vd-text-link" data-open-dialog="favorites">Favorites</button>
					<button type="button" class="vd-text-link" data-open-dialog="account">Account</button>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="vd-dialog" data-dialog="search" hidden>
	<div class="vd-dialog-backdrop" data-close-dialog></div>
	<div class="vd-dialog-panel" role="dialog" aria-modal="true" aria-labelledby="vd-search-title">
		<button type="button" class="vd-dialog-close" data-close-dialog aria-label="Close"><?php echo vd_icon( 'x' ); ?></button>
		<h2 id="vd-search-title">Search</h2>
		<p>Search does not run in this preview. There is no catalog to query.</p>
	</div>
</div>

<div class="vd-dialog" data-dialog="account" hidden>
	<div class="vd-dialog-backdrop" data-close-dialog></div>
	<div class="vd-dialog-panel" role="dialog" aria-modal="true" aria-labelledby="vd-account-title">
		<button type="button" class="vd-dialog-close" data-close-dialog aria-label="Close"><?php echo vd_icon( 'x' ); ?></button>
		<h2 id="vd-account-title">Account</h2>
		<p>Signing in is not available in this preview.</p>
	</div>
</div>

<div class="vd-dialog" data-dialog="cart" hidden>
	<div class="vd-dialog-backdrop" data-close-dialog></div>
	<div class="vd-dialog-panel" role="dialog" aria-modal="true" aria-labelledby="vd-cart-title">
		<button type="button" class="vd-dialog-close" data-close-dialog aria-label="Close"><?php echo vd_icon( 'x' ); ?></button>
		<h2 id="vd-cart-title">Cart</h2>
		<p data-cart-dialog-copy>Nothing is in the cart yet.</p>
		<div data-cart-dialog-lines></div>
		<p class="vd-view-cart"><a class="vd-text-link" href="<?php echo esc_url( vd_internal_url( 'cart' ) ); ?>">View cart</a></p>
	</div>
</div>

<div class="vd-dialog vd-favorites" data-dialog="favorites" hidden>
	<div class="vd-dialog-backdrop" data-close-dialog></div>
	<div class="vd-favorites-panel" id="favorites-overlay" role="dialog" aria-modal="true" aria-labelledby="vd-favorites-title">
		<button type="button" class="vd-dialog-close" data-close-dialog aria-label="Close"><?php echo vd_icon( 'x' ); ?></button>
		<div class="vd-favorites-head">
			<h2 id="vd-favorites-title">Favorites</h2>
			<p>Saved in this browser only.</p>
		</div>
		<div data-favorites-body></div>
	</div>
</div>

<div class="vd-age" data-age-gate hidden>
	<div class="vd-age-backdrop"></div>
	<div class="vd-age-panel" role="dialog" aria-modal="true" aria-labelledby="vd-age-title">
		<span class="vd-rule" aria-hidden="true"></span>
		<h2 id="vd-age-title"><?php echo esc_html( vd_mod( 'age_title' ) ); ?></h2>
		<p><?php echo esc_html( vd_mod( 'age_body' ) ); ?></p>
		<div class="vd-age-actions">
			<a class="vd-button vd-button-outline" href="https://www.google.com">Exit the site</a>
			<button type="button" class="vd-button" data-age-confirm>I am over 21</button>
		</div>
	</div>
</div>
