import { GetAppointments } from "@/domain/useCases/get-appointments";

export const makeGetAppointments = (): GetAppointments => ({
  async execute(date) {
    await new Promise(r => setTimeout(r, 1500));

    return Array(7).fill(null).map((_,i) => ({
      patient: {
        id: i.toString(),
        name: "João da Silva de Jesus",
        age: 24,
        gender: "male",
        cpf: '12345678910'
      },
      id: i.toString(),
      isCancelled: false,
      when: new Date(),
      medic: {
        id: i.toString(),
        name: "João da Silva de Jesus",
        crm: 'CRM/SP-123456',
        specialty: 'Neurologia'
      }
    }))
  } 
});