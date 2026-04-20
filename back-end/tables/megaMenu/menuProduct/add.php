<?php


    require_once "../../../functions/pdo_connection.php";
    require_once "../../../functions/config.php";
    require_once "../../../functions/middleware.php";

    checkAuthentication();    

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "POST" : 
            $item = json_decode(file_get_contents('php://input'));
            if(
                isset($item->series) && $item->series !== "" and
                isset($item->list)  && $item->list !== "" and
                isset($item->title) && $item->title !== ""
            )
            {
                // check title 
                $checkTitle =  readTable ($DBName, "SELECT * FROM menu WHERE title = ?", $single = true, $execute = [$item->title]);
                if($checkTitle){
                 
                    // check list 
                    $checkList = readTable ($DBName, "SELECT * FROM menulist WHERE list = ?", $single = true, $execute = [$item->list]);
                    if($checkList){

                        // check repeat name series
                        $checkCategory =  readTable ($DBName, "SELECT * FROM menuseries WHERE list = ? and title = ? and series = ?", $single = true, $execute = [$item->list, $item->title, $item->series]);
                        
                        if(!$checkCategory){
                            $response =  operationsDatabase($DBName, "INSERT INTO menuseries set title = ?, list = ?, series = ?,  created_at = NOW()", $execute = [$item->title, $item->list, $item->series]);
                            echo json_encode(true);
                            break;
                        }
                        else {
                            http_response_code(415);
                            echo json_encode(["message" => "name series repeat ??? change name series !!!"]);
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
                    http_response_code(405); 
                    echo json_encode(["message" => "warning ??? call back project to panelAdmin login to projects !!"]);
                    exit();
                }
            }
            else {
                http_response_code(422); 
                echo json_encode(["message" => "title & list & series  is requierd !!"]);
                exit();
            }

    }
    