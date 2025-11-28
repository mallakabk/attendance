<?php
$file = "students.json";

$id    = trim($_POST["student_id"]);
$name  = trim($_POST["name"]);
$group = trim($_POST["group"]);

if ($id === "" || $name === "" || $group === "") {
    exit("All fields are required.");
}

$students = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

$students[] = [
    "student_id" => $id,
    "name"       => $name,
    "group"      => $group
];

file_put_contents($file, json_encode($students, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

header("Location: index.html");
exit;

