import { Box, Container } from "@mui/material"
import AppBar from "./components/AppBar"
import TaskProvider from "./context/TaskContext"
import KanbanBoard from "./KanbanBoard"

const App = () => {
  return (
    <div>
      <TaskProvider>
        <AppBar />
        <Box py={2}>
          <Container maxWidth={false}>
            <KanbanBoard />
          </Container>
        </Box>
      </TaskProvider>
    </div>
  )
}

export default App
