import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests for submission
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { 
      fullName, 
      mobile, 
      dob, 
      tob, 
      birthPlace, 
      currentCity, 
      concern, 
      mood 
    } = req.body;

    // Validate required fields (only fullName is truly required in frontend)
    if (!fullName) {
      return res.status(400).json({ message: 'Missing required field: fullName' });
    }

    // Configure the Nodemailer transporter
    // It uses environment variables EMAIL_USER and EMAIL_PASS
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this if you use another provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Formatting the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'inayansingh@gmail.com', // The destination email address requested
      subject: `New Preksha Submission: ${fullName}`,
      html: `
        <h2>New Seeker Submission - Preksha</h2>
        <p>A new user has submitted their details for a spiritual reading.</p>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="background-color: #f4f4f4; font-weight: bold; width: 35%;">Full Name</td>
            <td>${fullName || 'N/A'}</td>
          </tr>
          <tr>
            <td style="background-color: #f4f4f4; font-weight: bold;">Mobile</td>
            <td>${mobile || 'N/A'}</td>
          </tr>
          <tr>
            <td style="background-color: #f4f4f4; font-weight: bold;">Date of Birth</td>
            <td>${dob || 'N/A'}</td>
          </tr>
          <tr>
            <td style="background-color: #f4f4f4; font-weight: bold;">Time of Birth</td>
            <td>${tob || 'N/A'}</td>
          </tr>
          <tr>
            <td style="background-color: #f4f4f4; font-weight: bold;">Place of Birth</td>
            <td>${birthPlace || 'N/A'}</td>
          </tr>
          <tr>
            <td style="background-color: #f4f4f4; font-weight: bold;">Current City</td>
            <td>${currentCity || 'N/A'}</td>
          </tr>
          <tr>
            <td style="background-color: #f4f4f4; font-weight: bold;">Primary Concern</td>
            <td>${concern || 'N/A'}</td>
          </tr>
          <tr>
            <td style="background-color: #f4f4f4; font-weight: bold;">Current Mood</td>
            <td>${mood || 'N/A'}</td>
          </tr>
        </table>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">This automated email was sent from the Preksha application.</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Submission received and email sent successfully.' });
  } catch (error) {
    console.error('Error sending email submission:', error);
    return res.status(500).json({ message: 'Error processing submission', error: error.message });
  }
}
