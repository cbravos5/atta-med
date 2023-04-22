import { CancelAppointment } from "@/domain/useCases/cancel-appointment";

export const makeCancelAppointment = (): CancelAppointment => ({
  async execute(id) {
    await new Promise((r) => setTimeout(r, 1500));
  },
});
