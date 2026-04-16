<?php 
    require_once "helpers.php";

    function checkAuthentication () {
   
        if(!isset($_SESSION['user'])){
            http_response_code(401);
            echo json_encode([
                "loggedIn" => false,
            ]);
            redirect('/');
        }
    
    }

    checkAuthentication()
?>