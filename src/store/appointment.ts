import { create } from "zustand";

type AppointmentStore = {
  openDate: Date | null;

  setOpenDate: (date: Date | null) => void;
}

export const useAppointmentStore = create<AppointmentStore>(set => ({
  openDate: null,
  setOpenDate(date) {
    set({ openDate: date })
  },
}))