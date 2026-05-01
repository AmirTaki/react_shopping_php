<?php


    require_once "../../../functions/pdo_connection.php";
    require_once "../../../functions/configEdit.php";
    require_once "../../../functions/checkSession.php";



    $method = $_SERVER['REQUEST_METHOD'];

        switch($method){

            case "PUT":
                $path = explode('/', $_SERVER['REQUEST_URI']);
                $item = json_decode(file_get_contents("php://input"));

                if(isset($item->title) && $item->title !== ""){
                    
                    // check title with id 
                    $itemMenus =   readTable ($DBName, "SELECT * FROM menufooter WHERE title = ? and id = ?", $single = true, $execute = [$item->title, $path[7]]);
                    if($itemMenus){
                        echo json_encode(true);
                        break;
                    }
                    else {

                        // name title repeat check 
                        $itemRepeat =   readTable ($DBName, "SELECT * FROM menufooter  WHERE title = ? ", $single = true, $execute = [$item->title]);
                        if(!$itemRepeat){
                            $resposne = operationsDatabase($DBName, "UPDATE menufooter SET title = ?, updated_at = NOW() WHERE id = ? ", $execute = [$item->title, $path[7]]);
                            echo json_encode($resposne);
                            break;
                        }
                        else {
                            http_response_code(409); // Unprocessable Entity
                            echo json_encode(["message" => "title repeat chagnge name title !!"]);
                            exit();
                        }

                    }
                    
                }
                else {
                    http_response_code(400); // Unprocessable Entity
                    echo json_encode(["message" => "title is requird!!!"]);
                    exit();
                }

        }