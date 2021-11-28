package com.vs.notes.api.authentication.model;

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
public class UserDto {

    @NotNull
    @Size(min=3, max=20)
    private String username;
    @NotNull
    @Size(min=5, max=20)
    private char[] password;

}
