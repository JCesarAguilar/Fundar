import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from '../email/email.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly emailService: EmailService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async sendDailyNotifications() {
    try {
      console.log('Daily notification cron executed');
      
    } catch (error) {
      console.error('Error sending daily notifications:', error.message);    }
  }
}