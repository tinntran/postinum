import { Button, ButtonBase, ButtonBaseProps, SxProps } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'
import { Link, To } from 'react-router-dom'

interface NavButtonProps extends ButtonBaseProps {
  to: To
}

const ButtonBaseSx: SxProps = {
  color: 'white',
  fontFamily: `'Roboto Condensed', sans-serif`,
  fontWeight: 'bold',
  fontSize: 17,
  py: 1.5,
  px: 2,
  borderRadius: 2,
  '&:hover': {
    backgroundColor: blue[800],
    transition: '200ms',
  }
}

const NavButton: React.FC<NavButtonProps> = (props) => {
  const { children, to } = props

  return (
    <Link to={to}>
      <ButtonBase
        {...props}
        LinkComponent='button'
        sx={ButtonBaseSx}
      >
        {children}
      </ButtonBase>
    </Link>
  )
}

export default NavButton
