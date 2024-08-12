
import Container from '@mui/material/Container'
import AppBar from '@/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '@/apis/mock-data'
import { useEffect, useState } from 'react'
import { services } from '@/services/service'

function Board() {
  const [boardData, setBoardData] = useState(null)
  // Fetch board data when component mounts
  const getDetailBoard = async () => {
    const res = await services.getBoard('66b4dabf5b40ff7cb1edb1f6')
    setBoardData(res?.data)
  }

  useEffect(() => {
    getDetailBoard()
  }, [])
  console.log(boardData)

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary' }}>
      <AppBar />
      <BoardBar board={mockData?.board} />
      <BoardContent board={mockData?.board} />
    </Container>
  )
}

export default Board
