import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton } from '@mui/material';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid';
import './Note.css';

interface NoteProps {
  note: {
    title: string,
    content: string,
    id: typeof uuidv4
  },
  index: number,
  onDelete: (id: typeof uuidv4) => void,
  updateNote: (id: typeof uuidv4, note: {title: string, content: string}) => void
}

export default function Note(props: NoteProps) {
  const {note, onDelete, updateNote, index} = props; 
  const { id } = note; 

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content); 

  const [isEditing, setIsEditing] = useState(false); 

  function refreshPage() {
    setIsEditing(false); 
    setTitle(note.title);
    setContent(note.content);
  }

  useEffect(() => {
    console.log("ran");
    refreshPage();
  }, [note])

  return (
    <div className='note'>
      {/*<Button label='Create Note' className='note-selector' />*/}
      <div className='note-header'>
        <div>
          {note.title}
        </div>
        <div className='note-buttons'>
          <IconButton className='note-button' onClick={() => {
            setIsEditing(editing => !editing)
            if (isEditing) {
              setContent(note.content)
              setTitle(note.title)
            }
          }} >
            {
              !isEditing ? <EditIcon /> : <EditOutlinedIcon />
            }
          </IconButton> 
          {isEditing &&
            <IconButton className='note-button' onClick={() => {
                updateNote(index, {title: title, content: content});
                setIsEditing(editing => !editing);
                refreshPage();
              }} >
              <SaveIcon />
            </IconButton> 
          }

        </div>
      </div> 
        <div className='note-content-container'>
          <InputTextarea className={'note-content' + (isEditing ? '  note-content-editing' : '')} onChange={(e) => setContent(e.target.value)} value={content} rows={10} cols={30} autoResize readOnly={!isEditing}/>
      </div>
    </div>
  )
} 