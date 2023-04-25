import { RemoteCancelAppointment } from "@/data/useCases/cancel-appointment";
import { makeAuthorizeHttpClientDecorator } from "../decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../http/api-url-factory";

export const makeCancelAppointment = () =>
  new RemoteCancelAppointment(makeApiUrl("/appointments/:id"), makeAuthorizeHttpClientDecorator());
