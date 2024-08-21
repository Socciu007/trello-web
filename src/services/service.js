import { API_ROOT } from '@/utils'
import axios from 'axios'

// Boards API
const getBoard = async (id) => {
  try {
    const response = await axios.get(`${API_ROOT}/v1/boards/${id}`)
    return response.data
  } catch (error) {
    return error.message
  }
}

const updateBoard = async (id, updateData) => {
  try {
    const response = await axios.put(`${API_ROOT}/v1/boards/${id}`, updateData)
    return response.data
  } catch (error) {
    return error.message
  }
}

// Columns API
const createColumn = async (newColumn) => {
  try {
    const response = await axios.post(`${API_ROOT}/v1/columns`, newColumn)
    return response.data
  } catch (error) {
    return error.message
  }
}

const updateColumn = async (id, updateData) => {
  try {
    const response = await axios.put(`${API_ROOT}/v1/columns/${id}`, updateData)
    return response.data
  } catch (error) {
    return error.message
  }
}

const deleteColumn = async (id) => {
  try {
    const response = await axios.delete(`${API_ROOT}/v1/columns/${id}`)
    return response.data
  } catch (error) {
    return error.message
  }
}

// Cards API
const createCard = async (newCard) => {
  try {
    const response = await axios.post(`${API_ROOT}/v1/cards`, newCard)
    return response.data
  } catch (error) {
    return error.message
  }
}

const updateDataMoveCard = async (updateData) => {
  try {
    const response = await axios.put(`${API_ROOT}/v1/boards/support/moving_card`, updateData)
    return response.data
  } catch (error) {
    return error.message
  }
}

const deleteCard = async (id) => {
  try {
    const response = await axios.delete(`${API_ROOT}/v1/cards/${id}`)
    return response.data
  } catch (error) {
    return error.message
  }
}

export const services = {
  getBoard,
  createColumn,
  createCard,
  updateBoard,
  updateColumn,
  updateDataMoveCard,
  deleteColumn,
  deleteCard
}
