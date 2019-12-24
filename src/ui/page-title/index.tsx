import { PropsWithChildren } from 'react'
import styles from './styles.css'

export function PageTitle({ children }: PropsWithChildren<{}>) {
  return <h1 className={styles.title}>{children}</h1>
}
