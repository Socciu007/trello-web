import { Card as MuiCard } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ hideMedia }) {
  return (
    <MuiCard sx={{
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      overflow: 'unset'
    }}>
      {!hideMedia && (
        <CardMedia
          sx={{ height: 140 }}
          image="https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=600"
          title="card image"
        />
      )}
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>Lizard</Typography>
      </CardContent>
      {!hideMedia && (
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          <Button size="small" startIcon={<GroupIcon/>}>20</Button>
          <Button size="small" startIcon={<CommentIcon/>}>15</Button>
          <Button size="small" startIcon={<AttachmentIcon/>}>10</Button>
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card