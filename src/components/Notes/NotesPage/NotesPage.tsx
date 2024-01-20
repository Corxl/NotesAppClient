import 'primeicons/primeicons.css';
import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../context/LoginContext.tsx';
import NoteContent from '../NoteContent/NoteContent.tsx';
import { DefaultNotePage } from '../NoteContent/index.js';
import NoteList from '../NoteList/NoteList.tsx';
import { notesPageReducer } from '../notesReducer.tsx';
import './NotesPage.css';
import Navbar from '../../NavBar/Navbar.tsx';

export interface PageNote {
	title: string;
	content: string;
	hasSaved?: boolean;
	id: string;
} 

export default function NotesPage() { 
  const [state, dispatch] = useReducer(notesPageReducer, {
    notes: [], 
    noteIndex: -1, // replace with URL params for index
    notesToDelete: []
  }); 
  return (
		<>
			<Navbar />
			<div className="notes-container">
				<NoteList notesState={state} notesDispatch={dispatch} />

				{state.noteIndex >= 0 ? (
					<NoteContent notesState={state} notesDispatch={dispatch} />
				) : (
					<DefaultNotePage notesDispatch={dispatch} />
				)}
			</div>
		</>
	);
}
