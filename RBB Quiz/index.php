<?php
/*
 * Plugin Name: RBB Quiz Plugin AAA
 * Plugin URI: 
 * Description: RBB Quiz Plugin for MPAT
 * Author: Haroon Akbar
 * Author URI: https://haroonakbar/
 * Version: 1.0
 * Template Name: Admin Panel
 */


add_action("admin_menu", "addMenu");

function addMenu() { add_menu_page ("RBB Quiz", "RBB Quiz", "administrator", "mainPage", "rbbPlugin_Question"); }

function prefix_enqueue() 
{
    // ENQUEING ALL the BOOTSTRAP STUFF
    wp_register_script('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js');
    wp_enqueue_script('prefix_bootstrap');
    wp_register_style('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
    wp_enqueue_style('prefix_bootstrap');

    // ENQUEING ALL the JQuery STUFF
    wp_register_script( 'jQuery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js');
    wp_enqueue_script('jQuery');    
    wp_register_script( 'jsColor', 'https://cdnjs.cloudflare.com/ajax/libs/jscolor/2.0.4/jscolor.min.js');
    wp_enqueue_script('jsColor');
}
add_action("admin_enqueue_scripts", "prefix_enqueue");


function rbbQuiz()
{
    $html_form = plugin_dir_path( __FILE__ ) . "/includes/templates/index.html";

    if ( file_exists( $html_form ) )
        require $html_form;
}

add_action( 'wp_ajax_submit_question_form', 'submit_question_form' );
add_action( 'wp_ajax_nopriv_submit_question_form', 'submit_question_form' );

function submit_question_form() 
{
    if (isset($_POST['number'])) 
    {
        global $wpdb;
        $number = $_POST['number'];
        $number_of_answers = $_POST['number_of_answers'];
        $correct_ans = $_POST['correct_ans'];
        $start_time_minute = $_POST['start_time_minute'];
        $start_time_second = $_POST['start_time_second'];
        $end_time_minute = $_POST['end_time_minute'];
        $end_time_second = $_POST['end_time_second'];
        $cost = $_POST['cost'];
        $tbl_name = $wpdb->prefix . 'rbb_quiz_questions';
        try 
        {
            $rowResult = $wpdb->insert($tbl_name, 
                array(
                    'number' => $number,
                    'number_of_answers' => $number_of_answers,
                    'correct_ans' => $correct_ans,
                    'start_time_minute' => $start_time_minute,
                    'start_time_second' => $start_time_second,
                    'end_time_minute' => $end_time_minute,
                    'end_time_second' => $end_time_second,
                    'cost' => $cost
                ),
                $format = NULL
            );

            if ($rowResult == 1) 
                wp_send_json_success(array('message' => '<h3>Question Added!</h3>', 'status' => 1));
            else 
                wp_send_json_error(array('message' => '<h3>Form Submission Error!</h3>', 'status' => 0));

            die();
            wp_die();
        }
        catch(Exception $e) 
        {
            wp_send_json_error(array('message' => '<p>Database Connection Error! >> '+$e+'</p>', 'status' => 0));
        }
    }
}

function rbbPlugin_Question() 
{
    $html_form = plugin_dir_path( __FILE__ ) . "/includes/templates/index.html";
    if ( file_exists( $html_form ) )
        require $html_form;
}

function get_question_data() {
    if(is_page('RBB Quiz Page')) 
    {
        echo "<p id='current'></p>";
        global $wpdb;

        $questionsRows = $wpdb->get_results("SELECT * FROM wp_rbb_quiz_questions", ARRAY_A);
        wp_register_script('viewer_script', plugins_url("/includes/scripts/viewer.js", __FILE__));
        wp_enqueue_script('viewer_script');
        wp_localize_script('viewer_script', 'questionsTable', array(
                'questionsRows' => $questionsRows
            )
        );
    } 
}
add_action('wp_footer', 'get_question_data');

function install_rbb_pg(){
    if ( ! current_user_can( 'activate_plugins' ) ) return;
    $new_page_title = 'RBB Quiz Page';
    $new_page_content = 'RBB Quiz Page!';
    $new_page_template = '';
    $page_check = get_page_by_title($new_page_title);
    $new_page = array(
        'post_type' => 'page',
        'post_title' => $new_page_title,
        'post_content' => $new_page_content,
        'post_status' => 'publish',
        'post_author' => 1,
    );
    if(!isset($page_check->ID))
    {
        $new_page_id = wp_insert_post($new_page);
        if(!empty($new_page_template))
            update_post_meta($new_page_id, '_wp_page_template', $new_page_template);
    }
}
register_activation_hook(__FILE__, 'install_rbb_pg');

function create_rbb_quiz_table() {
    if ( ! current_user_can( 'activate_plugins' ) ) return;
   	global $wpdb;
    $tbl_name = $wpdb->prefix . 'rbb_quiz_questions';
    $charset_collate = $wpdb->get_charset_collate();
	if($wpdb->get_var("show tables like '$tbl_name'") != $tbl_name) 
	{
		$sql = "CREATE TABLE $tbl_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            number tinytext NOT NULL,
            number_of_answers tinytext NOT NULL,
            correct_ans tinytext NOT NULL,
            start_time_minute tinytext NOT NULL,
            start_time_second tinytext NOT NULL,
            end_time_minute tinytext NOT NULL,
            end_time_second tinytext NOT NULL,
            cost tinytext NOT NULL,
            PRIMARY KEY (id)
		) $charset_collate;";
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql);
	}
}
register_activation_hook(__FILE__,'create_rbb_quiz_table');

function remove_rbb_quiz_table() 
{
    global $wpdb;
    $tbl_name = $wpdb->prefix . 'rbb_quiz_questions';
    $sql = "DROP TABLE IF EXISTS $tbl_name";
    $wpdb->query($sql);
} 
register_deactivation_hook(__FILE__, 'remove_rbb_quiz_table');

function get_question_style() 
{
    if(is_page('RBB Quiz Page')) 
    {
        global $wpdb;

        $questionStyleRows = $wpdb->get_results("SELECT * FROM wp_question_style", ARRAY_A);
        wp_register_script('viewer_script', plugins_url("/includes/scripts/viewer.js", __FILE__));
        wp_enqueue_script('viewer_script');
        wp_localize_script('viewer_script', 'questionStyleTable', array('questionStyleRows' => $questionStyleRows));
    }
}
add_action('wp_footer', 'get_question_style');

function create_question_style_table() 
{
    if ( ! current_user_can( 'activate_plugins' ) ) return;

    global $wpdb;
    $tbl_name = $wpdb->prefix . 'question_style';
    $charset_collate = $wpdb->get_charset_collate();

    if($wpdb->get_var("show tables like '$tbl_name'") != $tbl_name) 
    {
		$sql = "CREATE TABLE " . $tbl_name . "(
            id mediumint(9) AUTO_INCREMENT,
            number_of_answers tinytext,
            button_number tinytext,
            background_color tinytext,
            button_text tinytext,
            button_width tinytext,
            button_height tinytext,
            border_radius tinytext,
            border_width tinytext,
            border_color tinytext,
            font_color tinytext,
            padding tinytext,
            position_top tinytext,
            position_left tinytext,
            font_size tinytext,
            PRIMARY KEY (id)
        )". $charset_collate . ";";
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql);
	}
}
register_activation_hook(__FILE__,'create_question_style_table');


function insertDefaultStylesData()
{
    global $wpdb;

    $wpdb->query("INSERT INTO wp_question_style (number_of_answers, button_number, background_color, button_text, button_width, button_height, border_radius, border_width, border_color, font_color, padding, position_top, position_left, font_size) VALUES('3','1','#0a7bb2','A','80px','40px','18px','2px','#000000','#FBFFBC','3px 4px','510px','50px','35px'), ('3','2','#0a7bb2','B','80px','40px','18px','2px','#000000','#FBFFBC','3px 4px','560px','50px','35px'), ('3','3','#0a7bb2','C','80px','40px','18px','2px','#000000','#FBFFBC','3px 4px','610px','50px','35px')");
}
register_activation_hook(__FILE__,'insertDefaultStylesData');

function remove_question_style_table() 
{
    global $wpdb;
    $tbl_name = $wpdb->prefix . 'question_style';
    $sql = "DROP TABLE IF EXISTS " . $tbl_name;
    $wpdb->query($sql);
} 
register_deactivation_hook(__FILE__, 'remove_question_style_table');