import { Component, Inject } from '@angular/core';
import { SERVICES } from '../../services/service.token';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';

@Component({
  selector: 'app-list-clients',
  imports: [],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.css',
  providers: [{ provide: SERVICES.HTTP.CLIENT, useClass: ClientsService }],
})
export class ListClientsComponent {
  constructor(
    @Inject(SERVICES.HTTP.CLIENT) private readonly httpService: IClientService
  ) {}
}
