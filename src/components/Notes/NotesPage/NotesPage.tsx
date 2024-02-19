import 'primeicons/primeicons.css';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../NavBar/Navbar.tsx';
import NoteContent from '../NoteContent/NoteContent.tsx';
import { DefaultNotePage } from '../NoteContent/index.js';
import NoteList from '../NoteList/NoteList.tsx';
import './NotesPage.css'; 
import { Toast } from 'primereact/toast';
export interface PageNote {
	title: string;
	content: string;
	hasSaved?: boolean;
	id: string;
} 

export default function NotesPage() { 

	const { noteId } = useParams<string>();
	useEffect(() => {
		console.log('updatePage');
	}, []); 
  return (
		<>
			<Navbar />
			<div className="notes-container">
				<NoteList />

				{noteId ? <NoteContent /> : <DefaultNotePage />}
			</div>
		</>
	);
}
