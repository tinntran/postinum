import { Alert, Breadcrumbs, Button, Grid, Link, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { auth, db } from '../../../config/firebase'
import MDEditor from '@uiw/react-md-editor'
import { useDocument } from 'react-firebase-hooks/firestore'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { Post } from '../../../models'
import { postConverter } from '../../../config/firebase/converter'
import NotFoundPage from '../../NotFoundPage'
import DeleteModal from './DeleteModal'

const Edit: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [title, setTitle] = React.useState<string>('')
  const [content, setContent] = React.useState<string>('')
  const [alert, setAlert] = React.useState<string>('')
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false)
  const postDoc = doc(db, 'posts', id as string).withConverter(postConverter)
  const [data, loading] = useDocument(postDoc)

  const handleSubmit = async () => {
    setContent(content.trim())

    if (title && content) {
      await setDoc(postDoc, {
        ...data?.data(),
        title,
        content,
      }).then(() => navigate(`/post/${data?.id}`))
    } else {
      setAlert('Title and content must be filled.')
    }
  }

  React.useEffect(() => {
    if (data?.exists()) {
      const { title, content } = data.data()
      setTitle(title as string)
      setContent(content as string)
    }
  }, [data])

  React.useEffect(() => setAlert(''), [title, content])

  React.useEffect(() => {
    if (data?.exists()) {
      const { author, id } = data.data() as Post
      auth.onAuthStateChanged(user => user?.uid != author.uid && navigate(`/post/${id}`))
    }
  }, [navigate])

  if (loading) return (
    <>
      <Typography variant='h4' component='div' mb={2}>
        <Skeleton />
        <Skeleton width='60%' />
      </Typography>
      <Stack spacing={1}>
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs={10}>
            <Skeleton height={64} />
          </Grid>
          <Grid item xs={2}>
            <Skeleton height={64} />
          </Grid>
        </Grid>
      </Stack>
    </>
  )

  if (data?.exists()) {
    const prevData = data.data() as Post

    return (
      <>
        <Breadcrumbs>
          <Link component={RouterLink} to='/'>Home</Link>
          <Typography>Edit Post</Typography>
        </Breadcrumbs>
        <Typography variant='h4' component='div' fontWeight={title && 'bold'} mb={2}>
          {title || prevData.title}
        </Typography>
        {alert && <Alert severity='error' sx={{ mb: 1 }}>{alert}</Alert>}
        <Stack spacing={1} mb={12}>
          <Grid container spacing={1} alignItems='center'>
            <Grid item xs={10}>
              <TextField
                placeholder='Title'
                onChange={e => setTitle(e.target.value.trim())}
                defaultValue={prevData.title}
                size='small'
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant='contained' onClick={handleSubmit} fullWidth>Update</Button>
            </Grid>
          </Grid>
          <MDEditor
            value={content}
            onChange={(_, e) => setContent(e?.target.value as string)}
            height={440}
          />
          <Button
            variant='contained'
            color='error'
            onClick={() => setDeleteModalOpen(true)}
            fullWidth
          >delete post</Button>
          <DeleteModal open={deleteModalOpen} setOpen={setDeleteModalOpen} id={prevData.id as string} />
        </Stack>
      </>
    )
  } else return (
    <NotFoundPage />
  )
}

export default Edit 
