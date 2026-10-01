<?php
$title_tag = is_page( 'contact' ) ? 'h1' : 'h2';
$address = trim( (string) vd_mod( 'address' ) );
$appointment = trim( (string) vd_mod( 'appointment' ) );
?>
<section class="vd-contact">
	<div class="vd-contact-inner">
		<span class="vd-rule" aria-hidden="true"></span>
		<<?php echo esc_html( $title_tag ); ?>><?php echo esc_html( vd_mod( 'contact_heading' ) ); ?></<?php echo esc_html( $title_tag ); ?>>
		<div class="vd-contact-lines">
			<p><a class="vd-link" href="<?php echo esc_url( vd_phone_href() ); ?>"><?php echo esc_html( vd_mod( 'phone_display' ) ); ?></a></p>
			<p><a class="vd-link" href="<?php echo esc_url( 'mailto:' . vd_mod( 'email' ) ); ?>"><?php echo esc_html( vd_mod( 'email' ) ); ?></a></p>
			<?php if ( $address ) : ?>
				<p><?php echo esc_html( $address ); ?></p>
			<?php endif; ?>
			<?php if ( $appointment ) : ?>
				<p class="vd-appointment"><?php echo esc_html( $appointment ); ?></p>
			<?php endif; ?>
		</div>
		<form class="vd-form" data-contact-form>
			<label for="contact-name">Name</label>
			<input id="contact-name" name="name" autocomplete="name" placeholder="Full name">
			<label for="contact-email">Email</label>
			<input id="contact-email" name="email" type="email" autocomplete="email" placeholder="name@email.com">
			<label for="contact-message">Message</label>
			<textarea id="contact-message" name="message" placeholder="How can we help?"></textarea>
			<button class="vd-button vd-button-dark" type="submit">Send message</button>
			<p class="vd-form-note" role="status" hidden></p>
		</form>
	</div>
</section>
