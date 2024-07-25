import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      display: 'flex',
      height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      width: '100%',
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
      alignItems: 'center'
    }}>Board content</Box>
  )
}

export default BoardContent