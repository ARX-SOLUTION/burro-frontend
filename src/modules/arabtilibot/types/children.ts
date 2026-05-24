export type ChildCard = {
  id: string;
  name: string;
  className: string;
  avatarUrl?: string;
  streak?: number;
  xp?: number;
};

export type ChildrenListProps = {
  childrenData: ChildCard[];
  isLoading?: boolean;
  onBack?: () => void;
  onEdit?: () => void;
  onAddChild?: () => void;
  onStartChild?: (childId: string) => void;
  onViewChildStats?: (childId: string) => void;
};
