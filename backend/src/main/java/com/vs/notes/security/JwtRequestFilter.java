package com.vs.notes.security;

import com.vs.notes.security.service.userdetail.NotesUserDetailsService;
import com.vs.notes.security.service.util.JwtUtil;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";

    private NotesUserDetailsService notesUserDetailsService;
    private JwtUtil jwtUtil;

    @Autowired
    private void setNotesUserDetailsService(NotesUserDetailsService notesUserDetailsService) {
        this.notesUserDetailsService = notesUserDetailsService;
    }

    @Autowired
    private void setJwtUtil(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        String jwt;
        String username;
        String token = httpServletRequest.getHeader(AUTHORIZATION);

        if (Strings.isNotEmpty(token) && token.startsWith(BEARER)) {
            jwt = token.replace(BEARER, "");
            username = jwtUtil.extractUsername(jwt);
        } else {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        if (Strings.isNotEmpty(username) && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = notesUserDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
