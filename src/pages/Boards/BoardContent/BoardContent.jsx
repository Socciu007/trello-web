import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { generatePlaceholderCard, mapOrder } from '@/utils'
import {
  closestCenter,
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { MouseSensor, TouchSensor } from '@/customLibraries/DndKitSensors'

const ACTIVE_TYPE = {
  CARD: 'card',
  COLUMN: 'column'
}

function BoardContent({ board, createdColumn, createdCard }) {
  const [orderedColumn, setOrderColumn] = useState([])
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 }
  // })
  const [activeId, setActiveId] = useState(null)
  const [activeType, setActiveType] = useState(null)
  const [activeDataCurrent, setActiveDataCurrent] = useState(null)
  const [oldDataInColumn, setOldDataInColumn] = useState(null)

  const lastOverId = useRef(null) // previous collision endpoint in the collision detection algorithm

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

  // Re-update the state in case of moving card in different columns
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
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
      const nextActiveColumn = nextColumn.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumn.find(column => column._id === overColumn._id)

      if (nextActiveColumn) {
        // Remove active card in old column
        nextActiveColumn.cards = nextActiveColumn?.cards?.filter(card => card._id !== activeDraggingCardId)

        // Add placeholder card if nextActiveColumn is empty
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        // Update array cardOrderIds
        nextActiveColumn.cardOrderIds = nextActiveColumn?.cards?.map(card => card._id)
      }

      // Check dragging card has in over column
      if (nextOverColumn) {
        // Remove over card in new column
        nextOverColumn.cards = nextOverColumn?.cards?.filter(card => card._id !== activeDraggingCardId)

        // Update columnId in cards when dragging card in different column
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: overColumn._id
        }

        // Add card to over column
        nextOverColumn.cards = nextOverColumn?.cards?.toSpliced(newCardIdx, 0, rebuild_activeDraggingCardData)

        // Remove placeholder card if exist
        nextOverColumn.cards = nextOverColumn?.cards?.filter(c => !c.FE_PlaceholderCard)

        // Update array cardOrderIds
        nextOverColumn.cardOrderIds = nextOverColumn?.cards?.map(card => card._id)
      }

      return nextColumn
    })
  }
  // Trigger when handle finished drag
  const handleDragEnd = (e) => {
    const { active, over } = e
    if (!over || !active) return

    if (activeType === ACTIVE_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active // Card is dragging
      const { id: overCardId } = over // Card is interacting with the card is dragged above

      // find 2 column container 2 that card
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return // if not existing column, do nothing (avoid trash web page)
      if (oldDataInColumn._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // Action drag card in a column
        // get old index of oldDataInColumn
        const oldCardIdx = oldDataInColumn?.cards?.findIndex(c => c._id === activeDraggingCardId)
        // get new index of oldDataInColumn
        const newCardIdx = overColumn?.cards?.findIndex(c => c._id === overCardId)
        // swap elements of cards after finished drag card
        const orderedDragCards = arrayMove(oldDataInColumn?.cards, oldCardIdx, newCardIdx)

        setOrderColumn(prevColumn => {
          const nextColumn = cloneDeep(prevColumn)

          // Find column dropped
          const targetColumn = nextColumn?.find(c => c._id === overColumn._id)

          // Update cards and cardOrderIds in target column
          targetColumn.cards = orderedDragCards
          targetColumn.cardOrderIds = orderedDragCards?.map(card => card._id)

          return nextColumn
        })
      }
    }

    if (activeType === ACTIVE_TYPE.COLUMN && active.id !== over.id) {
      // get old index of orderedColumn
      const oldColumnIdx = orderedColumn.findIndex(c => c._id === active.id)
      // get new index of orderedColumn
      const newColumnIdx = orderedColumn.findIndex(c => c._id === over.id)
      // swap element of column after finished drag column
      const orderedDragColumn = arrayMove(orderedColumn, oldColumnIdx, newColumnIdx)
      setOrderColumn(orderedDragColumn)
    }

    setActiveId(null)
    setActiveType(null)
    setActiveDataCurrent(null)
    setOldDataInColumn(null)
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
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  // Trigger when handle drag start
  const handleDragStart = (e) => {
    setActiveId(e?.active?.id)
    setActiveType(e?.active?.data?.current?.columnId ? ACTIVE_TYPE.CARD : ACTIVE_TYPE.COLUMN)
    setActiveDataCurrent(e?.active?.data?.current)

    // if drag card, set value for oldData into column
    if (e?.active?.data?.current?.columnId) {
      setOldDataInColumn(findColumnByCardId(e?.active?.id))
    }
  }

  // Custom animation when drop item
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  // Custom collision detection algorithm
  const collisionDetectionStrategy = useCallback((args) => {
    if (activeType === ACTIVE_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    // Find intersection and collision points with the cursor
    const pointerIntersections = pointerWithin(args)

    if (!pointerIntersections?.length) return
    // Collision detection algorithms
    const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args)

    // Find the first collision in intersections (closest to the pointer)
    let overId = getFirstCollision(intersections, 'id')

    if (overId) {
      const checkColumn = orderedColumn.find(c => c._id === overId)
      if (checkColumn) {
        // console.log('before ', overId)
        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
        // console.log('after ', overId)
      }

      lastOverId.current = overId
      return [{ id : overId }]
    }
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeType, orderedColumn])

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy} //collision detection algorithms
    >
      <Box sx={{
        width: '100%',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        height: (theme) => (theme.trello.boardContentHeight),
        p: '10px 0'
      }}>
        <ListColumns
          columns={orderedColumn}
          createdColumn={createdColumn}
          createdCard={createdCard}
        />
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