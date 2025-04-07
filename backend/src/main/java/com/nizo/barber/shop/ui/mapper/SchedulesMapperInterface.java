package com.nizo.barber.shop.ui.mapper;

import com.nizo.barber.shop.ui.controller.request.SaveScheduleRequest;
import com.nizo.barber.shop.ui.controller.response.ClientScheduleAppointmentResponse;
import com.nizo.barber.shop.ui.controller.response.SaveScheduleResponse;
import com.nizo.barber.shop.ui.controller.response.ScheduleAppointmentMonthResponse;
import com.nizo.barber.shop.ui.entity.ScheduleEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface SchedulesMapperInterface{
    @Mapping(target = "scheduleId", ignore = true)
    @Mapping(target = "clientId", source = "client.clientId")
    ScheduleEntity toEntity(SaveScheduleRequest request);
    @Mapping(target = "clientId", source = "client.clientId")
    SaveScheduleResponse toSaveResponse(ScheduleEntity entity);

    @Mapping(target = "scheduledAppointments", expression = "java(toClientMonthResponse(entities))")
    ScheduleAppointmentMonthResponse toMonthResponse(int year,int month,List<ScheduleEntity> entities);

    List<ClientScheduleAppointmentResponse> toClientMonthResponse(List<ScheduleEntity> entities);

    @Mapping(target = "clientId", source = "client.clientId")
    @Mapping(target = "clientName", source = "client.name")
    @Mapping(target = "day", expression = "java(entity.getStartAt().getDayOfMonth())")
    ClientScheduleAppointmentResponse toClientMonthResponse(ScheduleEntity entity);
}
