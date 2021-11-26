package com.vs.notes.features.note.controller;

import com.vs.notes.features.note.dto.NoteDto;
import com.vs.notes.features.note.service.NotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/notes")
@CrossOrigin(origins = {"${angular.http.env}", "${angular.https.env}"})
public class NotesController {

    private NotesService notesService;

    @Autowired
    private void setNotesService(NotesService notesService) {
        this.notesService = notesService;
    }

    @PostMapping(path = "/saveNote")
    public ResponseEntity<Void> saveNote(@RequestParam int userId, @RequestBody NoteDto noteDto) {
        notesService.saveNote(userId, noteDto);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping(path = "/getNotesForUser")
    public ResponseEntity<List<NoteDto>> getAllNotesForUser(@RequestParam int userId) {
        notesService.getAllNotesForUser(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(path = "/deleteNote")
    public ResponseEntity<Void> deleteNote() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
