import '@app/theme/index.css'

import { Bootstrap } from '@app/bootstrap'
import { DEFAULT_LOCALE, localePathReg } from '@app/locales'
import { Pages } from '@app/pages'
import { ErrorBoundary } from '@app/pages/error'
import ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

function AppComponent() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Switch>
          <Route path={localePathReg}>
            <Bootstrap>
              <Pages />
            </Bootstrap>
          </Route>
          <Redirect to={`/${DEFAULT_LOCALE}`} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

let App = AppComponent

const isDev = process.env.NODE_ENV === 'development'

if (isDev) {
  // tslint:disable-next-line: no-var-requires
  const { hot } = require('react-hot-loader/root')
  App = hot(AppComponent)
}

ReactDOM.render(<App />, document.getElementById('root'))
