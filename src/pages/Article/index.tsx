import { Box, Breadcrumbs, Typography, Link as MUILink, IconButton, Stack } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'
import { doc } from 'firebase/firestore'
import moment from 'moment'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { auth, db } from '../../config/firebase'
import { postConverter } from '../../config/firebase/converter'
import { Post } from '../../models'
import NotFoundPage from '../../pages/NotFoundPage'
import EditIcon from '@mui/icons-material/Edit';
import { ArticleSkeleton } from '../../components/Skeletons'
import Edit from './Edit'

const Article: React.FC & { Edit: React.FC } = () => {
  const { id } = useParams()
  const postDoc = doc(db, 'posts', id as string).withConverter(postConverter)
  const [data, loading] = useDocument(postDoc)
  const [user] = useAuthState(auth)

  if (loading) return (
    <ArticleSkeleton />
  )

  if (data?.exists()) {
    const { id, title, content, author, postedAt } = data.data() as Post

    return (
      <>
        <Box display='flex' justifyContent='space-between' mb={2}>
          <Breadcrumbs>
            <MUILink component={RouterLink} to='/'>Home</MUILink>
            <Typography>{author.displayName}'s post</Typography>
          </Breadcrumbs>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography color='GrayText'>
              {moment(postedAt.toMillis()).format('dddd, DD/MM/YYYY HH:mm')}
            </Typography>
            {user?.uid == author.uid &&
              <RouterLink to={`/post/${id}/edit`}>
                <IconButton size='small'>
                  <EditIcon />
                </IconButton>
              </ RouterLink>
            }
          </Stack>
        </Box>
        <Typography variant='h4' component='div' fontWeight='bold' mb={3}>
          {title}
        </Typography>
        <Typography component='div'>
          <MDEditor.Markdown source={content} />
        </Typography>
        <Typography textAlign='end' fontWeight='bold' mt={6} mb={12}>{author.displayName}</Typography>
      </>
    )
  } else {
    return (
      <NotFoundPage />
    )
  }
}

Article.Edit = Edit

export default Article
