import { BookOpen01, Home03, Lock01, Play, Trophy01, User01 } from '@untitledui/icons';

import type { HomeDashboardData } from '@/modules/arabtilibot/types/module';

import { Button } from '@/components/base/buttons/button';

type HomeScreenProps = {
  data: HomeDashboardData;
  onOpenModulesList: () => void;
  onStartLesson: (lessonId: string) => void;
};

export const HomeScreen = ({ data, onOpenModulesList, onStartLesson }: HomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto min-h-screen w-full max-w-[448px] bg-gray-50 shadow-2xl">
        <div className="sticky top-0 z-20 bg-white px-4 py-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-teal-100 text-sm leading-6 font-bold text-teal-700">
                A
              </div>
              <div>
                <p className="text-sm leading-5 font-bold text-primary">{data.greeting}</p>
                <p className="text-xs leading-4 font-bold text-warning-400">🔥 {data.streak}</p>
              </div>
            </div>

            <div className="rounded-full bg-gray-100 px-3 py-1 text-xs leading-4 font-bold text-tertiary">
              {data.languageChip}
            </div>
          </div>
        </div>

        <div className="space-y-6 px-4 py-4 pb-28">
          <div className="relative overflow-hidden rounded-2xl bg-teal-600 p-5 text-white shadow-md">
            <div className="absolute -top-10 -right-10 size-32 rounded-full bg-white/10" />

            <p className="text-sm leading-5 font-semibold text-white/90">{data.continueTitle}</p>
            <p className="mt-1 text-2xl leading-8 font-bold">{data.continueLesson}</p>

            <div className="mt-3 flex items-center justify-between text-sm leading-5 text-white/90">
              <p>
                {data.continueCurrentStep} / {data.continueTotalSteps} savol
              </p>
              <p>{data.continueEta}</p>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/20">
              <div
                className="h-full rounded-full bg-white/90"
                style={{ width: `${data.continueProgressPercent}%` }}
              />
            </div>

            <div className="mt-4">
              <Button
                color="tertiary"
                className="w-full rounded-xl bg-white py-3 text-lg leading-7 font-bold text-teal-700 hover:bg-white hover:text-teal-700"
                iconLeading={Play}
                onClick={() => onStartLesson(data.continueLessonId)}
              >
                Boshlash
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
            <div>
              <p className="text-xs leading-4 font-bold text-gray-400 uppercase">
                {data.dailyTaskTitle}
              </p>
              <p className="mt-1 text-base leading-6 font-bold text-primary">
                {data.dailyTaskValue}
              </p>
            </div>

            <div className="rounded-full border border-warning-300 bg-warning-100 px-3 py-1 text-xs leading-4 font-bold text-warning-400">
              {data.dailyTaskReward}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <p className="text-base leading-6 font-bold text-primary">{data.todayTitle}</p>
              <button
                type="button"
                className="text-xs leading-4 font-bold text-teal-600"
                aria-label={data.todayActionLabel}
              >
                {data.todayActionLabel}
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {data.todayStats.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs leading-4 text-gray-400">{stat.label}</p>
                  <p className="mt-1 text-lg leading-7 font-bold text-primary">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-base leading-6 font-bold text-primary">{data.modulesTitle}</p>
              <button
                type="button"
                className="text-xs leading-4 font-bold text-teal-600"
                onClick={onOpenModulesList}
              >
                {data.modulesActionLabel}
              </button>
            </div>

            <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-3 pb-1">
                {data.modules.map((module) => (
                  <button
                    key={module.id}
                    type="button"
                    disabled={module.isLocked}
                    onClick={() => onStartLesson(module.lessonId)}
                    className={`relative h-32 w-36 min-w-36 rounded-xl border border-gray-200 p-4 text-left ${
                      module.isLocked ? 'bg-gray-50' : 'bg-white shadow-xs'
                    }`}
                  >
                    <p className="text-[30px] leading-9 font-bold text-primary">{module.title}</p>
                    <p className="mt-2 text-xs leading-4 text-tertiary">{module.description}</p>
                    <p className="mt-1 text-[10px] leading-[15px] font-bold text-gray-400">
                      {module.note}
                    </p>

                    {module.isLocked && (
                      <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-gray-100/80">
                        <Lock01 className="size-6 text-tertiary" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center">
          <div className="relative w-full max-w-[448px] border-t border-gray-200 bg-white">
            <div className="grid h-16 grid-cols-5 items-center px-4">
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-1 text-teal-600"
                aria-label="Home"
              >
                <Home03 className="size-6" />
                <span className="text-[10px] leading-[15px]">Home</span>
              </button>

              <button
                type="button"
                className="flex flex-col items-center justify-center gap-1 text-gray-400"
                onClick={onOpenModulesList}
                aria-label="Modullar"
              >
                <BookOpen01 className="size-6" />
                <span className="text-[10px] leading-[15px]">Modullar</span>
              </button>

              <div />

              <button
                type="button"
                className="flex flex-col items-center justify-center gap-1 text-gray-400"
                aria-label="Reyting"
              >
                <Trophy01 className="size-6" />
                <span className="text-[10px] leading-[15px]">Reyting</span>
              </button>

              <button
                type="button"
                className="flex flex-col items-center justify-center gap-1 text-gray-400"
                aria-label="Profil"
              >
                <User01 className="size-6" />
                <span className="text-[10px] leading-[15px]">Profil</span>
              </button>
            </div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Button
                color="tertiary"
                className="size-16 rounded-full border-4 border-gray-100 bg-teal-600 p-0 text-white shadow-md hover:bg-teal-700 hover:text-white"
                onClick={() => onStartLesson(data.continueLessonId)}
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

export default HomeScreen;
