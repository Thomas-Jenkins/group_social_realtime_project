// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser, getUser, insertChat, readComments } from './fetch-utils.js';
// pure rendering (data --> DOM):

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
const user = checkAuth();

displayAllChats();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);

const chatInputEl = document.querySelector('#chat-input');
const chatButtonEl = document.querySelector('#chat-button');
const liveChatEl = document.querySelector('#live-chat');

chatButtonEl.addEventListener('click', async () => {
    liveChatEl.innerHTML = '';
    const chatValue = chatInputEl.value;
    const chatEntry = { contents: chatValue, username: user.email };
    const response = await insertChat(chatEntry);
    displayAllChats();
    chatInputEl.value = '';
    return response;
});

async function displayAllChats() {
    const chats = await readComments();
    console.log('chats', chats);
    for (let chat of chats) {
        const temp = renderChat(chat);
        console.log('temp', temp);
        liveChatEl.append(temp);
    
    }

}

function renderChat(chat) {
    const chatDiv = document.createElement('div');
    const chatContent = document.createElement('p');

    chatContent.textContent = `${chat.username}: ${chat.contents}`;

    chatDiv.append(chatContent);
    return chatDiv;
}

window.addEventListener('load', async () => {

});
