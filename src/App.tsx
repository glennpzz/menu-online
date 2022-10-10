import React from "react";
import {
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import Main from "./pages/Main";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main component={Home}/>} />
      <Route path="/:slug" element={<Main component={Home}/>} />
      <Route path="/*" element={<Navigate to="/" replace={true}/>} /> 
    </Routes>
  );
}

export default App;
