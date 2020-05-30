package com.dboard.main.controller;

import com.dboard.main.model.Role;
import com.dboard.main.model.RoleName;
import com.dboard.main.model.User;
import com.dboard.main.payload.*;
import com.dboard.main.payload.User.UserIdentityAvailability;
import com.dboard.main.payload.Weather.Forecasts.Response;
import com.dboard.main.repository.RoleRepository;
import com.dboard.main.repository.UserRepository;
import com.dboard.main.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost")
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    final PasswordEncoder passwordEncoder;

    final JwtTokenProvider tokenProvider;

    public UserController(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        if(userRepository.existsByUsername(registrationRequest.getUsername())) {
            logger.info("Username is already taken for: " + registrationRequest.getUsername());
            return new ResponseEntity(constructError(HttpStatus.BAD_REQUEST, "username", "Username is already taken"),
                    HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(registrationRequest.getEmail())) {
            logger.info("Email Address already in use: " + registrationRequest.getEmail());
            return new ResponseEntity(constructError(HttpStatus.BAD_REQUEST, "email", "Email address already in use"),
                    HttpStatus.BAD_REQUEST);
        }

        if(!registrationRequest.getPassword().equals(registrationRequest.getPasswordConfirm())) {
            logger.info("Passwords dont match: " + registrationRequest.getUsername());
            return new ResponseEntity(constructError(HttpStatus.BAD_REQUEST, "username", "Passwords do not match."),
                    HttpStatus.BAD_REQUEST);
        }

        User user = new User(
                registrationRequest.getUsername(),
                registrationRequest.getPassword(),
                registrationRequest.getEmail(),
                registrationRequest.getPasswordConfirm()
        );

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @GetMapping("user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @PostMapping("checkToken")
    public ResponseEntity<?> validateToken(@Valid @RequestBody JwtTokenRequest request) {
        if (tokenProvider.validateToken(request.getToken())) {
            return ResponseEntity.ok(new ApiResponse(true, "JWT Token is valid"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false, "JWT Token is expired"));
        }
    }

    private ApiErrorResponse constructError(HttpStatus status, String fieldName, String message) {
        ApiErrorResponse errorResponse = new ApiErrorResponse();
        ApiError error = new ApiError();
        error.setFieldName(fieldName);
        error.setMessage(message);
        List<ApiError> errors = Collections.singletonList(error);
        errorResponse.setErrors(errors);
        errorResponse.setTimestamp(new Date());
        errorResponse.setStatus(status);
        return errorResponse;
    }





}
