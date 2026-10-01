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
?>
<main>
	<header class="vd-group">
		<span class="vd-group-tick" aria-hidden="true"></span>
		<div class="vd-group-copy">
			<p class="vd-kicker"><a class="vd-link" href="<?php echo esc_url( home_url( '/' . $parent_path . '/' ) ); ?>"><?php echo esc_html( $parent->name ); ?></a></p>
			<h1><?php echo esc_html( $group->name ); ?></h1>
			<?php if ( $group->description ) : ?>
				<p class="vd-muted"><?php echo esc_html( $group->description ); ?></p>
			<?php endif; ?>
		</div>
	</header>
	<div class="vd-group-space"></div>
</main>
<?php
get_footer();
