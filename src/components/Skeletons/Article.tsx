import { Box, Skeleton, Typography } from '@mui/material'
import React from 'react'

const Article: React.FC & { Link: React.FC } = () => {
  return (
    <>
      <Typography variant='h4' component='div' mb={3}>
        <Skeleton />
        <Skeleton width='32%' />
      </Typography>
      <Typography component='div'>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Typography>
    </>
  )
}

Article.Link = () => {
  return (
    <Box sx={{ py: 4, borderBottom: '1px solid lightgray' }}>
      <Typography variant='h5' component='div'>
        <Skeleton />
      </Typography>
      <Typography variant='body2' component='div'>
        <Skeleton />
        <Skeleton />
        <Skeleton width='70%' />
      </Typography>
    </Box>
  )
}

export default Article
