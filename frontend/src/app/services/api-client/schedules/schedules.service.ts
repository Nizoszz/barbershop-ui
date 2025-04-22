import { Injectable } from '@angular/core';
import { IScheduleService } from './ischedules.service';
import { environment } from '../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import {
  SaveScheduleRequest,
  SaveScheduleResponse,
  ScheduleAppointmentMonthResponse,
} from './schedule.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService implements IScheduleService {
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: SaveScheduleRequest): Observable<SaveScheduleResponse> {
    return this.http.post<SaveScheduleResponse>(
      `${this.basePath}schedules`,
      request
    );
  }
  delete(scheduleId: string): Observable<void> {
    return this.http.delete<void>(`${this.basePath}schedules/${scheduleId}`);
  }
  listInMonth(
    year: number,
    month: number
  ): Observable<ScheduleAppointmentMonthResponse> {
    return this.http.get<ScheduleAppointmentMonthResponse>(
      `${this.basePath}schedules/${year}/${month}`
    );
  }
}
