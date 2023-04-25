import { RemoteSearchMedics } from "@/data/useCases/search-medics";
import { makeAuthorizeHttpClientDecorator } from "../decorators/authorize-http-client-decorator-factory";
import { makeApiUrl } from "../http/api-url-factory";

export const makeSearchMedics = () => new RemoteSearchMedics(makeApiUrl('/medics'), makeAuthorizeHttpClientDecorator())
