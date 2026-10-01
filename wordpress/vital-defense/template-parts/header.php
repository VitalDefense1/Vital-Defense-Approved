<header class="vd-header" data-site-header>
	<button type="button" class="vd-icon-button" data-open-menu aria-label="Open menu" aria-expanded="false" aria-controls="site-navigation">
		<span class="vd-burger" aria-hidden="true"><span></span><span></span><span></span></span>
	</button>
	<a class="vd-logo-link" data-intro-logo href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="Vital Defense">
		<img src="<?php echo esc_url( vd_asset( '/brand/shield-symbol.png' ) ); ?>" alt="" width="293" height="248" draggable="false">
	</a>
	<div class="vd-utilities">
		<button type="button" class="vd-icon-button" data-open-dialog="search" aria-label="Search"><?php echo vd_icon( 'search' ); ?></button>
		<button type="button" class="vd-icon-button vd-desktop-only" data-open-dialog="favorites" aria-label="Favorites"><?php echo vd_icon( 'heart' ); ?></button>
		<button type="button" class="vd-icon-button vd-desktop-only" data-open-dialog="account" aria-label="Account"><?php echo vd_icon( 'user' ); ?></button>
		<button type="button" class="vd-icon-button" data-open-dialog="cart" aria-label="Cart">
			<?php echo vd_icon( 'bag' ); ?>
			<span class="vd-cart-count" data-cart-count hidden>0</span>
		</button>
	</div>
</header>
