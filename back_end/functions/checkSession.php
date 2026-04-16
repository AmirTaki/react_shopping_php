<?php

    require_once "helpers.php";
    require_once "config.php";


    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "GET":
            if(isset($_SESSION['user'])){
                echo json_encode([
                    "loggedIn" => true,
                    "user" => $_SESSION['user'] ,
                    "level" => $_SESSION['level']
                ]);
                break;
            }
            else {
                http_response_code(403);
                echo json_encode([
                    "loggedIn" => false,    
                    "user" => '' ,
                    "level" => 'D'
                ]);
                // redirect('/');
                exit();
                break;
            }
            
    }