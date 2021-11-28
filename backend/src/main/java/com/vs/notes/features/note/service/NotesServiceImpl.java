package com.vs.notes.features.note.service;

import com.vs.notes.features.note.dto.NoteDto;
import com.vs.notes.features.note.model.Note;
import com.vs.notes.features.note.repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

//    @Override
//    public List<Note> getAllNotesForUser(int userId) {
//        return this.notesRepository.findAllByUserId(userId);
//    }

    @Override
    public List<NoteDto> getNotesByUserIdAndPage(int page, int size, int userId) {
        Pageable pageable = PageRequest.of(page, size);
        List<Note> note = this.notesRepository.findAllByUserIdOrderByIdDesc(userId, pageable);
        return note.stream()
                .map(n -> new NoteDto(n.getId(), n.getShortName(), n.getNoteText()))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteNote(int userId, int noteId) {
        Note noteToDelete = this.notesRepository.findByUserIdAndId(userId, noteId);
        this.notesRepository.delete(noteToDelete);
    }
}
