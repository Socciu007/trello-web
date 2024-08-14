import { API_ROOT } from '@/utils'
import axios from 'axios'

const getBoard = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${id}`)
  console.log('t', response.data)
  return response.data
}

const createColumn = async (newColumn) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumn)
  return response.data
}

const createCard = async (newCard) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCard)
  return response.data
}
export const services = {
  getBoard,
  createColumn,
  createCard
}
