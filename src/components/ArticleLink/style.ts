import { Box } from '@mui/material'
import {grey} from '@mui/material/colors'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Desc = styled.div`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  height: 6rem;

  & .wmde-markdown {
    color: grayText;
  }
`

export const Container = styled(Box)`
  padding: 1rem;
  border: 1.45px solid ${grey[400]};
  border-radius: 10px;
  box-sizing: border-box;
  margin: .5rem 0;

  & a {
    text-decoration: none;

    & h5 {
      font-weight: bold;
    }
  }

  &:hover {
    border-color: ${grey[600]};
  }
`

export const DetailLink = styled(Link)`
  width: 100%;
  height: 100%;
`
