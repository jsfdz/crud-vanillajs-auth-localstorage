export const generateID = (arr) => {
  let id = 1
  if(arr.length > 0) id = arr[arr.length - 1].id + 1
  return id
}