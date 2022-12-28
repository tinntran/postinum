import { Timestamp } from "firebase/firestore"

export default interface Post {
  id?: string,
  title: string,
  content: string,
  postedAt: Timestamp,
  likes?: number,
  author: {
    displayName: string,
    photoURL?: string,
    uid: string
  },
}
