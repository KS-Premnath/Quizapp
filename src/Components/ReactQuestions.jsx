// import { useEffect, useState } from 'react'
// import './ReactQuestions.css'
// import questionData from "../Question.json"

// function ReactQuestions() {
//   const [currentquestion,setCurrentquestion]=useState(0);
//   const [score,setScore]=useState(0);
//   const [showScore,setShowScore]=useState(false);
//   const [timer,setTimer]=useState(10);

//   useEffect(()=>{
//     let interval;
//     if(timer > 0 && !showScore){
//       interval = setInterval(()=>{
//         setTimer((prevTimer)=>prevTimer - 1);
//       },1000)
//     }
//     else{
//       clearInterval(interval);
//       setShowScore(true);
//     }
//     return ()=>clearInterval(interval);
//   },[timer,showScore]);



//   const handleAnswerClick=(selectedOption)=>{
//     if(selectedOption === questionData
//       [currentquestion].correctoption ){
//         setScore((prevScore)=>prevScore + 1)
//       }
//       if(currentquestion < questionData.length - 1)
//       {
//         setCurrentquestion((prevquestion)=>
//         prevquestion + 1);
//         setTimer(10);
//       }
//       else{
//         setShowScore(true)
//       }
//     };
//     const handleRestartquiz = ()=>{
//       setCurrentquestion(0);
//       setScore(0);
//       setShowScore(false);
//       setTimer(10)
//     }
 
//   return (
//     <>
    
//       <div className='quiz-app'>
//         {showScore ? (
//           <div className='score-section'>
//           <h2>Your Score: {score}/{questionData.length} </h2>
//           <button onClick={handleRestartquiz}>Restart</button>
//         </div>
//         ) : (
//           <div className='question-section'>
//           <h2>Question {currentquestion + 1}</h2>
//           <p>{ questionData[currentquestion].question}</p>
//           <div className='options'>
//             {questionData[currentquestion].
//             options.map((option,index)=>(
//               <button key={index} onClick={()=>
//                 handleAnswerClick(option)}>
//                   {option}
//                   </button>
//             ))}
//             </div>
//             <div className='timer'>Time Left: <span>{timer}s</span> </div>
//         </div>
    
//         )}
        
//         </div>
       
//       </>
//   )
// }

// export default ReactQuestions
  