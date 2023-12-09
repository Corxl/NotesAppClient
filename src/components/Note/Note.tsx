import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Note.css';


interface NoteProps {
  note: {
    title: string,
    content: string,
    id: uuidv4,
  }
  onDelete: (id: uuidv4) => void
}

export default function Note(props: NoteProps) {

  const {note, onDelete} = props
  const {title, content, id} = note
  
  return (
    <div className='note'>
      {/*<Button label='Create Note' className='note-selector' />*/}
      <div className='note-header'>
        <div>
          {title}
        </div>
        <div className='note-buttons'>
          <Button icon={'pi pi-file-edit'} className='note-edit-button' tooltip='Edit'/>
          <Button icon={'pi ' + PrimeIcons.TRASH} className='note-edit-button' tooltip='Delete' onClick={()=>onDelete(id)}/> 
        </div>
      </div>
      <div className='note-content'>
        
        {content}
      </div>
    </div>
  )
}
