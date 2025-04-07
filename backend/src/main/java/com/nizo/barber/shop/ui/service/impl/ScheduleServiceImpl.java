package com.nizo.barber.shop.ui.service.impl;

import com.nizo.barber.shop.ui.entity.ScheduleEntity;
import com.nizo.barber.shop.ui.repository.ScheduleRepository;
import com.nizo.barber.shop.ui.service.ScheduleService;
import com.nizo.barber.shop.ui.service.query.ScheduleQueryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ScheduleServiceImpl implements ScheduleService{
    private final ScheduleRepository scheduleRepository;
    private final ScheduleQueryService scheduleQueryService;
    @Override
    public ScheduleEntity save(ScheduleEntity entity){
        scheduleQueryService.verifyIfScheduleExists(entity.getStartAt(), entity.getEndAt());
        return scheduleRepository.save(entity);
    }

    @Override
    public void delete(String scheduleId){
        scheduleQueryService.findById(scheduleId);
        scheduleRepository.deleteById(scheduleId);
    }
}
