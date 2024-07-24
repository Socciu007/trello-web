import Box from '@mui/material/Box'

function BoardBar() {
  return (
    <Box sx={{
      display: 'flex',
      height: (theme) => theme.trello.boardBarHeight,
      width: '100%',
      backgroundColor: 'primary.light',
      alignItems: 'center'
    }}>
      Board bar
    </Box>
  )
}

export default BoardBar