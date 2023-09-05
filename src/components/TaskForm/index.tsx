import { forwardRef, useContext } from "react"
import { Add } from "@mui/icons-material"
import { Button, Dialog, DialogTitle } from "@mui/material"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import CreateTaskForm from "./CreateTaskForm"
import { TaskContext } from "../../context/TaskContext"

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const TaskForm = () => {
  const { isFormOpen, handleFormModalOpen, handleFormModalClose } = useContext(
    TaskContext
  ) as ITaskContext
  return (
    <div>
      <Button
        onClick={handleFormModalOpen}
        startIcon={<Add />}
        variant="contained"
        color="success"
      >
        Create Task
      </Button>
      <Dialog
        open={isFormOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={(_e, reason) => {
          if (reason === "backdropClick") return
          handleFormModalClose()
        }}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="sm"
        disableEscapeKeyDown
      >
        <DialogTitle>{"Create Task"}</DialogTitle>
        <CreateTaskForm onClose={handleFormModalClose} />
      </Dialog>
    </div>
  )
}

export default TaskForm
