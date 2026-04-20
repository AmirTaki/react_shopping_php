<?php  

    require_once "../../../functions/pdo_connection.php";
    require_once "../../../functions/config.php";
    require_once "../../../functions/middleware.php";

    // checkAuthentication();    

    $method = $_SERVER['REQUEST_METHOD'];
        switch($method){
            case "GET":
                $path = explode('/', $_SERVER['REQUEST_URI']);
                if(isset($path[7])  && is_numeric($path[7])){ 
                    $user =  readTable ($DBName, 'SELECT * FROM menulist WHERE id = ? ', $single = true, $execute = [$path[7]]);
                    echo json_encode($user);                
                    break;  
                }
                else {
                    $users =  readTable($DBName, "SELECT * FROM menulist ", $single = false, $execute = null);    
                    echo json_encode($users);
                    break;
                }

            case "POST":
                $requset = json_decode(file_get_contents('php://input'));
                $user =  readTable ($DBName, 'SELECT * FROM menulist WHERE title = ? ', $single = false, $execute = [$requset->title]);
                echo json_encode($user);    
                break;
        }    




?>