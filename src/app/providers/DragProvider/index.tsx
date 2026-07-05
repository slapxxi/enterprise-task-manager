// libraries
import {
  createContext, type FC, useMemo, useState,
} from 'react';
// types
import type { DragStatus } from 'shared/types';

type DragContextValue = {
  dragId: string | null;
  parentId: string | null;
  dropId: string | null;
  dragStatus: DragStatus;
  startDrag: (id: string, parentId: string) => void;
  endDrag: () => void;
  setDropId: (id: string) => void;
  onDrop?: (targetId: string, parentId: string) => void;
};

export const DragContext = createContext<DragContextValue>(null);

type DragProviderProps = {
  children: React.ReactNode;
  onDrop?: (targetId: string, parentId: string) => void;
};

export const DragProvider: FC<DragProviderProps> = ({ children, onDrop }) => {
  const [dragStatus, setDragStatus] = useState<DragStatus>('idle');
  const [dragId, setDragId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [dropId, setDropId] = useState(null);

  const contextValue: DragContextValue = useMemo(() => ({
    dragId,
    dropId,
    parentId,
    dragStatus,
    onDrop,
    startDrag: (id: string, pid: string) => {
      setDragStatus('dragging');
      setDragId(id);
      setParentId(pid === null ? 'null' : pid);
    },
    endDrag: () => {
      setDragStatus('idle');
      setDragId(null);
      setDropId(null);
      setParentId(null);
    },
    setDropId: (id: string) => {
      setDropId(id);
    },
  }), [dragId, parentId, dropId, dragStatus, onDrop]);

  return <DragContext.Provider value={contextValue}>{children}</DragContext.Provider>;
};
