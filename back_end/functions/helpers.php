<?php 


// address localhost
$address = 'http://localhost/react_shopping_php';
define('BASE_URL', $address);

// database Name 
$DBName = 'reactCombination';

// redirect 
function redirect ($url) {
    header("Location: ".trim(BASE_URL,'/ '). '/'. trim($url, '/ '));
    exit;
}

// asset 
function asset($file){
    return trim(BASE_URL, "/ "). "/". trim($file, '/ ');
}

// url
function url($url){
    return trim(BASE_URL, "/ "). "/". trim($url, '/ ');
}

// view
function dd($var){
    echo '<pre>';
    var_dump($var);
    exit;
}