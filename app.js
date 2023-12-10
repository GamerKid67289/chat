// app.js
var messages = [];

function sendMessage() {
    var nameInput = document.getElementById('name-input');
    var messageInput = document.getElementById('message-input');
    var name = nameInput.value.trim();
    var message = messageInput.value.trim();

    if (name !== '' && message !== '') {
        fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, message: message }),
        })
        .then(response => response.json())
        .then(data => {
            messages = data.messages;
            updateChat();
        });

        nameInput.value = '';
        messageInput.value = '';
    }
}

function updateChat() {
    var chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';

    messages.forEach(function (msg) {
        var newMessage = document.createElement('p');
        newMessage.textContent = msg.name + ': ' + msg.message;
        chatMessages.appendChild(newMessage);
    });
}

setInterval(function() {
    fetch('/get-messages')
        .then(response => response.json())
        .then(data => {
            messages = data.messages;
            updateChat();
        });
}, 2000);
