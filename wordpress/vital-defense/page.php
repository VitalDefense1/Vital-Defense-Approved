<?php
get_header();
while ( have_posts() ) {
	the_post();
	echo '<main class="vd-page"><div class="vd-narrow">';
	the_content();
	echo '</div></main>';
}
get_footer();
