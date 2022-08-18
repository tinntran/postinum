import { Container } from '@mui/material'
import React from 'react'
import Navbar from './components/Navbar'
import Router from './Router'

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth='md'>
        <Router />
      </Container>
    </>
  )
}

export default App
