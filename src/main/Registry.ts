import { makeSessionStorageAdapter } from "./factories/storage/session-storage-adapter-factory";
import { makeGetAppointments } from "./factories/useCases/get-appointments-factory";

export const getAppointments = makeGetAppointments();

export const storage = makeSessionStorageAdapter();