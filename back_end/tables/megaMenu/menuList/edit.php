<?php

    require_once "../../../functions/pdo_connection.php";
    require_once "../../../functions/configEdit.php";
    require_once "../../../functions/checkSession.php";

    $method = $_SERVER['REQUEST_METHOD'];

        switch($method){

            case "PUT":
                $path = explode('/', $_SERVER['REQUEST_URI']);
                $item = json_decode(file_get_contents("php://input"));

                if(isset($item->title) && $item->title !== "" and
                    isset($item->list) && $item->list !== ""
                ){
                    // check title 
                    $checkTitle = readTable ($DBName, "SELECT * FROM menu WHERE title = ?", $single = true, $execute = [$item->title]);
                    if($checkTitle){
                        
                        // check title list with id
                        $itemsList = readTable ($DBName, "SELECT * FROM menuList WHERE title = ? and list = ? and id = ? " , $single = true, $execute = [$item->title, $item->list, $path[7]]);
                        if($itemsList){
                            echo json_encode(true);
                            break;
                        }
                        else {
                            // check repeat title & list
                            $itemRepeat =  readTable ($DBName, "SELECT * FROM menulist WHERE title  = ? and list = ?", $single = true, $execute = [$item->title, $item->list]);
                            if(!$itemRepeat){

                                // update item list & title to database
                                $response =  operationsDatabase($DBName,  "UPDATE menulist set title = ?, list = ?, updated_at = NOW() WHERE id = ?", $execute = [$item->title, $item->list, $path[7]]);
                                echo json_encode(true);
                                break;
                            }

                            else {
                                http_response_code(415);
                                echo json_encode(["message" => "name list repeat ??? change name list !!!"]);
                                exit();
                            }
                        }
                    }

                    else {
                        http_response_code(405); 
                        echo json_encode(["message" => "warning ??? call back project to panelAdmin login to projects !!"]);
                        exit(); 
                    }
                }
                else {
                    http_response_code(400);
                    echo json_encode(['message' => "not title && not list ????"]);
                    break;  
                }

        }