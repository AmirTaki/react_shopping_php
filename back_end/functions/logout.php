<?php
    require_once "config.php";
    // require_once "config.php";

    if (session_status() === PHP_SESSION_ACTIVE) {
        $_SESSION = [];
            session_destroy();
        }

        echo json_encode([
            "loggedIn" => false,    
            "user" => '' ,
            "level" => 'D'
        ]);
