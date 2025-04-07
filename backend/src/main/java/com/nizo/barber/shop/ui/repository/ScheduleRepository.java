package com.nizo.barber.shop.ui.repository;

import com.nizo.barber.shop.ui.entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, String>{
    List<ScheduleEntity> findByStartAtGreaterThenEqualAndEndAtLess(OffsetDateTime startAt,OffsetDateTime endAt);
    boolean existsByStartAtAndEndAt(OffsetDateTime startAt, OffsetDateTime endAt);
}
