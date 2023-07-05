import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Andr3aModule } from './andr3a/andr3a.module';

@Module({
  // Configuration - the code "ConfigModule.forRoot()" will load and parse ".env" file from the default location (project root directory),
  // merge key/value pairs from the ".env" file with environment variables assigned to "process.env" also store the result in a private
  // structure that you can access through the "ConfigService". The "forRoot()" method registers the "ConfigService" provider, which
  // provides a "get()" method for reading these parsed/merged configuration variables.
  imports: [ConfigModule.forRoot(), AuthModule, Andr3aModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
