package com.nizo.barber.shop.ui.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.OffsetDateTime;

public record ClientScheduleAppointmentResponse(
        @JsonProperty("scheduleId")
        String scheduleId,
        @JsonProperty("day")
        Integer day,
        @JsonProperty("startAt")
        OffsetDateTime startAt,
        @JsonProperty("endAt")
        OffsetDateTime endAt,
        @JsonProperty("clientId")
        String clientId,
        @JsonProperty("clientName")
        String clientName
){
}
