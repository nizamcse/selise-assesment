/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 *
 */
export const clone = (data: any) => {
  return JSON.parse(JSON.stringify(data))
}
/**
 * 是否拖拽到了其他面板
 * @param {起点} source
 * @param {终点} destination
 */
export const onChange = (source: any, destination: any) => {
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return true
  }
  return false
}
