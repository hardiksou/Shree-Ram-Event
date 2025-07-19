const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.static('frontend'));

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint is working!' });
});

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Contact from ${name} - ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

 try {
  await transporter.sendMail(mailOptions);
  console.log('Email sent to:', process.env.EMAIL_USER);
  res.json({ success: true, message: 'Email sent successfully!' });
} catch (error) {
  console.error('Email error:', error.message);
  res.status(500).json({ success: false, message: 'Failed to send email.' });
}
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
