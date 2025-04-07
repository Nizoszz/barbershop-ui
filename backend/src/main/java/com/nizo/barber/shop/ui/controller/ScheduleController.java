package com.nizo.barber.shop.ui.controller;

import com.nizo.barber.shop.ui.controller.request.SaveScheduleRequest;
import com.nizo.barber.shop.ui.controller.response.SaveScheduleResponse;
import com.nizo.barber.shop.ui.controller.response.ScheduleAppointmentMonthResponse;
import com.nizo.barber.shop.ui.mapper.SchedulesMapperInterface;
import com.nizo.barber.shop.ui.service.ScheduleService;
import com.nizo.barber.shop.ui.service.query.ScheduleQueryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.time.ZoneOffset;

@RestController
@RequestMapping("/schedules")
@AllArgsConstructor
public class ScheduleController{
    private final ScheduleService scheduleService;
    private final ScheduleQueryService scheduleQueryService;
    private final SchedulesMapperInterface mapper;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    SaveScheduleResponse save(@RequestBody @Valid SaveScheduleRequest request){
        var entity = mapper.toEntity(request);
        scheduleService.save(entity);
        return mapper.toSaveResponse(entity);
    }
    @DeleteMapping("/{scheduleId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String scheduleId){
        scheduleService.delete(scheduleId);
    }
    @GetMapping("{year}/{month}")
    ScheduleAppointmentMonthResponse findMonth(@PathVariable int year, @PathVariable int month){
        var yearMonth = YearMonth.of(year, month);
        var startAt = yearMonth.atDay(1)
                .atTime(0,0,0,0)
                .atOffset(ZoneOffset.UTC);
        var endAt = yearMonth.atEndOfMonth()
                .atTime(23,59,59,999)
                .atOffset(ZoneOffset.UTC);
        var entities = scheduleQueryService.findInMonth(startAt, endAt);
        return mapper.toMonthResponse(year, month, entities);
    }
}

