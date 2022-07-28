import React, { useState, useContext } from 'react';
import notecontex from '../contex/notes/notecontex';
import { useNavigate } from "react-router-dom";
import '../App.css';
const Login = () => {
    const [text, settext] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const {alert} = useContext(notecontex);

    const onsubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: text.email, password: text.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            alert('success','Login Successfull');

        }
        else {
            alert('danger','Inccorect credential');
        }
    }
    const onchange = (e) => {
        settext({ ...text, [e.target.name]: e.target.value })
    }
    return (
        <div className='container row'style={{ marginTop:'100px'}} >
            <div className='col-md-6'>
                <h1 className='my-4 justify-content-center'>Login</h1>
                <form onSubmit={onsubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" value={text.email} name="email" className="form-control" onChange={onchange} id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" value={text.password} className="form-control" onChange={onchange} id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <img src='Images/notebook.png' className='col-md-6 ms-5 smallscreen' style={{width:'35%'}} alt='NoteBook' />
        </div>
    )
}

export default Login