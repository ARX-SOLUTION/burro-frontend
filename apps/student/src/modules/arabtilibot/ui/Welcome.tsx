import { useNavigate } from 'react-router-dom';

import { AUTH_SEARCH_PARAMS } from '@burro/shared/modules/auth';

import { Button } from '@burro/shared/components/base/buttons/button';
import { APP_VERSION } from '@burro/shared/libs/version';

type Variant = 'default' | 'figma-3-50' | 'figma-3-51';

const featureRows = [
  { label: 'Qisqa darslar', value: '5 daqiqa' },
  { label: 'Audio mashqlar', value: 'Talaffuz' },
  { label: 'Natija', value: 'XP va streak' },
];

export default function Welcome({ variant = 'default' }: { variant?: Variant }) {
  const navigate = useNavigate();
  const isSecondaryVariant = variant === 'figma-3-51';
  const showFeaturePanel = variant !== 'default';

  const handleStart = () =>
    navigate(`/auth/register?${AUTH_SEARCH_PARAMS.REDIRECT}=${encodeURIComponent('/burro')}`);
  const handleSkip = () =>
    navigate(`/auth/login?${AUTH_SEARCH_PARAMS.REDIRECT}=${encodeURIComponent('/burro/profile')}`);

  return (
    <div className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#09142C_0%,#10214A_42%,#08152F_100%)] text-white">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[402px] flex-col px-6 pt-6 pb-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(18,183,229,0.2),transparent_55%)]" />
        <div className="pointer-events-none absolute -top-10 right-[-48px] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_70%)]" />

        <div className="relative flex flex-1 flex-col">
          <div className="pt-6 text-center">
            <p className="text-sm font-medium tracking-[0.28em] text-white/60 uppercase">
              Burro bot
            </p>
          </div>

          <div className="relative mt-10 flex justify-center">
            <div className="relative h-[236px] w-[236px]">
              <div className="absolute inset-0 rounded-[40px] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))] shadow-[0_24px_60px_rgba(3,9,24,0.45)] ring-1 ring-white/10 backdrop-blur-sm" />
              <div className="absolute inset-5 rounded-[32px] bg-[linear-gradient(180deg,#173772_0%,#0F2452_100%)]" />
              <div className="absolute inset-x-12 top-7 h-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.24),transparent_70%)]" />
              <div className="absolute top-11 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#F7B54A_0%,#E97C34_100%)] shadow-[0_14px_30px_rgba(0,0,0,0.22)]" />
              <div className="absolute top-[108px] left-1/2 h-20 w-[118px] -translate-x-1/2 rounded-[28px] bg-[linear-gradient(180deg,#20B7E5_0%,#0D9488_100%)] shadow-[0_14px_30px_rgba(13,148,136,0.2)]" />
              <div className="absolute top-[132px] left-[30px] rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] px-3 py-2 text-xs font-semibold text-white/80 backdrop-blur">
                Alif
              </div>
              <div className="absolute top-[52px] right-[24px] rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] px-3 py-2 text-xs font-semibold text-white/80 backdrop-blur">
                XP
              </div>
              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[rgba(0,0,0,0.18)] px-3 py-2 text-xs font-medium text-white/80 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#20B7E5]" />
                <span>Qisqa darslar</span>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <h1 className="text-[36px] leading-[40px] font-semibold tracking-[-0.03em]">
              {isSecondaryVariant ? "Darslaringiz tartibli bo'ladi" : 'Arab tilini yengil boshlang'}
            </h1>
            <p className="mx-auto mt-4 max-w-[280px] text-[16px] leading-6 text-white/70">
              Arab tilini noldan boshlab, oson va qiziqarli o&apos;rganing.
            </p>
          </div>

          {showFeaturePanel && (
            <div className="mt-8 rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.06)] p-4 shadow-[0_18px_34px_rgba(5,12,28,0.32)] backdrop-blur-md">
              <div className="space-y-3">
                {featureRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-[20px] bg-[rgba(255,255,255,0.06)] px-4 py-3"
                  >
                    <span className="text-sm font-medium text-white/80">{row.label}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto space-y-3 pt-10">
            <Button
              onClick={handleStart}
              className="h-14 w-full rounded-full bg-white text-base font-semibold text-gray-950 shadow-[0_14px_32px_rgba(255,255,255,0.18)] hover:bg-white hover:text-gray-950"
            >
              Boshlash
            </Button>
            <button
              type="button"
              onClick={handleSkip}
              className="w-full text-sm font-medium text-white/70 transition hover:text-white/90"
            >
              Keyinroq
            </button>
          </div>

          <p className="pb-2 text-center text-[10px] text-white/30">v{APP_VERSION}</p>
        </div>
      </div>
    </div>
  );
}
