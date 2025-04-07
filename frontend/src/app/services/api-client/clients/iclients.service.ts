import { Observable } from 'rxjs';
import { DetailClientResponse, ListClientResponse, SaveClientRequest, SaveClientResponse, UpdateClientRequest, UpdateClientResponse } from './client.models';

export interface IClientService {
  save(request: SaveClientRequest): Observable<SaveClientResponse>;
  update(clientId: string, request: UpdateClientRequest): Observable<UpdateClientResponse>;
  delete(clientId: string): Observable<void>;
  list(): Observable<ListClientResponse[]>;
  findById(clientId: string): Observable<DetailClientResponse>;
}
