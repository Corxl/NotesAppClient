import { v4 as uuidv4 } from 'uuid';
import { PageNote } from "./NotesPage/NotesPage";


export type NotesPageState = {
	notes: PageNote[];
	noteIndex: number;
	notesToDelete: number[];
};

export type CREATE_NOTE = { type: 'CREATE_NOTE' };
export type DELETE_NOTE = { type: 'DELETE_NOTE'; payload: number };
export type UPDATE_NOTE = {
	type: 'UPDATE_NOTE';
	payload: { index: number; newNote: { title: string; content: string } };
};
export type SET_NOTE_INDEX = { type: 'SET_NOTE_INDEX'; payload: number };
export type SET_NOTES_TO_DELETE = {
	type: 'SET_NOTES_TO_DELETE';
	payload: number[];
};
export type CLEAR_NOTES_TO_DELETE = { type: 'CLEAR_NOTES_TO_DELETE' };

export type NotesPageActions =
	| CREATE_NOTE
	| DELETE_NOTE
	| UPDATE_NOTE
	| SET_NOTE_INDEX
	| SET_NOTES_TO_DELETE
	| CLEAR_NOTES_TO_DELETE;

export function notesPageReducer(
	state: NotesPageState,
	action: NotesPageActions
) : NotesPageState {
	switch (action.type) {
		case 'CREATE_NOTE':
			return {
				...state,
				notes: [
					...state.notes,
					{
						title: 'Untitled Note',
						content: state.notes.length.toString(),
						id: uuidv4(),
					},
				],
				noteIndex: state.notes.length,
			};
		case 'DELETE_NOTE':
			return {
				...state,
				notes: state.notes.filter((_, index) => index !== action.payload),
			};
		case 'UPDATE_NOTE':
			return {
				...state,
				notes: state.notes.map((note, nIndex) => {
					if (nIndex === action.payload.index) {
						return {
							title: action.payload.newNote.title,
							content: action.payload.newNote.content,
							id: note.id,
							hasSaved: true,
						};
					} else {
						return note;
					}
				}),
			};
		case 'SET_NOTE_INDEX':
			return {
				...state,
				noteIndex: action.payload,
			};
		case 'SET_NOTES_TO_DELETE':
			return {
				...state,
				notesToDelete: action.payload,
			};
		case 'CLEAR_NOTES_TO_DELETE':
			return {
				...state,
				notes: state.notes.filter(
					(_, index) => !state.notesToDelete.includes(index)
				),
				notesToDelete: [] as number[],
				noteIndex: -1,
			};
		default:
			return state; 
	}
}
