import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
     tls: {
      rejectUnauthorized: false, 
    },
  });

  async sendMail(to: string, subject: string, text: string) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.ADMIN_EMAIL, 
        to,
        subject,
        text,
      });
      console.log('Email enviado:', info.response);
      return info;
    } catch (error) {
      console.error('Error enviando email:', error);
      throw error;
    }
  }
}