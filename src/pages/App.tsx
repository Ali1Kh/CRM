import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />} index />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
