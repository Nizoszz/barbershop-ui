package com.nizo.barber.shop.ui.exception;

public class PhoneAlreadyExistsException extends RuntimeException{
    public PhoneAlreadyExistsException(String message) {
        super(message);
    }
}
