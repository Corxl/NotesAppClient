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
                console.log(res);
                auth = true;
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(auth)
        return auth;
    } 
    async function login(username: string, password: string) {
        let auth = false;
        await axios.post('http://localhost:3001/users/login', {
            username: username,
            password: password
        }).then((res) => {
            console.log(res);
            auth = true;
        }).catch((err) => {

            console.log(err);
        });
        return auth;
    }
    async function logout() {
        console.log('logout')
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
        console.log("1")
        await axios.get('http://localhost:3001/users/getNotes').then((res) => {
            console.log(res);
            notes = res.data.map((note: NoteResponse) => {
                console.log(note._id);
                return {
                    title: note.title,
                    content: note.contents,
                    id: note._id,
                    hasSaved: true,
                };
            });
            console.log(notes);
        });

        return notes;
    }
    async function addNote(): Promise<PageNote> { 
        const note = (await axios.post('http://localhost:3001/users/addNote')).data as PageNote;
        return note;
    }

    async function deleteNote(id: string) {
        await axios.delete(`http://localhost:3001/users/deleteNote/${id}`).then((res) => {
            console.log(res);
            return true;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    async function updateNote(id: string, title: string, content: string) { 
        var note;
        console.log(id, title, content);
        await axios.post(`http://localhost:3001/users/updateNote`, {title, content, id}).then((res) => {
            console.log(res);
            note = res.data.note;
        }).catch((err) => {
            console.log(err);
            throw new Error('Failed to update note');
        }); 

        return note;
    }

    return { checkAuth, login, logout, register, getNotes, addNote, deleteNote, updateNote };
}

