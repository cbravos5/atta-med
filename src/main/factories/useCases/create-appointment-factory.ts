import { CreateAppointment } from "@/domain/useCases/create-appointment";

export const makeCreateAppointment = (): CreateAppointment => ({
  async execute(props) {
    await new Promise(r => setTimeout(r, 1500));

    return {
      id: '20f52299-ff05-43f1-8f48-557b28ede522',
      isCancelled: false,
      when: new Date(),
      medic: {
        id: '20f52299-ff05-43f1-8f48-557b28ede522',
        name: "João da Silva de Jesus",
        crm: 'CRM/SP-123456',
        specialty: 'Neurologia'
      },
      patient: {
        id: '20f52299-ff05-43f1-8f48-557b28ede522',
        name: "João da Silva de Jesus",
        age: 24,
        gender: "male",
        cpf: '12345678910'
      }
    }
  } 
});