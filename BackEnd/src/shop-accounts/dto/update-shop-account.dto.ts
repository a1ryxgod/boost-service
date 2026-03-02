import { PartialType } from '@nestjs/swagger';
import { CreateShopAccountDto } from './create-shop-account.dto';

export class UpdateShopAccountDto extends PartialType(CreateShopAccountDto) {}
