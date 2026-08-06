'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'
import { WorldFallback } from './WorldFallback'

type Props = { children: ReactNode }
type State = { failed: boolean }

export class WorldErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('World canvas failed to render.', error, info.componentStack)
    }
  }

  render() {
    if (this.state.failed) {
      return <WorldFallback reason="The interactive world could not start in this browser." />
    }

    return this.props.children
  }
}
