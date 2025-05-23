import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SERVICES } from '../../../services/service.token';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { ClientScheduleAppointmentModel, SaveScheduleModel, ScheduleAppointementMonthModel, SelectClientModel } from '../../schedule.models';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { Subscription } from 'rxjs';
import { IDialogManagerService } from '../../../services/idialog-manager.service';

@Component({
  selector: 'app-schedule-calendar',
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTimepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule, 
  ],
  templateUrl: './schedule-calendar.component.html',
  styleUrl: './schedule-calendar.component.css',
  providers: [
    provideNativeDateAdapter(),
    {
      provide: SERVICES.DIALOG,
      useClass: DialogManagerService,
    },
  ],
})
export class ScheduleCalendarComponent
  implements OnDestroy, OnChanges, AfterViewInit
{
  private subscription?: Subscription;

  private _selected: Date = new Date();

  displayedColumns: string[] = ['startAt', 'endAt', 'client', 'actions'];

  dataSource!: MatTableDataSource<ClientScheduleAppointmentModel>;

  addingSchedule: boolean = false;

  newSchedule: SaveScheduleModel = {
    startAt: undefined,
    endAt: undefined,
    clientId: undefined,
  };

  clientSelectFormControl = new FormControl();

  @Input() monthSchedule!: ScheduleAppointementMonthModel;
  @Input() clients: SelectClientModel[] = [];

  @Output() onDateChange = new EventEmitter<Date>();
  @Output() onConfirmDelete =
    new EventEmitter<ClientScheduleAppointmentModel>();
  @Output() onScheduleClient = new EventEmitter<SaveScheduleModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    @Inject(SERVICES.DIALOG)
    private readonly dialogManagerService: IDialogManagerService
  ) {}

  get selected(): Date {
    return this._selected;
  }

  set selected(selected: Date) {
    if (this._selected.getTime() !== selected.getTime()) {
      this.onDateChange.emit(selected);
      this.buildTable();
      this._selected = selected;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthSchedule'] && this.monthSchedule) {
      this.buildTable();
    }
  }

  onSubmit(form: NgForm) {
    const startAt = new Date(this._selected);
    const endAt = new Date(this._selected);
    startAt.setHours(
      this.newSchedule.startAt!.getHours(),
      this.newSchedule.startAt!.getMinutes()
    );
    endAt.setHours(
      this.newSchedule.endAt!.getHours(),
      this.newSchedule.endAt!.getMinutes()
    );
    const saved: ClientScheduleAppointmentModel = {
      scheduleId: "",
      day: this._selected.getDate(),
      startAt,
      endAt,
      clientId: this.newSchedule.clientId!,
      clientName: this.clients.find((c) => c.clientId === this.newSchedule.clientId!)!
        .name,
    };
    this.monthSchedule.scheduledAppointments.push(saved);
    this.onScheduleClient.emit(saved);
    this.buildTable();
    form.resetForm();
    this.newSchedule = {
      startAt: undefined,
      endAt: undefined,
      clientId: undefined,
    };
  }

  requestDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscription = this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão de agendamento',
        content: 'Confirma a exclusão do agendamento?',
      })
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(schedule);
          const updatedeList = this.dataSource.data.filter(
            (c) => c.clientId !== schedule.scheduleId
          );
          this.dataSource =
            new MatTableDataSource<ClientScheduleAppointmentModel>(
              updatedeList
            );
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        }
      });
  }

  onTimeChange(time: Date) {
    const endAt = new Date(time);
    endAt.setHours(time.getHours() + 1);
    this.newSchedule.endAt = endAt;
  }

  private buildTable() {
    const appointments = this.monthSchedule.scheduledAppointments.filter(
      (a) =>
        this.monthSchedule.year === this._selected.getFullYear() &&
        this.monthSchedule.month - 1 === this._selected.getMonth() &&
        a.day === this._selected.getDate()
    );
    this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(
      appointments
    );
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
