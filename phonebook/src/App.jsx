import React from "react";
import Navbar from "./Navbar";
import AddEntry from "./pages/AddEntry";
import Phonebook from "./pages/Phonebook";
import AddPhonebook from "./pages/addPhonebook";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/phonebook" element={<Phonebook />} />
        <Route path="/addEntry" element={<AddEntry />} />
        <Route path="/addPhonebook" element={<AddPhonebook />} />
      </Routes>
    </div>
  );
}

export default App;
