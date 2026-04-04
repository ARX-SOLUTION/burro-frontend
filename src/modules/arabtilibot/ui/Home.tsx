import { useNavigate } from 'react-router-dom';

import { modules as mockModules } from '@/modules/arabtilibot/data/mock';

import ModulesList from './ModulesList';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Burro Bot</h1>
        <p className="text-sm text-gray-600">Til o&apos;rganishni boshlang</p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">Modullar</h2>
        <ModulesList
          modules={mockModules.map((module) => ({
            id: module.id,
            title: module.title,
            description: module.description ?? `${module.questions.length} savol`,
            meta: `${module.questions.length} savol`,
            progressPercent: module.progress ?? 0,
            status: 'open',
            statusLabel: 'Demo',
            ctaLabel: 'Boshlash',
            canStart: true,
          }))}
          onStart={(id) => navigate(`/burro/practice/${id}`)}
        />
      </div>
    </div>
  );
}
