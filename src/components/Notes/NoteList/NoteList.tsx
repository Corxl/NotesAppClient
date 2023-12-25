import './NoteList.css';

import React from 'react';

export default function NoteList() {
  return (
    <div>
        {
          notes.map((note, index) => {
            return (
              <NoteSelector note={note} index={index} setNoteIndex={setNoteIndex} selected={index === noteIndex} key={index} notesToDelete={notesToDelete} setNotesToDelete={setNotesToDelete} enableEditCheckbox={editList}/>
            )
          })
        }
    </div>
  )
}
