export interface CancelAppointment {
  execute(id: string): Promise<void>;
}