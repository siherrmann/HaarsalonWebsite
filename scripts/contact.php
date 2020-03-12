<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $lastname = $_POST['lastname'];

  if (strlen($lastname)>0) {
    http_response_code(403); #403=forbidden
    echo "Es gab ein internes Problem, bitte versuchen Sie es erneut.";
    exit;
  } else {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    if (strpos($email, '@') == false) {
      http_response_code(403); #403=forbidden
      echo "Sie müssen eine gültige Email-Adresse eingeben.";
      exit;
    }
    if (strlen($message)<10) {
      http_response_code(403); #403=forbidden
      echo "Bitte schreiben Sie eine etwas längere Nachricht.";
      exit;
    }

    $mail_to = "kontakt@friseurmila.de";

    $headerResponse[] = 'MIME-Version: 1.0';
    $headerResponse[] = 'Content-type: text/plain; charset=utf-8';
    $headerResponse[] = 'To: $mail_to';
    $headerResponse[] = 'From: $email';

    $success = mail($mail_to, "$subject - Nachricht von $name", $message, "From: $email", implode("\r\n", $headerResponse));
    if ($success) {
        http_response_code(200); #200=okay
        echo "Danke für Ihre Kontaktaufnahme, $name. Ich werde mich so schnell wie möglich bei Ihnen melden.";
    } else {
        http_response_code(500); #500=internal server error
        echo "Es tut mir leid, aber Ihre Email wurde leider nicht gesendet.";
        exit;
    }

    $subjectResponse = 'Ihre Nachricht an Michaela Lachenmaier';
    $messageResponse = 'Danke für Ihre Nachricht, ich werde mich so schnell wie möglich bei Ihnen melden.';
    // für HTML-E-Mails muss der 'Content-type'-Header gesetzt werden
    $headerResponse[] = 'MIME-Version: 1.0';
    $headerResponse[] = 'Content-type: text/plain; charset=utf-8';
    $headerResponse[] = 'To: $email';
    $headerResponse[] = 'From: Michaela Lachenmaier <kontakt@friseurmila.de>';

    mail($email, $subjectResponse, $messageResponse, implode("\r\n", $headerResponse));
  }
} else {
  http_response_code(403); #403=forbidden
  echo "Es gab ein internes Problem, bitte versuchen Sie es erneut.";
}
?>
