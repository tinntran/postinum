import { Box, Breadcrumbs, Typography, Link as MUILink, IconButton, Stack, Button } from '@mui/material'
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
import InfoAvatar from '../../components/InfoAvatar'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import LikeButton from '../../components/LikeButton'

const Article: React.FC & { Edit: React.FC } = () => {
  const { id } = useParams()
  const postDoc = doc(db, 'posts', id as string).withConverter(postConverter)
  const [data, loading] = useDocument(postDoc)
  const [user] = useAuthState(auth)

  if (loading) return (
    <ArticleSkeleton />
  )

  if (data?.exists()) {
    const { id, title, content, likes, author, postedAt } = data.data() as Post

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
        <Stack direction='row' mt={6} spacing={4}>
          <Box display='inline-flex' alignItems='center'>
            <InfoAvatar
              sx={{ width: 64, height: 64 }}
              displayname={author?.displayName as string}
              photourl={author?.photoURL as string}
            />
            <Typography fontWeight='bold' ml={1}>{author.displayName}</Typography>
          </Box>
          <Box display='inline-flex' alignItems='center'>
            {user
              ? <LikeButton id={id} />
              : <Box display='flex' flexDirection='column' alignItems='center'>
                <IconButton disabled>
                  <ThumbUpIcon color='action' />
                </IconButton>
                <Typography variant='caption' component='p'>{likes && likes}</Typography>
              </Box>
            }
          </Box>
        </Stack>
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
