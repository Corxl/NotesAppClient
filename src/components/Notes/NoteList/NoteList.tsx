import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Button, IconButton, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLogin } from '../../../hooks/useLogin.tsx';
import NoteSelector from '../NoteSelector/NoteSelector.tsx';
import { PageNote } from '../NotesPage/NotesPage.tsx';
import './NoteList.css';

export default function NoteList(props) {
	const [loading, setLoading] = useState<boolean>(true);
	const [editList, setEditList] = useState<boolean>(false);
	//   const { notes, setNotes, noteIndex, setNoteIndex, notesToDelete, setNotesToDelete, createNote } = props
	const { getNotes, addNote } = useLogin(); 
	const [noteList, setNoteList] = useState<PageNote[]>([]);
	const { noteId } = useParams<string>();


	async function updateNoteList() {
		setLoading(true);
		try {
			const notes = await getNotes();
			console.log(notes);
			setNoteList(notes);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	}

	useEffect(() => { 
		updateNoteList(); 
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function handleAddNote() {
		const note = await addNote();
		console.log(note);
		updateNoteList();
	}
	return (
		<div className="notes-list">
			<div className="list-actions">
				{editList === true && noteList.length > 0 ? (
					<IconButton
						onClick={() => {/*notesDispatch({ type: 'CLEAR_NOTES_TO_DELETE'*/}}
						size="small"
						style={{ width: 'fit-content' }}>
						<DeleteIcon
							style={{ width: '30px', height: '30px', color: 'white' }}
						/>
					</IconButton>
				) : (
					<></>
				)}

				<IconButton
					onClick={() => setEditList((e) => !e)}
					size="small"
					style={{ width: 'fit-content' }}>
					{!editList ? (
						<EditOutlinedIcon
							style={{ width: '30px', height: '30px', color: 'white' }}
						/>
					) : (
						<EditIcon
							style={{ width: '30px', height: '30px', color: 'white' }}
						/>
					)}
				</IconButton>
				<IconButton
					onClick={handleAddNote}
					size="small"
					style={{ width: 'fit-content' }}>
					<AddBoxTwoToneIcon
						style={{ width: '30px', height: '30px', color: 'white' }}
					/>
				</IconButton>
			</div>
			{loading &&
				[...Array(7)].map((_, index) => {
					return (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								height: 'auto',
								gap: '10px',
								padding: '5px',
							}}
							key={index}>
							<Skeleton
								variant="rectangular"
								width="70%"
								height="15px"
								animation="wave"
							/>
							<Skeleton
								variant="rectangular"
								width="90%"
								height="10px"
								animation="wave"
							/>
							<Skeleton
								variant="rectangular"
								width="85%"
								height="10px"
								animation="wave"
							/>
							<Skeleton
								variant="rectangular"
								width="100%"
								height="5px"
								animation="wave"
							/>
						</div>
					);
				})}
			{noteList.map((n, index) => {
				return (
					<NoteSelector
						enableEditCheckbox={editList}
						noteInfo={{title: n.title, content: n.content, id: n.id}}
						isSelected={noteId === n.id}
						key={index}
					/>
				);
			})}
			<Button content="Refresh" />
		</div>
	);
}
