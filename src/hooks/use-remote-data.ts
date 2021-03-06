import { DependencyList, Reducer, useEffect, useReducer } from 'react'

interface ApiState<T> {
  data: T
  isLoading?: boolean
  error?: Error
}

type ApiAction<T> =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: T }
  | { type: 'FETCH_FAILURE'; payload: Error }

const reducer = <T>(state: ApiState<T>, action: ApiAction<T>): ApiState<T> => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { data: state.data, isLoading: true, error: undefined }

    case 'FETCH_SUCCESS':
      return { data: action.payload, isLoading: false, error: undefined }

    case 'FETCH_FAILURE':
      return { data: state.data, isLoading: false, error: action.payload }

    default:
      throw new Error()
  }
}

export function useRemoteData<T>(
  promise: () => Promise<T>,
  initialState: T,
  deps?: DependencyList
) {
  const [state, dispatch] = useReducer<Reducer<ApiState<T>, ApiAction<T>>>(
    reducer,
    {
      isLoading: undefined,
      data: initialState
    }
  )

  useEffect(() => {
    let didCancel = false

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })

      try {
        const data = await promise()

        if (didCancel) return

        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (error) {
        if (didCancel) return

        dispatch({ type: 'FETCH_FAILURE', payload: error })
      }
    }

    fetchData()

    return () => {
      didCancel = true
    }
  }, deps)

  return [state.data, state.isLoading, state.error] as [
    T,
    boolean,
    Error | undefined
  ]
}
