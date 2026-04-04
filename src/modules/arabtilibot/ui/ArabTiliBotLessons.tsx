import { useNavigate } from 'react-router-dom';
import { BookOpen01, Home03, Lock01, Play, Trophy01, User01 } from '@untitledui/icons';

import { Button } from '@/components/base/buttons/button';
import { usePageMetadata } from '@/libs/usePageMetadata';

const dashboardModules = [
  { id: 'alif', title: 'Alif', description: 'Alif, Ba, Ta', note: 'Tugallangan', locked: false },
  { id: 'sa', title: 'Sa', description: 'Sa, Jim, Ha', note: '6 min', locked: false },
  { id: 'dal', title: 'Dal', description: 'Dal, Zal, Ro', note: '8 min', locked: false },
  { id: 'za', title: 'Za', description: 'Za, Sin, Shin', note: '10 min', locked: true },
  { id: 'sod', title: 'Sod', description: 'Sod, Dod', note: '12 min', locked: true },
];

export const ArabTiliBotLessons = () => {
  usePageMetadata({ title: 'Arab tili darslari' });

  const navigate = useNavigate();
  const handleStartLesson = () => navigate('/arab-tili/lesson/sa/play');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto min-h-screen w-full max-w-[448px] bg-gray-50 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
        <div className="sticky top-0 z-20 bg-white px-4 py-3 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-[#ccfbf1] text-[16px] leading-[24px] font-bold text-[#0f766e]">
                A
              </div>
              <div>
                <p className="text-[14px] leading-[20px] font-bold text-[#1f2937]">
                  Salom, Azizbek 👋
                </p>
                <p className="text-[12px] leading-[16px] font-bold text-[#fbbf24]">
                  🔥 5 kun streak
                </p>
              </div>
            </div>
            <div className="rounded-full bg-[#f3f4f6] px-3 py-1 text-[12px] leading-[16px] font-bold text-[#4b5563]">
              🇬🇧 EN
            </div>
          </div>
        </div>

        <div className="space-y-6 px-4 py-4 pb-28">
          <div className="relative h-[212px] overflow-hidden rounded-2xl bg-[#0D9488] p-5 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
            <div className="absolute -top-10 -right-10 size-32 rounded-full bg-white/5" />
            <p className="text-[14px] leading-[20px] font-semibold text-white/90">Davom etish</p>
            <p className="mt-1 text-[24px] leading-[32px] font-bold text-white">Sa, Jim, Ha</p>

            <div className="mt-3 flex items-center justify-between text-[14px] leading-[20px] text-white/90">
              <p>4 / 10 savol</p>
              <p>~6 min</p>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/20">
              <div className="h-full w-2/5 bg-white/90" />
            </div>
            <div className="mt-4">
              <Button
                color="tertiary"
                className="w-full rounded-xl bg-white py-3 text-[18px] leading-[28px] font-bold text-[#0f766e] hover:bg-white hover:text-[#0f766e]"
                onClick={handleStartLesson}
                iconLeading={Play}
              >
                Boshlash
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-[#f3f4f6] bg-white p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
            <div>
              <p className="text-[12px] leading-[16px] font-bold text-[#9ca3af] uppercase">
                Kunlik vazifa
              </p>
              <p className="mt-1 text-[16px] leading-[24px] font-bold text-[#1f2937]">
                10 ta savol yechin
              </p>
            </div>
            <div className="rounded-full border border-[#fbbf2433] bg-[#fbbf241a] px-3 py-1 text-[12px] leading-[16px] font-bold text-[#fbbf24]">
              +20 XP
            </div>
          </div>

          <div className="rounded-2xl border border-[#f3f4f6] bg-white p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between">
              <p className="text-[16px] leading-[24px] font-bold text-[#1f2937]">Bugungi natij</p>
              <button
                type="button"
                className="text-[12px] leading-[16px] font-bold text-[#0D9488]"
                aria-label="Bugungi natija batafsil"
              >
                Batafsil
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-[#f9fafb] p-3">
                <p className="text-[12px] leading-[16px] text-[#9ca3af]">Vaqt</p>
                <p className="mt-1 text-[18px] leading-[28px] font-bold text-[#1f2937]">180 min</p>
              </div>
              <div className="rounded-xl bg-[#f9fafb] p-3">
                <p className="text-[12px] leading-[16px] text-[#9ca3af]">XP</p>
                <p className="mt-1 text-[18px] leading-[28px] font-bold text-[#1f2937]">1240</p>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[16px] leading-[24px] font-bold text-[#1f2937]">Modullar</p>
              <button
                type="button"
                className="text-[12px] leading-[16px] font-bold text-[#0D9488]"
                onClick={() => navigate('/arab-tili/lesson')}
              >
                Barchasi
              </button>
            </div>
            <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-3 pb-1">
                {dashboardModules.map((module) => (
                  <button
                    key={module.title}
                    type="button"
                    disabled={module.locked}
                    onClick={() => navigate(`/arab-tili/lesson/${module.id}/play`)}
                    className={`relative h-32 w-36 min-w-36 rounded-xl border border-[#e5e7eb] p-4 text-left ${
                      module.locked
                        ? 'bg-[#f9fafb]'
                        : 'bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]'
                    }`}
                  >
                    <p className="text-[30px] leading-[36px] font-bold text-[#1f2937]">
                      {module.title}
                    </p>
                    <p className="mt-2 text-[12px] leading-[16px] text-[#6b7280]">
                      {module.description}
                    </p>
                    <p className="mt-1 text-[10px] leading-[15px] font-bold text-[#9ca3af]">
                      {module.note}
                    </p>
                    {module.locked && (
                      <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#f3f4f680]">
                        <Lock01 className="size-6 text-[#6b7280]" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center">
          <div className="relative w-full max-w-[448px] border-t border-[#e5e7eb] bg-white">
            <div className="grid h-16 grid-cols-5 items-center px-4">
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-1 text-[#0D9488]"
                onClick={() => navigate('/arab-tili/lessons')}
              >
                <Home03 className="size-6" />
                <span className="text-[10px] leading-[15px]">Home</span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-1 text-[#9ca3af]"
                onClick={() => navigate('/arab-tili/lesson')}
              >
                <BookOpen01 className="size-6" />
                <span className="text-[10px] leading-[15px]">Modullar</span>
              </button>
              <div />
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-1 text-[#9ca3af]"
              >
                <Trophy01 className="size-6" />
                <span className="text-[10px] leading-[15px]">Reyting</span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-1 text-[#9ca3af]"
              >
                <User01 className="size-6" />
                <span className="text-[10px] leading-[15px]">Profil</span>
              </button>
            </div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Button
                color="tertiary"
                className="size-16 rounded-full border-4 border-[#f3f4f6] bg-[#0D9488] p-0 text-white hover:bg-[#0D9488] hover:text-white"
                onClick={handleStartLesson}
                aria-label="Darsni boshlash"
              >
                <Play className="size-7 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArabTiliBotLessons;
