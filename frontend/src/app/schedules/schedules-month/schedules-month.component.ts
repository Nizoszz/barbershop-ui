import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ScheduleCalendarComponent } from '../components/schedule-calendar/schedule-calendar.component';
import { SERVICES } from '../../services/service.token';
import { SchedulesService } from '../../services/api-client/schedules/schedules.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { Subscription } from 'rxjs';
import { IScheduleService } from '../../services/api-client/schedules/ischedules.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { SaveScheduleRequest } from '../../services/api-client/schedules/schedule.models';
import {
  ClientScheduleAppointmentModel,
  SaveScheduleModel,
  ScheduleAppointementMonthModel,
  SelectClientModel,
} from '../schedule.models';

@Component({
  selector: 'app-schedules-month',
  imports: [ScheduleCalendarComponent],
  templateUrl: './schedules-month.component.html',
  styleUrl: './schedules-month.component.css',
  providers: [
    { provide: SERVICES.HTTP.SCHEDULE, useClass: SchedulesService },
    { provide: SERVICES.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class SchedulesMonthComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private selectedDate?: Date;
  monthSchedule!: ScheduleAppointementMonthModel;
  clients: SelectClientModel[] = [];
  constructor(
    @Inject(SERVICES.HTTP.SCHEDULE)
    private readonly httpService: IScheduleService,
    @Inject(SERVICES.HTTP.CLIENT)
    private readonly clientHttpService: IClientService,
    @Inject(SERVICES.SNACKBAR)
    private readonly snackbarManage: ISnackbarManagerService
  ) {}
  ngOnInit(): void {
    this.fetchSchedules(new Date());
    this.subscriptions.push(
      this.clientHttpService.list().subscribe((data) => (this.clients = data))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onDateChange(date: Date) {
    this.selectedDate = date;
    this.fetchSchedules(date);
  }

  onConfirmDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscriptions.push(
      this.httpService.delete(schedule.scheduleId).subscribe()
    );
  }

  onScheduleClient(schedule: SaveScheduleModel) {
    if (schedule.startAt && schedule.endAt && schedule.clientId) {
      const request: SaveScheduleRequest = {
        startAt: schedule.startAt,
        endAt: schedule.endAt,
        clientId: schedule.clientId,
      };
      this.subscriptions.push(
        this.httpService.save(request).subscribe(() => {
          this.snackbarManage.show('Agendamento realizado com sucesso');
          if (this.selectedDate) {
            this.fetchSchedules(this.selectedDate);
          }
        })
      );
    }
  }

  private fetchSchedules(currentDate: Date) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    this.subscriptions.push(
      this.httpService
        .listInMonth(year, month)
        .subscribe((data) => (this.monthSchedule = data))
    );
  }
}
