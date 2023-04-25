import { GetAvailableHours } from "@/domain/useCases/get-available-hours";

export const makeGetAvailableHours = (): GetAvailableHours => ({
  async execute() {
    await new Promise((r) => setTimeout(r, 1500));

    return {
      availablePeriods: [
        "2023-04-23T09:00:00.000Z",
        "2023-04-23T09:30:00.000Z",
        "2023-04-23T10:00:00.000Z",
        "2023-04-23T10:30:00.000Z",
        "2023-04-23T11:00:00.000Z",
        "2023-04-23T11:30:00.000Z",
        "2023-04-23T12:00:00.000Z",
        "2023-04-23T12:30:00.000Z",
        "2023-04-23T13:00:00.000Z",
        "2023-04-23T13:30:00.000Z",
        "2023-04-23T14:00:00.000Z",
        "2023-04-23T14:30:00.000Z",
        "2023-04-23T15:00:00.000Z",
        "2023-04-23T15:30:00.000Z",
        "2023-04-23T16:00:00.000Z",
        "2023-04-23T16:30:00.000Z",
        "2023-04-23T17:00:00.000Z",
        "2023-04-23T17:30:00.000Z",
        "2023-04-23T18:00:00.000Z",
        "2023-04-23T18:30:00.000Z",
        "2023-04-23T19:00:00.000Z",
        "2023-04-23T19:30:00.000Z",
        "2023-04-23T20:00:00.000Z",
        "2023-04-23T20:30:00.000Z",
        "2023-04-23T21:00:00.000Z",
        "2023-04-23T21:30:00.000Z",
        "2023-04-23T22:00:00.000Z",
        "2023-04-23T22:30:00.000Z",
        "2023-04-23T23:00:00.000Z",
        "2023-04-23T23:30:00.000Z",
        "2023-04-24T00:00:00.000Z",
        "2023-04-24T00:30:00.000Z",
      ],
    };
  },
});