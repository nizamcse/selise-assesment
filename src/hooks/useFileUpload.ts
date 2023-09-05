import { ChangeEvent, useReducer } from "react"
const MAX_FILE_SIZE_BYTES = 1000000

const initialFileState = {
  fileError: null,
  fileName: null,
  fileSize: null,
  fileType: null,
  fileContents: null,
  fileData: null,
  blobFile: null,
}

function bytesToMb(bytes: number) {
  const mb = bytes / 1000000

  return mb
}

type Props = {
  mimType?: string
}

export const useFileUpload = ({ mimType }: Props) => {
  const [
    {
      fileError,
      fileContents,
      fileName,
      fileSize,
      fileType,
      fileData,
      blobFile,
    },
    fileDispatch,
  ] = useReducer(fileChangeReducer, initialFileState)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }
    if (mimType && mimType !== fileObj.type) {
      fileDispatch({
        type: "FILE_CHANGE_FAILURE",
        payload: {
          fileError: "Please select the correct file.",
        },
      })
      return
    }

    if (fileObj.size > MAX_FILE_SIZE_BYTES) {
      fileDispatch({
        type: "FILE_CHANGE_FAILURE",
        payload: {
          fileError: `File is too large, file size is ${bytesToMb(
            fileObj.size
          ).toFixed(2)} MB, maximum allowed size - 1 MB.`,
        },
      })
      return
    }
    fileDispatch({
      type: "FILE_CHANGE_SUCCESS",
      payload: {
        fileName: fileObj.name,
        fileSize: fileObj.size,
        fileType: fileObj.type,
        fileContents: fileObj,
      },
    })
    const binaryFileReader = new FileReader()
    binaryFileReader.onload = function (fileLoadedEvent) {
      fileDispatch({
        type: "FILE_CHANGE_SUCCESS",
        payload: {
          fileData: fileLoadedEvent.target?.result,
        },
      })
    }
    binaryFileReader.readAsBinaryString(fileObj)

    const blobFileReader = new FileReader()
    blobFileReader.onload = function (fileLoadedEvent) {
      fileDispatch({
        type: "FILE_CHANGE_SUCCESS",
        payload: {
          blobFile: fileLoadedEvent.target?.result,
        },
      })
    }
    blobFileReader.readAsDataURL(fileObj)
  }

  return {
    fileError,
    fileContents,
    fileName,
    fileType,
    fileSize,
    handleFileChange,
    fileDispatch,
    fileData,
    blobFile,
  }
}

type FileState = {
  fileError: string | null
  fileName: string | null
  fileSize: number | null
  fileType: string | null
  fileContents: File | null
  fileData: string | ArrayBuffer | null | undefined
  blobFile: string | ArrayBuffer | null | undefined
}

type FileChangeAction = {
  type: "FILE_CHANGE_SUCCESS" | "FILE_CHANGE_FAILURE" | "RESET_FILE_STATE"
  payload: Partial<FileState>
}

export function fileChangeReducer(
  _state: FileState,
  action: FileChangeAction
): FileState {
  switch (action.type) {
    case "FILE_CHANGE_SUCCESS": {
      return {
        ..._state,
        ...action.payload,
      }
    }
    case "FILE_CHANGE_FAILURE": {
      return {
        ...initialFileState,
        ...action.payload,
      }
    }
    case "RESET_FILE_STATE": {
      return initialFileState
    }
    default: {
      throw new Error(`Unsupported action type: ${JSON.stringify(action)}`)
    }
  }
}
