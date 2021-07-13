import '../styles/global.scss';
import 'highlight.js/styles/github.css';

import { AppProps } from 'next/app';

export default function _app({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
