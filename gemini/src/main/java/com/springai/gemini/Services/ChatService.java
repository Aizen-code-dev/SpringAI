package com.springai.gemini.Services;


import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.stereotype.Service;

import com.springai.gemini.model.ChatMessage;

@Service
public class ChatService {
    private final OllamaChatModel chatModel;

    public ChatService(OllamaChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public ChatMessage sendMessage(ChatMessage message) {
        // Call the Ollama model to get a response
        String aiResponse = chatModel.call(message.getContent());
        return new ChatMessage(aiResponse, "AI");
    }
}