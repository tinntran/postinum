import { Timestamp } from "firebase/firestore"

interface Post {
  id?: string,
  title: string,
  content: string,
  postedAt: Timestamp,
  author: {
    displayName: string,
    uid: string
  },
}

export default Post
