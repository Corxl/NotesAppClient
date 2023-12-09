import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import React from 'react';
import './Note.css';


export default function Note(props) {
  
  return (
    <div className='note'>
      {/*<Button label='Create Note' className='note-selector' />*/}
      <div className='note-header'>
        <div>
          {props.title}
        </div>
        <div className='note-buttons'>
          <Button icon={'pi ' + 'pi-file-edit'} className='note-edit-button' tooltip='Edit'/>
          <Button icon={'pi ' + PrimeIcons.TRASH} className='note-edit-button' tooltip='Delete'/> 
        </div>
      </div>
      <div className='note-content'>
        
        {props.content}
      </div>
    </div>
  )
}
