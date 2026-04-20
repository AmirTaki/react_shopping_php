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
                isset($item->category) && $item->category !== "" and
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

                        // check repeat name category
                        $checkCategory =  readTable ($DBName, "SELECT * FROM menucategory WHERE list = ? and title = ? and category = ?", $single = true, $execute = [$item->list, $item->title, $item->category]);
                        
                        if(!$checkCategory){
                            $response =  operationsDatabase($DBName, "INSERT INTO menucategory set title = ?, list = ?, category = ?, sign = ?, created_at = NOW()", $execute = [$item->title, $item->list, $item->category, $item->sign]);
                            echo json_encode(true);
                            break;
                        }
                        else {
                            http_response_code(415);
                            echo json_encode(["message" => "name category repeat ??? change name category !!!"]);
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
                echo json_encode(["message" => "title & list & category  is requierd !!"]);
                exit();
            }

    }
    