package com.vs.notes.api.authentication;

import com.vs.notes.api.authentication.model.UserDto;
import com.vs.notes.security.model.NotesUser;
import com.vs.notes.security.service.userdetail.NotesUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"${angular.http.env}", "${angular.https.env}"})
public class UserController {

    private final NotesUserDetailsService notesUserDetailsService;

    @Autowired
    public UserController(NotesUserDetailsService notesUserDetailsService) {
        this.notesUserDetailsService = notesUserDetailsService;
    }

    @PostMapping(path = "/createUser")
    public ResponseEntity<Integer> createUser(@RequestBody UserDto userDto) {
        int id = notesUserDetailsService.createUser(userDto);
        return ResponseEntity.ok(id);
    }

    @GetMapping(path = "/getAllUsers")
    public ResponseEntity<List<NotesUser>> getAllUsers() {
        return ResponseEntity.ok(notesUserDetailsService.getAllUsers());
    }
}
