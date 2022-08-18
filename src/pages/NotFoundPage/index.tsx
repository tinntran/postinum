import { Link, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { NotFoundContainer } from './style'

const NotFoundPage: React.FC = () => {
  return (
    <NotFoundContainer>
      <Typography variant='h1'>🛣️❓</Typography>
      <Typography variant='h4'>Page could not be found.</Typography>
      <Link component={RouterLink} variant='h6' to='/'>
        Back to Home
      </Link>
    </NotFoundContainer>
  )
}

export default NotFoundPage