<?php

    // create database
    function createDataBase($name){
        $serverName = "localhost";
        $userName = 'root';
        $password = '';
        try{
            $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ);
            $connection = new PDO ("mysql:host=$serverName", $userName, $password, $options);
            $sql = "CREATE DATABASE $name";
            $connection -> exec($sql);
        }
        catch(PDOException $error){
            return 'warning: '.$error->getMessage();
        }
    }

    // connect to dataBase 
    function connectDataBase($dbName){
        $serverName = 'localhost';
        $userName = "root";
        $password = '';
        global $connection;
        try{
            $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ);
            $connection = new PDO("mysql:host=$serverName;dbname=$dbName", $userName, $password, $options);
            return $connection;
        }
        catch(PDOException $error){
            return "warning: ".$error->getMessage();
        }
    }


    //  Creating the users table
    function createdUserTable($dbName) {
        try{
            $connection = connectDataBase($dbName);
            $sql = "CREATE TABLE `users` (
                `id` int(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,  
                `name` varchar(130) ,
                `email` varchar(200) UNIQUE, 
                `status` TINYINT NOT NULL DEFAULT 0 ,  
                `password` varchar(130),
                `created_at` DATETIME
            )";
            $connection->exec($sql);
        }
        catch(PDOException $error){
            return "warning : " . $error->getMessage();
        }
    }

    // create the users tablse level asign
    function CreatedUseerLevelTable ($dbName){
        try{
            $connection = connectDataBase($dbName);
            $sql = "CREATE TABLE `usersleavel` (
                `id` int(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,  
                `name` varchar(130) ,
                `email` varchar(200) UNIQUE, 
                `status` TINYINT NOT NULL DEFAULT 0 ,  
                `level` CHAR NOT NULL DEFAULT 'D',
                `password` varchar(130),
                `created_at` DATETIME NOT NULL,
                `updated_at` DATETIME 
            )";
            $connection->exec($sql);
        }
        catch(PDOException $error){
            return "warning : " . $error->getMessage();
        }
    }

    // register to user table
    function RegisterUser ($name, $email, $password, $dbName, $table) {
        try{
            $connection = connectDataBase($dbName);
            $sql = "INSERT INTO $table SET name = ?, email = ?, password = ?, created_at = NOW();";
            $statment = $connection->prepare($sql);
            $statment->execute([$name, $email, $password]);
        }
        catch(PDOException $error){
            return "warning : " . $error->getMessage();
        }
    }

    // read table in database
    function readTable ($dbName, $query, $single = true, $execute = null){
        $pdo = connectDataBase($dbName);
        $statment = $pdo->prepare($query);
        $execute = null ? $statment->execute() : $statment->execute($execute);
        $reading  = $single ? $statment->fetch() : $statment->fetchAll();
        return $reading;
    }

    // OPERATIONS IN DATE BASE
    function operationsDatabase($dbName, $query, $execute = null){
        $pdo = connectDataBase($dbName);
        $statment = $pdo->prepare($query);
        $statment = $execute == null ? $statment->execute() : $statment->execute($execute);
        return $statment;
    }


    //  check image ->  'Content-Type': 'multipart/form-data'
function checkImageMultipart ($image) {
    $allowed_file_types = array('jpg', 'jpeg', 'png', 'gif', 'bmp', 'avf', 'webp', 'avif');
    $file_name = basename($_FILES[$image]['name']);
    $file_tmp = $_FILES[$image]['tmp_name'];
    $file_type = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    return in_array($file_type, $allowed_file_types);
}

// upload image ->  'Content-Type': 'multipart/form-data'
function uploadImageMultipart ($image, $path){
    $basePath = dirname(dirname(__DIR__)); 
    $filename = date("Y_m_d_H_i_s"). '.' . 'avif';
    $uploadDir = ".\\uploadImage\\";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    $location = $basePath . $path . $filename;
    $image_upload  = move_uploaded_file($_FILES[$image]['tmp_name'], $location);
    
    return $image_upload ? $path . $filename : false;
}


// delete image files 
function deleteFiles ($path){
    $basePath = dirname(dirname(__DIR__)); 
    if (file_exists($basePath  . $path)){
        unlink ($basePath  . $path);
    }
}   
