<footer class="vd-footer">
	<div class="vd-footer-art">
		<img src="<?php echo esc_url( vd_asset( '/photos/illustration-rifle.png' ) ); ?>" alt="Still drawing of a rifle. The file is a picture, not an animation." width="996" height="400">
	</div>
	<div class="vd-footer-grid">
		<div>
			<a class="vd-mark-link" href="<?php echo esc_url( home_url( '/' ) ); ?>">
				<img src="<?php echo esc_url( vd_asset( '/brand/vital-defense-logo.png' ) ); ?>" alt="Vital Defense" width="736" height="626">
			</a>
			<p class="vd-footer-place"><?php echo esc_html( vd_mod( 'site_name' ) ); ?><br><?php echo esc_html( vd_mod( 'place' ) ); ?></p>
		</div>
		<nav aria-label="Footer">
			<p class="vd-footer-label">Categories</p>
			<ul>
				<?php foreach ( vd_top_terms() as $term ) : ?>
					<li><a class="vd-link" href="<?php echo esc_url( vd_term_url( $term ) ); ?>"><?php echo esc_html( $term->name ); ?></a></li>
				<?php endforeach; ?>
			</ul>
		</nav>
		<div>
			<p class="vd-footer-label">Published contact</p>
			<ul>
				<li><a class="vd-link" href="<?php echo esc_url( vd_phone_href() ); ?>"><?php echo esc_html( vd_mod( 'phone_display' ) ); ?></a></li>
				<li><a class="vd-link" href="<?php echo esc_url( 'mailto:' . vd_mod( 'email' ) ); ?>"><?php echo esc_html( vd_mod( 'email' ) ); ?></a></li>
				<?php if ( vd_mod( 'address' ) ) : ?>
					<li><?php echo esc_html( vd_mod( 'address' ) ); ?></li>
				<?php endif; ?>
			</ul>
		</div>
	</div>
	<div class="vd-footer-note">
		<p><?php echo esc_html( vd_mod( 'footer_note' ) ); ?></p>
	</div>
</footer>
