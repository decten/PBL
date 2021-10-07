<?php
    session_start();

    $conn = mysqli_connect("15.164.219.223", "pbl", "pbl", "pbl") or die ("connect fail");

    $signin_id = $_POST['signin-ID'];
    $signin_password = $_POST['signin-password'];

    $query = "select id, password from signup where id = '$signin_id'";
    $result = $conn ->query($query);

    if(mysqli_num_rows($result)==1){
        $row = mysqli_fetch_assoc($result);

        if($row['password'] == $signin_password){
            if(isset($_SESSION['sessionid'])){
                echo "<script>alert('로그인 성공!');</script>";
                echo "<script>window.location.replace('index.html');</script>";
            } else{
                echo "<script>alert('로그인 실패!');</script>";
                echo "<script>window.location.replace('login.html');</script>";
            }
        }else {
            echo "<script>alert('아이디 혹은 비밀번호가 잘못 입력되었습니다.');</script>";
            echo "<script>window.location.replace('login.html');</script>";
        }
    }else {
        echo "<script>alert('존재하지 않는 계정입니다. 회원가입해주세요.');</script>";
        echo "<script>window.location.replace('signup.html');</script>";
    }


?>