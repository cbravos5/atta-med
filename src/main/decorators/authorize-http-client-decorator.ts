import { HttpClient, HttpRequest, HttpResponse } from '@/data/http/http-client';
import { GetStorage } from '@/data/storage/get-storage';

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(private readonly getStorage: GetStorage, private readonly httpClient: HttpClient) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    const auth = this.getStorage.get<{ token: string }>('auth');
    if (auth?.token) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          Authorization: 'Bearer ' + auth.token
        })
      });
    }
    const httpResponse = await this.httpClient.request(data);
    return httpResponse;
  }
}
