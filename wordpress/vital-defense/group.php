<?php
$parent_path = get_query_var( 'vd_catalog' );
$group_path  = get_query_var( 'vd_group' );
$group       = vd_find_group( $parent_path, $group_path );
$parent      = vd_find_top( $parent_path );
get_header();
if ( ! $group || ! $parent ) {
	status_header( 404 );
	?>
	<main class="vd-page">
		<header class="vd-page-head">
			<p class="vd-kicker">Vital Defense</p>
			<span class="vd-rule" aria-hidden="true"></span>
			<h1>Page not found</h1>
		</header>
	</main>
	<?php
	get_footer();
	return;
}
$photo = (string) get_term_meta( $parent->term_id, '_vd_photo', true );
$wide  = '1' === (string) get_term_meta( $parent->term_id, '_vd_photo_wide', true );
?>
<main>
	<header class="vd-group">
		<div class="vd-group-panel" aria-hidden="true"></div>
		<span class="vd-group-tick" aria-hidden="true"></span>
		<?php if ( $photo ) : ?>
			<img class="vd-group-photo <?php echo $wide ? 'is-wide' : 'is-narrow'; ?>" src="<?php echo esc_url( vd_asset( $photo ) ); ?>" alt="<?php echo esc_attr( (string) get_term_meta( $parent->term_id, '_vd_photo_alt', true ) ); ?>" width="<?php echo esc_attr( (string) get_term_meta( $parent->term_id, '_vd_photo_w', true ) ); ?>" height="<?php echo esc_attr( (string) get_term_meta( $parent->term_id, '_vd_photo_h', true ) ); ?>">
		<?php endif; ?>
		<div class="vd-group-copy">
			<p class="vd-kicker"><a class="vd-link" href="<?php echo esc_url( home_url( '/' . $parent_path . '/' ) ); ?>"><?php echo esc_html( $parent->name ); ?></a></p>
			<h1><?php echo esc_html( $group->name ); ?></h1>
			<?php if ( $group->description ) : ?>
				<p class="vd-muted"><?php echo esc_html( $group->description ); ?></p>
			<?php endif; ?>
		</div>
		<?php if ( $photo ) : ?>
			<div class="vd-group-photo-mobile">
				<div aria-hidden="true"></div>
				<img src="<?php echo esc_url( vd_asset( $photo ) ); ?>" alt="<?php echo esc_attr( (string) get_term_meta( $parent->term_id, '_vd_photo_alt', true ) ); ?>">
			</div>
		<?php endif; ?>
	</header>
	<div class="vd-group-space"></div>
</main>
<?php
get_footer();
