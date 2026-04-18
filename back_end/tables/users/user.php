<?php

    require_once "../../functions/pdo_connection.php";
    require_once "../../functions/config.php";
    require_once "../../functions/middleware.php";

    checkAuthentication();

            
    $method = $_SERVER['REQUEST_METHOD'];

    switch($method){
        case "GET": 
            $path = explode('/', $_SERVER['REQUEST_URI']);;
            if(isset($path[6]) && is_numeric($path[6])){
                $user =  readTable ($DBName, "SELECT * FROM usersleavel WHERE id = ?", $single = true, $execute = [$path[6]]);
                echo json_encode($user);
                break;
            }
            else {
                $users = readTable ($DBName, "SELECT * from usersleavel", $single = false, $execute = null);
                echo json_encode($users);
                break;
            }
    }
?>