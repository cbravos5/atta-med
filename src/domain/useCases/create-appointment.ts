import { Appointment } from "../Models/Appointment";

export interface CreateAppointment {
  execute(props: CreateAppointment.Request): Promise<CreateAppointment.Response>;
}

export namespace CreateAppointment {
  export type Request = {
    patientId: string;
    medicId: string;
    when: string;
  };

  export type Response = Appointment;
}