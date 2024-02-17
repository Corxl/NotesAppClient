import { Checkbox } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NoteSelector.css';

interface NoteSelectorProps {
    enableEditCheckbox: boolean;
	noteInfo: {
		title: string;
		content: string;
		id: string;
	}
	isSelected: boolean;
}

export default function NoteSelector({ enableEditCheckbox, noteInfo, isSelected }: NoteSelectorProps) {

	const [checked, setChecked] = React.useState(false); 
	const nav = useNavigate(); 

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
						className={'note-selector' + (isSelected ? ' selected' : '')}
						onClick={() => {
							// notesDispatch({ type: 'SET_NOTE_INDEX', payload: index }); 
							nav(`/dashboard/${noteInfo.id}`);
						}}>
						<div
							className="note-selector-description"
							style={{ fontSize: '125%' }}>
							{noteInfo.title}
						</div>
						<div className="note-selector-description">{noteInfo.content}</div>
					</div>
				</div>
			</div>
			<div className="divider" />
		</>
	);
}
