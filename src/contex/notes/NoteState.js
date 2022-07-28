import React, { useState } from "react";
import notecontex from "./notecontex";

const NoteState = (props) => {

  const noteinitial = []
  const [notes, setNotes] = useState(noteinitial);
  const [alerts, setalerts] = useState({warning:'', message:''})
  const getnotes = async () => {
    const response = await fetch(
      'http://localhost:5000/api/notes/getnotes',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      }
    );
    const data = await response.json(); // Extracting data as a JSON Object from the response
    // console.log(data)
    setNotes(data)
  }

  //For Adding new Notes
  const addNotes = async (title, description, tag) => {
    const response = await fetch(
      'http://localhost:5000/api/notes/addnote',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      },
    );
    const note = await response.json();
    setNotes(notes.concat(note))
  }
  //for deleting notes
  const deleteNotes = async (id) => {

    await fetch(
      `http://localhost:5000/api/notes/deletenote/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      }
    );

    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
  }
  //for Editing exiting notes
  const editNote = async (id, title, description, tag) => {
    await fetch(
      `http://localhost:5000/api/notes/updatenote/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      }
    );
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  const alert = (warning , message) =>{
    setalerts({warning:warning, message:message});
    setTimeout(() => {
      setalerts({warning:'', message:''});
    }, 3000);
  }
  return (
    <notecontex.Provider value={{ notes, addNotes, deleteNotes, editNote, getnotes,alerts,alert }}>
      {props.children}
    </notecontex.Provider>
  )
}

export default NoteState;