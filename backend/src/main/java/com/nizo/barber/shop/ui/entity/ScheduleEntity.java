package com.nizo.barber.shop.ui.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.OffsetDateTime;

@Entity
@Table(name = "tb_schedules",
uniqueConstraints = {
        @UniqueConstraint(name =  "UK_SCHEDULE_INTERVAL", columnNames = {"start_at", "end_at"})
})
@Getter
@Setter
@ToString
public class ScheduleEntity{
    @Id
    private String scheduleId;
    @Column(nullable = false, name = "start_at")
    private OffsetDateTime startAt;

    @Column(nullable = false, name = "end_at")
    private OffsetDateTime endAt;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "client_id")
    private ClientEntity client = new ClientEntity();
}
