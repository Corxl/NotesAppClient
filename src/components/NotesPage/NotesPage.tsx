
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { IconButton, Skeleton } from '@mui/material';
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

  const [currentNote, setCurrentNote] = useState<PageNote | undefined>(undefined)

  const [notes, setNotes] = useState<PageNote[]>([])

  const [loading, setLoading] = useState<boolean>(true)

  function createNote() {
    if (notes === undefined) return;
    setNotes([...notes, {title: 'New Notes', content: '', id: uuidv4()}])
  } 

  const deleteNote = useCallback((id: typeof uuidv4) => {
    
    if (notes.length > 0 && currentNote !== undefined) {
      if (notes.indexOf(currentNote) === notes.length - 1) {
        setCurrentNote(notes[notes.indexOf(currentNote) - 1])
      } else {
        setCurrentNote(notes[notes.indexOf(currentNote) + 1])
      }
    } else {
      setCurrentNote(undefined)
    }
    setNotes(list => list.filter(note => note.id !== id)) 
  }, [notes, currentNote]) 

  useEffect(() => {
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
            <div style={{display: "flex", flexDirection: "column", width: "100%", height: "auto", gap: "10px", padding: "5px"}}>
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
              <div style={{gap: "20px",  width: "100%"}} key={index}>
                <div className={'note-selector' + (currentNote?.id === note.id ? ' selected' : '')} key={index + 1} onClick={()=>setCurrentNote(note)}>
                  <div className='note-selector-description' style={{fontSize: "125%"}} key={note.title}>{note.title}</div>
                  <div className='note-selector-description' key={note.content}>{note.content}</div>
                </div>
                <div className='divider' key={index + 2}/> 
              </div> 
            )
          })
        }
        {!loading && 
        <div>
          <IconButton onClick={()=> createNote()} >
            <AddCircleOutline />
          </IconButton>
          <IconButton onClick={()=> setCurrentNote(undefined)} >
            <AddCircleOutline style={{color: "red"}}/>
          </IconButton>
        </div>
        }
      </div>
      {currentNote ? <Note note={currentNote} onDelete={deleteNote}/> : <DefaultNotePage addNewNote={createNote}/>}
    </div>
  )
}
