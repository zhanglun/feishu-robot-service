import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom } from 'rxjs';

@Injectable()
export class CommonService {
  constructor(private readonly httpService: HttpService) {}

  async postFeishu(message: any): Promise<any> {
    const request = this.httpService
      .post(
        'https://open.feishu.cn/open-apis/bot/v2/hook/3cc60041-322f-4fe6-8ec0-085686acb38d',
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

    return data;
  }
}
