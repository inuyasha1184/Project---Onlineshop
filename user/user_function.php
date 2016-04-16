<?php
function checkUser($post){
	global $conn;
	
	$user = json_decode($post, true);
	
	$sql = "SELECT * FROM onlineshop.user
					WHERE user.username = '". $user['username'] . "';";
		
	$result = $conn->prepare($sql);
	$result->execute();
	
	$db_user = $result->fetch(PDO::FETCH_OBJ);
	
	$response = -1;
	
	if($db_user){
		$response = array(
			'username' => $db_user->username
			);	
	}
	return json_encode($response);	
}

function addUser(){
	global $conn;
	global $servername;
	global $username;
	global $password;
	global $dbname;
	
	$name = $_POST['username'];
	$email = $_POST['email'];
	$pass = $_POST['pass'];
	
	try {
			$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
			// set the PDO error mode to exception
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$sql = "INSERT INTO user (username, email, password, isAdmin)
			VALUES ('$name', '$email', '$pass','0')";
			// use exec() because no results are returned
			$conn->exec($sql);
			echo "New record created successfully";
		}
	catch(PDOException $e)
		{
			echo $sql . "<br>" . $e->getMessage();
		}
	
	$conn = null;
}

?>