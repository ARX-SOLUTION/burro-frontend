import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ChildCard } from '@/modules/arabtilibot/types/children';
import BottomNav from '@/modules/arabtilibot/ui/BottomNav';
import ChildrenList from '@/modules/arabtilibot/ui/ChildrenList';

import { usePageMetadata } from '@/libs/usePageMetadata';

const MOCK_CHILDREN: ChildCard[] = [
  { id: '1', name: 'Asila', className: '3-B sinf', streak: 5 },
  { id: '2', name: 'Abdulaziz', className: '7-A sinf', streak: 12 },
];

export const BurroChildrenPage = () => {
  usePageMetadata({ title: 'Farzandlar' });
  const navigate = useNavigate();

  const childrenData = useMemo(() => MOCK_CHILDREN, []);

  const handleBack = useCallback(() => {
    navigate('/burro/profile');
  }, [navigate]);

  const handleEdit = useCallback(() => {
    // TODO: navigate to edit children
  }, []);

  const handleAddChild = useCallback(() => {
    navigate('/burro/children/add');
  }, [navigate]);

  return (
    <>
      <div className="pb-28">
        <ChildrenList
          childrenData={childrenData}
          onBack={handleBack}
          onEdit={handleEdit}
          onAddChild={handleAddChild}
        />
      </div>
      <BottomNav />
    </>
  );
};

export default BurroChildrenPage;
