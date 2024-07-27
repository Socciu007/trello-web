import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '@/utils'

const MENU_STYLES = {
  color: '#fff',
  bgcolor: 'transparent',
  border: 'none',
  borderRadius: '4px',
  paddingX: '5px',
  '.MuiSvgIcon-root': {
    color: '#fff'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar({ board }) {
  return (
    <Box sx={{
      display: 'flex',
      height: (theme) => theme.trello.boardBarHeight,
      width: '100%',
      paddingX: 2,
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
      borderBottom: '1px solid #fff',
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
          // onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board.type)}
          clickable
          // onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
          // onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
          // onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
          // onClick={() => {}}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: '#fff',
            borderColor: '#fff',
            '&:hover': { borderColor: '#fff' }
          }}
        >Invite</Button>
        <AvatarGroup
          max={3}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 30,
              height: 30,
              fontSize: 16,
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          {board?.memberIds?.map((member, idx) => (
            <Tooltip title="Money" key={idx}>
              <Avatar
                alt="avt-1"
                src="/static/images/avatar/1.jpg"
              />
            </Tooltip>
          ))}
          <Tooltip title="Money">
            <Avatar
              alt="avt-1"
              src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Money">
            <Avatar
              alt="avt-1"
              src="/static/images/avatar/2.jpg" />
          </Tooltip>
          <Tooltip title="Money">
            <Avatar
              alt="avt-1"
              src="/static/images/avatar/3.jpg" />
          </Tooltip>
          <Tooltip title="Money">
            <Avatar
              alt="avt-1"
              src="/static/images/avatar/3.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar