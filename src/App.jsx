import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import QuizPage from "./Components/QuizPage/QuizPage";
import DifficultySelection from "./Components/DifficultySelection/DifficultySelection";
// import SignIn from "./Components/SignIn";
// import SignUp from "./Components/SignUp";
// import AdminPage from "./Components/AdminPage";

const App = () => {
  // const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [resultsData, setResultsData] = useState([]); 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/react" element={<DifficultySelection topic="React" />} />
        <Route path="/python" element={<DifficultySelection topic="Python" />} />
        <Route path="/:topic/:difficulty" element={<QuizPage resultsData={resultsData} setResultsData={setResultsData} />} />
        {/* <Route path="/admin/signin" element={<SignIn setIsAdminAuthenticated={setIsAdminAuthenticated} />} />
        <Route path="/admin/signup" element={<SignUp />} />
        <Route
          path="/admin"
          element={
            isAdminAuthenticated ? (
              <AdminPage resultsData={resultsData} setIsAdminAuthenticated={setIsAdminAuthenticated} />
            ) : (
              <Navigate to="/admin/signin" />
            )
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
