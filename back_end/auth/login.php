<?php
   
    ini_set('session.cookie_samesite', 'Lax'); // برای امنیت و کارکرد در لوکال
    ini_set('session.cookie_httponly', 1);
    
    ini_set('session.cookie_samesite', 'None');
    ini_set('session.cookie_secure', '0'); // اگر https نداری
    
    require_once "..//functions//helpers.php";
    require_once "..//functions//pdo_connection.php";
    require_once "..//functions//config.php";
    

    $method = $_SERVER['REQUEST_METHOD'];
    
    switch($method){
        case "POST":
        if(isset($_SESSION['user_react_shopping'])){
            unset($_SESSION['user_react_shopping']);
            unset($_SESSION['level']);
        }

        $user = json_decode(file_get_contents("php://input"));    
        if(
            isset($user->email)  && $user->email !== ''  and
            isset($user->password) && $user->password !== ""
        ){
            // check email 
            $checkUser = readTable ($DBName, "SELECT * FROM usersleavel WHERE email = ?", $single = true, $execute = [$user->email]);
            if($checkUser) {
                
                // check password 
                if(password_verify($user->password, $checkUser->password)){
                   
                    // check block list
                    if($checkUser -> status == 10){

                        // set session email & level
                        $_SESSION['user_react_shopping'] = $checkUser -> email;
                        $_SESSION['level'] = $checkUser -> level;
                        echo json_encode(true);
                        break;
                     
                    }
                    else {
                        http_response_code(405); // Unprocessable Entity
                        echo json_encode(["message" => "Your account is blocked."]);
                        exit();   
                    }

                }
                else {
                    http_response_code(401); // Unprocessable Entity
                    echo json_encode(["message" => "The password & email entered is incorrect!"]);
                    exit();
                }
            }
            else {
                http_response_code(401); // Unprocessable Entity
                echo json_encode(["message" => "The password & email entered is incorrect!"]);
                exit();
            }
        }
        else {
            http_response_code(400); // Unprocessable Entity
            echo json_encode(["message" => "email & password is required!"]);
            exit();
        }
           
    }

?>