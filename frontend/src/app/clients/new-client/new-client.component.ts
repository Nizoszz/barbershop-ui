import { Component, Inject, OnDestroy } from '@angular/core';
import { SERVICES } from '../../services/service.token';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientFormComponent } from '../components/client-form/client-form.component';
import { ClientModelForm } from '../client.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';

@Component({
  selector: 'app-new-client',
  imports: [ClientFormComponent],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.css',
  providers: [{ provide: SERVICES.HTTP.CLIENT, useClass: ClientsService }, { provide: SERVICES.SNACKBAR, useClass: SnackbarManagerService }],
})
export class NewClientComponent implements OnDestroy {
  private httpSubscription?: Subscription;
  constructor(
    @Inject(SERVICES.HTTP.CLIENT) private readonly httpService: IClientService,
    @Inject(SERVICES.SNACKBAR) private readonly snackbarService: ISnackbarManagerService,
    private readonly router: Router
  ) {}
  ngOnDestroy(): void {
    if(this.httpSubscription){
      this.httpSubscription.unsubscribe();
    }
  }
  onSubmitClient(value: ClientModelForm) {
    const { clientId, ...request } = value;
    this.httpService.save(request).subscribe((_) => {
      this.snackbarService.show("Cliente salvo com sucesso!");
      this.router.navigate(["clients/list"])
    });
  }
}
