import * as React from "react";
import { useEffect } from "react";

import Head from "next/head";
import { AppProps } from "next/app";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { CacheProvider, EmotionCache } from "@emotion/react";

import { useRouter } from "next/router";

import nookies from "nookies";

import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const cookies = nookies.get();
  const tokens_session = cookies.token;
  const router = useRouter();

  useEffect(() => {
    if (tokens_session == null || undefined) {
      router.push("/login");
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
