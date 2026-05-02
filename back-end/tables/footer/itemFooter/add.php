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
                isset($item->item) && $item->item !== ""
            ){
                // check title 
                $checkTitle =  readTable ($DBName, "SELECT * FROM menufooter WHERE title = ?", $single = true, $execute = [$item->title]);
                if($checkTitle){

                    // check list repeate
                    $checkLT =  readTable ($DBName, "SELECT * FROM menuItemFooter WHERE item = ? and title = ?", $single = true, $execute = [$item->item, $item->title]);
                    if(!$checkLT){
                        $response =  operationsDatabase($DBName, "INSERT INTO menuItemFooter SET title = ?, item = ?, created_at = NOW();", $execute = [$item->title, $item->item]);
                        echo json_encode(true);
                        break;
                    }
                    else {
                        http_response_code(415);
                        echo json_encode(["message" => "name item repeat ??? change item list !!!"]);
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
                echo json_encode(["message" => "title & item  is requierd !!"]);
                exit();  
            }
            
        }
