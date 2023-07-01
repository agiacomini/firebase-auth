import { Module } from '@nestjs/common';
import { Andr3aController } from './andr3a.controller';
import { Andr3aService } from './andr3a.service';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule],
  controllers: [Andr3aController],
  providers: [Andr3aService, JwtService],
})
export class Andr3aModule {}
