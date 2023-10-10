package com.examporal.examserver.helper;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.MalformedURLException;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class TestingPrivateMethodsTest {



    @Test
    void multiply() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException, MalformedURLException {
        TestingPrivateMethods testingPrivateMethods=new TestingPrivateMethods();
        Method privateMehtod=TestingPrivateMethods.class.getDeclaredMethod("add", int.class, int.class);
        privateMehtod.setAccessible(true);
        when(privateMehtod.invoke(testingPrivateMethods,1,2)).thenReturn(3);
        assertEquals(6,testingPrivateMethods.multiply(1,2,3));
    }
    @Test
    public void Test() throws MalformedURLException {
        TestingPrivateMethods testingPrivateMethods=new TestingPrivateMethods();
        assertEquals(6,testingPrivateMethods.multiply(1,2,3));
    }

    @Test
    public void testPrivateAddMethod() throws Exception {
        TestingPrivateMethods testingPrivateMethods = new TestingPrivateMethods();

        Method privateAddMethod = TestingPrivateMethods.class.getDeclaredMethod("add", int.class, int.class);
        privateAddMethod.setAccessible(true);

        int result = (int) privateAddMethod.invoke(testingPrivateMethods, 2, 3);

        assertEquals(5, result);
    }


}