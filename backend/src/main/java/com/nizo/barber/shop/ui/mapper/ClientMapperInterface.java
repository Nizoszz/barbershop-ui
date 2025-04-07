package com.nizo.barber.shop.ui.mapper;

import com.nizo.barber.shop.ui.controller.request.SaveClientRequest;
import com.nizo.barber.shop.ui.controller.request.UpdateClientRequest;
import com.nizo.barber.shop.ui.controller.response.ClientDetailsResponse;
import com.nizo.barber.shop.ui.controller.response.ListClientResponse;
import com.nizo.barber.shop.ui.controller.response.SaveClientResponse;
import com.nizo.barber.shop.ui.controller.response.UpdateClientResponse;
import com.nizo.barber.shop.ui.entity.ClientEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface ClientMapperInterface{
    @Mapping(target = "clientId", ignore = true)
    @Mapping(target = "schedules", ignore = true)
    ClientEntity toEntity(SaveClientRequest request);
    SaveClientResponse toSaveResponse(ClientEntity entity);

    @Mapping(target = "schedules", ignore = true)
    ClientEntity toEntity(String clientId, UpdateClientRequest request);
    UpdateClientResponse toUpdateResponse(ClientEntity entity);
    ClientDetailsResponse toDetailsResponse(ClientEntity entity);
    List<ListClientResponse> toListResponse(List<ClientEntity> entities);
}