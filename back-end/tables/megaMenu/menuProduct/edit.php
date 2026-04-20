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
                    isset($item->series) && $item->series !== '' and
                    isset($item->list) && $item->list !== '' and
                    isset($item->title) && $item->title !== '' 
                ){
                    // check title 
                    $checkTitle =  readTable ($DBName, "SELECT * FROM menu WHERE title = ?", $single = true, $execute = [$item->title]);
                    if($checkTitle){
                        
                        // check list 
                        $checkList = readTable ($DBName, "SELECT * FROM menulist WHERE list = ?", $single = true, $execute = [$item->list]);
                        if($checkList){ 

                            // check series with id
                            $itemCategory =  readTable ($DBName, "SELECT * FROM menuseries WHERE title = ? and list = ? and series = ?  and id = ?", $single = true, $execute = [$item->title, $item->list, $item->series, $path[7]]);
                            if($itemCategory){
                                echo json_encode (true);
                                break;
                            }
                            else {
                                //  check repeat series & list & title
                                $itemRepeat =  readTable ($DBName, "SELECT * FROM menuseries WHERE title = ? and list = ? and series = ?", $single = true, $execute = [$item->title, $item->list, $item->series]);
                                if(!$itemRepeat){

                                    // update item series & title & list & sign
                                    $response =  operationsDatabase($DBName, "UPDATE menuseries set title = ?, list = ?, series = ?, updated_at = NOW() WHERE id = ?", $execute = [$item->title, $item->list, $item->series, $path[7]]);
                                    echo json_encode (true);
                                    break;
                                }
                                else {
                                    http_response_code(415);
                                    echo json_encode(["message" => "name series repeat ??? change name series !!!"]);
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