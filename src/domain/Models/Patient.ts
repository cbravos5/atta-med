import { Gender } from "./Gender";

export interface Patient {
  id: string;
  name: string;
  cpf: string;
  age: number;
  gender: keyof typeof Gender;
}