import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserDetailsPopup from "../DifficultySelection/UserDetailsPopup";
import "./DifficultySelection.css";

const DifficultySelection = ({ topic }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const navigate = useNavigate();

  const handleOpenPopup = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmitDetails = (userData) => {
    setShowPopup(false);
    navigate(`/${topic.toLowerCase()}/${selectedDifficulty}`, { state: { userData } });
  };

  return (
    <div className="difficulty-selection-container text-center">
      <div className="card p-4 shadow-lg">
        <h2 className="my-4">Select {topic} Difficulty Level</h2>
        <button onClick={() => handleOpenPopup("easy")} className="btn btn-success mx-2">Easy</button>
        <button onClick={() => handleOpenPopup("medium")} className="btn btn-warning mx-2">Medium</button>
        <button onClick={() => handleOpenPopup("hard")} className="btn btn-danger mx-2">Hard</button>
      </div>
      <UserDetailsPopup show={showPopup} handleClose={handleClosePopup} onSubmitDetails={handleSubmitDetails} required/>
    </div>
  );
};

export default DifficultySelection;
