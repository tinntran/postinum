import { IconButton, Skeleton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import React from 'react'

const LikeButton: React.FC = () => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <IconButton>
        <ThumbUpIcon />
      </IconButton>
      <Typography variant='caption' component='p'>
        <Skeleton />
      </Typography>
    </Box>
  )
}

export default LikeButton
