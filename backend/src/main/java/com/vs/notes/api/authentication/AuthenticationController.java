package com.vs.notes.api.authentication;

import com.vs.notes.api.authentication.model.UserDto;
import com.vs.notes.security.service.userdetail.NotesUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/authentication")
@CrossOrigin(origins = {"${angular.http.env}", "${angular.https.env}"})
public class AuthenticationController {

    private NotesUserDetailsService notesUserDetailsService;

    @Autowired
    private void setNotesUserDetailsService(NotesUserDetailsService notesUserDetailsService) {
        this.notesUserDetailsService = notesUserDetailsService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody UserDto userDto) {
        try {
            return ResponseEntity.ok(notesUserDetailsService.authenticate(userDto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
