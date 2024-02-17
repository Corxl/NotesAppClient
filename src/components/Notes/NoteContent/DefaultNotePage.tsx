
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../hooks/useLogin.tsx";

export default function NoteEmpty() {

  const { addNote } = useLogin();
  const nav = useNavigate();
  return (
    <div className='note note-empty'>
      <IconButton onClick={async ()=> {
        const newNote = await addNote();
        nav(`/dashboard/${newNote.id}`);
      }} >
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