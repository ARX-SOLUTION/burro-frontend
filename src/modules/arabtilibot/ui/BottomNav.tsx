import { memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart01, BookOpen01, Home03, User01 } from '@untitledui/icons';

import PlayButton from './PlayButton';

const BottomNav = memo(function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const leftItems = [
    { label: 'Home', to: '/burro', icon: Home03, active: pathname === '/burro' },
    {
      label: 'Modullar',
      to: '/burro/modules',
      icon: BookOpen01,
      active: pathname.startsWith('/burro/modules'),
    },
  ];

  const rightItems = [
    {
      label: 'Statistika',
      to: '/burro/statistics',
      icon: BarChart01,
      active: pathname.startsWith('/burro/statistics'),
    },
    {
      label: 'Profil',
      to: '/burro/profile',
      icon: User01,
      active: pathname.startsWith('/burro/profile'),
    },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-2 pb-2">
      <div className="relative w-full max-w-[402px]">
        <div className="pointer-events-none absolute inset-x-2 bottom-0 h-[118px] rounded-[34px] bg-[linear-gradient(180deg,#203480_0%,#1A369B_100%)] opacity-95 shadow-[0_18px_38px_rgba(7,14,28,0.48)]" />
        <div className="pointer-events-none absolute inset-x-8 bottom-8 h-12 rounded-full bg-[radial-gradient(circle,rgba(18,183,229,0.28),transparent_68%)]" />

        <div className="relative mx-2 overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(34,52,128,0.96),rgba(24,47,141,0.98))] px-4 pb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="grid h-[98px] grid-cols-5 items-end">
            {leftItems.map(({ active, icon: Icon, label, to }) => (
              <Link
                key={label}
                to={to}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${active ? 'text-white' : 'text-white/60 hover:text-white/80'}`}
              >
                <Icon className="size-6" />
                <span className="text-[10px] leading-[15px] font-medium">{label}</span>
              </Link>
            ))}

            <div className="flex items-start justify-center pt-1">
              <div className="-mt-8 rounded-full bg-[radial-gradient(circle,rgba(18,183,229,0.26),transparent_72%)] p-1.5">
                <PlayButton onClick={() => navigate('/burro/modules')} />
              </div>
            </div>

            {rightItems.map(({ active, icon: Icon, label, to }) => (
              <Link
                key={label}
                to={to}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${active ? 'text-white' : 'text-white/60 hover:text-white/80'}`}
              >
                <Icon className="size-6" />
                <span className="text-[10px] leading-[15px] font-medium">{label}</span>
              </Link>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[rgba(255,255,255,0.18)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
        </div>
      </div>
    </div>
  );
});

export default BottomNav;
