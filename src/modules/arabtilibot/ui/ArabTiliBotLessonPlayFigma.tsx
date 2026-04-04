import React, { useState } from 'react';

import { Button } from '@/components/base/buttons/button';
import { CloseButton } from '@/components/base/buttons/close-button';

export const ArabTiliBotLessonPlayFigma: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const options = [
    { key: 'a', label: 'Ja' },
    { key: 'b', label: 'Ha' },
    { key: 'c', label: 'Kha' },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900/60 p-6">
      <div className="relative w-full max-w-[448px]">
        {/* Top bar */}
        <div className="absolute top-0 right-0 left-0 flex items-center justify-between bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <CloseButton
              size="sm"
              theme="light"
              onPress={() => {
                /* close handler */
              }}
            />
          </div>
          <div className="flex-1 px-4">
            <div className="h-3 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full bg-teal-600" style={{ width: '36%' }} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-semibold text-red-500">
              ❤️ <span className="ml-0">3</span>
            </div>
            <div className="font-semibold text-yellow-400">+0 XP</div>
          </div>
        </div>

        {/* Card */}
        <div className="mt-12 overflow-hidden rounded-md bg-white shadow-xl">
          <div className="bg-[#f9fafb] p-6 pt-24 pb-32 text-center">
            <h2 className="mb-6 text-lg font-semibold text-[#374151]">
              Qaysi tovush to&#39;g&#39;ri keladi?
            </h2>

            <div className="mb-8 text-[128px] leading-none font-bold text-teal-600">ج</div>

            <div className="space-y-3 px-4">
              {options.map((opt) => {
                const isSelected = selected === opt.key;
                return (
                  <div key={opt.key}>
                    <Button
                      onClick={() => !answered && setSelected(opt.key)}
                      data-selected={isSelected ? 'true' : undefined}
                      className={`w-full rounded-[12px] py-4 font-bold ${isSelected ? 'border-transparent bg-[#0D9488] text-white' : 'border border-gray-200 bg-white text-[#374151]'}`}
                      aria-pressed={isSelected}
                    >
                      {opt.label}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom overlay with hint and action */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <Button onClick={() => {}} className="px-3 py-2">
                  ?
                </Button>
              </div>
              <div className="flex-1 px-4">
                <Button
                  isDisabled={!selected || answered}
                  className={`w-full rounded-[12px] py-4 font-semibold text-white ${selected && !answered ? 'bg-teal-600' : 'bg-gray-300'}`}
                  onClick={() => setAnswered(true)}
                >
                  Tekshirish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArabTiliBotLessonPlayFigma;
