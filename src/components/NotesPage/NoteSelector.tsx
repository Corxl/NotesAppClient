import { Checkbox } from '@mui/material';
import React, { useEffect } from 'react';

interface NoteSelectorProps {
    note: {
        title: string,
        content: string,
    }
    index: number, 
    setNoteIndex: (index: number) => void,
    notesToDelete: number[],
    enableEditCheckbox: boolean, 
    setNotesToDelete: (notes: number[]) => void,
    selected: boolean
}

export default function NoteSelector(props: NoteSelectorProps) {
    const {note, index, setNoteIndex, selected, setNotesToDelete, notesToDelete, enableEditCheckbox} = props;

    const [checked, setChecked] = React.useState(false);

    useEffect(() => {
        if (checked) {
            setNotesToDelete([...notesToDelete, index]);
        } else {
            setNotesToDelete(notesToDelete.filter((noteIndex) => noteIndex !== index));
        }
    }, [checked])

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                {enableEditCheckbox ? <Checkbox value={checked} onChange={(e)=> setChecked(e.target.checked)}/> : <></>}
                <div style={{gap: "20px",  width: "100%"}}> 
                <div className={'note-selector' + (selected ? ' selected' : '')}  onClick={()=> setNoteIndex(index)}>
                    <div className='note-selector-description' style={{fontSize: "125%"}}>{note.title}</div>
                    <div className='note-selector-description'>{note.content}</div>
                </div> 
                </div> 
            </div>
            <div className='divider'/> 
        </>
    )
}
