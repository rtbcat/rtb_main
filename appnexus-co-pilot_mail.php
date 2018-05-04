<?php
$my_url= $_SERVER['HTTP_HOST'];
$to = "fire913n@gmail.com";
$subject = $my_url . " - start building on your TV.";

$message = 'First Name: '. $_POST['firstname'] .'<br>' . 
			'Last Name: '. $_POST['lastname'] .'<br>' . 
			'Email: '. $_POST['email'] .'<br>' . 
			'Company: '. $_POST['company'] .'<br>' . 
			'Phone: ' . $_POST['tel'] . '<br>';
$headers = "Content-type: text/html; charset=UTF-8";
$headers .= "From: " . $my_url;
$result = mail($to, $subject, $message, $headers);
?>