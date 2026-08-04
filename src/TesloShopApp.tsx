import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TanStackDevtools } from '@tanstack/react-devtools'

const queryClient = new QueryClient()

export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
      <TanStackDevtools />
    </QueryClientProvider>
  )
}
