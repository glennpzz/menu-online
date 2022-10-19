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
      <Route path="/:resto" element={<Main component={Home}/>} />
    </Routes>
  );
}

export default App;
