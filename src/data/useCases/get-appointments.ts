import { GetAppointments } from "@/domain/useCases/get-appointments";
import { HttpClient, HttpStatusCode } from "../http/http-client";

export class RemoteGetAppointments implements GetAppointments {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<GetAppointments.Response>,
  ) {}

  async execute(date: Date): Promise<GetAppointments.Response> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: { when: date.toISOString() },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new Error("Invalid credentials");
      default:
        throw new Error("Unexpected behavior");
    }
  }
}