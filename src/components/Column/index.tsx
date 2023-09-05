import React, { useContext, useEffect, useState } from "react"
import Item from "./Item"
import { Droppable } from "react-beautiful-dnd"
import { Box, Card, CardContent, List, Typography } from "@mui/material"
import { TaskContext } from "../../context/TaskContext"

interface ColumnProps {
  status: string
  title: string
}

const Column: React.FC<ColumnProps> = ({ status, title }) => {
  const { tasks } = useContext(TaskContext) as ITaskContext
  const [tasksList, setTasksList] = useState<ITask[]>([])
  useEffect(() => {
    const tList = tasks.filter((t) => t.status === status)
    setTasksList([...tList])
  }, [status, tasks])

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                  }}
                >
                  {tasksList.map((data, index) => (
                    <Item key={data.id!} data={data} index={index} />
                  ))}
                </List>
                {provided.placeholder}
              </Box>
            </CardContent>
          </Card>
        </div>
      )}
    </Droppable>
  )
}

export default Column
