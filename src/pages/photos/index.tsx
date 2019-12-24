import { api } from '@app/api'
import { useRemoteData } from '@app/hooks/use-remote-data'
import { Loader } from '@app/ui/loader'
import { PageTitle } from '@app/ui/page-title'
import { T } from '@app/ui/t'
import styles from './styles.css'

export function PhotosPage() {
  const [photos] = useRemoteData(() => api.photos.getPhotos(), undefined, [])

  return (
    <>
      <PageTitle>
        <T id="pages.photos.title" />
      </PageTitle>
      {!photos ? (
        <Loader loading />
      ) : (
        <section>
          {photos.map(photo => (
            <article className={styles.post} key={photo.id}>
              <h2 className={styles.title}>{photo.title}</h2>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </article>
          ))}
        </section>
      )}
    </>
  )
}
