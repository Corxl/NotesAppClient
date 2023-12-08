import 'primeicons/primeicons.css';
import { Divider } from 'primereact/divider';
import React from 'react';
import './Note.css';
import './NotesPage.css';

export default function NotesPage() { 

  const notes = [
    {
      title: 'Note 1',
      content: 'This is the content of note 1 and it is very long so I will amke sure that this creates the three dots whenever the content is too long for me to be able to see lmao'
    },
    {
      title: 'Note 2',
      content: 'This is the content of note 1 and it is very long so I will amke sure that this creates the three dots whenever the content is too long for me to be able to see lmao'
    },
    {
      title: 'Note 3',
      content: 'This is the content of note 1 and it is very long so I will amke sure that this creates the three dots whenever the content is too long for me to be able to see lmao'
    }
  ]

  return (
    <div className='notes-container'>
      <div className='notes-list'>
        {notes.map((note, index) => {
          return (
            <div style={{gap: "20px"}}>
              <div className='note-selector' key={index}>
                <div className='note-selector-title'>{note.title}</div>
                <div className='note-selector-description'>{note.content}</div>
              </div>
              <Divider key={index} style={{marginTop: "-20px"}}/>
            </div>
            
          )
        })}
      </div>
      <div className='note'>
        {/*<Button label='Create Note' className='note-selector' /> */}
        <div className='note-header'>
          Content
        </div>
      </div>
    </div>
  )
}
