import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DonationsRepository {

  constructor(
    @InjectRepository(Donation)
    private readonly donationsRepository: Repository<Donation>,
  ) {}

  async createDonation(donationData: Partial<Donation>) {
    try {
      const newDonation = this.donationsRepository.create(donationData);
      return await this.donationsRepository.save(newDonation);     
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error creating donation');
    }
  }
  
  async getDonations() {
    try {
      return await this.donationsRepository.find({
        relations: ['project', 'user'], 
      });    
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching donations');
    }
  }
  
  async getDonationById(id: string) {
    try {
      return await this.donationsRepository.findOne({ 
        where: { id },
        relations: ['project', 'user'], 
      });    
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error fetching donation');
    }
  }

  async updateDonation(id: string, updateDonationDto: UpdateDonationDto) {
    try {
      await this.donationsRepository.update(id, updateDonationDto);
      return await this.donationsRepository.findOne({ where: { id } });     
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error updating donation');
    }
  }

  async deleteDonation(id: string) {
    try {
      await this.donationsRepository.delete(id); 
      return { message: 'Donation deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error deleting donation');
    }
  }
}
