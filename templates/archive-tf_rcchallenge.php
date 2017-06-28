<?php

//* Force full-width-content layout setting
add_filter( 'genesis_pre_get_option_site_layout', '__genesis_return_full_width_content' );

// Remove the standard loop
remove_action( 'genesis_loop', 'genesis_do_loop' );

add_action( 'genesis_before_loop', 'tf_rcarchive' );

function tf_rcarchive() {
	?>
	<div id="rc-buy">
		<img src="<?php echo plugin_dir_url(); ?>tf-rollercoaster/images/logo.png" />
		<span>Don't own Roller Coaster Challenge? <a href="http://www.thinkfun.com/products/roller-coaster-challenge/">Buy it today!</a></span>
		<span>Want to make your own challenge? <a href="create/">Create Your Own!</a></span>
	</div>

	<div id="rc-archive-message">
		<p>Test yourself on some recent challenges below!</p>

	<?php 
	if ( have_posts()) : 
		while ( have_posts() ) : the_post();
		$uid = get_post_meta(get_the_ID(), 'uhash', true);
		if (!empty($uid)) {
		?>
		<div id="rc-challenge-img"  style="display: inline-block; position: relative;"><a href="<?php echo get_the_ID(); ?>"><img src="<?php echo $uid ?>_hint.png" /></a></div>
		<?php }
	endwhile; endif;

	echo '</div>';
	
}

genesis();
?>