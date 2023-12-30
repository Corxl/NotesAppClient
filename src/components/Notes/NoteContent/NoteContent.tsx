import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { NotesPageActions, NotesPageState } from '../notesReducer.tsx';
import './NoteContent.css';


interface NoteProps {
	notesState: NotesPageState;
  notesDispatch: React.Dispatch<NotesPageActions>;
}

export default function NoteContent(props: NoteProps) {
  const {notesState, notesDispatch} = props; 
  const note  = notesState.notes[notesState.noteIndex];

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content); 
  const [isEditing, setIsEditing] = useState(false); 

  const [saveConfirm, setSaveConfirm] = useState(false);

  const refreshPage = useCallback(() => { 
    setTitle(note.title);
    setContent(note.content);
    
  }, [note.title, note.content]); 
  function saveNote() {
    notesDispatch({type: 'UPDATE_NOTE', payload: {index: notesState.noteIndex, newNote: {title: title, content: content}}})
    setIsEditing(editing => !editing);
    refreshPage(); 
  } 

  useEffect(() => {
    setIsEditing(note.hasSaved === undefined || note.hasSaved === false); 
  }, [note.hasSaved])


  useEffect(() => {
    refreshPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notesState])

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
