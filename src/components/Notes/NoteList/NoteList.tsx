import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Button, IconButton, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NoteSelector from '../NoteSelector/NoteSelector.tsx';
import { NotesPageActions, NotesPageState } from '../NotesPage/NotesPage';
import './NoteList.css';

interface NoteListProps {
  notesState: NotesPageState,
  notesDispatch: React.Dispatch<NotesPageActions>
}

export default function NoteList(props: NoteListProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [editList, setEditList] = useState<boolean>(false);
//   const { notes, setNotes, noteIndex, setNoteIndex, notesToDelete, setNotesToDelete, createNote } = props
  const  {notesState, notesDispatch}  = props;

  console.log(notesState.notesToDelete)
  console.log(notesState.notes)
  
   useEffect(() => {
		// simulate loading
		if (notesState.notes.length > 0) {
			setLoading(false);
			return;
		}
		setTimeout(() => {
			setLoading(false);
		}, 2500);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); 	
  return (
		<div className="notes-list">
			<div className="list-actions">
				{editList === true && notesState.notes.length > 0 ? (
					<IconButton
						onClick={() => notesDispatch({type: 'CLEAR_NOTES_TO_DELETE'})}
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
					onClick={() => notesDispatch({type: 'CREATE_NOTE'})}
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
			{notesState.notes.map((note, index) => {
				return (
					<NoteSelector notesState={notesState} notesDispatch={notesDispatch} enableEditCheckbox={editList} index={index}/> 
				);
			})}
			<Button content="Refresh" />
		</div>
	);
}
