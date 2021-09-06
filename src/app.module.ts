import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RopstenController } from './ropsten/ropsten.controller';
import { RopstenService } from './ropsten/ropsten.service';

@Module({
  imports: [],
  controllers: [AppController, RopstenController],
  providers: [AppService, RopstenService],
})
export class AppModule {}
