<?php
$students = json_decode(file_get_contents("students.json"), true);
$today = date("Y-m-d");
$file = "attendance_$today.json";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (file_exists($file)) {
        echo "<h2>Attendance already taken.</h2><a href='index.html'>Back</a>";
        exit;
    }

    $output = [];

    foreach ($students as $s) {
        $id = $s["student_id"];
        $status = $_POST["status_$id"] ?? "absent";
        $output[] = ["student_id"=>$id, "status"=>$status];
    }

    file_put_contents($file, json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo "<h2>Attendance saved for $today</h2><a href='index.html'>Back</a>";
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Take Attendance</title>
</head>
<body>

<h2>Attendance – <?= $today ?></h2>
<form method="POST">

<table border="1" cellpadding="8">
<tr><th>ID</th><th>Name</th><th>Group</th><th>Status</th></tr>

<?php foreach ($students as $s): ?>
<tr>
    <td><?= $s["student_id"] ?></td>
    <td><?= $s["name"] ?></td>
    <td><?= $s["group"] ?></td>
    <td>
        <input type="radio" name="status_<?= $s["student_id"] ?>" value="present" checked> Present
        <input type="radio" name="status_<?= $s["student_id"] ?>" value="absent"> Absent
    </td>
</tr>
<?php endforeach; ?>

</table>

<br>
<button type="submit">Save Attendance</button>
</form>

</body>
</html>

