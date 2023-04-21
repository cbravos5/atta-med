import { Medic } from "../Models/Medic";

export interface SearchMedics {
  execute(searchText: string): Promise<SearchMedics.Response>;
}

export namespace SearchMedics {
  export type Response = Medic[];
}