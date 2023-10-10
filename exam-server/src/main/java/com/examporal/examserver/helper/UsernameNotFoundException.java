package com.examporal.examserver.helper;

public class UsernameNotFoundException extends RuntimeException{
    String message;
    public UsernameNotFoundException(String message){
        super(message);
    }
}
