
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { IconButton } from "@mui/material";
import React from "react";
import { NotesPageActions } from "../NotesPage/NotesPage";

interface Props {
	notesDispatch: React.Dispatch<NotesPageActions>; 
}

export default function NoteEmpty({notesDispatch}: Props) {
  return (
    <div className='note note-empty'>
      <IconButton onClick={()=> notesDispatch({type: 'CREATE_NOTE'})} >
          <AddCircleOutline />
      </IconButton>
      <div className='note-empty-text'>
        <div className='note-empty-text-title'>
          Create a note
        </div>
      </div>
    </div>
  )
}