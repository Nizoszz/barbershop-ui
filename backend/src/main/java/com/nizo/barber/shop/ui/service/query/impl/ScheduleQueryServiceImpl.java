package com.nizo.barber.shop.ui.service.query.impl;

import com.nizo.barber.shop.ui.entity.ScheduleEntity;
import com.nizo.barber.shop.ui.exception.NotFoundException;
import com.nizo.barber.shop.ui.exception.ScheduleAlreadyExistsException;
import com.nizo.barber.shop.ui.repository.ScheduleRepository;
import com.nizo.barber.shop.ui.service.query.ScheduleQueryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ScheduleQueryServiceImpl implements ScheduleQueryService{
    private final ScheduleRepository scheduleRepository;

    @Override
    public ScheduleEntity findById(String scheduleId){
        return scheduleRepository.findById(scheduleId).orElseThrow(() -> new NotFoundException("Schedule not found"));
    }

    @Override
    public List<ScheduleEntity> findInMonth(OffsetDateTime startAt,OffsetDateTime endAt){
        return scheduleRepository.findByStartAtGreaterThenEqualAndEndAtLess(startAt, endAt);
    }

    @Override
    public void verifyIfScheduleExists(OffsetDateTime startAt,OffsetDateTime endAt){
        if(scheduleRepository.existsByStartAtAndEndAt(startAt, endAt)){
            throw new ScheduleAlreadyExistsException("Schedule already exists");
        }
    }
}
