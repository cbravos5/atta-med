export interface Login {
  execute(props: Login.Props): Promise<Login.Response>;
}

export namespace Login {
  export type Props = {
    login: string;
    password: string;
  }

  export type Response = {
    authorization: string;
  }
}