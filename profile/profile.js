import { updateName } from '../fetch-utils.js';


const nameButtonEl = document.querySelector('#name-button');
const avatarButtonEl = document.querySelector('#avatar-button');

nameButtonEl.addEventListener('click', async () => {
    const nameInputEl = document.querySelector('#name-input');
    const newName = nameInputEl.value;
    const response = await updateName(newName);
    console.log(response);
});

avatarButtonEl.addEventListener('click', async () => {
    const avatarInputEl = document.querySelector('#avatar-input');
    console.log(avatarInputEl);
})