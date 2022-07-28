import React, {useContext} from 'react';
import noteContex from '../contex/notes/notecontex';
const Noteitem = (props) => {
    const contex = useContext(noteContex);
    const { note, updateNotes } = props;
    const {deleteNotes,alert} = contex;
    return (
        <div className='col-md-3'>
            <div className="card my-3 mx-2" key={props.id}>
                <div className="card-header">
                    <div className='d-flex align-items-center'>
                        <i className="fa-solid fa-list-check mx-2"></i>
                        <h4>{note.title}</h4>
                    </div>
                </div>
                <div className="card-body">
                    <p className="fw-semibold card-text">{note.description}</p>
                    <p className="fw-light card-text mt-4">{note.tag}</p>
                    <div className="text-center rounded-5  fs-4 bg-dark bg-opacity-10">
                        <i className="far fa-solid fa-trash-can mx-4" onClick={()=>{deleteNotes(note._id);alert('danger','note deleted')}}></i>
                        <i className="fa-solid fa-file-pen mx-4" onClick={()=>{updateNotes(note)}}  data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Noteitem;