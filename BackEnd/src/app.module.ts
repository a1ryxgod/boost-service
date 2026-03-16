import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
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
import { ShopAccountsModule } from './shop-accounts/shop-accounts.module';
import { ChatModule } from './chat/chat.module';
import { PromoCodesModule } from './promo-codes/promo-codes.module';
import { BoosterModule } from './booster/booster.module';
import { BoosterApplicationsModule } from './booster-applications/booster-applications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000,
        limit: 60,
      },
      {
        name: 'auth',
        ttl: 900000, // 15 minutes
        limit: 5,
      },
    ]),
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
    ShopAccountsModule,
    ChatModule,
    PromoCodesModule,
    BoosterModule,
    BoosterApplicationsModule,
  ],
})
export class AppModule {}