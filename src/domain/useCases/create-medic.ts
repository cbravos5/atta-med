import { Medic } from "../Models/Medic";

export interface CreateMedic {
  execute(props: CreateMedic.Props): Promise<CreateMedic.Response>;
}

export namespace CreateMedic {
  export type Props = Omit<Medic, 'id'>;

  export type Response = Medic;
}