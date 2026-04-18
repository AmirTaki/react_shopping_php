<?php
    require_once "config.php";

    require_once "middleware.php";

    checkAuthentication();

    $method = $_SERVER['REQUEST_METHOD'];
    
    switch($method){
        case "GET":
            if (session_status() === PHP_SESSION_ACTIVE) {
                $_SESSION = [];
                    session_destroy();
                }
                echo json_encode(["loggedIn" => false,"user_react_shopping" => '' , "level" => 'D']);   
    
                
    }


        
