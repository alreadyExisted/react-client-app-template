import { api } from '@app/api'
import { useRemoteData } from '@app/hooks/use-remote-data'
import { Loader } from '@app/ui/loader'
import { PageTitle } from '@app/ui/page-title'
import { T } from '@app/ui/t'
import styles from './styles.css'

export function PostsPage() {
  const [posts] = useRemoteData(() => api.posts.getPosts(), undefined, [])

  return (
    <>
      <PageTitle>
        <T id="pages.posts.title" />
      </PageTitle>
      {!posts ? (
        <Loader loading />
      ) : (
        <section>
          {posts.map(post => (
            <article className={styles.post} key={post.id}>
              <h2 className={styles.title}>{post.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </article>
          ))}
        </section>
      )}
    </>
  )
}
