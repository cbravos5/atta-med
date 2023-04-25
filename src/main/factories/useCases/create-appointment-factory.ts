import { RemoteCreateAppointment } from "@/data/useCases/create-appointment";
import { makeAuthorizeHttpClientDecorator } from "../decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../http/api-url-factory";

export const makeCreateAppointment = () =>
  new RemoteCreateAppointment(makeApiUrl("/appointments"), makeAuthorizeHttpClientDecorator());
