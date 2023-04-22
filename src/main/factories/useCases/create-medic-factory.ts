import { CreateMedic } from "@/domain/useCases/create-medic";

export const makeCreateMedic = (): CreateMedic => ({
  async execute(props) {
    await new Promise((r) => setTimeout(r, 1500));

    return {
      id: "20f52299-ff05-43f1-8f48-557b28ede522",
      name: "João da Silva de Jesus",
      crm: "CRM/SP-123456",
      specialty: "Neurologia",
    };
  },
});
