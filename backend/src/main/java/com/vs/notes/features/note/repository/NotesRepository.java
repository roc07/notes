package com.vs.notes.features.note.repository;

import com.vs.notes.features.note.model.Note;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotesRepository extends JpaRepository<Note, Integer> {

    List<Note> findAllByUserId(int userId);

    List<Note> findAllByUserIdOrderByIdDesc(int userId, Pageable pageable);

    Note findByUserIdAndId(int userId, int id);
}
