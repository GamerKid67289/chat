
document.addEventListener("DOMContentLoaded", function() {
    var messageInput = document.getElementById("message-input");
    var sendButton = document.getElementById("send-button");
    var chatMessages = document.getElementById("chat-messages");
  
    sendButton.addEventListener("click", function() {
      var message = messageInput.value;
      if (message.trim() !== "") {
        var messageElement = document.createElement("div");
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        messageInput.value = "";
      }
    });
  
    messageInput.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        sendButton.click();
      }
    });
  });