import { makeSessionStorageAdapter } from "./factories/storage/session-storage-adapter-factory";
import { makeCancelAppointment } from "./factories/useCases/cancel-appointment-factory";
import { makeCreateAppointment } from "./factories/useCases/create-appointment-factory";
import { makeCreateMedic } from "./factories/useCases/create-medic-factory";
import { makeCreatePatient } from "./factories/useCases/create-patient-factory";
import { makeGetAppointments } from "./factories/useCases/get-appointments-factory";
import { makeGetAvailableHours } from "./factories/useCases/get-available-hours-factory";
import { makeLogin } from "./factories/useCases/login-factory";
import { makeSearchMedics } from "./factories/useCases/search-medics-factory";
import { makeSearchPatients } from "./factories/useCases/search-patients-factory";

export const storage = makeSessionStorageAdapter();

//#region USE CASES

export const getAppointments = makeGetAppointments();

export const cancelAppointment = makeCancelAppointment();

export const createAppointment = makeCreateAppointment();

export const createMedic = makeCreateMedic();

export const createPatient = makeCreatePatient();

export const searchMedics = makeSearchMedics();

export const searchPatients = makeSearchPatients();

export const getAvailableHours = makeGetAvailableHours();

export const login = makeLogin();

//#endregion