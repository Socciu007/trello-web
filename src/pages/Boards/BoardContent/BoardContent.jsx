import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '@/utils'
import { defaultDropAnimationSideEffects, DndContext, DragOverlay, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_TYPE = {
  CARD: 'card',
  COLUMN: 'column'
}

function BoardContent({ board }) {
  const [orderedColumn, setOrderColumn] = useState([])
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 }
  // })
  const [activeId, setActiveId] = useState(null)
  const [activeType, setActiveType] = useState(null)
  const [activeDataCurrent, setActiveDataCurrent] = useState(null)

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

  // Find column by cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumn.find(column => column?.cards?.map(c => c?._id)?.includes(cardId))
  }

  // Trigger when handle finished drag
  const handleDragEnd = (e) => {
    const { active, over } = e

    if (activeType === ACTIVE_TYPE.CARD) {
      console.log('Hanh dong keo card là dung')
      return
    }

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

    setActiveId(null)
    setActiveType(null)
    setActiveDataCurrent(null)
  }

  // Trigger in drag process
  const handleDragOver = (e) => {
    if (activeType === ACTIVE_TYPE.COLUMN) return // if drag column, do nothing

    const { active, over } = e
    if (!active || !over) return // if not existing active and over, do nothing (avoid trash web page)

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active // Card is dragging
    const { id: overCardId } = over // Card is interacting with the card is dragged above

    // find 2 column container 2 that card
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return // if not existing column, do nothing (avoid trash web page)

    if (activeColumn._id !== overColumn._id) {
      setOrderColumn(prevColumns => {
        const overCardIdx = overColumn?.cards?.findIndex(c => c._id === overCardId)

        let newCardIdx

        // Logic get card index
        const isBelowOverItem = active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0

        newCardIdx = overCardIdx >= 0 ? overCardIdx + modifier : overColumn?.cards?.length + 1
        // Clone array old orderedColumnsState to handle data
        const nextColumn = cloneDeep(prevColumns)
        const nextActiveColumnn = nextColumn.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumn.find(column => column._id === overColumn._id)
        console.log(nextActiveColumnn)

        if (nextActiveColumnn) {
          // Remove active card in old column
          nextActiveColumnn.cards = nextActiveColumnn?.card?.filter(card => card._id !== activeDraggingCardId)
          // Update array cardOrderIds
          nextActiveColumnn.cardOrderIds = nextActiveColumnn?.card?.map(card => card._id)
        }

        // Check dragging card has in over column
        if (nextOverColumn) {
          // Remove over card in new column
          nextOverColumn.cards = nextOverColumn?.card?.filter(card => card._id !== activeDraggingCardId)

          // Add card to over column
          nextOverColumn.cards = nextOverColumn?.card?.toSpliced(newCardIdx, 0, activeDraggingCardData)

          // Update array cardOrderIds
          nextOverColumn.cardOrderIds = nextOverColumn?.card?.map(card => card._id)
        }

        return [...prevColumns]
      })
    }
  }

  // Trigger when handle drag start
  const handleDragStart = (e) => {
    setActiveId(e?.active?.id)
    setActiveType(e?.active?.data?.current?.columnId ? ACTIVE_TYPE.CARD : ACTIVE_TYPE.COLUMN)
    setActiveDataCurrent(e?.active?.data?.current)
  }

  // Custom animation when drop item
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Box sx={{
        width: '100%',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        height: (theme) => (theme.trello.boardContentHeight),
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumn} />
        <DragOverlay dropAnimation={dropAnimation}>
          {(activeId && activeType === ACTIVE_TYPE.COLUMN) ? (
            <Column column={activeDataCurrent}/>
          ) : null}
          {(activeId && activeType === ACTIVE_TYPE.CARD) ? (
            <Card card={activeDataCurrent}/>
          ): null}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent