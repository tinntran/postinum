import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from 'firebase/firestore'
import { Post, UserData } from '../../models'

export const postConverter: FirestoreDataConverter<Post> = {
  toFirestore(post: WithFieldValue<Post>): DocumentData {
    const { title, content, likes, author, postedAt } = post

    return { title, content, likes, author, postedAt }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions
  ): Post {
    const data = snapshot.data(options)
    const id = snapshot.id
    const { title, content, likes, author, postedAt } = data

    return { id, title, content, likes, author, postedAt }
  }
}

export const userDataConverter: FirestoreDataConverter<UserData> = {
  toFirestore(userData: WithFieldValue<UserData>): DocumentData {
    const { likedPosts } = userData

    return { likedPosts }
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions
  ): UserData {
    const data = snapshot.data(options)
    const id = snapshot.id
    const { likedPosts } = data

    return { id: id, likedPosts }
  }
} 
