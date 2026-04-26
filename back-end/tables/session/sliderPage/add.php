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
                isset($_POST['body']) && $_POST['body'] !== ""
            ){

                // check security image
                $checkImage = checkImageMultipart('image');
                if($checkImage){

                    $path =  uploadImageMultipart('image', "/back-end/tables/session/sliderPage/uploadImage/");
                    if($path){

                        // create to database 
                        $ersponse =  operationsDatabase($DBName, "INSERT INTO sliderpage SET  image = ?, body = ?, created_at = NOW()", $execute = [$path, $_POST['body']]);
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
                echo json_encode(["message" => "body & image  is requierd !!"]);
                exit();
            }
            
    }


?>