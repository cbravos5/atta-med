export interface Login {
  execute(props: Login.Props): Promise<Login.Response>;
}

export namespace Login {
  export type Props = {
    email: string;
    password: string;
  }

  export type Response = {
    authorization: string;
  }
}