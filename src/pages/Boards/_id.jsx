
import Container from '@mui/material/Container'
import AppBar from '@/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '@/apis/mock-data'
import { useEffect, useState } from 'react'
import { services } from '@/services/service'
import { toast } from 'react-toastify'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard, mapOrder } from '@/utils'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function Board() {
  const [board, setBoard] = useState(null)

  // Fetch board data when component mounts
  const fetchGetBoard = async () => {
    const res = await services.getBoard('66b4dabf5b40ff7cb1edb1f6')

    // Sort column here before push data into children component
    res.data.columns = mapOrder(res?.data?.columns, res?.data?.columnOrderIds, '_id')

    // Handle drag-drop issues when new column is empty
    res?.data?.columns.forEach(c => {
      if (isEmpty(c.cards)) {
        c.cards = [generatePlaceholderCard(c)]
        c.cardOrderIds = [generatePlaceholderCard(c)._id]
      } else {
        // Sort card here before push data into children component
        c.cards = mapOrder(c?.cards, c?.cardOrderIds, '_id')
      }
    })

    setBoard(res?.data)
  }

  useEffect(() => {
    fetchGetBoard()
  }, [])

  // Create new column for board
  const createdColumn = async (newColumn) => {
    const res = await services.createColumn({ ...newColumn, boardId: board._id })

    // Update set board after create new column (backend will help update)
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
    // Update set board after create new card (backend will help update)
    if (res?.statusCode === 201) {
      toast.success(res?.message)
      await fetchGetBoard()
    } else {
      toast.error(res)
    }
  }

  // Update column position of board after move column is ended
  const movedColumn = async (dndOrderedDragColumn) => {
    const dndOrderedDragColumnIds = dndOrderedDragColumn.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedDragColumn
    newBoard.columnOrderIds = dndOrderedDragColumnIds
    setBoard(newBoard)

    // Update board after move column
    await services.updateBoard(board._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  // Update card position of column after move card in the same column is ended
  const movedCardInSameColumn = async (orderedDragCards, orderedDragCardsIds, columnId) => {
    const newColumn = { ...board }
    const columnToUpdate = newColumn.columns.find(c => c._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = orderedDragCards
      columnToUpdate.cardOrderIds = orderedDragCardsIds
    }
    setBoard(newColumn)

    // Update card position BE after move card in the same column
    await services.updateColumn(columnId, { cardOrderIds: orderedDragCardsIds })
  }

  // Update card position of two column after move card in the different column in the ended
  const movedCardInDifferentColumn = async (currentCardId, prevColumnId, nextColumnId, dndOrderedDragColumn) => {
    //
    const dndOrderedDragColumnIds = dndOrderedDragColumn.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedDragColumn
    newBoard.columnOrderIds = dndOrderedDragColumnIds
    setBoard(newBoard)

    // Update card position BE after move card in the different column
    let prevCardOrderIds = dndOrderedDragColumn.find(c => c._id === prevColumnId)?.cardOrderIds
    // Handle move card out of the column, making column empty. (No save fake cardId into BE)
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    await services.updateDataMoveCard({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedDragColumn.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: 2,
        backgroundColor: 'primary'
      }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createdColumn={createdColumn}
        createdCard={createdCard}
        movedColumn={movedColumn}
        movedCardInSameColumn={movedCardInSameColumn}
        movedCardInDifferentColumn={movedCardInDifferentColumn}
      />
    </Container>
  )
}

export default Board
