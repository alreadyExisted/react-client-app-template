import { callApi } from '@app/api/call-api'

interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export const getPhotos = async (): Promise<Photo[]> => callApi('/photos')
