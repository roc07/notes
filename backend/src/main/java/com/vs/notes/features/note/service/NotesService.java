package com.vs.notes.features.note.service;

import com.vs.notes.features.note.dto.NoteDto;

import java.util.List;

public interface NotesService {

    void saveNote(int userId, NoteDto noteDto);

//    List<Note> getAllNotesForUser(int userId);

    List<NoteDto> getNotesByUserIdAndPage(int page, int size, int userId);

    void deleteNote(int noteId);
}
