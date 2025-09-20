import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Public() // Set as public endpoint for testing purposes
  @Get('seed')
  // Seed database with data
  async seedDatabase() {
    const result = await this.seederService.seedDatabase();

    return {
      message: 'Database initialized successfully',
      inserted: result,
    };
  }
}
