import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/base/buttons/button';
import { usePageMetadata } from '@/libs/usePageMetadata';

// Figma asset constants (expire after ~7 days)
const PLAY_ICON = 'https://www.figma.com/api/mcp/asset/4efc551c-21c0-4fa9-a1a6-d0a46588431c';
const AVATAR_ICON = 'https://www.figma.com/api/mcp/asset/863856e1-3674-4192-bb15-2baf547e7d39';
const CIRCLE_ICON = 'https://www.figma.com/api/mcp/asset/19f642a8-7002-4d47-b7a4-cb579394451e';
const PLAY_ICON_DECOR = 'https://www.figma.com/api/mcp/asset/b00f17e2-1613-4c14-a4e7-ac962130a53e';
const LOCK_ICON = 'https://www.figma.com/api/mcp/asset/cdd84db9-b83c-44fb-b38c-c9ca00def377';

export const ArabTiliBotLessons = () => {
  usePageMetadata({ title: 'Arab tili darslari' });

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[448px] px-4 pb-24">
        {/* Header */}
        <div className="sticky top-0 z-20 -mx-4 mb-4 bg-transparent px-4 pt-4">
          <div className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                <img src={AVATAR_ICON} alt="A" className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-800">Salom, Azizbek 👋</div>
                <div className="text-xs text-yellow-500">★ 5 kun streak</div>
              </div>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs">🇬🇧 EN</div>
          </div>
        </div>

        {/* Hero card */}
        <div className="mb-4">
          <div className="relative h-[212px] overflow-hidden rounded-[16px] bg-[#0D9488] p-5 shadow-[0px_12px_24px_-6px_rgba(13,148,136,0.18)] transition-transform duration-300 hover:-translate-y-1">
            <img
              src={CIRCLE_ICON}
              alt=""
              className="absolute -top-8 -right-8 h-36 w-36 opacity-10"
            />
            <div className="text-sm text-white opacity-95">Davom etish</div>
            <div className="mt-3 text-2xl font-bold text-white">Sa, Jim, Ha</div>
            <div className="mt-4 flex items-center justify-between text-sm text-white/90">
              <div>4 / 10 savol</div>
              <div>~6 min</div>
            </div>

            <div className="mt-3 h-2 w-full rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white/80 shadow-inner"
                style={{ width: '45%' }}
              />
            </div>

            <div className="absolute right-5 bottom-5 left-5">
              <Button
                className="flex w-full transform items-center justify-center gap-3 rounded-[12px] bg-white py-3 font-semibold text-[#0D9488] shadow-lg transition-shadow duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
                onClick={() => navigate('/arab-tili/lesson/sa/play')}
                iconLeading={<img src={PLAY_ICON} alt="play" className="h-4 w-4" />}
                aria-label="Boshlash: Sa, Jim, Ha"
              >
                <span className="sr-only">Play</span>
                Boshlash
              </Button>
            </div>
          </div>
        </div>

        {/* Daily task card */}
        <div className="relative mb-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-gray-400 uppercase">Kunlik vazifa</div>
          <div className="mt-2 text-lg font-bold text-slate-800">10 ta savol yechin</div>
          <div className="absolute top-4 right-4 flex h-8 items-center justify-center rounded-full border border-yellow-100 bg-yellow-50 px-3 text-sm text-yellow-600">
            +20 XP
          </div>
        </div>

        {/* Today's results */}
        <div className="mb-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-slate-800">Bugungi natij</div>
            <div className="text-sm font-semibold text-teal-600">Batafsil</div>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="flex-1 rounded-lg bg-gray-50 p-4 text-center">
              <div className="text-xs text-gray-400">Vaqt</div>
              <div className="mt-2 text-lg font-bold">180 min</div>
            </div>
            <div className="flex-1 rounded-lg bg-gray-50 p-4 text-center">
              <div className="text-xs text-gray-400">XP</div>
              <div className="mt-2 text-lg font-bold">1240</div>
            </div>
          </div>
        </div>

        {/* Modules header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="text-lg font-bold text-slate-800">Modullar</div>
          <div className="text-sm text-teal-600">Barchasi</div>
        </div>

        {/* Modules horizontal scroll */}
        <div className="-mx-4 mb-20 overflow-x-auto px-4">
          <div className="flex gap-4">
            {[
              { title: 'Alif', desc: 'Alif, Ba, Ta', note: 'Tugallangan', locked: false },
              { title: 'Sa', desc: 'Sa, Jim, Ha', note: '6 min', locked: false },
              { title: 'Dal', desc: 'Dal, Zal, Ro', note: '8 min', locked: false },
              { title: 'Za', desc: 'Za, Sin, Shin', note: '10 min', locked: true },
              { title: 'Sod', desc: 'Sod, Dod', note: '12 min', locked: true },
            ].map((m) => (
              <div key={m.title} className="relative">
                <Button
                  onClick={() => navigate(`/arab-tili/lesson/${m.title.toLowerCase()}/play`)}
                  className={`max-w-[140px] min-w-[140px] rounded-lg border border-gray-100 ${m.locked ? 'bg-[#f9fafb]' : 'bg-white'} p-4 text-left shadow-sm`}
                  aria-label={`Ochiladigan modul: ${m.title}`}
                >
                  <div className="text-xl font-semibold text-slate-900">{m.title}</div>
                  <div className="mt-2 text-sm text-gray-500">{m.desc}</div>
                  <div className="mt-3 text-xs text-gray-400">{m.note}</div>
                </Button>
                {m.locked && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-[rgba(243,244,246,0.5)]">
                    <img src={LOCK_ICON} alt="locked" className="h-6 w-6 opacity-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Floating center play button (mimics bottom nav play in Figma) */}
        <div className="pointer-events-none fixed right-0 bottom-6 left-0 z-30 flex justify-center">
          <div className="pointer-events-auto">
            <Button
              onClick={() => navigate('/arab-tili/lesson/sa/play')}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0D9488] p-0 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.12)]"
              aria-label="O'rtadagi Boshlash"
            >
              <img src={PLAY_ICON_DECOR} alt="play" className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArabTiliBotLessons;
