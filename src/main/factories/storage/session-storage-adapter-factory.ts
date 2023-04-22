import { SessionStorageAdapter } from "@/infra/storage/session-storage-adapter";

export const makeSessionStorageAdapter = () => new SessionStorageAdapter();