package com.nizo.barber.shop.ui.repository;

import com.nizo.barber.shop.ui.entity.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<ClientEntity, String>{
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    Optional<ClientEntity> findByEmail(String email);
    Optional<ClientEntity> findByPhone(String phone);
}
