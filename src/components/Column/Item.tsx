import { Button, ListItem, ListItemText } from "@mui/material"
import React, { useContext } from "react"
import { Draggable } from "react-beautiful-dnd"
import { TaskContext } from "../../context/TaskContext"

interface ItemProps {
  data: ITask
  index: number
}

const Item: React.FC<ItemProps> = ({ data, index }) => {
  const { onClickEdit } = useContext(TaskContext) as ITaskContext
  return (
    <Draggable draggableId={data.id!} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItem
            secondaryAction={
              <Button
                size="small"
                onClick={() => onClickEdit(data)}
                aria-label="edit"
                color="primary"
                variant="outlined"
              >
                View & Edit
              </Button>
            }
            alignItems="flex-start"
          >
            <ListItemText primary={data.title} secondary={data.description} />
          </ListItem>
        </div>
      )}
    </Draggable>
  )
}

export default Item
