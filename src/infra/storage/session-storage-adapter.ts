import { GetStorage } from '@/data/storage/get-storage';
import { SetStorage } from '@/data/storage/set-storage';

export class SessionStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: object): void {
    if (value) sessionStorage.setItem(key, JSON.stringify(value));
    else sessionStorage.removeItem(key);
  }

  get<T>(key: string): any {
    return JSON.parse(sessionStorage.getItem(key) || '{}') as T;
  }
}
