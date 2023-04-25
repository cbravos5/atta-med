import { SearchMedics } from "@/domain/useCases/search-medics";
import { HttpClient, HttpStatusCode } from "../http/http-client";

export class RemoteSearchMedics implements SearchMedics {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<SearchMedics.Response>,
  ) {}

  async execute(searchText: string): Promise<SearchMedics.Response> {
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