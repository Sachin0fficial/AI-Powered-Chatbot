package com.ai.gemini_chat.Repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.ai.gemini_chat.Entity.Conversation;

public interface ConversationRepository extends JpaRepository<Conversation, Integer>{
	

}
