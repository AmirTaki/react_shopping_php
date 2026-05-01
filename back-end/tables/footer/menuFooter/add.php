<?php


    require_once "../../../functions/pdo_connection.php";
    require_once "../../../functions/config.php";
    require_once "../../../functions/middleware.php";

    checkAuthentication();    

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "POST" : 
            $user = json_decode(file_get_contents("php://input"));
            
            if(isset($user->title) && $user->title !== ""){
                $readAccount = readTable($DBName, 'SELECT * FROM menufooter WHERE title = ?', true, [$user->title]);   
                
                if(!$readAccount){
                   $response =  operationsDatabase($DBName, "INSERT INTO menufooter SET title = ?, created_at = NOW()", $execute = [$user->title]);
                    echo json_encode(true);
                    break;
                }   
                else {
                    http_response_code(409); // title repeat
                    echo json_encode(["message" => "title repeat!!"]);
                    exit();
                }  
            }
            else {
                http_response_code(400); // title repeat
                echo json_encode(["message" => "title is not empty!!"]);
                exit();
            }
    }
