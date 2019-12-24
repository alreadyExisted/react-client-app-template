import { callApi } from '@app/api/call-api'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export const getPosts = async (): Promise<Post[]> => callApi('/posts')
