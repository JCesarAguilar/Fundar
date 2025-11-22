import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { ApiTags, ApiBody, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Donation } from './entities/donation.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';

@ApiTags('donations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  @ApiBody({
    description: 'Create a new donation',
    type: CreateDonationDto,
    examples: {
      example1: {
        summary: 'Basic donation',
        value: {
          amount: 500,
          date: "2025-11-01",
          paymentMethod: "credit_card",
          userId: "83191d4c-3529-4d2e-8663-2d0bb55acbb2",
          projectId: "c896fef0-e647-4273-8891-1a50e7fc57ed"
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Donation created successfully', type: Donation })
  async createDonation(@Body() createDonationDto: CreateDonationDto) {
    try {
      return await this.donationsService.createDonation(createDonationDto);     
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error creating donation');
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List all donations', type: [Donation] })
  async getDonations(@Req() req) {
    try {
        if (req.user.role !== 'admin') {
         throw new UnauthorizedException('Only admin can view all donations');
       }
      return await this.donationsService.GetDonations();   
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching donations');
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Donation ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Get donation by ID', type: Donation })
  async getDonationById(@Param('id') id: string, @Req() req) {
    try {  
      const donation = await this.donationsService.getDonationById(id);
      if (
      req.user.role !== 'admin' &&
      donation?.user?.id !== req.user.id
      ) {
        throw new UnauthorizedException('You can only view your own donations');
        }
      return donation;    
    } catch (error) {
        if (error instanceof NotFoundException) throw error;
        throw new InternalServerErrorException(error.message || 'Error fetching donation');
    }
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Donation ID (UUID)' })
  @ApiBody({ type: UpdateDonationDto })
  @ApiResponse({ status: 200, description: 'Donation updated successfully', type: Donation })
  async updateDonation(
    @Param('id') id: string,
    @Body() updateDonationDto: UpdateDonationDto,
    @Req() req,
  ) {
    try {
      const donation = await this.donationsService.getDonationById(id);
      if (req.user.role !== 'admin' && req.user.id !== donation?.user?.id) {
        throw new UnauthorizedException('You can only update your own donations');
      }

      return await this.donationsService.updateDonation(id, updateDonationDto);    
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error updating donation');
    }
  }

  @Delete(':id')
  @Roles('admin')
  @ApiParam({ name: 'id', description: 'Donation ID (UUID)' })
  @ApiResponse({ status: 204, description: 'Donation deleted successfully' })
  async deleteDonation(@Param('id') id: string) {
    try {
      return await this.donationsService.deleteDonation(id);     
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error deleting donation');
    }
  }
}