import { memo } from 'react';
import { ArrowRight, CheckCircle, ChevronDown } from '@untitledui/icons';

import type { HomeDashboardData } from '@/modules/arabtilibot/types/module';

import { Button } from '@/components/base/buttons/button';

type ChildCard = {
  id: string;
  name: string;
  status: string;
  timeSpent: string;
  xp: number;
  avatarUrl?: string | null;
};

type HomeScreenProps = {
  data: HomeDashboardData;
  children?: ChildCard[];
  onOpenModulesList: () => void;
  onStartLesson: (lessonId: string) => void;
};

const MobileStatusBar = memo(function MobileStatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 text-white">
      <p className="rounded-full px-2 text-[15px] leading-5 font-semibold tracking-[-0.5px]">
        9:41
      </p>

      <div className="flex items-center gap-2">
        <div className="flex items-end gap-px">
          <span className="h-1.5 w-0.5 rounded-full bg-white/80" />
          <span className="h-2 w-0.5 rounded-full bg-white/80" />
          <span className="h-2.5 w-0.5 rounded-full bg-white/80" />
          <span className="h-3 w-0.5 rounded-full bg-white" />
        </div>
        <div className="relative size-3 rounded-full border border-white/70">
          <span className="absolute inset-[3px] rounded-full bg-white/80" />
        </div>
        <div className="flex h-3.5 w-6 items-center rounded-full border border-white/70 p-0.5">
          <span className="h-full w-4 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
});
MobileStatusBar.displayName = 'MobileStatusBar';

const ProfileAvatar = memo(function ProfileAvatar() {
  return (
    <div className="relative size-14 shrink-0 rounded-full border-4 border-white bg-gradient-to-br from-warning-100 via-gray-25 to-success-100 shadow-md">
      <div className="absolute top-2 left-1/2 size-4 -translate-x-1/2 rounded-full bg-warning-200" />
      <div className="absolute top-1.5 left-1/2 h-4 w-5 -translate-x-1/2 rounded-full bg-gray-900" />
      <div className="absolute bottom-1.5 left-1/2 h-6 w-8 -translate-x-1/2 rounded-t-full rounded-b-[14px] bg-teal-500/35" />
    </div>
  );
});
ProfileAvatar.displayName = 'ProfileAvatar';

const DurationIcon = memo(function DurationIcon() {
  return (
    <span className="relative size-3 rounded-full border border-gray-400">
      <span className="absolute top-[2px] left-1/2 h-1.5 w-px -translate-x-1/2 bg-gray-400" />
      <span className="absolute top-1/2 left-1/2 h-px w-1.5 -translate-y-1/2 bg-gray-400" />
    </span>
  );
});
DurationIcon.displayName = 'DurationIcon';

const ChildCardComponent = memo(function ChildCardComponent({ child }: { child: ChildCard }) {
  return (
    <div className="rounded-[28px] bg-white p-4 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 text-xl font-bold text-white">
          {child.name[0]}
        </div>

        <div>
          <p className="text-lg leading-6 font-semibold text-gray-900">{child.name}</p>
          <span className="mt-1 inline-flex items-center rounded-full bg-success-100 px-2 py-0.5 text-xs leading-4 font-semibold text-success-700">
            {child.status}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 text-sm leading-5 text-gray-600">
        <span>Sarflangan vaqt: {child.timeSpent}</span>
        <span>XP: {child.xp}</span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          className="rounded-full bg-gradient-to-r from-[#20B7E5] to-[#0D9488] px-5 py-2 text-sm leading-5 font-semibold text-white"
        >
          Boshlash
        </button>

        <button type="button" className="text-sm leading-5 font-semibold text-teal-600">
          Statistika
        </button>
      </div>
    </div>
  );
});
ChildCardComponent.displayName = 'ChildCardComponent';

export const HomeScreen = memo(function HomeScreen({
  data,
  children,
  onOpenModulesList,
  onStartLesson,
}: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-blue-900 via-gray-blue-950 to-gray-blue-950 px-2 py-0">
      <div className="mx-auto min-h-screen w-full max-w-[402px]">
        <header className="h-[118px]">
          <MobileStatusBar />

          <div className="mx-2 mt-2 flex h-[72px] items-center justify-between overflow-hidden rounded-full border border-white/20 bg-gradient-to-b from-gray-25 via-white to-gray-200 px-2 pr-4 shadow-lg">
            <div className="flex items-center gap-3">
              <ProfileAvatar />

              <div>
                <p className="text-sm leading-5 font-semibold text-gray-900">{data.greeting}</p>
                <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-warning-100 px-2 py-1 text-xs leading-4 font-semibold text-warning-700">
                  <span aria-hidden="true">🔥</span>
                  <span>{data.streak}</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-2 text-xs leading-4 font-semibold text-gray-700 shadow-xs">
              <span aria-hidden="true">🇺🇿</span>
              <span>{data.languageChip}</span>
              <ChevronDown className="size-4 text-gray-500" />
            </div>
          </div>
        </header>

        {children && children.length > 0 && (
          <section className="px-2">
            <p className="mb-3 text-base leading-5 font-semibold text-white">Farzandlar</p>

            <div className="flex flex-col gap-3">
              {children.map((child) => (
                <ChildCardComponent key={child.id} child={child} />
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col gap-2 px-2 pb-8">
          <section className="relative h-[201px] overflow-hidden rounded-[28px] bg-gradient-to-br from-success-400 via-teal-600 to-teal-700 p-5 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.18),transparent_28%)]" />
            <div className="absolute right-5 bottom-4 size-28 rounded-full border border-white/20 bg-white/10 blur-[2px]" />

            <div className="relative flex h-full flex-col">
              <div>
                <p className="max-w-[220px] text-[28px] leading-8 font-semibold text-white">
                  {data.continueLesson}
                </p>
                <div className="mt-6 flex items-center justify-between text-sm leading-5 font-medium text-white/85">
                  <p>
                    {data.continueCurrentStep}/{data.continueTotalSteps} savol
                  </p>
                  <p>{data.continueEta}</p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/20">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${data.continueProgressPercent}%` }}
                  />
                </div>
              </div>

              <div className="mt-auto">
                <Button
                  color="tertiary"
                  className="h-12 rounded-full bg-white px-5 text-sm font-semibold text-gray-900 shadow-xs-skeumorphic hover:bg-white hover:text-gray-900"
                  iconTrailing={ArrowRight}
                  onClick={() => onStartLesson(data.continueLessonId)}
                >
                  {data.continueTitle}
                </Button>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] bg-gray-blue-900 p-5 text-white shadow-xl ring-1 ring-white/10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm leading-5 font-semibold text-white/70">
                  {data.dailyTaskTitle}
                </p>
                <p className="mt-2 text-xl leading-6 font-semibold">{data.dailyTaskValue}</p>
              </div>

              <div className="shrink-0 rounded-full bg-white px-3 py-2 text-xs leading-4 font-semibold text-warning-700 shadow-sm">
                {data.dailyTaskReward}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-gray-25 via-gray-50 to-gray-100 p-5 shadow-xl">
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-r from-gray-200/50 via-white/10 to-gray-200/50" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-base leading-5 font-semibold text-gray-900">{data.todayTitle}</p>
                <button
                  type="button"
                  className="text-sm leading-5 font-semibold text-teal-600"
                  aria-label={data.todayActionLabel}
                >
                  {data.todayActionLabel}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {data.todayStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[20px] bg-white p-3 shadow-xs ring-1 ring-gray-200/70"
                  >
                    <p className="text-xs leading-4 font-medium text-gray-500">{stat.label}</p>
                    <p className="mt-1 text-[22px] leading-7 font-semibold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="pt-1">
            <div className="flex items-center justify-between px-3">
              <p className="text-base leading-5 font-semibold text-white">{data.modulesTitle}</p>
              <button
                type="button"
                className="text-sm leading-5 font-semibold text-white/70"
                onClick={onOpenModulesList}
              >
                {data.modulesActionLabel}
              </button>
            </div>

            <div className="-mx-2 mt-3 overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-2 pb-1">
                {data.modules.map((module) => (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => onStartLesson(module.lessonId)}
                    className="relative h-[116px] w-[173px] min-w-[173px] overflow-hidden rounded-[24px] bg-gradient-to-b from-gray-25 via-white to-gray-100 p-4 text-left shadow-lg"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-[75px] bg-gradient-to-r from-gray-200/60 via-white/10 to-gray-200/60" />

                    <div className="relative flex h-full flex-col">
                      <div>
                        <p className="text-lg leading-[22px] font-semibold text-gray-900">
                          {module.title}
                        </p>
                        <p className="mt-1 text-[13px] leading-4 text-gray-600">
                          {module.description}
                        </p>
                      </div>

                      <div className="mt-auto inline-flex items-center gap-1.5 text-xs leading-4 font-medium text-gray-500">
                        {module.status === 'completed' ? (
                          <CheckCircle className="size-3 text-success-600" />
                        ) : (
                          <DurationIcon />
                        )}
                        <span>{module.statusLabel}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
});
