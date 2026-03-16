export default (DownloadData) => {
  return `
   <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
      </head>
      <body style="font-family: 'Montserrat', sans-serif; background-color: #f2f9f9; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <div style="background-color: #074F9C; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">📬 New Download From ICAEBMS-2026</h1>
            <p style="color: #e8f5f2;">You have received a new download!</p>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px; color: #333;">Here are the details:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Name:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${DownloadData.Name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Email:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${DownloadData.Email} 📧</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Contact Number:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${DownloadData.Number} 📞</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Link:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;"><a href="${DownloadData.Link}" style="color: #00C4AC; text-decoration: none;">${DownloadData.Link}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #e9fdf9;"><strong>Info:</strong></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${DownloadData.Info}</td>
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
