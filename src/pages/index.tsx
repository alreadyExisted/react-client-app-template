import { PhotosPage } from '@app/pages/photos'
import { PostsPage } from '@app/pages/posts'
import { Layout } from '@app/ui/layout'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

export function Pages() {
  const { path } = useRouteMatch()
  return (
    <Layout>
      <Switch>
        <Route path={`${path}/posts`} component={PostsPage} />
        <Route path={`${path}/photos`} component={PhotosPage} />
        <Redirect to={`${path}/posts`} />
      </Switch>
    </Layout>
  )
}
