<?php
    require_once "../functions/pdo_connection.php";
    require_once "../functions/helpers.php";
    require_once "../functions/config.php";

     $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "POST":
            CreatedUseerLevelTable($DBName); 
            $user = json_decode(file_get_contents("php://input"));
            
            if(
                isset($user->username) and preg_match("/^[A-Za-z]*\s{1}[A-Za-z]*$/", $user->username) and
                isset($user->email) and preg_match('/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', $user->email) and
                isset($user->password) and preg_match('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/', $user->password) and
                isset($user->repPassowrd) 
            ){

                if(($user->password === $user->repPassowrd)){
                    // check account
                    $readAccount =  readTable ($DBName, "SELECT * FROM usersleavel WHERE email = ?", $single = true, $execute = [$user->email]);
                    if(!$readAccount){
                        $passwordHash = password_hash($user->password, PASSWORD_DEFAULT );
                        $response =  RegisterUser ($user->username, $user->email, $passwordHash, $DBName, 'usersleavel'); 
                        echo json_encode(true);
                        break;    
                    }
                    else {
                        http_response_code(500); // email repeat
                        echo json_encode(["message" => "email reapeat !"]);
                        exit();   
                    }
                }
                else {
                    http_response_code(403); // Unprocessable Entity
                    echo json_encode(["message" => "confirm not password && repeat password"]);
                    exit(); 
                }
            }
            else {
                http_response_code(422); // Unprocessable Entity
                echo json_encode(["message" => "email & password & username is required!"]);
                exit(); 
            }
    }