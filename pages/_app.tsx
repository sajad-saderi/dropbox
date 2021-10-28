import '../styles/globals.css'
import type { AppProps } from 'next/app'
// import default style
import 'rsuite/dist/rsuite.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
