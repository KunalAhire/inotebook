import React, {useContext, useState} from "react";
import noteContex from '../contex/notes/notecontex';
const Createnote = (props) =>{
    const contex = useContext(noteContex);
    const {addNotes,alert} = contex;

    const [note, setnote] = useState({"title":"","description":"","tag":""});

    const handleclick = (e) =>{
        e.preventDefault();
        addNotes(note.title,note.description,note.tag);
        alert('success', 'Note Created');
    }

    const onchange = (e) =>{
        setnote({...note, [e.target.name]: e.target.value})
    }
    return(
        <div className="container">
                <h2>Add notes</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" onChange={onchange}/>
                        <p className="text-danger">{note.title.length > 0 &&note.title.length < 5 ?'Add Atleast 5 character':null}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onchange}/>
                        <p className="text-danger">{note.description.length > 0 &&note.description.length < 5 ?'Add Atleast 5 character':null}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onchange}/>
                    </div>
                    <button disabled={note.description.length < 5 || note.title.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>
    )
}
export default Createnote;