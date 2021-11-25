package com.vs.notes.security.service.userdetail;

import com.vs.notes.api.authentication.model.UserDto;
import com.vs.notes.api.authentication.model.UserLoginInformationDto;
import com.vs.notes.security.model.Authority;
import com.vs.notes.security.model.NotesUser;
import com.vs.notes.security.model.UserRole;
import com.vs.notes.security.repository.AuthorityRepository;
import com.vs.notes.security.repository.NotesUserRepository;
import com.vs.notes.security.service.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service("NotesUserDetailsService")
public class NotesUserDetailsServiceImpl implements NotesUserDetailsService {

    private NotesUserRepository notesUserRepository;
    private JwtUtil jwtUtil;
    private AuthenticationManager authenticationManager;
    private AuthorityRepository authorityRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    private void setNotesUserRepository(NotesUserRepository notesUserRepository) {
        this.notesUserRepository = notesUserRepository;
    }

    @Autowired
    private void setJwtUtil(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Autowired
    private void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Autowired
    private void setAuthorityRepository(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    @Autowired
    private void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        NotesUser notesUser = notesUserRepository.findNotesUserByUsername(username);

        return User.builder()
                .username(notesUser.getUsername())
                .password(String.valueOf(notesUser.getPassword()))
                .authorities(notesUser.getAuthoritySet())
                .build();
    }

    @Override
    public int createUser(UserDto userDto) {
        NotesUser notesUser = new NotesUser(userDto.getUsername(), passwordEncoder.encode(String.valueOf(userDto.getPassword())));
        int id = notesUserRepository.save(notesUser).getId();
        saveAuthorities(notesUser, id);
        return id;
    }

    private void saveAuthorities(NotesUser notesUser, int id) {
        Set<Authority> authorities = new HashSet<>();
        authorities.add(new Authority(id, UserRole.ROLE_USER.name()));
        notesUser.setAuthoritySet(authorities);

        authorityRepository.saveAll(authorities);
    }

    @Override
    public List<NotesUser> getAllUsers() {
        return notesUserRepository.findAll();
    }

    @Override
    public UserLoginInformationDto authenticate(UserDto userDto) {
        String username = userDto.getUsername();
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(username, String.valueOf(userDto.getPassword())));

        String token = jwtUtil.createToken(username);

        return new UserLoginInformationDto("Bearer " + token, username);
    }
}
