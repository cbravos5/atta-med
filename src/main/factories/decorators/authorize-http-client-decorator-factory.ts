import { HttpClient } from '@/data/http/http-client';
import { AuthorizeHttpClientDecorator } from '@/main/decorators/authorize-http-client-decorator';
import { makeAxiosHttpClient } from '../http/axios-http-client-factory';
import { makeSessionStorageAdapter } from '../storage/session-storage-adapter-factory';

export const makeAuthorizeHttpClientDecorator = (): HttpClient =>
  new AuthorizeHttpClientDecorator(makeSessionStorageAdapter(), makeAxiosHttpClient());
