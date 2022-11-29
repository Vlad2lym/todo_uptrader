import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Projects from './pages/projects';
import Todos from './pages/todos';

function App() {
  return (
    <BrowserRouter>
        {/* <div className="App">
            <Link to='/'><h2>project</h2></Link>
            <Link to='/todo'>todo</Link>
        </div>  */}
        <Routes> 
          <Route path='/' element={<Projects/>}/>
          <Route path='/project/:id' element={<Todos/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;