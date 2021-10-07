<?php
    //ip는 aws 접속할 때마다 변경해줘야함.
    $conn = mysqli_connect("15.164.219.223", "pbl", "pbl", "pbl") or die ("connect fail");

    $id = $_POST['signup-ID'];
    $password = $_POST['signup-password'];
    $name = $_POST['signup-name'];
    $birth = $_POST['signup-birth'];
    $gender = $_POST['signup-gender'];
    $email = $_POST['signup-email'];
    $number = $_POST['signup-number'];
    $company = $_POST['signup-company'];


    $sql = "insert into signup (id, password, name, birth, gender, email, phone, company) values ('$id', '$password', '$name', '$birth', '$gender', '$email', '$number', '$company')";

    $result = $conn->query($sql);

    if ($result === false) {
        echo mysqli_error($conn);   
    } else {
        echo "<script>alert('회원가입 완료');</script>";
        echo "<script>window.location.replace('login.html');</script>";
    }
?>