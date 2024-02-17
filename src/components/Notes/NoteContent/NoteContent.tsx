import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { useLogin } from '../../../hooks/useLogin.tsx';
import './NoteContent.css';

export default function NoteContent() { 

  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); 
  const [isEditing, setIsEditing] = useState(false); 

  const [saveConfirm, setSaveConfirm] = useState(false);

  const { updateNote, getNote } = useLogin();

  const { noteId } = useParams<string>();

  const updatePage = useCallback(async () => {
		if (!noteId) return;
		try {
			const resNote = await getNote(noteId);
			setTitle(resNote.title);
			setContent(resNote.content || '');
		} catch (err) {
			console.log(err);
		}
	}, [getNote, noteId]); 

  async function saveNote() { 
    if (!noteId) return;
    const updatedNote = await updateNote(noteId, title, content); 
    setIsEditing(false);
    setTitle(updatedNote.title);
    setContent(updatedNote.content);
  } 

  // TODO: Add variable to notes on the back end called "hasSaved" and set it to false until the note is saved/updated.
  // useEffect(() => {
  //   setIsEditing(note.hasSaved === undefined || note.hasSaved === false); 
  // }, [note.hasSaved]) 

  useEffect(() => {
    console.log('updatePage')
    updatePage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId])

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
            // if (isEditing) {
            //   setContent(note.content)
            //   setTitle(note.title)
            // }
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
