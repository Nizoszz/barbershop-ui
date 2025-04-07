package com.nizo.barber.shop.ui.service.query;

import com.nizo.barber.shop.ui.entity.ClientEntity;

import java.util.List;

public interface ClientQueryService{
    ClientEntity findById(String clientId);

    List<ClientEntity> findAll();

    void verifyPhone(String phone);

    void verifyPhone(String clientId, String phone);

    void verifyEmail(String email);

    void verifyEmail(String clientId, String email);
}
