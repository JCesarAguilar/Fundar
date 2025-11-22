import { ApiProperty } from '@nestjs/swagger';

export class CreateDonationDto {
  @ApiProperty({ example: 500, description: 'Amount donated (USD)' })
  amount: number;

  @ApiProperty({ example: '2025-11-01T12:00:00.000Z', description: 'Date and time of the donation (ISO format)' })
  date: Date;

  @ApiProperty({ example: 'credit_card', description: 'Payment method used for the donation' })
  paymentMethod: string;

  @ApiProperty({ example: '83191d4c-3529-4d2e-8663-2d0bb55acbb2', description: 'User ID (UUID) who made the donation' })
  userId: string;

  @ApiProperty({ example: 'c896fef0-e647-4273-8891-1a50e7fc57ed', description: 'Project ID (UUID) that receives the donation', required: false })
  projectId?: string;
}