import { Patient } from "../Models/Patient";

export interface SearchPatients {
  execute(searchText: string): Promise<SearchPatients.Response>;
}

export namespace SearchPatients {
  export type Response = Patient[];
}