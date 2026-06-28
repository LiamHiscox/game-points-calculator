import {List} from '@mui/material';
import React from 'react';
import { DraggableListItem } from './draggable-list-item/DraggableListItem';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

interface DraggableListProps<T> {
  items: T[];
  onSortChange: (items: T[]) => void;
  renderListItem: (item: T, index: number) => React.JSX.Element;
}

export function DraggableList<T extends {id: string;}>({items, onSortChange, renderListItem}: DraggableListProps<T>): React.JSX.Element {
  return (
    <DragDropProvider onDragEnd={(event) => { onSortChange(move(items, event)); }}>
      <List>
        {items.map((item, index) => (
          <DraggableListItem key={item.id} item={item} index={index} renderListItem={renderListItem}/>
        ))}
      </List>
    </DragDropProvider>
  );
}
