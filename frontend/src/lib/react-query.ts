'use client'

import { QueryClient } from '@tanstack/react-query'


let displayedNetworkFailureError = false

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        

        if (failureCount >= 3) {
          if (displayedNetworkFailureError === false) {
            displayedNetworkFailureError = true
            console.log('error', error)
            window.location.assign('/')
          }

          return false
        }

        return true
      },
    },
    mutations: {
      onError(error) {
        console.log('error', error)
      },
    },
  },
})
