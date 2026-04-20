<?php 
    require_once "helpers.php";

    function checkAuthentication () {
   
        if(!isset($_SESSION['user_react_shopping'])){
            http_response_code(401);
            echo json_encode([
                "loggedIn" => false,
            ]);
            redirect('/');
        }
    
    }


?>