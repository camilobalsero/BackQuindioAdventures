// src/services/mailerService.ts
import transporter from "../config/mailer";
class mailerService {
    static async sendEmail(to: string, subject: string, text: string, html: string) {
      try {
        const info = await transporter.sendMail({
          from: '"Autenticacion exitosa 👻" <camilobalsero16@gmail.com>', // sender address
          to: to, // list of receivers
          subject: subject, // Subject line
          text: text, // plain text body
          html: html, // html body
        });
  
        console.log("Message sent: %s", info.messageId);
        return { status: 'Email sent successfully' };
      } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Error sending email");
      }
    }
  }
  
  export default mailerService;
