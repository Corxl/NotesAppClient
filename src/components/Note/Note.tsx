import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useCallback, useEffect, useState } from 'react';
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
  const {note, /*onDelete, */ updateNote, index} = props; 

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content); 
  const [isEditing, setIsEditing] = useState(false); 

  const [saveConfirm, setSaveConfirm] = useState(false);

  const refreshPage = useCallback(() => {
    setIsEditing(false); 
    setTitle(note.title);
    setContent(note.content);
  }, [note.title, note.content]);

  function saveNote() {
    updateNote(index, {title: title, content: content});
    setIsEditing(editing => !editing);
    refreshPage();
  } 


  useEffect(() => {
    refreshPage();
  }, [note, refreshPage])

  return (
    <div className='note'>
      <Dialog open={saveConfirm} onClose={() => setSaveConfirm(false)}>
        <DialogTitle>Save Changes?</DialogTitle>

        <DialogActions>
          <Button onClick={() => {
            setSaveConfirm(false) 
          }}>Cancel</Button>
          <Button onClick={() => {
            saveNote();
            setSaveConfirm(false) 
          }}>Save</Button>
        </DialogActions>
      </Dialog> 
      <div className='note-header'>
        <InputTextarea className={'note-content' + (isEditing ? '  note-editing' : '')} onChange={(e) => setTitle(e.target.value)} value={title} rows={2} autoResize readOnly={!isEditing}/>
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
                setSaveConfirm(true);
              }} >
              <SaveIcon />
            </IconButton> 
          }

        </div>
      </div> 
        <div className='note-content-container'>
          <InputTextarea className={'note-content' + (isEditing ? '  note-editing' : '')} onChange={(e) => setContent(e.target.value)} value={content} rows={10} cols={30} autoResize readOnly={!isEditing}/>
      </div>
    </div>
  )
} 
