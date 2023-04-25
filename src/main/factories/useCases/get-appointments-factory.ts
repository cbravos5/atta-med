import { RemoteGetAppointments } from "@/data/useCases/get-appointments";
import { GetAppointments } from "@/domain/useCases/get-appointments";
import { makeAuthorizeHttpClientDecorator } from "../decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../http/api-url-factory";

export const makeGetAppointments = () =>
  new RemoteGetAppointments(makeApiUrl("/appointments"), makeAuthorizeHttpClientDecorator());
