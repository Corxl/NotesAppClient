import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import React, { useEffect, useMemo, useState } from 'react';
import Note from '../Note/Note.tsx';
import './NotesPage.css';

export default function NotesPage() { 

  const [currentNote, setCurrentNote] = useState({
    index: -1,
    title: '',
    content: ''
  })

  const notes = useMemo(()=> {
    return [
    {
      title: 'Note 1',
      content: 'This is the content of note 1 and it is very long so I will amke sure that this creates the three dots whenever the content is too long for me to be able to see lmao' 
    },
    {
      title: 'Note 2',
      content: 'This is the content of note 1 and it is very long so I will amke sure that this creates the three dots whenever the content is too long for me to be able to see lmao lmao long note the is This'
    },
    {
      title: 'Note 3',
      content: '9ahUovr0e2PUUCnj'
    }
  ]}, [])

  function createNote() {
    notes.push({
      title: 'Untitled Note',
      content: ''
    }) 
  }


  useEffect(() => {
    if (notes.length > 0) {
      setCurrentNote({...notes[0], index: 0})
    } 
  }, [notes])

  return (
    <div className='notes-container'>
      <div className='notes-list'>
        {
          notes.map((note, index) => {
            return (
              <div style={{gap: "20px"}} key={index}>
                <div className={'note-selector' + (currentNote.index === index ? ' selected' : '')} key={index} onClick={()=>setCurrentNote({...notes[index], index: index})}>
                  <div className='note-selector-title' key={index}>{note.title}</div>
                  <div className='note-selector-description' key={index}>{note.content}</div>
                </div>
                <div className='divider' key={index}/> 
              </div> 
            )
          })
        }
        <Button icon='pi pi-plus' severity='secondary' className='add-note-button' onClick={()=> createNote()}/> 
      </div>
      <Note title={currentNote.title} content={currentNote.content}/>
    </div>
  )
}
