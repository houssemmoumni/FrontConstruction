import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/chat-socket")
public class WebSocketController {

    private List<ChatMessage> chatMessages = new ArrayList<>();

    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public ChatMessage chat(@DestinationVariable String roomId, ChatMessage message) {
        System.out.println(message);
        chatMessages.add(message);
        return new ChatMessage(HtmlUtils.htmlEscape(message.getMessage()), message.getUser());
    }

    @GetMapping("/api/chats")
    public List<ChatMessage> getChats() {
        return chatMessages;
    }
}
