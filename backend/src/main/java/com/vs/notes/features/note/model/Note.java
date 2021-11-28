package com.vs.notes.features.note.model;

import com.vs.notes.features.note.dto.NoteDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "note")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "user_id")
    private int userId;
    @Column(length = 16)
    private String shortName;
    @Column(length = 510)
    private String noteText;

    public Note(int userId, NoteDto noteDto) {
        this.userId = userId;
        this.shortName = noteDto.getShortName();
        this.noteText = noteDto.getNoteText();
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }
}
