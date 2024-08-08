import axios from 'axios'

const getBoard = async (id) => {
  try {
    const response = await axios.get(`http://localhost:6767/${id}`)
    return response
  } catch (error) {
    throw new Error(error)
  }
}

export const services = {
  getBoard
}
