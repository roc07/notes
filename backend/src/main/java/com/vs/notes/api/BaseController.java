package com.vs.notes.api;

import com.vs.notes.api.authentication.model.SecurityTestDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = {"${angular.http.env}", "${angular.https.env}"})
public class BaseController {

    @Value("${test.value}")
    private String propertyTestValue;

    @GetMapping(path = "/")
    public ResponseEntity<String> getNothing() {
        return ResponseEntity.ok().body(propertyTestValue + " " + System.currentTimeMillis());
    }

    @GetMapping(path = "/prop")
    public ResponseEntity<String> getPropertyTest() {
        return ResponseEntity.ok().body(propertyTestValue);
    }

    @GetMapping(path = "/home")
    public ResponseEntity<Long> getHome() {
        return ResponseEntity.ok().body(System.currentTimeMillis());
    }

    @PostMapping(path = "/testSecurity")
    @Secured("ROLE_USER")
    public ResponseEntity<SecurityTestDto> testSecurity() {
        return ResponseEntity.ok().body(new SecurityTestDto(true));
    }

}
