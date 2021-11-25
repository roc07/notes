package com.vs.notes.security.service.userdetail;

import com.vs.notes.api.authentication.model.UserDto;
import com.vs.notes.api.authentication.model.UserLoginInformationDto;
import com.vs.notes.security.model.NotesUser;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface NotesUserDetailsService extends UserDetailsService {

    int createUser(UserDto userDto);

    List<NotesUser> getAllUsers();

    UserLoginInformationDto authenticate(UserDto userDto);

}
