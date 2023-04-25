import { RemoteLogin } from "@/data/useCases/login";
import { Login } from "@/domain/useCases/login";
import { storage } from "@/main/Registry";
import { makeApiUrl } from "../http/api-url-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";
import { makeSessionStorageAdapter } from "../storage/session-storage-adapter-factory";

export const makeLogin = () =>
  new RemoteLogin(makeApiUrl("/auth/login"), makeAxiosHttpClient(), makeSessionStorageAdapter());
