package com.examporal.examserver.helper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserFoundExceptionHandler {

    @ExceptionHandler(UserFoundException.class)
    public ResponseEntity<String> exceptionHandler(UserFoundException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
    }


}
