import React from 'react';

const About = () => {
    return (
        <>
            <div className="card text-center">
                <div className="card-header">
                    About
                </div>
                <div className="card-body">
                    <h5 className="card-title">iNoteBook</h5>
                    <p className="card-text">iNoteBook is notes utility where you can safely save, modify and retrive your important notes</p>
                   <h3 className="card-text"><i className="fa-solid fa-envelope mx-2"></i><i className="fa-brands fa-linkedin mx-2"></i>
                   <i className="fa-brands fa-github-square mx-2"></i><i className="fa-brands fa-instagram mx-2"></i></h3>
                </div>
                <div className="card-footer text-muted">
                    Developed by Kunal Ahire
                </div>
            </div>
        </>
    )
}
export default About;