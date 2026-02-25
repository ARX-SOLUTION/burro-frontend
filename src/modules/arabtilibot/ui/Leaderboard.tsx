import { leaderboard } from '@/modules/arabtilibot/data/mock';

export default function Leaderboard() {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Reyting</h2>
      <div className="space-y-3">
        {leaderboard.map((l) => (
          <div key={l.rank} className="flex items-center justify-between rounded-lg bg-white p-3">
            <div className="font-semibold">
              {l.rank}. {l.user}
            </div>
            <div className="text-sm text-gray-500">{l.score} XP</div>
          </div>
        ))}
      </div>
    </div>
  );
}
