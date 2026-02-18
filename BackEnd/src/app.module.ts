import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';

// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users.module';
import { OrdersModule } from './orders/orders.module';
import { ProfileModule } from './profile/profile.module';
import { GamesModule } from './games/games.module';
import { ServicesModule } from './services/services.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AdminModule } from './admin/admin.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
    OrdersModule,
    ProfileModule,
    GamesModule,
    ServicesModule,
    PaymentsModule,
    ReviewsModule,
    AdminModule,
    NotificationsModule,
  ],
})
export class AppModule {}