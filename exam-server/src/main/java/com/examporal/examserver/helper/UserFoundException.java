package com.examporal.examserver.helper;

public class UserFoundException extends Exception{
    public UserFoundException(){
        super("User with username is found in DB!! try with other username");
    }
    public UserFoundException(String message){
        super(message);
    }

}
