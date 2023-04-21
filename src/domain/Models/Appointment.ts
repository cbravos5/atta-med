import { Medic } from "./Medic";
import { Patient } from "./Patient";

export interface Appointment {
  id: string;
  patient: Patient;
  medic: Medic;
  when: Date;
  isCancelled: boolean;
}