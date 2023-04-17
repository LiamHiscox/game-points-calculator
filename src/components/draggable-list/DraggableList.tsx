import './DraggableList.scss';
import {List, ListItem} from '@mui/material';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';

interface DraggableListProps<T> {
  items: T[];
  onSortChange: (items: T[]) => void;
  renderListItem: (item: T, index: number) => JSX.Element;
  listItemId: (item: T) => string;
}

export function DraggableList<T>({items, onSortChange, renderListItem, listItemId}: DraggableListProps<T>): JSX.Element {
  const handleDrop = (droppedItem: DropResult): void => {
    if (!droppedItem.destination) {
      return;
    }
    const sourceIndex = droppedItem.source.index;
    const item = items[sourceIndex];
    const updatedItems = items.filter((_, i) => i !== sourceIndex);
    updatedItems.splice(droppedItem.destination.index, 0, item);
    onSortChange(updatedItems);
  }

  return (
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided): JSX.Element => (
            <List className="list-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable key={listItemId(item)} draggableId={listItemId(item)} index={index}>
                  {(provided, snapshot): JSX.Element => (
                    <ListItem className={snapshot.isDragging ? 'selected' : ''}
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                    >
                      {renderListItem(item, index)}
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
  );
}
