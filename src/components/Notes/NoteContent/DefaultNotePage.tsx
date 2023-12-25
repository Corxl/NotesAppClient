
import AddCircleOutline from "@mui/icons-material/AddCircleOutline"
import { IconButton } from "@mui/material"
import React from "react"

interface Props {
  addNewNote: () => void
}

export default function NoteEmpty(props: Props) {
  const { addNewNote } = props
  return (
    <div className='note note-empty'>
      <IconButton onClick={()=> addNewNote()} >
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