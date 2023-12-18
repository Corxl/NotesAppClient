
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton, Skeleton } from '@mui/material';
import 'primeicons/primeicons.css';
import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Note from '../Note/Note.tsx';
import { DefaultNotePage } from '../Note/index.js';
import NoteSelector from './NoteSelector.tsx';
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
  const [editList, setEditList] = useState<boolean>(false)

  function createNote() { 
    setNotes(ns => [...ns, {title: 'Untitled Note', content: ns.length.toString(), id: uuidv4()}]);
    setNoteIndex(notes.length);
  } 

  const [notesToDelete, setNotesToDelete] = useState<number[]>([]); 

  useEffect(() => {
    console.log(notesToDelete);
  }, [notesToDelete]) 
    

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

  function deleteSelectedNotes() { 
    setNotes(notes.filter((_, index) => !notesToDelete.includes(index)));
    setNotesToDelete([]);
    setNoteIndex(-1);
    setEditList(false);
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
        <div className='list-actions'> 

          {editList === true && notesToDelete.length > 0
          ? 
          <IconButton onClick={()=> deleteSelectedNotes()} size='small' style={{width: "fit-content",}}>
            <DeleteIcon style={{width: '30px', height: '30px', color: 'white'}}/>
          </IconButton> : <></>}

          <IconButton onClick={()=> setEditList(e => !e)} size='small' style={{width: "fit-content",}}>
              {!editList ? <EditOutlinedIcon style={{width: '30px', height: '30px', color: 'white'}}/> : <EditIcon style={{width: '30px', height: '30px', color: 'white'}}/>}
          </IconButton> 
          <IconButton onClick={()=> createNote()} size='small' style={{width: "fit-content",}}>
            <AddBoxTwoToneIcon style={{width: '30px', height: '30px', color: 'white'}}/>
          </IconButton> 
          
        </div>
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
              <NoteSelector note={note} index={index} setNoteIndex={setNoteIndex} selected={index === noteIndex} key={index} notesToDelete={notesToDelete} setNotesToDelete={setNotesToDelete} enableEditCheckbox={editList}/>
            )
          })
        }
      </div> 

      {noteIndex >= 0 ? <Note note={notes[noteIndex]} index={noteIndex} onDelete={deleteNote} updateNote={updateNote}/> : <DefaultNotePage addNewNote={createNote}/>}
    </div>
  )
}
