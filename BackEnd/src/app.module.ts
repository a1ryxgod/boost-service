import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? 'admin',
      database: process.env.DB_NAME ?? 'boost_service',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    OrdersModule,
  ],
})
export class AppModule {}