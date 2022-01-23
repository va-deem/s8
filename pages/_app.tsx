import '../styles/normalize.scss';
import '../styles/global.scss';
import '../styles/layout.scss';

import '../styles/admin/index.scss';
import 'highlight.js/styles/github.css';

import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
