export default (submissionData) => {
  return `
  <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
      </head>
      <body style="font-family: 'Montserrat', sans-serif; background-color: #f2f9f9; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <div style="background-color: #074F9C; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">📬 New Submission Received for ICAEBMS-2026</h1>
            <p style="color: #e8f5f2;">You have received a new submission!</p>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px; color: #333;">Here are the details:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Submission ID:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.SubmissionID}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Submission Type:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.Submission_type}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Paper Title:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.paper_title}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Author Name:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.authorName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Co-Author Name:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.CoAuthorName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Corresponding Email:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.correspondingEmail} 📧</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Mobile Number:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.mobileNumber} 📞</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>WhatsApp Number:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.whatsappNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>LinkedIn URL:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;"><a href="${submissionData.linkedinURL}" style="color: #00C4AC;">View Profile</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Facebook URL:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;"><a href="${submissionData.facebookURL}" style="color: #00C4AC;">View Profile</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Presentation Category:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.presentationCategory}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Presentation Type:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.presentationType}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Institution Name:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.Institution_Name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Department:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.Department}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Designation:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.designation}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Publication Required:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.Publication_Required}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Source of Information:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.conferenceSource}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Message:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${submissionData.message}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #074F9C; padding: 10px; text-align: center;">
            <p style="color: white; margin: 0;">Best regards,<br>The Confworld Educational Research and Development Association (CERADA)</p>
          </div>
        </div>
      </body>
    </html>
    `;
};
