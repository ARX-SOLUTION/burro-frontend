import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { mapAttemptQuestionsToView } from '@/modules/arabtilibot/libs/mappers';
import { useAttemptQuestions } from '@/modules/arabtilibot/services/useAttemptQuestions';
import { useFinishAttempt } from '@/modules/arabtilibot/services/useFinishAttempt';
import { useStartAttempt } from '@/modules/arabtilibot/services/useStartAttempt';
import { useSubmitAnswer } from '@/modules/arabtilibot/services/useSubmitAnswer';
import type { LessonPlayQuestion } from '@/modules/arabtilibot/types/question';
import { getErrorMessage } from '@burro/shared/modules/common';

import { AudioQuestion } from './play/AudioQuestion';
import { LessonPlayHeader } from './play/LessonPlayHeader';
import { McqQuestion } from './play/McqQuestion';
import { ResultBanner } from './play/ResultBanner';

export default function PracticePlayer() {
  const { moduleId } = useParams() as { moduleId?: string };
  const navigate = useNavigate();
  const [attemptId, setAttemptId] = useState('');
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    correctAnswer: string;
    tip: string | null;
    attemptStatus: 'in_progress' | 'failed';
    allAnswered: boolean;
    livesRemaining: number;
  } | null>(null);
  const {
    mutateAsync: startAttempt,
    isPending: isStarting,
    error: startError,
    reset: resetStartAttempt,
  } = useStartAttempt();
  const {
    data: questionsResponse,
    isLoading: isQuestionsLoading,
    error: questionsError,
    refetch: refetchQuestions,
  } = useAttemptQuestions(attemptId);
  const {
    mutateAsync: submitAnswer,
    isPending: isSubmitting,
    error: submitError,
    reset: resetSubmitAnswer,
  } = useSubmitAnswer();
  const {
    mutateAsync: finishAttempt,
    isPending: isFinishing,
    error: finishError,
    reset: resetFinishAttempt,
  } = useFinishAttempt();

  const questions = useMemo(
    () => (questionsResponse ? mapAttemptQuestionsToView(questionsResponse) : []),
    [questionsResponse],
  );

  const currentQuestion = useMemo(() => questions[index], [questions, index]);
  const currentQuestionOptions = useMemo(
    () => currentQuestion?.options.map((opt) => ({ key: opt, label: opt })) ?? [],
    [currentQuestion],
  );

  const lessonQuestion = useMemo<LessonPlayQuestion | null>(() => {
    if (!currentQuestion) return null;

    return {
      id: currentQuestion.id,
      letter: currentQuestion.letter ?? '',
      prompt: currentQuestion.prompt,
      options: currentQuestionOptions,
    };
  }, [currentQuestion, currentQuestionOptions]);

  const progressCount = answeredQuestionIds.length;
  const totalQuestions = questionsResponse?.total_questions ?? 0;
  const progressPercent = useMemo(
    () => (totalQuestions > 0 ? Math.round((progressCount / totalQuestions) * 100) : 0),
    [progressCount, totalQuestions],
  );
  const livesRemaining = feedback?.livesRemaining ?? questionsResponse?.lives_remaining ?? 0;

  useEffect(() => {
    if (!moduleId) return;

    setAttemptId('');
    setAnsweredQuestionIds([]);
    setFeedback(null);
    setSelected(null);
    setIndex(0);
    resetStartAttempt();

    void startAttempt(moduleId)
      .then((response) => {
        setAttemptId(response.attempt_id);
      })
      .catch(() => undefined);
  }, [moduleId, resetStartAttempt, startAttempt]);

  useEffect(() => {
    if (!questionsResponse) return;

    const answeredIds = questionsResponse.questions
      .filter((question) => question.is_answered)
      .map((question) => question.id);

    setAnsweredQuestionIds(answeredIds);

    const firstUnansweredIndex = questionsResponse.questions.findIndex(
      (question) => !question.is_answered,
    );
    setIndex(firstUnansweredIndex === -1 ? 0 : firstUnansweredIndex);
  }, [questionsResponse]);

  useEffect(() => {
    setSelected(null);
    setFeedback(null);
    resetSubmitAnswer();
    resetFinishAttempt();
  }, [index, resetFinishAttempt, resetSubmitAnswer]);

  const handleRetry = useCallback(() => {
    if (!moduleId) return;
    void startAttempt(moduleId)
      .then((response) => {
        setAttemptId(response.attempt_id);
        void refetchQuestions();
      })
      .catch(() => undefined);
  }, [moduleId, refetchQuestions, startAttempt]);

  const handleSelect = useCallback(
    (answer: string) => {
      if (feedback) return;
      setSelected(answer);
    },
    [feedback],
  );

  const handleCheck = useCallback(async () => {
    if (!selected || !attemptId || !currentQuestion) return;

    try {
      const result = await submitAnswer({
        attemptId,
        payload: {
          question_id: currentQuestion.id,
          given_answer: selected,
        },
      });

      setAnsweredQuestionIds((prev) =>
        prev.includes(currentQuestion.id) ? prev : [...prev, currentQuestion.id],
      );
      setFeedback({
        isCorrect: result.is_correct,
        correctAnswer: result.correct_answer,
        tip: result.tip,
        attemptStatus: result.attempt_status,
        allAnswered: result.all_answered,
        livesRemaining: result.lives_remaining,
      });
    } catch {
      return;
    }
  }, [selected, attemptId, currentQuestion, submitAnswer]);

  const handleReplay = useCallback(() => {
    const audio = document.querySelector<HTMLAudioElement>('audio[data-question]');
    void audio?.play();
  }, []);

  const handleClose = useCallback(() => {
    navigate('/burro/modules');
  }, [navigate]);

  const handleNext = useCallback(async () => {
    if (!feedback) return;

    if (feedback.attemptStatus === 'failed') {
      navigate('/burro/modules');
      return;
    }

    if (feedback.allAnswered && attemptId) {
      try {
        const result = await finishAttempt(attemptId);
        navigate('/burro/results', { state: result });
      } catch {
        return;
      }
      return;
    }

    const nextIndex = questions.findIndex(
      (question, questionIndex) =>
        questionIndex > index && !answeredQuestionIds.includes(question.id),
    );

    if (nextIndex >= 0) {
      setIndex(nextIndex);
      return;
    }

    const firstRemainingIndex = questions.findIndex(
      (question) => !answeredQuestionIds.includes(question.id),
    );

    if (firstRemainingIndex >= 0) {
      setIndex(firstRemainingIndex);
    } else {
      navigate('/burro/modules');
    }
  }, [attemptId, feedback, finishAttempt, index, navigate, questions, answeredQuestionIds]);

  if (!moduleId) {
    return (
      <div className="p-4">
        <div className="rounded-lg bg-white p-4 text-sm text-gray-500 shadow-sm">
          Modul aniqlanmadi.
        </div>
      </div>
    );
  }

  if (isStarting || (attemptId && isQuestionsLoading)) {
    return (
      <div className="min-h-screen bg-white">
        <div className="h-14 animate-pulse bg-gray-100" />
        <div className="px-6 pt-24 pb-36">
          <div className="mx-auto mb-8 h-6 w-48 animate-pulse rounded-full bg-gray-100" />
          <div className="mx-auto mb-12 h-32 w-32 animate-pulse rounded-2xl bg-gray-100" />
          <div className="grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[58px] animate-pulse rounded-xl bg-gray-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const initialError = startError || questionsError;

  if (initialError) {
    return (
      <div className="p-4">
        <div className="rounded-lg bg-white p-4 text-sm text-red-600 shadow-sm">
          <p>{getErrorMessage(initialError, 'Mashqni yuklab bo‘lmadi')}</p>
          <button type="button" onClick={handleRetry} className="mt-3 font-semibold text-teal-600">
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion || !lessonQuestion) {
    return (
      <div className="p-4">
        <div className="rounded-lg bg-white p-4 text-sm text-gray-500 shadow-sm">
          Bu modul uchun savollar topilmadi.
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white">
      <LessonPlayHeader
        progressPercent={progressPercent}
        hearts={livesRemaining}
        xpText="+0 XP"
        closeAriaLabel="Yopish"
        onClose={handleClose}
      />

      {currentQuestion.type === 'audio' ? (
        <AudioQuestion
          question={lessonQuestion}
          selectedOptionKey={selected}
          feedbackCorrectKey={feedback?.correctAnswer ?? null}
          isAnswered={!!feedback}
          onReplay={handleReplay}
          onSelectOption={handleSelect}
        />
      ) : (
        <McqQuestion
          question={lessonQuestion}
          selectedOptionKey={selected}
          feedbackCorrectKey={feedback?.correctAnswer ?? null}
          isAnswered={!!feedback}
          onSelectOption={handleSelect}
        />
      )}

      {currentQuestion.type === 'audio' && currentQuestion.audioUrl && (
        <audio
          data-question
          src={currentQuestion.audioUrl}
          preload="auto"
          autoPlay
          className="hidden"
        />
      )}

      <div className="fixed right-0 bottom-0 left-0 bg-white px-4 pt-3 pb-6 shadow-[0_-1px_0_rgb(229,231,235)]">
        {feedback && (
          <div className="mb-3">
            <ResultBanner
              variant={feedback.isCorrect ? 'success' : 'error'}
              title={feedback.isCorrect ? "To'g'ri javob!" : 'Javob xato'}
              descriptionPrefix={!feedback.isCorrect ? "To'g'ri javob:" : undefined}
              descriptionValue={!feedback.isCorrect ? feedback.correctAnswer : undefined}
            />
            {feedback.tip && <p className="mt-2 text-sm text-gray-500">{feedback.tip}</p>}
          </div>
        )}

        {!feedback && submitError && (
          <div className="mb-3 rounded-lg bg-error-50 p-3 text-sm text-error-700">
            {getErrorMessage(submitError, "Javobni yuborib bo'lmadi")}
          </div>
        )}
        {finishError && (
          <div className="mb-3 rounded-lg bg-error-50 p-3 text-sm text-error-700">
            {getErrorMessage(finishError, "Darsni yakunlab bo'lmadi")}
          </div>
        )}

        {!feedback ? (
          <button
            type="button"
            className={`w-full rounded-[28px] py-4 text-base font-bold transition-colors ${
              selected ? 'bg-teal-600 text-white' : 'cursor-not-allowed bg-gray-100 text-gray-400'
            }`}
            onClick={handleCheck}
            disabled={!selected || isSubmitting}
          >
            {isSubmitting ? 'Tekshirilmoqda...' : 'Tekshirish'}
          </button>
        ) : (
          <button
            type="button"
            className="w-full rounded-[28px] bg-teal-600 py-4 text-base font-bold text-white"
            onClick={handleNext}
            disabled={isFinishing}
          >
            {isFinishing
              ? 'Yakunlanmoqda...'
              : feedback.allAnswered
                ? 'Darsni tugatish'
                : feedback.attemptStatus === 'failed'
                  ? 'Modullarga qaytish'
                  : 'Keyingi'}
          </button>
        )}
      </div>
    </div>
  );
}
