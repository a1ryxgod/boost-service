import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Version('1')
  @Get()
  @ApiOperation({ summary: 'Check API health status' })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'boost-service-api',
    };
  }
}
