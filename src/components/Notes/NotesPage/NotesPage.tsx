
import 'primeicons/primeicons.css';
import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NoteContent from '../NoteContent/NoteContent.tsx';
import { DefaultNotePage } from '../NoteContent/index.js';
import NoteList from '../NoteList/NoteList.tsx';
import './NotesPage.css';


export interface PageNote {
  title: string,
  content: string,
  hasSaved?: boolean,
  id: typeof uuidv4
}

export default function NotesPage() { 

  const [noteIndex, setNoteIndex] = useState(-1);

  const [notes, setNotes] = useState<PageNote[]>([{
    title: 'Welcome to Notes App!',
    content: 'Click the button below to create a new note!',
    id: uuidv4(),
    hasSaved: false,
  }])


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
        return {title: newNote.title, content: newNote.content, id: note.id, hasSaved: true};
      } else {
        return note;
      }
    }))
  }

  

  

  return (
    <div className='notes-container'>
      <NoteList createNote={createNote} notes={notes} setNotes={setNotes} setNoteIndex={setNoteIndex} noteIndex={noteIndex} setNotesToDelete={setNotesToDelete} notesToDelete={notesToDelete}/>

      {noteIndex >= 0 ? <NoteContent note={notes[noteIndex]} index={noteIndex} onDelete={deleteNote} updateNote={updateNote}/> : <DefaultNotePage addNewNote={createNote}/>}
    </div>
  )
}
