export interface GetAvailableHours {
  execute(props: GetAvailableHours.Props): Promise<GetAvailableHours.Response>
} 

export namespace GetAvailableHours {
  export type Props = { medicId: string; when: Date; };

  export type Response = { availablePeriods: string[] }
}