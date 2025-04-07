import { Injectable } from '@angular/core';
import { IClientService } from './iclients.service';
import { Observable } from 'rxjs';
import {
  SaveClientRequest,
  SaveClientResponse,
  UpdateClientRequest,
  UpdateClientResponse,
  ListClientResponse,
  DetailClientResponse,
} from './client.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ClientsService implements IClientService {
  private readonly baseUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}
  save(request: SaveClientRequest): Observable<SaveClientResponse> {
    return this.http.post<SaveClientResponse>(
      `${this.baseUrl}clients`,
      request
    );
  }
  update(
    clientId: string,
    request: UpdateClientRequest
  ): Observable<UpdateClientResponse> {
    return this.http.put<UpdateClientResponse>(
      `${this.baseUrl}clients/${clientId}`,
      request
    );
  }
  delete(clientId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}clients/${clientId}`);
  }
  list(): Observable<ListClientResponse[]> {
    return this.http.get<ListClientResponse[]>(`${this.baseUrl}clients`);
  }
  findById(clientId: string): Observable<DetailClientResponse> {
    return this.http.get<DetailClientResponse>(
      `${this.baseUrl}clients/${clientId}`);
  }
}
