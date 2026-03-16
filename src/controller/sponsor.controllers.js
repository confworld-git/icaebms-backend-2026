import Sponsor from "../Schema/sponsor.schema.js";
import nodemailer from "nodemailer";

const sendEmailToAdmin = async (subject, htmlContent) => {
  try {
    // Check if required environment variables exist
    if (!process.env.SMTP_USER_INFO || !process.env.SMTP_PASS_INFO || !process.env.EMAIL_ADMIN_INFO) {
      console.log('SMTP_USER_INFO:', process.env.SMTP_USER_INFO);
      console.log('SMTP_PASS_INFO exists:', !!process.env.SMTP_PASS_INFO);
      console.log('EMAIL_ADMIN_INFO:', process.env.EMAIL_ADMIN_INFO);
      throw new Error('Missing required email environment variables');
    }

    // Clean the password by removing all whitespace and potential comments
    const cleanPassword = process.env.SMTP_PASS_INFO.trim().split('#')[0].replace(/\s/g, '');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER_INFO.trim(),
        pass: cleanPassword,
      },
    });

    const result = await transporter.sendMail({
      from: process.env.SMTP_USER_INFO.trim(),
      to: process.env.EMAIL_ADMIN_INFO.trim(),
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", result.messageId);
    return result;
  } catch (error) {
    console.error("Email error:", error.message);
    throw error;
  }
};

export const sponsor_Create = async (req, res) => {
  try {
    const formData = req.body;
    console.log('Processing sponsor form:', formData);

    // Check for duplicate sponsor by email
    const sponsorExists = await Sponsor.findOne({ email: formData.email });
    if (sponsorExists) {
      return res
        .status(400)
        .json({ errorMessage: "Sponsor with this email already exists" });
    }

    // Create and save sponsor
    const newForm = new Sponsor(formData);
    const savedSponsor = await newForm.save();
    console.log('Sponsor saved to database:', savedSponsor._id);

    // Build email content
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sponsorship Form</title>
    <style>
        body {
            font-family: "Poppins", sans-serif;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #00C4AC;
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: center;
        }
        .highlight {
            background: #00C4AC;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            display: inline-block;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .info {
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .info label {
            font-weight: bold;
        }
        .info p {
            margin: 0px 8px;
        }
        .footer {
            font-size: 12px;
            color: #888;
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>
          <svg width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2 1v1.293l6 3.5 6-3.5V5H2zm0 2.207L8 11.207l6-3.5V11H2v-3.793z"/>
          </svg>
          Sponsorship Form
        </h1>

        <div class="highlight">Tier: ${formData.sponsorshipType || 'N/A'} | Price: ${formData.sponsorshipPrice || 'N/A'}</div>

        <div class="info"><label>Full Name:</label><p>${formData.fullName}</p></div>
        <div class="info"><label>Email:</label><p>${formData.email}</p></div>
        <div class="info"><label>Organization:</label><p>${formData.organization}</p></div>
        <div class="info"><label>Designation:</label><p>${formData.designation}</p></div>
        <div class="info"><label>Address:</label><p>${formData.address}</p></div>
        <div class="info"><label>City:</label><p>${formData.city}</p></div>
        <div class="info"><label>State:</label><p>${formData.state}</p></div>
        <div class="info"><label>Zip Code:</label><p>${formData.zipCode}</p></div>
        <div class="info"><label>Country:</label><p>${formData.country}</p></div>
        <div class="info"><label>Phone:</label><p>${formData.phone}</p></div>

        <div class="footer">
            <p>This email was generated as part of a sponsorship form submission.</p>
        </div>
    </div>
</body>
</html>`;

    // Try to send email and handle errors
    try {
      console.log('Attempting to send sponsor email...');
      await sendEmailToAdmin("Sponsor Details", htmlContent);
      console.log('Sponsor email sent successfully');
      
      res.status(201).json({
        message: "Sponsor Details saved successfully and email sent",
        sponsor: savedSponsor,
        emailSent: true
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      
      // Still return success for the sponsor save, but indicate email failed
      res.status(201).json({
        message: "Sponsor Details saved successfully but email failed to send",
        sponsor: savedSponsor,
        emailSent: false,
        emailError: emailError.message
      });
    }

  } catch (err) {
    console.error("Sponsor Save Error:", err);
    res
      .status(500)
      .json({ errorMessage: err.message || "Internal Server Error" });
  }
};