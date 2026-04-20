<?php 
    require_once "../../../functions/pdo_connection.php";
    require_once "../../../functions/config.php";
    require_once "../../../functions/checkSession.php";


    $method = $_SERVER['REQUEST_METHOD'];

       switch($method){
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);

            if(isset($path[7]) && is_numeric($path[7])){
            
                // read user in dataBase
                $user = readTable ($DBName, 'SELECT * FROM menuseries WHERE id = ?', $single = true, $execute = [$path[7]]);

                if($user){
                
                    // operations status users in data base
                    $status =  ($user->status == 10) ? 0 : 10;
                    operationsDatabase($DBName, "UPDATE menuseries SET status = ? WHERE id = ? ", [$status, $path[7]]);
                
                    // reading all database
                    $users = readTable ($DBName, "SELECT * from menuseries", $single = false, $execute = null);
                    echo json_encode($users);
                    break;
                }
                break;
            }
            else {
                http_response_code(150); // Unprocessable Entity
                echo json_encode(["message" => "not found item account"]);
                exit();
            }
            
       }


?>