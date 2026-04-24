import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import type { OperationVariables, QueryOptions } from '@apollo/client'

const graphqlEndpoint = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL
const hasGraphqlEndpoint = Boolean(graphqlEndpoint)

const httpLink = hasGraphqlEndpoint ? createHttpLink({ uri: graphqlEndpoint }) : null

export const apolloClient = httpLink
  ? new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    })
  : null

let hasWarnedAboutMissingEndpoint = false

function warnAboutMissingEndpoint(): void {
  if (process.env.NODE_ENV === 'development' && !hasWarnedAboutMissingEndpoint) {
    hasWarnedAboutMissingEndpoint = true
    console.warn('Skipping GraphQL request: set API_URL or NEXT_PUBLIC_API_URL to enable CMS data.')
  }
}

export async function queryApollo<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  options: QueryOptions<TVariables, TData>
): Promise<TData | null> {
  if (!apolloClient) {
    warnAboutMissingEndpoint()
    return null
  }

  const result = await apolloClient.query<TData, TVariables>(options)
  return result.data ?? null
}
