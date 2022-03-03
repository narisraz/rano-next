import * as React from 'react';
import {ReactElement, ReactNode} from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotioncache';
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage} from "next";
import "reflect-metadata";
import {Subscribe} from "@react-rxjs/core";
import nookies from "nookies";
import {firebaseAdmin} from "../configurations/firebaseadmin.config";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppPropsWithLayout {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Subscribe>
          <Component {...pageProps} />
        </Subscribe>
      </ThemeProvider>
    </CacheProvider>
  );
}

interface Props {
  uid: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  try {
    const cookies = nookies.get(context)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)

    const { uid } = token;

    if (!uid) {
      return {
        props: {
          uid: ''
        },
        redirect: {
          statusCode: 302,
          destination: '/login'
        }
      }
    }

    return {
      props: {
        uid: ''
      },
    }

  } catch (e) {
    return {
      props: {
        uid: ''
      },
      redirect: {
        statusCode: 302,
        destination: '/login'
      }
    }
  }
}