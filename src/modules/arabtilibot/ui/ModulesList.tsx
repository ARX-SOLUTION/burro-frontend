import { useNavigate } from 'react-router-dom';

import { modules as mockModules } from '@/modules/arabtilibot/data/mock';

import ModuleCard from './ModuleCard';

export default function ModulesList() {
  const navigate = useNavigate();
  return (
    <div className="space-y-3">
      {mockModules.map((m) => (
        <ModuleCard key={m.id} module={m} onStart={(id) => navigate(`/burro/practice/${id}`)} />
      ))}
    </div>
  );
}
