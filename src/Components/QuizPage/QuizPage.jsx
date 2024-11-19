import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./QuizPage.css";
import ReactQuestions from "../../Data-json/Question.json";
import PythonQuestions from "../../Data-json/Pythonquestion.json";

const QuizPage = () => {
  const { topic, difficulty } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;

  const timeLimitFromEnv = parseInt(import.meta.env.VITE_TIME_LIMIT) || 10;
  const penaltyFromEnv = parseFloat(import.meta.env.VITE_PENALTY) || 0.5;

 
  const questionData =
    topic.toLowerCase() === "react"
      ? ReactQuestions[difficulty]
      : PythonQuestions[difficulty];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [penaltyPoints, setPenaltyPoints] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(timeLimitFromEnv);

  useEffect(() => {
    setTimer(timeLimitFromEnv);
  }, [timeLimitFromEnv]);

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
    const correctOptionIndex = parseInt(questionData[currentQuestion].correctOption);
  
    console.log(`Selected Option Index: ${selectedOptionIndex}`);
    console.log(`Correct Option Index: ${correctOptionIndex}`);
  
    if (selectedOptionIndex === correctOptionIndex) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        console.log("Score updated:", newScore);
        return newScore;
      });
    } else {
      setPenaltyPoints((prevPenalty) => {
        const newPenalty = prevPenalty + penaltyFromEnv;
        console.log("Penalty updated:", newPenalty);
        return newPenalty;
      });
    }
  
    handleNextQuestion();
  };
  

  const handleNextQuestion = () => {
    if (currentQuestion < questionData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(timeLimitFromEnv);
    } else {
      setShowScore(true);
      saveResultInLocalStorage();
    }
  };

  const saveResultInLocalStorage = () => {
    const finalScore = score - penaltyPoints;
    console.log(`Final Score Calculated: ${finalScore}`); 
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

  const getFinalScore = () => {
    const finalScore = score - penaltyPoints;
    console.log(`Final score before return: ${finalScore}`); 
    return finalScore.toFixed(1);
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
          <h3>Final Score: {getFinalScore()}</h3>
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
