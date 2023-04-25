import { CreateMedic } from "@/domain/useCases/create-medic";
import { HttpClient, HttpStatusCode } from "../http/http-client";

export class RemoteCreateMedic implements CreateMedic {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<CreateMedic.Response>,
  ) {}

  async execute(props: CreateMedic.Props): Promise<CreateMedic.Response> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: props
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.conflict:
        throw new Error("Médico já cadastrado!")
      case HttpStatusCode.unauthorized:
        throw new Error("Não autorizado!");
      default:
        throw new Error("Erro não esperado!");
    }
  }
}