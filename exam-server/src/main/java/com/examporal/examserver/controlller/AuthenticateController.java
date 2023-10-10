package com.examporal.examserver.controlller;

import com.examporal.examserver.config.JwtUtil;
import com.examporal.examserver.models.JwtRequest;
import com.examporal.examserver.models.JwtResponse;
import com.examporal.examserver.models.User;
import com.examporal.examserver.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin(origins="*")
public class AuthenticateController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/generate-token")
    public ResponseEntity<JwtResponse> tokenGenerate(@RequestBody JwtRequest request){
        System.out.println("request.getUsername() = " + request.getUsername());
        System.out.println("request.getPassword() = " + request.getPassword());
        try{
            authenticate(request);
        }catch (UsernameNotFoundException e){
            throw new UsernameNotFoundException("User Not found");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        UserDetails user=this.userDetailsService.loadUserByUsername(request.getUsername());
        System.out.println("user = " + user);
        String token=jwtUtil.generateToken(user);
        System.out.println("token = " + token);
        return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
    }


    private  void  authenticate(JwtRequest request) throws Exception {
        try{
            System.out.println("Inside authenticate method");
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()));
        }
        catch (DisabledException exception){
            throw  new Exception("User Disabled "+exception.getMessage());
        }
        catch (BadCredentialsException exception){
            System.out.println("BadCred exception = " + exception);
            throw new Exception("Invalid Credentials "+exception.getMessage());
        }
    }
    //returns the details of current logged-in user
    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal){
        if(principal==null){
            System.out.println("principal = " + principal);
            return null;
        }
        return (User)(this.userDetailsService.loadUserByUsername(principal.getName()));
    }
}
