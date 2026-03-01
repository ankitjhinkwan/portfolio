// ===== PORTFOLIO BACKEND - server.js =====
// Stack: Node.js + Express + Nodemailer
// Purpose: Serve portfolio frontend + handle contact form emails

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(helmet({ contentSecurityPolicy: false })); // Security headers
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files (your portfolio frontend)
app.use(express.static(path.join(__dirname, '../public')));

// ===== RATE LIMITING (protect contact form from spam) =====
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // max 5 requests per 15 min per IP
    message: { success: false, message: 'Too many messages sent. Please wait 15 minutes and try again.' },
    standardHeaders: true,
    legacyHeaders: false
});

// ===== NODEMAILER TRANSPORTER =====
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,   // your Gmail: ankitjhinkwan9@gmail.com
        pass: process.env.EMAIL_PASS    // your Gmail App Password (16-char)
    }
});

// Verify transporter on startup
transporter.verify((err) => {
    if (err) {
        console.error('❌ Email transporter error:', err.message);
        console.log('⚠️  Check your EMAIL_USER and EMAIL_PASS in .env file');
    } else {
        console.log('✅ Email transporter ready');
    }
});

// ===== INPUT VALIDATOR =====
function validateContactInput({ name, email, subject, message }) {
    const errors = [];
    if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Invalid email address.');
    if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters.');
    return errors;
}

// ===== CONTACT API ROUTE =====
app.post('/api/contact', contactLimiter, async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate input
    const errors = validateContactInput({ name, email, subject, message });
    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: errors[0] });
    }

    // Sanitize inputs
    const safeName = name.trim().substring(0, 100);
    const safeEmail = email.trim().toLowerCase().substring(0, 200);
    const safeSubject = (subject || 'Portfolio Contact').trim().substring(0, 200);
    const safeMessage = message.trim().substring(0, 5000);

    // ---- EMAIL TO YOU (notification) ----
    const toOwnerMail = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // sends to ankitjhinkwan9@gmail.com
        replyTo: safeEmail,
        subject: `📬 New Message: ${safeSubject}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #f1f5f9; margin: 0; padding: 20px; }
    .card { background: white; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #13d0d0, #10b981); padding: 30px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 1.5rem; }
    .body { padding: 30px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px; margin-bottom: 4px; }
    .value { font-size: 1rem; color: #1e293b; line-height: 1.6; }
    .message-box { background: #f8fafc; border-left: 4px solid #13d0d0; padding: 15px; border-radius: 0 8px 8px 0; }
    .footer { background: #f8fafc; padding: 20px 30px; text-align: center; color: #94a3b8; font-size: 0.85rem; border-top: 1px solid #e2e8f0; }
    .reply-btn { display: inline-block; background: linear-gradient(135deg, #13d0d0, #10b981); color: white; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 600; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header"><h1>📬 New Portfolio Message</h1></div>
    <div class="body">
      <div class="field"><div class="label">From</div><div class="value">${safeName}</div></div>
      <div class="field"><div class="label">Email</div><div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div></div>
      <div class="field"><div class="label">Subject</div><div class="value">${safeSubject}</div></div>
      <div class="field"><div class="label">Message</div><div class="message-box value">${safeMessage.replace(/\n/g, '<br>')}</div></div>
      <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(safeSubject)}" class="reply-btn">↩ Reply to ${safeName}</a>
    </div>
    <div class="footer">
      Received ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
      · From: ankitjinkwan.portfolio.com
    </div>
  </div>
</body>
</html>`
    };

    // ---- AUTO-REPLY TO SENDER ----
    const toSenderMail = {
        from: `"Ankit Jinkwan" <${process.env.EMAIL_USER}>`,
        to: safeEmail,
        subject: `✅ Got your message, ${safeName}! — Ankit Jinkwan`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #f1f5f9; margin: 0; padding: 20px; }
    .card { background: white; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #13d0d0, #10b981); padding: 40px 30px; text-align: center; }
    .header h1 { color: white; margin: 0 0 8px; font-size: 1.6rem; }
    .header p { color: rgba(255,255,255,0.85); margin: 0; }
    .body { padding: 35px 30px; }
    .body p { color: #475569; line-height: 1.8; margin-bottom: 15px; }
    .highlight { background: linear-gradient(135deg, #f0fdfc, #ecfdf5); border-radius: 12px; padding: 20px; margin: 20px 0; }
    .highlight strong { color: #0f172a; }
    .footer { background: #f8fafc; padding: 20px 30px; text-align: center; color: #94a3b8; font-size: 0.85rem; border-top: 1px solid #e2e8f0; }
    .social { display: inline-block; margin: 0 8px; color: #13d0d0; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Thanks for reaching out, ${safeName}! 🙌</h1>
      <p>I've received your message and will get back to you soon.</p>
    </div>
    <div class="body">
      <p>Hi <strong>${safeName}</strong>,</p>
      <p>Thank you for contacting me through my portfolio! I've received your message and will review it shortly.</p>
      <div class="highlight">
        <strong>Your message:</strong><br><br>
        <em style="color: #475569;">"${safeMessage.substring(0, 200)}${safeMessage.length > 200 ? '...' : ''}"</em>
      </div>
      <p>I typically respond within <strong>24 hours</strong> on business days. If it's urgent, you can also reach me at:</p>
      <p>📞 <strong>+91 9528693191</strong><br>📧 <strong>ankitjhinkwan9@gmail.com</strong></p>
      <p>Looking forward to connecting with you!</p>
      <p>Best regards,<br><strong>Ankit Jinkwan</strong><br><em>Full Stack Developer · Uttarakhand, India</em></p>
    </div>
    <div class="footer">
      <a href="#" class="social">LinkedIn</a> ·
      <a href="#" class="social">GitHub</a> ·
      <a href="#" class="social">Portfolio</a>
      <br><br>© 2025 Ankit Jinkwan. All rights reserved.
    </div>
  </div>
</body>
</html>`
    };

    try {
        // Send both emails concurrently
        await Promise.all([
            transporter.sendMail(toOwnerMail),
            transporter.sendMail(toSenderMail)
        ]);

        console.log(`✅ Contact form: email from ${safeEmail} processed at ${new Date().toISOString()}`);
        return res.status(200).json({ success: true, message: 'Message sent successfully!' });

    } catch (err) {
        console.error('❌ Email send error:', err.message);
        return res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' });
    }
});

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ===== CATCH-ALL: Serve frontend =====
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ===== 404 & ERROR HANDLERS =====
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`\n🚀 Portfolio server running at http://localhost:${PORT}`);
    console.log(`📁 Serving frontend from /public`);
    console.log(`📬 Contact API: POST /api/contact\n`);
});