import * as Yup from "yup"
import { v4 as uuidv4 } from "uuid"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import { TaskContext } from "../../context/TaskContext"
import { useFileUpload } from "../../hooks/useFileUpload"

type Props = {
  onClose: () => void
}

const radioInputProps = { inputProps: { "aria-label": "Radio" } }

export const TaskSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, "Title is too long (300 characters)")
    .min(5, "Title is too short (minimum 5 characters)")
    .required("Title is required"),
  description: Yup.string()
    .max(100, "Description is too long (150 characters)")
    .min(5, "Description is too short (minimum 5 characters)")
    .required("Description is required"),
  priority: Yup.string().required("Priority is required"),
  status: Yup.string().required("Status is required"),
  assignee: Yup.string().required("Assignee is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
})

const initialVlaue = (): ITask => {
  return {
    title: "",
    description: "",
    priority: "Low",
    status: "todo",
    assignee: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  }
}

const CreateTaskForm = ({ onClose }: Props) => {
  const { handleFileChange, blobFile, fileContents, fileDispatch } =
    useFileUpload({})
  const [files, setFiles] = useState<ITaskAttachment[]>([])
  const { saveTask, editableTask, updateTask } = useContext(
    TaskContext
  ) as ITaskContext
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TaskSchema),
    defaultValues: initialVlaue(),
  })

  const onCreateTask = (data: unknown) => {
    const newTask = data as ITask
    if (files.length) {
      newTask.attachments = [...files]
    }
    if (editableTask?.id) {
      updateTask(editableTask.id, newTask)
    } else {
      newTask.id = uuidv4()
      saveTask(newTask)
    }
    reset(initialVlaue())
    onClose()
  }

  const handleCloseForm = () => {
    reset(initialVlaue())
    onClose()
  }

  useEffect(() => {
    reset({ ...editableTask })
  }, [editableTask, reset])

  useEffect(() => {
    if (fileContents?.name && blobFile) {
      const fileData = {
        name: fileContents?.name,
        data: blobFile.toString(),
      }
      setFiles((prev) => [...prev, fileData])
      fileDispatch({ type: "RESET_FILE_STATE", payload: {} })
    }
  }, [blobFile, fileContents, fileDispatch])

  return (
    <>
      <DialogContent>
        <Box mb={2}>
          <InputLabel>Title</InputLabel>
          <OutlinedInput
            fullWidth
            size="small"
            id="title"
            aria-describedby="title-helper-text"
            {...register("title")}
            error={!!errors.title}
          />
          {!!errors.title && (
            <FormHelperText error id="title-error">
              {errors.title.message}
            </FormHelperText>
          )}
        </Box>
        <Box mb={2}>
          <InputLabel>Description</InputLabel>
          <OutlinedInput
            fullWidth
            size="small"
            id="description"
            aria-describedby="description-helper-text"
            {...register("description")}
            error={!!errors.description}
            multiline
            minRows={2}
          />
          {!!errors.description && (
            <FormHelperText error id="description-error">
              {errors.description.message}
            </FormHelperText>
          )}
        </Box>
        <Box mb={2}>
          <InputLabel>Priority</InputLabel>
          <Controller
            control={control}
            name="priority"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                name="priority"
                defaultValue="Low"
                value={value}
                onChange={onChange}
                row
              >
                <FormControlLabel
                  value="Low"
                  label="Low"
                  control={<Radio {...radioInputProps} />}
                />
                <FormControlLabel
                  value="Medium"
                  label="Medium"
                  control={<Radio {...radioInputProps} />}
                />
                <FormControlLabel
                  value="High"
                  label="High"
                  control={<Radio {...radioInputProps} />}
                />
              </RadioGroup>
            )}
          />
          {!!errors.priority && (
            <FormHelperText error id="priority-error">
              {errors.priority.message}
            </FormHelperText>
          )}
        </Box>
        <Box mb={2}>
          <InputLabel>Status</InputLabel>
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <Select
                fullWidth
                error={!!errors.status}
                onChange={onChange}
                value={value}
              >
                <MenuItem value={""}>Select Status</MenuItem>
                <MenuItem value={"todo"}>Todo</MenuItem>
                <MenuItem value={"inprogress"}>In-Progress</MenuItem>
                <MenuItem value={"done"}>Done</MenuItem>
              </Select>
            )}
          />
          {!!errors.status && (
            <FormHelperText error id="status-error">
              {errors.status.message}
            </FormHelperText>
          )}
        </Box>
        <Box mb={2}>
          <InputLabel>Assignee</InputLabel>
          <Controller
            control={control}
            name="assignee"
            render={({ field: { onChange, value } }) => (
              <Select
                fullWidth
                error={!!errors.assignee}
                onChange={onChange}
                value={value}
              >
                <MenuItem value={""}>Select Assignee</MenuItem>
                <MenuItem value={"Alex"}>Alex</MenuItem>
                <MenuItem value={"Xoo"}>Xoo</MenuItem>
                <MenuItem value={"John Doe"}>John Doe</MenuItem>
              </Select>
            )}
          />
          {!!errors.assignee && (
            <FormHelperText error id="assignee-error">
              {errors.assignee.message}
            </FormHelperText>
          )}
        </Box>
        <Box mb={2}>
          <InputLabel>Start Date</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="startDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DesktopDatePicker
                  value={dayjs(value)}
                  onChange={(v) => {
                    if (v) onChange(v)
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      error: !!errors.startDate,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
          {!!errors.startDate && (
            <FormHelperText error id="startDate-error">
              {errors.startDate.message}
            </FormHelperText>
          )}
        </Box>
        <Box mb={2}>
          <InputLabel>End Date</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="endDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DesktopDatePicker
                  value={dayjs(value)}
                  onChange={(v) => {
                    if (v) onChange(v)
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      error: !!errors.endDate,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
          {!!errors.endDate && (
            <FormHelperText error id="endDate-error">
              {errors.endDate.message}
            </FormHelperText>
          )}
        </Box>
        <Box py={2}>
          {files.map((dd, i) => (
            <Typography key={`${dd.name}-${i}`}>{dd.name}</Typography>
          ))}
        </Box>
        <Box py={2}>
          <Button component="label" variant="contained" href="#file-upload">
            Upload a file
            <input
              onChange={handleFileChange}
              hidden
              accept="image/*"
              type="file"
            />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseForm}>Cancel</Button>
        <Button onClick={handleSubmit(onCreateTask)}>
          {editableTask ? "Update Task" : "Create Task"}
        </Button>
      </DialogActions>
    </>
  )
}

export default CreateTaskForm
