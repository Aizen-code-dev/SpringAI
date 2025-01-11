var stompClient = null;
var isLoading = false;

function connect() {
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function (message) {
            showMessage(JSON.parse(message.body));
        });
    });
}

function sendMessage() {
    var messageContent = document.getElementById('messageInput').value;
    if (messageContent.trim() === "") {
        return; // Prevent sending empty messages
    }
    var chatMessage = {
        content: messageContent,
        sender: 'User  '
    };
    showMessage(chatMessage); // Show user's message immediately
    document.getElementById('messageInput').value = '';

    // Show loader for AI response
    showLoader();

    stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
}

function showMessage(message) {
    var chatBox = document.getElementById('chatBox');
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + (message.sender === 'User  ' ? 'user' : 'ai');
    messageDiv.innerHTML = '<strong>' + message.sender + ':</strong> ' + message.content;

    // Remove loader if it's an AI message
    if (message.sender !== 'User  ') {
        removeLoader();
    }

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

function showLoader() {
    if (!isLoading) {
        var loaderDiv = document.createElement('div');
        loaderDiv.id = 'wifi-loader'; // Use the new loader ID
        loaderDiv.innerHTML = `
            <svg class="circle-outer" viewBox="0 0 86 86">
                <circle class="back" cx="43" cy="43" r="40"></circle>
                <circle class="front" cx="43" cy="43" r="40"></circle>
                <circle class="new" cx="43" cy="43" r="40"></circle>
            </svg>
            <svg class="circle-middle" viewBox="0 0 60 60">
                <circle class="back" cx="30" cy="30" r="27"></circle>
                <circle class="front" cx="30" cy="30" r="27"></circle>
            </svg>
            <svg class="circle-inner" viewBox="0 0 34 34">
                <circle class="back" cx="17" cy="17" r="14"></circle>
                <circle class="front" cx="17" cy="17" r="14"></circle>
            </svg>
            <div class="text" data-text=""></div>
        `;
        document.getElementById('chatBox').appendChild(loaderDiv);
        isLoading = true;
    }
}

function removeLoader() {
    var loader = document.getElementById('wifi-loader'); // Use the new loader ID
    if (loader) {
        loader.remove();
        isLoading = false;
    }
}
document.getElementById('sendButton').onclick = sendMessage;

connect();