import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './component/Nav';
import About from './component/About';
import Home from './component/Home';
import NoteState from './contex/notes/NoteState'
import Login from './component/Login';
import Signup from './component/Signup';
import Alert from './component/Alert';
function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Nav />
          <Alert />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
