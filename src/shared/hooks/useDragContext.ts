import { useContext } from 'react';

import { DragContext } from 'app/providers';

export const useDragContext = () => {
  const context = useContext(DragContext);

  return context;
};
