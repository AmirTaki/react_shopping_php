<?php

    require_once "../../../functions/pdo_connection.php";
    require_once "../../../functions/configEdit.php";
    require_once "../../../functions/checkSession.php";

    $method = $_SERVER['REQUEST_METHOD'];

        switch($method){

            case "PUT":
                $path = explode('/', $_SERVER['REQUEST_URI']);
                $item = json_decode(file_get_contents("php://input"));
        
                if(
                    isset($item->category) && $item->category !== '' and
                    isset($item->list) && $item->list !== '' and
                    isset($item->title) && $item->title !== '' 
                ){
                    // check title 
                    $checkTitle =  readTable ($DBName, "SELECT * FROM menu WHERE title = ?", $single = true, $execute = [$item->title]);
                    if($checkTitle){
                        
                        // check list 
                        $checkList = readTable ($DBName, "SELECT * FROM menulist WHERE list = ?", $single = true, $execute = [$item->list]);
                        if($checkList){ 

                            // check category with id
                            $itemCategory =  readTable ($DBName, "SELECT * FROM menucategory WHERE title = ? and list = ? and category = ? and sign = ? and id = ?", $single = true, $execute = [$item->title, $item->list, $item->category, $item->sign, $path[7]]);
                            if($itemCategory){
                                echo json_encode (true);
                                break;
                            }
                            else {
                                //  check repeat category & list & title
                                $itemRepeat =  readTable ($DBName, "SELECT * FROM menucategory WHERE title = ? and list = ? and category = ?", $single = true, $execute = [$item->title, $item->list, $item->category]);
                                if(!$itemRepeat){

                                    // update item category & title & list & sign
                                    $response =  operationsDatabase($DBName, "UPDATE menucategory set title = ?, list = ?, category = ?, sign = ?, updated_at = NOW() WHERE id = ?", $execute = [$item->title, $item->list, $item->category, $item->sign, $path[7]]);
                                    echo json_encode (true);
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
                        http_response_code(405); 
                        echo json_encode(["message" => "warning ??? call back project to panelAdmin login to projects !!"]);
                        exit();
                    }
                    

                }
                else {
                    http_response_code(400);
                    echo json_encode(['message' => "not title && not list && not category ????"]);
                    break;  
                }

                
        }