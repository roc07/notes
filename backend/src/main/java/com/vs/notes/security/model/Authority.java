package com.vs.notes.security.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "authority")
public class Authority implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "user_id")
    private int userId;
    private String authority;

    public Authority() {}

    public Authority(int userId, String authority) {
        this.userId = userId;
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return authority;
    }

}
