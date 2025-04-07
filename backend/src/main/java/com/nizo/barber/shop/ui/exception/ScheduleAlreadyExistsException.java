package com.nizo.barber.shop.ui.exception;

public class ScheduleAlreadyExistsException extends RuntimeException{
    public ScheduleAlreadyExistsException(String message) {
        super(message);
    }
}
