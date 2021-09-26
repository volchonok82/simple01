<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';
require './PHPMailer/src/Exception.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', './PHPMailer/language');

// $mail->SMTPDebug = 1;                               // Enable verbose debug output

$mail->isSMTP();                                   // Set mailer to use SMTP
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Host = 'smtp.yandex.ru';  	
$mail->Username = 'moyakorzina3@yandex.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'DimYANDEX'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('moyakorzina3@yandex.ru'); // от кого будет уходить письмо?
$mail->addAddress('moyakorzina2@yandex.ru');     // Кому будет уходить письмо 
$mail->Subject = 'Тест отправки формы';// Тема письма
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML



// ================================
// Рука
// $hand = "Правая";
// if ($_POST['hand'] == "left") {
//     $hand = "Левая";
// }

// Тело письма
$body = '<h1>ТЕСТ!</h1>';

if (trim(!empty($_POST['name']))) {
    $body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
    $body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
}
// if (trim(!empty($_POST['hand']))) {
//     $body .= '<p><strong>Рука:</strong> ' . $hand . '</p>';
// }
// if (trim(!empty($_POST['age']))) {
//     $body .= '<p><strong>Возраст:</strong> ' . $_POST['age'] . '</p>';
// }
if (trim(!empty($_POST['message']))) {
    $body .= '<p><strong>Сообщение:</strong> ' . $_POST['message'] . '</p>';
}

// прикрепить файл
if (!empty($_FILES['image']['tmp_name'])) {
    // путь загрузки
    $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
    // Грузим файл
    if (copy($_FILES['image']['tmp_name'], $filePath)) {
        $fileAttach = $filePath;
        $body .= '<p><strong>Фото в приложении</strong></p>';
        $mail->addAttachment($fileAttach);
    }
}


// ========================
$mail->Body = $body;

// // отправляем
if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);
