import React from 'react'
import './NotesPage.css'
import 'primeicons/primeicons.css';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';

export default function NotesPage() { 

  return (
    <div className='main-container' style={{backgroundColor: 'transparent'}}>
      <Panel header={
        <InputText placeholder='Title' className='input' style={{background: "transparent", borderColor: "transparent", width: "100%"}}/>
      } className='note'>
        <p>WHAT THE</p>
      </Panel> 
    </div>
  )
}
