export interface ScheduleAppointementMonthModel {
  year: number;
  month: number;
  scheduledAppointments: ClientScheduleAppointmentModel[];
}

export interface ClientScheduleAppointmentModel {
  scheduleId: string;
  day: number;
  startAt: Date;
  endAt: Date;
  clientId: string;
  clientName: string;
}

export interface SaveScheduleModel {
  startAt?: Date;
  endAt?: Date;
  clientId?: string;
}

export interface SelectClientModel {
  clientId: string;
  name: string;
}
