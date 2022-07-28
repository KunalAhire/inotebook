import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import notecontex from '../contex/notes/notecontex'
import '../App.css';
const Signup = () => {
    const { alert } = useContext(notecontex);
    const [text, settext] = useState({ name: "", email: "", password: "" })
    const navigate = useNavigate();
    const { name, email, password } = text;
    const onsubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            //  localStorage.setItem('token', json.authtoken); 
            navigate('/login')
            alert('success', 'Sign Up Successfull')

        }
        else {
            alert("danger", 'credential invalid');
        }
    }

    const onchange = (e) => {
        settext({ ...text, [e.target.name]: e.target.value })
    }
    return (
        <div className='container row' style={{ marginTop: '80px' }}>
            <div className='col-md-6' >
                <h1 className='my-4 justify-content-center'>Sign Up</h1>
                <form onSubmit={onsubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" value={name} name="name" className="form-control" onChange={onchange} id="name" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" value={email} name="email" className="form-control" onChange={onchange} id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" value={password} className="form-control" onChange={onchange} id="password" minLength={5} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <img src='Images/notebook.png' className='col-md-6 ms-5 smallscreen' style={{width:'35%'}} alt='NoteBook' />
        </div>
    )
}

export default Signup