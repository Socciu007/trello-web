
import Container from '@mui/material/Container'
import AppBar from '@/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '@/apis/mock-data'
import { useEffect, useState } from 'react'
import { services } from '@/services/service'

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
    fetchGetBoard();
  }, []);

  console.log('test', board)

  const createdColumn = async (newColumn) => {
    const res = await services.createColumn({ ...newColumn, board: board._id })
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createdColumn={createdColumn}
      />
    </Container>
  )
}

export default Board
