<?php
include('bdd.php');

$search = $bdd->prepare("SELECT users.id, users.name, users.firstname, users.email, users.birthDate, groups.lib FROM users, groups WHERE groups.id = users.groupId ORDER BY groups.lib ASC ");
$search->execute();
$data = $search->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);


 ?>
