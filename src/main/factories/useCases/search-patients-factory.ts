import { RemoteSearchPatients } from "@/data/useCases/search-patients";
import { makeAuthorizeHttpClientDecorator } from "../decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../http/api-url-factory";

export const makeSearchPatients = () => new RemoteSearchPatients(makeApiUrl('/patients'), makeAuthorizeHttpClientDecorator())
