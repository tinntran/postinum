import { Box, Typography } from '@mui/material'
import styled from 'styled-components'

export const Desc = styled(Typography)`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  color: GrayText;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  max-height: 90px;
`

export const Container = styled(Box)`
  padding: 1rem 0;
  border-bottom: 1px solid lightgray;

  & a {
    text-decoration: none;

    & h5 {
      font-weight: bold;
    }
  }
`
