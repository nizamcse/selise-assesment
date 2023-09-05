/* eslint-disable @typescript-eslint/no-explicit-any */
import Column from "./components/Column"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { Grid } from "@mui/material"
import { useContext } from "react"
import { TaskContext } from "./context/TaskContext"

const KanbanBoard = () => {
  const { updateTask, swapIndex } = useContext(TaskContext) as ITaskContext
  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (destination === undefined || destination === null) return null
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null

    if (source.droppableId === destination.droppableId) {
      swapIndex(destination.index, source.index)
    } else {
      const currentStatus = destination.droppableId
      updateTask(draggableId, { status: currentStatus as StatusType })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={2}>
        <Grid md={4} item>
          <Column title="To-Do" status="todo" key={"todo"} />
        </Grid>
        <Grid md={4} item>
          <Column title="In Progress" status="inprogress" key={"inprogress"} />
        </Grid>
        <Grid md={4} item>
          <Column title="Done" status="done" key={"done"} />
        </Grid>
      </Grid>
    </DragDropContext>
  )
}

export default KanbanBoard
