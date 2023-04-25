import { CreatePatient } from "@/domain/useCases/create-patient";
import { HttpClient, HttpStatusCode } from "../http/http-client";

export class RemoteCreatePatient implements CreatePatient {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<CreatePatient.Response>,
  ) {}

  async execute(props: CreatePatient.Request): Promise<CreatePatient.Response> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: {
        ...props,
        cpf: props.cpf.replace(/\D/g,'')
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.conflict:
        throw new Error("Paciente já cadastrado!")
      case HttpStatusCode.unauthorized:
        throw new Error("Não autorizado!");
      default:
        throw new Error("Erro não esperado!");
    }
  }
}