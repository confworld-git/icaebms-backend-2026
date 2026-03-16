export default (ContactData) => {
  return `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Montserrat', sans-serif; background-color: #f4f7fc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15); overflow: hidden;">
    <div style="background-color: #004aad; padding: 25px; text-align: center;">
      <h2 style="color: white; margin: 0; font-size: 22px;">📩 New Contact Form Submission</h2>
      <p style="color: #d4e6ff; font-size: 14px;">You have received a new message!</p>
    </div>
    <div style="padding: 25px;">
      <p style="font-size: 16px; color: #333; margin-bottom: 15px;">Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; background: #f8faff;"><strong>First Name:</strong></td>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">${ContactData.First_Name}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; background: #f8faff;"><strong>Last Name:</strong></td>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">${ContactData.Last_Name}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; background: #f8faff;"><strong>Email:</strong></td>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">${ContactData.Email} 📧</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; background: #f8faff;"><strong>Contact Number:</strong></td>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">${ContactData.Contact_Number} 📞</td>
        </tr>
        <tr>
          <td style="padding: 12px; background: #f8faff;"><strong>Message:</strong></td>
          <td style="padding: 12px; font-style: italic;">"${ContactData.Message}"</td>
        </tr>
      </table>
    </div>
    <div style="background-color: #004aad; padding: 15px; text-align: center;">
      <p style="color: white; margin: 0; font-size: 14px;">Best regards,<br><strong>Confworld Educational Research and Development Association (CERADA)</strong></p>
    </div>
  </div>
</body>
</html>
`;
};
