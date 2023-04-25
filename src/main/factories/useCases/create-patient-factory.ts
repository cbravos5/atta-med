import { RemoteCreatePatient } from "@/data/useCases/create-patient";
import { makeAuthorizeHttpClientDecorator } from "../decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../http/api-url-factory";

export const makeCreatePatient = () =>
  new RemoteCreatePatient(makeApiUrl("/patients"), makeAuthorizeHttpClientDecorator());
