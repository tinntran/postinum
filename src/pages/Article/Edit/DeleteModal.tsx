import { Button, Card, CardContent, Modal, Stack, TextField, Typography } from '@mui/material'
import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../config/firebase'
import { postConverter } from '../../../config/firebase/converter'

export interface DeleteModalProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  id: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, setOpen, id }) => {
  const navigate = useNavigate()
  const [isConfirmCorrect, setIsConfirmCorrect] = React.useState<boolean>(false)
  const postDoc = doc(db, 'posts', id as string).withConverter(postConverter)

  const handleConfirmCorrection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == 'I will delete this post') setIsConfirmCorrect(true)
    else setIsConfirmCorrect(false)
  }

  const handleSubmit = async () => {
    setOpen(false)

    await deleteDoc(postDoc).then(() => navigate('/'))
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
    >
      <Card
        sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <CardContent>
          <Typography variant='h6' mb={2} fontWeight='bold'>
            Are you absolutely sure?
          </Typography>
          <Typography mb={1}>This action cannot be undone. Everything about this post will be deleted.</Typography>
          <Typography>
            Please type{' '}
            <Typography fontWeight='bold' component='strong'>I will delete this post</Typography> to confirm
          </Typography>
          <Stack spacing={1} mt={2}>
            <TextField size='small' onChange={handleConfirmCorrection} fullWidth />
            <Button variant='outlined' color='error' onClick={handleSubmit} disabled={!isConfirmCorrect} fullWidth>
              I understand the consequences, delete this post
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default DeleteModal
