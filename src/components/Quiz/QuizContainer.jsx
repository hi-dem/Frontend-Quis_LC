import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QuizHeader from './QuizHeader';
import QuestionDisplay from './QuestionDisplay';
import AnswerOptions from './AnswerOptions';
import QuizNavigation from './QuizNavigation';
import ReviewModal from './ReviewModal';
import mockQuizzes from '../../data/mockQuizzes';
import bgPattern from '../../assets/bg-pattern.svg';

// UTILITY: Shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// UTILITY: Ambil 3 soal random
const selectRandomQuestions = (allQuestions, count = 3) => {
  const shuffled = shuffleArray(allQuestions);
  return shuffled.slice(0, count);
};

const QuizContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // GET URL PARAMS
  const tutorialId = searchParams.get('tutorial_id') || '1';
  const userId = searchParams.get('user_id') || 'anonymous';
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [timeoutQuestions, setTimeoutQuestions] = useState(new Set()); // BARU: Track soal yang timeout
  const [isCurrentTimeUp, setIsCurrentTimeUp] = useState(false); // BARU: Track timeout soal sekarang
  
  const answerSelected = useRef(false);

  const quiz = mockQuizzes[0];
  const durationPerQuestion = quiz.durationPerQuestion;
  const totalSelectedQuestions = quiz.totalQuestions;
  
  // Initialize
  useEffect(() => {
    const storageKey = `quiz_${tutorialId}_${userId}`;
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
      const { questions, answers: savedAnswers, currentIndex, startTime: savedStartTime, timeoutQuestions: savedTimeout } = JSON.parse(savedData);
      setShuffledQuestions(questions);
      setAnswers(savedAnswers);
      setCurrentQuestionIndex(currentIndex);
      setStartTime(savedStartTime);
      setTimeRemaining(durationPerQuestion);
      setTimeoutQuestions(new Set(savedTimeout || [])); // LOAD timeout questions
      
      // Check apakah soal sekarang timeout
      if (savedTimeout && savedTimeout.includes(currentIndex)) {
        setIsCurrentTimeUp(true);
      }
      
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
      setTimeoutQuestions(new Set()); // INIT empty set
      setIsCurrentTimeUp(false);
      
      console.log('🆕 New quiz session created');
    }
  }, [tutorialId, userId, quiz, durationPerQuestion, totalSelectedQuestions]);

  // Save ke localStorage
  useEffect(() => {
    if (shuffledQuestions.length > 0) {
      const storageKey = `quiz_${tutorialId}_${userId}`;
      const dataToSave = {
        questions: shuffledQuestions,
        answers,
        currentIndex: currentQuestionIndex,
        startTime,
        timeoutQuestions: Array.from(timeoutQuestions) // SAVE timeout questions
      };
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    }
  }, [answers, currentQuestionIndex, shuffledQuestions, tutorialId, userId, startTime, timeoutQuestions]);

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

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Mark soal ini sebagai timeout
          setTimeoutQuestions(prev => new Set([...prev, currentQuestionIndex]));
          setIsCurrentTimeUp(true);
          
          // Auto pindah ke soal berikutnya
          if (currentQuestionIndex < totalQuestions - 1) {
            setTimeout(() => {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
              setTimeRemaining(durationPerQuestion);
              // Check apakah soal berikutnya sudah timeout
              setIsCurrentTimeUp(timeoutQuestions.has(currentQuestionIndex + 1));
            }, 1500);
            return 0;
          } else {
            // Soal terakhir, auto submit
            setTimeout(() => {
              handleSubmitQuiz();
            }, 1500);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, totalQuestions, durationPerQuestion, handleSubmitQuiz, timeoutQuestions]);

  useEffect(() => {
    if (!currentQuestion) return;
    
    const alreadyAnswered = answers[currentQuestionIndex];
    const isTimeout = timeoutQuestions.has(currentQuestionIndex);
    
    setSelectedAnswer(alreadyAnswered || null);
    
    if (alreadyAnswered) {
      setShowFeedback(true);
      const correct = alreadyAnswered === currentQuestion.correctAnswer;
      setIsCorrect(correct);
    } else {
      setShowFeedback(false);
    }
    
    // Update current timeout status
    setIsCurrentTimeUp(isTimeout);
    
    answerSelected.current = false;
  }, [currentQuestionIndex, answers, currentQuestion, timeoutQuestions]);

  const handleAnswerSelect = useCallback((answer) => {
    if (!currentQuestion) return;
    
    // PREVENT klik jawaban jika soal ini sudah timeout
    if (timeoutQuestions.has(currentQuestionIndex)) {
      console.warn('⏰ Waktu soal ini sudah habis, tidak bisa menjawab');
      return;
    }
    
    const alreadyAnswered = answers[currentQuestionIndex];
    
    if (alreadyAnswered) {
      setShowFeedback(true);
      return;
    }

    setShowFeedback(true);
    
    const correct = answer === currentQuestion.correctAnswer;
    
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer
    }));

    if (correct) {
      setScore(prevScore => prevScore + 1);
    }

  }, [currentQuestion, currentQuestionIndex, answers, timeoutQuestions]);

  const handleNextQuestion = () => {
    // ALLOW next JIKA:
    // 1. Sudah ada jawaban (showFeedback), ATAU
    // 2. Soal sudah timeout (user tidak perlu jawab)
    const canGoNext = showFeedback || timeoutQuestions.has(currentQuestionIndex);
    
    if (currentQuestionIndex < totalQuestions - 1 && canGoNext) {
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

  // Determine button states
  const canGoBack = currentQuestionIndex > 0;
  const canGoForward = showFeedback || timeoutQuestions.has(currentQuestionIndex); // UPDATED

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
            disabled={timeoutQuestions.has(currentQuestionIndex)} // UPDATED
          />

          {/* FEEDBACK - IN-PAGE */}
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

          {/* TIME UP MESSAGE */}
          {isCurrentTimeUp && !showFeedback && (
            <div className="mt-8 p-6 rounded-xl border-l-4 bg-orange-50 border-orange-500">
              <p className="text-orange-700 font-semibold">
                Waktu habis untuk soal ini. Anda dapat melanjutkan ke soal berikutnya.
              </p>
            </div>
          )}

          <QuizNavigation
            onPrevious={handlePreviousQuestion}
            onNext={handleNextQuestion}
            onSubmit={handleReviewQuiz}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            canGoBack={canGoBack}
            canGoForward={canGoForward} // UPDATED
            selectedAnswer={selectedAnswer}
            showFeedback={showFeedback}
            isTimeUp={isCurrentTimeUp}
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