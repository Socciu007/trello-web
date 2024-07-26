import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      p: '0 5px',
      m: '0 5px',
      overflow: 'hidden auto',
      maxHeight: (theme) => `calc(
        ${theme.trello.boardContentHeight} - 
        ${theme.spacing(5)} -
        ${theme.trello.headerColumnHeight} -
        ${theme.trello.footerColumnHeight}
      )`,
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
      '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
    }}>
      <Card />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
    </Box>
  )
}

export default ListCards