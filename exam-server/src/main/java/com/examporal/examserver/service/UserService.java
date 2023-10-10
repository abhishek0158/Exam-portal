package com.examporal.examserver.service;

import com.examporal.examserver.models.User;
import com.examporal.examserver.models.UserRole;

import java.util.Set;

public interface UserService {

    //creating user
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;


    User getUser(String username);

    void deleteUser(Long userId);
}
