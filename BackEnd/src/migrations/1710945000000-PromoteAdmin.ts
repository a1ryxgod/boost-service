import { MigrationInterface, QueryRunner } from 'typeorm';

export class PromoteAdmin1710945000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const email = process.env.ADMIN_EMAIL || 'admin@boost.com';
    
    // Promote the user to ADMIN regardless of whether they were created via migration or registration
    await queryRunner.query('UPDATE "users" SET role = \'ADMIN\' WHERE email = $1', [email]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No-op for down to prevent accidental demotion in production
  }
}
