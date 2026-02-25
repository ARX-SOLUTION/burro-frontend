import { profile } from '@/modules/arabtilibot/data/mock';

export default function Profile() {
  return (
    <div className="p-4">
      <div className="mb-6 text-center">
        <div className="text-xl font-semibold">{profile.displayName}</div>
        <div className="text-sm text-gray-500">
          {profile.xp} XP • {profile.streakDays} kun ketma-ket
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg bg-white p-4">
          Tamomlangan modullar: {profile.completedModules}
        </div>
        <div className="rounded-lg bg-white p-4">Umumiy XP: {profile.xp}</div>
      </div>
    </div>
  );
}
