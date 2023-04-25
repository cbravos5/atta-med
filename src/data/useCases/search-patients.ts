import { SearchPatients } from "@/domain/useCases/search-patients";
import { HttpClient, HttpStatusCode } from "../http/http-client";

export class RemoteSearchPatients implements SearchPatients {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<SearchPatients.Response>,
  ) {}

  async execute(searchText: string): Promise<SearchPatients.Response> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      params: { searchText },
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