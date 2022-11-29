import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Projects from './pages/projects';
import Todos from './pages/todos';

function App() {
  return (
    <BrowserRouter>
        <Routes> 
          <Route path='/' element={<Projects/>}/>
          <Route path='/project/:id' element={<Todos/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;