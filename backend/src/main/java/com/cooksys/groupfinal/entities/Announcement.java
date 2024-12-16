package com.cooksys.groupfinal.entities;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import jakarta.persistence.*;

import org.springframework.data.annotation.CreatedDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class Announcement {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@CreatedDate
    private Timestamp date = Timestamp.valueOf(LocalDateTime.now());
	
	private String title;
	
	private String message;
	
	@ManyToOne
	private Company company;
	
	@ManyToOne
	private User author;

}
