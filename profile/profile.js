import { updateName, getUser, upsert } from '../fetch-utils.js';


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
    const user = getUser();
    const imageName = avatarInputEl.value;
    const imageFile = `${user.id}/${avatarInputEl.files[0]}`;
    console.log('img', imageName);
    await upsert(imageName, imageFile);
});