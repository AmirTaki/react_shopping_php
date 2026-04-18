<?php


    require_once "../../functions/pdo_connection.php";
    require_once "../../functions/configEdit.php";
    require_once "../../functions/checkSession.php";

    $method = $_SERVER['REQUEST_METHOD'];

    switch($method){
        case "DELETE";

            $path = explode('/', $_SERVER['REQUEST_URI']);
        
            if(isset($path[6]) && is_numeric($path[6])){

                // read user in dataBase 
                $read =  readTable ($DBName, "SELECT * FROM usersleavel WHERE id = ?", $single = true, $execute = [$path[6]]);
                if($read){
                
                    // operations users in dataBase
                    $response = operationsDatabase($DBName, "DELETE FROM usersleavel WHERE id = ?", $execute = [$path[6]]);
            
                    // reading all database
                    $users = readTable ($DBName, "SELECT * from usersleavel", $single = false, $execute = null);
                    echo json_encode($users);
                    break;
                }
                else {
                    http_response_code(150); // Unprocessable Entity
                    echo json_encode(["message" => "not found user account"]);
                    exit();
                }

                break;
            }
    }
?>