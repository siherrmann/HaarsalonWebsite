<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $lastname = $_POST['lastname'];

  if (strlen($lastname)>0) {
    http_response_code(403); #403=forbidden
    echo "There was a problem with your submission, please try again.";
    exit;
  } else {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    if (strpos($email, '@') == false) {
      http_response_code(403); #403=forbidden
      echo "You have to put in a valid eamil address.";
      exit;
    }
    if (strlen($message)<10) {
      http_response_code(403); #403=forbidden
      echo "Do you really want to send me such a short message?";
      exit;
    }

    $mail_to = "contact@erikbent.de";

    $success = mail($mail_to, "$subject - Nachricht von $name", $message, "From: $email");
    if ($success) {
        http_response_code(200); #200=okay
        echo "Thank you for contacting us, $name. We will try to reply within 24 hours.";
    } else {
        http_response_code(500); #500=internal server error
        echo "We are sorry but the email did not go through.";
        exit;
    }

    $subjectResponse = 'Your message to Erik Bent';
    $messageResponse = 'Thank you for your message, we will get back to you as soon as possible.';
    // für HTML-E-Mails muss der 'Content-type'-Header gesetzt werden
    $headerResponse[] = 'MIME-Version: 1.0';
    $headerResponse[] = 'Content-type: text/plain; charset=utf-8';
    $headerResponse[] = 'To: $email';
    $headerResponse[] = 'From: Simon <contact@erikbent.de>';

    mail($email, $subjectResponse, $messageResponse, implode("\r\n", $headerResponse));
  }
} else {
  http_response_code(403); #403=forbidden
  echo "There was a problem with your submission, please try again.";
}
?>
