package com.nizo.barber.shop.ui.service.query;

import com.nizo.barber.shop.ui.entity.ScheduleEntity;

import java.time.OffsetDateTime;
import java.util.List;

public interface ScheduleQueryService{
    ScheduleEntity findById(String scheduleId);
    List<ScheduleEntity> findInMonth(OffsetDateTime startAt,OffsetDateTime endAt);
    void verifyIfScheduleExists(OffsetDateTime startAt, OffsetDateTime endAt);
}
