import { IconButton, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import MDEditor from '@uiw/react-md-editor'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import { Post } from '../../models'
import InfoAvatar from '../InfoAvatar'
import LikeButton from '../LikeButton'
import { Container, Desc, DetailLink } from './style'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

export interface ArticleLinkProps {
  data: Post
}

const ArticleLink: React.FC<ArticleLinkProps> = ({ data }) => {
  const { title, content, likes, id, author } = data
  const [user] = useAuthState(auth)

  return (
    <Container>
      <Stack
        direction='row'
        alignItems='center'
        spacing={4}
      >
        <Box>
          <InfoAvatar displayname={author.displayName} photourl={author.photoURL} />
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
        <DetailLink to={`/post/${id}`}>
          <Typography variant='body1' component='h5' fontSize={30} mb={.5}>
            {title}
          </Typography>
          <Desc>
            <MDEditor.Markdown source={content} />
          </Desc>
        </DetailLink>
      </Stack>
    </Container>
  )
}

export default ArticleLink
