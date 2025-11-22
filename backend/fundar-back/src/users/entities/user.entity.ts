import { Donation } from 'src/donations/entities/donation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  birthDate?: Date;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ default: 'user', nullable: true })
  role?: 'admin' | 'user';

  @Column({ nullable: true })
  provider?: string;

  @OneToMany(() => Donation, (donation) => donation.user)
  donations?: Donation[];
}
