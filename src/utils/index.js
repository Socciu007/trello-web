// Format string
const capitalizeFirstLetter = (str) => {
  if (!str) return ''
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

// Sort
const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return []
  return [...originalArray].sort(
    (a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  )
}

// Function create card fake to placeholder in column is empty
const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}

const API_ROOT = 'http://localhost:6767/v1'

export { capitalizeFirstLetter, mapOrder, generatePlaceholderCard, API_ROOT }
