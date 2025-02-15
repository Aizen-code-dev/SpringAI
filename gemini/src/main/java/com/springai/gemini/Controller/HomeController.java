package com.springai.gemini.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class HomeController {
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("msg", "Welcome to the Chat Application! Ollama is running...");
        return "index";
    }
    
}
