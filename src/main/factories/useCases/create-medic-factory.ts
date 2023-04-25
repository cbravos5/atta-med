import { RemoteCreateMedic } from "@/data/useCases/create-medic";
import { makeAuthorizeHttpClientDecorator } from "../decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../http/api-url-factory";

export const makeCreateMedic = () => new RemoteCreateMedic(makeApiUrl("/medics"), makeAuthorizeHttpClientDecorator());
