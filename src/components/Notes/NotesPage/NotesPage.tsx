
import 'primeicons/primeicons.css';
import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NoteContent from '../NoteContent/NoteContent.tsx';
import { DefaultNotePage } from '../NoteContent/index.js';
import NoteList from '../NoteList/NoteList.tsx';
import './NotesPage.css';
import { notesPageReducer } from '../notesReducer.tsx';

export interface PageNote {
	title: string;
	content: string;
	hasSaved?: boolean;
	id: typeof uuidv4;
} 

export default function NotesPage() { 
  const [state, dispatch] = useReducer(notesPageReducer, {notes: [], noteIndex: -1, notesToDelete: []}); 
  return (
    <div className='notes-container'>
      <NoteList notesState={state} notesDispatch={dispatch} />

      {state.noteIndex >= 0 ? <NoteContent notesState={state} notesDispatch={dispatch}/> : <DefaultNotePage notesDispatch={dispatch}/>}
    </div>
  )
}
