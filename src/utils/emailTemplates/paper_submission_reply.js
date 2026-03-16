export default (submissionData) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Submission Acknowledgment</title>
</head>
<body style="font-family: 'Arial', sans-serif; background: #f4f4f4; display: flex; justify-content: center; align-items: center; min-height: 100vh; color: #333;">

<div style="max-width: 600px; width: 100%; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
    
    <!-- Header Section -->
    <div style="background: linear-gradient(135deg, #4caf50, #388e3c); color: white; padding: 25px; text-align: center;">
        <h2 style="margin: 0; font-size: 24px;">Submission Acknowledgment</h2>
    </div>
    
    <!-- Body Section -->
    <div style="padding: 30px; text-align: center;">
        <div style="border-radius: 50%; background-color: #4caf50; color: white; width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; font-size: 28px; margin: 0 auto 20px;">
            ✨
        </div>
        <h1 style="color: #333; font-size: 26px; font-weight: bold;">Thank You for Your Submission!</h1>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            Dear Participant,
        </p>
        
        <p style="color: #444; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            We appreciate your submission for <strong style="color: #4caf50;">ICAEBMS-2026</strong>! Your efforts and enthusiasm mean a lot to us. 🎉
        </p>

        <p style="font-size: 16px; color: #333; font-weight: 600; margin-bottom: 15px;">
            Submission ID: <span style="color: #4caf50;">${submissionData.SubmissionID}</span>
        </p>

        <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Our review team is currently processing your submission. Expect an update from us soon. 📆
        </p>

        <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 20px; color: #333; font-size: 14px;">
            <p style="margin: 0;">For any questions, feel free to contact us at <strong style="color: #2e7d32;">+91 8072381719</strong> or <strong style="color: #2e7d32;">info@cerada.in</strong>.</p>
        </div>
    </div>

    <!-- Footer Section -->
    <div style="background: #fafafa; padding: 15px; text-align: center; font-size: 14px; color: #777;">
        <p style="margin: 0;">Best Regards,<br><strong>The ICAEBMS-2026 Team</strong></p>
    </div>
</div>

</body>
</html>
`;
};
