<?php
    session_start();

    //ip는 매번 aws 실행할 때마다 변경해줘야함.
    $conn = mysqli_connect("3.35.22.78", "pbl", "pbl", "pbl") or die ("connect fail");

    $signin_id = $_POST['signin-ID'];
    $signin_password = $_POST['signin-password'];

    $query = "select id, password, identity from signup where id = '$signin_id'";
    $result = $conn ->query($query);

    if(mysqli_num_rows($result)==1){
        $row = mysqli_fetch_assoc($result);
        if($row['password'] == $signin_password){
             if($row['identity']== "1"){
                echo "<script>window.location.replace('index_1.html');</script>";
             }else{
                echo "<script>window.location.replace('index.html');</script>";
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