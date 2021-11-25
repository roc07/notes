package com.vs.notes.features.note.model;

import com.vs.notes.features.note.dto.NoteDto;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "note")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "user_id")
    private final int userId;
    private String shortName;

    public Note(int userId, NoteDto noteDto) {
        this.userId = userId;
        this.shortName = noteDto.getShortName();
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }
}
