import Typography from '@mui/material/Typography'
import AddCardIcon from '@mui/icons-material/AddCard'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { useState } from 'react'
import Box from '@mui/material/Box'
import ListCards from './ListCards/ListCards'
// import { mapOrder } from '@/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'

function Column({ column, createdCard }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndKitColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const [openNewCard, setOpenNewCard] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')
  const open = Boolean(anchorEl)

  // handle open/close context menu
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // Sorting cards
  const orderedCards = column?.cards

  // handle open/close add new card
  const handleOpenAddCard = () => setOpenNewCard(!openNewCard)

  // handle add new card
  const handleAddNewCard = async () => {
    if (!newCardTitle) toast.warn('Please add card title...')

    // Call api add new card
    const newCard = {
      title: newCardTitle,
      columnId: column._id
    }
    await createdCard(newCard)

    // Close add new card and clear text input card title
    handleOpenAddCard()
    setNewCardTitle('')
  }

  return (
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          maxWidth: '300px',
          minWidth: '300px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
          ml: 2,
          borderRadius: '6px',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'
        }}
      >
        {/* Column header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          height: (theme) => theme.trello.headerColumnHeight
        }}>
          <Typography variant='h6' sx={{
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            {column?.title}
          </Typography>
          <Box>
            <ExpandMoreIcon
              sx={{ color: 'text.primary', cursor: 'pointer' }}
              id="basic-column-title"
              aria-controls={open ? 'basic-menu-column-title' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            />
            <Menu
              id="basic-menu-column-title"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-title"'
              }}
            >
              <MenuItem
                onClick={handleOpenAddCard}
                sx={{
                  '&:hover': {
                    'color': 'success.light',
                    '& .add-card-icon': { 'color': 'success.light'}
                  }
                }}
              >
                <ListItemIcon><AddCardIcon className="add-card-icon" fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleOpenAddCard}
                sx={{
                  '&:hover': {
                    'color': 'warning.dark',
                    '& .delete-forever-icon': { 'color': 'warning.dark' }
                  }
                }}
              >
                <ListItemIcon><DeleteForeverIcon className="delete-forever-icon" fontSize="small" /></ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* list cards */}
        <ListCards cards={orderedCards}/>
        {/* Column footer */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          height: (theme) => theme.trello.footerColumnHeight
        }}>
          {!openNewCard ?
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center'
              }}
            >
              <Button data-no-dnd="true" onClick={handleOpenAddCard} startIcon={<AddCardIcon/>}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleOutlinedIcon sx={{ cursor: 'pointer' }}/>
              </Tooltip>
            </Box>
            :
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <TextField
                id="outlined-search"
                label="Input card title..."
                type="text"
                size='small'
                variant='outlined'
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                autoFocus
                data-no-dnd="true"
                sx={{
                  '& label': { color: 'text.primary' },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333463' : '#fff'
                  },
                  '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button variant='contained' color='success' size='small'
                  data-no-dnd="true"
                  onClick={handleAddNewCard}
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  sx={{
                    cursor: 'pointer',
                    color: (theme) => theme.palette.warning.light
                  }}
                  fontSize='small'
                  onClick={handleOpenAddCard}
                />
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default Column
