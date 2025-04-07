import { Component, Inject } from '@angular/core';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SERVICES } from '../../services/service.token';

@Component({
  selector: 'app-edit-client',
  imports: [],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css',
  providers: [{ provide: SERVICES.HTTP.CLIENT, useClass: ClientsService }],
})
export class EditClientComponent {
  constructor(
    @Inject(SERVICES.HTTP.CLIENT) private readonly httpService: IClientService
  ) {}
}
