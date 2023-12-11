import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton } from '@mui/material';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid';
import './Note.css';

interface NoteProps {
  note: {
    title: string,
    content: string,
    id: typeof uuidv4,
  },
  onDelete: (id: typeof uuidv4) => void
}

export default function Note(props: NoteProps) {
  const {note, onDelete} = props; 
  const {title, id} = note; 

  const [content, setContent] = useState(note.content);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className='note'>
      {/*<Button label='Create Note' className='note-selector' />*/}
      <div className='note-header'>
        <div>
          {title}
        </div>
        <div className='note-buttons'>
          <IconButton className='note-button' onClick={() => setIsEditing(editing => !isEditing)} >
            {
              isEditing ? <EditIcon /> : <EditOutlinedIcon />
            }
          </IconButton> 
          <IconButton className='note-button' onClick={() => {}} >
            <EditIcon />
          </IconButton> 

        </div>
      </div> 
        <div className='note-content-container'>
          <InputTextarea className={'note-content' + (!isEditing ? '  note-content-editing' : '')} value={content} onChange={(e) => setContent(e.target.value)} rows={10} cols={30} autoResize readOnly={isEditing} /> 
      </div>
    </div>
  )
} 
