<?php


    require_once "../../../functions/pdo_connection.php";
    require_once "../../../functions/config.php";
    require_once "../../../functions/middleware.php";

    checkAuthentication();    

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "POST" :
            if(
                isset($_FILES['image']) && $_FILES['image']['name'] !== "" && $_FILES['image']['error'] == 0 and
                isset($_POST['title']) && $_POST['title'] !== "" and 
                isset($_POST['body']) &&  $_POST['body'] !== "" and
                isset($_POST['list']) && $_POST['list'] !== ""
            ){
                // check list 
                $checkList =  readTable ($DBName, "SELECT * FROM menulist WHERE list = ?", $single = true, $execute = [$_POST['list']]);
                if($checkList){

                    // check title 
                    $checkTitle =  readTable ($DBName, "SELECT * FROM menu WHERE title = ?", $single = true, $execute = [$_POST['title']]);
                    if($checkTitle){

                        // check security image 
                        $checkImage = checkImageMultipart('image');
                        if($checkImage){
                            
                            // upload image
                            $path =  uploadImageMultipart('image', "/back-end/tables/megaMenu/menuImage/uploadImage/");
                            if($path){

                                // create to database
                                $response = operationsDatabase($DBName, "INSERT INTO menuImage SET title = ?, list = ?, body = ?, image = ?, created_at = NOW();", $execute = [$_POST['title'], $_POST['list'],  $_POST['body'], $path]);
                                echo json_encode(true);
                                break;
                            }
                            else {
                                http_response_code(404); 
                                echo json_encode(["message" => "warning ??? not upload image"]);
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
                    http_response_code(405); 
                    echo json_encode(["message" => "warning ??? call back project to panelAdmin login to projects !!"]);
                    exit();    
                }
               

            }
            else {
                http_response_code(422); 
                echo json_encode(["message" => "title & list & body & image  is requierd !!"]);
                exit();
            }
    }