package com.nizo.barber.shop.ui.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.OffsetDateTime;

public record SaveScheduleResponse(
        @JsonProperty("scheduleId")
        String scheduleId,
        @JsonProperty("startAt")
        OffsetDateTime startAt,
        @JsonProperty("endAt")
        OffsetDateTime endAt,
        @JsonProperty("clientId")
        String clientId
){
}
