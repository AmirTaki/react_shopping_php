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
                isset($item->title) && $item->title !== "" and
                isset($item->list) && $item->list !== ""
            ){
                // check title 
                $checkTitle =  readTable ($DBName, "SELECT * FROM menu WHERE title = ?", $single = true, $execute = [$item->title]);
                if($checkTitle){

                    // check list repeate
                    $checkLT =  readTable ($DBName, "SELECT * FROM menulist WHERE list = ? and title = ?", $single = true, $execute = [$item->list, $item->title]);
                    if(!$checkLT){
                        $response =  operationsDatabase($DBName, "INSERT INTO menulist SET title = ?, list = ?, created_at = NOW();", $execute = [$item->title, $item->list]);
                        echo json_encode(true);
                        break;
                    }
                    else {
                        http_response_code(415);
                        echo json_encode(["message" => "name list repeat ??? change name list !!!"]);
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
                echo json_encode(["message" => "title & list  is requierd !!"]);
                exit();  
            }
            
        }

