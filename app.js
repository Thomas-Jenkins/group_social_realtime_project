// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser, getUser, insertChat } from './fetch-utils.js';
// pure rendering (data --> DOM):

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);

const chatInputEl = document.querySelector('#chat-input');
const chatButtonEl = document.querySelector('#chat-button');

chatButtonEl.addEventListener('click', async () => {
    const chatValue = chatInputEl.value;
    const chatEntry = { contents: chatValue, username: user.email };
    const response = await insertChat(chatEntry);

});

console.log(user.email);