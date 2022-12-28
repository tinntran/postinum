import { AppBar, Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebase'
import AccountButton from './AccountButton'
import NavButton from '../StyledButton'
import { StyledToolBar } from './style'

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth)

  return (
    <AppBar position='static' sx={{ marginBottom: 2 }}>
      <StyledToolBar>
        <Stack direction='row' alignItems='center' spacing={1}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Typography variant='h6' component='div' mr={0.5} fontWeight='bold'>
              Postinum
            </Typography>
          </Link>
          {user && <NavButton to='/new/post'>New Post</NavButton>}
        </Stack>
        <Box>
          <AccountButton />
        </Box>
      </StyledToolBar>
    </AppBar>
  )
}

export default Navbar
