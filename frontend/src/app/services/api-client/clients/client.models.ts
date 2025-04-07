export interface SaveClientRequest {
  name: string;
  email: string;
  phone: string;
}
export interface UpdateClientRequest {
  name: string;
  email: string;
  phone: string;
}

export interface UpdateClientResponse {
  clientId: string;
  name: string;
  email: string;
  phone: string;
}
export interface SaveClientResponse {
  clientId: string;
  name: string;
  email: string;
  phone: string;
}

export interface ListClientResponse {
  clientId: string;
  name: string;
  email: string;
  phone: string;
}

export interface DetailClientResponse {
  clientId: string;
  name: string;
  email: string;
  phone: string;
}
