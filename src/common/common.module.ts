import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CommonService } from './common.service';

@Module({
  providers: [CommonService],
  imports: [HttpModule],
  exports: [CommonService],
})
export class CommonModule {}
