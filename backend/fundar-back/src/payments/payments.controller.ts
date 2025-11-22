import { Controller, Post, Body, InternalServerErrorException, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiOperation, ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-session')
  @ApiOperation({ summary: 'Create Stripe payment session' })
  @ApiBody({
    schema: {
      example: {
        amount: 50,
        userId: 'user-uuid',
        projectId: 'project-uuid'
      },
      properties: {
        amount: { type: 'number', description: 'Amount to pay (in USD)' },
        userId: { type: 'string', description: 'User ID (UUID)' },
        projectId: { type: 'string', description: 'Project ID (UUID)' }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Stripe Checkout session created',
    schema: {
      example: {
        url: 'https://checkout.stripe.com/pay/cs_test_1234567890',
        amount: 50
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createSession(
      @Body() body: { amount: number; userId: string; projectId: string },
    @Req() req,
  ) {
    try {
      if (req.user.role !== 'admin' && req.user.id !== body.userId) {
        throw new UnauthorizedException('You can only create a payment session for your own user');
      }
      const url = await this.paymentsService.createSession(
        body.amount,
        body.userId,
        body.projectId,
      );
      return { url, amount: body.amount };   
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error creating payment session');

    }
  }
}