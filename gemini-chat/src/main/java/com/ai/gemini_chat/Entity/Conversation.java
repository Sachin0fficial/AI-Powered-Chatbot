package com.ai.gemini_chat.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;

@Data
@Entity
public class Conversation {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 @Lob
	 @Column(name = "userMessage", columnDefinition = "LONGTEXT")
	 private String userMessage;
	 @Lob
	 @Column(name = "aiResponse", columnDefinition = "LONGTEXT")
	 private String aiResponse;
	 

}
