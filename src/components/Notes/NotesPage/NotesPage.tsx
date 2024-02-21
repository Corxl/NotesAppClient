import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../NavBar/Navbar.tsx';
import NoteContent from '../NoteContent/NoteContent.tsx';
import { DefaultNotePage } from '../NoteContent/index.js';
import NoteList from '../NoteList/NoteList.tsx';
import './NotesPage.css';
export interface PageNote {
	title: string;
	content: string;
	hasSaved?: boolean;
	id: string;
} 

export default function NotesPage() { 

	const { noteId } = useParams<string>();
	const notification = useRef<Toast>(null);
	function showNotification(
		summary: string,
		detail: string,
		severity: 'success' | 'info' | 'warn' | 'error' | undefined = 'info'
	) {
		notification.current?.show({
			severity: severity,
			summary: summary,
			detail: detail,
		});
	}
	useEffect(() => {
		console.log('updatePage');
	}, []); 
  return (
		<>
			<Navbar />
			<div className="notes-container">
				<NoteList />

				{noteId ? <NoteContent showNotification={showNotification} /> : <DefaultNotePage />}
			</div>
			<Toast ref={notification} />
		</>
	);
}
