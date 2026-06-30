'use client'

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { setContext } from '@apollo/client/link/context'
import { useMemo } from 'react'

function readCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const cookiePrefix = `${name}=`
  const cookies = document.cookie.split(';')
  for (const entry of cookies) {
    const value = entry.trim()
    if (value.startsWith(cookiePrefix)) {
      return decodeURIComponent(value.slice(cookiePrefix.length))
    }
  }
  return ''
}

export default function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    const uri = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/graphql'
    const httpLink = new HttpLink({
      uri,
      credentials: 'include',
    })
    const authLink = setContext((_, { headers }) => {
      const token = readCookie('busa_admin_token')
      return {
        headers: {
          ...headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    })

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    })
  }, [])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
