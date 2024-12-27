import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Principal from './Principal';
import Gravar from './Gravar';
import Editar from './Editar';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Principal/>} />
                <Route path='/newTime' element={<Gravar/>} />
                <Route path='/editTime/:id' element={<Editar/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;