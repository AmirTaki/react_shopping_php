<?php


    require_once "../../../functions/pdo_connection.php";
    require_once "../../../functions/configEdit.php";
    require_once "../../../functions/checkSession.php";

    $method = $_SERVER['REQUEST_METHOD'];

    switch($method){
        case "DELETE";

            $path = explode('/', $_SERVER['REQUEST_URI']);
        
            if(isset($path[7]) && is_numeric($path[7])){

                // read user in dataBase 
                $read =  readTable ($DBName, "SELECT * FROM imageSliderLoop WHERE id = ?", $single = true, $execute = [$path[7]]);
                if($read){
                
                    // delete files image
                    deleteFiles($read->image);
                    
                    // operations users in dataBase
                    $response = operationsDatabase($DBName, "DELETE FROM imageSliderLoop WHERE id = ?", $execute = [$path[7]]);
            
                    // reading all database
                    $users = readTable ($DBName, "SELECT * from imageSliderLoop", $single = false, $execute = null);
                    echo json_encode($users);
                    break;
                }
                else {
                    http_response_code(150); // Unprocessable Entity
                    echo json_encode(["message" => "not found item account"]);
                    exit();
                }

                break;
            }
    }
?>