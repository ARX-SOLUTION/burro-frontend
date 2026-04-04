import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  mapAttemptQuestionsToView,
  mapFinishAttemptSummary,
} from '@/modules/arabtilibot/libs/mappers';
import { useAttemptQuestions } from '@/modules/arabtilibot/services/useAttemptQuestions';
import { useFinishAttempt } from '@/modules/arabtilibot/services/useFinishAttempt';
import { useStartAttempt } from '@/modules/arabtilibot/services/useStartAttempt';
import { useSubmitAnswer } from '@/modules/arabtilibot/services/useSubmitAnswer';
import { getErrorMessage } from '@/modules/common';

import OptionButton from './OptionButton';
import QuestionCard from './QuestionCard';

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
  const [finishSummary, setFinishSummary] = useState<ReturnType<
    typeof mapFinishAttemptSummary
  > | null>(null);

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

  const currentQuestion = questions[index];
  const progressCount = answeredQuestionIds.length;
  const totalQuestions = questionsResponse?.total_questions ?? 0;
  const livesRemaining = feedback?.livesRemaining ?? questionsResponse?.lives_remaining ?? 0;

  useEffect(() => {
    if (!moduleId) return;

    setAttemptId('');
    setFinishSummary(null);
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

  const handleRetry = () => {
    if (!moduleId) return;
    void startAttempt(moduleId)
      .then((response) => {
        setAttemptId(response.attempt_id);
        void refetchQuestions();
      })
      .catch(() => undefined);
  };

  function handleSelect(answer: string) {
    if (feedback) return;
    setSelected(answer);
  }

  async function handleCheck() {
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
  }

  async function handleNext() {
    if (!feedback) return;

    if (feedback.attemptStatus === 'failed') {
      navigate('/burro/modules');
      return;
    }

    if (feedback.allAnswered && attemptId) {
      try {
        const result = await finishAttempt(attemptId);
        setFinishSummary(mapFinishAttemptSummary(result));
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
  }

  if (!moduleId) {
    return (
      <div className="p-4">
        <div className="rounded-lg bg-white p-4 text-sm text-gray-500 shadow-sm">
          Modul aniqlanmadi.
        </div>
      </div>
    );
  }

  if (finishSummary) {
    return (
      <div className="p-4">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">{finishSummary.title}</h2>
          <p className="mt-2 text-sm text-gray-500">Mashq muvaffaqiyatli yakunlandi.</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-xs text-gray-500">Aniqlik</div>
              <div className="mt-1 text-lg font-semibold">{finishSummary.accuracyPct}%</div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-xs text-gray-500">XP</div>
              <div className="mt-1 text-lg font-semibold">+{finishSummary.xpEarned}</div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-xs text-gray-500">To‘g‘ri javoblar</div>
              <div className="mt-1 text-lg font-semibold">{finishSummary.correctCount}</div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-xs text-gray-500">Xato javoblar</div>
              <div className="mt-1 text-lg font-semibold">{finishSummary.wrongCount}</div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => navigate('/burro')}
              className="w-full rounded-lg bg-teal-600 py-3 font-semibold text-white"
            >
              Bosh sahifaga qaytish
            </button>
            <button
              type="button"
              onClick={() => navigate('/burro/modules')}
              className="w-full rounded-lg bg-gray-100 py-3 font-semibold text-gray-700"
            >
              Boshqa modulni tanlash
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isStarting || (attemptId && isQuestionsLoading)) {
    return <div className="p-4 text-sm text-gray-500">Mashq yuklanmoqda...</div>;
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

  if (!currentQuestion) {
    return (
      <div className="p-4">
        <div className="rounded-lg bg-white p-4 text-sm text-gray-500 shadow-sm">
          Bu modul uchun savollar topilmadi.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="px-3 py-2">
          Orqaga
        </button>
        <div className="text-sm text-gray-500">
          {progressCount}/{totalQuestions} • {livesRemaining} jon
        </div>
        <div className="text-xs text-gray-400">Amaliyot</div>
      </div>

      <div className="rounded-lg bg-white p-6">
        <QuestionCard q={currentQuestion} />
        <div className="mt-4 space-y-3">
          {currentQuestion.options.map((option) => (
            <OptionButton
              key={`${currentQuestion.id}-${option}`}
              onClick={() => handleSelect(option)}
              selected={selected === option}
              disabled={!!feedback}
            >
              {option}
            </OptionButton>
          ))}
        </div>

        {!feedback && submitError && (
          <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {getErrorMessage(submitError, 'Javobni yuborib bo‘lmadi')}
          </div>
        )}

        {feedback && (
          <div
            className={`mt-4 rounded-lg p-4 text-sm ${feedback.isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
          >
            <div className="font-semibold">
              {feedback.isCorrect ? 'To‘g‘ri javob' : 'Javob xato'}
            </div>
            {!feedback.isCorrect && (
              <div className="mt-2">
                To‘g‘ri javob: <span className="font-semibold">{feedback.correctAnswer}</span>
              </div>
            )}
            {feedback.tip && <div className="mt-2">{feedback.tip}</div>}
            {submitError && <div className="mt-2">{getErrorMessage(submitError)}</div>}
            {finishError && <div className="mt-2">{getErrorMessage(finishError)}</div>}
          </div>
        )}
      </div>

      <div className="fixed right-0 bottom-0 left-0 border-t bg-white p-4">
        {!feedback ? (
          <button
            className={`w-full rounded-lg py-3 ${selected ? 'bg-teal-600 text-white' : 'bg-gray-300'}`}
            onClick={handleCheck}
            disabled={!selected || isSubmitting}
          >
            {isSubmitting ? 'Tekshirilmoqda...' : 'Tekshirish'}
          </button>
        ) : (
          <button
            className="w-full rounded-lg bg-teal-600 py-3 text-white"
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
