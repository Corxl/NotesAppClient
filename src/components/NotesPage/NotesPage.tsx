import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Note from '../Note/Note.tsx';
import './NotesPage.css';

interface PageNote {
  title: string,
  content: string,
  id: string
}

const emptyPage = {
  title: '',
  content: '',
  id: ''
}

export default function NotesPage() { 

  const [currentNote, setCurrentNoteId] = useState<PageNote>(emptyPage)

  const [notes, setNotes] = useState<PageNote[]>(
  [
    {
      title: 'Note 1',
      content: 'This is the content of note 1 and it is very long so I will amke sure that this creates the three dots whenever the content is too long for me to be able to see lmao',
      id: uuidv4() 
    },
    {
      title: 'Note 2',
      content: 'This is the content of note 1 and it is very long so I will amke sure that this creates the three dots whenever the content is too long for me to be able to see lmao lmao long note the is This',
      id: uuidv4() 
    },
    {
      title: 'Note 3',
      content: '9ahUovr0e2PUUCnj',
      id: uuidv4() 
    },
    {
      title: 'Note 4',
      content: 'This is the content of note 1 and it is very long so I will amke sure that this creates the three dots whenever the content is too long for me to be able to see lmao',
      id: uuidv4() 
    },
    {
      title: 'Note 5',
      content: 'This is the content of note 1 and it is very long so I will amke sure that this creates the three dots whenever the content is too long for me to be able to see lmao',
      id: uuidv4() 
    },
    {
      title: 'Note 6',
      content: 'This is the content of note 1 and it is very long so I will amke sure that this creates the three dots whenever the content is too long for me to be able to see lmao',
      id: uuidv4() 
    },
    {
      title: 'Note 7',
      content: 'This is the content of note 1 and it is very long so I will amke sure that this creates the three dots whenever the content is too long for me to be able to see lmao',
      id: uuidv4()
    }
  ])

  function createNote() {
    setNotes([...notes, {title: 'New Notes', content: '', id: uuidv4()}])
  } 

  const deleteNote = useCallback((id) => {
    setCurrentNoteId(notes.length > 1 ? notes[notes.indexOf(currentNote)] : emptyPage)
    setNotes(notes.filter(note => note.id !== id))
  }, [notes]) 

  return (
    <div className='notes-container'>
      <div className='notes-list'>
        {
          notes.map((note, index) => {
            return (
              <div style={{gap: "20px",  width: "100%"}} key={index}>
                <div className={'note-selector' + (currentNote?.id === note.id ? ' selected' : '')} key={index} onClick={()=>setCurrentNoteId(note)}>
                  <div className='note-selector-description' style={{fontSize: "125%"}} key={index}>{note.title}</div>
                  <div className='note-selector-description' key={index}>{note.content}</div>
                </div>
                <div className='divider' key={index}/> 
              </div> 
            )
          })
        }
        <Button icon='pi pi-plus' severity='secondary' className='add-note-button' onClick={()=> createNote()}/> 
        <Button icon='pi pi-trash' severity='secondary' className='add-note-button' onClick={()=> createNote()}/>
      </div>
      <Note note={currentNote || {title: '', content: '', id: uuidv4()}} onDelete={deleteNote}/>
    </div>
  )
}
