import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home  from "./components/Pages/Home";

function App() {
  return (
    <>
      <Router>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
  </>
  );
}

export default App;
