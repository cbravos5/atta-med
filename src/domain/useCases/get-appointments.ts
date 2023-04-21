import { Appointment } from "../Models/Appointment";

export interface GetAppointments {
  execute(date: Date): Promise<GetAppointments.Response>;
}

export namespace GetAppointments {
  export type Response = Appointment[];
}