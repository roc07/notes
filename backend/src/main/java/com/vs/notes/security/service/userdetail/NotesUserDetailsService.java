package com.vs.notes.security.service.userdetail;

import com.vs.notes.api.authentication.model.UserDto;
import com.vs.notes.api.authentication.model.UserLoginInformationDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface NotesUserDetailsService extends UserDetailsService {

    int createUser(UserDto userDto);

    UserLoginInformationDto authenticate(UserDto userDto);

}
