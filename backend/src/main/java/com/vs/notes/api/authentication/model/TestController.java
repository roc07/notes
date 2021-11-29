package com.vs.notes.api.authentication.model;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = {"${angular.http.env}", "${angular.https.env}"})
public class TestController {

    @Value("${test.value}")
    private String propertyTestValue;

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(propertyTestValue);
    }
}
