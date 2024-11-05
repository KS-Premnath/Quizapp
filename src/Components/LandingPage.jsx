import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css"; 

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="card landing-card text-center shadow p-4">
        <h1 className="mb-4">Welcome to the Quiz</h1>
        <p className="mb-4">Choose a topic to get started!</p>
        <Link to="/react" className="btn btn-react btn-lg mx-2 landing-btn">React Quiz</Link>
        <Link to="/python" className="btn btn-python btn-lg mx-2 landing-btn">Python Quiz</Link>
      </div>
    </div>
  );
};

export default LandingPage;
