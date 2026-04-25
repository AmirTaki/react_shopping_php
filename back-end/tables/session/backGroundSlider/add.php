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
                isset($_POST['title']) && $_POST['title'] !== "" 
            ){

                // check security image
                $checkImage = checkImageMultipart('image');
                if($checkImage){

                   // upload image
                    $path =  uploadImageMultipart('image', "/back-end/tables/session/backGroundSlider/uploadImage/");
                    if($path){

                        // create to database 
                        $ersponse =  operationsDatabase($DBName, "INSERT INTO backgroundslider SET title = ?, image = ?, created_at = NOW()", $execute = [$_POST['title'], $path]);
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
                http_response_code(422); 
                echo json_encode(["message" => "title & list & body & image  is requierd !!"]);
                exit();
            }
            
    }


?>