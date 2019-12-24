import { T } from '@app/ui/t'
import { useIntl } from 'react-intl'
import { NavLink, useRouteMatch } from 'react-router-dom'
import styles from './styles.css'

export function Header() {
  const { url } = useRouteMatch()
  const { locale } = useIntl()
  const switchedLocale = locale === 'ru' ? 'en' : 'ru'
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              className={styles.link}
              activeClassName={styles.active}
              to={`${url}/posts`}
            >
              <T id="pages.posts.title" />
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              className={styles.link}
              activeClassName={styles.active}
              to={`${url}/photos`}
            >
              <T id="pages.photos.title" />
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <NavLink className={styles.locale} to={`/${switchedLocale}`}>
          {switchedLocale}
        </NavLink>
      </div>
    </header>
  )
}
