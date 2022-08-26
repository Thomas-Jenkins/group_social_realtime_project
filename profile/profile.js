import { updateName, getUser, upsert } from '../fetch-utils.js';

const nameButtonEl = document.querySelector('#name-button');
const avatarForm = document.querySelector('#avatar-form');

nameButtonEl.addEventListener('click', async () => {
    const nameInputEl = document.querySelector('#name-input');
    const newName = nameInputEl.value;
    const response = await updateName(newName);
    console.log(response);
});

avatarForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(avatarForm);
    const imageFile = data.get('avatar-input');
    const user = getUser();
    const imageName = `${user.id}/${imageFile.name}`;
    await upsert(imageName, imageFile);
});

