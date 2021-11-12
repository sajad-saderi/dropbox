import '../styles/globals.css'
import type { AppProps } from 'next/app'
// import default style
import 'rsuite/dist/rsuite.min.css';
import { StoreProvider } from '../contexts/store';

function MyApp({ Component, pageProps }: AppProps) {
  return <StoreProvider><Component {...pageProps} /></StoreProvider>
}
export default MyApp
