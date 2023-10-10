package com.examporal.examserver.controlller;

import com.examporal.examserver.models.Role;
import com.examporal.examserver.models.User;
import com.examporal.examserver.models.UserRole;
import com.examporal.examserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {


    @Autowired
    private UserService userService;

    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {

        Set<UserRole> set=new HashSet<>();

        Role role=new Role();
        role.setRoleId(2L);
        role.setRoleName("NORMAL");
        UserRole userRole=new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        set.add(userRole);

        return userService.createUser(user,set);
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username){
        return this.userService.getUser(username);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        userService.deleteUser(userId);
    }

}
