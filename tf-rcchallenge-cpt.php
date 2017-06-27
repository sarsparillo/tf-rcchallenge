<?php
//If Direct Access Kill the Script
if ( $_SERVER['SCRIPT_FILENAME'] == __FILE__ ) {
	die( 'Access denied.' );
}

// Register Custom Post Type
function tf_rcchallenge() {
	$labels = array(
		'name'               => __( 'Roller Coaster Challenges', 'Roller Coaster Challenges', 'thinkfun' ),
		'singular_name'      => __( 'Roller Coaster Challenge', 'Roller Coaster Challenge', 'thinkfun' ),
		'add_new'            => __( 'New Challenge', 'thinkfun' ),
		'add_new_item'       => __( 'Create New Challenge', 'thinkfun' ),
		'menu_name'          => __( 'Roller Coaster Challenges', 'thinkfun' ),
		'name_admin_bar'     => __( 'Roller Coaster Challenges', 'thinkfun' ),
		'parent_item_colon'  => __( 'Parent Challenge:', 'thinkfun' ),
		'all_items'          => __( 'All Challenges', 'thinkfun' ),
		'new_item'           => __( 'New Challenge', 'thinkfun' ),
		'edit_item'          => __( 'Edit Challenge', 'thinkfun' ),
		'update_item'        => __( 'Update Challenge', 'thinkfun' ),
		'view_item'          => __( 'View Challenge', 'thinkfun' ),
		'search_items'       => __( 'Search Challenges', 'thinkfun' ),
		'not_found'          => __( 'Not found', 'thinkfun' ),
		'not_found_in_trash' => __( 'Not found in Trash', 'thinkfun' ),
	);
	$args   = array(
		'label'               => __( 'Roller Coaster Challenges', 'thinkfun' ),
		'description'         => __( 'TF Roller Coaster Challenges', 'thinkfun' ),
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor', 'thumbnail', 'revisions', ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 10,
		'menu_icon'           => 'dashicons-chart-line',
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => true,
		'publicly_queryable'  => true,
		'capability_type'     => 'page',
		'rewrite'             => array( 'slug' => 'rollercoasterchallenges' ),
	);
	register_post_type( 'tf_rcchallenge', $args );
}
add_action( 'init', 'tf_rcchallenge', 0 );
