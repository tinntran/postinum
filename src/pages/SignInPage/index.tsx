import { Alert, Box, Card, CardContent, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

const SignInPage: React.FC = () => {
  const navigate = useNavigate()
  const [signInWithGoogle, _user, loading, error] = useSignInWithGoogle(auth)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => user && navigate('/'))
  }, [navigate])

  return (
    <Box sx={{ maxWidth: 640, m: 'auto', mt: 4 }}>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='h5' component='div' mb={3}>Sign in</Typography>
          {error && <Alert severity='error' sx={{ mb: 2 }}>{error.message}</Alert>}
          <LoadingButton
            variant='outlined'
            startIcon={<GoogleIcon />}
            onClick={() => signInWithGoogle()}
            loading={loading}
            loadingPosition='start'
            fullWidth
          >
            Continue with Google
          </LoadingButton>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SignInPage
