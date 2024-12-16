package com.cooksys.groupfinal.entities;

import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@Data
public class Profile {

    private String firstName;

    private String lastName;

    @Column(nullable = false)
    private String email;

    private String phone;

}
