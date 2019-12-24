import { stringify } from 'querystring'

const API_FAKE = clientConfig.api.fake

if (!API_FAKE) throw new Error('API not found')

type ExtendedRequestInit<TResponse = any> = RequestInit & {
  mock?: TResponse | Promise<TResponse>
  queryParams?: {}
}

export const callApi = async <TResponse>(
  url: string,
  init?: ExtendedRequestInit<TResponse>
) => {
  const { queryParams, mock, ...request } =
    init || ({} as ExtendedRequestInit<TResponse>)

  try {
    if (mock) {
      return await Promise.resolve(mock)
    }

    if (queryParams) {
      url += '?' + stringify(queryParams)
    }

    const response = await fetch(API_FAKE + url, request)

    return (await response.json()) as TResponse
  } catch (ex) {
    console.error('API ERROR', ex)
    throw ex
  }
}
