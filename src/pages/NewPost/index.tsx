import { Alert, Breadcrumbs, Button, Grid, Link, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { auth, db } from '../../config/firebase'
import MDEditor from '@uiw/react-md-editor'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { postConverter } from '../../config/firebase/converter'

const NewPost: React.FC = () => {
  const navigate = useNavigate()
  const [title, setTitle] = React.useState<string>('')
  const [content, setContent] = React.useState<string>('')
  const [user] = useAuthState(auth)
  const [alert, setAlert] = React.useState<string>('')

  const handleSubmit = async () => {
    setContent(content.trim())

    const postCollectionRef = collection(db, 'posts').withConverter(postConverter)
    const author = {
      displayName: user?.displayName as string,
      uid: user?.uid as string,
      photoURL: user?.photoURL as string
    }
    const postedAt = Timestamp.fromDate(new Date())

    if (title && content) {
      await addDoc(postCollectionRef, {
        author,
        content,
        postedAt,
        title,
        likes: 0
      }).then(post => {
        navigate(`/post/${post.id}`)
      })
    } else {
      setAlert('Title and content must be filled.')
    }
  }

  React.useEffect(() => setAlert(''), [title, content])

  React.useEffect(() => {
    auth.onAuthStateChanged(user => !user && navigate('/'))
  }, [navigate])

  return (
    <>
      <Breadcrumbs>
        <Link component={RouterLink} to='/'>Home</Link>
        <Typography>New Post</Typography>
      </Breadcrumbs>
      <Typography variant='h4' component='div' fontWeight={title && 'bold'} mb={2}>
        {title || 'Create new post'}
      </Typography>
      {alert && <Alert severity='error' sx={{ mb: 1 }}>{alert}</Alert>}
      <Stack spacing={1}>
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs={10}>
            <TextField
              placeholder='Title'
              onChange={e => setTitle(e.target.value.trim())}
              size='small'
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant='contained' onClick={handleSubmit} fullWidth>Post</Button>
          </Grid>
        </Grid>
        <MDEditor
          value={content}
          onChange={(_, e) => setContent(e?.target.value as string)}
          height={440}
        />
      </Stack>
    </>
  )
}

export default NewPost 
