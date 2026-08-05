import type { PropsWithChildren } from "react"
import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading"
import { useAuthStore } from "./auth/store/auth.store"

const queryClient = new QueryClient()

const CheckAuthProvider = ({ children }: PropsWithChildren) => {

  const {checkAuthStatus} = useAuthStore()

  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true
  })

  if(isLoading) return <CustomFullScreenLoading/>

  return children
}

export const TesloShopApp = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {/* Custom Provider */}
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
      <TanStackDevtools plugins={[
        {
          name: 'TanStack Query',
          render: <ReactQueryDevtoolsPanel />,
        },
      ]} />
    </QueryClientProvider>
  )
}
