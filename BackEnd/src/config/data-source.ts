import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env
const envPath = path.resolve(process.cwd(), process.env.NODE_ENV === 'production' ? '.env.production' : '.env');
dotenv.config({ path: envPath });

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'admin',
  database: process.env.DB_NAME || 'boost_service',
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, '..', '**/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations/*.{ts,js}')],
  subscribers: [],
  ssl: (process.env.DB_SSL === 'true' || !!process.env.DATABASE_URL) 
    ? { rejectUnauthorized: false } 
    : false,
});
