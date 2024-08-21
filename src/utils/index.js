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

let apiRoot = ''
if (process.env.NODE_ENV === 'development') {
  apiRoot = 'http://localhost:6767'
}
if (process.env.NODE_ENV === 'production') {
  apiRoot = 'https://trello-api-ih4q.onrender.com'
}
const API_ROOT = apiRoot

export { capitalizeFirstLetter, mapOrder, generatePlaceholderCard, API_ROOT }
