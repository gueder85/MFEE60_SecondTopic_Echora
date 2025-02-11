import { Suspense } from 'react'

// 載入context
import { Providers } from './providers'
import Footer from './_components/footer'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            <Footer />
          </Providers>
        </Suspense>
      </body>

    </html>
  )
}
