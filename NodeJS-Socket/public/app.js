const socket = io();

const userList = document.getElementById('userList');
// const ul = document.createElement('users');
const chat = document.getElementById('chat');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('userMessage');

const user = prompt("Enter your name");

socket.emit('join', user);

socket.on('userList', (usersList) => {
    showUserList(usersList);
})

messageForm.addEventListener('submit', getUserMessage);

socket.on('userMessage', (data) => {
    chat.innerHTML += `<p><strong>${data.user}:</strong> ${data.message}</p>`;
    chat.scrollTop = chat.scrollHeight;
})


socket.on('updatedUserList', (usersList) => {
    showUserList(usersList);
});

function getUserMessage(event) {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chatMessage', { user, message });
        messageInput.value = '';
    }
}

function showUserList(users) {
    userList.innerHTML = '';
    const ul = document.createElement('ul');

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        ul.appendChild(li);
    });

    userList.appendChild(ul);
    userList.scrollTop = userList.scrollHeight;
}

