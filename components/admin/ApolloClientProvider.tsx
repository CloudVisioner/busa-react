'use client'

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { useMemo } from 'react'

export default function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    const uri = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/graphql'
    return new ApolloClient({
      link: new HttpLink({
        uri,
        credentials: 'include',
      }),
      cache: new InMemoryCache(),
    })
  }, [])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
