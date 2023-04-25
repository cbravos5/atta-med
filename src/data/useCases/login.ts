import { Login } from "@/domain/useCases/login";
import { HttpClient, HttpStatusCode } from "../http/http-client";
import { SetStorage } from "../storage/set-storage";

export class RemoteLogin implements Login {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLogin.Response>,
    private readonly setStorage: SetStorage
  ) {}

  async execute(props: Login.Props): Promise<Login.Response> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: props,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        this.setStorage.set("auth", { token: httpResponse.body.token });
        return { authorization: httpResponse.body.token };
      case HttpStatusCode.unauthorized:
        throw new Error("Invalid credentials");
      default:
        throw new Error("Unexpected behavior");
    }
  }
}

namespace RemoteLogin {
  export type Response = {
    user: { id: string; email: string };
    token: string;
  };
}
