package com.examporal.examserver.service.impl;

import com.examporal.examserver.config.MySecurityConfig;
import com.examporal.examserver.helper.UserFoundException;
import com.examporal.examserver.helper.UsernameNotFoundException;
import com.examporal.examserver.models.Role;
import com.examporal.examserver.models.User;
import com.examporal.examserver.models.UserRole;
import com.examporal.examserver.repo.RoleRepository;
import com.examporal.examserver.repo.UserRepository;
import com.examporal.examserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private MySecurityConfig mySecurityConfig;



    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User user1=this.userRepository.findByUsername(user.getUsername());
        if(user1==null){
            user.setPassword(mySecurityConfig.passwordEncoder().encode(user.getPassword()));
            for(UserRole role:userRoles){
                roleRepository.save(role.getRole());
            }
//            System.out.println("user = " + user);
//            user.getUserRoles().addAll(userRoles);
//
//            System.out.println("user = " + user.getUserRoles());
//            user1=userRepository.save(user);
//            //while saving user user_roles are all also saved
//            System.out.println("user1 = " );



            //d......
            System.out.println("roles "+user.getUserRoles());
            user.getUserRoles().addAll(userRoles);
            user.setUserRoles(userRoles);
            System.out.println("roles "+user.getUserRoles());

            user1=userRepository.save(user);
            System.out.println("user1 = " + user1);
        }
        else{
            System.out.println("User already exists");
            throw new UserFoundException();
        }
        return user1;
    }

    @Override
    public User getUser(String username) {
        User user = userRepository.findByUsername(username);
        if(user==null){
            throw new UsernameNotFoundException("User with "+username+" not Found");
        }
        return user;
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.delete(userRepository.findById(userId).get());
    }
}
