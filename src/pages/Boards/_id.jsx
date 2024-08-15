
import Container from '@mui/material/Container'
import AppBar from '@/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '@/apis/mock-data'
import { useEffect, useState } from 'react'
import { services } from '@/services/service'
import { toast } from 'react-toastify'

function Board() {
  const [board, setBoard] = useState(null)

  // Fetch board data when component mounts
  const fetchGetBoard = async () => {
    try {
      const res = await services.getBoard('66b4dabf5b40ff7cb1edb1f6')
      setBoard(res?.data)
    } catch (error) {
      console.error('Failed to fetch board data:', error)
    }
  }

  useEffect(() => {
    fetchGetBoard()
  }, [])

  // Create new column for board
  const createdColumn = async (newColumn) => {
    const res = await services.createColumn({ ...newColumn, boardId: board._id })
    console.log('column', res)
    // Update set board after create new column
    if (res?.statusCode === 201) {
      toast.success(res?.message)
      await fetchGetBoard()
    } else {
      toast.error(res?.message)
    }
  }

  // Create new card for column of board
  const createdCard = async (newCard) => {
    const res = await services.createCard({ ...newCard, boardId: board._id })

    // Update set board after create new card
    if (res?.statusCode === 201) {
      toast.success(res?.message)
      await fetchGetBoard()
    } else {
      toast.error(res?.message)
    }
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createdColumn={createdColumn}
        createdCard={createdCard}
      />
    </Container>
  )
}

export default Board
