import ModulesList from './ModulesList';

export default function Home() {
  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Burro Bot</h1>
        <p className="text-sm text-gray-600">Til o&apos;rganishni boshlang</p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">Modullar</h2>
        <ModulesList />
      </div>
    </div>
  );
}
