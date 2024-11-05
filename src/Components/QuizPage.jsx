import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./QuizPage.css";
import ReactQuestions from "../Question.json";
import PythonQuestions from "../Components/Pythonquestion.json";

const QuizPage = ({ topic }) => {
  const { difficulty } = useParams();
  const questionData = topic === "React" ? ReactQuestions[difficulty] : PythonQuestions[difficulty];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [penaltyPoints, setPenaltyPoints] = useState(0); // Track penalty points separately
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);
  const penalty = 0.5; // Define the penalty for incorrect answers

  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [timer, showScore]);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === questionData[currentQuestion].correctOption) {
      setScore((prevScore) => prevScore + 1); // Increase score for correct answer
    } else {
      setPenaltyPoints((prevPenalty) => prevPenalty + penalty); // Add penalty points for incorrect answer
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questionData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setPenaltyPoints(0); // Reset penalty points
    setShowScore(false);
    setTimer(10);
  };

  return (
    <div className="container quiz-container text-center">
      {showScore ? (
        <div className="score-section card p-4 shadow">
          <h2>Your Score: {score}/{questionData.length}</h2>
          <h4>Points Lost Due to Penalty: {penaltyPoints}</h4>
          <h3>Final Score: {score - penaltyPoints}</h3>
          <button className="btn btn-primary mt-3" onClick={handleRestartQuiz}>Restart</button>
        </div>
      ) : (
        <div className="question-section card p-4 shadow">
          <h2 className="my-3">Question {currentQuestion + 1}</h2>
          <p>{questionData[currentQuestion].question}</p>
          <div className="options">
            {questionData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="btn btn-outline-primary my-2"
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="timer alert alert-info mt-4">
            Time Left: <span>{timer}s</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
