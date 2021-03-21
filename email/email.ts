import nodemailer from 'nodemailer'

export const sendEmail = async ({ from, transcription, recording }:{from: string, transcription?: string, recording?: Buffer}) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

const text = `${transcription || "no audio"} from ${from}`
  const attachments = recording ? [
    {
      filename: 'voicemail.wav',
      content: recording
    }
  ] : [];
  
  const email = await transporter.sendMail({
    from: ` "☎️ ${from}" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO, 
    subject: `📼 NEW VOICEMAIL FROM ${from}`,
    text, 
    attachments
  });

  console.log("Message sent: %s", email.messageId);
}
