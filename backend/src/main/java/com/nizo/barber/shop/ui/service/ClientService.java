package com.nizo.barber.shop.ui.service;

import com.nizo.barber.shop.ui.entity.ClientEntity;

public interface ClientService{
    ClientEntity save(ClientEntity entity);
    ClientEntity update(ClientEntity entity);
    void delete(String clientId);
}
