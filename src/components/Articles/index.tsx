import { collection } from 'firebase/firestore'
import React from 'react'
import { db } from '../../config/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { postConverter } from '../../config/firebase/converter'
import { ArticleSkeleton } from '../Skeletons'
import ArticleLink from '../ArticleLink'

const Articles: React.FC = () => {
  const postsRef = collection(db, 'posts').withConverter(postConverter)
  const [posts, loading, _error] = useCollectionData(postsRef)

  if (posts) return (
    <>
      {posts.map(post => <ArticleLink key={post.id} data={post} />)}
    </>
  )

  return (
    <>
      {loading && <>
        <ArticleSkeleton.Link />
        <ArticleSkeleton.Link />
        <ArticleSkeleton.Link />
      </>}
    </>
  )
}

export default Articles
