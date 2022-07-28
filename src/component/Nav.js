import React, { useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import notecontex from '../contex/notes/notecontex';
const Nav = () => {
    const { alert } = useContext(notecontex);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {

    }, [location])
    const signout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        alert('success', 'Sign Out Successfull');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid ">
                    <Link className="navbar-brand " to="#0">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>
                        </ul>

                        {!localStorage.getItem('token') ? <form className='d-flex position-absolute mx-4 top-50 end-0 translate-middle-y '>
                            <Link to={'/login'}><button className="btn btn-outline-danger mx-1" >Login</button></Link>
                            <Link to={'/signup'}><button className="btn btn-outline-danger mx-1">SignUp</button></Link>
                        </form> : <button className="btn btn-danger position-absolute top-50 end-0 translate-middle-y mx-3" onClick={signout}>Sign Out</button>}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;