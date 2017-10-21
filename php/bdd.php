<?php
$user = "root";
$pass = "";
$host = "localhost";
$port = "80";
$dbname = "lexik";
try{
  $bdd = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
} catch(PDOException $e){
  print "Error!: " . $e->getMessage() . "<br/>";
  die();
}
?>
