package com.nizo.barber.shop.ui.service.query.impl;

import com.nizo.barber.shop.ui.entity.ClientEntity;
import com.nizo.barber.shop.ui.exception.NotFoundException;
import com.nizo.barber.shop.ui.exception.PhoneAlreadyExistsException;
import com.nizo.barber.shop.ui.repository.ClientRepository;
import com.nizo.barber.shop.ui.service.query.ClientQueryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class ClientQueryServiceImpl implements ClientQueryService{
    private final ClientRepository clientRepository;

    @Override
    public ClientEntity findById(String clientId){
        return clientRepository.findById(clientId).orElseThrow(() -> new NotFoundException("Client not found!"));
    }

    @Override
    public List<ClientEntity> findAll(){
        return clientRepository.findAll();
    }

    @Override
    public void verifyPhone(String phone){
        if(clientRepository.existsByPhone(phone)){
            throw new PhoneAlreadyExistsException("Phone already exists");
        }
    }

    @Override
    public void verifyPhone(String clientId,String phone){
        var optional = clientRepository.findByPhone(phone);
        if(optional.isPresent() && !Objects.equals(optional.get().getPhone(),phone)){
            throw new PhoneAlreadyExistsException("Phone already exists");
        }
    }

    @Override
    public void verifyEmail(String email){
        if(clientRepository.existsByEmail(email)){
            throw new PhoneAlreadyExistsException("Email already exists");
        }
    }

    @Override
    public void verifyEmail(String clientId,String email){
        var optional = clientRepository.findByEmail(email);
        if(optional.isPresent() && !Objects.equals(optional.get().getEmail(),email)){
            throw new PhoneAlreadyExistsException("Email already exists");
        }

    }
}
