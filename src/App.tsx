import React, { useState } from "react";
import { getQuizQuestions } from "./utils/API";
import "./App.css";

//Components
import QuestionCard from "./components/QuestionCard";

//Types
import { Difficulty, QuestionsState } from "./utils/API";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTION = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await getQuizQuestions(
      TOTAL_QUESTION,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>Quizicle?</h1>
      {(gameOver || userAnswers.length === TOTAL_QUESTION) && (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      )}
      {!gameOver && <p className="score">Score:</p>}
      {loading && <p>Loading Questions. Please be patient.</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNum={number + 1}
          question={questions[number].question}
          answers={questions[number].answers}
          callback={checkAnswer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          totalQuestions={TOTAL_QUESTION}
        />
      )}
      
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
};

export default App;
