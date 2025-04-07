package com.nizo.barber.shop.ui.service;

import com.nizo.barber.shop.ui.entity.ScheduleEntity;

public interface ScheduleService{
    ScheduleEntity save(ScheduleEntity entity);
    void delete(String scheduleId);
}
