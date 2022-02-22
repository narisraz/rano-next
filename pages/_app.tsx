import '../styles/globals.css'
import type { AppProps } from 'next/app'
require('dotenv').config()

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
