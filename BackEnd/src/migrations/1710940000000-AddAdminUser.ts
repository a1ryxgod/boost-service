import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class AddAdminUser1710940000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const email = process.env.ADMIN_EMAIL || 'admin@boost.com';
    const password = process.env.ADMIN_PASSWORD || 'admin_secret_123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ensure the uuid-ossp extension is enabled
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Create admin user if not exists
    await queryRunner.query(`
      INSERT INTO "users" (id, email, password, role, status, email_verified)
      SELECT 
        uuid_generate_v4(), 
        $1, 
        $2, 
        'ADMIN', 
        'ACTIVE', 
        true
      WHERE NOT EXISTS (
        SELECT 1 FROM "users" WHERE email = $3
      );
    `, [email, hashedPassword, email]);

    // Ensure the user with this email HAS the ADMIN role (in case they were already registered)
    await queryRunner.query('UPDATE "users" SET role = \'ADMIN\' WHERE email = $1', [email]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const email = process.env.ADMIN_EMAIL || 'admin@boost.com';
    await queryRunner.query('DELETE FROM "users" WHERE email = $1 AND role = \'ADMIN\'', [email]);
  }
}
