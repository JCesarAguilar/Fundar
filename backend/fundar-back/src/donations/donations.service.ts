import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { DonationsRepository } from './donations.repository';
import { EmailService } from 'src/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { Donation } from './entities/donation.entity';
import * as dotenv from 'dotenv';
import { catchError } from 'rxjs';
dotenv.config();

@Injectable()
export class DonationsService {
  constructor(
    private donationsRepository: DonationsRepository,
    private emailService: EmailService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {}

  async createDonation(createDonationDto: CreateDonationDto) {
    try{

    const user = await this.userRepository.findOne({ where: { id: createDonationDto.userId } });
    if (!user) throw new Error('User does not exist');

    let project: Project | undefined = undefined;
    if (createDonationDto.projectId) {
      const foundProject = await this.projectRepository.findOne({ where: { id: createDonationDto.projectId } });
      if (!foundProject) throw new Error('Project does not exist');
      project = foundProject;
    }

    if (
      project &&
      typeof project.currentAmount === 'number' &&
      typeof project.goalAmount === 'number' &&
      project.currentAmount + createDonationDto.amount > project.goalAmount
    ) {
      throw new Error('Project goal reached, no more donations allowed');
    }

    const { userId, projectId, ...rest } = createDonationDto;
    const donationData: Partial<Donation> = {
      ...rest,
      user,
      project,
    };

    const donation = await this.donationsRepository.createDonation(donationData);

   if (project) {
      project.currentAmount += donation.amount;

      if (project.currentAmount >= project.goalAmount && project.status !== 'completed') {
        project.status = 'completed';
        await this.projectRepository.save(project);

        const adminEmail =  process.env.ADMIN_EMAIL || '';
        await this.emailService.sendMail(
          adminEmail,
          'Project Completed!',
          `The project "${project.title}" has reached its goal of $${project.goalAmount} and is now completed.`
        );
      } else {
        await this.projectRepository.save(project);
      }
    }

    if (user?.email) {
      const fullName = `${user.firstName} ${user.lastName}`;
      const projectName = project ? project.title : 'General Fund';
      const formattedDate = new Date(donation.date).toLocaleDateString('en-US');
      await this.emailService.sendMail(
        user.email,
        'Thank you for your donation!',
        `Dear ${fullName},

         Thank you for your generous donation!

         Donation Details:
         - Donation ID: ${donation.id}
         - Amount: $${donation.amount}
         - Project: ${projectName}
         - Date: ${formattedDate}
         - Payment Method: ${donation.paymentMethod}

         Your support helps us continue our mission and make a real difference.

         If you have any questions, feel free to contact us.

         Best regards,
         The Fundar Team`
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || '';
    await this.emailService.sendMail(
      adminEmail,
      'New Donation Received',
      `A new donation has been made:\n
       Donor: ${user.firstName} ${user.lastName} (${user.email})
       Amount: $${donation.amount}
       Project: ${project ? project.title : 'General Fund'}
       Date: ${donation.date}`
    );

    return donation;
  } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'Error creating donation');
  }
}

  async GetDonations() {
    try {
      return await this.donationsRepository.getDonations();     
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching donations');
    }
  }

  async getDonationById(id: string) {
    try {
      return await this.donationsRepository.getDonationById(id);      
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching donation');
    }
  }

  async updateDonation(id: string, updateDonationDto: UpdateDonationDto) {
    try {
      return await this.donationsRepository.updateDonation(id, updateDonationDto);      
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error updating donation');
    }
  }

  async deleteDonation(id: string) {
    try {
      return await this.donationsRepository.deleteDonation(id);     
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error deleting donation');
    }
  }
}