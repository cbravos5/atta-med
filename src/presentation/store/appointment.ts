import { create } from "zustand";

type AppointmentStore = {
  openDate: Date | null;

  newAppointmentModal: boolean;
  appointmentsModal: boolean;

  openModal: (modal: 'newAppointment' | 'appointments') => void;
  closeModal: (modal: 'newAppointment' | 'appointments') => void;

  setOpenDate: (date: Date | null) => void;
}

export const useAppointmentStore = create<AppointmentStore>(set => ({
  openDate: null,
  setOpenDate(date) {
    set({ openDate: date })
  },

  appointmentsModal: false,
  newAppointmentModal: false,
  
  closeModal: (modal) => {
    if (modal === 'newAppointment') set({ newAppointmentModal: false });
    else if (modal === 'appointments') set({ appointmentsModal: false })
  },

  openModal: (modal) => {
    if (modal === 'newAppointment') set({ newAppointmentModal: true });
    else if (modal === 'appointments') set({ appointmentsModal: true })
  }
}))