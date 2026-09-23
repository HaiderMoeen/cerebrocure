export default async function handler(req: any, res: any) {
  // CORS & Method Check
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, position, institute, message } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required fields.' });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Log for serverless logs when env var is missing during setup
      console.warn('RESEND_API_KEY environment variable is not configured on Vercel.');
      return res.status(500).json({
        error: 'Email service key missing. Please configure RESEND_API_KEY in Vercel settings.',
      });
    }

    // Call Resend API via native fetch (no extra npm dependencies required)
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.SENDER_EMAIL || 'Cerebrocure Contact Form <onboarding@resend.dev>',
        to: ['contact@cerebrocure.ai'],
        reply_to: email,
        subject: `New Contact Request from ${name}${institute ? ` (${institute})` : ''}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
            <h2 style="color: #ee4f7f; border-bottom: 2px solid #ee4f7f; padding-bottom: 8px;">New Contact Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Position:</strong> ${position || 'Not provided'}</p>
            <p><strong>Institute / Hospital:</strong> ${institute || 'Not provided'}</p>
            <div style="background: #f9f9f9; padding: 16px; border-left: 4px solid #ee4f7f; margin-top: 16px; border-radius: 4px;">
              <p style="margin: 0; font-weight: bold;">Message:</p>
              <p style="margin-top: 8px; white-space: pre-wrap;">${message || 'No message provided.'}</p>
            </div>
          </div>
        `,
      }),
    });

    const data = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error('Resend API error:', data);
      return res.status(emailResponse.status).json({ error: data.message || 'Failed to dispatch email.' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err: any) {
    console.error('Server error dispatching contact form email:', err);
    return res.status(500).json({ error: 'Internal server error while sending email.' });
  }
}
