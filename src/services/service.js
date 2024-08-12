import { API_ROOT } from '@/utils'
import axios from 'axios'

const getBoard = async (id) => {
  try {
    const response = await axios.get(`${API_ROOT}/boards/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const services = {
  getBoard
}
