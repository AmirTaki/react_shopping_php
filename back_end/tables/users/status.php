<?php 
    require_once "../../functions/pdo_connection.php";
    require_once "../../functions/config.php";
    require_once "../../functions/checkSession.php";


    $method = $_SERVER['REQUEST_METHOD'];

       switch($method){
        case "GET":
            $path = explode('/', $_SERVER['REQUEST_URI']);
      
            if(isset($path[6]) && is_numeric($path[6])){
            
                // read user in dataBase
                $user = readTable ($DBName, 'SELECT * FROM usersleavel WHERE id = ?', $single = true, $execute = [$path[6]]);
       
                if($user){
                
                    // operations status users in data base
                    $status =  ($user->status == 10) ? 0 : 10;
                    operationsDatabase($DBName, "UPDATE usersleavel SET status = ? WHERE id = ? ", [$status, $path[6]]);
                
                    // reading all database
                    $users = readTable ($DBName, "SELECT * from usersleavel", $single = false, $execute = null);
                    echo json_encode($users);
                    break;
                }
                break;
            }
            else {
                http_response_code(150); // Unprocessable Entity
                echo json_encode(["message" => "not found user account"]);
                exit();
            }
            
       }


?>