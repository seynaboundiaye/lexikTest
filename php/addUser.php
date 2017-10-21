<?php
if(isset($_GET)){
  echo "nabou";
  $name = $_GET["user.name"];
  $firstname = $_GET["user.firstname"];
  $email = $_GET["user.email"];
  $birthDate = $_GET["user.birthDate"];
  $groupId = $_GET["user.groupId"];
  $search = $bdd->prepare("INSERT INTO `users`(users.name, users.firstname, users.email,users.birthDate,users.groupId) VALUES($name, $firstname, $email, $birthDate, $groupId)");
  $search->execute();
  $data = $search->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($_GET);
  var_dump([$search]);
}
else{
  echo json_encode(false);
}
?>
