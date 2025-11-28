import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QuizHeader from './QuizHeader';
import QuestionDisplay from './QuestionDisplay';
import AnswerOptions from './AnswerOptions';
import QuizNavigation from './QuizNavigation';
import FeedbackDisplay from './FeedbackDisplay';
import ReviewModal from './ReviewModal';
import mockQuizzes from '../../data/mockQuizzes';
import { shuffleArray } from '../../utils/helpers';
// bgPattern import kept if used elsewhere; not used for page background here
import bgPattern from '../../assets/bg-pattern.svg';

const shuffleQuestions = (questions, count = 3) => {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, count).map(q => {
    const originalCorrectAnswer = q.correctAnswer;
    const shuffledAnswers = shuffleArray(q.answers);
    
    return {
      ...q,
      answers: shuffledAnswers,
      originalCorrectAnswer: originalCorrectAnswer,
      correctAnswer: originalCorrectAnswer
    };
  });
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
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [timeoutQuestions, setTimeoutQuestions] = useState(new Set());
  const [isCurrentTimeUp, setIsCurrentTimeUp] = useState(false);

  const quiz = mockQuizzes[0];
  const durationPerQuestion = quiz.durationPerQuestion;
  const totalSelectedQuestions = quiz.totalQuestions;

  // Initialize quiz
  useEffect(() => {
    const storageKey = `quiz_${tutorialId}_${userId}`;
    const savedData = localStorage.getItem(storageKey);

    if (savedData) {
      try {
        const { questions, answers: savedAnswers, currentIndex, startTime: savedStartTime, timeoutQuestions: savedTimeout } = JSON.parse(savedData);
        setShuffledQuestions(questions);
        setAnswers(savedAnswers);
        setCurrentQuestionIndex(currentIndex);
        setStartTime(savedStartTime);
        setTimeRemaining(durationPerQuestion);
        setTimeoutQuestions(new Set(savedTimeout || []));

        if (savedTimeout && savedTimeout.includes(currentIndex)) {
          setIsCurrentTimeUp(true);
        }

        console.log('Loaded quiz from localStorage:', storageKey);
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    } else {
      const selectedQuestions = shuffleQuestions(quiz.questions, totalSelectedQuestions);
      setShuffledQuestions(selectedQuestions);
      setStartTime(new Date().toISOString());
      setTimeRemaining(durationPerQuestion);
      setTimeoutQuestions(new Set());
      setIsCurrentTimeUp(false);

      console.log('New quiz session created');
      console.log('Shuffled questions:', selectedQuestions);
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
        timeoutQuestions: Array.from(timeoutQuestions)
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(dataToSave));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [answers, currentQuestionIndex, shuffledQuestions, tutorialId, userId, startTime, timeoutQuestions]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const totalQuestions = shuffledQuestions.length;

  // Timer logic
  useEffect(() => {
    if (shuffledQuestions.length === 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setTimeoutQuestions(prevTimeout => new Set([...prevTimeout, currentQuestionIndex]));
          setIsCurrentTimeUp(true);

          if (currentQuestionIndex < totalQuestions - 1) {
            setTimeout(() => {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
              setTimeRemaining(durationPerQuestion);
              setShowFeedback(false);
              setSelectedAnswer(null);
              setIsCurrentTimeUp(false);
            }, 1500);
            return 0;
          } else {
            setTimeout(() => {
              setShowReviewModal(true);
            }, 1500);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, totalQuestions, durationPerQuestion, shuffledQuestions.length]);

  // Update selected answer
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

    setIsCurrentTimeUp(isTimeout);
  }, [currentQuestionIndex, answers, currentQuestion, timeoutQuestions]);

  const handleAnswerSelect = useCallback((answer) => {
    if (!currentQuestion) return;

    if (timeoutQuestions.has(currentQuestionIndex)) {
      console.warn('Waktu soal ini sudah habis');
      return;
    }

    const alreadyAnswered = answers[currentQuestionIndex];
    if (alreadyAnswered) {
      setShowFeedback(true);
      return;
    }

    setShowFeedback(true);
    const correct = answer === currentQuestion.correctAnswer;

    console.log(`Question ${currentQuestionIndex}: Selected "${answer}"`);
    console.log(`Correct answer: "${currentQuestion.correctAnswer}"`);
    console.log(`Is correct: ${correct}`);

    setSelectedAnswer(answer);
    setIsCorrect(correct);

    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer
    }));
  }, [currentQuestion, currentQuestionIndex, answers, timeoutQuestions]);

  const handleNextQuestion = () => {
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

  const handleConfirmSubmit = useCallback(() => {
    console.log('Starting submission');
    console.log('Current answers:', answers);
    console.log('Shuffled questions count:', shuffledQuestions.length);

    let correctCount = 0;

    Object.keys(answers).forEach((idx) => {
      const questionIndex = parseInt(idx, 10);
      const userAnswer = answers[idx];
      const question = shuffledQuestions[questionIndex];

      if (question && userAnswer) {
        const isCorrectAnswer = userAnswer === question.correctAnswer;
        if (isCorrectAnswer) {
          correctCount++;
        }
        console.log(`Q${questionIndex + 1}: User="${userAnswer}" | Correct="${question.correctAnswer}" | Match=${isCorrectAnswer}`);
      }
    });

    console.log('Final score:', correctCount, 'out of', totalQuestions);

    const storageKey = `quiz_${tutorialId}_${userId}`;
    localStorage.removeItem(storageKey);

    const navigationState = {
      score: correctCount,
      totalQuestions: totalQuestions,
      answers: answers,
      quiz: {
        ...quiz,
        questions: shuffledQuestions,
        totalQuestions: totalQuestions
      },
      startTime: startTime,
      tutorialId: tutorialId,
      userId: userId
    };

    console.log('Navigating to /results with score:', correctCount);

    setShowReviewModal(false);

    setTimeout(() => {
      navigate('/results', { state: navigationState });
    }, 100);
  }, [navigate, quiz, answers, shuffledQuestions, startTime, tutorialId, userId, totalQuestions]);

  const isWarning = timeRemaining < 10;
  const canGoBack = currentQuestionIndex > 0;
  const canGoForward = showFeedback || timeoutQuestions.has(currentQuestionIndex);

  if (!currentQuestion || shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen -translate-y-10  p-4 md:p-6 relative`}>
      {/* Background removed here — LayoutWrapper already provides the page background. */}

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
            disabled={timeoutQuestions.has(currentQuestionIndex)}
          />

          {showFeedback && (
            <FeedbackDisplay
              isCorrect={isCorrect}
              explanation={currentQuestion.explanation}
              isTimeUp={false}
            />
          )}

          {isCurrentTimeUp && !showFeedback && (
            <div className="mt-8 p-6 rounded-xl border-l-4 bg-orange-50 border-orange-500">
              <p className="text-orange-700 font-semibold">
                Waktu habis untuk soal ini.  Anda dapat melanjutkan ke soal berikutnya.
              </p>
            </div>
          )}

          <QuizNavigation
            onPrevious={handlePreviousQuestion}
            onNext={handleNextQuestion}
            onSubmit={() => {
              console.log('Opening review modal');
              setShowReviewModal(true);
            }}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            selectedAnswer={selectedAnswer}
            showFeedback={showFeedback}
            isTimeUp={isCurrentTimeUp}
          />
        </div>

        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => {
            console.log('Closing review modal');
            setShowReviewModal(false);
          }}
          onConfirm={() => {
            console.log('Confirmed submission');
            handleConfirmSubmit();
          }}
          answers={answers}
          totalQuestions={totalQuestions}
        />
      </div>
    </div>
  );
};

export default QuizContainer;