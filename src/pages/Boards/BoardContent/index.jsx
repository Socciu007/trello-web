import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      display: 'flex',
      height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      width: '100%',
      backgroundColor: 'primary.dark',
      alignItems: 'center'
    }}>Board content</Box>
  )
}

export default BoardContent