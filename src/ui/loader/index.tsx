import { Spinner } from '@app/ui/spinner'
import cn from 'classnames'
import { ReactNode } from 'react'
import styles from './styles.css'

interface Props {
  loading: boolean
  children?: ReactNode
  className?: string
}

export function Loader({ loading, children, className }: Props) {
  return (
    <div
      className={cn(styles.loader, className, {
        [styles.isLoading]: loading
      })}
    >
      <div className={styles.component}>{children}</div>
      {loading && <Spinner />}
    </div>
  )
}
