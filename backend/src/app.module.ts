import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MembersModule } from './members/members.module';
import { AuthModule } from './auth/auth.module';
import { HashingModule } from './hashing/hashing.module';
import { OwnershipModule } from './ownership/ownership.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    DatabaseModule,
    MembersModule,
    AuthModule,
    HashingModule,
    OwnershipModule,
    ProjectsModule,
    TasksModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
