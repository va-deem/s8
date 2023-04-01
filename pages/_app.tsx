import '../styles/global.scss';
import { SessionProvider } from 'next-auth/react';

import 'highlight.js/styles/github.css';
import { AppWrapper } from '../context/AppContext';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </SessionProvider>
  );
}
