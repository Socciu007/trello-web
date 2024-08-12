
import Box from '@mui/material/Box'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Button from '@mui/material/Button'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { TextField } from '@mui/material'

function ListColumns({ columns }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const handleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
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
        {columns?.map(column => (<Column key={column._id} column={column}/>))}
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
            minWidth: '200px',
            maxWidth: '200px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}>
            <TextField
              id="outlined-search"
              label="Input new column..."
              type="text"
              size='small'
              variant='outlined'
              autoFocus
              sx={{
                minWidth: 120,
                maxWidth: 200,
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
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns