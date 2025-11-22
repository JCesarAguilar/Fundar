import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async createSession(
    amount: number,
    userId: string,
    projectId: string,
  ): Promise<string> {
    try {
      return await this.paymentsRepository.createStripeSession(
      amount,
      userId,
      projectId,
    );
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error creating payment session');
    }
    }
}
