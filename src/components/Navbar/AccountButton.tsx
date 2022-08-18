import { Avatar, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Skeleton, Tooltip, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import LogoutIcon from '@mui/icons-material/Logout'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import NavButton from './NavButton'

const AccountButton: React.FC = () => {
  const [user, loading, error] = useAuthState(auth)
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>()
  const isAvatarMenuOpen = Boolean(anchorEl)

  const onAvatarOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const onAvatarClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    onAvatarClose()
    auth.signOut()
  }

  if (user) return (
    <>
      <IconButton
        id='avatar-button'
        aria-controls={isAvatarMenuOpen ? 'avatar-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={isAvatarMenuOpen ? 'true' : undefined}
        sx={{ p: .5 }}
        onClick={onAvatarOpen}
      >
        <Avatar
          alt={user.displayName as string}
          src={user.photoURL as string}
        >
          {user.photoURL == null && user.displayName?.at(0)}
        </Avatar>
      </IconButton>
      <Menu
        id='avatar-menu'
        open={isAvatarMenuOpen}
        anchorEl={anchorEl}
        onClose={onAvatarClose}
        MenuListProps={{
          'aria-labelledby': 'avatar-button'
        }}
      >
        <MenuList>
          <MenuItem>
            <ListItemText onClick={onAvatarClose}>
              <Typography>
                Signed in as{' '}
                <Typography fontWeight='bold' component='strong'>{user.displayName}</Typography>
              </Typography>
            </ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={logout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText>Sign out</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )

  if (!user && !loading) return (
    <>
      <NavButton to='/signin'>Sign in</NavButton>
    </>
  )

  if (error) return (
    <Tooltip title={error.stack as string}>
      <Avatar>
        <ErrorIcon />
      </Avatar>
    </Tooltip>
  )

  return (
    <>
      {loading && <Skeleton variant='circular' width={40} height={40} />}
    </>
  )
}

export default AccountButton