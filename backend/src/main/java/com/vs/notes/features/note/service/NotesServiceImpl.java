package com.vs.notes.features.note.service;

import com.vs.notes.features.note.dto.NoteDto;
import com.vs.notes.features.note.model.Note;
import com.vs.notes.features.note.repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotesServiceImpl implements NotesService {

    private final NotesRepository notesRepository;

    @Autowired
    NotesServiceImpl(NotesRepository notesRepository) {
        this.notesRepository = notesRepository;
    }

    @Override
    public void saveNote(int userId, NoteDto noteDto) {
        this.notesRepository.save(new Note(userId, noteDto));
    }

    @Override
    public List<Note> getAllNotesForUser(int userId) {
        return this.notesRepository.findAllByUserId(userId);
    }

    @Override
    public void deleteNote(int noteId) {
        this.notesRepository.deleteById(noteId);
    }
}
