import { useMemo } from 'react';

import { usePageMetadata } from '@burro/shared/libs/usePageMetadata';

const MOCK_CHILDREN = [
  { id: '1', name: 'Asila', className: '3-B sinf', streak: 5 },
  { id: '2', name: 'Abdulaziz', className: '7-A sinf', streak: 12 },
];

export const BurroChildrenPage = () => {
  usePageMetadata({ title: 'Farzandlar' });

  const childrenData = useMemo(() => MOCK_CHILDREN, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="mb-4 text-xl font-bold text-gray-900">Farzandlar</h1>
      {childrenData.map((child) => (
        <div key={child.id} className="mb-2 rounded-xl bg-white p-4 shadow-sm">
          <p className="font-semibold text-gray-900">{child.name}</p>
          <p className="text-sm text-gray-500">{child.className}</p>
        </div>
      ))}
    </div>
  );
};

export default BurroChildrenPage;
