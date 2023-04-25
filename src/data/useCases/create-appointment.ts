import { CreateAppointment } from "@/domain/useCases/create-appointment";
import { HttpClient, HttpStatusCode } from "../http/http-client";

export class RemoteCreateAppointment implements CreateAppointment {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<CreateAppointment.Response>) {}

  async execute(props: CreateAppointment.Request): Promise<CreateAppointment.Response> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: props,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.conflict:
        throw new Error("Já existe um agendamento para este horário. Recarregue a página!")
      case HttpStatusCode.unauthorized:
        throw new Error("Não autorizado!");
      default:
        throw new Error("Erro não esperado!");
    }
  }
}
