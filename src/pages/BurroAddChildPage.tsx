import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import AddChildForm from '@/modules/arabtilibot/ui/AddChildForm';

import { usePageMetadata } from '@/libs/usePageMetadata';

export const BurroAddChildPage = () => {
  usePageMetadata({ title: "Farzand qo'shish" });
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSave = useCallback(
    (_data: { name: string; className: string; gender: 'male' | 'female' }) => {
      navigate(-1);
    },
    [navigate],
  );

  return <AddChildForm onBack={handleBack} onSave={handleSave} />;
};

export default BurroAddChildPage;
