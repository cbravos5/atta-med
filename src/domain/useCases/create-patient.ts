import { Patient } from "../Models/Patient";

export interface CreatePatient {
  execute(props: CreatePatient.Request): Promise<CreatePatient.Response>;
}

export namespace CreatePatient {
  export type Request = Omit<Patient, 'id'>;

  export type Response = Patient;
}