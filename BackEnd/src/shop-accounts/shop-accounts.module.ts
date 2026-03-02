import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopAccountEntity } from './shop-account.entity';
import { ShopAccountsService } from './shop-accounts.service';
import { ShopAccountsController } from './shop-accounts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShopAccountEntity])],
  controllers: [ShopAccountsController],
  providers: [ShopAccountsService],
  exports: [ShopAccountsService],
})
export class ShopAccountsModule {}
