export default (CommitteeData) => {
  return `<html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'Montserrat', sans-serif; background-color: #f2f9f9; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <div style="background-color: #074F9C; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">📬 New Committee Member From ICAEBMS-2026</h1>
          <p style="color: #e8f5f2;">You have received a new committee member submission!</p>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 16px; color: #333;">Here are the details:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Title:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Title}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>First Name:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.First_Name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Email:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Email} 📧</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Contact Number:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Number} 📞</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Country:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Country}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Member Category:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Member_Category}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Organization:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Organization}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Department:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Department}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Qualification:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Qualification}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Professional Experience:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Professional_Experience}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Industry Experience:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Industry_Experience}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Specialization:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Specialization}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Associated with CERADA:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Associated_Cerada}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>H-Index:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.h_index}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Publications:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Publication}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>SCI Published:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.SCI_Published}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Journals:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Journals}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Conference Info:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${CommitteeData.Conference_Info}</td>
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
