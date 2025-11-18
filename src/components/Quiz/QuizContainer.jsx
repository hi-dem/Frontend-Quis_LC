import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QuizHeader from './QuizHeader';
import QuestionDisplay from './QuestionDisplay';
import AnswerOptions from './AnswerOptions';
import QuizNavigation from './QuizNavigation';
import ReviewModal from './ReviewModal';
import mockQuizzes from '../../data/mockQuizzes';
import bgPattern from '../../assets/bg-pattern.svg';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const selectRandomQuestions = (allQuestions, count = 3) => {
  const shuffled = shuffleArray(allQuestions);
  return shuffled.slice(0, count);
};

const QuizContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const tutorialId = searchParams.get('tutorial_id') || '1';
  const userId = searchParams.get('user_id') || 'anonymous';
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30); 
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  
  const answerSelected = useRef(false);

  const quiz = mockQuizzes[0];
  const durationPerQuestion = quiz.durationPerQuestion;
  const totalSelectedQuestions = quiz.totalQuestions;
  
  useEffect(() => {
    const storageKey = `quiz_${tutorialId}_${userId}`;
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
      const { questions, answers: savedAnswers, currentIndex, startTime: savedStartTime } = JSON.parse(savedData);
      setShuffledQuestions(questions);
      setAnswers(savedAnswers);
      setCurrentQuestionIndex(currentIndex);
      setStartTime(savedStartTime);
      setTimeRemaining(durationPerQuestion);
      
      let correctCount = 0;
      Object.keys(savedAnswers).forEach(idx => {
        if (savedAnswers[idx] === questions[idx].correctAnswer) correctCount++;
      });
      setScore(correctCount);
      
      console.log('✅ Loaded from localStorage:', storageKey);
    } else {
      const selectedQuestions = selectRandomQuestions(quiz.questions, totalSelectedQuestions);
      

      const shuffled = shuffleArray(selectedQuestions);
      const questionsWithShuffledAnswers = shuffled.map(question => ({
        ...question,
        answers: shuffleArray(question.answers)
      }));
      
      setShuffledQuestions(questionsWithShuffledAnswers);
      setStartTime(new Date().toISOString());
      setTimeRemaining(durationPerQuestion);
      
      console.log('🆕 New quiz session created with', totalSelectedQuestions, 'questions');
    }
  }, [tutorialId, userId, quiz, durationPerQuestion, totalSelectedQuestions]);

  useEffect(() => {
    if (shuffledQuestions.length > 0) {
      const storageKey = `quiz_${tutorialId}_${userId}`;
      const dataToSave = {
        questions: shuffledQuestions,
        answers,
        currentIndex: currentQuestionIndex,
        startTime
      };
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    }
  }, [answers, currentQuestionIndex, shuffledQuestions, tutorialId, userId, startTime]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const totalQuestions = shuffledQuestions.length;

  const handleSubmitQuiz = useCallback(() => {
    let correctCount = 0;
    Object.keys(answers).forEach(questionIdx => {
      const answer = answers[questionIdx];
      const correct = answer === shuffledQuestions[questionIdx].correctAnswer;
      if (correct) correctCount++;
    });

    const storageKey = `quiz_${tutorialId}_${userId}`;
    localStorage.removeItem(storageKey);

    navigate('/results', { 
      state: { 
        score: correctCount,
        totalQuestions,
        answers,
        quiz: { ...quiz, questions: shuffledQuestions },
        startTime,
        tutorialId,
        userId
      } 
    });
  }, [navigate, quiz, totalQuestions, answers, shuffledQuestions, startTime, tutorialId, userId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            return durationPerQuestion; 
          } else {
            handleSubmitQuiz();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, totalQuestions, durationPerQuestion, handleSubmitQuiz]);

  useEffect(() => {
    if (!currentQuestion) return;
    
    const alreadyAnswered = answers[currentQuestionIndex];
    
    setSelectedAnswer(alreadyAnswered || null);
    
    if (alreadyAnswered) {
      setShowFeedback(true);
      const correct = alreadyAnswered === currentQuestion.correctAnswer;
      setIsCorrect(correct);
      setFeedbackMessage(correct ? '✓ Jawaban Benar!' : '✗ Jawaban Salah');
    } else {
      setShowFeedback(false);
    }
    
    answerSelected.current = false;
  }, [currentQuestionIndex, answers, currentQuestion]);

  const handleAnswerSelect = useCallback((answer) => {
    if (!currentQuestion) return;
    
    const alreadyAnswered = answers[currentQuestionIndex];
    
    if (alreadyAnswered) {
      setShowFeedback(true);
      return;
    }

    setShowFeedback(true);
    
    const correct = answer === currentQuestion.correctAnswer;
    
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setFeedbackMessage(correct ? '✓ Jawaban Benar!' : '✗ Jawaban Salah');
    
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer
    }));

    if (correct) {
      setScore(prevScore => prevScore + 1);
    }

  }, [currentQuestion, currentQuestionIndex, answers]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1 && showFeedback) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeRemaining(durationPerQuestion); 
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setTimeRemaining(durationPerQuestion); 
    }
  };

  const handleReviewQuiz = () => {
    setShowReviewModal(true);
  };

  const isWarning = timeRemaining < 10; 

  if (!currentQuestion) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6 relative">
      <div 
        className="fixed inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `url(${bgPattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <QuizHeader
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          timeRemaining={timeRemaining}
          isWarning={isWarning}
          userId={userId}
          tutorialId={tutorialId}
        />

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 animate-slideUp">
          <QuestionDisplay
            question={currentQuestion.question}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />

          <AnswerOptions
            options={currentQuestion.answers}
            selectedAnswer={selectedAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            showFeedback={showFeedback}
            onSelectAnswer={handleAnswerSelect}
          />

          {showFeedback && (
            <div className={`mt-8 p-6 rounded-xl border-l-4 ${
              isCorrect 
                ? 'bg-green-50 border-green-500' 
                : 'bg-red-50 border-red-500'
            }`}>
              <p className={`font-bold text-lg mb-2 flex items-center gap-2 ${
                isCorrect ? 'text-green-700' : 'text-red-700'
              }`}>
                <span>{isCorrect ? '✓' : '✗'}</span>
                {isCorrect ? 'Jawaban Benar!' : 'Jawaban Salah!'}
              </p>
              <p className={`text-base leading-relaxed ${
                isCorrect ? 'text-green-800' : 'text-red-800'
              }`}>
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <QuizNavigation
            onPrevious={handlePreviousQuestion}
            onNext={handleNextQuestion}
            onSubmit={handleReviewQuiz}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            canGoBack={currentQuestionIndex > 0}
            canGoForward={showFeedback}
            selectedAnswer={selectedAnswer}
            showFeedback={showFeedback}
          />
        </div>

        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onConfirm={handleSubmitQuiz}
          answers={answers}
          totalQuestions={totalQuestions}
        />
      </div>
    </div>
  );
};

export default QuizContainer;