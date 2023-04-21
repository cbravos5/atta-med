import { Appointment } from "../Models/Appointment";

export interface CreateAppointment {
  execute(props: CreateAppointment.Request): Promise<CreateAppointment.Response>;
}

export namespace CreateAppointment {
  export type Request = {
    patientId: string;
    medicId: string;
    date: Date;
  };

  export type Response = Appointment;
}