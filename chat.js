const form = document.querySelector');
const messageInput = document.querySelector('#message');
const sendButton = document.querySelector('button[type="button"]');
const chatLog = document.querySelector('#chat-log');

let userName = prompt('Enter your name:');
let userColor = prompt('Choose a color for your name:');

// Function to send a message
function sendMessage() {
  const message = messageInput.value;
  messageInput.value = '';
  sendButton.disabled = true;
  fetch('/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      userName,
      userColor
    })
  })
  .then(response => response.json())
  .then(data => {
    const messageElement = document.createElement('div');
    messageElement.innerText = `${userName}: ${message}`;
    messageElement.style.color = userColor;
    chatLog.appendChildElement);
    chatLog.scrollTop = chatLog.scrollHeight;
    sendButton.disabled = false;
  })
  .catch(error => console.error(error));
}

// Add event listener to form
form.addEventListener('submit', e => {
  e.preventDefault();
  sendMessage();
});
