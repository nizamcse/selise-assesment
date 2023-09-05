type PriorityType = "Low" | "Medium" | "High"
type StatusType = "todo" | "inprogress" | "done"

interface ITask {
  id?: string
  title: string
  description: string
  priority: PriorityType
  status: StatusType
  assignee: string
  startDate: string
  endDate: string
}

interface ITaskContext {
  tasks: ITask[]
  saveTask: (task: ITask) => void
  updateTask: (id: string, data: Partial<ITask>) => void
  isFormOpen: boolean
  editableTask: ITask | null
  handleFormModalOpen: () => void
  handleFormModalClose: () => void
  onClickEdit: (task: ITask) => void
  swapIndex: (i: number, j: number) => void
}
