import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useLogin } from '../../../hooks/useLogin.tsx';
import './NoteContent.css';



export default function NoteContent(props: { showNotification: Function }) { 

  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); 
  const [isEditing, setIsEditing] = useState(false); 
  const notification = useRef<Toast>(null); 

  const showNotification = props.showNotification;

  const [saveConfirm, setSaveConfirm] = useState(false);

  const { updateNote, getNote } = useLogin();

  const { noteId } = useParams<string>();
  const nav = useNavigate()

  const updatePage = useCallback(async () => {
		if (!noteId) return;
		try {
			const resNote = await getNote(noteId);
			setTitle(resNote.title);
			setContent(resNote.content || '');
		} catch (err) { 
			showNotification('Error', err.response.data.msg, 'error');
			nav('/dashboard')
			console.log(err.response.data);
		}
	}, [getNote, noteId, nav, showNotification]); 

  async function saveNote() { 
    let isSuccessful = false;
    try {
      if (!noteId) return;
      const updatedNote = await updateNote(noteId, title, content);
      setIsEditing(false);
      setTitle(updatedNote.title);
      setContent(updatedNote.content); 
      isSuccessful = true;
    } catch (err) {
      // SHOW ERROR TO USER
	  
      console.log(err);
    }
    return isSuccessful;
  } 

  

  // TODO: Add variable to notes on the back end called "hasSaved" and set it to false until the note is saved/updated.
  // useEffect(() => {
  //   setIsEditing(note.hasSaved === undefined || note.hasSaved === false); 
  // }, [note.hasSaved]) 

  useEffect(() => { 
	// if (isLoading.current) return;
	if (!noteId) return;
    console.log('updatePage')
    updatePage();
	// eslint-disable-next-line
  }, [noteId])

  return (
		<>
			<div className="note">
				<Dialog open={saveConfirm} onClose={() => setSaveConfirm(false)}>
					<DialogTitle>Save Changes?</DialogTitle>

					<DialogActions>
						<Button
							onClick={() => {
								setSaveConfirm(false);
							}}>
							Cancel
						</Button>
						<Button
							onClick={async () => {
								const isSaved = await saveNote();
								setSaveConfirm(false);
								if (!isSaved) {
									showNotification(
										'Error',
										'An error occurred while saving your note',
										'error'
									);
								} else {
									showNotification(
										'Note Saved',
										'Your note has been saved',
										'success'
									);
								}
							}}>
							Save
						</Button>
					</DialogActions>
				</Dialog>
				<div className="note-header">
					<InputTextarea
						className={'note-content' + (isEditing ? '  note-editing' : '')}
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						rows={2}
						autoResize
						readOnly={!isEditing}
					/>
					<div className="note-buttons">
						<IconButton
							className="note-button"
							onClick={() => {
								setIsEditing((editing) => !editing);
								// if (isEditing) {
								//   setContent(note.content)
								//   setTitle(note.title)
								// }
							}}>
							{!isEditing ? <EditIcon /> : <EditOutlinedIcon />}
						</IconButton>
						{isEditing && (
							<IconButton
								className="note-button"
								onClick={() => {
									setSaveConfirm(true);
								}}>
								<SaveIcon />
							</IconButton>
						)}
					</div>
				</div>
				<div className="note-content-container">
					<InputTextarea
						className={'note-content' + (isEditing ? '  note-editing' : '')}
						onChange={(e) => setContent(e.target.value)}
						value={content}
						rows={10}
						cols={30}
						autoResize
						readOnly={!isEditing}
					/>
				</div>
			</div>
			<Toast ref={notification} position="bottom-right" />
		</>
	);
} 
