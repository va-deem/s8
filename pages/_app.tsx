// import '../styles/normalize.scss';
import '../styles/global.scss';
import '../styles/main.scss';
import '../styles/admin.scss';
import { SessionProvider } from 'next-auth/react';

import 'highlight.js/styles/github.css';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
