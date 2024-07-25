import ModeSelect from '@/components/ModeSelect'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '@/assets/icons/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import WorkSpaces from './Menus/WorkSpaces'
import Recent from './Menus/Recent'
import Templates from './Menus/Templates'
import Starred from './Menus/Starred'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import Tooltip from '@mui/material/Tooltip'
import Profile from './Menus/Profile'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box sx={{
      display: 'flex',
      height: (theme) => theme.trello.appBarHeight,
      width: '100%',
      paddingX: 2,
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'
    }}>
      <Box sx={{ display:'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: '#fff' }} />
        <Box sx={{ display:'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox fontSize='small' sx={{ color: '#fff' }} />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>Trello</Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <WorkSpaces />
          <Recent />
          <Starred />
          <Templates />

          <Button
            sx={{
              color: '#fff',
              border: 'none',
              '&:hover': {
                border: 'none'
              }
            }}
            variant="outlined"
            startIcon={<LibraryAddIcon />}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ display:'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          size='small'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#fff' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon
                  sx={{ color: searchValue ? '#fff' : 'transparent', cursor: 'pointer' }}
                  fontSize='small'
                  onClick={() => setSearchValue('')}
                />
              </InputAdornment>
            )
          }}
          sx={{
            minWidth: 120,
            maxWidth: 170,
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
        <ModeSelect />
        <Tooltip title={'Notification'}>
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: '#fff' }} />
          </Badge>
        </Tooltip>
        <Tooltip title={'Help'}>
          <HelpOutlineOutlinedIcon sx={{ cursor: 'pointer', color: '#fff' }}/>
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar