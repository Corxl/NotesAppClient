import axios from "axios";
import { PageNote } from "../components/Notes/NotesPage/NotesPage";

axios.defaults.withCredentials = true;

/* 
TODO: refactor note data types to match better with the server
*/ 
type NoteResponse = {
	_id: string;
	title: string;
	owner: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	contents: string;
};

export function useLogin() {
    async function checkAuth(): Promise<boolean> {
        let auth = false;
        
        await axios
            .get('http://localhost:3001/users/isAuth')
            .then((res) => {
                auth = true;
            })
            .catch((err) => {
                console.log(err);
            });
        return auth;
    } 
    async function login(username: string, password: string) {
        let auth = false;
        await axios.post('http://localhost:3001/users/login', {
            username: username,
            password: password 
        }).then((res) => {
            auth = true;
        }).catch((err) => {

            console.log(err);
        });
        return auth;
    }
    async function logout() {
        await axios.post('http://localhost:3001/users/logout').catch((err) => {
            console.log(err);
        });
    }

    async function register(username: string, password: string) {
        let isSuccessful = false;
        await axios.post('http://localhost:3001/users/register', {
            username: username,
            password: password
        }).then((res) => {
            console.log(res);
            isSuccessful = true;
        });
        return isSuccessful;
    }

    // TODO: get return values should only contain the title, content, and access ID. 
    // Create getNote(id: string) function to get the note by ID when the user clicks on a note selector.
    async function getNotes() {
        let notes = [] as PageNote[]; 
        await axios.get('http://localhost:3001/users/getNotes').then((res) => {
            notes = res.data.map((note: NoteResponse) => {
                console.log(note._id);
                return {
                    title: note.title,
                    content: note.contents,
                    id: note._id,
                    hasSaved: true,
                };
            });
        });

        return notes;
    }

    async function getNote(id: string) {
        let note = {} as PageNote;
        await axios.get(`http://localhost:3001/users/getNote/${id}`).then((res) => {
            note = {
                title: res.data.title,
                content: res.data.contents,
                id: res.data._id,
                hasSaved: true,
            };
        });

        return note;
    }
    async function addNote(): Promise<PageNote> { 
        const note = (await axios.post('http://localhost:3001/users/addNote')).data as PageNote;
        return note;
    }

    // refactor so this actually returns a value
    async function deleteNote(id: string) {
        await axios.delete(`http://localhost:3001/users/deleteNote/${id}`).then((res) => { 
            return true;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    async function updateNote(id: string, title: string, content: string) { 
        var note;
        await axios.post(`http://localhost:3001/users/updateNote/${id}`, {title, content}).then((res) => { 
            note = res.data.note;
        }).catch((err) => {
            console.log(err);
            throw new Error('Failed to update note');
        }); 

        return note;
    }

    return { checkAuth, login, logout, register, getNotes, getNote, addNote, deleteNote, updateNote };
}

