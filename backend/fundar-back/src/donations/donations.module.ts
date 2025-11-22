import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { DonationsRepository } from './donations.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { EmailModule } from 'src/email/email.module';
import { User } from 'src/users/entities/user.entity';
import { Project } from 'src/projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donation, User, Project]), EmailModule],
  controllers: [DonationsController],
  providers: [DonationsService, DonationsRepository],
})
export class DonationsModule {}
