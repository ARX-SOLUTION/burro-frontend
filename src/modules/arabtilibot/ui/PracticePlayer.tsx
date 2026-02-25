import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { modules as mockModules, Question } from '@/modules/arabtilibot/data/mock';

import OptionButton from './OptionButton';
import PracticeSuccess from './PracticeSuccess';
import QuestionCard from './QuestionCard';

export default function PracticePlayer() {
  const { moduleId } = useParams() as { moduleId?: string };
  const navigate = useNavigate();
  const module = mockModules.find((m) => m.id === moduleId) || mockModules[0];

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const q: Question = module.questions[index];

  useEffect(() => {
    setSelected(null);
    setAnswered(false);
  }, [index]);

  function handleSelect(key: string) {
    if (answered) return;
    setSelected(key);
  }

  function handleCheck() {
    if (!selected) return;
    const opt = q.options.find((o) => o.key === selected);
    const correct = !!opt && !!opt.correct;
    setAnswered(true);
    if (correct) {
      // award xp (UI only)
      setShowSuccess(true);
    } else {
      // incorrect answer
    }
  }

  function handleNext() {
    setShowSuccess(false);
    if (index < module.questions.length - 1) {
      setIndex((i) => i + 1);
    } else {
      navigate('/burro');
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="px-3 py-2">
          Orqaga
        </button>
        <div className="text-sm text-gray-500">{module.title}</div>
        <div />
      </div>

      <div className="rounded-lg bg-white p-6">
        <QuestionCard q={q} />
        <div className="mt-4 space-y-3">
          {q.options.map((opt) => (
            <OptionButton
              key={opt.key}
              onClick={() => handleSelect(opt.key)}
              selected={selected === opt.key}
              disabled={answered}
            >
              {opt.label}
            </OptionButton>
          ))}
        </div>
      </div>

      <div className="fixed right-0 bottom-0 left-0 border-t bg-white p-4">
        {!answered ? (
          <button
            className={`w-full rounded-lg py-3 ${selected ? 'bg-teal-600 text-white' : 'bg-gray-300'}`}
            onClick={handleCheck}
            disabled={!selected}
          >
            Tekshirish
          </button>
        ) : (
          <button className="w-full rounded-lg bg-teal-600 py-3 text-white" onClick={handleNext}>
            {index < module.questions.length - 1 ? 'Keyingi' : 'Darsni tugatish'}
          </button>
        )}
      </div>

      {showSuccess && <PracticeSuccess xp={10} onContinue={handleNext} />}
    </div>
  );
}
