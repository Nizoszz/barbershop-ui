import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ClientModelTable } from '../../client.models';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SERVICES } from '../../../services/service.token';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { CustomPaginator } from './custom.paginator';

@Component({
  selector: 'app-client-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  providers: [
    { provide: SERVICES.DIALOG, useClass: DialogManagerService },
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
  ],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css',
})
export class ClientTableComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input() clients: ClientModelTable[] = [];

  dataSource!: MatTableDataSource<ClientModelTable>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  private dialogManagerServiceSubscriptions?: Subscription;

  @Output() onConfirmDelete = new EventEmitter<ClientModelTable>();

  @Output() onRequestUpdate = new EventEmitter<ClientModelTable>();

  constructor(
    @Inject(SERVICES.DIALOG)
    private readonly dialogManagerService: IDialogManagerService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clients'] && this.clients) {
      this.dataSource = new MatTableDataSource<ClientModelTable>(this.clients);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }
  ngOnDestroy(): void {
    if (this.dialogManagerServiceSubscriptions) {
      this.dialogManagerServiceSubscriptions.unsubscribe();
    }
  }

  formatPhone(phone: string) {
    return `( ${phone.substring(0, 2)} ) ${phone.substring(
      2,
      7
    )} - ${phone.substring(7)}`;
  }

  update(client: ClientModelTable) {
    this.onRequestUpdate.emit(client);
  }

  delete(client: ClientModelTable) {
    this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão de cliente',
        content: `Confirma a exclusão do cliente ${client.name}`,
      })
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(client);
          const updatedList = this.dataSource.data.filter(
            (c) => c.clientId !== client.clientId
          );
          this.dataSource = new MatTableDataSource<ClientModelTable>(
            updatedList
          );
        }
      });
  }
}
