import nodemailer from 'nodemailer'

export const sendEmail = async (text: string, buffer: Buffer) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO, 
    subject: "NEW VOICEMAIL",
    text, 
    attachments: [
      {
        filename: 'voicemail.wav',
        content: buffer
      }
    ]
  });

  console.log("Message sent: %s", info.messageId);
}
