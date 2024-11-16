import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuestions from "../Question.json";
import PythonQuestions from "../Components/Pythonquestion.json";

const AdminPage = ({ setIsAdminAuthenticated }) => {
  const navigate = useNavigate();
  const [resultsData, setResultsData] = useState([]);
  const [questionsData, setQuestionsData] = useState({
    React: {
      easy: ReactQuestions.easy,
      medium: ReactQuestions.medium,
      hard: ReactQuestions.hard,
    },
    Python: {
      easy: PythonQuestions.easy,
      medium: PythonQuestions.medium,
      hard: PythonQuestions.hard,
    },
  });
  const [timeLimit, setTimeLimit] = useState(10); 
  const [activeTab, setActiveTab] = useState("results"); 
  const [selectedTopic, setSelectedTopic] = useState("React"); 


  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    setResultsData(storedResults);

    
    const savedTimeLimit = localStorage.getItem("timeLimit");
    if (savedTimeLimit) {
      setTimeLimit(Number(savedTimeLimit));
    }

    const savedQuestionsData = JSON.parse(localStorage.getItem("questionsData"));
    if (savedQuestionsData) {
      setQuestionsData(savedQuestionsData);
    }
  }, []);

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    navigate("/admin/signin");
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(resultsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quiz Results");
    XLSX.writeFile(workbook, "quiz_results.xlsx");
  };

  const handleTimeLimitChange = (e) => {
    const newTimeLimit = Number(e.target.value);
    setTimeLimit(newTimeLimit);
    localStorage.setItem("timeLimit", newTimeLimit); 
  };

  const handleQuestionChange = (topic, difficulty, questionIndex, field, value) => {
    const updatedQuestions = { ...questionsData };

    if (field.startsWith("options")) {
      const optionIndex = parseInt(field.split(".")[1], 10);
      updatedQuestions[topic][difficulty][questionIndex].options[optionIndex] = value;
    } else {
      updatedQuestions[topic][difficulty][questionIndex][field] = value;
    }

    setQuestionsData(updatedQuestions);

   
    localStorage.setItem("questionsData", JSON.stringify(updatedQuestions));
  };

  const addNewQuestion = (topic, difficulty) => {
    const updatedQuestions = { ...questionsData };

    if (!updatedQuestions[topic][difficulty]) {
      updatedQuestions[topic][difficulty] = [];
    }

    updatedQuestions[topic][difficulty].push({
      question: "",
      options: ["", "", "", ""],
      correctOption: "",
      isEditing: true, 
    });

    setQuestionsData(updatedQuestions);
    localStorage.setItem("questionsData", JSON.stringify(updatedQuestions));
  };

  const toggleEditMode = (topic, difficulty, questionIndex) => {
    const updatedQuestions = { ...questionsData };
    const currentQuestion = updatedQuestions[topic][difficulty][questionIndex];

    if (currentQuestion.isEditing) {
      currentQuestion.isEditing = false;
      setQuestionsData(updatedQuestions);
      localStorage.setItem("questionsData", JSON.stringify(updatedQuestions));
      setIsEditModalOpen(true);
    } else {
      currentQuestion.isEditing = true;
      setQuestionsData(updatedQuestions);
    }
  };

  const deleteQuestion = () => {
    const updatedQuestions = { ...questionsData };
    const { topic, difficulty, index } = questionToDelete;
    updatedQuestions[topic][difficulty].splice(index, 1);
    setQuestionsData(updatedQuestions);
    localStorage.setItem("questionsData", JSON.stringify(updatedQuestions));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <a className="navbar-brand" href="#">Admin Dashboard</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item ${activeTab === "results" ? "active" : ""}`}>
              <button className="nav-link btn" onClick={() => setActiveTab("results")}>
                Results Download
              </button>
            </li>
            <li className={`nav-item ${activeTab === "time" ? "active" : ""}`}>
              <button className="nav-link btn" onClick={() => setActiveTab("time")}>
                Time Change
              </button>
            </li>
            <li className={`nav-item ${activeTab === "questions" ? "active" : ""}`}>
              <button className="nav-link btn" onClick={() => setActiveTab("questions")}>
                Question Edit
              </button>
            </li>
          </ul>
          <button onClick={handleLogout} className="btn btn-danger ml-auto">
            Logout
          </button>
        </div>
      </nav>

      {activeTab === "results" && (
        <div>
          <h3 className="mb-4">Download Quiz Results</h3>
          <button onClick={handleExportToExcel} className="btn btn-primary mb-4">Export Results to Excel</button>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Topic</th>
                  <th>Difficulty</th>
                  <th>Score</th>
                  <th>Penalty Points</th>
                  <th>Final Score</th>
                </tr>
              </thead>
              <tbody>
                {resultsData.length > 0 ? (
                  resultsData.map((result, index) => (
                    <tr key={index}>
                      <td>{result.Name}</td>
                      <td>{result.Email}</td>
                      <td>{result.PhoneNumber}</td>
                      <td>{result.Topic}</td>
                      <td>{result.Difficulty}</td>
                      <td>{result.Score}</td>
                      <td>{result.PenaltyPoints}</td>
                      <td>{result.FinalScore}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">No results available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "time" && (
        <div className="mb-4">
          <h3>Set Time Limit for Questions</h3>
          <label>Time Limit (in seconds):</label>
          <input
            type="number"
            value={timeLimit}
            onChange={handleTimeLimitChange}
            className="form-control d-inline w-auto"
          />
        </div>
      )}

      {activeTab === "questions" && (
        <div>
          <h3>Questions Editor</h3>
          <div className="mb-4">
            <button
              className={`btn btn-${selectedTopic === "React" ? "primary" : "secondary"} mr-2`}
              onClick={() => setSelectedTopic("React")}
            >
              React Questions
            </button>
            <button
              className={`btn btn-${selectedTopic === "Python" ? "primary" : "secondary"}`}
              onClick={() => setSelectedTopic("Python")}
            >
              Python Questions
            </button>
          </div>

          {/* Render the selected topic questions */}
          {Object.keys(questionsData[selectedTopic]).map((difficulty) => (
            <div key={difficulty}>
              <h5>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h5>
              {questionsData[selectedTopic][difficulty].map((question, index) => (
                <div key={index} className="mb-3">
                  {question.isEditing ? (
                    <div className="form-group">
                      <label>Question</label>
                      <input
                        type="text"
                        className="form-control"
                        value={question.question}
                        onChange={(e) =>
                          handleQuestionChange(selectedTopic, difficulty, index, "question", e.target.value)
                        }
                      />
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="form-check">
                          <input
                            type="text"
                            className="form-control mb-2"
                            value={option}
                            onChange={(e) =>
                              handleQuestionChange(
                                selectedTopic,
                                difficulty,
                                index,
                                `options.${optIndex}`,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      ))}
                      <div>
                        <label>Correct Option</label>
                        <select
                          className="form-control"
                          value={question.correctOption}
                          onChange={(e) =>
                            handleQuestionChange(selectedTopic, difficulty, index, "correctOption", e.target.value)
                          }
                        >
                          {question.options.map((option, optIndex) => (
                            <option key={optIndex} value={optIndex}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p><strong>Question:</strong> {question.question}</p>
                      <ul>
                        {question.options.map((option, optIndex) => (
                          <li key={optIndex}>{option}</li>
                        ))}
                      </ul>
                      <p><strong>Correct Answer:</strong> {question.options[question.correctOption]}</p>
                    </div>
                  )}
                  <button
                    className="btn btn-info"
                    onClick={() => toggleEditMode(selectedTopic, difficulty, index)}
                  >
                    {question.isEditing ? "Save" : "Edit"}
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => {
                      setQuestionToDelete({ topic: selectedTopic, difficulty, index });
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                className="btn btn-success mb-4"
                onClick={() => addNewQuestion(selectedTopic, difficulty)}
              >
                Add New Question
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Question</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsDeleteModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this question?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={deleteQuestion}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Confirmation Modal */}
      {isEditModalOpen && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Question Saved</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsEditModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Your changes have been saved successfully.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
