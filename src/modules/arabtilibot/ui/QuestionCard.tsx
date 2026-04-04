import { Speaker03 } from '@untitledui/icons';

import type { BurroPracticeQuestion } from '@/modules/arabtilibot/types/view';

export default function QuestionCard({ q }: { q: BurroPracticeQuestion }) {
  return (
    <div className="text-center">
      {q.letter && (
        <div className="text-[96px] leading-none font-bold text-teal-600">{q.letter}</div>
      )}
      <div className="mt-4 text-lg font-semibold">{q.prompt}</div>

      {q.type === 'audio' && (
        <div className="mt-6 rounded-2xl bg-teal-50 p-5 text-left">
          <div className="flex items-center justify-center gap-3 text-teal-700">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-600 text-white">
              <Speaker03 className="size-6" />
            </div>
            <div>
              <div className="text-sm font-semibold">Tovushni eshiting</div>
              <div className="text-xs text-teal-700/80">
                Javobni tanlashdan oldin audioni tinglang.
              </div>
            </div>
          </div>

          {q.audioUrl ? (
            <audio className="mt-4 w-full" controls preload="none">
              <source src={q.audioUrl} />
              Brauzer audio elementini qo&apos;llab-quvvatlamaydi.
            </audio>
          ) : (
            <div className="mt-4 rounded-xl bg-white/80 px-4 py-3 text-sm text-teal-800">
              Audio havolasi hozircha mavjud emas. Variantlar orqali davom etishingiz mumkin.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
