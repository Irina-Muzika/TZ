import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Variables from "./pages/Variables.js";
import VariablesId from "./pages/VariablesId.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/variables" element={<Variables />} />
        <Route path="/variables/:id" element={<VariablesId />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;