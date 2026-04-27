<?php  

    require_once "../../../functions/pdo_connection.php";
    require_once "../../../functions/config.php";
    require_once "../../../functions/helpers.php";

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "GET":
            $users =  readTable($DBName, "SELECT * FROM imageAdvert ", $single = false, $execute = null);    
            echo json_encode($users);
            break;
        
    }    
    

?>