const SUPABASE_URL = 'https://sushgnkqkgfdkwxudpdy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1c2hnbmtxa2dmZGt3eHVkcGR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAwNjEyMDEsImV4cCI6MTk3NTYzNzIwMX0.PWaLx9CyI6jaOzBx-1JPnId6_IrMlC4rYSEFZtsLwPw';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    // do we have a user?
    if (!user) {
        // path is different if we are at home page versus any other page
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        // include the current url as a "redirectUrl" search param so user can come
        // back to this page after they sign in...
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }

    // return the user so can be used in the page if needed
    return user;
}

export async function signUpUser(email, password) {
    const response = await client.auth.signUp({
        email,
        password,
    });
    const user = await getUser();
    await client.from('chat_profiles').insert({ user_name: email, id: user.id });
    
    return response;
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function insertChat(chatValue) {
    const response = await client.from('chat_comments').insert(chatValue);
    return checkError(response);
}

export async function readComments() {
    const response = await client.from('chat_comments').select('*');
    return checkError(response);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

export async function updateName(name) {
    const user = getUser();

    const response = await client.from('chat_profiles').update({ user_name: name }).match({ id: user.id });

    console.log(response);
    return response;
}