import { Checkbox } from '@mui/material';
import React, { useEffect } from 'react';
import { NotesPageActions, NotesPageState } from '../NotesPage/NotesPage';
import './NoteSelector.css';

interface NoteSelectorProps {
	notesState: NotesPageState;
	notesDispatch: React.Dispatch<NotesPageActions>;
    enableEditCheckbox: boolean;
    index: number;
}

export default function NoteSelector({ notesState, notesDispatch, enableEditCheckbox, index}: NoteSelectorProps) {
    const selected = notesState.noteIndex === index;
	const [checked, setChecked] = React.useState(false);
    const note = notesState.notes[index];

	useEffect(() => {
		if (checked) {
			notesDispatch({
				type: 'SET_NOTES_TO_DELETE',
				payload: [...notesState.notesToDelete, index],
			});
		} else {
			notesDispatch({
				type: 'SET_NOTES_TO_DELETE',
				payload: notesState.notesToDelete.filter(
					(noteIndex) => noteIndex !== index
				),
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checked]);

	useEffect(() => {
		if (notesState.notesToDelete.length === 0) {
			setChecked(false);
		}
	}, [notesState]);

	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
				{enableEditCheckbox ? (
					<Checkbox
						checked={checked}
						value={checked}
						color="default"
						onChange={(e) => setChecked(e.target.checked)}
					/>
				) : (
					<></>
				)}
				<div style={{ gap: '20px', width: '100%' }}>
					<div
						className={'note-selector' + (selected ? ' selected' : '')}
						onClick={() => notesDispatch({type: 'SET_NOTE_INDEX', payload: index })}>
						<div
							className="note-selector-description"
							style={{ fontSize: '125%' }}>
							{note.title}
						</div>
						<div className="note-selector-description">{note.content}</div>
					</div>
				</div>
			</div>
			<div className="divider" />
		</>
	);
}
