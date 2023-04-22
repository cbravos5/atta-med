import { Appointment } from "../Models/Appointment";

export interface CreateAppointment {
  execute(props: CreateAppointment.Request): Promise<CreateAppointment.Response>;
}

export namespace CreateAppointment {
  export type Request = {
    patient: string;
    medic: string;
    hour: string;
  };

  export type Response = Appointment;
}