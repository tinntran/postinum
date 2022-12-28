import { IconButton, Skeleton, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import React from 'react'
import { Box } from '@mui/system'
import { addDoc, arrayRemove, arrayUnion, collection, doc, increment, setDoc, updateDoc, } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { postConverter, userDataConverter } from '../../config/firebase/converter'
import { useDocument } from 'react-firebase-hooks/firestore'
import { Post, UserData } from '../../models'
import { useAuthState } from 'react-firebase-hooks/auth'
import { LikeButtonSkeleton } from '../Skeletons'

export interface LikeButtonProps {
  id: string | undefined
}

const LikeButton: React.FC<LikeButtonProps> = (props) => {
  const { id } = props

  const postDoc = doc(db, 'posts', id as string).withConverter(postConverter)
  const [data, loading] = useDocument(postDoc)

  const [user] = useAuthState(auth)

  const userDataCollectionRef = doc(
    collection(db, 'userData').withConverter(userDataConverter),
    user?.uid as string
  )

  const [userData, userDataLoading] = useDocument(userDataCollectionRef)

  const [like, setLike] = React.useState(false)
  const postData = data?.data() as Post

  React.useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (!userDataLoading && !userData?.exists())
        setDoc(userDataCollectionRef, { likedPosts: [] })
    })
  }, [])

  React.useEffect(() => {
    if (userData?.exists()) {
      const { likedPosts } = userData?.data() as UserData
      setLike(Boolean(likedPosts.find(id => id == postData.id)))

      // console.log(userData?.data(), Boolean(likedPosts.find(id => id == postData.id)))
    }
  }, [userData])

  const submitLike = async () => {
    const { likedPosts } = userData?.data() as UserData

    if (!likedPosts.find(id => id == postData.id)) {
      await updateDoc(userDataCollectionRef, {
        likedPosts: arrayUnion(postData.id as string)
      })
      await updateDoc(postDoc, {
        likes: increment(1)
      })
    } else {
      await updateDoc(userDataCollectionRef, {
        likedPosts: arrayRemove(postData.id as string)
      })
      await updateDoc(postDoc, {
        likes: increment(-1)
      })
    }
  }

  if (data && userData?.exists() && !loading) {
    const { likes } = postData

    return (
      <Box display='flex' flexDirection='column' alignItems='center'>
        <IconButton onClick={submitLike}>
          <ThumbUpIcon color={like ? 'primary' : 'action'} />
        </IconButton>
        <Typography variant='caption' component='p'>{likes && likes}</Typography>
      </Box>
    )
  }

  return (
    <LikeButtonSkeleton />
  )
}

export default LikeButton 
