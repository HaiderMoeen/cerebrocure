<?php
/**
 * Contact form endpoint for Apache + PHP hosting (Namecheap).
 *
 * Contract (matches src/components/home/ContactCard.tsx):
 *   OPTIONS            -> 200
 *   non-POST           -> 405 {error}
 *   missing/invalid    -> 400 {error}
 *   success            -> 200 {success: true, id}
 *   failure            -> 4xx/5xx {error}
 *
 * Secrets live outside the web root in cerebrocure-config.php
 * (see cerebrocure-config.example.php in the repo).
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? '';

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($method !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, ['error' => 'Method Not Allowed']);
}

// Load config from outside the web root. Never echo or log its values.
$configPath = dirname($_SERVER['DOCUMENT_ROOT'] ?? '') . '/cerebrocure-config.php';
if (!is_file($configPath) || !is_readable($configPath)) {
    respond(500, ['error' => 'Server not configured']);
}
require $configPath;

if (!defined('RESEND_API_KEY') || !is_string(RESEND_API_KEY) || RESEND_API_KEY === '') {
    respond(500, ['error' => 'Server not configured']);
}

if (!function_exists('curl_init')) {
    respond(500, ['error' => 'Server not configured']);
}

$sender = (defined('SENDER_EMAIL') && is_string(SENDER_EMAIL) && SENDER_EMAIL !== '')
    ? SENDER_EMAIL
    : 'Cerebrocure Website <noreply@cerebrocure.ai>';
$recipient = (defined('RECIPIENT_EMAIL') && is_string(RECIPIENT_EMAIL) && RECIPIENT_EMAIL !== '')
    ? RECIPIENT_EMAIL
    : 'contact@cerebrocure.ai';

// Accept JSON (what ContactCard sends) or a regular form post.
$input = [];
$raw = file_get_contents('php://input', false, null, 0, 65536);
if (is_string($raw) && $raw !== '') {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $input = $decoded;
    }
}
if (!$input && !empty($_POST)) {
    $input = $_POST;
}

function field(array $input, string $key, int $maxLen): string
{
    $value = $input[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }
    $value = trim($value);
    return function_exists('mb_substr') ? mb_substr($value, 0, $maxLen, 'UTF-8') : substr($value, 0, $maxLen);
}

// Honeypot: real users never see or fill this field. Pretend success for bots.
if (field($input, 'website', 500) !== '') {
    respond(200, ['success' => true, 'id' => null]);
}

$name      = field($input, 'name', 200);
$email     = field($input, 'email', 254);
$position  = field($input, 'position', 200);
$institute = field($input, 'institute', 200);
$message   = field($input, 'message', 5000);

if ($name === '' || $email === '') {
    respond(400, ['error' => 'Name and email are required fields.']);
}

if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(400, ['error' => 'Please enter a valid email address.']);
}

function esc(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML5, 'UTF-8');
}

// Subject is plain text; strip line breaks so nothing odd ends up in it.
$subjectName = preg_replace('/[\r\n]+/', ' ', $name);
$subjectInst = preg_replace('/[\r\n]+/', ' ', $institute);
$subject = 'New Contact Request from ' . $subjectName . ($subjectInst !== '' ? ' (' . $subjectInst . ')' : '');

$html = '
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
    <h2 style="color: #ee4f7f; border-bottom: 2px solid #ee4f7f; padding-bottom: 8px;">New Contact Request</h2>
    <p><strong>Name:</strong> ' . esc($name) . '</p>
    <p><strong>Email:</strong> <a href="mailto:' . esc($email) . '">' . esc($email) . '</a></p>
    <p><strong>Position:</strong> ' . ($position !== '' ? esc($position) : 'Not provided') . '</p>
    <p><strong>Institute / Hospital:</strong> ' . ($institute !== '' ? esc($institute) : 'Not provided') . '</p>
    <div style="background: #f9f9f9; padding: 16px; border-left: 4px solid #ee4f7f; margin-top: 16px; border-radius: 4px;">
      <p style="margin: 0; font-weight: bold;">Message:</p>
      <p style="margin-top: 8px; white-space: pre-wrap;">' . ($message !== '' ? esc($message) : 'No message provided.') . '</p>
    </div>
  </div>
';

$payload = json_encode([
    'from'     => $sender,
    'to'       => [$recipient],
    'reply_to' => $email,
    'subject'  => $subject,
    'html'     => $html,
]);

if ($payload === false) {
    respond(400, ['error' => 'Invalid characters in submission.']);
}

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT        => 20,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . RESEND_API_KEY,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS     => $payload,
]);

$responseBody = curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($responseBody === false || $status < 200 || $status >= 300) {
    // Log only the status code — never the key, config, or request body.
    error_log('contact.php: email provider request failed (HTTP ' . $status . ')');
    respond(502, ['error' => 'Unable to send your message right now. Please try again later.']);
}

$data = json_decode($responseBody, true);
$id = (is_array($data) && isset($data['id']) && is_string($data['id'])) ? $data['id'] : null;

respond(200, ['success' => true, 'id' => $id]);
