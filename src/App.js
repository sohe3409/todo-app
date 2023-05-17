import "./App.css";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ToDo from "./components/ToDo.js";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ToDo />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
