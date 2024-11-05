import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DifficultySelection.css"; 

const DifficultySelection = ({ topic }) => {
  return (
    <div className="difficulty-selection-container text-center">
      <div className="card p-4 shadow-lg">
        <h2 className="my-4">Select {topic} Difficulty Level</h2>
        <Link to={`/${topic.toLowerCase()}/easy`} className="btn btn-success mx-2 difficulty-btn">Easy</Link>
        <Link to={`/${topic.toLowerCase()}/medium`} className="btn btn-warning mx-2 difficulty-btn">Medium</Link>
        <Link to={`/${topic.toLowerCase()}/hard`} className="btn btn-danger mx-2 difficulty-btn">Hard</Link>
      </div>
    </div>
  );
};

export default DifficultySelection;
