package com.ai.gemini_chat;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ai.gemini_chat.Entity.Conversation;
import com.ai.gemini_chat.Repository.ConversationRepository;
import com.ai.gemini_chat.Services.QnAService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/qna")
public class AIController {

	 @Autowired
	    private final QnAService qnAService;

	    @Autowired
	    private final ConversationRepository conversationRepository; 
	    

	    @PostMapping("/ask")
	    public ResponseEntity<String> askQuestion(@RequestBody String question){
	        

	        List<Conversation> previousConversations = conversationRepository.findAll();
	        StringBuilder conversationHistory = new StringBuilder();
	        for (Conversation conversation : previousConversations) {
	            conversationHistory.append("User: ").append(conversation.getUserMessage()).append("\n");
	            conversationHistory.append("AI: ").append(conversation.getAiResponse()).append("\n");
	        }
	       
	        String instruction = "Your name is Master your job is to assist with user query and resolve in proper manner always greet when you start conversation and your creator name is Sachin Vishwakarma";
	        String fullPrompt =instruction + conversationHistory.toString() + "User: " + question;

	       
	        String answer = qnAService.getAnswer(fullPrompt);

	        Conversation conversation = new Conversation();
	        conversation.setUserMessage(question);
	        conversation.setAiResponse(answer);
	        conversationRepository.save(conversation);

	        return ResponseEntity.ok(answer);
	        
	    }
}
