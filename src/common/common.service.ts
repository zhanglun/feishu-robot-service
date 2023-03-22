import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map, lastValueFrom } from 'rxjs';

@Injectable()
export class CommonService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async postFeishu(robotId: string, message: any): Promise<any> {
    const url = `https://open.feishu.cn/open-apis/bot/v2/hook/${robotId}`;
    const request = this.httpService
      .post(
        url,
        {
          ...message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(map((res) => res));

    const data = await lastValueFrom(request);

    return data.data;
  }
}
