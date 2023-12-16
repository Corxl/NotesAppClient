import { Checkbox } from '@mui/material';
import React, { useEffect } from 'react';

interface NoteSelectorProps {
    note: {
        title: string,
        content: string,
    }
    index: number, 
    setNoteIndex: (index: number) => void,
    notesToDelete: Set<number>,
    selected: boolean
}

export default function NoteSelector(props: NoteSelectorProps) {
    const {note, index, setNoteIndex, selected, notesToDelete} = props;

    const [checked, setChecked] = React.useState(false);

    useEffect(() => {
        if (checked) {
            notesToDelete.add(index);
        } else {
            notesToDelete.delete(index);
        }
    }, [checked, notesToDelete, index])

    return (
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
            <Checkbox value={checked} onChange={(e)=> setChecked(e.target.checked) }/>
            <div style={{gap: "20px",  width: "100%"}} >
                
                <div className={'note-selector' + (selected ? ' selected' : '')}  onClick={()=> setNoteIndex(index)}>
                <div className='note-selector-description' style={{fontSize: "125%"}}>{note.title}</div>
                <div className='note-selector-description'>{note.content}</div>
                </div>
                <div className='divider' key={index + 2}/> 
            </div> 
        </div>
    )
}
