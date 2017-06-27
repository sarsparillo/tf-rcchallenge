<?php
   /*
   Plugin Name: Rollercoaster Challenges
   Plugin URI: http://www.thinkfun.com
   Description: Plugin to manage Rollercoaster Challenge challenges
   Version: 1
   Author: Tom Whalley
   Author URI: http://www.thinkfun.com
   License: GPL2
   */


	/**
	 * Load/Register RC Challenge custom post
	 */
	require_once dirname( __FILE__ ) . '/tf-rcchallenge-cpt.php';

	/**
	 * Enqueue needed scripts
	 */
	function tf_rcscripts() {
		$rc_challenge = plugin_dir_url( __FILE__ ) . 'tf-rcchallenge.js';
		wp_enqueue_script( 'tf-rcchallenge', plugin_dir_url( __FILE__ ) . 'tf-rcchallenge.js', array( 'jquery', 'easeljs', 'preloadjs.min' ), filemtime( $rc_challenge ), true);
		wp_enqueue_script( 'preloadjs.min', plugin_dir_url( __FILE__ ) . 'preloadjs.min.js', array( 'easeljs' ), filemtime( $rc_challenge ), true);
		wp_localize_script( 'tf-rcchallenge', 'rcChallenge', array(
			'theme_dir' => plugin_dir_url(__FILE__)));
		wp_enqueue_style( 'tf-rc', plugin_dir_url( __FILE__ ) . 'tf-rc.css');
	}
	add_action('wp_enqueue_scripts', 'tf_rcscripts');


	add_filter('single_template','tf_rcsingle_template');
	add_filter('archive_template','tf_rcarchive_template');

	//route single- template
	function tf_rcsingle_template($single_template){
	  global $post;
	  $found = locate_template('single-tf_rcchallenge.php');
	  if($post->post_type == 'tf_rcchallenge' && $found == ''){
	    $single_template = dirname(__FILE__).'/templates/single-tf_rcchallenge.php';
	  }
	  return $single_template;
	}

	//route archive- template
	function tf_rcarchive_template($template){
	  if(is_post_type_archive('tf_rcchallenge')){
	    $theme_files = array('archive-tf_rcchallenge.php');
	    $exists_in_theme = locate_template($theme_files, false);
	    if($exists_in_theme == ''){
	      return plugin_dir_path(__FILE__) . '/templates/archive-tf_rcchallenge.php';
	    }
	  }
	  return $template;
	}
?>