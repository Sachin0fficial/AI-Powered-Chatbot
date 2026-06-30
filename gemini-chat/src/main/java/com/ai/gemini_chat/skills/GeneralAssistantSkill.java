package com.ai.gemini_chat.skills;

import org.springframework.stereotype.Component;

@Component
public class GeneralAssistantSkill implements Skill {

    @Override
    public String getId() {
        return "general";
    }

    @Override
    public String getName() {
        return "General Assistant";
    }

    @Override
    public String getDescription() {
        return "Your all-purpose AI assistant for everyday questions and tasks.";
    }

    @Override
    public String getIcon() {
        return "robot";
    }

    @Override
    public String getSystemPrompt() {
        return """
            Your name is Master. You assist users with their queries in a clear, helpful manner.
            Always greet the user when starting a new conversation.
            Your creator is Sachin Vishwakarma.
            Be concise, accurate, and friendly.
            """;
    }
}
