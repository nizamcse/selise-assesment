import { createContext, useEffect, useState } from "react"

export const TaskContext = createContext<ITaskContext | null>(null)

interface Props {
  children: React.ReactNode
}

const TaskProvider: React.FC<Props> = ({ children }) => {
  const [openFormModal, setOpenFormModal] = useState(false)
  const [editableTask, setEditableTask] = useState<ITask | null>(null)
  const [tasks, setTasks] = useState<ITask[]>([])
  const saveTask = (task: ITask) => {
    setTasks([...tasks, task])
  }
  const updateTask = (id: string, data: Partial<ITask>) => {
    const newTasksData = tasks.map((t) => {
      if (t.id === id) return { ...t, ...data }
      return { ...t }
    })
    setTasks(newTasksData)
  }
  const handleFormModalOpen = () => setOpenFormModal(true)

  const handleFormModalClose = () => {
    console.log("handleFormModalClose")
    setOpenFormModal(false)
    setEditableTask(null)
  }

  const onClickEdit = (data: ITask) => {
    setEditableTask(data)
    setOpenFormModal(true)
  }

  useEffect(() => {
    const localStorageData = localStorage.getItem("__tasks")
    if (localStorageData) {
      const parsedAsJson = JSON.parse(localStorageData) as ITask[]
      setTasks(parsedAsJson)
    }
  }, [])

  useEffect(() => {
    const stringifyData = JSON.stringify(tasks)
    localStorage.setItem("__tasks", stringifyData)
  }, [tasks])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        saveTask,
        updateTask,
        editableTask,
        isFormOpen: openFormModal,
        onClickEdit,
        handleFormModalOpen,
        handleFormModalClose,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider
