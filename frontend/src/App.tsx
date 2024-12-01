import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AiChat from './components/Chat';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id?" element={<AiChat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
