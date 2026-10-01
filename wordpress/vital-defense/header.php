<?php
?><!DOCTYPE html>
<html <?php language_attributes(); ?> data-vd-home="<?php echo is_front_page() ? '1' : '0'; ?>">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="<?php echo esc_url( vd_asset( '/brand/vital-defense-logo.jpg' ) ); ?>">
	<script>
	try{if(sessionStorage.getItem("vd-age-confirmed")==="1"){var s=document.createElement("style");s.id="vd-age-pending";s.textContent="[data-age-gate]{display:none!important}html,body{overflow:visible!important}";document.head.appendChild(s);document.documentElement.dataset.age="ok"}}catch(e){}
	</script>
	<script>
	<?php echo file_get_contents( get_template_directory() . '/assets/js/logo-boot.js' ); ?>
	</script>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#content">Skip to content</a>
<div id="vd-app">
<?php get_template_part( 'template-parts/header' ); ?>
<div id="content">
