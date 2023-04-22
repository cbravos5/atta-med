import { CreatePatient } from "@/domain/useCases/create-patient";

export const makeCreatePatient = (): CreatePatient => ({
  async execute(props) {
    await new Promise((r) => setTimeout(r, 1500));

    return {
      id: "20f52299-ff05-43f1-8f48-557b28ede522",
      name: "João da Silva de Jesus",
      age: 24,
      gender: "male",
      cpf: "12345678910",
    };
  },
});
