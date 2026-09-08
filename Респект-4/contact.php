<?php

declare(strict_types=1);

const RECIPIENT_EMAIL = 'orespekt5@yandex.ru';
const SITE_NAME = 'ООО «Респект-4»';
const FROM_EMAIL = 'no-reply@l1-stroy.ru';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, string $message): void
{
    http_response_code($status);
    echo json_encode(['message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function textField(array $data, string $key, int $maxLength): string
{
    $value = $data[$key] ?? '';

    if (!is_string($value)) {
        return '';
    }

    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', trim($value)) ?? '';

    return strlen($value) > $maxLength ? substr($value, 0, $maxLength) : $value;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, 'Метод не поддерживается.');
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 20000) {
    respond(413, 'Слишком большой запрос.');
}

$payload = json_decode((string) file_get_contents('php://input'), true);

if (!is_array($payload)) {
    respond(400, 'Некорректный запрос.');
}

// Скрытое поле формы: заполненное значение обычно означает автоматический спам.
if (textField($payload, 'website', 200) !== '') {
    respond(200, 'Обращение отправлено.');
}

$name = textField($payload, 'name', 100);
$phone = textField($payload, 'phone', 50);
$email = textField($payload, 'email', 254);
$message = textField($payload, 'message', 2000);

if ($name === '' || $phone === '') {
    respond(422, 'Укажите имя и телефон.');
}

if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(422, 'Укажите корректный e-mail.');
}

$body = [
    'Новое обращение с сайта ' . SITE_NAME,
    '',
    'Имя: ' . $name,
    'Телефон: ' . $phone,
    'E-mail: ' . ($email !== '' ? $email : 'не указан'),
    '',
    'Сообщение:',
    $message !== '' ? $message : 'не указано',
];

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ' . SITE_NAME . ' <' . FROM_EMAIL . '>',
];

if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

$subject = 'Новое обращение с сайта ' . SITE_NAME;
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$sent = mail(
    RECIPIENT_EMAIL,
    $encodedSubject,
    implode(PHP_EOL, $body),
    implode("\r\n", $headers),
);

if (!$sent) {
    respond(500, 'Не удалось отправить обращение.');
}

respond(200, 'Обращение отправлено.');
