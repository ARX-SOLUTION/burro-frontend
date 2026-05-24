export default function PracticeSuccess({
  xp = 10,
  onContinue,
}: {
  xp?: number;
  onContinue?: () => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center">
      <div className="pointer-events-auto mx-4 w-[92%] max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="text-center">
          <div className="text-3xl font-bold text-teal-600">🎉</div>
          <div className="mt-3 text-lg font-semibold">Tabriklaymiz!</div>
          <div className="mt-2 text-sm text-gray-600">+{xp} XP</div>
          <div className="mt-4">
            <button onClick={onContinue} className="rounded-lg bg-teal-600 px-4 py-2 text-white">
              Keyingi modul
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
