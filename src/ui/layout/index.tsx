import { PropsWithChildren } from 'react'
import { Footer } from './components/footer'
import { Header } from './components/header'
import { Main } from './components/main'
import styles from './styles.css'

export function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.layout}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}
