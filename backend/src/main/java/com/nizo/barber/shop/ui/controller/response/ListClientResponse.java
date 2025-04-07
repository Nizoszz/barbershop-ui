package com.nizo.barber.shop.ui.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ListClientResponse(
        @JsonProperty("clientId")
        String clientId,
        @JsonProperty("name")
        String name,
        @JsonProperty("email")
        String email,
        @JsonProperty("phone")
        String phone
){
}
