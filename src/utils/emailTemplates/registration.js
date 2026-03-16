export default (RegistrationData) => {
  return `
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'Montserrat', sans-serif; background-color: #f2f9f9; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <div style="background-color: #074F9C; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">📬New Registration From ICAEBMS-2026</h1>
          <p style="color: #e8f5f2;">You have a new registration and payment confirmation!</p>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 16px; color: #333;">Here are the registration and payment details:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>First Name:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.first_name
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Last Name:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.last_name
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Email:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.email
              } 📧</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Mobile Number:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.number
              } 📞</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Certificate Name:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.certificate_name
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>DOB:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${new Date(
                RegistrationData.DOB
              ).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Nationality:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.nationality
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Institution:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.institution
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Department:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.department
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Participant Category:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.participant_category
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Presentation Category:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.presentation_Category
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Presentation Type:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.presentation_Type
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Terms and Conditions:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.Terms_and_Conditions
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Selected Fee:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.selectedFee
              } USD</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Razorpay Amount:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.Razorpay_amount / 100
              } ${RegistrationData.currency}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Receipt ID:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.receipt
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Order ID:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.id
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Payment Status:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                RegistrationData.status
              }</td>
            </tr>
          </table>
        </div>
        <div style="background-color: #074F9C; padding: 10px; text-align: center;">
          <p style="color: white; margin: 0;">Best regards,<br>The Confworld Educational Research and Development Association (CERADA)</p>
        </div>
      </div>
    </body>
  </html>`;
};
