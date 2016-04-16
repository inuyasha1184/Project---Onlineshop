<?php
require_once('user_function.php');

	// establish DB's connection using PDO
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "onlineshop";
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

if($_SERVER['REQUEST_METHOD'] == 'POST'){
	if(isset($_POST['user']) && !empty($_POST['user'])){
		$response = checkUser($_POST['user']);
		
		echo $response;
		/*if($response != -1){
			echo json_encode($response);
		} else {
			echo $response;
			
		}*/
	} 
}

?>
