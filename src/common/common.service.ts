import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom } from 'rxjs';

@Injectable()
export class CommonService {
  constructor(private readonly httpService: HttpService) {}

  async postFeishu(message: any): Promise<any> {
    const url =
      'https://open.feishu.cn/open-apis/bot/v2/hook/155c6e50-ce2d-41aa-8ea2-34a267a1b00b';
    // const url =
    //   'https://open.feishu.cn/open-apis/bot/v2/hook/3cc60041-322f-4fe6-8ec0-085686acb38d';
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

    return data;
  }
}
