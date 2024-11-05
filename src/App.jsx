import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import DifficultySelection from "./Components/DifficultySelection";
import QuizPage from "./Components/QuizPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/react" element={<DifficultySelection topic="React" />} />
        <Route path="/python" element={<DifficultySelection topic="Python" />} />
        <Route path="/react/:difficulty" element={<QuizPage topic="React" />} />
        <Route path="/python/:difficulty" element={<QuizPage topic="Python" />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
