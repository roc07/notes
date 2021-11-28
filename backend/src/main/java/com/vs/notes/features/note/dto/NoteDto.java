package com.vs.notes.features.note.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NoteDto {

    private int id;
    @NotNull
    @Size(min = 1, max = 16)
    private String shortName;
    @NotNull
    @Size(min = 1, max = 510)
    private String noteText;

}
