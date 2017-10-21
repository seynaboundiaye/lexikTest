<?php
include('bdd.php');
$id = $_GET["id"];

$search = $bdd->prepare("SELECT * FROM users WHERE id=$id");
$search->execute();
$data = $search->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);
?>
