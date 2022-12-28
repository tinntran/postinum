import { Avatar, AvatarProps } from '@mui/material'
import React from 'react'

export interface InfoAvatarProps extends AvatarProps {
  displayname: string,
  photourl?: string
}

const InfoAvatar: React.FC<InfoAvatarProps> = (props) => {
  const { displayname, photourl } = props

  return (
    <Avatar
      alt={displayname}
      src={photourl || ''}
      {...props}
    >
      {photourl == null && displayname?.at(0)}
    </Avatar>
  )
}

export default InfoAvatar

