import { PureComponent } from 'react'

interface State {
  hasError: boolean
}

export class ErrorBoundary extends PureComponent<{}, State> {
  static getDerivedStateFromError = () => ({
    hasError: true
  })

  constructor(props: {}) {
    super(props)
    this.state = { hasError: false }
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <div>
        <div>:(</div>
        <div>Something goes wrong</div>
      </div>
    )
  }
}
