<?php
    require_once "config.php";
    require_once "middleware.php";

    checkAuthentication();

    if (session_status() === PHP_SESSION_ACTIVE) {
        $_SESSION = [];
            session_destroy();
        }

        echo json_encode([
            "loggedIn" => false,    
            "user" => '' ,
            "level" => 'D'
        ]);
        
