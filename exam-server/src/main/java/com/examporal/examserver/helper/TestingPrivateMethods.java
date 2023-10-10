package com.examporal.examserver.helper;

import java.net.MalformedURLException;
import java.net.URL;

public class TestingPrivateMethods {

    private int add(int a, int b){
        System.out.println("a = " + a);
        System.out.println("b = " + b);
        int c=a+b;
        return c;
    }
    public int multiply(int a,int b,int c) throws MalformedURLException {
        URL  url=new URL("https:://google//mm.com");
        System.out.println(url);
        int sum1=add(a,b);
        int result=sum1+c;
        return result;
    }



}
