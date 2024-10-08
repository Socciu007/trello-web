import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

const DEFAULT_OPTIONS = {
  title: 'Are you sure?',
  description: '',
  content: null,
  confirmationText: 'Ok',
  cancellationText: 'Cancel',
  dialogProps: {},
  dialogActionsProps: {},
  confirmationButtonProps: {},
  cancellationButtonProps: {},
  titleProps: {},
  contentProps: {},
  allowClose: true,
  confirmationKeywordTextFieldProps: {},
  hideCancelButton: false,
  buttonOrder: ['cancel', 'confirm'],
  acknowledgement: false,
  acknowledgementFormControlLabelProps: {},
  acknowledgementCheckboxProps: {}
}

const DialogConfirm = ({
  open,
  options = {},
  onClose,
  onCancel,
  onConfirm
}) => {
  const {
    dialogProps,
    dialogActionsProps,
    title,
    titleProps,
    content,
    contentProps,
    description,
    allowClose,
    confirmationKeyword,
    confirmationKeywordTextFieldProps,
    acknowledgement,
    acknowledgementFormControlLabelProps,
    acknowledgementCheckboxProps,
    hideCancelButton,
    cancellationButtonProps,
    cancellationText,
    confirmationButtonProps,
    confirmationText,
    buttonOrder
  } = { ...DEFAULT_OPTIONS, ...options }

  const [confirmationKeywordValue, setConfirmationKeywordValue] =React.useState('')
  const [isAcknowledged, setIsAcknowledged] = React.useState(false)

  const confirmationButtonDisabled = Boolean(
    (confirmationKeyword && confirmationKeywordValue !== confirmationKeyword) ||
      (acknowledgement && !isAcknowledged)
  )

  const confirmationContent = (
    <>
      {confirmationKeyword && (
        <TextField
          onChange={(e) => setConfirmationKeywordValue(e.target.value)}
          value={confirmationKeywordValue}
          fullWidth
          {...confirmationKeywordTextFieldProps}
        />
      )}
    </>
  )

  const acknowledgeCheckbox = (
    <>
      {acknowledgement && (
        <FormControlLabel
          {...acknowledgementFormControlLabelProps}
          control={
            <Checkbox
              {...acknowledgementCheckboxProps}
              value={isAcknowledged}
              onChange={(_, value) => setIsAcknowledged(value)}
            />
          }
          label={acknowledgement}
        />
      )}
    </>
  )

  const dialogActions = buttonOrder.map((buttonType) => {
    if (buttonType === 'cancel') {
      return (
        !hideCancelButton && (
          <Button key='cancel' {...cancellationButtonProps} onClick={onCancel}>
            {cancellationText}
          </Button>
        )
      )
    }

    if (buttonType === 'confirm') {
      return (
        <Button
          key='confirm'
          color='primary'
          disabled={confirmationButtonDisabled}
          {...confirmationButtonProps}
          onClick={onConfirm}
        >
          {confirmationText}
        </Button>
      )
    }

    throw new Error(
      `Supported button types are only "confirm" and "cancel", got: ${buttonType}`
    )
  })

  return (
    <Dialog
      fullWidth
      {...dialogProps}
      open={open}
      onClose={allowClose ? onClose : null}
    >
      {title && <DialogTitle {...titleProps}>{title}</DialogTitle>}
      {content ? (
        <DialogContent {...contentProps}>
          {content}
          {confirmationContent}
          {acknowledgeCheckbox}
        </DialogContent>
      ) : description ? (
        <DialogContent {...contentProps}>
          <DialogContentText>{description}</DialogContentText>
          {confirmationContent}
          {acknowledgeCheckbox}
        </DialogContent>
      ) : (
        (confirmationKeyword || acknowledgeCheckbox) && (
          <DialogContent {...contentProps}>
            {confirmationContent}
            {acknowledgeCheckbox}
          </DialogContent>
        )
      )}
      <DialogActions {...dialogActionsProps}>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export default DialogConfirm