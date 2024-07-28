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

export { capitalizeFirstLetter, mapOrder }
