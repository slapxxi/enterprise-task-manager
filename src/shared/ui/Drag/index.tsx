// libraries
import {
  type FC,
  useRef, useState,
} from 'react';
import { flushSync } from 'react-dom';
// static
import DragHandle from 'assets/images/drag_handle.svg?react';
// types
import type { DragStatus } from 'shared/types';

// hooks
import { useDragContext } from 'shared/hooks';

type DragProps = {
  children: React.ReactNode;
  dragId: string;
  parentId?: string;
  className?: string;
  dragDisabled?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop'>;

export const Drag: FC<DragProps> = ({
  dragId, parentId, children, className, dragDisabled = false, ...rest
}) => {
  const [dragStatus, setDragStatus] = useState<DragStatus>('idle');
  const dragEnterCount = useRef(0);
  const dragContext = useDragContext();

  const isDragging = dragStatus.includes('dragging');
  const isDragActive = dragStatus.includes('dragging.active');
  const isDropTarget = dragContext.dropId === dragId;

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.effectAllowed = 'move';
    dragContext.startDrag(dragId, parentId);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.stopPropagation();

    if (isDragActive) {
      return;
    }

    setDragStatus('dragging.active');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    setDragStatus('idle');
    dragContext.endDrag();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDragging) {
      return;
    }

    if (dragContext.parentId === dragId) {
      return;
    }

    dragEnterCount.current += 1;

    flushSync(() => {
      dragContext.setDropId(dragId);
    });
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDragging) {
      return;
    }

    if (dragContext.parentId === dragId) {
      return;
    }

    dragEnterCount.current -= 1;

    if (dragEnterCount.current === 0 && dragContext.dropId === dragId) {
      dragContext.setDropId(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dragEnterCount.current = 0;

    if (isDragging) {
      return;
    }

    if (dragContext.dropId === null) {
      return;
    }

    if (dragContext.parentId === dragId) {
      return;
    }

    dragContext.onDrop?.(dragContext.dragId, dragContext.dropId);
    dragContext.setDropId(null);
  };

  const handlePointerDown = () => {
    setDragStatus('dragging');
  };

  const handlePointerUp = () => {
    setDragStatus('idle');
  };

  return (
    <div
      className={`drag ${className}`}
      data-drag={dragStatus}
      data-drop={isDropTarget}
      draggable={isDragging}
      id={dragId}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      {...rest}
    >
      {children}

      {!dragDisabled && (
      <span className="drag-handle" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
        <DragHandle className="drag-icon" />
      </span>
      )}
    </div>
  );
};
