<?php


    require_once "../../../functions/pdo_connection.php";
    require_once "../../../functions/config.php";
    require_once "../../../functions/checkSession.php";
    
    // header("Access-Control-Allow-Credentials: true");

    $method = $_SERVER['REQUEST_METHOD'];               
    $path = explode('/', $_SERVER['REQUEST_URI']);

    switch($method){
        case "POST" :
            if(
                isset($_POST['title']) && $_POST['title'] !== ""           
            ){

            // isset image 
            if(isset($_FILES['image']) and $_FILES['image']['name'] !== "" and $_FILES['image']['error'] == 0 ) {

                // check security image
                $checkImage =  checkImageMultipart('image');
                if($checkImage){
                    
                    // upload image
                    $uploadPath =  uploadImageMultipart('image', "/back-end/tables/session/imageSliderLoop/uploadImage/");
                    if($uploadPath){
                        
                        // delete image back 
                        $read =  readTable ($DBName, "SELECT * FROM imageSliderLoop WHERE id = ?", $single = true, $execute = [$path[7]]);
                        if($read){
                            deleteFiles($read->image);
                        }
                        
                        // update item to database
                        $response = operationsDatabase($DBName, "UPDATE imageSliderLoop SET  title = ?,  image = ?, updated_at = NOW() WHERE id = ?", $execute = [$_POST['title'], $uploadPath, $path[7]]);
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
                // check title in with id
                $itemCheck =  readTable ($DBName, "SELECT * FROM imageSliderLoop WHERE  title = ? ", $single = true, $execute = [$_POST['title']]);
                if(!$itemCheck){

                    // update item to database 
                    $response =  operationsDatabase($DBName, "UPDATE imageSliderLoop SET title = ?, updated_at = NOW() WHERE id = ?", $execute = [$_POST['title'], $path[7]]);
                    echo json_encode (true);
                    break;
                }
                else {
                    echo json_encode (true);
                    break;
                }
            }

            }
            else {
                http_response_code(422); 
                echo json_encode(["message" => "title  is requierd !!"]);
                exit();
            }

            
            
    }