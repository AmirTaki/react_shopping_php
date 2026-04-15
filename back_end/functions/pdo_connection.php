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