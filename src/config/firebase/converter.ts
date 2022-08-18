import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from 'firebase/firestore'
import { Post } from '../../models'

export const postConverter: FirestoreDataConverter<Post> = {
  toFirestore(post: WithFieldValue<Post>): DocumentData {
    const { title, content, author, postedAt } = post

    return { title, content, author, postedAt }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions
  ): Post {
    const data = snapshot.data(options)
    const id = snapshot.id
    const { title, content, author, postedAt } = data

    return { id, title, content, author, postedAt }
  }
}
