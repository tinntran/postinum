import { Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Post } from '../../models'
import { Container, Desc } from './style'

export interface ArticleLinkProps {
  data: Post
}

const ArticleLink: React.FC<ArticleLinkProps> = ({ data }) => {
  const { title, content, id } = data

  return (
    <Container>
      <RouterLink to={`/post/${id}`}>
        <Typography variant='h5' component='h5' mb={0.5}>
          {title}
        </Typography>
      </RouterLink>
      <RouterLink to={`/post/${id}`}>
        <Desc variant='body2'>
          {content.length >= 500 ? content.substring(0, content.lastIndexOf('.', 500)) + '.' : content}
        </Desc>
      </RouterLink>
    </Container>
  )
}

export default ArticleLink
