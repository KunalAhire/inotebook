import React, { useContext, useEffect, useState } from "react";
import noteContex from '../contex/notes/notecontex';
import Createnote from "./Creatnote";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
export const Notes = () => {
    const navigate = useNavigate();
    const context = useContext(noteContex);

    const { notes, getnotes, editNote, alert } = context;

    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getnotes();
        } else {
            navigate('/login');
        }

        // eslint-disable-next-line
    }, [])
    const handleclick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        alert('success','note updated')
    }

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    const updateNotes = (currentNote) => {
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    return (
        <div className="mt-4">
            <Createnote />
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onchange} />
                                </div>
                            </form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-primary" disabled={note.edescription.length < 5 && note.etitle.length < 5} onClick={handleclick} data-bs-dismiss="modal">Add Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h2>Notes</h2>
                <div className="row">
                    {
                        (notes && notes.length > 0) ?
                            notes.map((note) => {
                                return <Noteitem key={note._id} updateNotes={updateNotes} note={note} />
                            })
                            : null
                    }
                </div>
            </div>
        </div>
    )
}
