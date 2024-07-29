import { Card as MuiCard } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const dndKitCardStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  }

  const showAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }

  return (
    <MuiCard
      ref={setNodeRef} style={dndKitCardStyle} {...attributes} {...listeners}
      sx={{
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        overflow: 'unset'
      }}
    >
      {card?.cover && (
        <CardMedia
          sx={{ height: 140 }}
          image={card.cover}
          title="card image"
        />
      )}

      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>

      {showAction() &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length && <Button size="small" startIcon={<GroupIcon/>}>{card.memberIds.length}</Button>}
          {!!card?.comments?.length && <Button size="small" startIcon={<CommentIcon/>}>{card.comments.length}</Button>}
          {!!card?.attachments?.length && <Button size="small" startIcon={<AttachmentIcon/>}>{card.attachments.length}</Button>}
        </CardActions>
      }
    </MuiCard>
  )
}

export default Card