package com.vs.notes.security.repository;

import com.vs.notes.security.model.NotesUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotesUserRepository extends JpaRepository<NotesUser, Integer> {

    NotesUser findNotesUserByUsername(String username);

}
