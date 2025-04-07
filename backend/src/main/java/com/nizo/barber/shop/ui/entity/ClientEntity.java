package com.nizo.barber.shop.ui.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import static jakarta.persistence.CascadeType.ALL;

@Entity
@Table(name = "tb_clients", uniqueConstraints = {
        @UniqueConstraint(name = "UK_EMAIL", columnNames = "email"),
        @UniqueConstraint(name = "UK_PHONE", columnNames = "phone")
})
@Getter
@Setter
@ToString
@NoArgsConstructor
public class ClientEntity{
    @Id
    private String clientId;
    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(nullable = false, length = 11, columnDefinition = "bpchar(11)")
    private String phone;

    @ToString.Exclude
    @OneToMany(mappedBy = "client", cascade = ALL, orphanRemoval = true)
    private Set<ScheduleEntity> schedules = new HashSet<>();

    public ClientEntity(String id,String name,String email,String phone){
        this.clientId = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    public static ClientEntity create(String name, String email, String phone) {
        var id = UUID.randomUUID().toString();
        return new ClientEntity(id, name, email, phone);
    }
}
