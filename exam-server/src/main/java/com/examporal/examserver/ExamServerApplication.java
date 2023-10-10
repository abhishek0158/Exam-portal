package com.examporal.examserver;

import com.examporal.examserver.models.Role;
import com.examporal.examserver.models.User;
import com.examporal.examserver.models.UserRole;
import com.examporal.examserver.service.UserService;
import com.examporal.examserver.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamServerApplication implements CommandLineRunner {
	private final UserService userService; // Use constructor injection

	@Autowired
	public ExamServerApplication(UserServiceImpl userService) {
		this.userService = userService;
	}
	public static void main(String[] args) {
		SpringApplication.run(ExamServerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("runninggg");
//vs
//		User user=new User();
//		user.setFirstName("Abhishek");
//		user.setLastName("Gowlikar");
//		user.setUsername("gkrabhishek");
//		user.setPassword("123");
//		user.setEmail("gkrabhishek@gmail.com");
//		user.setProfile("default.png");
//		user.setPhone("12233344");
//		Role role=new Role();
//		role.setRoleId(1L);
//		role.setRoleName("Admin");
//
//		Set<UserRole> set=new HashSet<>();
//		UserRole userRole=new UserRole();
//		userRole.setRole(role);
//		userRole.setUser(user);
//		set.add(userRole);
//		User user1=userService.createUser(user,set);
//		System.out.println("user1 = " + user1);
//		System.out.println("user1.getUsername() = " + user1.getUsername());
	}
}
