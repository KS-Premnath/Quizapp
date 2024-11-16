import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./QuizPage.css";
import ReactQuestions from "../Question.json";
import PythonQuestions from "../Components/Pythonquestion.json";
import DifficultySelection from "./DifficultySelection";

const QuizPage = () => {
  const { topic, difficulty } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;

  const LSUpdatedQuestions = localStorage.getItem("questionsData")
    ? JSON.parse(localStorage.getItem("questionsData"))
    : [];

  const reactQuestion =
    Object.keys(LSUpdatedQuestions).length > 0
      ? LSUpdatedQuestions["React"][difficulty]
      : ReactQuestions[difficulty];

  const questionData =
    topic.toLowerCase() === "react"
      ? reactQuestion
      : PythonQuestions[difficulty];

      

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [penaltyPoints, setPenaltyPoints] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);
  const penalty = 0.5;

  // const storedquestionData = localStorage.getItem("questionData");
  //    const intialquestionData = storedquestionData ? parseInt(storedquestionData) : 5;
  //    setCurrentQuestion(intialquestionData);

  useEffect(() => {
    const storedTimeLimit = localStorage.getItem("timeLimit");
    const initialTimeLimit = storedTimeLimit ? parseInt(storedTimeLimit) : 10;

    setTimer(initialTimeLimit);
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && !showScore) {
      handleNextQuestion();
    }

    return () => clearInterval(interval);
  }, [timer, showScore]);

  const handleAnswerClick = (selectedOptionIndex) => {
    const correctOptionIndex = questionData[currentQuestion].correctOption;

    if (selectedOptionIndex === correctOptionIndex) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setPenaltyPoints((prevPenalty) => prevPenalty + penalty);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questionData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);

      const storedTimeLimit = localStorage.getItem("timeLimit");
      const initialTimeLimit = storedTimeLimit ? parseInt(storedTimeLimit) : 10;

      setTimer(initialTimeLimit);
    } else {
      setShowScore(true);
      saveResultInLocalStorage();
    }
  };

  const saveResultInLocalStorage = () => {
    const finalScore = score - penaltyPoints;
    const newResult = {
      Name: userData?.name || "N/A",
      Email: userData?.email || "N/A",
      PhoneNumber: userData?.phoneNumber || "N/A",
      Topic: topic,
      Difficulty: difficulty,
      Score: score,
      PenaltyPoints: penaltyPoints.toFixed(1),
      FinalScore: finalScore.toFixed(1),
    };

    const storedResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    storedResults.push(newResult);
    localStorage.setItem("quizResults", JSON.stringify(storedResults));
  };

  const handleFinishQuiz = () => {
    navigate("/");
  };

  return (
    <div className="container quiz-container text-center">
      {showScore ? (
        <div className="score-section card p-4 shadow">
          <h2>
            Your Score: {score}/{questionData.length}
          </h2>
          <h4>Points Lost Due to Penalty: {penaltyPoints.toFixed(1)}</h4>
          <h3>Final Score: {(score - penaltyPoints).toFixed(1)}</h3>
          <button className="btn btn-primary mt-3" onClick={handleFinishQuiz}>
            Finish
          </button>
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
                onClick={() => handleAnswerClick(index)}
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