import { Button } from '@/components/base/buttons/button';
import { usePageMetadata } from '@/libs/usePageMetadata';
import { useNavigate } from 'react-router-dom';

// Figma asset constants (expire after ~7 days)
const PLAY_ICON = 'https://www.figma.com/api/mcp/asset/5bcdc797-b751-4b59-96f5-3759f75e53d5';
const AVATAR_ICON = 'https://www.figma.com/api/mcp/asset/b9487eb8-7535-4bbe-8a0a-27f71478bec1';
const CIRCLE_ICON = 'https://www.figma.com/api/mcp/asset/9745aca0-df50-41f8-92b9-26b86834f9c1';

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
          <div className="relative overflow-hidden rounded-2xl bg-[#0D9488] p-5 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
            <img src={CIRCLE_ICON} alt="" className="absolute top-0 right-0 h-28 w-28 opacity-10" />
            <div className="text-sm text-white opacity-95">Davom etish</div>
            <div className="mt-3 text-2xl font-bold text-white">Sa, Jim, Ha</div>
            <div className="mt-4 flex items-center justify-between text-sm text-white/90">
              <div>4 / 10 savol</div>
              <div>~6 min</div>
            </div>

            <div className="mt-3 h-2 w-full rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white/80" style={{ width: '45%' }} />
            </div>

            <div className="mt-4">
              <Button
                className="w-full rounded-[12px] bg-white py-3 font-semibold text-[#0D9488] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                onClick={() => navigate('/arab-tili/lesson/sa/play')}
                iconLeading={<img src={PLAY_ICON} alt="play" className="h-4 w-4" />}
                aria-label="Boshlash: Sa, Jim, Ha"
              >
                Boshlash
              </Button>
            </div>
          </div>
        </div>

        {/* Daily task card */}
        <div className="mb-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold text-gray-400 uppercase">Kunlik vazifa</div>
          <div className="mt-2 text-lg font-bold text-slate-800">10 ta savol yechin</div>
          <div className="absolute right-6 mt-[-36px] flex h-8 w-20 items-center justify-center rounded-full border border-yellow-100 bg-yellow-50 text-sm text-yellow-600">
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
              { title: 'Alif', desc: 'Alif, Ba, Ta', note: 'Tugallangan' },
              { title: 'Sa', desc: 'Sa, Jim, Ha', note: '6 min' },
              { title: 'Dal', desc: 'Dal, Zal, Ro', note: '8 min' },
            ].map((m) => (
              <Button
                key={m.title}
                onClick={() => navigate(`/arab-tili/lesson/${m.title.toLowerCase()}/play`)}
                className="max-w-[140px] min-w-[140px] rounded-lg border border-gray-100 bg-white p-4 shadow-sm text-left"
                aria-label={`Ochiladigan modul: ${m.title}`}
              >
                <div className="text-xl font-semibold text-slate-900">{m.title}</div>
                <div className="mt-2 text-sm text-gray-500">{m.desc}</div>
                <div className="mt-3 text-xs text-gray-400">{m.note}</div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArabTiliBotLessons;
