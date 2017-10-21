<?php
include('bdd.php');

$search = $bdd->prepare("SELECT * FROM  groups ORDER BY groups.lib ASC ");
$search->execute();
$data = $search->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);

 ?>
