import { Injectable, HttpException, HttpStatus, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoosterApplicationEntity } from './booster-application.entity';
import { UserEntity } from '../users.entity';
import { SubmitApplicationDto, ReviewApplicationDto } from './dto/submit-application.dto';
import { ApplicationStatus, UserRole } from '../enums';

@Injectable()
export class BoosterApplicationsService {
  constructor(
    @InjectRepository(BoosterApplicationEntity)
    private readonly repo: Repository<BoosterApplicationEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,
  ) {}

  async submit(userId: string, dto: SubmitApplicationDto): Promise<BoosterApplicationEntity> {
    // Check if already applied
    const existing = await this.repo.findOne({
      where: { userId, status: ApplicationStatus.PENDING },
    });
    if (existing) {
      throw new ConflictException('You already have a pending application');
    }

    const application = this.repo.create({
      userId,
      games: dto.games,
      mainGame: dto.mainGame,
      currentRank: dto.currentRank,
      peakRank: dto.peakRank ?? null,
      yearsExperience: dto.yearsExperience,
      motivation: dto.motivation,
      profileLink: dto.profileLink ?? null,
    });

    return this.repo.save(application);
  }

  async findAll(status?: ApplicationStatus): Promise<BoosterApplicationEntity[]> {
    const where = status ? { status } : {};
    return this.repo.find({
      where,
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findMyApplication(userId: string): Promise<BoosterApplicationEntity | null> {
    return this.repo.findOne({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async review(
    applicationId: string,
    adminId: string,
    dto: ReviewApplicationDto,
  ): Promise<BoosterApplicationEntity> {
    const application = await this.repo.findOne({
      where: { id: applicationId },
      relations: ['user'],
    });

    if (!application) {
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }

    if (application.status !== ApplicationStatus.PENDING) {
      throw new HttpException('Application has already been reviewed', HttpStatus.BAD_REQUEST);
    }

    application.status = dto.action as ApplicationStatus;
    application.adminNote = dto.adminNote ?? null;
    application.reviewedBy = adminId;
    application.reviewedAt = new Date();

    // If approved, update user role to BOOSTER
    if (dto.action === 'APPROVED') {
      await this.usersRepo.update(application.userId, { role: UserRole.BOOSTER });
    }

    return this.repo.save(application);
  }
}
