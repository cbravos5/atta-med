import { GetAvailableHours } from "@/domain/useCases/get-available-hours";
import { HttpClient, HttpStatusCode } from "../http/http-client";

export class RemoteGetAvailableHours implements GetAvailableHours {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<GetAvailableHours.Response>,
  ) {}

  async execute(props: GetAvailableHours.Props): Promise<GetAvailableHours.Response> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: {
        medicId: props.medicId,
        when: props.when.toISOString()
      },
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