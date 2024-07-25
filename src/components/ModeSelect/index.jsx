import { useColorScheme } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'

const ModeSelect = () => {
  const { mode, setMode } = useColorScheme()

  const handleChangeMode = (e) => {
    setMode(e.target.value)
  }

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel
        id="label-light-dark-mode"
        sx={{
          color: '#fff',
          '&.Mui-focused': {
            color: '#fff'
          }
        }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="label-light-dark-mode"
        id="select-light-dark-mode"
        value={mode}
        label="Mode"
        onChange={handleChangeMode}
        sx={{
          color: '#fff',
          '.MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
          '.MuiSvgIcon-root': { color: '#fff' }
        }}
      >
        <MenuItem value='light'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize='small' /> Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon fontSize='small'/> Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon fontSize='small'/> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect