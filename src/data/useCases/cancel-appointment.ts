import { CancelAppointment } from "@/domain/useCases/cancel-appointment";
import { HttpClient, HttpStatusCode } from "../http/http-client";

export class RemoteCancelAppointment implements CancelAppointment {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async execute(id: string): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url.replace(':id', id),
      method: "delete"
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return;
      case HttpStatusCode.unauthorized:
        throw new Error("Não autorizado!");
      default:
        throw new Error("Erro não esperado!");
    }
  }
}