
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { Checkbox, IconButton, Skeleton } from '@mui/material';
import 'primeicons/primeicons.css';
import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Note from '../Note/Note.tsx';
import { DefaultNotePage } from '../Note/index.js';
import './NotesPage.css';

interface PageNote {
  title: string,
  content: string,
  id: typeof uuidv4
} 

export default function NotesPage() { 

  const [noteIndex, setNoteIndex] = useState(-1);

  const [notes, setNotes] = useState<PageNote[]>([{
    title: 'Welcome to Notes App!',
    content: 'Click the button below to create a new note!',
    id: uuidv4()
  }])

  const [loading, setLoading] = useState<boolean>(true)

  function createNote() { 
    setNotes([...notes, {title: 'Untitled Note', content: '', id: uuidv4()}]);
    setNoteIndex(notes.length);
  } 
    

  const deleteNote = useCallback((targetIndex: number) => {
    setNotes(notes.filter((_, index) => index !== targetIndex)) 
  }, [notes]) 

  function updateNote (index: number, newNote: {title: string, content: string}) {
    setNotes(notes.map((note, nIndex) => { 
      if (nIndex === index) {
        return {title: newNote.title, content: newNote.content, id: note.id};
      } else {
        return note;
      }
    }))
  }

  useEffect(() => { // simulate loading
    if (notes.length > 0) {
      setLoading(false);
      return;
    }
     setTimeout(() => {
      setLoading(false);
     }, 2500);
  }, [])  

  return (
    <div className='notes-container'>
      <div className='notes-list'>
        {loading && 
          [...Array(7)].map((_, index) => {
            return (
            <div style={{display: "flex", flexDirection: "column", width: "100%", height: "auto", gap: "10px", padding: "5px"}} key={index}>
              <Skeleton variant='rectangular' width='70%' height='15px' animation='wave' />
              <Skeleton variant='rectangular' width='90%' height='10px' animation='wave' />
              <Skeleton variant='rectangular' width='85%' height='10px' animation='wave' />
              <Skeleton variant='rectangular' width='100%' height='5px' animation='wave' />
            </div>
            )
          })
        }
        {
          notes.map((note, index) => {
            return (
              <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                <Checkbox />
                <div style={{gap: "20px",  width: "100%"}} key={index}>
                  
                  <div className={'note-selector' + (noteIndex === index ? ' selected' : '')} key={index + 1} onClick={()=> setNoteIndex(index)}>
                    <div className='note-selector-description' style={{fontSize: "125%"}} key={note.title}>{note.title}</div>
                    <div className='note-selector-description' key={note.content}>{note.content}</div>
                  </div>
                  <div className='divider' key={index + 2}/> 
                </div> 
              </div>
            )
          })
        }
        {!loading && 
        <div style={{display: 'flex', flexDirection: "column", width: "100%"}}>
          <IconButton onClick={()=> createNote()} size='large' style={{width: "fit-content", margin: "auto"}}>
            <AddCircleOutline style={{width: '30px', height: '30px'}}/>
          </IconButton> 
        </div>
        }
      </div> 

      {noteIndex >= 0 ? <Note note={notes[noteIndex]} index={noteIndex} onDelete={deleteNote} updateNote={updateNote}/> : <DefaultNotePage addNewNote={createNote}/>}
    </div>
  )
}
