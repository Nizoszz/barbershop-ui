import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SERVICES } from '../../services/service.token';
import { ClientFormComponent } from '../components/client-form/client-form.component';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientModelForm } from '../client.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-client',
  imports: [ClientFormComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css',
  providers: [
    { provide: SERVICES.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class EditClientComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];
  client: ClientModelForm = { clientId: '', name: '', email: '', phone: '' };
  constructor(
    @Inject(SERVICES.HTTP.CLIENT) private readonly httpService: IClientService,
    @Inject(SERVICES.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}
  ngOnDestroy(): void {
    this.httpSubscriptions.forEach(sub => sub.unsubscribe());
  }
  ngOnInit(): void {
    const clientId = this.activatedRoute.snapshot.paramMap.get('clientId');
    if (!clientId) {
      this.snackBarManager.show('Erro ao recuperar informações do cliente');
      this.router.navigate(['clients/list']);
      return;
    }
    this.httpSubscriptions?.push(
      this.httpService
        .findById(clientId)
        .subscribe((data) => (this.client = data))
    );
  }
  onSubmitClient(value: ClientModelForm){
    const {clientId, ...request} = value;
    if(clientId){
      this.httpSubscriptions?.push(
        this.httpService
         .update(clientId, request)
         .subscribe(() => {
            this.snackBarManager.show('Cliente atualizado com sucesso');
            this.router.navigate(['clients/list']);
          })
      );
      return;
    }
    this.snackBarManager.show('Um erro inesperado aconteceu');
    this.router.navigate(['clients/list']);
  }
}
