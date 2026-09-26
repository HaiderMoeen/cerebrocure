<?php
/**
 * Copy this file to cerebrocure-config.php and upload it ONE LEVEL ABOVE the
 * web root (e.g. /home/<cpanel-user>/cerebrocure-config.php, next to public_html/).
 * contact.php loads it from dirname($_SERVER['DOCUMENT_ROOT']).
 * Never commit the real file.
 */

define('RESEND_API_KEY', 're_your_resend_api_key_here');
define('SENDER_EMAIL', 'Cerebrocure Website <noreply@cerebrocure.ai>');
define('RECIPIENT_EMAIL', 'contact@cerebrocure.ai');
