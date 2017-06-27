<?php

//* Force full-width-content layout setting
add_filter( 'genesis_pre_get_option_site_layout', '__genesis_return_full_width_content' );

// Remove the standard loop
remove_action( 'genesis_loop', 'genesis_do_loop' );

add_action( 'genesis_before_loop', 'tf_rcchallenge_post' );

function tf_rcchallenge_post() {

	$pid = get_the_ID();
	$uid = get_post_meta($pid, 'uhash', true);
	$thecontent = get_the_content();

	// 'if the content is not empty' is the easiest way to split this type up into two pages imo; the only way to add content is to be an admin
	if ( !empty($thecontent) ) { ?>

	<div class="rollercoaster-create">

		<div class="rc_description">
			<?php the_content(); ?>
			<em>Note: Javascript must be enabled to use this challenge creator.</em>
		</div>

		<div id="rc-canvas-container">
		<canvas id="rc-canvas" width="800" height="657">
		<p>It looks like javascript is disabled, or your browser does not allow canvas to run.  This webpage requires canvas and javascript in order to work - please enable both and try again, or update your browser.</p>
		</canvas>
		</div>

		<form id="rc_challengeboard" name="challenge-board" method="post" enctype="multipart/form-data" >

			<input type="hidden" id="title" value="" tabindex="1" name="title" />	
			<input type="hidden" id="description" tabindex="2" name="description" />
			<input type="hidden" name="rc-challenge-input" value="" id="rc-challenge-input" />
			<input type="hidden" name="rc-solution-input" value="" id="rc-solution-input" />

			<input type="submit" value="Submit Challenge" tabindex="3" id="submit" name="submit" class="hidden-rc">
			<section style="width: 100%; text-align: center;">
				<div id="rc-challenge-img" style="display: inline-block; position: relative;"></div>
				<div id="rc-solution-img" style="display: inline-block; position: relative;"></div>
			</section>

			<?php wp_nonce_field( 'rollercoaster_action', 'rc_post' ); ?>

		</form>
		<?php
		
		if ( $_POST ) { tf_rcpost(); }

	} // end 'if there is content'
	else { ?>

		<section style="width: 100%; text-align: center;" id="rc-puzzlecards">
			<div id="rc-challenge-img"  style="display: inline-block; position: relative;"> <img src="<?php echo $uid ?>_hint.png" /></div>
			<div id="rc-solution-img" style="display: inline-block; position: relative;" class="hidden-solution"> <img src="<?php echo $uid ?>_solution.png" /></div>
		</section>
		<section id="rc-share">
			<a href="http://twitter.com/share?text=Come play my Roller Coaster Challenge!&url=<?php echo get_permalink(); ?>&hashtags=thinkfun,rollercoasterchallenge">Share on Twitter</a>
			<a href="https://www.facebook.com/sharer/sharer.php?p[url]=<?php echo get_permalink(); ?>&p[title]=Roller Coaster Challenge">Share on Facebook</a>
		</section>
		<section id="rc-buy">
		<span>Don't own Roller Coaster Challenge? <a href="http://www.thinkfun.com/products/roller-coaster-challenge/">Buy it today!</a></span>
		<span>Want to make your own challenge? <a href="rollercoasterchallenges/create/">Create Your Own!</a></span></section><?php 
	} // end 'else there is no content'

}
	echo '</div>';
	function tf_rcpost() {

	if( 'POST' == $_SERVER['REQUEST_METHOD'] ) {

		if ( empty( $_POST ) || !wp_verify_nonce($_POST['rc_post'], 'rollercoaster_action') ) {
			print 'Nonce did not verify.';
			exit;
		} else {
			// validate
			if (isset ($_POST['title'])) {
				$title =  $_POST['title'];
			} else {
				echo 'Please enter a title';
				exit;
			}
			if (isset ($_POST['description'])) {
				$description = $_POST['description'];
			} else {
				echo 'Please enter the content';
				exit;
			}


			$img_hint =  $_POST['rc-challenge-input'];
			$img_solution = $_POST['rc-solution-input'];		

			$upload_dir = wp_upload_dir();
			$upload_path = str_replace( '/', DIRECTORY_SEPARATOR, $upload_dir['path'] ) . DIRECTORY_SEPARATOR;

			// duplicates be here, yarr
			$img_hint = str_replace('data:image/png;base64,','',$img_hint);
			$img_solution = str_replace('data:image/png;base64,','',$img_solution);
			$img_hint = str_replace(' ','+',$img_hint);
			$img_solution = str_replace(' ','+',$img_solution);

			// only once you break toDataURL's encoding can base64_decode read the file?
			$decoded_hint = base64_decode($img_hint);
			$decoded_solution = base64_decode($img_solution);

			$filename_hint = "hint.png";
			$filename_solution = "solution.png";

			// pass UID to post meta and each filename
			$unique = md5($filename_hint.microtime());

			$hash_hint = $unique.'_'.$filename_hint;
			$hash_solution = $unique.'_'.$filename_solution;

			$hint_upload = file_put_contents($upload_path . $hash_hint, base64_decode($img_hint) );
			$solution_upload = file_put_contents($upload_path . $hash_solution, base64_decode($img_solution) );


			// make post array
			$post = array(
				'post_title' => '',
				'post_content' => '',
				'post_status' => 'publish',
				'post_type' => 'tf_rcchallenge'
				);

			$new_challenge = wp_insert_post($post); 

			// set hash for post meta
			if ( $new_challenge ) {
				add_post_meta($new_challenge, 'uhash', $upload_path . $unique);
			}


			echo "<meta http-equiv='refresh' content='0;url=../$new_challenge/' />";
			exit;
		} // end else
	}

}
genesis();