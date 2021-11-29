package com.vs.notes.api.note;

import com.vs.notes.features.note.dto.NoteDto;
import com.vs.notes.features.note.service.NotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.util.List;

@Validated
@RestController
@RequestMapping(path = "/api/notes")
@CrossOrigin(origins = {"${angular.http.env}", "${angular.https.env}"})
public class NotesController {

    private NotesService notesService;

    @Autowired
    private void setNotesService(NotesService notesService) {
        this.notesService = notesService;
    }

    @Secured("ROLE_USER")
    @PostMapping(path = "/saveNote")
    public ResponseEntity<Void> saveNote(@RequestParam int userId, @RequestBody NoteDto noteDto) {
        notesService.saveNote(userId, noteDto);
        return ResponseEntity.accepted().build();
    }

    @Secured("ROLE_USER")
    @GetMapping(path = "/getNotesByUserIdAndPage")
    public ResponseEntity<List<NoteDto>> getNotesByUserIdAndPage(
            @RequestParam @Min(0) int page,
            @RequestParam @Min(1) int size,
            @RequestParam @Min(1) int userId) {
        List<NoteDto> noteDtoList = notesService.getNotesByUserIdAndPage(page, size, userId);
        return ResponseEntity.ok(noteDtoList);
    }

    @Secured("ROLE_USER")
    @GetMapping(path = "/getNotesCountForUser")
    public ResponseEntity<Long> getNotesCountForUser(
            @RequestParam @Min(1) int userId) {
        return ResponseEntity.ok(notesService.getAllNotesCountForUser(userId));
    }

    @Secured("ROLE_USER")
    @DeleteMapping(path = "/deleteNote")
    public ResponseEntity<Void> deleteNote(
            @RequestParam @Min(1) int userId,
            @RequestParam @Min(1) int noteId) {
        notesService.deleteNote(userId, noteId);
        return ResponseEntity.ok().build();
    }
}
