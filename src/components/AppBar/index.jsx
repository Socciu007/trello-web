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

function AppBar() {
  return (
    <Box px={2} sx={{
      display: 'flex',
      height: (theme) => theme.trello.appBarHeight,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main' }} />
        <Box sx={{ display:'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox fontSize='small' sx={{ color: 'primary.main' }} />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 700, color: 'primary.main' }}>Trello</Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <WorkSpaces />
          <Recent />
          <Starred />
          <Templates />

          <Button variant="outlined">Create</Button>
        </Box>
      </Box>
      <Box sx={{ display:'flex', alignItems: 'center', gap: 2 }}>
        <TextField id="outlined-search" label="Search..." type="search" size='small' sx={{ minWidth: 120 }} />
        <ModeSelect />
        <Tooltip title={'Notification'}>
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>
        <Tooltip title={'Help'}>
          <HelpOutlineOutlinedIcon sx={{ cursor: 'pointer', color: 'primary.main' }}/>
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar