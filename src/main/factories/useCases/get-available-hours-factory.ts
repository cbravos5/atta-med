import { RemoteGetAvailableHours } from "@/data/useCases/get-available-hours";
import { makeAuthorizeHttpClientDecorator } from "../decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../http/api-url-factory";

export const makeGetAvailableHours = () =>
  new RemoteGetAvailableHours(makeApiUrl("/appointments/available"), makeAuthorizeHttpClientDecorator());
