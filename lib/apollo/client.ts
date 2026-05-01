import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import type { OperationVariables, QueryOptions } from '@apollo/client'

const TOKEN_COOKIE = 'busa_admin_token'

function getToken(): string {
  if (typeof window === 'undefined') return ''
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${TOKEN_COOKIE}=`))
  return match ? match.split('=')[1] : ''
}

const authLink = new ApolloLink((operation, forward) => {
  const token = getToken()
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })
  return forward(operation)
})

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/graphql',
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export const apolloClient = client

export async function queryApollo<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  options: QueryOptions<TVariables, TData> & { admin?: boolean }
): Promise<TData | null> {
  const fetchPolicy = options.fetchPolicy ?? (options.admin ? 'network-only' : 'cache-first')
  const queryOptions = { ...options, fetchPolicy } as QueryOptions<TVariables, TData>
  delete (queryOptions as QueryOptions<TVariables, TData> & { admin?: boolean }).admin
  const result = await apolloClient.query<TData, TVariables>(queryOptions)
  return result.data ?? null
}

export default client
