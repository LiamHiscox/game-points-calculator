import './DraggableListItem.scss';
import { useSortable } from "@dnd-kit/react/sortable";
import { ListItem } from "@mui/material";

interface DraggableListItemProps<T> {
    index: number;
    item: T;
    renderListItem: (item: T, index: number) => React.JSX.Element;
}

export function DraggableListItem<T extends {id: string;}>({index, item, renderListItem}: DraggableListItemProps<T>): React.JSX.Element {
  const {ref, isDragging} = useSortable({id: item.id, index});

  return (
    <ListItem ref={ref} className={isDragging ? 'selected item' : 'item'}>
        {renderListItem(item, index)}
    </ListItem>
  );
}