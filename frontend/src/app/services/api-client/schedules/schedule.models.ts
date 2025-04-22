export interface ScheduleAppointmentMonthResponse {
  year: number;
  month: number;
  scheduledAppointments: ClientScheduleAppointementResponse[];
}

export interface ClientScheduleAppointementResponse {
  scheduleId: string;
  day: number;
  startAt: Date;
  endAt: Date;
  clientId: string;
  clientName: string;
}

export interface SaveScheduleResponse {
  scheduleId: string;
  startAt: Date;
  endAt: Date;
  clientId: number;
}

export interface SaveScheduleRequest {
  startAt: Date;
  endAt: Date;
  clientId: string;
}
