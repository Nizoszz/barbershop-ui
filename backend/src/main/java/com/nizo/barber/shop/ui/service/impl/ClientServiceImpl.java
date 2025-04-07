package com.nizo.barber.shop.ui.service.impl;

import com.nizo.barber.shop.ui.entity.ClientEntity;
import com.nizo.barber.shop.ui.repository.ClientRepository;
import com.nizo.barber.shop.ui.service.ClientService;
import com.nizo.barber.shop.ui.service.query.ClientQueryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ClientServiceImpl implements ClientService{
    private final ClientRepository clientRepository;
    private final ClientQueryService queryService;
    @Override
    public ClientEntity save(ClientEntity client) {
        queryService.verifyEmail(client.getEmail());
        queryService.verifyPhone(client.getPhone());
        return clientRepository.save(client);
    }

    @Override
    public ClientEntity update(ClientEntity entity){
        queryService.verifyEmail(entity.getClientId(), entity.getEmail());
        queryService.verifyPhone(entity.getClientId(), entity.getPhone());

        var saved = queryService.findById(entity.getClientId());
        saved.setName(entity.getName());
        saved.setPhone(entity.getPhone());
        saved.setEmail(entity.getEmail());
        return clientRepository.save(saved);
    }

    @Override
    public void delete(String clientId){

    }
}
