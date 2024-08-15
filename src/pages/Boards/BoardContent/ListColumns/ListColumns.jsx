import Box from '@mui/material/Box'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast } from 'react-toastify'

function ListColumns({ columns, createdColumn, createdCard }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const handleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const handleAddNewColumn = async () => {
    if (!newColumnTitle) toast.warn('Please add column title...')

    // Call api
    const newColumn = {
      title: newColumnTitle
    }
    await createdColumn(newColumn)

    // Close add new column and clear column title
    handleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflow: 'auto hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {columns?.map(column => (<Column key={column._id} column={column} createdCard={createdCard}/>))}
        {/* Box add new column */}
        {!openNewColumnForm ?
          <Box onClick={handleOpenNewColumnForm} sx={{
            minWidth: '200px',
            maxWidth: '200px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}>
            <Button
              sx={{
                color: '#fff',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}
              startIcon={<NoteAddIcon />}>Add new column</Button>
          </Box>
          :
          <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              id="outlined-search"
              label="Input column title..."
              type="text"
              size='small'
              variant='outlined'
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              autoFocus
              sx={{
                '& label': { color: '#fff' },
                '& input': { color: '#fff' },
                '& label.Mui-focused': { color: '#fff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#fff' },
                  '&:hover fieldset': { borderColor: '#fff' },
                  '&.Mui-focused fieldset': { borderColor: '#fff' }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button variant='contained' color='success' size='small'
                onClick={handleAddNewColumn}
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}
              >
                Add column
              </Button>
              <CloseIcon
                sx={{
                  cursor: 'pointer',
                  color: '#fff',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                fontSize='small'
                onClick={handleOpenNewColumnForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns