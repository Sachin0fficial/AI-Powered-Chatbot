package com.ai.gemini_chat.Services;

import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class QnAService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public QnAService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    public String getAnswer(String question) {
        if (geminiApiKey == null || geminiApiKey.isBlank()) {
            return "Gemini API key is not configured. Set GEMINI_API_KEY environment variable.";
        }

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[] {
                        Map.of("parts", new Object[] {
                                Map.of("text", question)
                        })
                }
        );

        try {
            String response = webClient.post()
                    .uri(geminiApiUrl + geminiApiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return extractModelResponse(response);
        } catch (WebClientResponseException e) {
            return "AI service error: " + e.getStatusCode().value() + ". Please try again later.";
        } catch (Exception e) {
            return "Unable to reach AI service. Please try again later.";
        }
    }

    private String extractModelResponse(String jsonResponse) {
        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            JsonNode candidates = rootNode.path("candidates");
            if (candidates.isEmpty()) {
                JsonNode error = rootNode.path("error").path("message");
                return error.isMissingNode() ? "No response from AI." : error.asText();
            }
            return candidates.get(0)
                    .path("content").path("parts").get(0)
                    .path("text").asText();
        } catch (Exception e) {
            return "Error parsing AI response. Please try again.";
        }
    }
}
