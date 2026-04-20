<?php

    require_once "../../functions/pdo_connection.php";
    require_once "../../functions/configEdit.php";
    require_once "../../functions/checkSession.php";

    $method = $_SERVER['REQUEST_METHOD'];

        switch($method){
          
            case "PUT": 
                $path = explode('/', $_SERVER['REQUEST_URI']);
                $user = json_decode(file_get_contents("php://input"));
                
                // check username & check email & check password & check rep password
                if (
                    isset($user->username) && preg_match("/^[A-Za-z]*\s{1}[A-Za-z]*$/", $user->username) and
                    isset($user->email) && preg_match("/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/", $user->email) and 
                    isset($user->password) and preg_match("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/", $user->password)  &&
                    isset($user->repPassword) and preg_match("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/", $user->repPassword)                                  
                ){

                    // check confirm password to repeat password
                    if($user->password === $user->repPassword){
                        // password hash
                        $passowrdHash =  password_hash($user->password, PASSWORD_DEFAULT);

                        // check email with id 
                        $accountEmail = readTable ($DBName, "SELECT * FROM usersleavel WHERE email = ? and id = ?", $single = true, $execute = [$user->email, $path[6]]) ;
                        if($accountEmail){
                            
                            // upadate username & password in dataBase
                            $response = operationsDatabase($DBName, "UPDATE usersleavel SET name = ?, password = ?, level = ?, updated_at = NOW() WHERE id = ?", $execute = [$user->username, $passowrdHash, $user->level, $path[6]]);
                            echo json_encode(true);
                            break;
                        }
                        else {
                            // email repeat change
                            $readAccount = readTable($DBName, 'SELECT * FROM usersleavel WHERE email = ?', true, [$user->email]);  
                            if(!$readAccount){
               
                                // update username & email & password in dataBase 
                                $response = operationsDatabase($DBName, "UPDATE usersleavel SET name = ?, email = ?, password = ?, level = ?, updated_at = NOW() WHERE id = ?", $execute = [$user->username, $user->email, $passowrdHash, $user->level, $path[6]]);
                                echo json_encode(true);
                                break;
                            }
                            else {
                                http_response_code(409); // Unprocessable Entity
                                echo json_encode(["message" => "email repeat"]);
                                exit();
                            }

                        }
                    }
                    else {
                        http_response_code(415); // Unprocessable Entity
                        echo json_encode(["message" => "password & repeat password  not confirm"]);
                        exit(); 
                    }
                }
                
                // check username & check email
                else if(
                    isset($user->username) && preg_match("/^[A-Za-z]*\s{1}[A-Za-z]*$/", $user->username) and
                    isset($user->email) && preg_match("/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/", $user->email) 
                ) 
                {
                    // check email with id 
                    $accountEmail = readTable ($DBName, "SELECT * FROM usersleavel WHERE email = ? and id = ?", $single = true, $execute = [$user->email, $path[6]]) ;
                    if($accountEmail){
                  
                        // update name in database
                        $response =  operationsDatabase($DBName, "UPDATE usersleavel SET name = ?, level = ?, updated_at = NOW() WHERE email = ?", $execute = [$user->username, $user->level, $user->email]);
                        echo json_encode(true);
                        break;
                    }
                    else {
                        // email repeat change
                        $readAccount = readTable($DBName, 'SELECT * FROM usersleavel WHERE email = ?', true, [$user->email]);  
                        if(!$readAccount){
                            
                            // update name & email in database 
                            $response  = operationsDatabase($DBName, 'UPDATE usersleavel SET name = ?, email = ?, level = ?, updated_at = NOW() WHERE id = ?', $execute = [$user->username, $user->email, $user->level, $path[6]]);
                            echo json_encode(true);
                            break;
                        }
                        else {
                            http_response_code(409); // Unprocessable Entity
                            echo json_encode(["message" => "email repeat"]);
                            exit();
                        }
                    }

                  
                }
        
                else {
                    http_response_code(400); // Unprocessable Entity
                    echo json_encode(["message" => "invalid email & username"]);
                    exit();
                }
        }
        