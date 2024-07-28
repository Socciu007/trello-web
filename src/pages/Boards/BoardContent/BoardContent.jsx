import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '@/utils'
import { DndContext, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
  const [orderedColumn, setOrderColumn] = useState([])
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 }
  // })

  // Mouse to move by 10 px, event will started
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // Press delay to 250 ms and tolerance of 500 px of movement, event will started
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 }
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  useEffect(() => {
    setOrderColumn(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Handle finished drag column
  const handleDragEnd = (e) => {
    const { active, over } = e

    if (!over) return

    if (active.id !== over.id) {
      // get old index of orderedColumn
      const oldIdx = orderedColumn.findIndex(c => c._id === e.active.id)
      // get new index of orderedColumn
      const newIdx = orderedColumn.findIndex(c => c._id === e.over.id)
      // swap elements after finished drag
      const orderedDragColumn = arrayMove(orderedColumn, oldIdx, newIdx)
      setOrderColumn(orderedDragColumn)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{
        width: '100%',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        height: (theme) => (theme.trello.boardContentHeight),
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumn}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent